-- Geocode fixes for an already-seeded database (June 2026).
-- Idempotent; new installs get these values from seed_bristol.sql directly.
update locations set lat = 36.59455,  lng = -82.18100,  coords_verified = true where slug = 'bristol-sessions-site';
update locations set lat = 36.59487,  lng = -82.18420,  coords_verified = true where slug = 'state-street-line';
update locations set lat = 36.59495,  lng = -82.17968,  coords_verified = true where slug = 'bristol-sign';
update locations set lat = 36.59478,  lng = -82.18263,  coords_verified = true where slug = 'paramount-bristol';
update locations set lat = 36.59240,  lng = -82.19533,  coords_verified = true where slug = 'tennessee-ernie-ford-birthplace';
update locations set lat = 36.668384, lng = -82.413425, coords_verified = true where slug = 'carter-family-fold';
update locations set lat = 36.59531,  lng = -82.18522,  coords_verified = true where slug = 'burger-bar';
update locations set lat = 36.59500,  lng = -82.18650,  coords_verified = true where slug = 'rhythm-and-roots';
