const staticCacheName = 'simple-auth-static-v4';
const imageCacheName = 'simple-auth-image-v2';
const assets = [
  '/',
  '/index.html',
  '/auth.html',
  '/account/edit.html',
  '/css/main.css',
  '/js/main.js',
  '/js/auth.js',
  '/js/edit.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&family=Poppins:wght@200;300;400;500;600;700;800&display=swap',
];
const imageAssets = [
  '/images/icons/favicon.ico',
  '/images/hero.svg',
  '/images/log.svg',
  '/images/register.svg',
  '/images/user.svg',
  '/images/envelope.svg',
  '/images/lock.svg',
  '/images/exclamation.svg',
  '/images/home.svg',
  '/images/edit.svg',
  '/images/logout.svg',
  '/images/delete.svg',
  '/images/camera.svg',
  '/images/icons/icon-192.png',
  '/images/icons/icon-512.png',
];

// Install Service worker
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
        cache.addAll(assets);
    }).then(
      caches.open(imageCacheName).then((cache) => {
        cache.addAll(imageAssets);
      })
    )
  );
});

// Activate Event
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) =>
          key !== staticCacheName &&
          key !== imageCacheName
        )
        .map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
