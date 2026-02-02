// Analytics Module - Plausible & Google Analytics with DNT Support
// Version: 1.0.0

(function () {
  'use strict';

  const config = {
    // Toggle between 'plausible' or 'none'
    provider: 'plausible',
    
    // Plausible configuration
    plausible: {
      domain: 'brooke-hanger.com',
      apiHost: 'https://plausible.io',
    },
  };

  // Check Do Not Track
  function respectsDNT() {
    const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    return dnt === '1' || dnt === 'yes';
  }

  // Initialize Plausible
  function initPlausible() {
    if (respectsDNT()) {
      console.info('[Analytics] DNT enabled - Plausible tracking disabled');
      return;
    }

    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-domain', config.plausible.domain);
    script.src = `${config.plausible.apiHost}/js/script.js`;
    
    script.onerror = () => console.warn('[Analytics] Plausible script failed to load');
    document.head.appendChild(script);
    
    console.info('[Analytics] Plausible initialized');
  }

  // Initialize Google Analytics
  function initGA() {
    if (respectsDNT()) {
      console.info('[Analytics] DNT enabled - GA tracking disabled');
      return;
    }
based on provider
  function init() {
    if (config.provider === 'plausible') {
      initPlausibler DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Custom event tracking
  const trackEvent = (eventName, props = {}) => {
    if (respectsDNT()) return;
    if (config.provider === 'plausible' && window.plausible) {
      window.plausible(eventName, { props });
    } else if (config.provider === 'ga' && window.gtag) {
      window.gtag('event', eventName, props);
    }
  };

  // Auto-track file downloads
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.href;
    if (/\.(pdf|json|zip|docx?)$/i.test(href)) {
      trackEvent('file_download', {
        file: href.split('/').pop(),
        location: window.location.pathname,
      });
    }
  });

  // Auto-track outbound links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.href;
    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
      trackEvent('outbound_click', {
        url: href,
        text: link.textContent.trim().substring(0, 50),
      });
    }
  // Expose for manual tracking
  window.trackEvent = trackEvent;
  window.AnalyticsConfig = config;
})();
