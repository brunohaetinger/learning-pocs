self.addEventListener('install', event => {
    console.log('Service Worker Installed');
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/',
                // '/index.html',
                // '/style.css'
            ]);
        })
    );
  });
  
  self.addEventListener('activate', event => {
    console.log('Service Worker Activated');
  });
  
  self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
  });
  
  // -- Handles push notifications from a server.
  // self.addEventListener('push', event => {
  //   const data = event.data ? event.data.text() : 'Default message';
  //   event.waitUntil(
  //       self.registration.showNotification('Push Notification', {
  //           body: data,
  //           icon: '/icon.png'
  //       })
  //   );
  // });
  
  // --- Allows deferred synchronization when the user comes back online.
  // self.addEventListener('sync', event => {
  //   if (event.tag === 'sync-event') {
  //       event.waitUntil(syncData());
  //   }
  // });
  
  // async function syncData() {
  //   const response = await fetch('/sync-endpoint', { method: 'POST' });
  //   console.log('Data synced!', response);
  // }
  