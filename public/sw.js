// Minimal service worker — installability + repeat-visit speed, nothing
// fancier. Offline maps are explicitly not a goal (vector tiles and Spotify
// need a connection), so:
//
//   - map TILES: stale-while-revalidate with an entry cap — the biggest
//     repeat-visit win
//   - glyphs / hashed Next assets / icons: cache-first (immutable; bump
//     VERSION after regenerating glyphs or icons)
//   - Supabase is NEVER intercepted — live data is the contract; the app
//     fought hard for force-dynamic. Spotify is never touched either.
//   - navigations: network only, with a branded offline fallback page
//     (pages are live data; we don't want a stale atlas)
const VERSION = "v1";
const STATIC_CACHE = `static-${VERSION}`;
const TILE_CACHE = `tiles-${VERSION}`;
const MAX_TILES = 400; // ~40KB/tile → caps the cache around 16MB

const PRECACHE = [
  "/offline.html",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== STATIC_CACHE && k !== TILE_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // hands off the live data and the player
  if (url.hostname.endsWith(".supabase.co")) return;
  if (url.hostname.endsWith("spotify.com") || url.hostname.endsWith("scdn.co"))
    return;

  if (url.hostname === "tiles.openfreemap.org") {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  if (url.origin !== self.location.origin) return;

  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/glyphs/") ||
    url.pathname.startsWith("/icons/")
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/offline.html"))
    );
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(TILE_CACHE);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache
          .put(request, response.clone())
          .then(() => trimCache(cache, MAX_TILES));
      }
      return response;
    })
    .catch(() => undefined);
  return cached ?? refresh.then((r) => r ?? Response.error());
}

async function trimCache(cache, maxEntries) {
  const keys = await cache.keys();
  if (keys.length <= maxEntries) return;
  // keys are in insertion order — drop the oldest
  await Promise.all(
    keys.slice(0, keys.length - maxEntries).map((k) => cache.delete(k))
  );
}
