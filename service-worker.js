/* Trikicuki — service worker (offline, network-first)
   Estrategia: intenta SIEMPRE la red primero y actualiza la caché; si no hay
   conexión, sirve desde la caché. Así el juego se actualiza solo al desplegar
   y sigue funcionando sin conexión. */
var CACHE = 'trikicuki-v6';
var ASSETS = [
  './',
  './index.html',
  './core.js',
  './firebase-config.js',
  './manifest.webmanifest',
  './icon.svg',
  './icon-maskable.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { try { c.put(e.request, copy); } catch (x) {} });
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (hit) { return hit || caches.match('./index.html'); });
    })
  );
});
