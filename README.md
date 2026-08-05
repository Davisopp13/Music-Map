# Music History Map

An interactive, story-first atlas of American music history. The current map
covers Bristol, Macon, Atlanta, and Nashville with 42 pins, four curated trails,
35 ordered stops, and 25 story-thread connections.

The visual system is a custom worn-atlas MapLibre style over free OpenFreeMap
vector tiles. Labels use self-hosted glyphs; no map token is required.

## Run locally

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and set
   `NEXT_PUBLIC_SUPABASE_URL` plus `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or
   `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`).
3. Start the app: `npm run dev`

Without Supabase variables, the app serves a deliberately reduced Bristol-only
demo from `src/lib/local-data.ts`. That fallback does not mirror all four cities
or every live media/thread/district field.

## Database

For a clean project, run `db/schema.sql`, then the four city seeds in dependency
order (Bristol, Macon, Atlanta, Nashville), then `db/update_01` through
`db/update_12` in numeric order. The canonical schema includes districts, image
attribution, venue metadata, indexes, constraints, and public read-only RLS.

The exact clean-install and existing-project workflows are in
[`db/README.md`](db/README.md). Content changes remain reviewable SQL; there is
no CMS or formal migration framework.

## Verification

```text
npm run browser:install     # install Playwright's managed Chromium
npm run verify:data         # live counts, invariants, images, and Spotify IDs
npm run verify:data:local   # same Supabase invariants, skip remote media checks
npm run verify:browser      # four-city mobile + desktop smoke tests
npm run verify:pwa          # service worker, cache boundaries, offline fallback
npm run lint
npm run build
```

Browser and PWA verification expect a running app at `http://localhost:3000` by
default; pass another origin directly to either script when needed.

## Architecture

- `src/app/[citySlug]/page.tsx` — server-side Supabase data loading
- `src/components/CityExperience.tsx` — pin selection and trail state
- `src/components/CityMap.tsx` — MapLibre pins, trail routes, districts, threads
- `src/components/StoryCard.tsx` — narrative, media, attribution, venue links
- `src/lib/basemap.ts` — the custom OpenFreeMap worn-atlas style
- `public/sw.js` — selective PWA caching and branded offline navigation
- `db/` — canonical schema, four seeds, and numbered historical updates

V2 scope and intentionally open content gaps live in [`TODO-V2.md`](TODO-V2.md).
