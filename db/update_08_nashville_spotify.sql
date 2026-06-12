-- =============================================================
-- UPDATE 07: Nashville — Opry House awakens + Spotify tracklist
-- Run after seed_nashville_v2.sql
-- House style: dollar-quoted strings (editor-mangle-proof).
-- Replace REPLACE_ME with the ID from each share link.
-- =============================================================

-- -------------------------------------------------------------
-- 1. Grand Ole Opry House — no longer silent. The Paisley story.
-- -------------------------------------------------------------
update locations
set story_md = $q$When the Opry left the Ryman in 1974 for its purpose-built home east of town, it carried its soul along physically: a six-foot circle of the Ryman's oak stage was cut out and inlaid at center stage of the new house. Every performer since — debuts, inductions, final bows — has stood on the same wood where Hank Williams stood. The Opry itself is the longest-running radio broadcast in American history, on air since 1925, still going out live from this room multiple nights a week.

What membership means is best told through one story. In May 1999, an unknown Brad Paisley made his Opry debut — then worked up the courage to ask his boyhood hero, Little Jimmy Dickens, to go fishing. Dickens said yes, and the friendship lasted until his death in 2015. Eighteen months and 36 appearances later, during the Opry's winter run at the Ryman, Dickens and Jeannie Seely walked onstage dressed as Santa and Mrs. Claus and Bill Anderson asked Paisley if he'd like to become a member. He couldn't answer — he bowed his head and wept, and they took the nod as a yes. At his induction on February 17, 2001, age 28, he wore the yellow jacket Buck Owens wore at Carnegie Hall, while a letter from George Jones was read aloud: I am counting on you to carry on the tradition.

He has. Paisley still calls the Opry his favorite place in Nashville.$q$,
    spotify_track_label = $q$Listen: Brad Paisley with Dolly Parton — "When I Get Where I'm Going" (an Opry member's hymn — and, since 2015, the one that carries Little Jimmy Dickens)$q$
where slug = 'grand-ole-opry-house';

update locations set spotify_track_id = '3VLCtStwYsAL4LKZgeUvy3'
where slug = 'grand-ole-opry-house';

-- -------------------------------------------------------------
-- 2. Bluebird — Garth isn't on Spotify; Taylor takes the embed.
--    (The story card already tells both founding myths.)
-- -------------------------------------------------------------
update locations set
  spotify_track_id = '0Om9WAB5RS09L80DyOfTNa',
  spotify_track_label = $q$Listen: Taylor Swift — "Tim McGraw" (Scott Borchetta heard a teenager in this room — this song is what happened next)$q$
where slug = 'bluebird-cafe';

-- -------------------------------------------------------------
-- 3. The rest of the decided tracklist
-- -------------------------------------------------------------

-- Ryman — Cash & June, "Jackson" (they met backstage, 1956)
update locations set spotify_track_id = '676TpHR9B00OL20I54KoOh'
where slug = 'ryman-auditorium';

-- Studio B — Dolly, "Jolene" (recorded in this room, 1973)
update locations set spotify_track_id = '5fdhThPDe6jQQDqCyWrdAn'
where slug = 'rca-studio-b';

-- Quonset Hut — Patsy, "Crazy" (recorded here, 1961)
update locations set spotify_track_id = '3zpj9dvJABiyMrmLCPw6i8'
where slug = 'quonset-hut';

-- Tootsie's — Willie's "Crazy" (the song travels its own
-- connection line: pitched here, recorded at the Hut)
update locations set spotify_track_id = '0xqtcLB45iKNfHroi5y1em'
where slug = 'tootsies-orchid-lounge';

-- Club Baron — Hendrix "Purple Haze" (DEFAULT — upgrade to the
-- Johnny Jones & the King Casuals 1969 cover if found on Spotify:
-- the duel's winner covering the kid who lost)
update locations set spotify_track_id = '76hWUOFrZC9wdyHLvN4VaM'
where slug = 'club-baron';

-- Station Inn — SILENT pending verdict
-- (candidate: Bill Monroe, "Blue Moon of Kentucky" — bluegrass
-- coming home to where it lives now)

-- Hatch Show Print — INTENTIONALLY SILENT (it's a print shop;
-- the posters are the music)


-- -------------------------------------------------------------
-- 4. Label upgrades from the link hunt
-- -------------------------------------------------------------

-- Ryman: the Folsom live version deepens the story — recorded
-- Jan 13, 1968; Cash proposed to June onstage five weeks later.
update locations set
  spotify_track_label = $q$Listen: Johnny Cash & June Carter — "Jackson" (Live at Folsom Prison, 1968 — they met backstage HERE in 1956; five weeks after this recording, he proposed onstage)$q$
where slug = 'ryman-auditorium';

-- Club Baron: THE WHITE WHALE. The duel's winner, covering the
-- kid who lost.
update locations set
  spotify_track_label = $q$Listen: Johnny Jones & the King Casuals — "Purple Haze" (1969 — the man who out-dueled Hendrix on this stage, covering him in tribute)$q$
where slug = 'club-baron';
