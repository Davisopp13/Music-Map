-- =============================================================
-- SEED: MACON, GA — "Soul to Southern Rock"
-- Facts verified June 2026. Coordinates geocoded June 2026
-- (Nominatim house/POI matches; statue from Visit Macon directory,
-- 436 Cotton Ave, post-2025 relocation).
-- =============================================================

insert into cities (slug, name, state, center_lat, center_lng, default_zoom, intro_md, sort_order)
values (
  'macon', 'Macon', 'GA',
  32.8407, -83.6324, 14,
  'Pound for pound, no American city has produced more music history than Macon. Little Richard invented rock''n''roll wildness here. A teenager named Otis Redding got discovered on a local talent show. And the company Otis co-founded became Capricorn Records — the label that brought the Allman Brothers to town and made Macon ground zero for Southern Rock. Soul, rock''n''roll, and Southern rock: three revolutions, one mid-size Georgia town.',
  2
);

with c as (select id from cities where slug = 'macon')

insert into locations
  (city_id, slug, name, lat, lng, coords_verified, address, pin_type,
   era_start, era_end, story_md, what_is_there_now,
   spotify_track_label, is_orbit, sort_order)
select c.id, v.* from c, (values

-- 1. THE ANCHOR ----------------------------------------------------
('capricorn-sound-studios',
 'Capricorn Sound Studios (Mercer Music at Capricorn)',
 32.83274, -83.62718, true,
 '530 Martin Luther King Jr Blvd, Macon, GA 31201',
 'studio', 1969, null,
 'The building was purchased in 1967 by RedWal Music — a company co-founded by Phil Walden, his brother Alan, and Otis Redding. Three days after finishing overdubs on "(Sittin'' on) the Dock of the Bay," Otis died in a plane crash, and the project stalled. When the studio finally opened in 1969 under the Capricorn Records banner, Walden''s first recruit was a session guitarist named Duane Allman, whom he asked to put together a band.

What followed made Macon the capital of Southern Rock. The Allman Brothers recorded significant portions of three albums here, plus Gregg''s solo "Laid Back" and Dickey Betts''s "Highway Call." Between 1969 and 1979 Capricorn produced nine platinum albums and seventeen gold, recording the Marshall Tucker Band, Charlie Daniels, Wet Willie, and Percy Sledge along the way. The label''s annual BBQ drew the music world to Macon, and its support helped put Georgia''s Jimmy Carter in the White House.

After decades of decay, Mercer University restored the studio, reopening it in 2019 with the original Tom Hidley room design and a custom 40-channel API console — not as a shrine, but as a working studio again.',
 'Mercer Music at Capricorn: an active recording studio plus a 1,200 sq ft interactive museum with a Capricorn catalog listening station.',
 'Listen: The Allman Brothers Band — "Ramblin'' Man" (recorded here)',
 false, 1),

-- 2. THE BIG HOUSE -------------------------------------------------
('the-big-house',
 'The Big House (Allman Brothers Band Museum)',
 32.84590, -83.65571, true,
 '2321 Vineville Avenue, Macon, GA 31204',
 'home', 1970, 1973,
 'In January 1970, Berry Oakley''s wife Linda fell in love with an 18-room Tudor revival house on Vineville Avenue, built in 1900. Berry and Linda rented it; Duane and Gregg moved in; and "the Big House" became the communal heart of the Allman Brothers Band — part home, part rehearsal hall, part extended-family commune during the years the band recorded "At Fillmore East" and "Eat a Peach" and lost both Duane and Berry to motorcycle crashes three blocks apart, a year apart.

Today it holds the world''s largest collection of Allman Brothers memorabilia, displayed in the rooms where the band actually lived.',
 'The Allman Brothers Band Museum — guitars, gold records, and the actual rooms, kept much as they were.',
 'Listen: The Allman Brothers Band — "Blue Sky"',
 false, 2),

-- 3. ROSE HILL -----------------------------------------------------
('rose-hill-cemetery',
 'Rose Hill Cemetery',
 32.84617, -83.63465, true,
 '1071 Riverside Drive, Macon, GA 31201',
 'marker', 1840, null,
 'A terraced 1840s cemetery rolling down to the Ocmulgee River — and the Allman Brothers'' favorite haunt. Broke and unknown, they wrote songs among the headstones; Dickey Betts borrowed the name from one for the instrumental "In Memory of Elizabeth Reed." The real Elizabeth Reed Napier is buried here.

So, now, are Duane Allman and Berry Oakley, side by side, joined decades later by Gregg. The place where the band wrote its music became the place it rests — there may be no more complete circle anywhere on this map.',
 'Open to visitors. The Allman plot draws pilgrims from around the world; guitar picks accumulate on the headstones.',
 'Listen: The Allman Brothers Band — "In Memory of Elizabeth Reed" (At Fillmore East)',
 false, 3),

-- 4. H&H ------------------------------------------------------------
('h-and-h-restaurant',
 'H&H Restaurant',
 32.83577, -83.63482, true,
 '807 Forsyth Street, Macon, GA 31201',
 'marker', 1959, null,
 'When the Allman Brothers were broke nobodies, "Mama Louise" Hudson fed them anyway — famously letting the band split plates and run tabs they couldn''t pay. They never forgot it: when success came, Mama Louise traveled with the band as a cook on tour, and H&H became Southern Rock''s unofficial commissary. The soul food restaurant remains a Macon institution, its walls covered in band history.',
 'Still serving soul food downtown; the Allman Brothers connection is celebrated on every wall.',
 null,
 false, 4),

-- 5. THE DOUGLASS ---------------------------------------------------
('douglass-theatre',
 'Douglass Theatre',
 32.83548, -83.62580, true,
 '355 Martin Luther King Jr Blvd, Macon, GA 31201',
 'venue', 1921, null,
 'Founded by Black entrepreneur Charles Henry Douglass, this theater hosted Bessie Smith, Ma Rainey, Duke Ellington, Cab Calloway, Little Richard, and James Brown across its first half-century. Its most consequential night came in 1958: a teenager named Otis Redding performed on "The Teenage Party," a live talent show hosted by DJ Hamp "King Bee" Swain — and a young Phil Walden heard him. That single broadcast set in motion the management company, the label, and ultimately all of Capricorn Records.

The theater went dark for twenty years before the city restored it, reopening in 1997.',
 'Restored and active — films, live performances, and educational programs.',
 'Listen: Otis Redding — "These Arms of Mine"',
 false, 5),

-- 6. LITTLE RICHARD -------------------------------------------------
('little-richard-house',
 'The Little Richard House',
 32.84192, -83.64673, true,
 '416 Craft Street, Macon, GA 31201',
 'home', 1932, null,
 'Richard Penniman was born in Macon in 1932, one of twelve children in the Pleasant Hill neighborhood, and started out singing gospel and washing dishes at the Greyhound station downtown. By the mid-1950s, "Tutti Frutti" and "Long Tall Sally" had detonated — the wildest, loudest, most flamboyant sound anyone had heard, and a foundation stone of rock''n''roll itself. Every architect of the genre, from the Beatles to Prince, traces a line back to him.

His childhood home was relocated and preserved as a resource center, keeping the Architect of Rock''n''Roll''s origin story rooted in the neighborhood that raised him.',
 'The relocated childhood home operates as the Little Richard House Resource Center, a community space honoring his legacy.',
 'Listen: Little Richard — "Tutti Frutti"',
 false, 6),

-- 7. OTIS CENTER + STATUE -------------------------------------------
('otis-redding-statue',
 'Otis Redding Statue & Center for the Arts',
 32.83696, -83.63002, true,
 '436 Cotton Avenue, Macon, GA 31201',
 'marker', 2002, null,
 'A life-size bronze of Otis sitting on dock pilings with a guitar — "(Sittin'' on) the Dock of the Bay" cast in metal. Created in 2002 by sculptors Bradly Cooley and Bradley Cooley Jr. for Gateway Park, the statue was moved in 2025 to its permanent home in front of the Zelma Redding Amphitheater at the new Otis Redding Center for the Arts — the music-education center built by the foundation his widow Zelma started in 2007.

Otis was raised in Macon from age five, sang in church, dropped out of high school to help his family, and toured with Little Richard''s old band the Upsetters before becoming the King of Soul. He died at 26, three days after recording his biggest song.',
 'The statue fronts the Zelma Redding Amphitheater at the Otis Redding Center for the Arts; the foundation also runs a mini-museum on Cotton Avenue.',
 'Listen: Otis Redding — "(Sittin'' on) The Dock of the Bay"',
 false, 7),

-- 8. GRANT'S LOUNGE --------------------------------------------------
('grants-lounge',
 'Grant''s Lounge',
 32.83486, -83.62992, true,
 '576 Poplar Street, Macon, GA 31201',
 'venue', 1971, null,
 'Billed as "the Original Home of Southern Rock," Grant''s Lounge was the de facto playground of Capricorn Records — the dark little club where the Allman Brothers, Lynyrd Skynyrd, Wet Willie, and the Marshall Tucker Band jammed, auditioned, and unwound. Label scouts watched new acts here; legends sat in unannounced. It still hosts jam sessions today, making it one of the few pins on this map where the original room is still doing the original job.',
 'Still open, still hosting live music and jam sessions downtown.',
 null,
 false, 8),

-- 9. CITY AUDITORIUM -------------------------------------------------
('macon-city-auditorium',
 'Macon City Auditorium',
 32.83735, -83.63129, true,
 '415 First Street, Macon, GA 31201',
 'venue', 1925, null,
 'A 1925 domed landmark on the National Register where Little Richard, James Brown, and Otis Redding all performed on their way up. Its heaviest moment came in December 1968: Otis Redding''s funeral, where more than 4,500 mourners pressed into a hall built for 3,000. Atlantic Records'' Jerry Wexler gave the eulogy. The whole arc of Macon soul — discovery at the Douglass, stardom, and loss — closed under this copper dome.',
 'Still an active event venue, recognizable by its massive copper dome.',
 null,
 false, 9)

) as v(slug, name, lat, lng, coords_verified, address, pin_type,
       era_start, era_end, story_md, what_is_there_now,
       spotify_track_label, is_orbit, sort_order);

-- =============================================================
-- CONNECTIONS — Macon's story is one long causal chain
-- =============================================================
insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, v.rel from (values
  ('douglass-theatre', 'capricorn-sound-studios',
   'Phil Walden heard teenage Otis Redding on a Douglass Theatre broadcast in 1958. Their partnership became RedWal Music, which bought the building that became Capricorn Sound Studios.'),
  ('capricorn-sound-studios', 'the-big-house',
   'Capricorn signed Duane Allman and brought the band to Macon; weeks later, Linda Oakley found them the Tudor house on Vineville Avenue.'),
  ('the-big-house', 'rose-hill-cemetery',
   'The band wrote songs among Rose Hill''s headstones while living at the Big House. Duane and Berry — killed in motorcycle crashes a year apart — are buried there, later joined by Gregg.'),
  ('h-and-h-restaurant', 'the-big-house',
   'Mama Louise fed the broke band on credit during the Big House years; when they made it, she toured with them as their cook.'),
  ('little-richard-house', 'otis-redding-statue',
   'Otis Redding got his first touring break with the Upsetters — Little Richard''s former band. Macon''s first revolution hired its second.'),
  ('douglass-theatre', 'macon-city-auditorium',
   'The theater where Otis was discovered in 1958, and the hall where Macon said goodbye to him in 1968.'),
  ('capricorn-sound-studios', 'grants-lounge',
   'Grant''s was Capricorn''s after-hours annex — where the label''s bands jammed and its scouts found new ones.')
) as v(from_slug, to_slug, rel)
join locations f on f.slug = v.from_slug
join locations t on t.slug = v.to_slug;

-- =============================================================
-- TRAIL: Macon — Soul to Southern Rock
-- =============================================================
insert into trails (slug, name, description_md, trail_type, sort_order)
values (
  'macon-soul-to-southern-rock',
  'Macon: Soul to Southern Rock',
  'Follow the causal chain: a teenager wins a talent show, his manager builds a label, the label imports a band, and Southern Rock is born. Downtown stops are walkable; the Big House and Rose Hill are a short drive.',
  'driving', 2
);

insert into trail_stops (trail_id, location_id, stop_order, stop_note_md)
select tr.id, l.id, v.ord, v.note from (values
  ('little-richard-house', 1, 'Start at the beginning: the Architect of Rock''n''Roll, born here in 1932. Everything in Macon — and half of popular music — flows downstream from him.'),
  ('douglass-theatre', 2, 'The hinge of the whole story: teenage Otis on a 1958 talent broadcast, and Phil Walden listening.'),
  ('macon-city-auditorium', 3, 'Where Macon''s stars played on the way up — and where 4,500 people mourned Otis in 1968.'),
  ('otis-redding-statue', 4, 'Sit with Otis on the dock of the bay. The education center behind the statue is his widow Zelma''s life work.'),
  ('capricorn-sound-studios', 5, 'The studio Otis co-founded but never saw open. Walden''s first signing: Duane Allman. Tour the museum, then peek at the working Studio A.'),
  ('grants-lounge', 6, 'Capricorn''s clubhouse. If there''s a jam on tonight, come back after dinner.'),
  ('h-and-h-restaurant', 7, 'Lunch stop, mandatory. Order soul food and read the walls — Mama Louise fed this entire genre.'),
  ('the-big-house', 8, 'Short drive up Vineville: the band''s communal home, now the world''s best Allman Brothers museum.'),
  ('rose-hill-cemetery', 9, 'End among the terraces where the band wrote — and where Duane, Berry, and Gregg rest. Find Elizabeth Reed''s headstone on your way out.')
) as v(loc_slug, ord, note)
join locations l on l.slug = v.loc_slug
cross join (select id from trails where slug = 'macon-soul-to-southern-rock') tr;
