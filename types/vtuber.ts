import type { Database } from './supabase';

export type Vtuber = Database['public']['Tables']['vtubers']['Row'];
