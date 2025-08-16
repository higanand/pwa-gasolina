// sw.js — Service Worker para PWA Control Gasolina
const CACHE = 'cg-cache-v1.1';
const PRECACHE = ['index.html', 'sw.js'];

// Instala y precachea recursos básicos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

// Activa y limpia caches viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Estrategia: 
// - Para navegaciones (documentos): Network-first, fallback al cache (index.html) para modo offline.
// - Para otros GET: Stale-while-revalidate (usa cache rápido y actualiza en segundo plano).
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const accept = req.headers.get('accept') || '';
  const isHTML = accept.includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => {
        return caches.match(req).then((hit) => hit || caches.match('index.html'));
      })
    );
    return;
  }

  // Stale-while-revalidate para estáticos/JSON/etc.
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
