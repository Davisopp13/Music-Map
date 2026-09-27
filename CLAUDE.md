# CLAUDE.md — Music History Map

Follow the project guidance in `AGENTS.md`. The repository SQL baseline through update 14 is four cities,
55 pins (Bristol 12 / Macon 11 / Atlanta 20 / Nashville 12), five trails with
41 stops, 33 story connections, and eight districts. Davis applied updates 13–14;
these counts passed live data verification. The second Atlanta
trail needs separate UI selection work; the app currently chooses the first.

The map uses the custom style in `src/lib/basemap.ts` over OpenFreeMap vector
tiles. Self-hosted letterpress glyphs live in `public/glyphs/` and can be
regenerated with `npm run glyphs`.

Database setup, update order, intentional image gaps, and live verification are
documented in `db/README.md`. The no-env fallback is a reduced Bristol-only demo,
not a mirror of live Supabase.

Keep Phase 1 scoped to consolidation. V2 work belongs in `TODO-V2.md`.
