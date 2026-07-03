export function formatCount(value: number | null): string {
  if (value === null || value === undefined) {
    return '—';
  }

  return new Intl.NumberFormat('es-CO', {
    maximumFractionDigits: 0,
  }).format(value);
}

export function getYoutubeUrl(channelId: string): string {
  const cleaned = channelId.replace(/^@/, '').trim();
  if (!cleaned) {
    return '';
  }

  return cleaned.startsWith('UC')
    ? `https://youtube.com/channel/${cleaned}`
    : `https://youtube.com/@${cleaned}`;
}

export function getSocialUrl(platform: 'twitch' | 'tiktok' | 'instagram' | 'twitter', handle: string): string {
  const cleaned = handle.replace(/^@/, '').trim();

  if (!cleaned) {
    return '';
  }

  switch (platform) {
    case 'twitch':
      return `https://twitch.tv/${cleaned}`;
    case 'tiktok':
      return `https://tiktok.com/@${cleaned}`;
    case 'instagram':
      return `https://instagram.com/${cleaned}`;
    case 'twitter':
      return `https://twitter.com/${cleaned}`;
  }
}
