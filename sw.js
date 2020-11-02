//Memuat library workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

  workbox.precaching.precacheAndRoute([
      { url: '/index.html', revision: '1' },
      { url: '/nav.html', revision: '1' },
      { url: '/article.html', revision: '1' },
      { url: '/css/materialize.min.css', revision: '1' },
      { url: '/js/materialize.min.js', revision: '1' },
      { url: '/js/nav.js', revision: '1' },
      { url: '/js/reg.js', revision: '1' },
      { url: '/js/api.js', revision: '1' },
      { url: '/js/db.js', revision: '1' },
      { url: '/js/idb.js', revision: '1' },
      { url: '/manifest.json', revision: '1' },
      { url: '/icon.png', revision: '1' },
      { url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '1' },
  ],{
      ignoreUrlParametersMatching: [/.*/]
  });
  
//menyimpan semua berkas halaman yang ada didalam folder pages
  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate()
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
    })
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    }),
  );


  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    new workbox.strategies.CacheFirst({
      cacheName: "api-cache",
    })
  );


  self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });