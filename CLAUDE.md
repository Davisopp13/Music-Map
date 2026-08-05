# CLAUDE.md — Music History Map

Follow the project guidance in `AGENTS.md`. The current baseline is four cities,
42 pins, four trails with 35 stops, 25 story connections, and eight districts.

The map uses the custom style in `src/lib/basemap.ts` over OpenFreeMap vector
tiles. Self-hosted letterpress glyphs live in `public/glyphs/` and can be
regenerated with `npm run glyphs`.

Database setup, update order, intentional image gaps, and live verification are
documented in `db/README.md`. The no-env fallback is a reduced Bristol-only demo,
not a mirror of live Supabase.

Keep Phase 1 scoped to consolidation. V2 work belongs in `TODO-V2.md`.
