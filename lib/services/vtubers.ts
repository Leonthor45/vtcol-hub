import type { Vtuber } from '../types/vtuber';
import { getSupabase } from './supabase';

export async function getVtubers(): Promise<Vtuber[]> {
  const supabase = getSupabase();

  const { data, error } = await (supabase as any)
    .from('vtubers')
    .select('*')
    .order('is_live', { ascending: false })
    .order('featured', { ascending: false })
    .order('twitch_followers', {
      ascending: false,
      nullsFirst: false,
    })
    .order('youtube_subscribers', {
      ascending: false,
      nullsFirst: false,
    })
    .order('name');

  if (error) throw error;

  return (data ?? []) as Vtuber[];
}

export async function getVtuberBySlug(
  slug: string
): Promise<Vtuber | undefined> {
  const supabase = getSupabase();

  const { data, error } = await (supabase as any)
    .from('vtubers')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return undefined;
  }

  return data as Vtuber;
}