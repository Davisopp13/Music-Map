// Live mode is read-only. --skip-remote builds an isolated, disposable local
// PostgreSQL database from repository SQL and never contacts Supabase.
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
// Usage:
//   node --env-file-if-exists=.env.local scripts/verify-data.mjs
//   node --env-file-if-exists=.env.local scripts/verify-data.mjs --skip-remote

const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const local = process.argv.includes("--skip-remote");
const localData = local ? scratchDataset() : null;

if (!local && (!base || !key)) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
  process.exit(2);
}

const headers = { apikey: key, Authorization: `Bearer ${key}` };
let failures = 0;
const check = (ok, label, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
};

async function rows(table, select = "*") {
  if (localData) return localData[table];
  const url = new URL(`/rest/v1/${table}`, base);
  url.searchParams.set("select", select);
  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) {
    throw new Error(`${table}: ${response.status} ${await response.text()}`);
  }
  return response.json();
}

const [cities, locations, trails, stops, connections, districts] =
  await Promise.all([
    rows("cities", "id,slug,name"),
    rows(
      "locations",
      "id,city_id,slug,name,lat,lng,pin_type,coords_verified,spotify_track_id,spotify_track_label,image_url,image_attribution,venue_status,official_url,tickets_url,setlistfm_url,setlistfm_venue_id"
    ),
    rows("trails", "id,slug,name"),
    rows("trail_stops", "trail_id,location_id,stop_order"),
    rows("connections", "id,from_location_id,to_location_id"),
    rows("districts", "id,city_id,name,geojson"),
  ]);

check(cities.length === 4, "4 cities", `${cities.length}`);
check(locations.length === 55, "55 pins", `${locations.length}`);
check(trails.length === 5, "5 trails", `${trails.length}`);
check(stops.length === 41, "41 trail stops", `${stops.length}`);
check(connections.length === 33, "33 connections", `${connections.length}`);
check(districts.length === 8, "8 districts", `${districts.length}`);

const cityById = new Map(cities.map((city) => [city.id, city.slug]));
const cityCounts = Object.fromEntries(cities.map((city) => [city.slug, 0]));
for (const location of locations) cityCounts[cityById.get(location.city_id)]++;
const expectedCityCounts = { bristol: 12, macon: 11, atlanta: 20, nashville: 12 };
check(
  Object.entries(expectedCityCounts).every(
    ([slug, count]) => cityCounts[slug] === count
  ),
  "city pin counts are 12 / 11 / 20 / 12",
  JSON.stringify(cityCounts)
);

const unverified = locations.filter((location) => !location.coords_verified);
check(unverified.length === 0, "all coordinate flags set (see source ledger for audit limits)", slugs(unverified));

const venuePins = locations.filter((location) => location.pin_type === "venue");
check(venuePins.length === 22, "22 venue pins", `${venuePins.length}`);
const validStatuses = new Set(["active", "seasonal", "closed", "demolished"]);
const invalidVenueStatus = venuePins.filter(
  (location) => !validStatuses.has(location.venue_status)
);
check(
  invalidVenueStatus.length === 0,
  "every venue has a valid status",
  slugs(invalidVenueStatus)
);

const missingOfficial = venuePins.filter(
  (location) =>
    ["active", "seasonal"].includes(location.venue_status) &&
    !location.official_url
);
check(
  missingOfficial.length === 0,
  "active and seasonal venues have official URLs",
  slugs(missingOfficial)
);
const closedWithTickets = venuePins.filter(
  (location) =>
    ["closed", "demolished"].includes(location.venue_status) &&
    location.tickets_url
);
check(
  closedWithTickets.length === 0,
  "closed and demolished venues have no ticket link",
  slugs(closedWithTickets)
);

for (const field of ["official_url", "tickets_url", "setlistfm_url"]) {
  const invalid = locations.filter(
    (location) => location[field] && !isHttps(location[field])
  );
  check(invalid.length === 0, `${field} values use HTTPS`, slugs(invalid));
}

const setlistMismatch = locations.filter(
  (location) =>
    Boolean(location.setlistfm_url) !== Boolean(location.setlistfm_venue_id)
);
check(
  setlistMismatch.length === 0,
  "setlist URLs and venue IDs are paired",
  slugs(setlistMismatch)
);

const imageMismatch = locations.filter(
  (location) => Boolean(location.image_url) !== Boolean(location.image_attribution)
);
check(
  imageMismatch.length === 0,
  "every populated image has attribution",
  slugs(imageMismatch)
);
const imageUrls = locations.filter((location) => location.image_url);
check(
  imageUrls.every((location) => isHttps(location.image_url)),
  "all image URLs use HTTPS"
);

const intentionalImageGaps = [
  "152-nassau-street",
  "anns-tic-toc",
  "mcduffie-bell-house",
  "quonset-hut",
  "star-community-bar",
  "tennessee-ernie-ford-birthplace",
  "the-masquerade",
  "trap-music-museum",
  "wax-n-facts",
  "wcyb-farm-and-fun-time",
  "wrfg-radio",
  "club-baron",
  "criminal-records",
  "grants-lounge",
  "hard-rock-live-bristol",
  "stankonia-studios",
  "the-dungeon",
].sort();
const actualImageGaps = locations
  .filter((location) => !location.image_url)
  .map((location) => location.slug)
  .sort();
check(
  JSON.stringify(actualImageGaps) === JSON.stringify(intentionalImageGaps),
  "only documented image gaps remain",
  actualImageGaps.join(", ")
);

const trackLabels = locations.filter(
  (location) => location.spotify_track_label
);
const trackIds = locations.filter((location) => location.spotify_track_id);
check(
  trackLabels.length === 33,
  "33 selected track labels",
  `${trackLabels.length}`
);
check(trackIds.length === 33, "33 selected Spotify IDs", `${trackIds.length}`);
const trackMismatch = locations.filter(
  (location) =>
    Boolean(location.spotify_track_label) !== Boolean(location.spotify_track_id) ||
    (location.spotify_track_id && !/^[A-Za-z0-9]{22}$/.test(location.spotify_track_id))
);
check(
  trackMismatch.length === 0,
  "track labels and valid Spotify IDs are paired",
  slugs(trackMismatch)
);

const knownLocations = new Set(locations.map((location) => location.id));
const brokenConnections = connections.filter(
  (connection) =>
    !knownLocations.has(connection.from_location_id) ||
    !knownLocations.has(connection.to_location_id)
);
check(
  brokenConnections.length === 0,
  "all connection endpoints resolve",
  `${brokenConnections.length} broken`
);

const trailProblems = [];
for (const trail of trails) {
  const trailStops = stops
    .filter((stop) => stop.trail_id === trail.id)
    .sort((a, b) => a.stop_order - b.stop_order);
  const expected = Array.from(
    { length: trailStops.length },
    (_, index) => index + 1
  );
  if (
    !trailStops.length ||
    JSON.stringify(trailStops.map((stop) => stop.stop_order)) !==
      JSON.stringify(expected) ||
    trailStops.some((stop) => !knownLocations.has(stop.location_id))
  ) {
    trailProblems.push(trail.slug);
  }
}
check(
  trailProblems.length === 0,
  "all trails have contiguous, resolvable stop order",
  trailProblems.join(", ")
);

const locationBySlug = new Map(
  locations.map((location) => [location.slug, location])
);
const expectedTrails = {
  "bristol-1927": 8,
  "macon-soul-to-southern-rock": 9,
  "atlanta-century": 9,
  "nashville-mother-church": 9,
  "atlanta-auburn-to-little-five": 6,
};
check(
  trails.every((trail) => stops.filter((stop) => stop.trail_id === trail.id).length === expectedTrails[trail.slug]),
  "each named trail has its expected stop count"
);
const walk = trails.find((trail) => trail.slug === "atlanta-auburn-to-little-five");
const locationById = new Map(locations.map((location) => [location.id, location]));
const walkSlugs = stops.filter((stop) => stop.trail_id === walk?.id)
  .sort((a, b) => a.stop_order - b.stop_order)
  .map((stop) => locationById.get(stop.location_id)?.slug);
check(JSON.stringify(walkSlugs) === JSON.stringify([
  "ebenezer-heritage-sanctuary", "wrfg-radio", "variety-playhouse",
  "criminal-records", "wax-n-facts", "star-community-bar",
]), "Atlanta walking trail follows the researched pedestrian order");
const newCrossCityPairs = [
  ["country-music-hall-of-fame", "bristol-sessions-site"],
  ["country-music-hall-of-fame", "carter-family-fold"],
  ["club-baron", "little-richard-house"],
];
check(newCrossCityPairs.every(([from, to]) => {
  const a = locationBySlug.get(from);
  const b = locationBySlug.get(to);
  return a && b && a.city_id !== b.city_id && connections.some((connection) =>
    connection.from_location_id === a.id && connection.to_location_id === b.id);
}), "all three new cross-city threads resolve across chapters");

const nashvilleDistrictChecks = {
  "Music Row": ["rca-studio-b", "quonset-hut"],
  "Jefferson Street": ["club-baron"],
  "The Gulch": ["station-inn"],
  "Lower Broadway": ["ryman-auditorium", "tootsies-orchid-lounge"],
};
const districtFramingProblems = [];
for (const [districtName, locationSlugs] of Object.entries(
  nashvilleDistrictChecks
)) {
  const district = districts.find((item) => item.name === districtName);
  const ring = district?.geojson?.coordinates?.[0];
  for (const slug of locationSlugs) {
    const location = locationBySlug.get(slug);
    if (!location || !ring || !pointInPolygon([location.lng, location.lat], ring)) {
      districtFramingProblems.push(`${slug} / ${districtName}`);
    }
  }
}
check(
  districtFramingProblems.length === 0,
  "corrected Nashville pins remain inside their district washes",
  districtFramingProblems.join(", ")
);

if (!local) {
  const brokenImages = await imageFailures(
    imageUrls.map((location) => ({
      slug: location.slug,
      url: location.image_url,
    }))
  );
  check(
    brokenImages.length === 0,
    "selected image URLs load",
    brokenImages.join(", ")
  );

  const brokenTracks = await remoteFailures(
    trackIds.map((location) => ({
      slug: location.slug,
      url: `https://open.spotify.com/oembed?url=https://open.spotify.com/track/${location.spotify_track_id}`,
      kind: "spotify",
    }))
  );
  check(
    brokenTracks.length === 0,
    "selected Spotify IDs resolve",
    brokenTracks.join(", ")
  );
}

console.log(
  failures === 0
    ? "\nALL DATA CHECKS PASSED"
    : `\n${failures} DATA CHECKS FAILED`
);
process.exit(failures === 0 ? 0 : 1);

function isHttps(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function slugs(items) {
  return items.map((item) => item.slug).join(", ");
}

async function remoteFailures(items) {
  const broken = [];
  for (let index = 0; index < items.length; index += 6) {
    const batch = items.slice(index, index + 6);
    const results = await Promise.all(
      batch.map(async (item) => {
        try {
          const response = await fetch(item.url, {
            redirect: "follow",
            signal: AbortSignal.timeout(30000),
            headers: {
              "user-agent": "MusicMapDataVerifier/1.0",
            },
          });
          await response.body?.cancel();
          return response.ok ? null : `${item.slug} (${response.status})`;
        } catch (error) {
          return `${item.slug} (${error.name ?? "network error"})`;
        }
      })
    );
    broken.push(...results.filter(Boolean));
  }
  return broken;
}

async function imageFailures(items) {
  const commons = items.filter((item) => commonsFilename(item.url));
  const direct = items.filter((item) => !commonsFilename(item.url));
  const broken = await remoteFailures(direct);

  for (let index = 0; index < commons.length; index += 12) {
    const batch = commons.slice(index, index + 12);
    const api = new URL("https://commons.wikimedia.org/w/api.php");
    api.search = new URLSearchParams({
      action: "query",
      format: "json",
      prop: "imageinfo",
      iiprop: "url",
      titles: batch.map((item) => `File:${commonsFilename(item.url)}`).join("|"),
    });
    try {
      const response = await fetch(api, {
        signal: AbortSignal.timeout(30000),
        headers: { "user-agent": "MusicMapDataVerifier/1.0" },
      });
      if (!response.ok) {
        broken.push(...batch.map((item) => `${item.slug} (${response.status})`));
        continue;
      }
      const result = await response.json();
      const pages = Object.values(result.query?.pages ?? {});
      const validFiles = new Set(
        pages
          .filter((page) => page.imageinfo?.[0]?.url)
          .map((page) => normalizeFilename(page.title.replace(/^File:/, "")))
      );
      for (const item of batch) {
        if (!validFiles.has(normalizeFilename(commonsFilename(item.url)))) {
          broken.push(`${item.slug} (missing Commons file)`);
        }
      }
    } catch (error) {
      broken.push(...batch.map((item) => `${item.slug} (${error.name})`));
    }
  }
  return broken;
}

function commonsFilename(value) {
  const url = new URL(value);
  if (url.hostname === "upload.wikimedia.org") {
    const parts = url.pathname.split("/");
    return decodeURIComponent(
      url.pathname.includes("/thumb/") ? parts.at(-2) : parts.at(-1)
    );
  }
  if (url.hostname === "commons.wikimedia.org") {
    const marker = "/wiki/Special:FilePath/";
    if (url.pathname.startsWith(marker)) {
      return decodeURIComponent(url.pathname.slice(marker.length));
    }
  }
  return null;
}

function normalizeFilename(value) {
  return value.replaceAll("_", " ").trim().toLocaleLowerCase();
}

function pointInPolygon([x, y], ring) {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index++) {
    const [xi, yi] = ring[index];
    const [xj, yj] = ring[previous];
    if (
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    ) {
      inside = !inside;
    }
  }
  return inside;
}


function scratchDataset() {
  const root = dirname(dirname(fileURLToPath(import.meta.url)));
  const candidates = [process.env.PG_BIN, "/opt/homebrew/opt/postgresql@17/bin", "/usr/local/opt/postgresql@17/bin"].filter(Boolean);
  try {
    candidates.push(execFileSync("pg_config", ["--bindir"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim());
  } catch { /* Optional discovery; provide PG_BIN if PostgreSQL is elsewhere. */ }
  const bin = candidates.find((candidate) => ["initdb", "pg_ctl", "psql"].every((name) => existsSync(join(candidate, name))));
  if (!bin) throw new Error("Local verification needs PostgreSQL tools. Set PG_BIN to their directory; Supabase is never used as a fallback.");
  const scratch = mkdtempSync("/tmp/music-map-data-");
  const data = join(scratch, "data");
  // A private socket directory and disabled TCP isolate this from installed servers.
  const env = { ...process.env, PGHOST: scratch, PGPORT: "55439", PGDATABASE: "postgres", PGUSER: "musicmap_verify", PGCONNECT_TIMEOUT: "10" };
  for (const key of ["PGSERVICE", "PGSERVICEFILE", "PGOPTIONS", "PGPASSWORD"]) delete env[key];
  const run = (tool, args) => execFileSync(join(bin, tool), args, {
    env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 20 * 1024 * 1024,
  });
  const psql = (args) => run("psql", ["-X", "-v", "ON_ERROR_STOP=1", ...args]);
  let started = false;
  try {
    run("initdb", ["-D", data, "-U", "musicmap_verify", "-A", "trust", "--no-locale"]);
    run("pg_ctl", ["-D", data, "-l", join(scratch, "server.log"), "-o", `-k ${scratch} -p 55439 -h ''`, "-w", "start"]);
    started = true;
    psql(["-c", "create role anon; create role authenticated;"]);
    const db = join(root, "db");
    const updates = readdirSync(db).filter((name) => /^update_\d{2}_.*\.sql$/.test(name)).sort();
    const files = ["schema.sql", "seed_bristol.sql", "seed_macon.sql", "seed_atlanta.sql", "seed_nashville.sql", ...updates];
    for (const file of files) psql(["-f", join(db, file)]);
    const tables = ["cities", "locations", "trails", "trail_stops", "connections", "districts"];
    const snapshot = () => Object.fromEntries(tables.map((table) => [table, JSON.parse(psql(["-At", "-c", `select coalesce(json_agg(r), '[]'::json) from (select * from ${table} order by id) r`]).trim())]));
    const first = snapshot();
    for (const file of ["update_13_atlanta_depth.sql", "update_14_chapter_depth.sql"]) psql(["-f", join(db, file)]);
    const second = snapshot();
    if (JSON.stringify(first) !== JSON.stringify(second)) throw new Error("Repeating updates 13–14 changed the dataset, including row IDs.");
    console.log("PASS  isolated clean SQL install and repeat-safety (all six tables, including IDs)");
    return second;
  } finally {
    if (started) run("pg_ctl", ["-D", data, "-m", "fast", "-w", "stop"]);
    rmSync(scratch, { recursive: true, force: true });
  }
}
