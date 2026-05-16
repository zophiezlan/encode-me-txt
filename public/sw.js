/**
 * Service Worker for Creative Text Encoder PWA
 *
 * Cache strategy:
 * - HTML / navigation: NETWORK-FIRST (so new deploys reach the user; fall back
 *   to cache offline).
 * - Hashed /assets/* bundles: cache-first (immutable per build hash).
 * - Everything else: pass through to the network.
 *
 * Cache name carries a build hash so each deploy gets its own bucket and old
 * buckets are evicted on activate. In dev, the placeholder string remains
 * literal — a single stable cache for the whole dev session, which is fine.
 * The vite build plugin in vite.config.js replaces __BUILD_HASH__ in the
 * emitted dist/sw.js with a per-build value.
 */

const CACHE_NAME = "creative-text-encoder-__BUILD_HASH__";
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/favicon.svg",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(PRECACHE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((n) => n !== CACHE_NAME)
          .map((n) => caches.delete(n)),
      ),
    ),
  );
  self.clients.claim();
});

const isNavigation = (request) =>
  request.mode === "navigate" || request.destination === "document";

const isHashedAsset = (url) =>
  url.pathname.startsWith("/assets/") && /-[A-Za-z0-9_]{6,}\./.test(url.pathname);

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // never intercept cross-origin

  if (isNavigation(request)) {
    // Network-first for HTML so users get new deploys immediately.
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((c) => c.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match("/"))),
    );
    return;
  }

  if (isHashedAsset(url)) {
    // Hashed bundle filename changes on every build, so cache-first is safe.
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then((c) => c.put(request, copy));
            }
            return response;
          }),
      ),
    );
    return;
  }

  // Default: try cache, fall back to network without populating the cache.
  event.respondWith(caches.match(request).then((r) => r || fetch(request)));
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
