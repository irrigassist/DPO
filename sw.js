/* Daily Pump Operation: offline support.
   Change VERSION whenever index.html changes so phones pick up the update. */
const VERSION = 'dpo-v1';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon.svg'];
const EXTERNAL = [
  'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js',
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=Figtree:wght@400;500;600;700&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(CORE);
    // Third-party files: best effort, so installing never fails when offline.
    await Promise.all(EXTERNAL.map(async (url) => {
      try { await cache.put(url, await fetch(url, { mode: 'no-cors' })); } catch (e) {}
    }));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // App pages: serve the saved copy at once, refresh it in the background.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const cached = (await cache.match('index.html')) || (await cache.match('./'));
      const update = fetch(req).then((res) => { if (res.ok) cache.put('index.html', res.clone()); return res; }).catch(() => null);
      return cached || (await update) || new Response('Offline', { status: 503 });
    })());
    return;
  }

  // Own files and the Excel tool / fonts: saved copy first, update quietly.
  if (sameOrigin || /cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com/.test(url.hostname)) {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const cached = await cache.match(req);
      const update = fetch(req).then((res) => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => null);
      return cached || (await update) || new Response('', { status: 504 });
    })());
  }
});
