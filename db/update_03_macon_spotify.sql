-- =============================================================
-- UPDATE 03: Macon Spotify tracklist (decided)
-- Run after seed_macon.sql
-- Replace REPLACE_ME with the ID from each share link:
-- https://open.spotify.com/track/<THIS_PART>?si=...
-- =============================================================

-- Capricorn — Allman Brothers Band, "Ramblin' Man" (recorded here)
update locations set
  spotify_track_id = '7y4CK8bbzxpyKu73WOvgHJ',
  spotify_track_label = 'Listen: The Allman Brothers Band — "Ramblin'' Man" (recorded here)'
where slug = 'capricorn-sound-studios';

-- Big House — Allman Brothers Band, "Blue Sky"
update locations set
  spotify_track_id = '6iX1QW1gGIVNEItnqyvFfH',
  spotify_track_label = 'Listen: The Allman Brothers Band — "Blue Sky"'
where slug = 'the-big-house';

-- Rose Hill — "In Memory of Elizabeth Reed" (At Fillmore East)
update locations set
  spotify_track_id = '4c9FL7GiiiB3HB6XnLERws',
  spotify_track_label = 'Listen: The Allman Brothers Band — "In Memory of Elizabeth Reed" (At Fillmore East)'
where slug = 'rose-hill-cemetery';

-- Grant's Lounge — Marshall Tucker Band, "Can't You See" (NEW)
update locations set
  spotify_track_id = '4egy2d8QiyXn5tzVQiptTb',
  spotify_track_label = 'Listen: The Marshall Tucker Band — "Can''t You See"'
where slug = 'grants-lounge';

-- H&H — Wet Willie, "Keep On Smilin'" (NEW)
update locations set
  spotify_track_id = '6sHrxsewgTMPs2Di4x636C',
  spotify_track_label = 'Listen: Wet Willie — "Keep On Smilin''" (Macon''s own)'
where slug = 'h-and-h-restaurant';

-- Douglass — Otis Redding, "These Arms of Mine"
update locations set
  spotify_track_id = '4skknrc3sJqaPTtUr2cwFq',
  spotify_track_label = 'Listen: Otis Redding — "These Arms of Mine"'
where slug = 'douglass-theatre';

-- Little Richard House — "Tutti Frutti"
update locations set
  spotify_track_id = '2iXcvnD3d1gfLBum0cE5Eg',
  spotify_track_label = 'Listen: Little Richard — "Tutti Frutti"'
where slug = 'little-richard-house';

-- Otis Statue — "(Sittin' on) The Dock of the Bay"
update locations set
  spotify_track_id = '3zBhihYUHBmGd2bcQIobrF',
  spotify_track_label = 'Listen: Otis Redding — "(Sittin'' on) The Dock of the Bay"'
where slug = 'otis-redding-statue';

-- Macon City Auditorium — INTENTIONALLY SILENT.
-- The funeral pin. 4,500 mourners. Silence is the curation.
