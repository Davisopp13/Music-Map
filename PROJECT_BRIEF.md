# Music History Map — Kickoff Brief

## One-liner

An interactive map of American music history — story-rich pins, curated
trails, starting with Bristol, TN/VA, the “Big Bang of Country Music.”

## Why (personal itch)

A map you can wander: stand in a parking lot on State Street and understand
that country music was invented there in twelve days in 1927. Eventually:
Macon, Atlanta, Nashville, NYC, Laurel Canyon, Austin.

## Success criteria (Week 1)

- Bristol map renders 9 pins with type-distinct markers
- Clicking any pin opens a story card with markdown narrative,
  era badge, “what’s there now,” and Spotify embed where present
- “Bristol 1927: The Big Bang” trail mode numbers the stops and walks
  them in order with trail-specific notes
- Deployed on Vercel; works on phone (it’s a walking companion)

## Files in this package

- `schema.sql` — full Supabase schema (cities, locations, connections,
  trails, trail_stops). Connections + era fields are seeded but their UI
  is deliberately V2.
- `seed_bristol.sql` — 9 researched pins with written story cards,
  4 connections, and an 8-stop trail. Facts verified June 2026.
- `CLAUDE.md` — drop into repo root.

## Build order suggestion

1. `create-next-app`, Tailwind, Supabase client, run schema + seed
1. MapLibre city page with pins from DB
1. Story card panel (the heart — spend the time here)
1. Trail mode overlay
1. Geocode the `coords_verified = false` pins (addresses in seed),
   flip flags
1. Polish pass per CLAUDE.md visual direction → deploy

## Open content tasks (back to chat for these)

- Spotify track IDs need to be filled in (labels are seeded;
  IDs left null intentionally)
- Pin images — source public-domain/CC photos or shoot your own
  on the inevitable Bristol road trip
- Next city content sprint: Macon

## V2 backlog (do not build yet)

Time scrubber UI · connection lines · personal pins layer ·
“standing here” geolocation mode · multi-city trails ·
the Southern pilgrimage loop (ATL → Macon → Bristol → Nashville)