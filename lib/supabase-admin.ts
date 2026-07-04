import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import path from 'node:path';
import type { Database } from '../types/supabase';

config({ path: path.join(process.cwd(), '.env.local') });

export const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
