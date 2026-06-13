import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Null when the Supabase env vars aren't configured (e.g. local dev without a
 * .env.local). Constructing the client with undefined values throws at module
 * load and 500s any route that imports it, so we guard instead and let callers
 * degrade gracefully.
 */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
