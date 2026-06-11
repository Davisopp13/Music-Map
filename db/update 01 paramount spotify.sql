-- =============================================================
-- UPDATE 01: Paramount story card enrichment + Spotify slots
-- Run after seed_bristol.sql
-- =============================================================

-- -------------------------------------------------------------
-- 1. PARAMOUNT — enriched story card
--    Adds: penny-drive restoration, performer lineage
-- -------------------------------------------------------------
update locations
set story_md = 'Built as a movie palace by Paramount Pictures in 1931 — opening night was February 21, with a Carole Lombard picture on the screen — the theater anchored State Street entertainment for decades before falling into critical disrepair. The rescue is the best part of the story: in the late 1980s, Bristol residents raised roughly $1.3 million to save it, with the state of Tennessee adding another million. Local kids literally brought in socks full of pennies.

The restored 756-seat Art Deco hall reopened on April 24, 1991 with a black-tie gala headlined by Bristol''s own Tennessee Ernie Ford — his final hometown performance, months before his death. The local boy who left Anderson Street for WOPI radio came home to close the circle on the same street where it all began.

The stage he stood on carries serious lineage: Bill Monroe, Doc Watson, Chet Atkins, Loretta Lynn, Ricky Skaggs, and Carlene Carter — Carter Family blood, two generations on from the 1927 Sessions a few blocks away — have all played the Paramount.',
    what_is_there_now = 'A restored 756-seat Art Deco theater on the National Register of Historic Places, still Bristol''s premier live venue.'
where slug = 'paramount-bristol';

-- -------------------------------------------------------------
-- 2. SPOTIFY TRACK SLOTS
--    Replace REPLACE_ME with the ID from each share link:
--    https://open.spotify.com/track/<THIS_PART>?si=...
-- -------------------------------------------------------------

-- Sessions site — Carter Family, "Bury Me Under the Weeping Willow"
-- (1927 Bristol recording — verify it's the Victor original)
update locations set
  spotify_track_id = 'REPLACE_ME',
  spotify_track_label = 'Listen: The Carter Family — "Bury Me Under the Weeping Willow" (recorded here, Aug 1, 1927)'
where slug = 'bristol-sessions-site';

-- State Street — Ernest Stoneman, "The Sinking of the Titanic"
-- (NEW pick: Stoneman is why the Sessions came to Bristol)
update locations set
  spotify_track_id = 'REPLACE_ME',
  spotify_track_label = 'Listen: Ernest Stoneman — "The Sinking of the Titanic"'
where slug = 'state-street-line';

-- Ernie Ford birthplace — "Sixteen Tons" (unmovable)
update locations set
  spotify_track_id = 'REPLACE_ME',
  spotify_track_label = 'Listen: Tennessee Ernie Ford — "Sixteen Tons"'
where slug = 'tennessee-ernie-ford-birthplace';

-- Carter Family Fold — "Wildwood Flower"
update locations set
  spotify_track_id = 'REPLACE_ME',
  spotify_track_label = 'Listen: The Carter Family — "Wildwood Flower"'
where slug = 'carter-family-fold';

-- Burger Bar — Hank Williams, "I'll Never Get Out of This World Alive"
update locations set
  spotify_track_id = 'REPLACE_ME',
  spotify_track_label = 'Listen: Hank Williams — "I''ll Never Get Out of This World Alive"'
where slug = 'burger-bar';

-- Rhythm & Roots — Nitty Gritty Dirt Band, "Will the Circle Be Unbroken"
update locations set
  spotify_track_id = 'REPLACE_ME',
  spotify_track_label = 'Listen: Nitty Gritty Dirt Band — "Will the Circle Be Unbroken"'
where slug = 'rhythm-and-roots';

-- PARAMOUNT — PENDING listening session.
-- Candidates: Bill Monroe (Uncle Pen / Blue Moon of Kentucky),
-- Doc Watson (Tennessee Stud, live), Carlene Carter (Every Little Thing),
-- or stay null and let the prose carry it.
-- Uncomment + fill when decided:
--
-- update locations set
--   spotify_track_id = 'REPLACE_ME',
--   spotify_track_label = 'Listen: REPLACE_ME'
-- where slug = 'paramount-bristol';

-- Museum + Bristol Sign: intentionally null. Silence is curation.

-- -------------------------------------------------------------
-- 3. Clear the placeholder label on Paramount until decided
--    (seed had "Sixteen Tons" there — removing the duplicate)
-- -------------------------------------------------------------
update locations set
  spotify_track_label = null
where slug = 'paramount-bristol';
