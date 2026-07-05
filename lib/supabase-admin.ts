import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/supabase';

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error('SUPABASE_URL is missing');
  }

  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing');
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}