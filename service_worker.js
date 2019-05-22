// creation of a variable for storing the caches
var cacheName = 'version1';
// installing of service worker
self.addEventListener('install', e => {
  console.log("service worker installed successfully");
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/styles.css',
        '/manifest.json',
        '/service_worker.js',
        '/restaurant.html',
        '/data/restaurants.json',
        '/img/icon.png',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js'
      ]);
    })
  )
})
//activation of service worker
self.addEventListener('active', e => {
  console.log("serviceWorker activated Successfully");
  e.waitUntil(
    caches.keys().then(cacheName => {
      return Promise.all(cacheName.map(newname => {
        if (newname !== cacheName) {
          console.log("deleted");
          return caches.delete(newname);
        }
      }))
    })
  )
});
//fetching of service worker
self.addEventListener('fetch', e => {
  console.log("service worker fetched successfully");
  e.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(e.request).then(result => {
        return result || fetch(e.request).then(response => {
          cache.put(e.request, response.clone());
          return response;
        })
      })
    })
  )
})
