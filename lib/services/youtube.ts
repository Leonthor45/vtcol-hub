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
 * Obtiene MUCHOS canales en una sola petición.
 * YouTube permite hasta 50 IDs por request.
 */
export async function getYoutubeChannels(
  channelIds: string[]
): Promise<Map<string, YoutubeChannel>> {
  if (channelIds.length === 0) {
    return new Map();
  }

  // Evitar IDs duplicados
  const ids = [...new Set(channelIds)];

  const url =
    "https://www.googleapis.com/youtube/v3/channels" +
    `?part=statistics,snippet` +
    `&id=${ids.join(",")}` +
    `&key=${API_KEY}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`YouTube API respondió ${response.status}`);
  }

  const json = await response.json();

  const result = new Map<string, YoutubeChannel>();

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

  return result;
}