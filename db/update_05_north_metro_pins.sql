-- =============================================================
-- UPDATE 05: Atlanta — two north metro pins
--   1. The Chattahoochee River (Alan Jackson) — Roswell stretch
--   2. Ameris Bank Amphitheatre (Zac Brown Band)
-- Run after seed_atlanta.sql. Both are orbit pins.
-- Replace REPLACE_ME track IDs from share links.
-- =============================================================

with c as (select id from cities where slug = 'atlanta')
insert into locations
  (city_id, slug, name, lat, lng, coords_verified, address, pin_type,
   era_start, era_end, story_md, what_is_there_now,
   spotify_track_label, is_orbit, sort_order)
select c.id, v.* from c, (values

-- THE RIVER ----------------------------------------------------------
('chattahoochee-river',
 'The Chattahoochee River',
 33.9985, -84.3540, false,
 'Riverside Park, 575 Riverside Road, Roswell, GA 30075 (Chattahoochee River NRA)',
 'marker', 1993, null::integer,
 'In 1993, Newnan''s Alan Jackson released a song about learning "a lot about livin'' and a little ''bout love" on his boyhood stretch of this river — and "Chattahoochee" became country''s ultimate water anthem: four weeks at #1, CMA Single and Song of the Year, and a Video of the Year clip of Jackson water-skiing in torn jeans and a cowboy hat that''s still being recreated thirty years later.

The song did real work, too. It became the unofficial soundtrack of the Chattahoochee Riverkeeper''s early years, as the young organization sued the city of Atlanta over chronic sewage spills — a fight that led to billions in cleanup. The muddy water got measurably less muddy partly because a country song made millions of people love a river.

This pin sits on the Roswell stretch of the Chattahoochee River National Recreation Area, where metro Atlanta actually lives the song every summer — rafts, kayaks, and coolers, "Shooting the Hooch." The map''s first pin that isn''t a building: some music history is a river.',
 'The Chattahoochee River NRA — paddle it, raft it, or walk the Roswell Riverwalk alongside it. Hotter than a hoochie coochie in July, as documented.',
 'Listen: Alan Jackson — "Chattahoochee"',
 true, 12),

-- THE SHED -----------------------------------------------------------
('ameris-bank-amphitheatre',
 'Ameris Bank Amphitheatre',
 34.0606, -84.2942, false,
 '2200 Encore Parkway, Alpharetta, GA 30009',
 'venue', 2008, null::integer,
 'The north metro''s shed: a 12,000-capacity amphitheatre — fan-shaped pavilion, sprawling lawn — that opened on May 10, 2008 with a performance by the Atlanta Symphony Orchestra, which still calls it a summer home for themed orchestral nights. Born as Verizon Wireless Amphitheatre at Encore Park and renamed for Ameris Bank in 2019, it''s where the suburbs north of the city see their shows: Buffett, Stapleton, Dave Matthews, and — fittingly for a Georgia venue — regular visits from Atlanta''s own Zac Brown Band, the hometown country juggernaut playing the hometown lawn.

Most pins on this map mark where music history happened. This one marks where a few hundred thousand people a year are out on a blanket making their own.',
 'Live Nation''s busy north metro amphitheatre — 30+ shows a summer under the oaks off GA-400.',
 'Listen: Zac Brown Band — "Chicken Fried" (Atlanta''s own, on the hometown lawn)',
 true, 13)

) as v(slug, name, lat, lng, coords_verified, address, pin_type,
       era_start, era_end, story_md, what_is_there_now,
       spotify_track_label, is_orbit, sort_order);

-- ---------------------------------------------------------------
-- Connection: 70 years of Georgia country on one map
-- ---------------------------------------------------------------
insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id,
 'Georgia country, bookended: the genre''s first-ever hit was recorded on Nassau Street in 1923 by Fiddlin'' John Carson — and seventy years later, Newnan''s Alan Jackson put the state''s river at #1. Same state, same music, one human lifetime apart.'
from locations f, locations t
where f.slug = '152-nassau-street' and t.slug = 'chattahoochee-river';

-- ---------------------------------------------------------------
-- Track ID slots
-- ---------------------------------------------------------------
update locations set spotify_track_id = '59kHPbwyyCApYA8RQQEuXm'
where slug = 'chattahoochee-river';

update locations set spotify_track_id = '0LQtEJt7x0s6knb6RKdRYc'
where slug = 'ameris-bank-amphitheatre';

-- ---------------------------------------------------------------
-- NOTE: Neither pin is added to the "Atlanta: A Century in Nine
-- Stops" trail — both sit 25+ miles from the downtown loop. They
-- live on the map as orbit pins. A future "North Metro" or
-- "Georgia Country" mini-trail could collect Eddie's Attic, the
-- river, and Ameris. (TODO-V2.md)
-- ---------------------------------------------------------------
