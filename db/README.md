# Database workflow

The repository uses a canonical schema plus ordered SQL seeds/updates. It does
not use a generated Supabase migrations directory. All application access is
public read-only through RLS; data writes happen through reviewed SQL.

## Clean install

Run each file once in this exact order:

1. `schema.sql`
2. `seed_bristol.sql`
3. `seed_macon.sql`
4. `seed_atlanta.sql`
5. `seed_nashville.sql`
6. `update_01_paramount_spotify.sql`
7. `update_02_eddies_attic.sql`
8. `update_03_macon_spotify.sql`
9. `update_04_atlanta_spotify.sql`
10. `update_05_north_metro_pins.sql`
11. `update_06_capitol_buckhead.sql`
12. `update_07_atlanta_geocode.sql`
13. `update_08_nashville_spotify.sql`
14. `update_09_districts.sql`
15. `update_10_images.sql`
16. `update_11_venue_enrichment.sql`
17. `update_12_phase1_completion.sql`
18. `update_13_atlanta_depth.sql`
19. `update_14_chapter_depth.sql`

`geocode_update.sql` is retained as pre-numbered Bristol project history. Do not
run it during a clean install; its corrected values are already in the Bristol
seed.

The repository SQL baseline through update 14 is **4 cities, 55 locations,
5 trails, 41 trail stops, 33 connections, and 8 districts**. City pin counts:
Bristol 12, Macon 11, Atlanta 20, Nashville 12. There are 22 venue pins,
33 existing Spotify pairs, and 17 intentional image gaps. All coordinate flags
are set; the source ledger distinguishes new verified points from inherited
coordinates that could not be independently matched again.

Davis has applied updates 13–14 to Supabase. **Live data verification passed**,
including the expected counts, selected image files, and Spotify IDs. The shipped Phase 1 baseline was 42 pins / 4 trails / 35 stops /
25 connections. See [the source and audit ledger](sources/update_13_14_sources.md)
for all 42 existing-pin audits, 13 new pins, evidence, licenses, unresolved
claims, rejected candidates, and media suggestions.

## Existing project

On a database already through update 12, review and apply in this exact order:

1. `update_13_atlanta_depth.sql`
2. `update_14_chapter_depth.sql`

Both files are transactional and repeat-safe. Every mutation resolves stable
slugs; there are no hard-coded UUIDs. The files are separate transactions: if
14 fails, resolve the cause and rerun 14. Do not rerun seeds on an existing DB.
Export affected tables before application and retain the snapshot through live
verification. The older `snapshot:phase1` exporter covers update 12 only and is
not a sufficient backup for this content pass. Recovery is normally reviewed
fix-forward SQL, not deleting added rows with cascading relationships.

The new `atlanta-auburn-to-little-five` trail has six stops and a routed pedestrian
distance of about 1.98 miles. The existing app selects only `trails[0]`; this
second trail is stored but **not selectable in the current UI**. No application
code was changed. Trail selection needs separate implementation before claiming
that the new walk is available in the shipped interface.

## Verify

With `.env.local` pointing at the intended project:

```text
npm run verify:data
```

Live verification is read-only and expects updates 13–14. It checks the fixed counts, city pin totals,
coordinate flags, venue-state/link rules, image attribution and documented
gaps, Spotify ID pairing/reachability, connection endpoints, and contiguous
trail stop order.

### Local SQL verification

```text
npm run verify:data:local
```

This command now creates an isolated, disposable PostgreSQL database, installs
schema + seeds + every numbered update, repeats updates 13–14, and compares all
six tables including IDs. It never contacts Supabase, even when `.env.local`
contains live credentials. It skips remote image/Spotify requests. PostgreSQL
server/client tools must be installed; set `PG_BIN` to their directory if they
are not found through Homebrew PostgreSQL 17 or `pg_config`. Run as a normal
user because PostgreSQL `initdb` does not run as root. TCP is disabled; a private
Unix socket and temporary data directory are removed after verification.

Also run `npm run lint` and `npm run build`. After applying to Supabase, run
live data/media verification, both viewport browser smoke tests, and PWA checks
before shipping. Existing browser tests still encode the earlier baseline and
need a separately scoped update before validating the expanded content.

## Intentional photo gaps

The content pass fills Ameris with an exact-site CC0 photograph, adds six images,
and removes four misleading substitutions. These **17** slots remain null:

- `152-nassau-street`
- `anns-tic-toc`
- `club-baron`
- `criminal-records`
- `grants-lounge`
- `hard-rock-live-bristol`
- `mcduffie-bell-house`
- `quonset-hut`
- `stankonia-studios`
- `star-community-bar`
- `tennessee-ernie-ford-birthplace`
- `the-dungeon`
- `the-masquerade`
- `trap-music-museum`
- `wax-n-facts`
- `wcyb-farm-and-fun-time`
- `wrfg-radio`

Do not substitute a nearby building, unrelated performance, or unattributed
promotional image merely to fill the card. Commons metadata/license checks
succeeded for selected files; image bytes were blocked in the research
environment, so live render checks remain part of post-application media QA. A subsequent
browser check confirmed Chromium blocked the existing Ryman image with
`ERR_BLOCKED_BY_ORB`; file-metadata validation passes but rendered-media QA
remains unresolved. PWA checks passed after migration application.
