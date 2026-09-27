# TODO — V2

Phase 1 consolidated Bristol, Macon, Atlanta, and Nashville at 42 verified pins.
Davis applied updates 13–14; the 55-pin baseline passes live data verification.
The following work is intentionally parked:

- Time scrubber using `era_start` / `era_end`
- Era-reactive basemap aging
- Connection-line rendering within city maps
- NYC, Laurel Canyon, and Austin chapters
- “Standing here” geolocation mode
- Personal pins, authentication, and user content
- CMS/admin editing
- In-city trail selection: expose the second Atlanta trail stored by update 13
  (the current app selects only `trails[0]`; content pass did not change app code)
- Refresh browser smoke expectations after applying the 55-pin content baseline
- Multi-city trails and the Southern pilgrimage loop
- Marker clustering if a future chapter becomes dense
- Swipe-down dismissal for the mobile story sheet

## Future venue data

The static venue layer now covers all 22 venue pins in the expanded SQL baseline plus Bristol Rhythm & Roots.
A later phase may cache Ticketmaster events and setlist.fm history in a
`concert_events` table. Do not call provider APIs from the story-card render
path. Bandsintown remains out unless broader platform access is approved.

## Curated media gaps

All 33 existing Spotify pairs remain populated. Twenty-two pins have no selected
track, including all 13 additions. See `db/sources/update_13_14_sources.md` for
editorial suggestions; exact recordings must be verified before adding IDs.

Seventeen photo slots intentionally remain null: Nassau Street, Ann’s Tic Toc,
Club Baron, Criminal Records, Grant’s Lounge, Hard Rock Live Bristol, Bell House,
Quonset Hut, Stankonia, Star Bar, Tennessee Ernie Ford’s birthplace, the Dungeon,
the Masquerade, Trap Music Museum, Wax ’n’ Facts, the WCYB marker, and WRFG.
Ameris now has an exact-site CC0 image. Six new pins have licensed images;
four older mismatched substitutions were removed. Exact licensed images can be
added with attribution; no nearby buildings or unrelated portraits. Selected
Commons metadata was checked, but rendered-media QA remains outstanding.

The source ledger lists unresolved inherited historical claims and coordinate
matches for Davis’s review. It is not a blanket verification of every old claim.

`src/lib/local-data.ts` remains a reduced Bristol-only demo rather than a second
four-city datastore.
