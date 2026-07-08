// app/utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

// .env.local に書いたURLとカギを読み込む
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// どこからでも使える「受話器（supabase）」をエクスポートする
export const supabase = createClient(supabaseUrl, supabaseAnonKey);