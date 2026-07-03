import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'node:path';

config({
  path: path.join(process.cwd(), '.env.local'),
});

console.log('SUPABASE_URL =', process.env.SUPABASE_URL);
console.log(
  'SERVICE_ROLE =',
  process.env.SUPABASE_SERVICE_ROLE_KEY ? 'OK' : 'NO'
);

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);