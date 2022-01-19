/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import { registerRoute } from 'workbox-routing';
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { precacheAndRoute } from 'workbox-precaching';

// precacheAndRoute(self.__WB_MANIFEST);

// Cache page navigations (html) with a Network First strategy
registerRoute(
  // Check to see if the request is a navigation to a new page
  ({ request }) => {
    console.log(request);
    return request.mode === 'navigate';
  },
  // Use a Network First caching strategy
  new NetworkFirst({
    // Put all cached files in a cache named 'pages'
    cacheName: 'pages',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
  ({ request }) => request.destination === 'style'
    || request.destination === 'script'
    || request.destination === 'worker',
  // Use a Stale While Revalidate caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'
    cacheName: 'assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.pathname.startsWith('/news'),
  new CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: 'pages',
  }),
);

// self.addEventListener('fetch', (event) => {
//   event.respondWith(async () => {
//     console.log(event.request);
//     try {
//       return await fetch(event.request);
//     } catch (err) {
//       return caches.match(event.request);
//     }
//   }());
// });

// const cacheName = 'ahj-sw';

// const files = [
//   '/',
//   '/img/js.png',
//   '/js/app.js',
// ];

// async function putFilesToCache(file) {
//   const cache = await caches.open(cacheName);
//   await cache.addAll(file);
// }

// async function removeOldCache(retain) {
//   const keys = await caches.keys();
//   return Promise.all(
//     keys.filter((key) => !retain.includes(key))
//       .map((key) => caches.delete(key)),
//   );
// }

// self.addEventListener('install', (evt) => {
//   console.log('install');
//   evt.waitUntil((async () => {
//     await putFilesToCache(files);
//     await self.skipWaiting();
//   })());
// });

// self.addEventListener('activate', (evt) => {
//   console.log('activate');
//   evt.waitUntil((async () => {
//     await removeOldCache([cacheName]);
//     await self.clients.claim();
//   })());
// });

// self.addEventListener('fetch', (evt) => {
//   const requestUrl = new URL(evt.request.url);

//   if (requestUrl.pathname.startsWith('/news')) {
//     return;
//   }

//   evt.respondWith((async () => {
//     const cache = await caches.open(cacheName);
//     const cachedResponse = await cache.match(evt.request);

//     if (cachedResponse) {
//       return cachedResponse;
//     }

//     return fetch(evt.request);
//   })());
// });
