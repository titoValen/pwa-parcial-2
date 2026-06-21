const CACHE_NAME = "wayra-cache-v9";
const listFilesToCache = [
  "/",
  "/index.html",
  "/offline.html",
  "/style/global.css",
  "/style/index.css",
  "/style/offline.css",
  "/manifest.json",
  "/js/app.js",
  "/js/storage.js",
  "/js/api.js",
  "/components/card.js",
  "/components/modal.js",
  "/assets/icon/logo_texto.webp",
];

self.addEventListener("install", (e) => {
  const cache = caches.open(CACHE_NAME).then((cache) => {
    return cache.addAll(listFilesToCache);
  });
  e.waitUntil(cache);
});

self.addEventListener("fetch", (e) => {
  const respuesta = caches.match(e.request).then((resCache) => {
    if (resCache) {
      return resCache;
    } else {
      return fetch(e.request).catch(() => caches.match("/offline.html"));
    }
  });
  e.respondWith(respuesta);
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        ),
      ),
  );
});
