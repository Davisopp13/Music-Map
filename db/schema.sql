-- =============================================================
-- MUSIC HISTORY MAP — Supabase Schema v1
-- Cities → Locations (pins) → Connections (story threads)
-- Trails → Trail Stops (ordered narratives)
-- =============================================================

create extension if not exists "uuid-ossp";

-- -------------------------------------------------------------
-- CITIES
-- -------------------------------------------------------------
create table cities (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,          -- 'bristol', 'macon', 'atlanta'
  name        text not null,
  state       text,                          -- 'TN/VA' is valid (Bristol!)
  center_lat  double precision not null,
  center_lng  double precision not null,
  default_zoom integer not null default 14,
  intro_md    text,                          -- city landing blurb
  sort_order  integer default 0
);

-- -------------------------------------------------------------
-- LOCATIONS (the pins)
-- -------------------------------------------------------------
create table locations (
  id              uuid primary key default uuid_generate_v4(),
  city_id         uuid references cities(id) on delete cascade,
  slug            text unique not null,
  name            text not null,
  lat             double precision not null,
  lng             double precision not null,
  coords_verified boolean default false,     -- false = geocode during build
  address         text,
  pin_type        text not null check (pin_type in
                    ('studio','venue','home','marker','museum','street','festival')),
  era_start       integer,                   -- year; powers the time scrubber
  era_end         integer,                   -- null = ongoing
  story_md        text not null,             -- the main narrative card
  what_is_there_now text,                    -- present-day note
  spotify_track_id  text,                    -- embed on the card
  spotify_track_label text,                  -- "Listen: 'Single Girl, Married Girl'"
  image_url       text,
  is_orbit        boolean default false,     -- nearby-but-essential (Carter Fold)
  sort_order      integer default 0
);

create index idx_locations_city on locations(city_id);
create index idx_locations_era on locations(era_start, era_end);

-- -------------------------------------------------------------
-- CONNECTIONS (lines between pins — the "threads" layer)
-- -------------------------------------------------------------
create table connections (
  id               uuid primary key default uuid_generate_v4(),
  from_location_id uuid references locations(id) on delete cascade,
  to_location_id   uuid references locations(id) on delete cascade,
  relationship_md  text not null,            -- "The Carters recorded here, then..."
  unique (from_location_id, to_location_id)
);

-- -------------------------------------------------------------
-- TRAILS (curated narratives; pins can belong to many trails)
-- -------------------------------------------------------------
create table trails (
  id             uuid primary key default uuid_generate_v4(),
  slug           text unique not null,
  name           text not null,
  description_md text,
  trail_type     text default 'walking' check (trail_type in
                   ('walking','driving','virtual')),
  sort_order     integer default 0
);

create table trail_stops (
  id           uuid primary key default uuid_generate_v4(),
  trail_id     uuid references trails(id) on delete cascade,
  location_id  uuid references locations(id) on delete cascade,
  stop_order   integer not null,
  stop_note_md text,                         -- trail-specific framing for this stop
  unique (trail_id, stop_order)
);

-- -------------------------------------------------------------
-- NOTES
-- * No RLS for MVP — public read-only data, personal project.
-- * Personal pins layer, auth, and user content = V2.
-- * spotify_track_id only (not full URLs) so the embed component
--   owns the URL format.
-- =============================================================

-- -------------------------------------------------------------
-- ROW LEVEL SECURITY — public READ-ONLY
-- Without RLS, the anon key can also INSERT/UPDATE/DELETE
-- (Supabase grants write privileges to anon by default).
-- Select-only policies make the data truly read-only for the
-- public; content edits happen via the SQL editor.
-- -------------------------------------------------------------
alter table cities      enable row level security;
alter table locations   enable row level security;
alter table connections enable row level security;
alter table trails      enable row level security;
alter table trail_stops enable row level security;

create policy "public read" on cities      for select to anon, authenticated using (true);
create policy "public read" on locations   for select to anon, authenticated using (true);
create policy "public read" on connections for select to anon, authenticated using (true);
create policy "public read" on trails      for select to anon, authenticated using (true);
create policy "public read" on trail_stops for select to anon, authenticated using (true);
