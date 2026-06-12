-- =============================================================
-- SEED: NASHVILLE, TN — "Mother Church and Music Row"
-- Facts verified June 2026. Pins with coords_verified = false
-- should be geocoded from address during build.
-- NOTE: Run AFTER seed_bristol.sql, seed_macon.sql, and
-- seed_atlanta.sql — inter-city connections reference their pins.
-- =============================================================

insert into cities (slug, name, state, center_lat, center_lng, default_zoom, intro_md, sort_order)
values (
  'nashville', 'Nashville', 'TN',
  36.1612, -86.7775, 13,
  $q$Music City earned the name twice over. Downtown, a gospel tabernacle became the Mother Church of Country Music while songwriters traded futures across the alley at Tootsie's. A mile southwest, two studios invented the Nashville Sound and recorded everyone from Elvis to Dylan. And on Jefferson Street — the chapter most maps skip — a young Jimi Hendrix was losing guitar duels in R&B clubs while the Opry played across town. Nashville isn't one music city — it's several, sharing a skyline.$q$,
  4
);

with c as (select id from cities where slug = 'nashville')

insert into locations
  (city_id, slug, name, lat, lng, coords_verified, address, pin_type,
   era_start, era_end, story_md, what_is_there_now,
   spotify_track_label, is_orbit, sort_order)
select c.id, v.* from c, (values

-- 1. THE MOTHER CHURCH -----------------------------------------------
('ryman-auditorium',
 'Ryman Auditorium',
 36.1612, -86.7785, false,
 '116 Rep. John Lewis Way N, Nashville, TN 37219',
 'venue', 1892, null,
 $q$Built in 1892 by riverboat captain Tom Ryman as the Union Gospel Tabernacle — the largest auditorium south of the Ohio River, soon nicknamed the Carnegie Hall of the South. In 1943 the Grand Ole Opry moved in and stayed thirty-one years, making the Ryman the Mother Church of Country Music.

What happened under that roof is a map of the genre itself. In December 1945, a young banjo player named Earl Scruggs stepped onstage with Bill Monroe's Blue Grass Boys and his three-finger roll detonated through the hall — many historians date the birth of bluegrass to that night, on that stage. In 1956, backstage, Johnny Cash introduced himself to June Carter — Maybelle's daughter, Bristol royalty — and told her he was going to marry her someday. The pews, the stained glass, and the unforgiving acoustics remain — performers still talk about the room like it's listening.$q$,
 $q$Fully restored and constantly booked — winner of Pollstar's Theater of the Year fourteen times. Tour by day, catch a show by night — the Opry still returns for winter runs.$q$,
 $q$Listen: Johnny Cash & June Carter — Jackson (they met backstage here, 1956)$q$,
 false, 1),

-- 2. TOOTSIE'S ----------------------------------------------------------
('tootsies-orchid-lounge',
 'Tootsie''s Orchid Lounge',
 36.1607, -86.7780, false,
 '422 Broadway, Nashville, TN 37203',
 'venue', 1960, null,
 $q$The purple honky-tonk whose back door opens onto the alley behind the Ryman — close enough that Opry performers could slip over between sets, and broke songwriters could catch them coming. Hattie Tootsie Bess bought the place in 1960, kept a cigar box of IOUs from hungry writers, and presided over the room where Willie Nelson, Kris Kristofferson, Roger Miller, and Hank Cochran drank, schemed, and pitched.

The most consequential pitch: Willie Nelson, newly arrived and broke, played his song Crazy here for Charlie Dick — Patsy Cline's husband — who took the demo home and woke Patsy up to hear it. The rest happened a mile away at the Quonset Hut.$q$,
 $q$Still pouring on Lower Broadway, three rowdy floors deep — the most famous honky-tonk on Honky Tonk Highway.$q$,
 'Listen: Willie Nelson — "Crazy" (pitched in this room)',
 false, 2),

-- 3. RCA STUDIO B --------------------------------------------------------
('rca-studio-b',
 'RCA Studio B',
 36.1497, -86.7950, false,
 '1611 Roy Acuff Place, Nashville, TN 37203',
 'studio', 1957, 1977,
 $q$The hit factory of the Nashville Sound. Elvis Presley recorded more than 200 songs in this room — Are You Lonesome Tonight? and It's Now or Never among them — standing on the X engineer Bill Porter taped to the floor to mark the room's sweet spot, beneath the triangular Porter Pyramids he hung to tame the acoustics. Roy Orbison cut Only the Lonely here — the Everly Brothers, Jim Reeves, Waylon, and Charley Pride all worked this room.

And in 1973, Dolly Parton recorded Jolene and I Will Always Love You here — in a single session's orbit, two of the most covered songs ever written. When RCA closed it in 1977, the room was left almost exactly as it was: same carpet, same piano, same X.$q$,
 $q$Preserved and open for daily tours through the Country Music Hall of Fame — you can stand on Elvis's X and touch the piano he played.$q$,
 $q$Listen: Dolly Parton — Jolene (recorded in this room, 1973)$q$,
 false, 3),

-- 4. THE QUONSET HUT ------------------------------------------------------
('quonset-hut',
 'The Quonset Hut (Columbia Studio B)',
 36.1502, -86.7918, false,
 '34 Music Square East, Nashville, TN 37203',
 'studio', 1954, 1982,
 $q$Music Row exists because of this building. In 1954-55, brothers Owen and Harold Bradley converted a house and an Army-surplus Quonset hut into Nashville's first Music Row recording studio — and the hits that poured out pulled every label in town to 16th Avenue. Patsy Cline recorded Crazy here in 1961, delivering Willie Nelson's tortured melody in one astonishing take. Brenda Lee's I'm Sorry, and decades of Johnny Cash, George Jones, Tammy Wynette, and Merle Haggard followed.

Columbia bought the complex in 1962 and built Studio A next door — where Bob Dylan came south to record most of Blonde on Blonde in 1966, scrambling every assumption about what Nashville music meant. The Hut itself survives, encased inside the newer building, restored by Belmont University as part of its music business college.$q$,
 $q$Preserved within Belmont University's Curb College complex on Music Square East — the surrounding block is still working Music Row.$q$,
 'Listen: Patsy Cline — "Crazy" (recorded here, 1961)',
 false, 4),

-- 5. CLUB BARON / JEFFERSON STREET -----------------------------------------
('club-baron',
 'Club Baron (Jefferson Street)',
 36.1685, -86.8135, false,
 '2614 Jefferson Street, Nashville, TN 37208',
 'venue', 1955, null,
 $q$The chapter most Nashville maps skip. From the 1930s to the 1960s, Jefferson Street was the city's R&B spine — a chitlin' circuit stronghold where Duke Ellington, Ella Fitzgerald, Little Richard, Etta James, and Otis Redding played the Del Morocco, the New Era, and Club Baron, drawing crowds from Fisk and Tennessee State.

Its greatest legend: a young Army veteran named Jimi Hendrix, stationed at nearby Fort Campbell, who held down a house gig with bassist Billy Cox at the Del Morocco — locals called him Marbles and thought he was too weird to make it. In 1963 he carried his amp into Club Baron to challenge Nashville's reigning guitarist Johnny Jones to a duel — and lost, schooled by the local master. Jones covered Purple Haze in 1969 as a tribute to the kid who became a genius.

Interstate 40 was later routed through the neighborhood, gutting the district. The Del Morocco is demolished — Club Baron survives as Elks Lodge #1102 — the only stage left in Nashville where Hendrix played — with a mural of the guitar duel on its wall and a preservation effort underway.$q$,
 $q$Pride of Tennessee Elks Lodge #1102, with the Hendrix guitar-duel mural outside and National Register efforts in motion. The Jefferson Street Sound Museum, nearby, keeps the district's story.$q$,
 $q$Listen: The Jimi Hendrix Experience — Purple Haze (Hendrix lost a guitar duel on this stage — the winner covered this song in tribute)$q$,
 false, 5),

-- 6. THE BLUEBIRD -------------------------------------------------------------
('bluebird-cafe',
 'The Bluebird Cafe',
 36.1027, -86.8163, false,
 '4104 Hillsboro Pike, Nashville, TN 37215',
 'venue', 1982, null,
 $q$Ninety seats in a strip mall, and arguably the most important small room in American songwriting. Since 1982 the Bluebird has run in the round — writers, not stars, sitting in the middle of the room playing the hits they wrote for other people, with a strictly enforced hush (the staff will shush you, regardless of who you are).

Its discovery legends are the genre's founding myths: Garth Brooks was signed after a Bluebird showcase — and it was here he heard Tony Arata play The Dance, the song that became his signature. Twenty years later, Scott Borchetta heard a teenage Taylor Swift at the Bluebird and built Big Machine Records around her. Two of the biggest careers in the history of recorded music, launched from the same ninety seats.$q$,
 $q$Still ninety seats, still two shows a night, still nearly impossible to get into — reservations vanish in minutes. Worth it.$q$,
 $q$Listen: Garth Brooks — The Dance (he first heard it in this room)$q$,
 false, 6),

-- 7. THE OPRY HOUSE -------------------------------------------------------------
('grand-ole-opry-house',
 'Grand Ole Opry House',
 36.2069, -86.6922, false,
 '2804 Opryland Drive, Nashville, TN 37214',
 'venue', 1974, null,
 $q$When the Opry left the Ryman in 1974 for its purpose-built home east of town, it carried its soul along physically: a six-foot circle of the Ryman's oak stage was cut out and inlaid at center stage of the new house. Every performer since — debuts, inductions, final bows — has stood on the same wood where Hank Williams stood.

The Opry itself is the longest-running radio broadcast in American history, on air since 1925 — the show that named Music City still goes out live from this room multiple nights a week.$q$,
 $q$Active several nights weekly, with daytime backstage tours. Stand on the circle if they let you — everyone who matters has.$q$,
 null,
 false, 7),

-- 8. THE STATION INN ---------------------------------------------------------------
('station-inn',
 'Station Inn',
 36.1525, -86.7843, false,
 '402 12th Avenue South, Nashville, TN 37203',
 'venue', 1974, null,
 $q$A squat stone bunker that watched the Gulch grow luxury towers around it and declined to care. Since 1974 the Station Inn has been bluegrass's world headquarters — Bill Monroe dropped in, Vince Gill treats it like a clubhouse, and the Sunday night jam is open to anyone who can keep up. No reservations, folding chairs, popcorn, and some of the best pickers alive any night of the week.

If the Ryman is where bluegrass was born, this is where it lives.$q$,
 $q$Same stone building, same folding chairs, surrounded by the new Gulch. Cash at the door, music at 9.$q$,
 null,
 false, 8),

-- 9. HATCH SHOW PRINT ----------------------------------------------------------------
('hatch-show-print',
 'Hatch Show Print',
 36.1581, -86.7765, false,
 '224 Rep. John Lewis Way S, Nashville, TN 37203',
 'marker', 1879, null,
 $q$Printing since 1879, and the reason country music looks the way it looks. Hatch's hand-carved letterpress blocks produced the posters for the Opry, Hank Williams, Johnny Cash, Elvis, and nearly a century of shows — bold wood type and two-color ink that became the visual language of American roots music. The shop still prints with the same blocks — a modern Hatch poster for tonight's Ryman show is made the way one was in 1940.

The map's reminder that music history isn't only sound.$q$,
 $q$Working letterpress shop and store inside the Country Music Hall of Fame building — watch them print, buy a poster.$q$,
 null,
 false, 9)

) as v(slug, name, lat, lng, coords_verified, address, pin_type,
       era_start, era_end, story_md, what_is_there_now,
       spotify_track_label, is_orbit, sort_order);

-- =============================================================
-- CONNECTIONS — within Nashville
-- =============================================================
insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, v.rel from (values
  ('tootsies-orchid-lounge', 'quonset-hut',
   $q$The map's shortest A&R pipeline: Willie Nelson pitched Crazy to Patsy Cline's husband over drinks at Tootsie's — and Patsy recorded it a mile away at the Quonset Hut. One song, two pins, country music's most famous handoff.$q$),
  ('ryman-auditorium', 'tootsies-orchid-lounge',
   $q$Separated by one alley: Opry performers slipped out the Ryman's back door and into Tootsie's between sets, and the songwriters waiting there knew it.$q$),
  ('ryman-auditorium', 'grand-ole-opry-house',
   $q$When the Opry moved in 1974, a six-foot circle of the Ryman's stage was cut out and inlaid in the new Opry House — the Mother Church's floor, still being stood on every show night.$q$),
  ('quonset-hut', 'rca-studio-b',
   $q$The Bradleys' Quonset Hut proved Nashville could mass-produce hits — RCA answered by building Studio B around the corner in 1957. Between the two of them: Music Row.$q$)
) as v(from_slug, to_slug, rel)
join locations f on f.slug = v.from_slug
join locations t on t.slug = v.to_slug;

-- =============================================================
-- INTER-CITY CONNECTIONS
-- (requires Bristol, Macon, and Atlanta seeds loaded)
-- =============================================================
insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, v.rel from (values
  ('ryman-auditorium', 'bristol-sessions-site',
   $q$The lineage runs straight: the string-band music recorded at Bristol in 1927 walked onto the Ryman stage in December 1945 as Bill Monroe's Blue Grass Boys — and when Earl Scruggs's banjo roll hit that room, bluegrass was born. The Big Bang and the Mother Church, eighteen years apart.$q$),
  ('ryman-auditorium', 'carter-family-fold',
   $q$Johnny Cash's two home stages: his network TV show taped at the Ryman from 1969 to 1971 — and his final concert, in 2003, was at the Carter Family Fold in Poor Valley, the family he married into backstage at this very building.$q$),
  ('club-baron', 'royal-peacock',
   $q$Two stops on the same chitlin' circuit: Little Richard and Otis Redding played Jefferson Street's clubs and Atlanta's Royal Peacock working the same network of Black venues across the segregated South — the circuit that built soul music city by city.$q$)
) as v(from_slug, to_slug, rel)
join locations f on f.slug = v.from_slug
join locations t on t.slug = v.to_slug;

-- =============================================================
-- TRAIL: Nashville — Mother Church and Music Row
-- =============================================================
insert into trails (slug, name, description_md, trail_type, sort_order)
values (
  'nashville-mother-church',
  'Nashville: Mother Church and Music Row',
  $q$Downtown's holy sites on foot, then Music Row's hit factories, Jefferson Street's buried R&B kingdom, and out to the rooms where the music still gets made every night. Allow a full day — and book the Bluebird weeks ahead.$q$,
  'driving', 4
);

insert into trail_stops (trail_id, location_id, stop_order, stop_note_md)
select tr.id, l.id, v.ord, v.note from (values
  ('ryman-auditorium', 1, $q$Start at the Mother Church. Take the tour, stand where Scruggs detonated bluegrass and where Cash met June. Everything else in this city answers to this room.$q$),
  ('hatch-show-print', 2, $q$Two blocks south: the print shop that gave all of it a look. Watch the presses, buy tonight's poster.$q$),
  ('tootsies-orchid-lounge', 3, $q$Back up to Broadway via the Ryman's alley — the exact route the Opry stars took. Order something, listen for the ghost of Willie pitching Crazy.$q$),
  ('quonset-hut', 4, $q$Drive to Music Row. The army-surplus hut that started it all — where Patsy sang Willie's song in one take.$q$),
  ('rca-studio-b', 5, $q$Around the corner: stand on Elvis's X, see Dolly's room. The Nashville Sound, preserved in amber.$q$),
  ('club-baron', 6, $q$North to Jefferson Street for the chapter the brochures skip: the last stage in Nashville where Jimi Hendrix played — and lost a guitar duel. Visit the Jefferson Street Sound Museum if it's a Saturday.$q$),
  ('grand-ole-opry-house', 7, $q$East to the Opry House. The circle in the stage is the Ryman's own wood — stop one, still underfoot.$q$),
  ('station-inn', 8, $q$Back to the Gulch as evening falls. Folding chairs, popcorn, world-class bluegrass. No reservations — just show up.$q$),
  ('bluebird-cafe', 9, $q$End at the ninety seats that launched Garth and Taylor — if you got a reservation. If not, add it to the next trip — the Bluebird teaches planning.$q$)
) as v(loc_slug, ord, note)
join locations l on l.slug = v.loc_slug
cross join (select id from trails where slug = 'nashville-mother-church') tr;
