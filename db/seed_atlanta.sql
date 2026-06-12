-- =============================================================
-- SEED: ATLANTA, GA — "Every Era, One City"
-- Facts verified June 2026. Pins with coords_verified = false
-- should be geocoded from address during build.
-- NOTE: Run AFTER seed_bristol.sql and seed_macon.sql —
-- the inter-city connections at the bottom reference their pins.
-- =============================================================

insert into cities (slug, name, state, center_lat, center_lng, default_zoom, intro_md, sort_order)
values (
  'atlanta', 'Atlanta', 'GA',
  33.7590, -84.3880, 12,
  'Atlanta doesn''t have one music story — it has all of them. The first commercial recordings in the South happened here in 1923, four years before Bristol. Sweet Auburn''s clubs and the nation''s first Black-owned radio station powered the soul era. And from a dirt-floor basement in Lakewood Heights, the Dungeon Family built the sound that made Atlanta the capital of hip-hop. The South got something to say — it started saying it here.',
  3
);

with c as (select id from cities where slug = 'atlanta')

insert into locations
  (city_id, slug, name, lat, lng, coords_verified, address, pin_type,
   era_start, era_end, story_md, what_is_there_now,
   spotify_track_label, is_orbit, sort_order)
select c.id, v.* from c, (values

-- 1. THE GHOST PIN ---------------------------------------------------
('152-nassau-street',
 '152 Nassau Street — Site of the South''s First Recordings',
 33.7600, -84.3940, false,
 '152 Nassau Street, Atlanta, GA 30303 (site; building demolished)',
 'studio', 1923, 1923,
 'Before Bristol, there was Atlanta. In June 1923, OKeh Records'' Ralph Peer came south and set up a pop-up studio in a vacant brick building on Nassau Street — the first time a major label brought professional recording equipment into the field. On June 19, local radio favorite Fiddlin'' John Carson cut "The Little Old Log Cabin in the Lane," which became country music''s first hit and proved there was a market for the South''s own music. The same sessions produced the first rural blues recordings — Fannie May Goosby and Lucille Bogan — making this modest building arguably the birthplace of commercially recorded Southern music, full stop.

The success here is what sent Peer back out on the road — and four years later, to Bristol.

The building improbably survived the Olympics and a tornado, only to be demolished in 2019 over preservationists'' lawsuits and petitions — replaced by a Margaritaville resort. Ken Burns'' "Country Music" documentary opens its story here anyway.',
 'The building is gone — a Margaritaville-themed development stands on the site, across from Centennial Olympic Park. The history survives in the recordings.',
 'Listen: Fiddlin'' John Carson — "The Little Old Log Cabin in the Lane"',
 false, 1),

-- 2. SWEET AUBURN: THE PEACOCK ---------------------------------------
('royal-peacock',
 'Royal Peacock',
 33.7556, -84.3812, false,
 '186 Auburn Avenue NE, Atlanta, GA 30303',
 'venue', 1949, null,
 'The crown jewel of Sweet Auburn — the avenue Fortune once called the richest Negro street in the world. Opened as the Top Hat in the 1930s and reborn as the Royal Peacock in 1949 under Carrie Cunningham, the club hosted virtually every giant of Black American music on the chitlin'' circuit: Ray Charles, Aretha Franklin, Sam Cooke, B.B. King, Gladys Knight, James Brown — and Macon''s own Little Richard and Otis Redding, for whom the Peacock was the big-city stage up the road.',
 'The building still stands on Auburn Avenue and has operated in various nightlife forms; the historic facade remains a Sweet Auburn landmark.',
 'Listen: Gladys Knight & the Pips — "Every Beat of My Heart"',
 false, 2),

-- 3. SWEET AUBURN: THE RADIO STATION ---------------------------------
('werd-radio',
 'WERD — First Black-Owned Radio Station in America',
 33.7553, -84.3770, false,
 '330 Auburn Avenue NE, Atlanta, GA 30303 (Prince Hall Masonic Temple)',
 'marker', 1949, 1968,
 'In 1949, Jesse B. Blayton Sr. bought WERD and made it the first radio station in America owned and programmed by Black Americans — broadcasting from the Prince Hall Masonic Temple on Auburn Avenue. DJ "Jockey Jack" Gibson spun rhythm and blues to the city that would become a soul capital.

The building''s other tenant made it doubly historic: the Southern Christian Leadership Conference kept offices downstairs. When Dr. King needed airtime, the story goes, he''d tap the ceiling with a broomstick and a microphone would be lowered out the window to him. Music, media, and the movement — one address.',
 'The Prince Hall Masonic Temple still stands on Auburn Avenue, within the Martin Luther King Jr. National Historical Park district.',
 null,
 false, 3),

-- 4. THE FOX ----------------------------------------------------------
('fox-theatre',
 'Fox Theatre',
 33.7726, -84.3857, false,
 '660 Peachtree Street NE, Atlanta, GA 30308',
 'venue', 1929, null,
 'A 1929 Moorish-fantasy movie palace — minarets, a night-sky ceiling with drifting clouds, and the mighty Möller organ "Mighty Mo." By the 1970s it was slated for demolition, and the "Save the Fox" campaign became one of America''s great preservation victories. Lynyrd Skynyrd recorded their landmark live album "One More from the Road" here in 1976, with proceeds from benefit shows supporting the rescue.

Since then the Fox has been Atlanta''s room: everyone from Elvis to Prince to the touring giants of every genre has played under that fake starlit sky.',
 'Fully restored, on the National Register, and one of the busiest theaters in the country.',
 'Listen: Lynyrd Skynyrd — "Free Bird" (One More from the Road, live at the Fox)',
 false, 4),

-- 5. THE TABERNACLE ----------------------------------------------------
('the-tabernacle',
 'The Tabernacle',
 33.7592, -84.3915, false,
 '152 Luckie Street NW, Atlanta, GA 30303',
 'venue', 1996, null,
 'A 1910 Baptist tabernacle reborn as a music venue for the 1996 Olympics (as a House of Blues) and never looked back. The sanctuary bones — balconies, organ pipes, stained glass — make it one of the most distinctive rooms in American live music, an intimate 2,600-cap stop where arena acts come to play close. Bob Dylan, Prince, Adele, and half of hip-hop history have played "the Tabby."',
 'Going strong as one of Atlanta''s essential venues, steps from Centennial Olympic Park — and from the Nassau Street site.',
 null,
 false, 5),

-- 6. CRIMINAL RECORDS --------------------------------------------------
('criminal-records',
 'Criminal Records',
 33.7649, -84.3494, false,
 '1154 Euclid Avenue NE, Atlanta, GA 30307 (Little Five Points)',
 'marker', 1991, null,
 'Little Five Points'' beloved independent record store — vinyl, comics, and in-stores since 1991. It''s the scene''s living room: release-day lines, intimate in-store performances from acts on the way up (and legends keeping it real), and a comics wall that makes it a required double-stop for anyone who loves both Image Comics and LPs. If the map needs one pin for Atlanta''s ongoing, everyday music culture, this is it.',
 'Open daily in Little Five Points. Buy a record; the map insists.',
 null,
 false, 6),

-- 7. THE MASQUERADE ----------------------------------------------------
('the-masquerade',
 'The Masquerade',
 33.7527, -84.3897, false,
 '75 Martin Luther King Jr Dr SW, Atlanta, GA 30303 (Underground Atlanta)',
 'venue', 1988, null,
 'Three rooms named Heaven, Hell, and Purgatory — the eternal architecture of Atlanta''s alternative scene. Founded in 1988 in the old Excelsior Mill on North Avenue, the Masquerade was the proving ground for punk, metal, indie, and underground hip-hop for nearly three decades before relocating to Kenny''s Alley in Underground Atlanta in 2016, room names intact. Generations of Atlanta kids saw their first loud show here.',
 'Operating in Underground Atlanta — Heaven, Hell, and Purgatory, just like always.',
 null,
 false, 7),

-- 8. THE DUNGEON --------------------------------------------------------
('the-dungeon',
 'The Dungeon',
 33.7080, -84.3780, false,
 'Lakewood Terrace SE, Lakewood Heights, Atlanta, GA 30315',
 'home', 1992, 1998,
 'The basement of Rico Wade''s mother''s house in Lakewood Heights: dirt floors, rickety stairs, speakers wedged into the walls, and sleeping bags for the teenagers who stayed up all night making music. This was the first studio of Organized Noize — Wade, Ray Murray, and Sleepy Brown — and the meeting ground of the collective that took its name from the room: the Dungeon Family. OutKast, Goodie Mob, Big Rube, Witchdoctor.

OutKast''s "Southernplayalisticadillacmuzik," "ATLiens," and "Aquemini" were built from this basement — the records that forced the coasts to take the South seriously. In 2019, Big Boi bought the house, tweeting that he''d "just copped the Dungeon."

A private residence in a residential neighborhood — this pin is history, not a doorstep visit.',
 'A private home, now owned by Big Boi. View from the map, not the curb.',
 'Listen: OutKast — "Player''s Ball"',
 false, 8),

-- 9. STANKONIA -----------------------------------------------------------
('stankonia-studios',
 'Stankonia Studios',
 33.7983487, -84.4104397, true,
 '677 Antone Street NW, Atlanta, GA 30318',
 'studio', 1998, null,
 'As teenagers, Big Boi and André 3000 used to camp outside Bobby Brown''s Bosstown Recording Studios hoping to glimpse the star — it was the first place the duo ever recorded vocals together, on a 1992 TLC remix. In 1998, flush off "Aquemini," they bought the building out of foreclosure and renamed it Stankonia.

The first thing they made there changed everything: "Stankonia" (2000), with "B.O.B." and "Ms. Jackson," produced largely by the duo themselves as Earthtone III with Mr. DJ — church choirs, punk guitars, and drum-and-bass colliding into the record that redefined Southern rap''s ceiling. "Speakerboxxx/The Love Below" followed and won Album of the Year. The street it sits on was once known as "studio row."',
 'Still an active recording studio in northwest Atlanta.',
 'Listen: OutKast — "B.O.B. (Bombs Over Baghdad)"',
 false, 9)

) as v(slug, name, lat, lng, coords_verified, address, pin_type,
       era_start, era_end, story_md, what_is_there_now,
       spotify_track_label, is_orbit, sort_order);

-- =============================================================
-- CONNECTIONS — within Atlanta
-- =============================================================
insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, v.rel from (values
  ('the-dungeon', 'stankonia-studios',
   'From a dirt-floor basement to owning Bobby Brown''s old studio: OutKast''s whole arc, drawn as one line across the city.'),
  ('werd-radio', 'royal-peacock',
   'Two pillars of Sweet Auburn, blocks apart: the first Black-owned radio station in America spinning the records, and the Peacock booking the artists who made them.'),
  ('152-nassau-street', 'the-tabernacle',
   'Steps apart downtown: where Southern recording began in 1923, and where Atlanta still packs a converted church to hear live music a century later.')
) as v(from_slug, to_slug, rel)
join locations f on f.slug = v.from_slug
join locations t on t.slug = v.to_slug;

-- =============================================================
-- INTER-CITY CONNECTIONS — the map's first long threads
-- (requires Bristol + Macon seeds to be loaded)
-- =============================================================
insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, v.rel from (values
  ('152-nassau-street', 'bristol-sessions-site',
   'Ralph Peer''s 1923 Atlanta sessions invented the field-recording model — and their success is what sent him back south. Four years later, the same approach in Bristol produced the Big Bang of country music. Atlanta was the test; Bristol was the explosion.'),
  ('royal-peacock', 'douglass-theatre',
   'The chitlin'' circuit ran through both rooms: Little Richard and Otis Redding played Macon''s Douglass on the way up and Atlanta''s Royal Peacock when they got there — 80 miles of I-75 between hometown stage and big-city crown.')
) as v(from_slug, to_slug, rel)
join locations f on f.slug = v.from_slug
join locations t on t.slug = v.to_slug;

-- =============================================================
-- TRAIL: Atlanta — A Century in Nine Stops (chronological)
-- =============================================================
insert into trails (slug, name, description_md, trail_type, sort_order)
values (
  'atlanta-century',
  'Atlanta: A Century in Nine Stops',
  'Walk Atlanta''s music history in the order it happened — from the 1923 sessions that started Southern recording, through Sweet Auburn''s soul era, to the basement that made Atlanta the capital of hip-hop. Downtown stops cluster on foot; the Dungeon and Stankonia bookend by car.',
  'driving', 3
);

insert into trail_stops (trail_id, location_id, stop_order, stop_note_md)
select tr.id, l.id, v.ord, v.note from (values
  ('152-nassau-street', 1, '1923. Stand where the building stood and where Southern recorded music began. Yes, it''s a Margaritaville now. Hold the feeling — the map exists so this doesn''t happen quietly again.'),
  ('fox-theatre', 2, '1929. The movie palace the city refused to lose. Catch a show under the fake stars if you can.'),
  ('werd-radio', 3, '1949. The Masonic Temple where Black radio was born — and where Dr. King tapped the ceiling with a broomstick for a microphone.'),
  ('royal-peacock', 4, '1949. Sweet Auburn''s crown jewel: Ray, Aretha, Sam Cooke, Gladys, Otis, Richard. Walk the avenue while you''re here.'),
  ('the-masquerade', 5, '1988. Heaven, Hell, and Purgatory — Atlanta''s alternative proving ground, now in Underground Atlanta.'),
  ('criminal-records', 6, '1991. Little Five Points'' living room. Records and comics — leave with one of each.'),
  ('the-dungeon', 7, '1992. Drive past slowly and respectfully: the basement where the Dungeon Family taught the South to speak. Private residence — Big Boi''s, in fact.'),
  ('the-tabernacle', 8, '1996. A Baptist tabernacle reborn for the Olympics, now an essential room — and steps from where stop one happened, closing the downtown loop.'),
  ('stankonia-studios', 9, '1998. End where the kids who camped outside Bobby Brown''s studio ended up: owning it. The South had something to say.')
) as v(loc_slug, ord, note)
join locations l on l.slug = v.loc_slug
cross join (select id from trails where slug = 'atlanta-century') tr;
