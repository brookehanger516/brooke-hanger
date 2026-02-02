// Progressive Web App - Install Prompt & Service Worker Registration
// Shows custom install UI after 2 page views

(function () {
  'use strict';

  // ============================================================================
  // Service Worker Registration
  // ============================================================================

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered:', registration.scope);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60000); // Every minute
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error);
        });

      // Handle service worker updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] New service worker activated, reloading...');
        window.location.reload();
      });
    });
  }

  // ============================================================================
  // Install Prompt
  // ============================================================================

  let deferredPrompt = null;
  let installPromptShown = false;

  // Track page views
  function getPageViews() {
    const views = parseInt(localStorage.getItem('pwa-page-views') || '0');
    return views;
  }

  function incrementPageViews() {
    const views = getPageViews() + 1;
    localStorage.setItem('pwa-page-views', views.toString());
    return views;
  }

  function hasDismissedInstall() {
    return localStorage.getItem('pwa-install-dismissed') === 'true';
  }

  function setInstallDismissed() {
    localStorage.setItem('pwa-install-dismissed', 'true');
  }

  // Capture the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('[PWA] Install prompt available');
    
    // Prevent the default prompt
    e.preventDefault();
    
    // Store the event for later use
    deferredPrompt = e;
    
    // Show custom prompt if conditions are met
    const pageViews = incrementPageViews();
    
    if (pageViews >= 2 && !hasDismissedInstall() && !installPromptShown) {
      showInstallPrompt();
    }
  });

  // Show custom install prompt
  function showInstallPrompt() {
    if (installPromptShown) return;
    installPromptShown = true;

    // Create install prompt UI
    const promptOverlay = document.createElement('div');
    promptOverlay.className = 'pwa-install-overlay';
    promptOverlay.innerHTML = `
      <div class="pwa-install-prompt">
        <button class="pwa-install-close" aria-label="Close install prompt">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <div class="pwa-install-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m14-7l-5-5m0 0L7 8m5-5v12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <h3 class="pwa-install-title">Install Portfolio App</h3>
        <p class="pwa-install-description">
          Add this portfolio to your home screen for quick access and offline viewing.
        </p>
        
        <div class="pwa-install-actions">
          <button class="pwa-install-btn cta-button">Install</button>
          <button class="pwa-install-defer">Maybe Later</button>
        </div>
      </div>
    `;

    document.body.appendChild(promptOverlay);

    // Add animations
    requestAnimationFrame(() => {
      promptOverlay.classList.add('pwa-install-visible');
    });

    // Event listeners
    const installBtn = promptOverlay.querySelector('.pwa-install-btn');
    const deferBtn = promptOverlay.querySelector('.pwa-install-defer');
    const closeBtn = promptOverlay.querySelector('.pwa-install-close');

    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;

      // Show the native install prompt
      deferredPrompt.prompt();

      // Wait for the user's response
      const { outcome } = await deferredPrompt.userChoice;
      console.log('[PWA] Install outcome:', outcome);

      if (outcome === 'accepted') {
        console.log('[PWA] App installed');
        if (window.toast) {
          window.toast.success('App installed successfully!');
        }
      }

      // Clear the prompt
      deferredPrompt = null;
      hideInstallPrompt(promptOverlay);
    });

    deferBtn.addEventListener('click', () => {
      console.log('[PWA] Install deferred');
      hideInstallPrompt(promptOverlay);
    });

    closeBtn.addEventListener('click', () => {
      console.log('[PWA] Install dismissed');
      setInstallDismissed();
      hideInstallPrompt(promptOverlay);
    });
  }

  function hideInstallPrompt(overlay) {
    overlay.classList.remove('pwa-install-visible');
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }

  // Listen for app installed event
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed successfully');
    deferredPrompt = null;
    
    if (window.toast) {
      window.toast.success('Portfolio app installed! You can now use it offline.');
    }
  });

  // ============================================================================
  // Check if already installed
  // ============================================================================

  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('[PWA] Running as installed PWA');
    // Could show special UI or features for installed users
  }

  // ============================================================================
  // Network Status Detection
  // ============================================================================

  window.addEventListener('online', () => {
    console.log('[PWA] Back online');
    if (window.toast) {
      window.toast.success('Connection restored');
    }
  });

  window.addEventListener('offline', () => {
    console.log('[PWA] Offline mode');
    if (window.toast) {
      window.toast.warning('You are offline. Some features may be limited.', 5000);
    }
  });

  // Show initial offline status if offline
  if (!navigator.onLine) {
    console.log('[PWA] Starting in offline mode');
  }

})();
