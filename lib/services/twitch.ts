const CLIENT_ID = process.env.TWITCH_CLIENT_ID!;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET!;

let accessToken: string | null = null;

async function getAccessToken() {
  if (accessToken) {
    return accessToken;
  }

  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    throw new Error("No fue posible obtener el token de Twitch.");
  }

  const json = await response.json();

  accessToken = json.access_token;

  return accessToken;
}

export interface TwitchChannel {
  username: string;
  displayName: string;

  avatar: string;
  banner: string | null;

  /**
   * -1 significa "no se pudo obtener este ciclo" (fallo de Decapi).
   * El updater debe ignorar ese valor y no sobreescribir el dato guardado.
   */
  followers: number;

  isLive: boolean;
  viewers: number;
  game: string | null;
  title: string | null;
}

/**
 * Obtiene el conteo de followers vía Decapi.
 * Devuelve null si falla (timeout, rate limit, respuesta no numérica, etc.)
 * en vez de asumir 0, para no borrar un dato bueno por un fallo temporal.
 */
async function getFollowerCount(username: string): Promise<number | null> {
  try {
    const res = await fetch(
      `https://decapi.me/twitch/followcount/${username}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error(`Decapi respondió ${res.status} para ${username}`);
      return null;
    }

    const text = await res.text();
    const count = parseInt(text, 10);

    return isNaN(count) ? null : count;
  } catch (err) {
    console.error(`Error obteniendo followers de ${username}:`, err);
    return null;
  }
}

/**
 * Llena result[].followers en lotes pequeños (con pausa entre lotes)
 * en vez de disparar todas las peticiones a Decapi en paralelo,
 * para reducir el riesgo de rate limit / timeouts masivos.
 */
async function fillFollowers(
  result: Map<string, TwitchChannel>,
  usernames: string[],
  batchSize = 5
) {
  for (let i = 0; i < usernames.length; i += batchSize) {
    const batch = usernames.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async (username) => {
        const key = username.toLowerCase();
        const channel = result.get(key);
        if (!channel) return;

        const count = await getFollowerCount(username);
        channel.followers = count ?? -1;
      })
    );

    // pequeña pausa entre lotes para no saturar Decapi
    if (i + batchSize < usernames.length) {
      await new Promise((r) => setTimeout(r, 300));
    }
  }
}

/**
 * Compatibilidad para un solo canal.
 */
export async function getTwitchChannel(
  username: string
): Promise<TwitchChannel | null> {
  const channels = await getTwitchChannels([username]);

  return channels.get(username.toLowerCase()) ?? null;
}

/**
 * Consulta hasta 100 canales usando /users y /streams,
 * más followers vía Decapi en lotes controlados.
 */
export async function getTwitchChannels(
  usernames: string[]
): Promise<Map<string, TwitchChannel>> {
  if (usernames.length === 0) {
    return new Map();
  }

  const token = await getAccessToken();

  const unique = [...new Set(usernames)];

  //
  // USERS
  //

  const usersUrl =
    "https://api.twitch.tv/helix/users?" +
    unique.map((u) => `login=${encodeURIComponent(u)}`).join("&");

  const usersResponse = await fetch(usersUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-Id": CLIENT_ID,
    },
    cache: "no-store",
  });

  if (!usersResponse.ok) {
    throw new Error("Error consultando usuarios de Twitch.");
  }

  const usersJson = await usersResponse.json();

  //
  // STREAMS
  //

  const streamsUrl =
    "https://api.twitch.tv/helix/streams?" +
    unique.map((u) => `user_login=${encodeURIComponent(u)}`).join("&");

  const streamsResponse = await fetch(streamsUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-Id": CLIENT_ID,
    },
    cache: "no-store",
  });

  if (!streamsResponse.ok) {
    throw new Error("Error consultando streams de Twitch.");
  }

  const streamsJson = await streamsResponse.json();

  const liveMap = new Map<string, any>();

  for (const stream of streamsJson.data ?? []) {
    liveMap.set(stream.user_login.toLowerCase(), stream);
  }

  const result = new Map<string, TwitchChannel>();

  for (const user of usersJson.data ?? []) {
    const stream = liveMap.get(user.login.toLowerCase());

    result.set(user.login.toLowerCase(), {
      username: user.login,
      displayName: user.display_name,

      avatar: user.profile_image_url,
      banner: user.offline_image_url || null,

      followers: -1, // se completa abajo; -1 = pendiente/fallido

      isLive: !!stream,
      viewers: stream?.viewer_count ?? 0,
      game: stream?.game_name ?? null,
      title: stream?.title ?? null,
    });
  }

  //
  // FOLLOWERS (Decapi, en lotes)
  //

  await fillFollowers(result, unique);

  return result;
}
