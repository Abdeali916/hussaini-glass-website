# Hussaini Glass — Website + Admin Enquiries

A premium, mobile-responsive business website for Hussaini Glass, built
with React, Vite, Tailwind CSS, React Router and Supabase.

**Architecture, by design:** all website content (business details,
services, gallery) lives in plain code files under `src/data/` and is
edited directly in a code editor — there is no content-management admin
for these. The one thing that *is* backed by a real database is the
customer enquiry system: the "Get a Quote" form saves to Supabase, and
a password-protected admin area lets you view, search, filter and manage
those enquiries.

---

## 1. Run it locally

You'll need [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Production build:

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

---

## 2. Editing website content

Everything below is a plain JavaScript file — edit it, save, and (in dev
mode) the site updates instantly.

| To change... | Edit this file |
|---|---|
| Phone, WhatsApp, email, address, landmark, business hours, Google Maps links | `src/data/business.js` |
| The 17 services, their descriptions, categories, images | `src/data/services.js` |
| Gallery / portfolio photos and their tags | `src/data/projects.js` |

**Current confirmed business details** (already set in `business.js`):
- Phone / WhatsApp: `+91 9291250090`
- Email: `hussainiglasshyd@gmail.com`
- Address: `SBH Colony, Vijaya Nagar Colony, 270/3RT, Vijaynagar Colony, SBH Colony, Vijaya Nagar Colony, Hyderabad, Telangana 500057`
- Landmark: `Opposite Owaisi Park` (shown as a landmark, never as the business's own location)
- Hours: `Monday to Saturday: 10:30 AM – 9:00 PM`

**Adding a photo for one of the 4 services that don't have one yet**
(Aluminium Works, M.S. Works, Stainless Steel Works, ACP Works — no
confidently-matching photo existed in what was provided):
1. Add the image to `public/images/services/` using the filename already
   referenced for that service in `src/data/services.js`.
2. In that same file, change the service's `hasPhoto: false` to `hasPhoto: true`.

**Adding a gallery photo:** drop the file into `public/images/projects/`
and add an entry to the `projects` array in `src/data/projects.js`
(filename, title, and one or more tags from the gallery filter list).

**Logo:** `public/images/logo/logo.png`, used as uploaded (cropped only,
never redesigned or recolored). Replace that file with a new one of the
same name to change it; it's rendered at a fixed height so it won't
stretch. Favicons in the same folder were generated from it.

---

## 3. Admin area (enquiries only)

The admin area covers exactly three pages:

- `/admin/login` — sign in
- `/admin/dashboard` — live counts (total / new / contacted / completed) and recent enquiries
- `/admin/enquiries` — search, filter by service/status, view full details, change status, delete

There is deliberately no `/admin/services`, `/admin/gallery` or
`/admin/settings` — that content is code-based (Section 2).

### How the enquiry flow works

```
Customer fills out "Get a Quote" on the homepage
  → saved to the Supabase `enquiries` table
  → appears immediately in /admin/dashboard and /admin/enquiries
  → admin searches/filters, opens details, updates status, or deletes
```

If Supabase isn't configured, the quote form still works — it falls
back to opening the visitor's email app instead of saving to a database
— and admin sign-in shows a clear "Supabase isn't configured" message
rather than pretending to work.

### Supabase setup

1. **Create a project** at [supabase.com](https://supabase.com).
2. **Run the schema:** Supabase dashboard → SQL Editor → New query →
   paste the entire contents of `supabase/schema.sql` → Run. This creates
   the `enquiries` table and its Row Level Security policies:
   - anyone (including anonymous visitors) can **insert** an enquiry
   - only a signed-in admin can **read, update or delete** enquiries
3. **Get your API keys:** Settings → API → copy the **Project URL** and
   the **anon / public key** (never the `service_role` key).
4. **Add environment variables:** copy `.env.example` to `.env.local` and
   fill in:
   ```
   VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
   `.env.local` is already in `.gitignore`. Restart `npm run dev` after
   adding it.
5. **Create the admin account:** Supabase → Authentication → Users → Add
   user. This is the only login for `/admin`; don't share it publicly.
   Supabase doesn't have a separate "admin role" — whoever can sign in
   with this account is trusted as admin by the RLS policies above.
6. **Test it:** submit the quote form on the homepage (should show a
   success message, not the email fallback), sign in at `/admin/login`,
   and confirm the submission appears in `/admin/enquiries`.

---

## 4. SEO

**Done:**
- Title: "Hussaini Glass | Glass, Aluminium & Interior Works in Hyderabad"
- Meta description, Open Graph tags, Twitter Card tags (`index.html`)
- JSON-LD `HomeAndConstructionBusiness` structured data with your real
  address, phone, email, hours and all 17 services listed — no invented
  ratings, reviews, awards, or years of experience
- `public/robots.txt` — allows crawling, disallows `/admin`
- `public/sitemap.xml` — lists the one real public URL (this is a
  single-page site; Services/Gallery/About are sections on "/", not
  separate routes, so that's honestly all there is to list)
- `src/hooks/useNoIndex.js` — sets `noindex, nofollow` at runtime while
  any `/admin` page is mounted, as a second layer behind `robots.txt`
  and the Supabase-Auth-protected routes
- One `<h1>` (the hero headline), logical `<h2>`/`<h3>`/`<h4>` nesting
  throughout, descriptive `alt` text on every real photo (the service or
  project name/title, not generic text)

**Needs your input before going live** — canonical URL, `og:url`,
`twitter:url`, and the JSON-LD `url`/`logo` fields are left as
`https://YOUR-REAL-DOMAIN` placeholders on purpose, since inventing a
fake domain would be actively misleading to search engines. Once
deployed:
1. In `index.html`, uncomment and fill in the canonical/`og:url`/`twitter:url` tags with your real domain.
2. Replace `https://YOUR-REAL-DOMAIN` in the JSON-LD block and in `public/sitemap.xml`.
3. Update the commented `Sitemap:` line in `public/robots.txt`.

### Google Search Console, step by step

1. Deploy the site (Section 6) to its real domain.
2. Go to [search.google.com/search-console](https://search.google.com/search-console) and add your domain as a property.
3. Verify ownership (Search Console offers a DNS record or HTML file method — follow its instructions for your domain host).
4. Once verified, go to Sitemaps and submit `https://YOUR-DOMAIN/sitemap.xml`.
5. Use "URL Inspection" → "Request Indexing" for the homepage.
6. Check back in the Search Console dashboard over the following days/weeks to monitor indexing status and any crawl errors.

Nothing about indexing is automatic or immediate — Google decides its
own crawl schedule, and this project cannot make any claim about when
or whether the site has actually been indexed.

---

## 5. Accessibility & mobile

- Every icon-only button (delete, close, filters, menu) has an
  `aria-label`; form fields use associated `<label>` elements
- Keyboard focus is visible site-wide (`:focus-visible` outline in `src/index.css`)
- The mobile bottom action bar (Call / WhatsApp / Directions) stays
  fixed and visible while scrolling; the admin enquiries table scrolls
  horizontally within its own container on narrow screens rather than
  breaking the page layout
- This was reviewed at the code level (Tailwind responsive classes,
  container widths, touch target sizing) — it has **not** been verified
  with an actual browser at each breakpoint (320/375/390/412/768/desktop),
  so it's worth clicking through on a real phone before launch

---

## 6. Deployment

Static build, deploys anywhere. Two common options:

**Vercel**
```bash
npm install -g vercel
vercel
```
Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment
variables in the Vercel project settings.

**Netlify**
```bash
npm run build
```
Drag the `dist/` folder into Netlify Drop, or connect the Git repo for
auto-deploys. Add the same two environment variables in Netlify's site
settings before deploying.

After deploying, come back to Section 4 and fill in the real domain in
the canonical/OG/JSON-LD tags and sitemap.

---

## 7. Project structure

```
src/
  data/           business.js, services.js, projects.js — edit these for content
  lib/            supabaseClient.js, enquiries.js — the enquiry system only
  hooks/          useReveal.js, useNoIndex.js
  components/     public site sections (Navbar, Hero, Services, Gallery, ...)
  pages/          HomePage.jsx — the public site, mounted at "/"
  admin/          AuthContext, ProtectedRoute, AdminLayout, and admin/pages/
                  (Login, Dashboard, Enquiries only)
public/
  images/         logo, hero, services, projects — all real photos
  robots.txt
  sitemap.xml
supabase/
  schema.sql      enquiries table + RLS policies — run this in Supabase
.env.example      copy to .env.local and fill in your Supabase keys
```

---

## Notes on content

No testimonials, review counts, years-of-experience claims, statistics,
ratings or awards appear anywhere on the site or in its structured data
— only the 17 confirmed services, your real business details, and your
real photos. The 4 services without a matching photo show a clearly
labeled placeholder rather than a misrepresented image.
