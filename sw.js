const CACHE_NAME = "wayra-cache-v4";
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
      return fetch(e.request).then((resNet) => {
        return resNet;
      });
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
