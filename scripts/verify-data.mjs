// Read-only verification of the live/public Supabase dataset.
// Usage:
//   node --env-file-if-exists=.env.local scripts/verify-data.mjs
//   node --env-file-if-exists=.env.local scripts/verify-data.mjs --skip-remote

const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!base || !key) {
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
      "id,city_id,slug,name,pin_type,coords_verified,spotify_track_id,spotify_track_label,image_url,image_attribution,venue_status,official_url,tickets_url,setlistfm_url,setlistfm_venue_id"
    ),
    rows("trails", "id,slug,name"),
    rows("trail_stops", "trail_id,location_id,stop_order"),
    rows("connections", "id,from_location_id,to_location_id"),
    rows("districts", "id,city_id,name"),
  ]);

check(cities.length === 4, "4 cities", `${cities.length}`);
check(locations.length === 42, "42 pins", `${locations.length}`);
check(trails.length === 4, "4 trails", `${trails.length}`);
check(stops.length === 35, "35 trail stops", `${stops.length}`);
check(connections.length === 25, "25 connections", `${connections.length}`);
check(districts.length === 8, "8 districts", `${districts.length}`);

const cityById = new Map(cities.map((city) => [city.id, city.slug]));
const cityCounts = Object.fromEntries(cities.map((city) => [city.slug, 0]));
for (const location of locations) cityCounts[cityById.get(location.city_id)]++;
const expectedCityCounts = { bristol: 11, macon: 9, atlanta: 13, nashville: 9 };
check(
  Object.entries(expectedCityCounts).every(
    ([slug, count]) => cityCounts[slug] === count
  ),
  "city pin counts are 11 / 9 / 13 / 9",
  JSON.stringify(cityCounts)
);

const unverified = locations.filter((location) => !location.coords_verified);
check(unverified.length === 0, "all coordinates verified", slugs(unverified));

const venuePins = locations.filter((location) => location.pin_type === "venue");
check(venuePins.length === 20, "20 venue pins", `${venuePins.length}`);
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
  "ameris-bank-amphitheatre",
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

if (!process.argv.includes("--skip-remote")) {
  const brokenImages = await remoteFailures(
    imageUrls.map((location) => ({
      slug: location.slug,
      url: location.image_url,
      kind: "image",
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
              ...(item.kind === "image" ? { range: "bytes=0-1023" } : {}),
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
