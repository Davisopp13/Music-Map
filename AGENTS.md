# AGENTS.md — Music History Map

## Project

A personal, interactive atlas of American music history. The shipped baseline
has four cities (Bristol, Macon, Atlanta, Nashville), 42 story pins, four ordered
trails, districts, and inter-city story threads. Optimize for delight and
shipping, not product-scale abstraction.

## Stack and data

- Next.js App Router, TypeScript, TailwindCSS
- MapLibre GL JS with a custom worn-atlas style over OpenFreeMap vector tiles
- Self-hosted map glyphs in `public/glyphs/`
- Supabase Postgres; canonical setup and order in `db/README.md`
- Vercel deployment; Lucide React icons

Server components fetch Supabase data; the map is a client component. Each city
uses `/[citySlug]`; trail mode is an overlay, not a separate route. The bundled
local fallback is intentionally Bristol-only and reduced.

## Core loop

1. Pick one of four chapters from the overview.
2. Open a type-distinct pin and read its story, current-state note, media, and
   attribution/venue links when present.
3. Start that city’s trail and move through every numbered stop in order.
4. Follow story threads, including deep-linked pins in another city.

Story cards are the heart: generous typography, readable line length, a visible
era badge, and a worn-atlas/liner-notes feel. Orbit pins keep their dashed ring
and distance hint.

## Scope

Do not add auth, user pins, a CMS, time scrubber, live event API calls,
geolocation, multi-city trails, clustering, or another city during Phase 1.
Content edits remain SQL, and licensed media gaps may stay blank. Park new ideas
in `TODO-V2.md`.

Ship only when data verification, both viewport browser smoke tests, PWA checks,
lint, and the production build pass.
