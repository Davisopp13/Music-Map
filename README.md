# Music History Map

An interactive map of American music history — story-rich pins and curated
walking trails, starting with **Bristol, TN/VA**, the "Big Bang of Country
Music." Built as a phone-first walking companion.

## Stack

Next.js (App Router) · TypeScript · TailwindCSS · MapLibre GL JS
(Carto Voyager raster tiles, no token) · Supabase · react-markdown · Lucide.

## Setup

1. **Database** — in your Supabase project's SQL editor, run `db/schema.sql`
   then `db/seed_bristol.sql`. (If you seeded before the June 2026 geocoding
   pass, also run `db/geocode_update.sql`.) The schema enables RLS with
   public read-only policies, so the anon key can read but never write.
2. **Env** — copy `.env.example` to `.env.local` and fill in
   `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (a publishable `sb_publishable_…` key also works).
3. `npm install && npm run dev`

No env vars? The app falls back to a bundled copy of the Bristol seed
(`src/lib/local-data.ts`) so local dev and previews still work end-to-end.

## Deploy

Vercel: import the repo, add the two env vars, deploy. Nothing else to
configure.

## Where things live

- `src/app/[citySlug]/page.tsx` — server component, fetches city data
- `src/components/CityExperience.tsx` — client state: selection + trail mode
- `src/components/CityMap.tsx` — MapLibre map, type-distinct markers,
  orbit-pin dashed rings, trail stop numbering
- `src/components/StoryCard.tsx` — the heart: era badge, markdown story,
  "what's there now," Spotify embed slot
- `src/components/TrailBar.tsx` — trail launch pill + prev/next stop bar
- `db/` — schema + Bristol seed (9 pins, 4 connections, 8-stop trail)

Scope rules and V2 parking lot: `CLAUDE.md` and `TODO-V2.md`.
