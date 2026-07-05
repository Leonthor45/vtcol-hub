const API_KEY = process.env.YOUTUBE_API_KEY!;

export interface YoutubeChannel {
  id: string;
  title: string;
  avatar: string;
  subscribers: number;
  videos: number;
  views: number;
}

/**
 * Obtiene UN canal (compatibilidad)
 */
export async function getYoutubeChannel(
  channelId: string
): Promise<YoutubeChannel | null> {
  const channels = await getYoutubeChannels([channelId]);

  return channels.get(channelId) ?? null;
}

/**
 * Obtiene MUCHOS canales en varias peticiones.
 * YouTube permite máximo 50 IDs por request.
 */
export async function getYoutubeChannels(
  channelIds: string[]
): Promise<Map<string, YoutubeChannel>> {
  if (channelIds.length === 0) {
    return new Map();
  }

  // Eliminar IDs vacíos y duplicados
  const ids = [
    ...new Set(
      channelIds.filter(
        (id) => id && id.trim() !== ""
      )
    ),
  ];

  const result = new Map<string, YoutubeChannel>();

  // Dividir en grupos de 50
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);

    console.log(
      `Consultando lote ${Math.floor(i / 50) + 1} de ${Math.ceil(ids.length / 50)} (${batch.length} canales)`
    );

    const url =
      "https://www.googleapis.com/youtube/v3/channels" +
      "?part=statistics,snippet" +
      `&id=${batch.join(",")}` +
      `&key=${API_KEY}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(await response.text());
      throw new Error(`YouTube API respondió ${response.status}`);
    }

    const json = await response.json();

    for (const channel of json.items ?? []) {
      result.set(channel.id, {
        id: channel.id,
        title: channel.snippet.title,
        avatar: channel.snippet.thumbnails.high.url,
        subscribers: Number(channel.statistics.subscriberCount),
        videos: Number(channel.statistics.videoCount),
        views: Number(channel.statistics.viewCount),
      });
    }
  }

  return result;
}