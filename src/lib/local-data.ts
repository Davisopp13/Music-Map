// DEV FALLBACK ONLY — mirrors db/seed_bristol.sql so the app runs before
// Supabase env vars are configured. The SQL seed is the source of truth;
// if you edit content there, regenerate this file to match.
import type {
  CityData,
  Location,
  PinType,
  Trail,
  VenueStatus,
} from "./types";

const CITY_ID = "local-bristol";

const city = {
  id: CITY_ID,
  slug: "bristol",
  name: "Bristol",
  state: "TN/VA",
  center_lat: 36.5951,
  center_lng: -82.1885,
  default_zoom: 15,
  intro_md:
    'One street, two states, twelve days in 1927 that changed American music forever. In a hat warehouse on State Street, Ralph Peer recorded the Carter Family and Jimmie Rodgers within days of each other — the "Big Bang" of country music. Johnny Cash called it the single most important event in the history of the genre.',
  sort_order: 1,
};

type LocalPin = [
  slug: string,
  name: string,
  lat: number,
  lng: number,
  address: string,
  pin_type: PinType,
  era_start: number,
  era_end: number | null,
  story_md: string,
  what_is_there_now: string,
  spotify_track_label: string | null,
  is_orbit: boolean,
];

const pins: LocalPin[] = [
  [
    "bristol-sessions-site",
    "1927 Bristol Sessions Site",
    36.59455,
    -82.181,
    "408 State Street, Bristol, TN 37620",
    "studio",
    1927,
    1928,
    `In July 1927, Victor Talking Machine Company producer Ralph Peer set up portable recording equipment on the second and third floors of the Taylor-Christian Hat Company building at 408 State Street — chosen for its proximity to the rail station and the city's largest hotel. From July 25 to August 5, Peer recorded fiddle tunes, sacred songs, string bands, and harmonica solos from musicians across the Appalachian region.

A newspaper story midway through changed everything: the Bristol News Bulletin reported that local recording artist Ernest Stoneman had earned $3,600 in royalties the prior year — roughly three and a half times the average annual wage. Musicians flooded into town. Among them: a family from Maces Springs, Virginia called the Carter Family, and a former railroad brakeman from Mississippi named Jimmie Rodgers, who recorded solo after his band quit on him days before.

Country music's first two superstars, discovered in the same building, in the same two weeks. The Library of Congress selected these recordings for its National Recording Registry in its inaugural year.`,
    "The building is gone — the site is now a parking lot marked by a historical plaque. The story is told a few blocks away at the Birthplace of Country Music Museum.",
    'Listen: The Carter Family — "Bury Me Under the Weeping Willow" (recorded here, Aug 1, 1927)',
    false,
  ],
  [
    "birthplace-of-country-music-museum",
    "Birthplace of Country Music Museum",
    36.59611,
    -82.18278,
    "520 Birthplace of Country Music Way, Bristol, VA 24201",
    "museum",
    2014,
    null,
    `A Smithsonian-affiliated museum that opened in 2014, a couple of blocks from the original Sessions site. It interprets the full story of the 1927 sessions — the technology, the business, the people, and the long echo of those twelve days. Low-power radio station WBCM-LP broadcasts live from inside the museum, keeping the frequency lit a century later.`,
    "Open and active — the natural first stop for any Bristol music pilgrimage.",
    null,
    false,
  ],
  [
    "state-street-line",
    "State Street — The TN/VA Line",
    36.59487,
    -82.1842,
    "State Street, Bristol TN/VA",
    "street",
    1900,
    null,
    `The Tennessee–Virginia border runs down the middle of State Street: stand on the brass markers and you're in two states at once. In 1927 this was Bristol's commercial spine, and the geography mattered — Peer drew musicians from both states' mountain communities, plus North Carolina and Kentucky, because Bristol sat at the heart of the largest urban area in Appalachia.`,
    "Brass state-line markers run down the centerline. The whole downtown stretch is walkable and full of murals and music references.",
    null,
    false,
  ],
  [
    "bristol-sign",
    "The Bristol Sign",
    36.59495,
    -82.17968,
    "State Street at Volunteer Parkway, Bristol TN/VA",
    "marker",
    1910,
    null,
    `The illuminated steel arch over State Street — "BRISTOL VA-TENN: A GOOD PLACE TO LIVE" — has marked the state line since the 1910s and became the city's icon. It's the photo that proves you were here, straddling two states under one sign.`,
    "Still glowing over State Street. Best shot is at dusk.",
    null,
    false,
  ],
  [
    "paramount-bristol",
    "Paramount Center for the Arts",
    36.59478,
    -82.18263,
    "518 State Street, Bristol, TN 37620",
    "venue",
    1931,
    null,
    `Built as a movie palace by Paramount Pictures in 1931, restored and reopened in 1991. The reopening gala featured Bristol's own Tennessee Ernie Ford performing his final hometown show, months before his death — the local boy who left Anderson Street for WOPI radio and ended up a national TV star, closing the circle on the same street where it all began.`,
    "A restored 756-seat theater, still hosting live shows.",
    'Listen: Tennessee Ernie Ford — "Sixteen Tons"',
    false,
  ],
  [
    "tennessee-ernie-ford-birthplace",
    "Tennessee Ernie Ford Birthplace",
    36.5924,
    -82.19533,
    "1223 Anderson Street, Bristol, TN 37620",
    "home",
    1919,
    null,
    `Ernest Jennings Ford was born in this small white frame house on February 13, 1919, in a working-class neighborhood two blocks off State Street. He started as a teenage announcer at WOPI radio downtown, flew B-29 missions in WWII, and reinvented himself in California as "Tennessee Ernie Ford" — the booming bass-baritone behind "Sixteen Tons," one of the biggest singles of the 1950s, and host of prime-time network TV.

The Bristol Historical Association bought the house in 1991; Ford himself consulted on the restoration and was elated by the project, visiting one last time before his death that same year.`,
    "Restored with period furnishings and a Ford exhibit; tours by appointment through the Bristol Historical Association.",
    'Listen: Tennessee Ernie Ford — "Sixteen Tons"',
    false,
  ],
  [
    "carter-family-fold",
    "The Carter Family Fold",
    36.668384,
    -82.413425,
    "3449 A.P. Carter Highway, Hiltons, VA 24258",
    "venue",
    1974,
    null,
    `In Poor Valley at the foot of Clinch Mountain — the Carter Family's actual home ground — Janette Carter, daughter of A.P. and Sara, founded this music center in the 1970s to honor her parents and Maybelle. Every Saturday night it presents old-time and bluegrass music in an 800-seat shed where electric instruments are banned.

The rule was famously bent for one man: Johnny Cash, who married into the family, played the Fold many times — and gave his final concert here on July 5, 2003, months before his death. The adjacent A.P. Carter general store survives as a museum.

This is where the Bristol Sessions never ended.`,
    "Live music every Saturday at 7:30, museum opens an hour before. About 45 minutes from downtown Bristol — worth every mile.",
    'Listen: The Carter Family — "Wildwood Flower"',
    true,
  ],
  [
    "burger-bar",
    "Burger Bar",
    36.59531,
    -82.18522,
    "8 Piedmont Avenue, Bristol, VA 24201",
    "marker",
    1942,
    null,
    `A tiny diner just off State Street, and the setting of one of country music's darkest legends: on New Year's Eve 1952, Hank Williams' Cadillac stopped in Bristol en route to a show in Canton, Ohio. The story goes that Hank was offered food here and declined — possibly the last place he was seen alive. He died in the back seat somewhere up the road in West Virginia, age 29.

Whether every detail holds up, the Burger Bar leans into its place in the myth — and it anchors Bristol's role not just in country music's birth, but in its first great tragedy.`,
    "Still slinging burgers. Hank memorabilia on the walls.",
    'Listen: Hank Williams — "I\'ll Never Get Out of This World Alive"',
    false,
  ],
  [
    "rhythm-and-roots",
    "Bristol Rhythm & Roots Reunion",
    36.595,
    -82.1865,
    "Historic Downtown State Street, Bristol TN/VA",
    "festival",
    2001,
    null,
    `Every September, downtown Bristol closes State Street for a three-day festival built as a living tribute to the 1927 Sessions — dozens of stages on the same blocks where Ralph Peer set up his machine. Past lineups span bluegrass royalty to indie acts, all orbiting the same origin story. Proof the pin map isn't a graveyard: the music never left.`,
    "Held annually in September across downtown. The whole map comes alive for one weekend.",
    null,
    false,
  ],
  [
    "cameo-theatre",
    "Cameo Theatre",
    36.5952472,
    -82.1854053,
    "703 State Street, Bristol, VA 24201",
    "venue",
    1925,
    null,
    `The Cameo Theatre opened on March 30, 1925 with a vaudeville performance, two years before the Bristol Sessions changed the sound of State Street. Across the next century the room lived several lives: movie theatre, music hall, church, and radio station.

Brent and Stanley Buchanan restored the building, and Theatre Bristol brought live performance back to the stage for its centennial in 2025. Few Bristol rooms carry the city's entertainment history so cleanly from the pre-Sessions era into the present.`,
    "Restored and active as one of Theatre Bristol's three State Street stages, presenting live theatre and community productions.",
    null,
    false,
  ],
  [
    "hard-rock-live-bristol",
    "Hard Rock Live Bristol",
    36.5982229,
    -82.2192035,
    "500 Gate City Hwy, Bristol, VA 24201",
    "venue",
    2024,
    null,
    `When the permanent Hard Rock Hotel & Casino Bristol opened on November 14, 2024, its first night included a Blake Shelton concert in a new 23,000-square-foot performance room. Hard Rock Live brought a 2,000-plus-capacity touring stage to the western edge of the city.

For a place whose musical identity begins with portable recording equipment in 1927, this is the newest end of the timeline: a modern regional room routing national acts through Bristol nearly a century later.`,
    "An active 2,000-plus-capacity venue inside Hard Rock Hotel & Casino Bristol. Most events are 21+; check the individual listing before you go.",
    null,
    true,
  ],
];

type VenueMetadata = {
  venue_status: VenueStatus;
  official_url: string;
  tickets_url: string;
  setlistfm_url: string;
  setlistfm_venue_id: string;
  ticketmaster_venue_id: string | null;
};

const venueMetadata: Record<string, VenueMetadata> = {
  "cameo-theatre": {
    venue_status: "active",
    official_url: "https://theatrebristol.org/our-stages/",
    tickets_url: "https://theatrebristol.org/tickets/",
    setlistfm_url:
      "https://www.setlist.fm/venue/the-cameo-theater-bristol-va-usa-5bd0fb9c.html",
    setlistfm_venue_id: "5bd0fb9c",
    ticketmaster_venue_id: null,
  },
  "hard-rock-live-bristol": {
    venue_status: "active",
    official_url:
      "https://casino.hardrock.com/bristol/entertainment/hard-rock-live",
    tickets_url:
      "https://www.ticketmaster.com/hard-rock-live-bristol-tickets-bristol/venue/222877",
    setlistfm_url:
      "https://www.setlist.fm/venue/hard-rock-live-bristol-va-usa-53de8711.html",
    setlistfm_venue_id: "53de8711",
    ticketmaster_venue_id: "222877",
  },
  "paramount-bristol": {
    venue_status: "active",
    official_url: "https://paramountbristol.org/",
    tickets_url: "https://paramountbristol.org/music-live-events/",
    setlistfm_url:
      "https://www.setlist.fm/venue/paramount-center-for-the-arts-bristol-tn-usa-73d4eee5.html",
    setlistfm_venue_id: "73d4eee5",
    ticketmaster_venue_id: null,
  },
  "carter-family-fold": {
    venue_status: "active",
    official_url: "https://carterfamilyfold.org/",
    tickets_url: "https://carterfamilyfold.org/events/",
    setlistfm_url:
      "https://www.setlist.fm/venue/carter-family-fold-hiltons-va-usa-63d6daeb.html",
    setlistfm_venue_id: "63d6daeb",
    ticketmaster_venue_id: null,
  },
  "rhythm-and-roots": {
    venue_status: "seasonal",
    official_url:
      "https://birthplaceofcountrymusic.org/festival-bristol-rhythm/",
    tickets_url: "https://birthplaceofcountrymusic.org/tickets/",
    setlistfm_url:
      "https://www.setlist.fm/venue/bristol-rhythm-and-roots-reunion-bristol-tn-usa-5bd723d8.html",
    setlistfm_venue_id: "5bd723d8",
    ticketmaster_venue_id: null,
  },
};

const locations: Location[] = pins.map((p, i) => {
  const venue = venueMetadata[p[0]];
  return {
    id: p[0],
    city_id: CITY_ID,
    slug: p[0],
    name: p[1],
    lat: p[2],
    lng: p[3],
    coords_verified: true,
    address: p[4],
    pin_type: p[5],
    era_start: p[6],
    era_end: p[7],
    story_md: p[8],
    what_is_there_now: p[9],
    spotify_track_id: null,
    spotify_track_label: p[10],
    image_url: null,
    image_attribution: null,
    venue_status: venue?.venue_status ?? null,
    official_url: venue?.official_url ?? null,
    tickets_url: venue?.tickets_url ?? null,
    setlistfm_url: venue?.setlistfm_url ?? null,
    setlistfm_venue_id: venue?.setlistfm_venue_id ?? null,
    ticketmaster_venue_id: venue?.ticketmaster_venue_id ?? null,
    is_orbit: p[11],
    sort_order: i + 1,
  };
});

const trailStops: [slug: string, order: number, note: string][] = [
  [
    "birthplace-of-country-music-museum",
    1,
    "Start here for the full context — then everything outside will mean more.",
  ],
  [
    "bristol-sessions-site",
    2,
    "The hat warehouse is gone, but stand in the parking lot and picture July 1927: musicians lined up on the sidewalk after the Stoneman story broke.",
  ],
  [
    "state-street-line",
    3,
    "Walk the line — literally. One foot in Tennessee, one in Virginia.",
  ],
  [
    "paramount-bristol",
    4,
    "Four years after the Sessions, Bristol built itself a palace. Sixty years later, Ernie Ford said goodbye on its stage.",
  ],
  [
    "bristol-sign",
    5,
    'The photo stop. "A Good Place to Live" — and to record.',
  ],
  [
    "burger-bar",
    6,
    "End on the legend: where Hank Williams' last ride paused on New Year's Eve 1952.",
  ],
  [
    "tennessee-ernie-ford-birthplace",
    7,
    "Short detour off State Street: the small white house where Bristol's biggest hometown star was born in 1919.",
  ],
  [
    "carter-family-fold",
    8,
    "The epilogue, 45 minutes out: Saturday night in Poor Valley, where the Carter Family's music is still played live. Time it right and end your trail with a show.",
  ],
];

const trail: Trail = {
  id: "local-bristol-1927",
  slug: "bristol-1927",
  name: "Bristol 1927: The Big Bang",
  description_md:
    "Walk the twelve days that invented country music — from the museum that tells the story, to the parking lot where it happened, ending at the diner where the genre's first superstar era came to a close. Optional drive out to Poor Valley, where it never stopped.",
  trail_type: "walking",
  sort_order: 1,
  stops: trailStops.map(([slug, stop_order, stop_note_md]) => ({
    id: `local-stop-${stop_order}`,
    trail_id: "local-bristol-1927",
    location_id: slug,
    stop_order,
    stop_note_md,
  })),
};

export function localCityData(slug: string): CityData | null {
  if (slug !== city.slug) return null;
  // connections + districts live only in the SQL seeds; those layers
  // simply don't render offline
  return { city, locations, trails: [trail], connections: [], districts: [] };
}
