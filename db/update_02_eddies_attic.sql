-- =============================================================
-- UPDATE 02: Atlanta — replace WERD with Eddie's Attic
-- Run after seed_atlanta.sql
-- =============================================================

-- -------------------------------------------------------------
-- 1. Remove WERD (connections + trail stop cascade-delete)
-- -------------------------------------------------------------
delete from trail_stops where location_id in
  (select id from locations where slug = 'werd-radio');
delete from locations where slug = 'werd-radio';

-- Fold the Sweet Auburn radio history into the Royal Peacock card
-- so the broomstick story isn't lost:
update locations
set story_md = story_md || '

The Peacock anchored a whole ecosystem: two blocks east, the Prince Hall Masonic Temple housed WERD — the first Black-owned radio station in America (1949) — spinning the records by night while the SCLC worked downstairs. Legend holds that Dr. King would tap the ceiling with a broomstick when he needed airtime, and a microphone would be lowered out the window. Sweet Auburn ran the music, the media, and the movement from one avenue.'
where slug = 'royal-peacock';

-- -------------------------------------------------------------
-- 2. Add Eddie's Attic (orbit pin — Decatur)
--    Coords verified: 33.774000, -84.296361
-- -------------------------------------------------------------
with c as (select id from cities where slug = 'atlanta')
insert into locations
  (city_id, slug, name, lat, lng, coords_verified, address, pin_type,
   era_start, era_end, story_md, what_is_there_now,
   spotify_track_label, is_orbit, sort_order)
select c.id,
 'eddies-attic',
 'Eddie''s Attic',
 33.774000, -84.296361, true,
 '515-B N McDonough Street, Decatur, GA 30030',
 'venue', 1991, null,
 'Decatur''s legendary listening room — roughly 180 seats, impeccable acoustics, and a house rule that you silence your phone and actually listen. Founded by Eddie Owen as the square was coming back to life in the early ''90s, the Attic became the proving ground for the Southeast''s singer-songwriters: its Monday open mic and semi-annual Open Mic Shootout launched John Mayer, Shawn Mullins, Jennifer Nettles of Sugarland, Clay Cook, and — years later — Tyler Childers. A teenage Justin Bieber played an early showcase here; the Indigo Girls, Sheryl Crow, Brandi Carlile, and India.Arie have all stood on its tiny stage.

If the Dungeon is where Atlanta hip-hop was forged, the Attic is where its songwriters earned their first hushed room.',
 'Still Decatur''s premier listening room, with shows nearly every night and the open mic tradition alive on Mondays.',
 'Listen: Shawn Mullins — "Lullaby"',
 true, 3
from c;

-- -------------------------------------------------------------
-- 3. New connection: open-mic lineage
-- -------------------------------------------------------------
insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id,
 'Two rooms where Atlanta paid its dues: open mic night under the Attic''s house rules, and all-night basement sessions in Lakewood Heights — the city''s songwriter school and its hip-hop academy, running simultaneously in the early ''90s.'
from locations f, locations t
where f.slug = 'eddies-attic' and t.slug = 'the-dungeon';

-- -------------------------------------------------------------
-- 4. Rebuild trail stops in chronological order
--    (Eddie's Attic 1991 slots between Criminal Records and
--     the Dungeon; Criminal Records also 1991, shop before show)
-- -------------------------------------------------------------
delete from trail_stops where trail_id in
  (select id from trails where slug = 'atlanta-century');

insert into trail_stops (trail_id, location_id, stop_order, stop_note_md)
select tr.id, l.id, v.ord, v.note from (values
  ('152-nassau-street', 1, '1923. Stand where the building stood and where Southern recorded music began. Yes, it''s a Margaritaville now. Hold the feeling — the map exists so this doesn''t happen quietly again.'),
  ('fox-theatre', 2, '1929. The movie palace the city refused to lose. Catch a show under the fake stars if you can.'),
  ('royal-peacock', 3, '1949. Sweet Auburn''s crown jewel: Ray, Aretha, Sam Cooke, Gladys, Otis, Richard — with the WERD radio story two blocks east. Walk the avenue while you''re here.'),
  ('the-masquerade', 4, '1988. Heaven, Hell, and Purgatory — Atlanta''s alternative proving ground, now in Underground Atlanta.'),
  ('criminal-records', 5, '1991. Little Five Points'' living room. Records and comics — leave with one of each.'),
  ('eddies-attic', 6, '1991. Continue east to Decatur for the listening room where John Mayer and half the Southeast''s songwriters earned their first quiet crowd. Monday is open mic night.'),
  ('the-dungeon', 7, '1992. Drive past slowly and respectfully: the basement where the Dungeon Family taught the South to speak. Private residence — Big Boi''s, in fact.'),
  ('the-tabernacle', 8, '1996. A Baptist tabernacle reborn for the Olympics, now an essential room — and steps from where stop one happened, closing the downtown loop.'),
  ('stankonia-studios', 9, '1998. End where the kids who camped outside Bobby Brown''s studio ended up: owning it. The South had something to say.')
) as v(loc_slug, ord, note)
join locations l on l.slug = v.loc_slug
cross join (select id from trails where slug = 'atlanta-century') tr;
