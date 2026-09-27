-- Music History Map: Atlanta content depth and audit corrections.
-- Run after update_12_phase1_completion.sql and before update_14_chapter_depth.sql.
-- Adds seven pins, one six-stop walking trail, three threads; fixes reviewed
-- history/access/geocodes and exact-subject images. See sources/update_13_14_sources.md.
-- Reviewed content update. Transactional and repeat-safe.
begin;

-- Variety Playhouse
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$variety-playhouse$q$, $q$Variety Playhouse$q$, 33.76351, -84.3508547, $q$1099 Euclid Avenue NE, Atlanta, GA 30307$q$, $q$venue$q$, 1940, null, $q$Look up from Euclid Avenue and the old movie-house shape is still there. Built in 1940, the theater that became Variety Playhouse gives Little Five Points a room larger than a bar without losing the feeling that the show belongs to the neighborhood. Its marquee is an invitation to turn a record-shopping afternoon into a whole evening.

That scale matters here. Across these few blocks, music travels between shops, small stages, and listeners who keep coming back. Variety puts a touring band into that everyday geography: the walk to the show can take you past the bins where you first found its record. The building's history begins with cinema, but its present is written by the concert calendar.

Stand outside before doors and let the street be part of the experience. Browse nearby, get something to eat, and come back when the name on the marquee becomes a sound in the room. This is a working theater, so an interior visit means checking the schedule and choosing a show.$q$, $q$An active concert venue in Little Five Points; check the official calendar for shows and box-office hours.$q$, $q$active$q$, $q$https://www.variety-playhouse.com/$q$, $q$https://www.variety-playhouse.com/$q$, true, false, 14, null, null, null, null, $q$https://upload.wikimedia.org/wikipedia/commons/e/ed/VarietyPlayhouseAtlantaFrontFacade.JPG$q$, $q$Photo: Krelnik, CC BY 3.0, via Wikimedia Commons$q$
from cities c where c.slug = $q$atlanta$q$
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

-- Wax 'n' Facts
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$wax-n-facts$q$, $q$Wax 'n' Facts$q$, 33.7661399, -84.3491836, $q$432 Moreland Avenue NE, Atlanta, GA 30307$q$, $q$marker$q$, 1976, null, $q$A record store can be a distribution system, a meeting place, and a small act of stubbornness. Danny Beard and Harry DeMille opened Wax 'n' Facts in 1976. The shop on Moreland Avenue became one of the places where Little Five Points learned to hear itself, one secondhand record and counter conversation at a time.

Beard also ran DB Records from the shop. The label released the B-52's first single, giving a band from Athens a way to reach listeners before a major record company entered the picture. This wasn't simply a place that stocked a scene after it became fashionable. Someone behind the counter was helping put its music into circulation.

Go slowly through the bins. The shop still buys and sells records, and the transaction is part of the history: music passing from one listener to another, carrying a recommendation with it. On a street with several ways to spend an afternoon listening, Wax 'n' Facts makes the case for starting with a record you didn't know you wanted.$q$, $q$An operating independent record shop. Check current hours before visiting or bringing records to sell.$q$, null, $q$https://waxnfacts.net/$q$, null, true, false, 15, null, null, null, null, null, null
from cities c where c.slug = $q$atlanta$q$
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

-- Star Community Bar
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$star-community-bar$q$, $q$Star Community Bar$q$, 33.766254, -84.348824, $q$437 Moreland Avenue NE, Atlanta, GA 30307$q$, $q$venue$q$, 1991, null, $q$The bank vault stayed. The business around it changed completely. When David Heany and Marty Nolan opened Star Community Bar in 1991, the former bank on Moreland Avenue became a home for loud music, and its stubborn steel vault became a shrine to Elvis. It's a very Little Five Points way to reuse a building: keep the odd part and give it a new job.

Through the 1990s, the room helped shelter Atlanta's cowpunk and alternative-country community, affectionately called the Redneck Underground. Acts including the Blacktop Rockets, Slim Chance & the Convicts, and Drive-By Truckers belonged to that world. The history here lives at club scale, where a local audience can recognize a band before the rest of the country does.

The bar has survived changes of ownership and a redevelopment threat. Today its live calendar keeps the room in use. Cross Moreland at a marked crossing, read the bill, and consider ending your walk here. The old bank's most valuable deposit is the memory of a night when the band and the room clicked.$q$, $q$An active bar and music venue, with shows and comedy. Check the official event listing for admission and age restrictions.$q$, $q$active$q$, $q$https://www.starbaratl.bar/$q$, $q$https://www.starbaratl.bar/$q$, true, false, 16, null, null, null, null, null, null
from cities c where c.slug = $q$atlanta$q$
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

-- WRFG — Radio Free Georgia
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$wrfg-radio$q$, $q$WRFG — Radio Free Georgia$q$, 33.7621973, -84.3526031, $q$1083 Austin Avenue NE, Atlanta, GA 30307$q$, $q$studio$q$, 1973, null, $q$A neighborhood needs more than stages. It needs someone willing to put unfamiliar music on the air. WRFG began broadcasting in 1973, building an independent, listener-supported alternative to commercial radio. Blues, jazz, bluegrass, Caribbean music, hip-hop, and other sounds share its schedule with community affairs.

The station's current address is inside the Little Five Points Community Center on Austin Avenue. This pin marks the working station, not a claim that every chapter of its history happened in this building. Between 1977 and 1980, WRFG made the fifty-part Living Atlanta documentary series, turning the microphone toward the city's own history as well as its music.

Stop outside and tune in. A shop puts a record in your hands; radio sends one into a kitchen, a car, or a room across the world. That quieter infrastructure belongs on a music map alongside the famous studios. You needn't enter a broadcast workspace to hear what it does: the stream can accompany the next few blocks of your walk.$q$, $q$An active community radio station at the Little Five Points Community Center. Listen online; studio visits require arrangements.$q$, null, $q$https://wrfg.org/$q$, null, true, false, 17, null, null, null, null, null, null
from cities c where c.slug = $q$atlanta$q$
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

-- Ebenezer Baptist Church — Heritage Sanctuary
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$ebenezer-heritage-sanctuary$q$, $q$Ebenezer Baptist Church — Heritage Sanctuary$q$, 33.7548066, -84.3742353, $q$407 Auburn Avenue NE, Atlanta, GA 30312$q$, $q$museum$q$, 1960, null, $q$Before you look toward the pulpit, think about the people making music beside it. Alberta Williams King, Martin Luther King Jr.'s mother, was an organist at Ebenezer. The church's story belongs to the choir and congregation as well as to the speeches that traveled out of this room.

King served here as co-pastor with his father from 1960 until 1968. His funeral was held in this sanctuary on April 9, 1968. Six years later, Alberta King was killed while playing the organ during a Sunday service. That loss gives the instrument's place in the room a particular weight: church music was daily community work, carried by people whose names deserve to be remembered.

The National Park Service restored the historic sanctuary to the period of King's co-pastorate, including work on its organ. This is the Heritage Sanctuary on Auburn Avenue; the congregation's newer worship building is separate. Let this stop widen the chapter before you walk toward the record shops. Atlanta's musical life includes the voices raised together here, beyond the reach of any hit parade.$q$, $q$The historic Heritage Sanctuary is interpreted by the National Park Service. Check park access notices and ranger-program hours; this is distinct from the newer Horizon Sanctuary.$q$, null, $q$https://www.nps.gov/malu/planyourvisit/ebenezer_baptist_church.htm$q$, null, true, false, 18, null, null, null, null, $q$https://upload.wikimedia.org/wikipedia/commons/3/35/Historic_Ebenezer_Baptist_Church_in_Atlanta%2C_June_2015.jpg$q$, $q$Photo: Marc Merlin, CC BY-SA 4.0, via Wikimedia Commons$q$
from cities c where c.slug = $q$atlanta$q$
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

-- Patchwerk Recording Studios
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$patchwerk-recording-studios$q$, $q$Patchwerk Recording Studios$q$, 33.7846284, -84.4064291, $q$1094 Hemphill Avenue NW, Atlanta, GA 30318$q$, $q$studio$q$, 1995, null, $q$Behind the plaques are engineers, cables, and hours of work that never appear in a music video. Patchwerk's Atlanta studio began in 1995 with backing from Falcons player Bob Whitfield. Its first room was on McMillan Street; the business later moved to the Hemphill Avenue facility marked here. Keep that move in mind when connecting a record to this address.

Organized Noize was among the production teams drawn to the early studio. Patchwerk's own history also names OutKast, T.I., Jeezy, and Gucci Mane among the artists in its orbit. That makes it an important bridge in this chapter: from the Dungeon Family generation to the rappers who carried Atlanta into the trap era. A city becomes a recording center through working rooms as well as stars.

This remains a professional studio, not a walk-in exhibit. Book an advertised tour if you want to see inside. From outside, the useful thing to picture is the collaboration: a performance on one side of the glass, careful listening on the other, and a record slowly becoming itself.$q$, $q$An active recording, mixing, and mastering facility. Sessions and advertised tours are arranged through Patchwerk.$q$, null, $q$https://patchwerk.com/$q$, null, true, false, 19, null, null, null, null, $q$https://upload.wikimedia.org/wikipedia/commons/7/71/Patchwerk_sign.JPG$q$, $q$Photo: Subzzee, CC BY-SA 3.0, via Wikimedia Commons$q$
from cities c where c.slug = $q$atlanta$q$
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

-- Trap Music Museum
insert into locations (city_id, slug, name, lat, lng, address, pin_type, era_start, era_end, story_md, what_is_there_now, venue_status, official_url, tickets_url, coords_verified, is_orbit, sort_order, spotify_track_id, spotify_track_label, setlistfm_url, setlistfm_venue_id, image_url, image_attribution)
select c.id, $q$trap-music-museum$q$, $q$Trap Music Museum$q$, 33.7718036, -84.4086916, $q$630 Travis Street NW, Atlanta, GA 30318$q$, $q$museum$q$, 2018, null, $q$Atlanta's rap history didn't stop when OutKast became a household name. The Trap Music Museum brings a later chapter into view through installations, artwork, and the artists whose records carried trap beyond the city. T.I. helped launch it in 2018, around the fifteenth anniversary of his album Trap Muzik.

The museum's current presentation includes figures such as Jeezy, Gucci Mane, Future, and Migos. It offers a place to consider an era that can otherwise disappear between the map's famous basement and its working studios. Treat the displays as one deliberately curated account of a living musical culture, rather than a finish line or a claim that one artist invented everything.

This is a destination you can actually visit, unlike a private childhood home or an unmarked recording room. Check the museum's own site for the current address, hours, and admission before setting out. Leave time to listen as well as look: the photographs and installations make more sense with the music in your ears and the wider Atlanta chapter in mind.$q$, $q$The museum currently lists 630 Travis Street NW and ticketed visits. Use its official site for current hours; older listings use a different address.$q$, null, $q$https://trapmusicmuseum.com/$q$, $q$https://trapmusicmuseum.us/$q$, true, false, 20, null, null, null, null, null, null
from cities c where c.slug = $q$atlanta$q$
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

-- Audit: 152-nassau-street
update locations set
  image_url = null,
  image_attribution = null,
  story_md = $q$Before Bristol, there was Atlanta. In June 1923, OKeh Records' Ralph Peer came south and set up a pop-up studio in a vacant brick building on Nassau Street — an early commercial field-recording venture. On June 19, local radio favorite Fiddlin' John Carson cut "The Little Old Log Cabin in the Lane," which became an early country-music hit and proved there was a market for the South's own music. The same sessions produced recordings by Fannie May Goosby and Lucille Bogan, placing Black women’s blues in the same Atlanta recording story.

Four years later, Peer would record the Bristol Sessions, another stop on this map.

The building improbably survived the Olympics and a tornado, only to be demolished in 2019 over preservationists' lawsuits and petitions — replaced by a Margaritaville resort.$q$
where slug = $q$152-nassau-street$q$;

-- Audit: eddies-attic
update locations set
  what_is_there_now = $q$An active Decatur listening room with a concert and open-mic calendar. Check the official listing for dates, tickets, and admission details.$q$
where slug = $q$eddies-attic$q$;

-- Audit: the-tabernacle
update locations set
  story_md = $q$The Tabernacle turned a former church into a concert room for Atlanta’s 1996 Olympic summer. Stand in front of the doors on Luckie Street and the building’s earlier purpose is still part of the attraction: a place made for people to gather and listen found a new kind of audience.

Its balconies give a show a different shape from a warehouse or an open field. Music fills an inherited room, and the room becomes part of the evening. That makes this a useful companion to the nearby Nassau Street site, where a vanished building survives chiefly through its recordings.

The Tabernacle is still a working venue. Check the bill and ticket details, then come back to hear what this older gathering place does with a current crowd.$q$
where slug = $q$the-tabernacle$q$;

-- Audit: criminal-records
update locations set
  what_is_there_now = $q$An operating record and comics shop in Little Five Points. Check the shop’s current hours and in-store event notices.$q$
where slug = $q$criminal-records$q$;

-- Audit: the-masquerade
update locations set
  era_start = 1989,
  lat = 33.7517171,
  lng = -84.3897952,
  image_url = null,
  image_attribution = null,
  what_is_there_now = $q$Operating at Underground Atlanta with Heaven, Hell, Purgatory, and Altar. Check the event listing for the correct room and entrance.$q$,
  story_md = $q$Heaven, Hell, and Purgatory — the eternal architecture of Atlanta's alternative scene. Founded in 1989 in the old Excelsior Mill on North Avenue, the Masquerade was the proving ground for punk, metal, indie, and underground hip-hop for nearly three decades before relocating to Kenny's Alley in Underground Atlanta in 2016, room names intact. A fourth room, Altar, opened in 2024. Generations of Atlanta kids saw their first loud show here.$q$
where slug = $q$the-masquerade$q$;

-- Audit: the-dungeon
update locations set
  what_is_there_now = $q$A private residential site. Big Boi’s purchase was reported in 2019; that historical report is not a current access invitation. Explore this stop from the map.$q$,
  story_md = $q$The basement of Rico Wade's mother's house in Lakewood Heights: dirt floors, rickety stairs, speakers wedged into the walls, and sleeping bags for the teenagers who stayed up all night making music. This was the first studio of Organized Noize — Wade, Ray Murray, and Sleepy Brown — and the meeting ground of the collective that took its name from the room: the Dungeon Family. OutKast, Goodie Mob, Big Rube, Witchdoctor.

OutKast's "Southernplayalisticadillacmuzik," "ATLiens," and "Aquemini" grew from the creative community around this basement, with recording work also taking place in professional studios — the records that forced the coasts to take the South seriously. In 2019, Big Boi bought the house, tweeting that he'd "just copped the Dungeon."

A private residence in a residential neighborhood — this pin is history, not a doorstep visit.$q$
where slug = $q$the-dungeon$q$;

-- Audit: stankonia-studios
update locations set
  story_md = $q$Before it was Stankonia, this was Bobby Brown’s Bosstown studio. OutKast bought the facility in March 1998, before Aquemini came out later that year. The move puts a working studio into the story after the basement gatherings that gave the Dungeon Family its name.

Stankonia, released in 2000, brought B.O.B. and Ms. Jackson into that larger story, with the duo and Mr. DJ working as Earthtone III. Speakerboxxx/The Love Below followed. The records traveled around the world; the practical work still needed rooms, equipment, and people listening closely in Atlanta.

This remains a professional recording facility. There is no need to treat its doorway as an attraction to appreciate what happened inside. Connect it on the map to the Dungeon and Patchwerk: different spaces, overlapping collaborators, and a city learning to make its own sound at scale.$q$
where slug = $q$stankonia-studios$q$;

-- Audit: chattahoochee-river
update locations set
  address = $q$Riverside Park, 575 Riverside Road, Roswell, GA 30075$q$,
  story_md = $q$A song can make a river feel like a place you already know. Alan Jackson’s 1993 Chattahoochee carries memories of growing up beside the water. This Roswell pin is a place to think about that connection, not a claim that the song was written or filmed on this stretch.

The river runs through the Atlanta region, giving the chapter a different kind of landscape from studios and theaters. Listening here, when access permits, is an editorial invitation: let the setting give a familiar record more room. It is not evidence that a particular lyric describes this bank.

Riverside Park is a City of Roswell park, distinct from the federal recreation area’s units. It is currently closed for renovation, with reopening expected in summer 2027. Keep this as a map stop until the city confirms access; a musical association does not override a closed gate.$q$,
  what_is_there_now = $q$Riverside Park is closed for renovation, with reopening expected in summer 2027. Check the City of Roswell notice before planning any visit; this pin is not an open-access recommendation.$q$
where slug = $q$chattahoochee-river$q$;

-- Audit: ameris-bank-amphitheatre
update locations set
  what_is_there_now = $q$An active outdoor concert venue in Alpharetta. Check the official season calendar for performances, tickets, and lawn or pavilion options.$q$,
  story_md = $q$The north metro's shed: a 12,000-capacity amphitheatre — fan-shaped pavilion, sprawling lawn — that opened on May 10, 2008 with a performance by the Atlanta Symphony Orchestra. Born as Verizon Wireless Amphitheatre at Encore Park and renamed for Ameris Bank in 2019, it's where the suburbs north of the city see their shows: Buffett, Stapleton, Dave Matthews, and — fittingly for a Georgia venue — regular visits from Atlanta's own Zac Brown Band, the hometown country juggernaut playing the hometown lawn.

Most pins on this map mark where music history happened. This one marks where listeners are out on a blanket making their own.$q$,
  image_url = $q$https://upload.wikimedia.org/wikipedia/commons/3/3a/ABA2025.jpg$q$,
  image_attribution = $q$Photo: Mbdfar, CC0, via Wikimedia Commons$q$
where slug = $q$ameris-bank-amphitheatre$q$;

-- Audit: georgia-state-capitol
update locations set
  story_md = $q$On March 7, 1979, Ray Charles performed Georgia on My Mind before Georgia’s legislature. The song became the official state song later that year. Those are related events, but the performance date should not be mistaken for the date the law took effect.

The honor connected an Albany-born musician to the public identity of his home state. Charles had recorded the song in 1960; inside the Capitol, a familiar record became part of a civic occasion. Stand outside the gold dome and consider how a voice can change what a place hears when it says its own name.

This is still a working government building, with museum exhibits and visitor arrangements to check before entering. The musical moment belongs to its history alongside the legislation. Follow the thread to Buckhead Theatre for a later songwriter’s personal response to the same standard.$q$,
  spotify_track_label = $q$Ray Charles — Georgia on My Mind (1960)$q$
where slug = $q$georgia-state-capitol$q$;

-- Audit: buckhead-theatre
update locations set
  what_is_there_now = $q$An active Live Nation venue on Roswell Road. Check the official calendar and event seating plan; capacity varies with configuration.$q$,
  story_md = $q$A Spanish Baroque movie house from Buckhead's early days — long known as the Roxy — restored into one of the city's best-sounding mid-size rooms. It's the sweet spot of Atlanta venues: big enough for touring names, small enough that you can see the guitarist's hands.

Its place on this map comes from one of those nights: Lukas Nelson singing "Forget About Georgia" — his answer song to "Georgia on My Mind," about loving a girl with the state's name and then having to sing the standard with his father Willie night after night, unable to forget her. A song haunted by the state song, performed in the state's capital city. The thread to the Capitol pin draws itself.$q$
where slug = $q$buckhead-theatre$q$;

insert into trails (slug, name, description_md, trail_type, sort_order) values ($q$atlanta-auburn-to-little-five$q$, $q$Auburn to Little Five: Voices, Radio & Records$q$, $q$A roughly two-mile, six-stop walk from Ebenezer’s Heritage Sanctuary to Little Five Points. Allow an afternoon for the walk and browsing, then a show if the calendar fits. Public sidewalks and marked crossings connect the stops; the first leg is the longest. Museum, shop, and show access have separate hours.$q$, $q$walking$q$, 5)
on conflict (slug) do update set name = excluded.name, description_md = excluded.description_md, trail_type = excluded.trail_type, sort_order = excluded.sort_order;

insert into trail_stops (trail_id, location_id, stop_order, stop_note_md)
select t.id, l.id, 1, $q$Begin with a room where music served a congregation. This is the historic Heritage Sanctuary, not the newer church across Auburn. Continue east toward Little Five Points on public sidewalks and marked crossings.$q$ from trails t cross join locations l
where t.slug = $q$atlanta-auburn-to-little-five$q$ and l.slug = $q$ebenezer-heritage-sanctuary$q$
on conflict (trail_id, stop_order) do update set location_id = excluded.location_id, stop_note_md = excluded.stop_note_md;

insert into trail_stops (trail_id, location_id, stop_order, stop_note_md)
select t.id, l.id, 2, $q$After the longer walk east, pause outside the community center. WRFG carries neighborhood music beyond the block. Tune in rather than entering the broadcast workspace, then continue toward Euclid Avenue.$q$ from trails t cross join locations l
where t.slug = $q$atlanta-auburn-to-little-five$q$ and l.slug = $q$wrfg-radio$q$
on conflict (trail_id, stop_order) do update set location_id = excluded.location_id, stop_note_md = excluded.stop_note_md;

insert into trail_stops (trail_id, location_id, stop_order, stop_note_md)
select t.id, l.id, 3, $q$From radio to a live room: the old cinema is now a concert destination. Read the marquee before heading north along Euclid toward the shops.$q$ from trails t cross join locations l
where t.slug = $q$atlanta-auburn-to-little-five$q$ and l.slug = $q$variety-playhouse$q$
on conflict (trail_id, stop_order) do update set location_id = excluded.location_id, stop_note_md = excluded.stop_note_md;

insert into trail_stops (trail_id, location_id, stop_order, stop_note_md)
select t.id, l.id, 4, $q$Now step into the listening community around the venue. Browse records and comics during shop hours; continue toward Moreland for another kind of record-store history.$q$ from trails t cross join locations l
where t.slug = $q$atlanta-auburn-to-little-five$q$ and l.slug = $q$criminal-records$q$
on conflict (trail_id, stop_order) do update set location_id = excluded.location_id, stop_note_md = excluded.stop_note_md;

insert into trail_stops (trail_id, location_id, stop_order, stop_note_md)
select t.id, l.id, 5, $q$Danny Beard’s shop helped put independent music into circulation through DB Records. Browse if open, then use the marked crossing at the Little Five Points intersection to reach Star Bar.$q$ from trails t cross join locations l
where t.slug = $q$atlanta-auburn-to-little-five$q$ and l.slug = $q$wax-n-facts$q$
on conflict (trail_id, stop_order) do update set location_id = excluded.location_id, stop_note_md = excluded.stop_note_md;

insert into trail_stops (trail_id, location_id, stop_order, stop_note_md)
select t.id, l.id, 6, $q$End at the old bank turned neighborhood music room. Check the bill before planning an evening show; daytime walkers can finish outside and return after doors.$q$ from trails t cross join locations l
where t.slug = $q$atlanta-auburn-to-little-five$q$ and l.slug = $q$star-community-bar$q$
on conflict (trail_id, stop_order) do update set location_id = excluded.location_id, stop_note_md = excluded.stop_note_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$OutKast filmed the 1998 Rosa Parks video at the Royal Peacock, connecting the Sweet Auburn club to the duo that bought and renamed Bosstown as Stankonia that year.$q$ from locations f cross join locations t
where f.slug = $q$royal-peacock$q$ and t.slug = $q$stankonia-studios$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Organized Noize began in Rico Wade’s family basement and became early clients of Patchwerk’s Atlanta studio. The link is the production team moving between an informal creative home and a professional recording room.$q$ from locations f cross join locations t
where f.slug = $q$the-dungeon$q$ and t.slug = $q$patchwerk-recording-studios$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Patchwerk names T.I. among its artists. In 2018 he helped launch the Trap Music Museum around the fifteenth anniversary of Trap Muzik: a recording artist connecting a working studio to a public account of the scene.$q$ from locations f cross join locations t
where f.slug = $q$patchwerk-recording-studios$q$ and t.slug = $q$trap-music-museum$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Nearby downtown sites with different uses: Ralph Peer recorded local musicians on Nassau Street in 1923; the Tabernacle became a concert venue for the 1996 Olympics.$q$ from locations f cross join locations t
where f.slug = $q$152-nassau-street$q$ and t.slug = $q$the-tabernacle$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Fiddlin’ John Carson’s 1923 Atlanta recording and Alan Jackson’s 1993 Chattahoochee offer two Georgia country-music listening points. The river pin is an editorial setting, not the verified location of Jackson’s song or video.$q$ from locations f cross join locations t
where f.slug = $q$152-nassau-street$q$ and t.slug = $q$chattahoochee-river$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

insert into connections (from_location_id, to_location_id, relationship_md)
select f.id, t.id, $q$Ray Charles performed Georgia on My Mind for Georgia’s legislature in March 1979; it became the state song later that year. Lukas Nelson’s Forget About Georgia answers the familiar standard in the personal concert memory anchoring the Buckhead pin.$q$ from locations f cross join locations t
where f.slug = $q$georgia-state-capitol$q$ and t.slug = $q$buckhead-theatre$q$
on conflict (from_location_id, to_location_id) do update set relationship_md = excluded.relationship_md;

update trail_stops s set stop_note_md = $q$1923. Begin at the demolished site of Ralph Peer’s Atlanta recording venture. The recordings survive even though the room does not.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$atlanta-century$q$ and l.slug = $q$152-nassau-street$q$;

update trail_stops s set stop_note_md = $q$1989. The venue began on North Avenue and moved to Underground Atlanta in 2016. Its present rooms include Heaven, Hell, Purgatory, and Altar.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$atlanta-century$q$ and l.slug = $q$the-masquerade$q$;

update trail_stops s set stop_note_md = $q$1991. Continue to Decatur for the listening room. Check the current concert and open-mic schedule before making the trip.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$atlanta-century$q$ and l.slug = $q$eddies-attic$q$;

update trail_stops s set stop_note_md = $q$Explore this stop from the map: a private residential site associated with the Dungeon Family’s early work. It is not a doorstep destination.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$atlanta-century$q$ and l.slug = $q$the-dungeon$q$;

update trail_stops s set stop_note_md = $q$1998. OutKast bought Bobby Brown’s former studio before Aquemini was released. End with a working room, not an assumed public tour.$q$
from trails t, locations l where s.trail_id = t.id and s.location_id = l.id
and t.slug = $q$atlanta-century$q$ and l.slug = $q$stankonia-studios$q$;

commit;
