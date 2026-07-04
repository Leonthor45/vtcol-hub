// types/vtuber.ts
import type { Database } from '../../types/supabase';

export type Vtuber = Database['public']['Tables']['vtubers']['Row'];
