// Service Worker for Divya's Birthday Experience (PWA)
const CACHE_NAME = 'divya-birthday-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/audio/birthday-ambient.wav',
  '/audio/chime.wav',
  '/audio/candle-blow.wav',
  '/audio/confetti.wav',
  '/images/screen-01.jpg',
  '/images/screen-02.jpg',
  '/images/screen-03.jpg',
  '/images/screen-04.jpg',
  '/images/screen-05.jpg',
  '/images/screen-06.jpg',
  '/images/screen-07.jpg',
  '/images/screen-08.jpg',
  '/images/screen-09.jpg',
  '/images/screen-10.jpg',
  '/images/polaroid-1.jpg',
  '/images/polaroid-2.jpg',
  '/images/polaroid-3.jpg',
  '/images/cake-lit.jpg',
  '/images/cake-wish.jpg',
  '/images/vinyl.jpg',
  '/images/wish-jar.jpg',
  '/images/sunset-duo.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Some assets could not be pre-cached:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        return caches.match('/');
      });
    })
  );
});

