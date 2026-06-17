const CACHE_NAME = "wayra-cache-v1";
const listFilesToCache = ["style/global.css", "manifest.json", "index.html"];

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
