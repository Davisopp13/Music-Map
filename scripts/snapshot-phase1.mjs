// Export every location row touched by update 12 as a local rollback snapshot.
// Usage: node --env-file-if-exists=.env.local scripts/snapshot-phase1.mjs <file>
import { chmod, writeFile } from "node:fs/promises";

const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const destination = process.argv[2];

if (!base || !key || !destination) {
  console.error("Usage requires Supabase env vars and an output file path.");
  process.exit(2);
}

const affectedSlugs = [
  "152-nassau-street",
  "ameris-bank-amphitheatre",
  "bluebird-cafe",
  "buckhead-theatre",
  "cameo-theatre",
  "carter-family-fold",
  "club-baron",
  "douglass-theatre",
  "eddies-attic",
  "fox-theatre",
  "grand-ole-opry-house",
  "grants-lounge",
  "hard-rock-live-bristol",
  "hatch-show-print",
  "macon-city-auditorium",
  "paramount-bristol",
  "quonset-hut",
  "rca-studio-b",
  "rhythm-and-roots",
  "royal-peacock",
  "ryman-auditorium",
  "station-inn",
  "the-big-house",
  "the-masquerade",
  "the-tabernacle",
  "tootsies-orchid-lounge",
];

const url = new URL("/rest/v1/locations", base);
url.searchParams.set("select", "*");
url.searchParams.set("slug", `in.(${affectedSlugs.join(",")})`);
url.searchParams.set("order", "slug");
const response = await fetch(url, {
  headers: { apikey: key, Authorization: `Bearer ${key}` },
  signal: AbortSignal.timeout(30000),
});
if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
const rows = await response.json();
if (rows.length !== affectedSlugs.length) {
  throw new Error(`Expected ${affectedSlugs.length} rows, received ${rows.length}`);
}

await writeFile(
  destination,
  `${JSON.stringify({ exported_at: new Date().toISOString(), rows }, null, 2)}\n`,
  "utf8"
);
await chmod(destination, 0o600);
console.log(`Saved ${rows.length} rows to ${destination}`);
