// Service worker Obrolin — nerima push notification & buka app pas diklik.
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  // pass-through langsung ke network, gak ada caching custom
});

self.addEventListener('push', (event) => {
  let data = { title: 'Obrolin', body: 'Ada pesan baru', icon: '/icon-192.png' };
  try { if (event.data) data = { ...data, ...event.data.json() }; } catch (e) {}

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '/icon-192.png',
      badge: '/icon-192.png',
      data: { conversationId: data.conversationId || null },
      tag: data.conversationId || undefined,
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const convId = event.notification.data?.conversationId;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          if (convId) client.postMessage({ type: 'open-conversation', conversationId: convId });
          return;
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});
