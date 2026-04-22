import { createClient } from '@supabase/supabase-js';

// Get variables directly - Next.js handles the mapping
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fail early with a clear message if the .env.local wasn't read
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase Environment Variables. Check your .env.local file and restart the server.'
  );
}

// Public client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getSupabaseAdmin = (serviceRoleKey?: string) => {
  const key = serviceRoleKey || process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !key) {
    throw new Error('Supabase URL or Service Role Key missing for Admin Client');
  }
  
  return createClient(supabaseUrl, key);
};