-- =============================================================
-- SEED: BRISTOL, TN/VA — "The Big Bang of Country Music"
-- Facts verified June 2026. Coordinates geocoded June 2026
-- (Nominatim house/POI matches, Wikipedia/NRHP for landmarks,
-- address-block interpolation for the demolished Sessions site;
-- sanity-checked against the verified museum anchor).
-- =============================================================

insert into cities (slug, name, state, center_lat, center_lng, default_zoom, intro_md, sort_order)
values (
  'bristol', 'Bristol', 'TN/VA',
  36.5951, -82.1885, 15,
  'One street, two states, twelve days in 1927 that changed American music forever. In a hat warehouse on State Street, Ralph Peer recorded the Carter Family and Jimmie Rodgers within days of each other — the "Big Bang" of country music. Johnny Cash called it the single most important event in the history of the genre.',
  1
);

-- Convenience: grab the city id
-- (Claude Code: use a CTE or run city insert first and reference the id)

with c as (select id from cities where slug = 'bristol')

insert into locations
  (city_id, slug, name, lat, lng, coords_verified, address, pin_type,
   era_start, era_end, story_md, what_is_there_now,
   spotify_track_label, is_orbit, sort_order)
select c.id, v.* from c, (values

-- 1. THE ANCHOR PIN ------------------------------------------------
('bristol-sessions-site',
 '1927 Bristol Sessions Site',
 36.59455, -82.18100, true,
 '408 State Street, Bristol, TN 37620',
 'studio', 1927, 1928,
 'In July 1927, Victor Talking Machine Company producer Ralph Peer set up portable recording equipment on the second and third floors of the Taylor-Christian Hat Company building at 408 State Street — chosen for its proximity to the rail station and the city''s largest hotel. From July 25 to August 5, Peer recorded fiddle tunes, sacred songs, string bands, and harmonica solos from musicians across the Appalachian region.

A newspaper story midway through changed everything: the Bristol News Bulletin reported that local recording artist Ernest Stoneman had earned $3,600 in royalties the prior year — roughly three and a half times the average annual wage. Musicians flooded into town. Among them: a family from Maces Springs, Virginia called the Carter Family, and a former railroad brakeman from Mississippi named Jimmie Rodgers, who recorded solo after his band quit on him days before.

Country music''s first two superstars, discovered in the same building, in the same two weeks. The Library of Congress selected these recordings for its National Recording Registry in its inaugural year.',
 'The building is gone — the site is now a parking lot marked by a historical plaque. The story is told a few blocks away at the Birthplace of Country Music Museum.',
 'Listen: The Carter Family — "Bury Me Under the Weeping Willow" (recorded here, Aug 1, 1927)',
 false, 1),

-- 2. THE MUSEUM ----------------------------------------------------
('birthplace-of-country-music-museum',
 'Birthplace of Country Music Museum',
 36.59611, -82.18278, true,
 '520 Birthplace of Country Music Way, Bristol, VA 24201',
 'museum', 2014, null,
 'A Smithsonian-affiliated museum that opened in 2014, a couple of blocks from the original Sessions site. It interprets the full story of the 1927 sessions — the technology, the business, the people, and the long echo of those twelve days. Low-power radio station WBCM-LP broadcasts live from inside the museum, keeping the frequency lit a century later.',
 'Open and active — the natural first stop for any Bristol music pilgrimage.',
 null,
 false, 2),

-- 3. THE STATE LINE ------------------------------------------------
('state-street-line',
 'State Street — The TN/VA Line',
 36.59487, -82.18420, true,
 'State Street, Bristol TN/VA',
 'street', 1900, null,
 'The Tennessee–Virginia border runs down the middle of State Street: stand on the brass markers and you''re in two states at once. In 1927 this was Bristol''s commercial spine, and the geography mattered — Peer drew musicians from both states'' mountain communities, plus North Carolina and Kentucky, because Bristol sat at the heart of the largest urban area in Appalachia.',
 'Brass state-line markers run down the centerline. The whole downtown stretch is walkable and full of murals and music references.',
 null,
 false, 3),

-- 4. THE SIGN ------------------------------------------------------
('bristol-sign',
 'The Bristol Sign',
 36.59495, -82.17968, true,
 'State Street at Volunteer Parkway, Bristol TN/VA',
 'marker', 1910, null,
 'The illuminated steel arch over State Street — "BRISTOL VA-TENN: A GOOD PLACE TO LIVE" — has marked the state line since the 1910s and became the city''s icon. It''s the photo that proves you were here, straddling two states under one sign.',
 'Still glowing over State Street. Best shot is at dusk.',
 null,
 false, 4),

-- 5. THE THEATER ---------------------------------------------------
('paramount-bristol',
 'Paramount Center for the Arts',
 36.59478, -82.18263, true,
 '518 State Street, Bristol, TN 37620',
 'venue', 1931, null,
 'Built as a movie palace by Paramount Pictures in 1931, restored and reopened in 1991. The reopening gala featured Bristol''s own Tennessee Ernie Ford performing his final hometown show, months before his death — the local boy who left Anderson Street for WOPI radio and ended up a national TV star, closing the circle on the same street where it all began.',
 'A restored 756-seat theater, still hosting live shows.',
 'Listen: Tennessee Ernie Ford — "Sixteen Tons"',
 false, 5),

-- 6. ERNIE FORD ----------------------------------------------------
('tennessee-ernie-ford-birthplace',
 'Tennessee Ernie Ford Birthplace',
 36.59240, -82.19533, true,
 '1223 Anderson Street, Bristol, TN 37620',
 'home', 1919, null,
 'Ernest Jennings Ford was born in this small white frame house on February 13, 1919, in a working-class neighborhood two blocks off State Street. He started as a teenage announcer at WOPI radio downtown, flew B-29 missions in WWII, and reinvented himself in California as "Tennessee Ernie Ford" — the booming bass-baritone behind "Sixteen Tons," one of the biggest singles of the 1950s, and host of prime-time network TV.

The Bristol Historical Association bought the house in 1991; Ford himself consulted on the restoration and was elated by the project, visiting one last time before his death that same year.',
 'Restored with period furnishings and a Ford exhibit; tours by appointment through the Bristol Historical Association.',
 'Listen: Tennessee Ernie Ford — "Sixteen Tons"',
 false, 6),

-- 7. THE ORBIT PIN -------------------------------------------------
('carter-family-fold',
 'The Carter Family Fold',
 36.668384, -82.413425, true,
 '3449 A.P. Carter Highway, Hiltons, VA 24258',
 'venue', 1974, null,
 'In Poor Valley at the foot of Clinch Mountain — the Carter Family''s actual home ground — Janette Carter, daughter of A.P. and Sara, founded this music center in the 1970s to honor her parents and Maybelle. Every Saturday night it presents old-time and bluegrass music in an 800-seat shed where electric instruments are banned.

The rule was famously bent for one man: Johnny Cash, who married into the family, played the Fold many times — and gave his final concert here on July 5, 2003, months before his death. The adjacent A.P. Carter general store survives as a museum.

This is where the Bristol Sessions never ended.',
 'Live music every Saturday at 7:30, museum opens an hour before. About 45 minutes from downtown Bristol — worth every mile.',
 'Listen: The Carter Family — "Wildwood Flower"',
 true, 7),

-- 8. THE LEGEND PIN ------------------------------------------------
('burger-bar',
 'Burger Bar',
 36.59531, -82.18522, true,
 '8 Piedmont Avenue, Bristol, VA 24201',
 'marker', 1942, null,
 'A tiny diner just off State Street, and the setting of one of country music''s darkest legends: on New Year''s Eve 1952, Hank Williams'' Cadillac stopped in Bristol en route to a show in Canton, Ohio. The story goes that Hank was offered food here and declined — possibly the last place he was seen alive. He died in the back seat somewhere up the road in West Virginia, age 29.

Whether every detail holds up, the Burger Bar leans into its place in the myth — and it anchors Bristol''s role not just in country music''s birth, but in its first great tragedy.',
 'Still slinging burgers. Hank memorabilia on the walls.',
 'Listen: Hank Williams — "I''ll Never Get Out of This World Alive"',
 false, 8),

-- 9. THE MODERN LAYER ----------------------------------------------
('rhythm-and-roots',
 'Bristol Rhythm & Roots Reunion',
 36.59500, -82.18650, true,
 'Historic Downtown State Street, Bristol TN/VA',
 'festival', 2001, null,
 'Every September, downtown Bristol closes State Street for a three-day festival built as a living tribute to the 1927 Sessions — dozens of stages on the same blocks where Ralph Peer set up his machine. Past lineups span bluegrass royalty to indie acts, all orbiting the same origin story. Proof the pin map isn''t a graveyard: the music never left.',
 'Held annually in September across downtown. The whole map comes alive for one weekend.',
 null,
 false, 9),

-- 10. THE CAMEO ----------------------------------------------------
('cameo-theatre',
 'Cameo Theatre',
 36.5952472, -82.1854053, true,
 '703 State Street, Bristol, VA 24201',
 'venue', 1925, null,
 'The Cameo Theatre opened on March 30, 1925 with a vaudeville performance, two years before the Bristol Sessions changed the sound of State Street. Across the next century the room lived several lives: movie theatre, music hall, church, and radio station.

Brent and Stanley Buchanan restored the building, and Theatre Bristol brought live performance back to the stage for its centennial in 2025. Few Bristol rooms carry the city''s entertainment history so cleanly from the pre-Sessions era into the present.',
 'Restored and active as one of Theatre Bristol''s three State Street stages, presenting live theatre and community productions.',
 null,
 false, 10),

-- 11. THE MODERN TOURING ROOM --------------------------------------
('hard-rock-live-bristol',
 'Hard Rock Live Bristol',
 36.5982229, -82.2192035, true,
 '500 Gate City Hwy, Bristol, VA 24201',
 'venue', 2024, null,
 'When the permanent Hard Rock Hotel & Casino Bristol opened on November 14, 2024, its first night included a Blake Shelton concert in a new 23,000-square-foot performance room. Hard Rock Live brought a 2,000-plus-capacity touring stage to the western edge of the city.

For a place whose musical identity begins with portable recording equipment in 1927, this is the newest end of the timeline: a modern regional room routing national acts through Bristol nearly a century later.',
 'An active 2,000-plus-capacity venue inside Hard Rock Hotel & Casino Bristol. Most events are 21+; check the individual listing before you go.',
 null,
 true, 11)

) as v(slug, name, lat, lng, coords_verified, address, pin_type,
       era_start, era_end, story_md, what_is_there_now,
       spotify_track_label, is_orbit, sort_order);

-- Static venue links. Provider IDs are stored now so cached API enrichment can
-- be added later without another venue-matching pass.
update locations set
  venue_status = 'active',
  official_url = 'https://theatrebristol.org/our-stages/',
  tickets_url = 'https://theatrebristol.org/tickets/',
  setlistfm_url = 'https://www.setlist.fm/venue/the-cameo-theater-bristol-va-usa-5bd0fb9c.html',
  setlistfm_venue_id = '5bd0fb9c'
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
  setlistfm_venue_id = '73d4eee5'
where slug = 'paramount-bristol';

update locations set
  venue_status = 'active',
  official_url = 'https://carterfamilyfold.org/',
  tickets_url = 'https://carterfamilyfold.org/events/',
  setlistfm_url = 'https://www.setlist.fm/venue/carter-family-fold-hiltons-va-usa-63d6daeb.html',
  setlistfm_venue_id = '63d6daeb'
where slug = 'carter-family-fold';

update locations set
  venue_status = 'seasonal',
  official_url = 'https://birthplaceofcountrymusic.org/festival-bristol-rhythm/',
  tickets_url = 'https://birthplaceofcountrymusic.org/tickets/',
  setlistfm_url = 'https://www.setlist.fm/venue/bristol-rhythm-and-roots-reunion-bristol-tn-usa-5bd723d8.html',
  setlistfm_venue_id = '5bd723d8'
where slug = 'rhythm-and-roots';

-- =============================================================
-- CONNECTIONS
-- =============================================================
insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, v.rel from (values
  ('bristol-sessions-site', 'carter-family-fold',
   'The Carter Family was discovered at the 1927 Sessions; their daughter Janette built the Fold on the family homestead to keep the music going — live, every Saturday, ever since.'),
  ('bristol-sessions-site', 'birthplace-of-country-music-museum',
   'The museum exists to tell this building''s story — opened 2014, two blocks from the original site.'),
  ('bristol-sessions-site', 'rhythm-and-roots',
   'The festival is staged on the same blocks as the 1927 recordings — a yearly reenactment of the moment musicians flooded into town.'),
  ('tennessee-ernie-ford-birthplace', 'paramount-bristol',
   'Ford left Anderson Street for radio and national fame — and played his final hometown show at the restored Paramount in 1991, blocks from where he was born.')
) as v(from_slug, to_slug, rel)
join locations f on f.slug = v.from_slug
join locations t on t.slug = v.to_slug;

-- =============================================================
-- TRAIL: Bristol 1927 — The Big Bang
-- =============================================================
insert into trails (slug, name, description_md, trail_type, sort_order)
values (
  'bristol-1927',
  'Bristol 1927: The Big Bang',
  'Walk the twelve days that invented country music — from the museum that tells the story, to the parking lot where it happened, ending at the diner where the genre''s first superstar era came to a close. Optional drive out to Poor Valley, where it never stopped.',
  'walking', 1
);

insert into trail_stops (trail_id, location_id, stop_order, stop_note_md)
select tr.id, l.id, v.ord, v.note from (values
  ('birthplace-of-country-music-museum', 1, 'Start here for the full context — then everything outside will mean more.'),
  ('bristol-sessions-site', 2, 'The hat warehouse is gone, but stand in the parking lot and picture July 1927: musicians lined up on the sidewalk after the Stoneman story broke.'),
  ('state-street-line', 3, 'Walk the line — literally. One foot in Tennessee, one in Virginia.'),
  ('paramount-bristol', 4, 'Four years after the Sessions, Bristol built itself a palace. Sixty years later, Ernie Ford said goodbye on its stage.'),
  ('bristol-sign', 5, 'The photo stop. "A Good Place to Live" — and to record.'),
  ('burger-bar', 6, 'End on the legend: where Hank Williams'' last ride paused on New Year''s Eve 1952.'),
  ('tennessee-ernie-ford-birthplace', 7, 'Short detour off State Street: the small white house where Bristol''s biggest hometown star was born in 1919.'),
  ('carter-family-fold', 8, 'The epilogue, 45 minutes out: Saturday night in Poor Valley, where the Carter Family''s music is still played live. Time it right and end your trail with a show.')
) as v(loc_slug, ord, note)
join locations l on l.slug = v.loc_slug
cross join (select id from trails where slug = 'bristol-1927') tr;
