// Service worker minimal — cuma buat memenuhi syarat "installable PWA".
// Nggak nyimpen cache offline biar data chat selalu fresh dari server.
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  // pass-through langsung ke network, gak ada caching custom
});
