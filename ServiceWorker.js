const cacheName = "EXA Labs-Exaverse-0.6.5";
const contentToCache = [
    "Build/Exaverse Full Version WebGL Build-V(0.6.5) 20-March-2026.loader.js",
    "Build/Exaverse Full Version WebGL Build-V(0.6.5) 20-March-2026.framework.js",
    "Build/Exaverse Full Version WebGL Build-V(0.6.5) 20-March-2026.data",
    "Build/Exaverse Full Version WebGL Build-V(0.6.5) 20-March-2026.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
