-- =============================================================
-- UPDATE 11: Bristol venue layer
-- Adds static venue links and two Bristol pins. Repeat-safe.
-- Run after seed_bristol.sql.
-- =============================================================

alter table locations add column if not exists venue_status text;
alter table locations add column if not exists official_url text;
alter table locations add column if not exists tickets_url text;
alter table locations add column if not exists setlistfm_url text;
alter table locations add column if not exists setlistfm_venue_id text;
alter table locations add column if not exists ticketmaster_venue_id text;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'locations_venue_status_check'
  ) then
    alter table locations add constraint locations_venue_status_check
      check (venue_status in ('active','seasonal','closed','demolished'));
  end if;
end
$$;

with c as (select id from cities where slug = 'bristol')
insert into locations
  (city_id, slug, name, lat, lng, coords_verified, address, pin_type,
   era_start, era_end, story_md, what_is_there_now,
   spotify_track_label, is_orbit, sort_order)
select c.id, v.* from c, (values
  ('cameo-theatre',
   'Cameo Theatre',
   36.5952472, -82.1854053, true,
   '703 State Street, Bristol, VA 24201',
   'venue', 1925, null::integer,
   $story$The Cameo Theatre opened on March 30, 1925 with a vaudeville performance, two years before the Bristol Sessions changed the sound of State Street. Across the next century the room lived several lives: movie theatre, music hall, church, and radio station.

Brent and Stanley Buchanan restored the building, and Theatre Bristol brought live performance back to the stage for its centennial in 2025. Few Bristol rooms carry the city's entertainment history so cleanly from the pre-Sessions era into the present.$story$,
   $now$Restored and active as one of Theatre Bristol's three State Street stages, presenting live theatre and community productions.$now$,
   null::text,
   false, 10),
  ('hard-rock-live-bristol',
   'Hard Rock Live Bristol',
   36.5982229, -82.2192035, true,
   '500 Gate City Hwy, Bristol, VA 24201',
   'venue', 2024, null::integer,
   $story$When the permanent Hard Rock Hotel & Casino Bristol opened on November 14, 2024, its first night included a Blake Shelton concert in a new 23,000-square-foot performance room. Hard Rock Live brought a 2,000-plus-capacity touring stage to the western edge of the city.

For a place whose musical identity begins with portable recording equipment in 1927, this is the newest end of the timeline: a modern regional room routing national acts through Bristol nearly a century later.$story$,
   $now$An active 2,000-plus-capacity venue inside Hard Rock Hotel & Casino Bristol. Most events are 21+; check the individual listing before you go.$now$,
   null,
   true, 11)
) as v(slug, name, lat, lng, coords_verified, address, pin_type,
       era_start, era_end, story_md, what_is_there_now,
       spotify_track_label, is_orbit, sort_order)
on conflict (slug) do update set
  city_id = excluded.city_id,
  name = excluded.name,
  lat = excluded.lat,
  lng = excluded.lng,
  coords_verified = excluded.coords_verified,
  address = excluded.address,
  pin_type = excluded.pin_type,
  era_start = excluded.era_start,
  era_end = excluded.era_end,
  story_md = excluded.story_md,
  what_is_there_now = excluded.what_is_there_now,
  is_orbit = excluded.is_orbit,
  sort_order = excluded.sort_order;

update locations set
  venue_status = 'active',
  official_url = 'https://theatrebristol.org/our-stages/',
  tickets_url = 'https://theatrebristol.org/tickets/',
  setlistfm_url = 'https://www.setlist.fm/venue/the-cameo-theater-bristol-va-usa-5bd0fb9c.html',
  setlistfm_venue_id = '5bd0fb9c',
  ticketmaster_venue_id = null
where slug = 'cameo-theatre';

update locations set
  venue_status = 'active',
  official_url = 'https://casino.hardrock.com/bristol/entertainment/hard-rock-live',
  tickets_url = 'https://www.ticketmaster.com/hard-rock-live-bristol-tickets-bristol/venue/222877',
  setlistfm_url = 'https://www.setlist.fm/venue/hard-rock-live-bristol-va-usa-53de8711.html',
  setlistfm_venue_id = '53de8711',
  ticketmaster_venue_id = '222877'
where slug = 'hard-rock-live-bristol';

update locations set
  venue_status = 'active',
  official_url = 'https://paramountbristol.org/',
  tickets_url = 'https://paramountbristol.org/music-live-events/',
  setlistfm_url = 'https://www.setlist.fm/venue/paramount-center-for-the-arts-bristol-tn-usa-73d4eee5.html',
  setlistfm_venue_id = '73d4eee5',
  ticketmaster_venue_id = null
where slug = 'paramount-bristol';

update locations set
  venue_status = 'active',
  official_url = 'https://carterfamilyfold.org/',
  tickets_url = 'https://carterfamilyfold.org/events/',
  setlistfm_url = 'https://www.setlist.fm/venue/carter-family-fold-hiltons-va-usa-63d6daeb.html',
  setlistfm_venue_id = '63d6daeb',
  ticketmaster_venue_id = null
where slug = 'carter-family-fold';

update locations set
  venue_status = 'seasonal',
  official_url = 'https://birthplaceofcountrymusic.org/festival-bristol-rhythm/',
  tickets_url = 'https://birthplaceofcountrymusic.org/tickets/',
  setlistfm_url = 'https://www.setlist.fm/venue/bristol-rhythm-and-roots-reunion-bristol-tn-usa-5bd723d8.html',
  setlistfm_venue_id = '5bd723d8',
  ticketmaster_venue_id = null
where slug = 'rhythm-and-roots';
