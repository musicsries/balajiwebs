import { createClient } from '@supabase/supabase-js';

// Use environment variables (safer for production)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  images: string[];
  colors: string[];
  old_price: number;
  new_price: number;
  category: string;
  created_at: string;
};