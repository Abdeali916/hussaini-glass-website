-- ─────────────────────────────────────────────────────────────
-- Hussaini Glass — Supabase schema
-- Run this once in your Supabase project's SQL Editor
-- (Supabase dashboard → SQL Editor → New query → paste → Run).
-- ─────────────────────────────────────────────────────────────

-- Enquiries table: every "Get a Quote" submission from the website.
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  service text,
  message text,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Completed')),
  created_at timestamptz not null default now()
);

-- Enable Row Level Security — required before any policy takes effect.
alter table public.enquiries enable row level security;

-- Anyone (including anonymous website visitors) may INSERT an enquiry —
-- this is what lets the public quote form submit without logging in.
create policy "Anyone can submit an enquiry"
  on public.enquiries
  for insert
  to anon, authenticated
  with check (true);

-- Only signed-in users (admins) may read enquiries.
create policy "Authenticated users can read enquiries"
  on public.enquiries
  for select
  to authenticated
  using (true);

-- Only signed-in users (admins) may update an enquiry (e.g. status changes).
create policy "Authenticated users can update enquiries"
  on public.enquiries
  for update
  to authenticated
  using (true)
  with check (true);

-- Only signed-in users (admins) may delete an enquiry.
create policy "Authenticated users can delete enquiries"
  on public.enquiries
  for delete
  to authenticated
  using (true);

-- Notes:
-- • No policy grants anon/public SELECT, UPDATE or DELETE — visitors can
--   submit an enquiry but can never read, change or remove one, including
--   their own. That satisfies "customers must not be able to read/update/
--   delete enquiries" using Supabase's built-in Row Level Security.
-- • "authenticated" here means any user signed in via Supabase Auth. Create
--   exactly one admin user (see README, "Create the admin account") and
--   don't share those credentials — Supabase doesn't have a separate
--   "admin" role out of the box, so the admin account IS the authenticated
--   user this policy trusts.
