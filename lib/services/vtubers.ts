import type { Vtuber } from '../types/vtuber';
import { supabase } from './supabase';

export async function getVtubers(): Promise<Vtuber[]> {
  const { data, error } = await supabase
    .from('vtubers')
    .select('*')

    // 1️⃣ Siempre primero los que están en directo
    .order('is_live', { ascending: false })

    // 2️⃣ Luego los destacados
    .order('featured', { ascending: false })

    // 3️⃣ Después por tamaño en Twitch
    .order('twitch_followers', {
      ascending: false,
      nullsFirst: false,
    })

    // 4️⃣ Después por tamaño en YouTube
    .order('youtube_subscribers', {
      ascending: false,
      nullsFirst: false,
    })

    // 5️⃣ Finalmente alfabéticamente
    .order('name');

  if (error) {
    throw error;
  }

  return data as Vtuber[];
}

export async function getVtuberBySlug(
  slug: string
): Promise<Vtuber | undefined> {
  const { data, error } = await supabase
    .from('vtubers')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return undefined;
  }

  return data as Vtuber;
}