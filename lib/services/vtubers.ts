import { supabase } from '../supabase';
import type { Vtuber } from '../../types/vtuber';

type SupabaseListResult<T> = { data: T[] | null; error: any | null };

export async function getVtubers(): Promise<Vtuber[]> {
  const vtubersQuery = supabase.from('vtubers') as any;
  const res = (await vtubersQuery.select('*')) as unknown as SupabaseListResult<Vtuber>;

  if (res.error || !res.data) return [];

  const list = res.data.slice();

  list.sort((a, b) => {
    if (a.is_live !== b.is_live) return a.is_live ? -1 : 1;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const tfA = a.twitch_followers ?? 0;
    const tfB = b.twitch_followers ?? 0;
    if (tfA !== tfB) return tfB - tfA;
    const ysA = a.youtube_subscribers ?? 0;
    const ysB = b.youtube_subscribers ?? 0;
    if (ysA !== ysB) return ysB - ysA;
    return a.name.localeCompare(b.name);
  });

  return list;
}
