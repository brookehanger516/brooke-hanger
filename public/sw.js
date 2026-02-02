// Service Worker for Progressive Web App
// Cache-first for static assets, network-first for HTML

const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE = `brooke-portfolio-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `brooke-portfolio-dynamic-${CACHE_VERSION}`;

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/experience.html',
  '/automation-lab.html',
  '/contact.html',
  '/resume.html',
  '/invest.html',
  '/thank-you.html',
  '/404.html',
  '/styles.css',
  '/automation-lab.css',
  '/assets/css/resume.css',
  '/nav.js',
  '/analytics.js',
  '/contact-form.js',
  '/automation-lab.js',
  '/assets/js/resume.js',
  '/js/error-handler.js',
  '/js/scroll-animations.js',
  '/js/button-enhancements.js',
  '/js/dynamic-headline.js',
  '/js/skills-filter.js',
  '/js/enhanced-counters.js',
  '/js/lazy-loading.js',
  '/js/parallax-effects.js',
  '/js/toast-notification.js',
  '/js/pwa-install.js',
  '/js/touch-gestures.js',
  '/js/dark-mode.js',
  '/js/accessibility.js',
  '/js/i18n.js',
  '/js/scrollspy.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((error) => {
        console.error('[SW] Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              // Delete old cache versions
              return name.startsWith('brooke-portfolio-') && 
                     name !== STATIC_CACHE && 
                     name !== DYNAMIC_CACHE;
            })
            .map((name) => {
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // HTML pages: Network-first strategy
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the response
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(request);
        })
    );
    return;
  }

  // Static assets: Cache-first strategy
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version and update in background
          fetch(request)
            .then((response) => {
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, response);
              });
            })
            .catch(() => {
              // Network failed, but we already have cached version
            });
          
          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clone and cache the response
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });

            return response;
          });
      })
  );
});

// Push notifications (optional, for future enhancement)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/img/icon-192.png',
    badge: '/img/badge.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification('Brooke Hanger Portfolio', options)
  );
});

// Message handler for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => caches.delete(name))
        );
      })
    );
  }
});
