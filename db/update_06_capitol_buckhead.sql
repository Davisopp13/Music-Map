-- =============================================================
-- UPDATE 06: Atlanta — the Georgia question, answered twice
--   1. Georgia State Capitol (Ray Charles, 1979)
--   2. Buckhead Theatre (Lukas Nelson)
-- Run after seed_atlanta.sql. Replace REPLACE_ME track IDs.
-- =============================================================

with c as (select id from cities where slug = 'atlanta')
insert into locations
  (city_id, slug, name, lat, lng, coords_verified, address, pin_type,
   era_start, era_end, story_md, what_is_there_now,
   spotify_track_label, is_orbit, sort_order)
select c.id, v.* from c, (values

-- THE CAPITOL ---------------------------------------------------------
('georgia-state-capitol',
 'Georgia State Capitol',
 33.7490, -84.3880, false,
 '206 Washington Street SW, Atlanta, GA 30334',
 'marker', 1979, 1979,
 'On March 7, 1979, Ray Charles sat at a piano beneath the gold dome and sang "Georgia on My Mind" to a joint session of the Georgia Legislature — the performance that consecrated it as the official state song. The resolution specifically named his 1960 recording: an Albany-born Black artist, honored by the legislature of a former Confederate state, singing the song most associated with his 55-year career.

When he finished, Secretary of State Ben Fortson — thirty-three years in office, two months from the end of his life — thanked him with words that belong on this pin forever: Charles "may have achieved here today something that nobody else has been able to do — to bring the minds and hearts of the Georgia Legislature together." Charles later wrote that the honor made him cry.

Footnote from the archives: ten years later, a state representative sponsored a bill to replace it with Macon''s own "Tutti Frutti." It did not pass — but the fact that Georgia''s two candidates for state song were Ray Charles and Little Richard tells you everything about this map.',
 'The working State Capitol — gold dome, museum exhibits, and tours. The license plates outside still read "Georgia on My Mind."',
 'Listen: Ray Charles — "Georgia on My Mind" (made the state song in this building, Mar 7, 1979)',
 false, 14),

-- THE BUCKHEAD THEATRE --------------------------------------------------
('buckhead-theatre',
 'Buckhead Theatre',
 33.8430, -84.3790, false,
 '3110 Roswell Road NW, Atlanta, GA 30305',
 'venue', 1931, null,
 'A Spanish Baroque movie house from Buckhead''s early days — long known as the Roxy — restored into one of the city''s best-sounding mid-size rooms (about 800 capacity). It''s the sweet spot of Atlanta venues: big enough for touring names, small enough that you can see the guitarist''s hands.

Its place on this map comes from one of those nights: Lukas Nelson singing "Forget About Georgia" — his answer song to "Georgia on My Mind," about loving a girl with the state''s name and then having to sing the standard with his father Willie night after night, unable to forget her. A song haunted by the state song, performed in the state''s capital city. The thread to the Capitol pin draws itself.',
 'An 800-cap Live Nation room on Roswell Road, hosting touring acts most nights of the week.',
 'Listen: Lukas Nelson & Promise of the Real — "Forget About Georgia" (performed here)',
 false, 15)

) as v(slug, name, lat, lng, coords_verified, address, pin_type,
       era_start, era_end, story_md, what_is_there_now,
       spotify_track_label, is_orbit, sort_order);

-- ---------------------------------------------------------------
-- Connection: the state song and its answer
-- ---------------------------------------------------------------
insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id,
 'Call and response, 38 years apart: Ray Charles made "Georgia on My Mind" the state song under the gold dome in 1979 — and Lukas Nelson''s "Forget About Georgia" is its heartbroken answer, written by a man who had to sing the standard every night with his father Willie while trying to forget a girl by that name.'
from locations f, locations t
where f.slug = 'georgia-state-capitol' and t.slug = 'buckhead-theatre';

-- ---------------------------------------------------------------
-- Track ID slots
-- ---------------------------------------------------------------
update locations set spotify_track_id = '47mA6f44zxLtdATOoY7GjN'
where slug = 'georgia-state-capitol';

update locations set spotify_track_id = '0PkT17sTXfokKBGc2fXjFG'
where slug = 'buckhead-theatre';

-- ---------------------------------------------------------------
-- NOTE: Capitol could join the downtown trail (it's blocks from
-- the Masquerade stop) — holding off until you decide whether the
-- trail stays at nine stops. Buckhead Theatre sits between
-- downtown and the north metro orbit pins.
-- ---------------------------------------------------------------
