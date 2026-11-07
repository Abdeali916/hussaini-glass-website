import { supabase, isSupabaseConfigured } from "./supabaseClient";

// Thin wrapper around the `enquiries` table. Every function returns
// { data, error } (or throws for programmer errors) so callers can show
// accurate loading/error states instead of assuming success.

export async function submitEnquiry({ name, phone, email, service, message }) {
  if (!isSupabaseConfigured) {
    return { data: null, error: { message: "not_configured" } };
  }
  // Deliberately no .select() here: the anon role that submits this insert
  // has no SELECT policy on `enquiries` (by design — customers must never
  // read enquiries back), and PostgREST's return=representation (triggered
  // by .select()) requires the inserting role to be able to read the row
  // back as part of the same statement. Without a SELECT policy, that
  // read-back fails RLS and Postgres reports it as the same 42501 "new row
  // violates row-level security policy" error as a failed insert — even
  // though the actual INSERT check (WITH CHECK (true)) succeeds. Omitting
  // .select() avoids asking for something the anon role isn't allowed to
  // have, and the caller only needs to know whether `error` is set.
  const { error } = await supabase
    .from("enquiries")
    .insert([{ name, phone, email: email || null, service: service || null, message: message || null, status: "New" }]);
  return { data: null, error };
}

export async function fetchEnquiries() {
  if (!isSupabaseConfigured) return { data: [], error: { message: "not_configured" } };
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });
  return { data: data || [], error };
}

export async function updateEnquiryStatus(id, status) {
  if (!isSupabaseConfigured) return { data: null, error: { message: "not_configured" } };
  const { data, error } = await supabase
    .from("enquiries")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
}

export async function deleteEnquiry(id) {
  if (!isSupabaseConfigured) return { error: { message: "not_configured" } };
  const { error } = await supabase.from("enquiries").delete().eq("id", id);
  return { error };
}
