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

`geocode_update.sql` is retained as pre-numbered Bristol project history. Do not
run it during a clean install; its corrected values are already in the Bristol
seed.

The final expected baseline is 4 cities, 42 locations, 4 trails, 35 trail
stops, 25 connections, and 8 districts. All 42 coordinates are verified.

## Existing project

If updates 01–11 are already present, apply only
`update_12_phase1_completion.sql`. It is transactional and repeat-safe, and all
data mutations are keyed by stable location slug.

For a temporary CLI link without adding migration infrastructure to this repo:

```text
phase1_workdir=$(mktemp -d)
supabase init --workdir "$phase1_workdir"
supabase link --workdir "$phase1_workdir" --project-ref <project-ref>
supabase db query --workdir "$phase1_workdir" --linked \
  --file /absolute/path/to/db/update_12_phase1_completion.sql
```

Export affected rows before applying the update. Keep that snapshot until live
verification and both viewport smoke tests pass. The normal recovery path is
fix-forward by editing and rerunning update 12; restore the snapshot only when
the applied data itself is wrong.

The repository includes a narrow exporter for exactly those rows:

```text
npm run snapshot:phase1 -- /tmp/music-map-phase1-before.json
```

## Verify

With `.env.local` pointing at the intended project:

```text
npm run verify:data
```

The verifier is read-only. It checks the fixed counts, city pin totals,
coordinate flags, venue-state/link rules, image attribution and documented
gaps, Spotify ID pairing/reachability, connection endpoints, and contiguous
trail stop order.

## Intentional photo gaps

Phase 1 leaves these null because no accurate, clearly reusable image was found:

- `ameris-bank-amphitheatre`
- `club-baron`
- `criminal-records`
- `grants-lounge`
- `hard-rock-live-bristol`
- `stankonia-studios`
- `the-dungeon`

Do not substitute a nearby building, unrelated performance, or unattributed
promotional image merely to fill the card.
