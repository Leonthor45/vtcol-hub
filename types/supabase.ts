export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      vtubers: {
        Row: {
          id: string;
          name: string;
          slug: string;
          avatar: string;
          banner: string;
          bio: string;
          country: string;
          twitch_username: string;
          youtube_channel_id: string;
          youtube_subscribers: number | null;
          twitch_followers: number | null;
          tiktok_followers: number | null;
          instagram_followers: number | null;
          is_live: boolean;
          twitch_viewers: number | null;
          current_game: string | null;
          stream_title: string | null;
          youtube_updated_at: string | null;
          twitch_updated_at: string | null;
          tiktok: string;
          instagram: string;
          twitter: string;
          website: string;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          avatar?: string;
          banner?: string;
          bio?: string;
          country?: string;
          twitch_username?: string;
          youtube_channel_id?: string;
          youtube_subscribers?: number | null;
          twitch_followers?: number | null;
          tiktok_followers?: number | null;
          instagram_followers?: number | null;
          is_live?: boolean;
          twitch_viewers?: number | null;
          current_game?: string | null;
          stream_title?: string | null;
          youtube_updated_at?: string | null;
          twitch_updated_at?: string | null;
          tiktok?: string;
          instagram?: string;
          twitter?: string;
          website?: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          avatar?: string;
          banner?: string;
          bio?: string;
          country?: string;
          twitch_username?: string;
          youtube_channel_id?: string;
          youtube_subscribers?: number | null;
          twitch_followers?: number | null;
          tiktok_followers?: number | null;
          instagram_followers?: number | null;
          is_live?: boolean;
          twitch_viewers?: number | null;
          current_game?: string | null;
          stream_title?: string | null;
          youtube_updated_at?: string | null;
          twitch_updated_at?: string | null;
          tiktok?: string;
          instagram?: string;
          twitter?: string;
          website?: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
