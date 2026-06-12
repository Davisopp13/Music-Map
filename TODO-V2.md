# TODO — V2

Parked per scope rules in CLAUDE.md.

- Time scrubber UI (schema ready via `era_start` / `era_end`)
- Connection lines on the map (4 connections seeded; `connections` table)
- Long threads on overview map (inter-city connections — Atlanta↔Bristol,
  Peacock↔Douglass — data exists, rendering is V2)
- Other cities: Macon, Atlanta, Nashville, NYC, Laurel Canyon, Austin
- "Standing here" geolocation mode
- Personal pins layer / auth
- CMS or admin for content edits
- Multi-city trails + the Southern pilgrimage loop (ATL → Macon → Bristol → Nashville)

## Content (back to chat)

- Spotify track IDs (`spotify_track_id` is null everywhere; labels are seeded
  and the card already renders the embed when an ID lands)
- Pin photos (`image_url` — card has the image slot ready)

## Small build notes

- Swipe-down to dismiss the story card sheet on mobile (X / map-tap works today)
- Marker clustering if a future city gets dense
- `src/lib/local-data.ts` is a dev fallback mirroring `db/seed_bristol.sql`;
  it can be deleted once Supabase env vars are everywhere, or kept for offline demos
