-- =============================================================
-- UPDATE 04: Atlanta Spotify tracklist + Criminal Records card
-- Run after seed_atlanta.sql and update_02_eddies_attic.sql
-- Replace REPLACE_ME with the ID from each share link:
-- https://open.spotify.com/track/<THIS_PART>?si=...
-- =============================================================

-- -------------------------------------------------------------
-- 1. Criminal Records — story card enrichment (in-store tradition)
-- -------------------------------------------------------------
update locations
set story_md = 'Little Five Points'' beloved independent record store — vinyl, comics, and in-stores since 1991. It''s the scene''s living room: release-day lines, a comics wall stocked with Marvel, DC, and Image, and a long-running in-store performance tradition that has hosted everyone from Old Crow Medicine Show to Dawes to rising acts like Athens'' Hotel Fiction — full bands playing acoustic and intimate, twenty feet from the bins.

That tradition is the whole point of this pin: most of this map marks where music history happened. Criminal Records marks where it''s still happening, on a random weekday afternoon, for whoever wanders in.'
where slug = 'criminal-records';

-- -------------------------------------------------------------
-- 2. Track assignments
-- -------------------------------------------------------------

-- Criminal Records — Dawes, "All Your Favorite Bands"
-- A toast to loving music, on the loving-music pin. Played acoustic
-- at an in-store here; now Dawes closes every show with it.
update locations set
  spotify_track_id = '1ZObejAPrO40QENy5S68ur',
  spotify_track_label = 'Listen: Dawes — "All Your Favorite Bands" (played live in this room)'
where slug = 'criminal-records';

-- 152 Nassau Street — Fiddlin' John Carson (the 1923 recording itself)
update locations set
  spotify_track_id = '11yR8LYrznfqVw7PW8EbPC',
  spotify_track_label = 'Listen: Fiddlin'' John Carson — "The Little Old Log Cabin in the Lane" (recorded on this spot, June 19, 1923)'
where slug = '152-nassau-street';

-- Fox Theatre — Lynyrd Skynyrd, "Free Bird" (live at the Fox)
update locations set
  spotify_track_id = '6kmA0HGaRPiD6Ck9EdhaZr',
  spotify_track_label = 'Listen: Lynyrd Skynyrd — "Free Bird" (One More from the Road, recorded in this room, 1976 — "play it pretty for Atlanta")'
where slug = 'fox-theatre';

-- Royal Peacock — Gladys Knight & the Pips
update locations set
  spotify_track_id = '75hgmQO2o2IUx0vgl0l54e',
  spotify_track_label = 'Listen: Gladys Knight & the Pips — "Every Beat of My Heart" (Atlanta''s own)'
where slug = 'royal-peacock';

-- Eddie's Attic — Shawn Mullins, "Lullaby" (decided)
update locations set
  spotify_track_id = '47VLtY7BDtg7bPloayNtGx',
  spotify_track_label = 'Listen: Shawn Mullins — "Lullaby" (launched from this stage)'
where slug = 'eddies-attic';

-- The Dungeon — OutKast, "Player's Ball"
update locations set
  spotify_track_id = '1RXEb6UTxJ05RffnAWfUOE',
  spotify_track_label = 'Listen: OutKast — "Player''s Ball" (born in this basement)'
where slug = 'the-dungeon';

-- Stankonia — OutKast, "B.O.B."
update locations set
  spotify_track_id = '3WibbMr6canxRJXhNtAvLU',
  spotify_track_label = 'Listen: OutKast — "B.O.B. (Bombs Over Baghdad)" (made here)'
where slug = 'stankonia-studios';

-- Masquerade — INTENTIONALLY SILENT (for now)
-- Tabernacle — INTENTIONALLY SILENT (for now)
-- Candidates noted for later: Mastodon (Masquerade);
-- Tabernacle pending a personal pick.

-- -------------------------------------------------------------
-- 3. PENDING: Chattahoochee River pin (Alan Jackson)
--    Awaiting placement decision — Newnan stretch (Jackson's
--    boyhood water) vs. Chattahoochee River NRA (Shooting the
--    Hooch / metro stretch). Pin insert will follow in update_05.
-- -------------------------------------------------------------

-- -------------------------------------------------------------
-- 4. TODO-V2.md additions (copy into repo):
--    - Personal pins layer: Davis saw Jason Isbell and Dawes at
--      the Tabernacle; Dawes + Old Crow Medicine Show + Hotel
--      Fiction in-stores at Criminal Records
--    - Muscle Shoals city: Jason Isbell / 400 Unit thread
-- -------------------------------------------------------------
