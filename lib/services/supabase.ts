import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

let supabase: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (supabase) return supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is missing');
  }

  if (!supabaseAnonKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
  }

  supabase = createClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  );

  return supabase;
}