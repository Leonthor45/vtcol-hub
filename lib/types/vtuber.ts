export interface Vtuber {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  banner: string;
  bio: string;
  country: string;
  twitch_username: string;
  youtube_channel_id: string;
  twitch_followers: number | null;
  youtube_subscribers: number | null;
  tiktok_followers: number | null;
  instagram_followers: number | null;
  is_live: boolean;
  tiktok: string;
  instagram: string;
  twitter: string;
  website: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
