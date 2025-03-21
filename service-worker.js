self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('pwa-assets').then((cache) => {
      return cache.addAll([
        '/',
        'index.html',
        'style.css',
        'script.js',
        'manifest.json',
        'icon.png' // キャッシュするアセット
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
