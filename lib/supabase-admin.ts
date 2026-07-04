import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

console.log('SUPABASE_URL:', !!process.env.SUPABASE_URL);
console.log(
  'SUPABASE_SERVICE_ROLE_KEY:',
  !!process.env.SUPABASE_SERVICE_ROLE_KEY
);

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url) {
  throw new Error('SUPABASE_URL is missing');
}

if (!key) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing');
}

export const supabaseAdmin = createClient<Database>(url, key);