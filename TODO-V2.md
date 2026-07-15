# TODO — V2

Parked per scope rules in CLAUDE.md.

Shipped since this list was written: connection threads on the city map,
inter-city stub arrows + overview arcs, animated trail routes, district
watercolors, needle-drop ripple, ambient turntable (the map overhaul).

- Time scrubber UI (schema ready via `era_start` / `era_end`)
- Era-reactive map aging — ships WITH the time scrubber: scrubber ages the
  basemap: sepia/sparse in 1920s position, color and interstates seep in
  toward today
- Other cities: NYC, Laurel Canyon, Austin
- "Standing here" geolocation mode
- Personal pins layer / auth
- CMS or admin for content edits
- Multi-city trails + the Southern pilgrimage loop (ATL → Macon → Bristol → Nashville)

## Venue enrichment

Phase one shipped July 2026: reusable static venue links plus Bristol data for
Paramount, Carter Family Fold, Rhythm & Roots, Cameo Theatre, and Hard Rock
Live. The provider IDs live on `locations` for future enrichment.

Next phase: cache upcoming Ticketmaster events and setlist.fm history in a
`concert_events` table. Do not call live provider APIs from the story card
render path. Bandsintown remains out unless broader platform access is approved.

## Content (back to chat)

- Spotify track IDs (`spotify_track_id` is null everywhere; labels are seeded
  and the card already renders the embed when an ID lands)
- Pin photos (`image_url` — card has the image slot ready)

## Small build notes

- Swipe-down to dismiss the story card sheet on mobile (X / map-tap works today)
- Marker clustering if a future city gets dense
- `src/lib/local-data.ts` is a dev fallback mirroring `db/seed_bristol.sql`;
  it can be deleted once Supabase env vars are everywhere, or kept for offline demos
