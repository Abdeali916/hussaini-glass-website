import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────
// SUPABASE CLIENT
// Reads credentials from environment variables only — never
// hardcode a URL or key here. See README.md, "Supabase setup",
// for exactly what to create and where these values come from.
//
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are safe to expose
// in frontend code (they're the public/anon key, not the service
// role key) — but only once Row Level Security policies are in
// place restricting what that key can actually do.
// ─────────────────────────────────────────────────────────────

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// True only when both env vars are present and look like real values
// (not left as empty strings or the .env.example placeholders).
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("YOUR_") &&
    !supabaseAnonKey.includes("YOUR_")
);

// When Supabase isn't configured yet, `supabase` is null and every
// screen that depends on it (quote form submission, admin login,
// admin data) shows a clear "not connected yet" state instead of
// silently failing or pretending to work.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
