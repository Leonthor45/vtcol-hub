import type { Vtuber } from '../types/vtuber';
import { mockVtubers } from '../data/mock-vtubers';
import { supabase } from './supabase';

const canUseSupabase = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function getVtubers(): Promise<Vtuber[]> {
  if (!canUseSupabase) {
    return mockVtubers;
  }

  const { data, error } = await (supabase.from('vtubers') as any).select('*').order('featured', { ascending: false }).order('name');
  if (error || !data) {
    return mockVtubers;
  }

  return data;
}

export async function getVtuberBySlug(slug: string): Promise<Vtuber | undefined> {
  if (!canUseSupabase) {
    return mockVtubers.find((vtuber) => vtuber.slug === slug);
  }

  const { data, error } = await (supabase.from('vtubers') as any).select('*').eq('slug', slug).limit(1).single();
  if (error || !data) {
    return mockVtubers.find((vtuber) => vtuber.slug === slug);
  }

  return data;
}
