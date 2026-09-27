-- Music History Map: Bristol, Macon, Nashville content depth and audit corrections.
-- Run after update_13_atlanta_depth.sql. Adds six pins and five threads
-- (three cross-city); corrects reviewed history, access, and image mismatches.
-- See sources/update_13_14_sources.md for evidence and unresolved claims.
-- Reviewed content update. Transactional and repeat-safe.
begin;

-- Country Music Hall of Fame and Museum
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$country-music-hall-of-fame$q$, $q$Country Music Hall of Fame and Museum$q$, 36.1581728, -86.7760929, $q$222 Rep. John Lewis Way S, Nashville, TN 37203$q$, $q$museum$q$, 2001, null, $q$The plaques are a destination, but the journey through the museum is the reason to linger. The Country Music Hall of Fame and Museum first opened on Music Row in 1967 and moved downtown in 2001. This pin marks the downtown building, where a visitor can set the chapter's individual rooms inside a much larger story.

In the Hall of Fame Rotunda, the title of Will the Circle Be Unbroken runs around the room above the honorees. Jimmie Rodgers entered the Hall's first class in 1961; the original Carter Family followed in 1970. Those names lead directly back to Bristol's 1927 sessions. Here, the distances between cities become easier to hear.

Don't mistake an induction date for a building's opening date, or a plaque for the whole history. Allow time for the exhibitions, then follow a particular person back out into Nashville. The museum also operates tours to RCA Studio B, giving you a way to move from interpretation to a room where records were made. Hatch Show Print, in the same complex, adds the ink and paper.$q$, $q$An operating downtown museum with exhibitions, the Hall of Fame Rotunda, and ticketed experiences. Studio B tours depart from the museum.$q$, null, $q$https://www.countrymusichalloffame.org/$q$, null, true, false, 10, null, null, null, null, $q$https://upload.wikimedia.org/wikipedia/commons/4/40/Country_Music_Hall_of_Fame_2022a.jpg$q$, $q$Photo: Antony-22, CC BY-SA 4.0, via Wikimedia Commons$q$
from cities c where c.slug = $q$nashville$q$
on conflict (slug) do update set
  city_id = excluded.city_id,
  name = excluded.name,
  lat = excluded.lat,
  lng = excluded.lng,
  address = excluded.address,
  pin_type = excluded.pin_type,
  era_start = excluded.era_start,
  era_end = excluded.era_end,
  story_md = excluded.story_md,
  what_is_there_now = excluded.what_is_there_now,
  venue_status = excluded.venue_status,
  official_url = excluded.official_url,
  tickets_url = excluded.tickets_url,
  coords_verified = excluded.coords_verified,
  is_orbit = excluded.is_orbit,
  sort_order = excluded.sort_order,
  spotify_track_id = excluded.spotify_track_id,
  spotify_track_label = excluded.spotify_track_label,
  setlistfm_url = excluded.setlistfm_url,
  setlistfm_venue_id = excluded.setlistfm_venue_id,
  image_url = excluded.image_url,
  image_attribution = excluded.image_attribution;

-- Fisk University — Jubilee Hall
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$fisk-jubilee-hall$q$, $q$Fisk University — Jubilee Hall$q$, 36.1690673, -86.8049572, $q$Jubilee Hall, 17th Avenue N, Fisk University, Nashville, TN 37208$q$, $q$home$q$, 1876, null, $q$Here is a building you can read as the result of singing. In 1871, students from Fisk set out to raise money for their struggling university. The Jubilee Singers carried spirituals to audiences far beyond Nashville, and the proceeds helped fund the campus and the construction of Jubilee Hall, completed in 1876.

The hall makes that exchange visible: performances became bricks, rooms, and a place for future students to live and learn. Stand back far enough to take in the tower. Before the recording studios and the broadcast stages elsewhere in this chapter, these singers were already taking Nashville's music into the world while sustaining an institution at home.

Fisk remains a university, and Jubilee Hall remains part of its residential life. This is a respectful campus exterior stop, not an invitation to enter student housing. Follow campus visitor guidance and look for separately advertised performances if you want to hear the tradition continue. The point is not to imagine the building as silent. It exists because a group of young people made themselves heard.$q$, $q$An active Fisk University residence hall and historic landmark. Exterior campus visit subject to university guidance; no drop-in dormitory access.$q$, null, $q$https://www.fisk.edu/about/history/$q$, null, true, false, 11, null, null, null, null, $q$https://upload.wikimedia.org/wikipedia/commons/c/c1/Jubilee_Hall%2C_Fisk_University.jpg$q$, $q$Photo: Unknown photographer (published 1910), Public domain, via Wikimedia Commons$q$
from cities c where c.slug = $q$nashville$q$
on conflict (slug) do update set
  city_id = excluded.city_id,
  name = excluded.name,
  lat = excluded.lat,
  lng = excluded.lng,
  address = excluded.address,
  pin_type = excluded.pin_type,
  era_start = excluded.era_start,
  era_end = excluded.era_end,
  story_md = excluded.story_md,
  what_is_there_now = excluded.what_is_there_now,
  venue_status = excluded.venue_status,
  official_url = excluded.official_url,
  tickets_url = excluded.tickets_url,
  coords_verified = excluded.coords_verified,
  is_orbit = excluded.is_orbit,
  sort_order = excluded.sort_order,
  spotify_track_id = excluded.spotify_track_id,
  spotify_track_label = excluded.spotify_track_label,
  setlistfm_url = excluded.setlistfm_url,
  setlistfm_venue_id = excluded.setlistfm_venue_id,
  image_url = excluded.image_url,
  image_attribution = excluded.image_attribution;

-- National Museum of African American Music
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$national-museum-african-american-music$q$, $q$National Museum of African American Music$q$, 36.1608246, -86.7792151, $q$510 Broadway, Nashville, TN 37203$q$, $q$museum$q$, 2021, null, $q$Broadway can make Nashville sound like one long country chorus. Step into the National Museum of African American Music and the frame opens: spirituals, gospel, blues, jazz, R&B, and hip-hop belong to the same American story. The museum opened to the public in January 2021, placing that story in the middle of the city's busiest music district.

Its central Rivers of Rhythm exhibition connects artists and influences across time. That is a useful way to read the city outside, too. Jefferson Street's clubs and Fisk's singers aren't side trips away from Music City; they are part of what the name should mean. The museum's early plans were themselves rooted in Jefferson Street before the project found its downtown home.

Give the listening stations time. The pleasure is in hearing a connection, then following it somewhere unexpected. Afterward, the short walk past the Ryman and the honky-tonks feels different: the surrounding soundtrack has acquired more of its history. This stop is an invitation to keep asking who shaped a sound, who carried it forward, and whose contribution a familiar label leaves out.$q$, $q$An operating museum at Fifth + Broadway, with its entrance on Rep. John Lewis Way. Check official admission information and opening hours.$q$, null, $q$https://www.nmaam.org/$q$, null, true, false, 12, null, null, null, null, $q$https://upload.wikimedia.org/wikipedia/commons/9/9e/National_Museum_of_African_American_Music%2C_Fifth_%2B_Broadway%2C_Broadway_and_5th_Avenue%2C_Nashville%2C_TN_%2854384524318%29.jpg$q$, $q$Photo: Warren LeMay from Chicago, IL, United States, CC BY-SA 2.0, via Wikimedia Commons$q$
from cities c where c.slug = $q$nashville$q$
on conflict (slug) do update set
  city_id = excluded.city_id,
  name = excluded.name,
  lat = excluded.lat,
  lng = excluded.lng,
  address = excluded.address,
  pin_type = excluded.pin_type,
  era_start = excluded.era_start,
  era_end = excluded.era_end,
  story_md = excluded.story_md,
  what_is_there_now = excluded.what_is_there_now,
  venue_status = excluded.venue_status,
  official_url = excluded.official_url,
  tickets_url = excluded.tickets_url,
  coords_verified = excluded.coords_verified,
  is_orbit = excluded.is_orbit,
  sort_order = excluded.sort_order,
  spotify_track_id = excluded.spotify_track_id,
  spotify_track_label = excluded.spotify_track_label,
  setlistfm_url = excluded.setlistfm_url,
  setlistfm_venue_id = excluded.setlistfm_venue_id,
  image_url = excluded.image_url,
  image_attribution = excluded.image_attribution;

-- Ann’s Tic Toc — Little Richard’s Early Stage
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$anns-tic-toc$q$, $q$Ann’s Tic Toc — Little Richard’s Early Stage$q$, 32.8342943, -83.6259496, $q$408 Martin Luther King Jr Boulevard, Macon, GA 31201$q$, $q$marker$q$, 1950, null, $q$A few steps from the Douglass Theatre, another kind of room helped make Little Richard. Ann Howard's Tic Toc was a restaurant and nightclub where he performed as a teenager and washed dishes when he needed the money. The music did not arrive here as a finished legend. It grew alongside ordinary work and the need to earn a living.

Historic Macon's music registry remembers the club as a place that welcomed Black and white patrons, gay and straight, in a segregated city. It also connects Richard's songs Miss Ann and Long Tall Sally to this setting. That gives the address a different weight from a generic early-gig marker: the people around a performer can become part of the songs the world later sings.

Read the history from the sidewalk before heading back toward the Douglass. These were distinct rooms with different audiences, close enough to belong to the same walk. The historic nightclub is not operating as Ann's Tic Toc today. The marker is your anchor; don't assume a later restaurant at the address is the original business.$q$, $q$Historic nightclub site with a music-history marker. Later restaurant use is documented; current tenant and public interior access have not been confirmed.$q$, null, $q$https://historicmacon.org/music-registry$q$, null, true, false, 10, null, null, null, null, null, null
from cities c where c.slug = $q$macon$q$
on conflict (slug) do update set
  city_id = excluded.city_id,
  name = excluded.name,
  lat = excluded.lat,
  lng = excluded.lng,
  address = excluded.address,
  pin_type = excluded.pin_type,
  era_start = excluded.era_start,
  era_end = excluded.era_end,
  story_md = excluded.story_md,
  what_is_there_now = excluded.what_is_there_now,
  venue_status = excluded.venue_status,
  official_url = excluded.official_url,
  tickets_url = excluded.tickets_url,
  coords_verified = excluded.coords_verified,
  is_orbit = excluded.is_orbit,
  sort_order = excluded.sort_order,
  spotify_track_id = excluded.spotify_track_id,
  spotify_track_label = excluded.spotify_track_label,
  setlistfm_url = excluded.setlistfm_url,
  setlistfm_venue_id = excluded.setlistfm_venue_id,
  image_url = excluded.image_url,
  image_attribution = excluded.image_attribution;

-- Bell House — McDuffie Center for Strings
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$mcduffie-bell-house$q$, $q$Bell House — McDuffie Center for Strings$q$, 32.8427962, -83.6375646, $q$315 College Street, Macon, GA 31201$q$, $q$home$q$, 2015, null, $q$The sound to imagine behind these columns is a student practicing the same passage again. The Bell House is home to Mercer's Robert McDuffie Center for Strings, adding a living classical-music chapter to a city often introduced through soul and Southern rock. Its new use was celebrated at a grand opening in 2015 with violinist Robert McDuffie and actress Anna Deavere Smith.

The house contains teaching and practice spaces and a small performance hall. Music here is learned through close work with performing artists, not simply preserved in display cases. The center's students have also recorded with R.E.M. co-founder Mike Mills, a reminder that the boundaries between Macon's musical worlds are more permeable than the genre labels suggest.

Pause on College Street and consider the difference between a monument to a completed career and a place where careers are being formed. This is the second kind. Consult Mercer's concert listings for a public performance and its location; a teaching building isn't automatically open for a tour. The next piece of Macon's story may still be working through its difficult bars upstairs.$q$, $q$An active university teaching and performance space. Check McDuffie Center concert listings for public events and their venues; routine interior access is not assumed.$q$, null, $q$https://mcduffie.mercer.edu/$q$, null, true, false, 11, null, null, null, null, null, null
from cities c where c.slug = $q$macon$q$
on conflict (slug) do update set
  city_id = excluded.city_id,
  name = excluded.name,
  lat = excluded.lat,
  lng = excluded.lng,
  address = excluded.address,
  pin_type = excluded.pin_type,
  era_start = excluded.era_start,
  era_end = excluded.era_end,
  story_md = excluded.story_md,
  what_is_there_now = excluded.what_is_there_now,
  venue_status = excluded.venue_status,
  official_url = excluded.official_url,
  tickets_url = excluded.tickets_url,
  coords_verified = excluded.coords_verified,
  is_orbit = excluded.is_orbit,
  sort_order = excluded.sort_order,
  spotify_track_id = excluded.spotify_track_id,
  spotify_track_label = excluded.spotify_track_label,
  setlistfm_url = excluded.setlistfm_url,
  setlistfm_venue_id = excluded.setlistfm_venue_id,
  image_url = excluded.image_url,
  image_attribution = excluded.image_attribution;

-- WCYB’s Farm and Fun Time — Historical Marker
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$wcyb-farm-and-fun-time$q$, $q$WCYB’s Farm and Fun Time — Historical Marker$q$, 36.5959, -82.1844333, $q$Winston Alley at Piedmont Avenue, near 153 Piedmont Avenue, Bristol, VA 24201$q$, $q$marker$q$, 1946, null, $q$The next great Bristol gathering happened around a radio microphone. WCYB went on the air in December 1946, and Farm and Fun Time brought live musicians into the lobby of the Hotel General Shelby. The hotel stood east of this marker, near Cumberland and Front Streets; this is a place to read its story, not the original studio footprint.

The Stanley Brothers, Flatt and Scruggs, and Jim and Jesse were among the musicians associated with the program. Radio gave listeners a regular meeting with those sounds, and gave performers a way to announce shows and sell a sponsor's products between songs. Bristol's recording story had become an everyday broadcast habit.

The hotel is gone, but the program's name has another life. Radio Bristol revived Farm and Fun Time, and today's performances connect the museum and local stages to that earlier radio culture. After reading the marker, check the current program calendar. The most satisfying continuation of this stop may be a live taping: musicians gathering around microphones again, with an audience close enough to hear them breathe.$q$, $q$A sidewalk history marker near Winston Alley and Piedmont Avenue. The original hotel studio was elsewhere and is demolished; current Farm and Fun Time shows have separately advertised venues.$q$, null, $q$https://birthplaceofcountrymusic.org/radio/programs/farm-and-fun-time/$q$, null, true, false, 12, null, null, null, null, null, null
from cities c where c.slug = $q$bristol$q$
on conflict (slug) do update set
  city_id = excluded.city_id,
  name = excluded.name,
  lat = excluded.lat,
  lng = excluded.lng,
  address = excluded.address,
  pin_type = excluded.pin_type,
  era_start = excluded.era_start,
  era_end = excluded.era_end,
  story_md = excluded.story_md,
  what_is_there_now = excluded.what_is_there_now,
  venue_status = excluded.venue_status,
  official_url = excluded.official_url,
  tickets_url = excluded.tickets_url,
  coords_verified = excluded.coords_verified,
  is_orbit = excluded.is_orbit,
  sort_order = excluded.sort_order,
  spotify_track_id = excluded.spotify_track_id,
  spotify_track_label = excluded.spotify_track_label,
  setlistfm_url = excluded.setlistfm_url,
  setlistfm_venue_id = excluded.setlistfm_venue_id,
  image_url = excluded.image_url,
  image_attribution = excluded.image_attribution;

-- Audit: bristol-sessions-site
update locations set
  era_end = 1927,
  story_md = $q$In July 1927, Victor producer Ralph Peer brought recording equipment to the Taylor-Christian Hat Company building on State Street. From July 25 to August 5, musicians from the surrounding region recorded fiddle tunes, sacred songs, and string-band music. An ordinary commercial building became a place where local sounds could travel much farther than their performers.

The Carter Family and Jimmie Rodgers were among those who came. Their recordings made these sessions a turning point in country music, though neither the music nor commercial recording began here. Listen for the people behind that large claim: a family singing together, a former railroad worker finding his own voice, musicians carrying familiar material into an unfamiliar machine.

The building is gone. The point of standing here is to feel the distance between the modest place and the reach of what left it. The Library of Congress selected the Bristol Sessions for the National Recording Registry in 2002. A few blocks away, the museum gives the surviving recordings room to tell their stories.$q$
where slug = $q$bristol-sessions-site$q$;

-- Audit: birthplace-of-country-music-museum
update locations set
  address = $q$101 Country Music Way, Bristol, VA 24201$q$,
  lat = 36.5962872,
  lng = -82.1828615
where slug = $q$birthplace-of-country-music-museum$q$;

-- Audit: state-street-line
update locations set
  story_md = $q$The Tennessee–Virginia border runs down the middle of State Street: stand on the brass markers and you're in two states at once. In 1927, musicians came to Bristol from the surrounding region to record. Walk this commercial street and the two-state geography makes those journeys easier to imagine.$q$
where slug = $q$state-street-line$q$;

-- Audit: bristol-sign
update locations set
  address = $q$State Street near the Bristol train station, Bristol TN/VA$q$,
  story_md = $q$The illuminated steel sign began on a building in 1910 and moved over State Street in 1915. Its familiar “A Good Place to Live” slogan dates to 1921. Look up near the train station and the sign gives Bristol’s two-state downtown a shared landmark.$q$
where slug = $q$bristol-sign$q$;

-- Audit: paramount-bristol
update locations set
  story_md = $q$The Paramount opened on February 20, 1931, giving State Street a movie palace with a name known far beyond Bristol. Its Art Deco interior belongs to the period when going to the pictures meant stepping into a room designed to make an evening feel important.

The theater later fell into disrepair, but Bristol brought it back. A restoration returned the Paramount to use in 1991, with Tennessee Ernie Ford part of its reopening story. A local voice with a national audience helped connect the rescued room to the city outside its doors.

Today the pleasure is in finding the theater working. Read the marquee, check the calendar, and imagine how many different audiences have crossed this threshold since 1931. The Paramount gives Bristol's music walk somewhere to end after dark: a seat in a restored room, a performer onstage, and a reason for the old building to keep its lights on.$q$,
  what_is_there_now = $q$A restored Art Deco theater with an active performance calendar. Check the official schedule for tickets and access.$q$
where slug = $q$paramount-bristol$q$;

-- Audit: tennessee-ernie-ford-birthplace
update locations set
  lat = 36.5924683,
  lng = -82.1958544,
  image_url = null,
  image_attribution = null,
  story_md = $q$Ernest Jennings Ford was born in this small white frame house on February 13, 1919, in a Bristol neighborhood. He started as a teenage announcer at WOPI radio downtown, served in the military during World War II, and reinvented himself in California as "Tennessee Ernie Ford" — the booming bass-baritone behind "Sixteen Tons," one of the biggest singles of the 1950s, and host of prime-time network TV.

The Bristol Historical Association bought the house in 1991. The restored house keeps his Bristol beginnings in view.$q$
where slug = $q$tennessee-ernie-ford-birthplace$q$;

-- Audit: carter-family-fold
update locations set
  venue_status = $q$seasonal$q$,
  what_is_there_now = $q$Seasonal old-time and bluegrass shows, normally Saturdays February–November. Check the official calendar for dates, doors, and museum access; an orbit trip outside Bristol.$q$,
  story_md = $q$In Poor Valley at the foot of Clinch Mountain — the Carter Family's actual home ground — Janette Carter, daughter of A.P. and Sara, founded this music center in the 1970s to honor her parents and Maybelle. During its concert season it presents old-time and bluegrass music in an 800-seat shed where electric instruments are banned.

The rule was famously bent for one man: Johnny Cash, who married into the family, played the Fold many times — and gave his final concert here on July 5, 2003, months before his death. The adjacent A.P. Carter general store survives as a museum.

This is where the Bristol Sessions never ended.$q$
where slug = $q$carter-family-fold$q$;

-- Audit: burger-bar
update locations set
  name = $q$Burger Bar — Historic Site$q$,
  what_is_there_now = $q$Historic Burger Bar site near State Street. The operating restaurant now lists 120 Piedmont Avenue; this pin preserves the location associated with the Hank Williams story, not current dining directions.$q$
where slug = $q$burger-bar$q$;

-- Audit: rhythm-and-roots
update locations set
  story_md = $q$Every September, downtown Bristol closes State Street for a three-day festival built as a living tribute to the 1927 Sessions — multiple stages on the same blocks where Ralph Peer set up his machine. Past lineups span bluegrass royalty to indie acts, all orbiting the same origin story. Proof the pin map isn't a graveyard: the music never left.$q$
where slug = $q$rhythm-and-roots$q$;

-- Audit: cameo-theatre
update locations set
  story_md = $q$The Cameo opened on March 30, 1925 with vaudeville, two years before the Bristol Sessions. That order matters: State Street already had an audience before a record producer arrived to capture its surrounding music.

A century later, Theatre Bristol acquired the Cameo from Brent Buchanan and celebrated the building’s centennial with an open house and ribbon cutting. The return of live theater gives the old room a continuing job in the city’s cultural life.

Read this stop alongside the recording sites. A record can carry a performance away; a theater asks people to gather in one place. The Cameo belongs to that second tradition, with a current program to check before you come back for a seat.$q$
where slug = $q$cameo-theatre$q$;

-- Audit: hard-rock-live-bristol
update locations set
  what_is_there_now = $q$An active touring venue inside Hard Rock Hotel & Casino Bristol. Check each event for age restrictions, admission, and seating configuration.$q$
where slug = $q$hard-rock-live-bristol$q$;

-- Audit: capricorn-sound-studios
update locations set
  story_md = $q$At Capricorn, the story is in the rooms as much as the records. Phil Walden’s work with Otis Redding helped build Macon’s music business before Capricorn Records took shape with Jerry Wexler and Frank Fenter. After Redding’s death, Duane Allman and the band he formed helped give the new label a different direction.

The studio opened in 1969. The Allman Brothers, Wet Willie, and other artists made Macon a destination for musicians whose work crossed the boundaries between rock, blues, and country. Stand on this block and imagine the practical side of that reputation: instruments arriving, engineers listening, musicians returning to a passage until it worked.

Mercer University reopened the restored studios in 2019. There is a museum here, but the building also makes new recordings. That double use is the best reason to visit: you can listen to the catalog without imagining the city’s recording history has ended.$q$,
  what_is_there_now = $q$Mercer Music at Capricorn combines working recording studios with a public museum and catalog listening exhibits. Check museum hours and arrange studio access separately.$q$
where slug = $q$capricorn-sound-studios$q$;

-- Audit: the-big-house
update locations set
  story_md = $q$From January 1970 until 1973, the house on Vineville Avenue was a home for members of the Allman Brothers Band, their families, and their friends. The Big House puts domestic space into a story more often told through studios and stages.

Think about what a band needs before it reaches a concert hall: somewhere to gather, to listen, to live between journeys. Here the rooms belonged to that shared life during the group’s early years. The museum’s instruments, photographs, and memorabilia make it possible to connect the familiar records to the people who made them.

This is a house museum now, not an untouched rehearsal suddenly paused in 1970. Give the displays time, then look back at the scale of the building from Vineville Avenue. A very large musical story had room for ordinary daily life inside it.$q$,
  what_is_there_now = $q$The Allman Brothers Band Museum, with instruments, photographs, and memorabilia displayed in the former communal home. Check visiting hours.$q$
where slug = $q$the-big-house$q$;

-- Audit: h-and-h-restaurant
update locations set
  story_md = $q$Inez Hill and Louise Hudson founded H&H in 1959. When the Allman Brothers were broke nobodies, "Mama Louise" Hudson fed them anyway — in the often-told account of musicians sharing meals they could barely afford. They never forgot it: when success came, Mama Louise traveled with the band as a cook on tour, and H&H became Southern Rock's unofficial commissary. The soul food restaurant remains a Macon institution, its walls covered in band history.$q$
where slug = $q$h-and-h-restaurant$q$;

-- Audit: douglass-theatre
update locations set
  story_md = $q$Charles Henry Douglass opened this theater in 1921, giving Black audiences in segregated Macon a room for films and live entertainment. Its history connects traveling performers with local talent, including Otis Redding, whose appearances in talent contests helped make his voice known around town.

It is tempting to reduce that beginning to a single discovery night. The more durable story is the room itself: a place where a young singer could perform, return, and be heard again. The Douglass belongs in Macon’s soul chapter because that local audience mattered before the national one arrived.

The theater closed in 1973 and reopened after restoration in 1997. Today films, performances, and educational programs keep it in use. Look up at the name on the building before moving on to Ann’s Tic Toc nearby; these were different rooms in the same city’s musical life.$q$
where slug = $q$douglass-theatre$q$;

-- Audit: otis-redding-statue
update locations set
  what_is_there_now = $q$The statue is outside the Otis Redding Center for the Arts at 436 Cotton Avenue. The Center is not generally open to the public; contact the Foundation for any museum or interior visit.$q$,
  story_md = $q$A life-size bronze of Otis sitting on dock pilings with a guitar — "(Sittin' on) the Dock of the Bay" cast in metal. Created in 2002 by sculptors Bradly Cooley and Bradley Cooley Jr. for Gateway Park, the statue was moved in 2025 to its permanent home in front of the Zelma Redding Amphitheater at the new Otis Redding Center for the Arts — the music-education center built by the foundation his widow Zelma started in 2007.

Otis was raised in Macon from age five, sang in church, dropped out of high school to help his family, and toured with Little Richard's old band the Upsetters before becoming the King of Soul. He died at 26, before his best-known record reached its audience.$q$
where slug = $q$otis-redding-statue$q$;

-- Audit: macon-city-auditorium
update locations set
  story_md = $q$The copper dome makes this 1925 auditorium easy to pick out in downtown Macon. Its place in the city’s soul story is especially poignant: Otis Redding’s funeral was held here on December 18, 1967.

Stand outside and connect that date to the younger singer at the Douglass Theatre. These places hold different parts of the same life: the chance to be heard, the work of becoming an artist, and a city gathering after an extraordinary loss. The scale of the auditorium gives that last moment a physical presence.

The building remains an event venue. Check its current calendar before assuming the doors will be open, and let the walk here hold a quieter part of the chapter. Music history includes the rooms where a community comes together when the music stops.$q$
where slug = $q$macon-city-auditorium$q$;

-- Audit: ryman-auditorium
update locations set
  what_is_there_now = $q$An active performance venue with daytime tours. Check the Ryman and Opry calendars for current performances and access.$q$
where slug = $q$ryman-auditorium$q$;

-- Audit: rca-studio-b
update locations set
  what_is_there_now = $q$Preserved studio with guided tours operated through the Country Music Hall of Fame and Museum. Book through the museum and follow the guide’s access rules.$q$,
  story_md = $q$The hit factory of the Nashville Sound. Elvis Presley recorded more than 200 songs in this room — Are You Lonesome Tonight? and It's Now or Never among them — standing on the X engineer Bill Porter taped to the floor to mark the room's sweet spot, beneath the triangular Porter Pyramids he hung to tame the acoustics. Roy Orbison cut Only the Lonely here — the Everly Brothers, Jim Reeves, Waylon, and Charley Pride all worked this room.

RCA ended regular commercial operations here in 1977. Today the museum’s tours bring listeners into the room, connecting the records to a physical working space rather than an imagined untouched time capsule.$q$
where slug = $q$rca-studio-b$q$;

-- Audit: quonset-hut
update locations set
  era_start = 1955,
  image_url = null,
  image_attribution = null,
  story_md = $q$Music Row exists because of this building. In 1954-55, brothers Owen and Harold Bradley converted a house and an Army-surplus Quonset hut into Nashville's first Music Row recording studio — and the hits that poured out pulled every label in town to 16th Avenue. Patsy Cline recorded Crazy here in 1961, arriving at the finished vocal after earlier attempts; the often-repeated one-take story should not erase that work. Brenda Lee's I'm Sorry, and decades of Johnny Cash, George Jones, Tammy Wynette, and Merle Haggard followed.

Columbia bought the complex in 1962 and built Studio A next door — where Bob Dylan came south to record most of Blonde on Blonde in 1966, scrambling every assumption about what Nashville music meant. The Hut itself survives, encased inside the newer building, restored by Belmont University as part of its music business college.$q$
where slug = $q$quonset-hut$q$;

-- Audit: club-baron
update locations set
  story_md = $q$The chapter most Nashville maps skip. From the 1930s to the 1960s, Jefferson Street was the city's R&B spine — a chitlin' circuit stronghold where Duke Ellington, Ella Fitzgerald, Little Richard, Etta James, and Otis Redding played the Del Morocco, the New Era, and Club Baron, drawing crowds from Fisk and Tennessee State.

Its greatest legend: a young Army veteran named Jimi Hendrix, who had served at nearby Fort Campbell, who held down a house gig with bassist Billy Cox at the Del Morocco — locals called him Marbles and thought he was too weird to make it. In 1963 he carried his amp into Club Baron to challenge Nashville's reigning guitarist Johnny Jones to a duel — and lost, schooled by the local master. Jones covered Purple Haze in 1969 after Hendrix had become an international star.

Interstate 40 was later routed through the neighborhood, gutting the district. The Del Morocco is demolished — Club Baron survives as Elks Lodge #1102 — the only stage left in Nashville where Hendrix played — with a mural of the guitar duel on its wall and a preservation effort underway.$q$
where slug = $q$club-baron$q$;

-- Audit: bluebird-cafe
update locations set
  what_is_there_now = $q$An active, intimate songwriter venue with reserved shows and other scheduled programs. Check the official calendar and reservation rules for the specific night.$q$,
  story_md = $q$Ninety seats in a strip mall, and arguably the most important small room in American songwriting. Opened in 1982, the Bluebird introduced its in-the-round format in 1985 — writers, not stars, sitting in the middle of the room playing the hits they wrote for other people, with a strictly enforced hush (the staff will shush you, regardless of who you are).

Its discovery legends are the genre's founding myths: Garth Brooks was signed after a Bluebird showcase — and it was here he heard Tony Arata play The Dance, the song that became his signature. Years later, Scott Borchetta heard a teenage Taylor Swift at the Bluebird and built Big Machine Records around her. Two of the biggest careers in the history of recorded music, launched from the same ninety seats.$q$
where slug = $q$bluebird-cafe$q$;

-- Audit: grand-ole-opry-house
update locations set
  story_md = $q$When the Opry moved from the Ryman in 1974, it brought a piece of the old stage: a six-foot wooden circle set into the new one. The object makes a long-running broadcast’s continuity something you can see, even in a much larger room east of downtown.

Membership gives that continuity a human scale. Brad Paisley made his Opry debut on May 28, 1999, and became a member on February 17, 2001. A young performer was being welcomed into an institution whose broadcasts began in 1925, with older artists helping carry the tradition forward.

Check the calendar and hear the exchange for yourself. The Opry is a current show as well as a historical institution, and the names on a particular evening’s bill matter more than an imagined permanent lineup. Tours offer another view when available; access to the stage circle depends on the tour and production schedule.$q$,
  what_is_there_now = $q$An active performance and broadcast venue with scheduled backstage tours. Confirm the show location and access details when booking.$q$
where slug = $q$grand-ole-opry-house$q$;

-- Audit: station-inn
update locations set
  story_md = $q$A squat stone bunker that watched the Gulch grow luxury towers around it and declined to care. Founded in 1974 and at this Gulch address since 1978, the Station Inn has been a bluegrass gathering place — Bill Monroe dropped in, Vince Gill treats it like a clubhouse, and the Sunday night jam is open to anyone who can keep up. Folding chairs, popcorn, and some of the best pickers alive any night of the week.

If the Ryman is where bluegrass was born, this is where it lives.$q$
where slug = $q$station-inn$q$;

-- Audit: hatch-show-print
update locations set
  story_md = $q$Printing since 1879, and the reason country music looks the way it looks. Hatch's hand-carved letterpress blocks produced the posters for the Opry, Hank Williams, Johnny Cash, Elvis, and nearly a century of shows — bold wood type and two-color ink that became the visual language of American roots music. The shop still works in the letterpress tradition — a modern Hatch poster for tonight's Ryman show is made the way one was in 1940.

The map's reminder that music history isn't only sound.$q$
where slug = $q$hatch-show-print$q$;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Richard Penniman grew up in Pleasant Hill and performed at Ann’s Tic Toc as a teenager. The relocated childhood house and the nightclub marker trace the same young musician from neighborhood life to paid performance.$q$ from locations f cross join locations t
where f.slug = $q$anns-tic-toc$q$ and t.slug = $q$little-richard-house$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Radio Bristol at the museum revived Farm and Fun Time, the program associated with WCYB’s broadcasts from the Hotel General Shelby. The marker remembers the earlier show; the museum’s station carries its name into new live performances.$q$ from locations f cross join locations t
where f.slug = $q$wcyb-farm-and-fun-time$q$ and t.slug = $q$birthplace-of-country-music-museum$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Jimmie Rodgers recorded at the Bristol Sessions in 1927 and joined the Country Music Hall of Fame’s first class in 1961. His plaque in Nashville leads back to the Bristol recordings that helped begin his recording career.$q$ from locations f cross join locations t
where f.slug = $q$country-music-hall-of-fame$q$ and t.slug = $q$bristol-sessions-site$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$The original Carter Family entered the Country Music Hall of Fame in 1970. Janette Carter, daughter of A.P. and Sara, founded the Fold in 1974 to continue the family’s musical tradition in its home community.$q$ from locations f cross join locations t
where f.slug = $q$country-music-hall-of-fame$q$ and t.slug = $q$carter-family-fold$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Little Richard performed at Nashville’s Club Baron, according to the city’s historical marker. His Macon childhood home and the surviving Jefferson Street club connect a hometown beginning to a specific stage on his touring circuit.$q$ from locations f cross join locations t
where f.slug = $q$club-baron$q$ and t.slug = $q$little-richard-house$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Ralph Peer recorded in Atlanta for OKeh in 1923 and in Bristol for Victor in 1927. The same producer connects these two early commercial recording ventures; neither marks the invention of all field recording.$q$ from locations f cross join locations t
where f.slug = $q$152-nassau-street$q$ and t.slug = $q$bristol-sessions-site$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$The Carter Family recorded at Bristol in 1927. Janette Carter, daughter of A.P. and Sara, later founded the Fold to continue the family’s music, with live shows during its concert season.$q$ from locations f cross join locations t
where f.slug = $q$bristol-sessions-site$q$ and t.slug = $q$carter-family-fold$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Ford’s Bristol beginnings at the Anderson Street house connect to his part in the restored Paramount’s 1991 reopening story.$q$ from locations f cross join locations t
where f.slug = $q$tennessee-ernie-ford-birthplace$q$ and t.slug = $q$paramount-bristol$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Otis Redding performed in Douglass Theatre talent contests. His later work with manager Phil Walden helped build the Macon music business from which Capricorn emerged; a single discovery broadcast is not established here.$q$ from locations f cross join locations t
where f.slug = $q$douglass-theatre$q$ and t.slug = $q$capricorn-sound-studios$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Otis Redding sang in talent contests at the Douglass. Macon gathered for his funeral at the City Auditorium on December 18, 1967.$q$ from locations f cross join locations t
where f.slug = $q$douglass-theatre$q$ and t.slug = $q$macon-city-auditorium$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Johnny Cash and June Carter met at the Ryman in 1956. Cash later married into the Carter family and gave his final concert at the Carter Family Fold on July 5, 2003; the Ryman was their meeting place, not their wedding venue.$q$ from locations f cross join locations t
where f.slug = $q$ryman-auditorium$q$ and t.slug = $q$carter-family-fold$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

update trail_stops s set stop_note_md = $q$The theater opened in 1931 and returned after restoration in 1991, with Tennessee Ernie Ford part of its reopening story. Check tonight’s program.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$bristol-1927$q$ and l.slug = $q$paramount-bristol$q$;

update trail_stops s set stop_note_md = $q$Pause at the historic diner site and its Hank Williams legend. For food today, the restaurant lists 120 Piedmont Avenue.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$bristol-1927$q$ and l.slug = $q$burger-bar$q$;

update trail_stops s set stop_note_md = $q$The orbit epilogue: travel outside Bristol for a seasonal show in Poor Valley. Check the calendar; the regular season runs February–November.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$bristol-1927$q$ and l.slug = $q$carter-family-fold$q$;

update trail_stops s set stop_note_md = $q$Begin at Little Richard’s relocated childhood home in Pleasant Hill. This is a neighborhood origin story, not a claim that he was born at this present address.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$macon-soul-to-southern-rock$q$ and l.slug = $q$little-richard-house$q$;

update trail_stops s set stop_note_md = $q$Hear the young Otis Redding through the story of local talent contests. The theater gave emerging performers an audience before national fame.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$macon-soul-to-southern-rock$q$ and l.slug = $q$douglass-theatre$q$;

update trail_stops s set stop_note_md = $q$From early performances to a city’s farewell: Otis Redding’s funeral was held here on December 18, 1967.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$macon-soul-to-southern-rock$q$ and l.slug = $q$macon-city-auditorium$q$;

update trail_stops s set stop_note_md = $q$Continue to the studio opened in 1969 and restored by Mercer in 2019. Visit the museum during its hours; working studio access requires arrangements.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$macon-soul-to-southern-rock$q$ and l.slug = $q$capricorn-sound-studios$q$;

update trail_stops s set stop_note_md = $q$Continue to Music Row for the Bradley studio. Patsy Cline’s Crazy belongs to this room, but the familiar one-take story leaves out earlier work.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$nashville-mother-church$q$ and l.slug = $q$quonset-hut$q$;

update trail_stops s set stop_note_md = $q$Nearby Studio B connects familiar recordings to a real room. Guided tours are booked through the Country Music Hall of Fame and Museum.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$nashville-mother-church$q$ and l.slug = $q$rca-studio-b$q$;

update trail_stops s set stop_note_md = $q$Return to the Gulch for bluegrass. The Station Inn began in 1974 and moved here in 1978; check tonight’s ticket and jam-session arrangements.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$nashville-mother-church$q$ and l.slug = $q$station-inn$q$;

update cities set intro_md = $q$Macon holds soul, rock ’n’ roll, Southern rock, and the rooms that brought them into the world. Follow Little Richard’s neighborhood beginnings, Otis Redding’s local stages, the Allman Brothers’ shared life, and the working studios at Capricorn. The story continues in clubs, classrooms, and performances today.$q$ where slug = $q$macon$q$;

commit;
