import { supabase } from '../supabase';
import type { Vtuber } from '../types/vtuber';

export async function getVtuber(slug: string): Promise<Vtuber | null> {
  const { data, error } = await supabase
    .from('vtubers')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    return null;
  }

  return data as Vtuber;
}