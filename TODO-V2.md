# TODO — V2

Phase 1 consolidated Bristol, Macon, Atlanta, and Nashville at 42 verified pins.
The following work is intentionally parked:

- Time scrubber using `era_start` / `era_end`
- Era-reactive basemap aging
- Connection-line rendering within city maps
- NYC, Laurel Canyon, and Austin chapters
- “Standing here” geolocation mode
- Personal pins, authentication, and user content
- CMS/admin editing
- Multi-city trails and the Southern pilgrimage loop
- Marker clustering if a future chapter becomes dense
- Swipe-down dismissal for the mobile story sheet

## Future venue data

The static venue layer now covers all 20 venue pins plus Bristol Rhythm & Roots.
A later phase may cache Ticketmaster events and setlist.fm history in a
`concert_events` table. Do not call provider APIs from the story-card render
path. Bandsintown remains out unless broader platform access is approved.

## Curated media gaps

All 33 deliberately selected Spotify tracks are populated. Nine pins have no
planned track and should remain blank until a specific editorial choice is made.

Seven photo slots intentionally remain null after the reusable-license audit:
Ameris Bank Amphitheatre, Club Baron, Criminal Records, Grant’s Lounge, Hard
Rock Live Bristol, Stankonia Studios, and the Dungeon. Exact, licensed subject
images can be added later with attribution; misleading substitutes should not.

`src/lib/local-data.ts` remains a reduced Bristol-only demo rather than a second
four-city datastore.
