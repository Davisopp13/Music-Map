// Dev utility: verify the PWA contract against a running prod server.
//   - sw.js registers and activates
//   - tiles land in tiles-v1, glyphs/static assets in static-v1
//   - NO cache ever contains a Supabase response (live data contract)
//   - offline navigation serves the branded fallback page
// Usage: node scripts/verify-pwa.mjs [origin]
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { chromium } from "playwright-core";

const origin = process.argv[2] ?? "http://localhost:3000";

const cacheRoot = path.join(os.homedir(), "Library/Caches/ms-playwright");
const shellDir = fs
  .readdirSync(cacheRoot)
  .filter((d) => d.startsWith("chromium_headless_shell-"))
  .sort()
  .pop();
const executablePath = path.join(
  cacheRoot,
  shellDir,
  "chrome-headless-shell-mac-arm64",
  "chrome-headless-shell"
);

const browser = await chromium.launch({ executablePath });
const context = await browser.newContext();
const page = await context.newPage();

let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failures++;
};

await page.goto(origin, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(8000); // let the map pull tiles through the SW

const swState = await page.evaluate(async () => {
  const reg = await navigator.serviceWorker.getRegistration();
  return reg?.active?.state ?? "none";
});
check(swState === "activated", `service worker activated (${swState})`);

// visit a city page too so glyphs + more tiles flow through the SW
await page.goto(`${origin}/bristol`, { waitUntil: "networkidle" });
await page.waitForTimeout(8000);

const caches = await page.evaluate(async () => {
  const names = await window.caches.keys();
  const out = {};
  for (const name of names) {
    const cache = await window.caches.open(name);
    out[name] = (await cache.keys()).map((r) => r.url);
  }
  return out;
});

const all = Object.values(caches).flat();
const tileUrls = caches["tiles-v1"] ?? [];
check(
  tileUrls.some((u) => u.includes("openfreemap")),
  `tiles cached (${tileUrls.length} entries in tiles-v1)`
);
const staticUrls = caches["static-v1"] ?? [];
check(
  staticUrls.some((u) => u.includes("/glyphs/")),
  "glyphs cached in static-v1"
);
check(
  staticUrls.some((u) => u.includes("/_next/static/")),
  "hashed Next assets cached"
);
check(
  staticUrls.some((u) => u.endsWith("/offline.html")),
  "offline page precached"
);
check(
  !all.some((u) => u.includes("supabase")),
  "no Supabase response in any cache"
);
check(
  !all.some((u) => u.includes("spotify")),
  "no Spotify response in any cache"
);

// offline: a navigation should land on the branded fallback
await context.setOffline(true);
await page.goto(`${origin}/macon`, { waitUntil: "load" }).catch(() => {});
const offlineText = await page.textContent("body").catch(() => "");
check(
  (offlineText ?? "").includes("The map needs a signal"),
  "offline navigation serves the branded fallback"
);
await context.setOffline(false);

await browser.close();
console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} FAILED`);
process.exit(failures === 0 ? 0 : 1);
