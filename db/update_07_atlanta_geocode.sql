-- =============================================================
-- UPDATE 07: Atlanta geocode fixes (June 2026)
-- Coordinates verified against seed addresses via Nominatim/OSM.
-- Venue-level matches where OSM has the building (Fox, Tabernacle,
-- Royal Peacock, Buckhead Theatre, Capitol, Ameris); street/park
-- level for the demolished Nassau Street site, the Dungeon
-- (street-only address), and the Riverside Park river access.
-- Idempotent; run after seed_atlanta.sql + update_02/04/05/06.
-- =============================================================
update locations set lat = 33.75829, lng = -84.39200, coords_verified = true where slug = '152-nassau-street';
update locations set lat = 33.75568, lng = -84.38163, coords_verified = true where slug = 'royal-peacock';
update locations set lat = 33.77264, lng = -84.38556, coords_verified = true where slug = 'fox-theatre';
update locations set lat = 33.75871, lng = -84.39142, coords_verified = true where slug = 'the-tabernacle';
update locations set lat = 33.76512, lng = -84.34971, coords_verified = true where slug = 'criminal-records';
update locations set lat = 33.75229, lng = -84.39237, coords_verified = true where slug = 'the-masquerade';
update locations set lat = 33.70212, lng = -84.38121, coords_verified = true where slug = 'the-dungeon';
update locations set lat = 34.00639, lng = -84.34665, coords_verified = true where slug = 'chattahoochee-river';
update locations set lat = 34.05435, lng = -84.30633, coords_verified = true where slug = 'ameris-bank-amphitheatre';
update locations set lat = 33.74906, lng = -84.38817, coords_verified = true where slug = 'georgia-state-capitol';
update locations set lat = 33.84033, lng = -84.37992, coords_verified = true where slug = 'buckhead-theatre';
