/* eslint-disable no-restricted-globals */

// const cacheName = 'ahj-workers-bs';

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
//   console.log(evt);
//   evt.waitUntil((async () => {
//     await putFilesToCache(files);
//     await self.skipWaiting();
//   })());
// });

// self.addEventListener('activate', (evt) => {
//   console.log(evt);
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

self.addEventListener('install', (ev) => {
  console.log(ev);
});

self.addEventListener('activate', (ev) => {
  console.log(ev);
})
