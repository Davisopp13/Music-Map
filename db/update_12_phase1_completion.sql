-- =============================================================
-- UPDATE 12 — PHASE 1 FOUR-CITY CONSOLIDATION
-- Repeat-safe, transactional completion pass keyed by location slug.
-- Run after schema.sql, all four city seeds, and updates 01–11.
-- =============================================================

begin;

-- Reconcile the one district constraint added to the canonical schema after
-- the original district update shipped.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'districts_city_name_key'
      and conrelid = 'public.districts'::regclass
  ) then
    alter table districts add constraint districts_city_name_key
      unique (city_id, name);
  end if;
end
$$;

-- Nashville coordinate audit, August 2026. Official addresses were matched
-- against OpenStreetMap through Nominatim. Exact named POIs were available for
-- Ryman, Tootsie's, RCA Studio B, the Opry House, and Station Inn; the other
-- four are exact street-address/building matches.
update locations as l set
  lat = v.lat,
  lng = v.lng,
  coords_verified = true,
  address = v.address
from (values
  ('ryman-auditorium',       36.1612473, -86.7784951, '116 Rep. John Lewis Way N, Nashville, TN 37219'),
  ('tootsies-orchid-lounge', 36.1608889, -86.7782841, '422 Broadway, Nashville, TN 37203'),
  ('rca-studio-b',           36.1499750, -86.7928744, '1611 Roy Acuff Place, Nashville, TN 37203'),
  ('quonset-hut',            36.1493030, -86.7919680, '34 Music Square East, Nashville, TN 37203'),
  ('club-baron',             36.1681910, -86.8170230, '2614 Jefferson Street, Nashville, TN 37208'),
  ('bluebird-cafe',          36.1013513, -86.8181566, '4104 Hillsboro Pike, Nashville, TN 37215'),
  ('grand-ole-opry-house',   36.2069577, -86.6918054, '600 Opry Mills Drive, Nashville, TN 37214'),
  ('station-inn',            36.1525608, -86.7846399, '402 12th Avenue South, Nashville, TN 37203'),
  ('hatch-show-print',       36.1580072, -86.7767056, '224 Rep. John Lewis Way S, Nashville, TN 37203')
) as v(slug, lat, lng, address)
where l.slug = v.slug;

-- Static venue layer. Active/seasonal venues get an official site and a
-- canonical shows/tickets page where the venue publishes one. Closed venues
-- intentionally receive no ticket link. Exact setlist.fm venue IDs are stored
-- separately so a future cached events layer does not need to parse URLs.
update locations as l set
  venue_status = v.venue_status,
  official_url = v.official_url,
  tickets_url = v.tickets_url,
  setlistfm_url = v.setlistfm_url,
  setlistfm_venue_id = v.setlistfm_venue_id,
  ticketmaster_venue_id = v.ticketmaster_venue_id
from (values
  -- Bristol (revalidated August 2026)
  ('cameo-theatre', 'active', 'https://theatrebristol.org/our-stages/', 'https://theatrebristol.org/tickets/', 'https://www.setlist.fm/venue/the-cameo-theater-bristol-va-usa-5bd0fb9c.html', '5bd0fb9c', null),
  ('hard-rock-live-bristol', 'active', 'https://casino.hardrock.com/bristol/entertainment/hard-rock-live', 'https://www.ticketmaster.com/hard-rock-live-bristol-tickets-bristol/venue/222877', 'https://www.setlist.fm/venue/hard-rock-live-bristol-va-usa-53de8711.html', '53de8711', '222877'),
  ('paramount-bristol', 'active', 'https://paramountbristol.org/', 'https://paramountbristol.org/music-live-events/', 'https://www.setlist.fm/venue/paramount-center-for-the-arts-bristol-tn-usa-73d4eee5.html', '73d4eee5', null),
  ('carter-family-fold', 'active', 'https://carterfamilyfold.org/', 'https://carterfamilyfold.org/events/', 'https://www.setlist.fm/venue/carter-family-fold-hiltons-va-usa-63d6daeb.html', '63d6daeb', null),
  ('rhythm-and-roots', 'seasonal', 'https://birthplaceofcountrymusic.org/festival-bristol-rhythm/', 'https://birthplaceofcountrymusic.org/tickets/', 'https://www.setlist.fm/venue/bristol-rhythm-and-roots-reunion-bristol-tn-usa-5bd723d8.html', '5bd723d8', null),

  -- Macon
  ('douglass-theatre', 'active', 'https://www.douglasstheatre.org/', 'https://www.douglasstheatre.org/event-calendar/', 'https://www.setlist.fm/venue/douglass-theatre-macon-ga-usa-43d58727.html', '43d58727', null),
  ('grants-lounge', 'active', 'https://www.historicgrants.com/', 'https://www.historicgrants.com/events', 'https://www.setlist.fm/venue/grants-lounge-macon-ga-usa-2bd19436.html', '2bd19436', null),
  ('macon-city-auditorium', 'active', 'https://www.maconcentreplex.org/auditorium/', 'https://www.ticketmaster.com/macon-city-auditorium-tickets-macon/venue/114830', 'https://www.setlist.fm/venue/city-auditorium-macon-ga-usa-1bd64990.html', '1bd64990', '114830'),

  -- Atlanta
  ('royal-peacock', 'active', 'https://royalpeacocklounge.com/', 'https://getinfree.royalpeacocklounge.com/', 'https://www.setlist.fm/venue/royal-peacock-social-club-atlanta-ga-usa-6bde3ae2.html', '6bde3ae2', null),
  ('eddies-attic', 'active', 'https://eddiesattic.com/', 'https://eddiesattic.com/events', 'https://www.setlist.fm/venue/eddies-attic-decatur-ga-usa-2bd61026.html', '2bd61026', null),
  ('fox-theatre', 'active', 'https://www.foxtheatre.org/', 'https://www.foxtheatre.org/events', 'https://www.setlist.fm/venue/fox-theatre-atlanta-ga-usa-7bd14eec.html', '7bd14eec', null),
  ('the-tabernacle', 'active', 'https://www.tabernacleatl.com/', 'https://www.tabernacleatl.com/shows', 'https://www.setlist.fm/venue/tabernacle-atlanta-ga-usa-6bd63a76.html', '6bd63a76', null),
  ('the-masquerade', 'active', 'https://www.masqueradeatlanta.com/', 'https://www.masqueradeatlanta.com/events/', 'https://www.setlist.fm/venue/the-masquerade-atlanta-ga-usa-bdfb5be.html', 'bdfb5be', null),
  ('ameris-bank-amphitheatre', 'seasonal', 'https://www.amerisbankampatl.com/', 'https://www.amerisbankampatl.com/shows', 'https://www.setlist.fm/venue/ameris-bank-amphitheatre-alpharetta-ga-usa-23d3a813.html', '23d3a813', null),
  ('buckhead-theatre', 'active', 'https://www.thebuckheadtheatre.com/', 'https://www.thebuckheadtheatre.com/shows', 'https://www.setlist.fm/venue/buckhead-theatre-atlanta-ga-usa-33d7d4a9.html', '33d7d4a9', null),

  -- Nashville
  ('ryman-auditorium', 'active', 'https://www.ryman.com/', 'https://www.ryman.com/shows', 'https://www.setlist.fm/venue/ryman-auditorium-nashville-tn-usa-3d61d57.html', '3d61d57', null),
  ('tootsies-orchid-lounge', 'active', 'https://www.tootsies.net/', null, 'https://www.setlist.fm/venue/tootsies-orchid-lounge-nashville-tn-usa-23d75807.html', '23d75807', null),
  ('club-baron', 'closed', null, null, null, null, null),
  ('bluebird-cafe', 'active', 'https://bluebirdcafe.com/', 'https://bluebirdcafe.com/shows/', 'https://www.setlist.fm/venue/the-bluebird-cafe-nashville-tn-usa-4bd24bca.html', '4bd24bca', null),
  ('grand-ole-opry-house', 'active', 'https://www.opry.com/', 'https://www.opry.com/full-calendar', 'https://www.setlist.fm/venue/grand-ole-opry-house-nashville-tn-usa-7bd79e90.html', '7bd79e90', null),
  ('station-inn', 'active', 'https://stationinn.com/', 'https://stationinn.com/events/', 'https://www.setlist.fm/venue/station-inn-nashville-tn-usa-5bd63300.html', '5bd63300', null)
) as v(slug, venue_status, official_url, tickets_url, setlistfm_url,
       setlistfm_venue_id, ticketmaster_venue_id)
where l.slug = v.slug;

-- Four exact-subject images with explicit reusable licensing. Ambiguous or
-- unlicensed candidates for the remaining seven gaps are intentionally omitted.
update locations as l set
  image_url = v.image_url,
  image_attribution = v.image_attribution
from (values
  ('cameo-theatre',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Bristol%2C_VA_Cameo_Theater_%283228970587%29.jpg/1920px-Bristol%2C_VA_Cameo_Theater_%283228970587%29.jpg',
   'Photo: ceedub13, CC BY 2.0, via Wikimedia Commons'),
  ('the-big-house',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Allman_Bros_Big_House_from_Vineville%2C_Macon%2C_Georgia%2C_USA_Sept_2021.jpg/1920px-Allman_Bros_Big_House_from_Vineville%2C_Macon%2C_Georgia%2C_USA_Sept_2021.jpg',
   'Photo: Infrogmation, CC BY-SA 4.0, via Wikimedia Commons'),
  ('152-nassau-street',
   'https://upload.wikimedia.org/wikipedia/commons/b/b0/Fiddlin%27_John_Carson_playing_Turkey_in_the_Straw.jpg',
   $q$Fiddlin' John Carson in 1924. Photo: The Atlanta Journal, public domain, via Wikimedia Commons$q$),
  ('station-inn',
   'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Station_Inn_Nashville_%288729882676%29.jpg/1920px-Station_Inn_Nashville_%288729882676%29.jpg',
   'Photo: Nick Shields, CC BY 2.0, via Wikimedia Commons')
) as v(slug, image_url, image_attribution)
where l.slug = v.slug;

-- Targeted current-state corrections only; historical stories and trail notes
-- are deliberately unchanged.
update locations set what_is_there_now =
  $q$The Royal Peacock Lounge remains an active nightlife venue at its historic Auburn Avenue address; check the official calendar before visiting.$q$
where slug = 'royal-peacock';

update locations set what_is_there_now =
  $q$The surviving Club Baron building is Pride of Tennessee Elks Lodge #1102, with the Hendrix guitar-duel mural outside. It is not an active public music venue; the nearby Jefferson Street Sound Museum carries the district's story.$q$
where slug = 'club-baron';

update locations set what_is_there_now =
  $q$Still an active bluegrass listening room in the same stone building, with a ticketed calendar and the long-running Sunday night jam.$q$
where slug = 'station-inn';

commit;
