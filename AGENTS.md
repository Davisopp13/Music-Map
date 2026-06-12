# AGENTS.md — Music History Map

## What this is

A personal project: an interactive map of American music history locations.
Cities contain pins (locations with story cards), pins connect via story
threads, and curated trails walk you through narratives in order. A time
scrubber filters pins by era. Bristol, TN/VA is the first city; Macon,
Atlanta, Nashville, NYC, Laurel Canyon, and Austin come later.

This is a passion project, not a product. Optimize for delight and
shipping, not scale.

## Stack

- Next.js (App Router), TypeScript, TailwindCSS
- MapLibre GL JS (free, no token) with a clean basemap style
- Supabase (Postgres) — schema in `db/schema.sql`, seed in `db/seed_bristol.sql`
- Deploy: Vercel
- Icons: Lucide React

## Core user loop (MVP)

1. Land on the Bristol map → pins render by `pin_type` with distinct markers
1. Click a pin → story card slides in (name, era, story_md rendered from
   markdown, “what’s there now”, Spotify embed if present, image)
1. Open the “Bristol 1927” trail → pins highlight in stop order, numbered;
   card shows the trail-specific `stop_note_md` above the location story

## Architecture conventions

- Server components fetch from Supabase; map itself is a client component
- One page per city: `/[citySlug]` (Bristol only for now, but route it)
- Trail view is a mode/overlay on the city map, not a separate page
- Markdown rendering: react-markdown, keep it simple
- Orbit pins (`is_orbit = true`) render with a dashed ring + show distance
  hint from city center — they sit outside the downtown cluster
- Pins where `coords_verified = false` need geocoding before launch —
  addresses are in the seed file. Verify against the address, update lat/lng,
  flip the flag.

## Visual direction

- Map should feel like a worn atlas / liner notes, not Google Maps —
  muted basemap, warm accent colors per pin_type
- Story cards are the heart: generous typography, readable line length
- Era badge on each card (e.g. “1927–1928”)

## Explicitly NOT building (V1)

- Auth, user accounts, personal pins
- Time scrubber (V2 — schema supports it via era_start/era_end, don’t build UI yet)
- Connection lines on the map (V2 — data is seeded, rendering can wait)
- Other cities
- Mobile “standing here” geolocation mode
- CMS/admin — content edits happen in seed SQL for now

## Scope discipline

If a feature isn’t in the core loop above, it goes in TODO-V2.md.
Ship when: Bristol pins render, cards work, the trail walks in order.