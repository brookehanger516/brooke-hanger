// Analytics Module - Plausible & Google Analytics with DNT Support
// Version: 1.0.0

(function () {
  'use strict';

  const config = {
    // Toggle between 'plausible', 'ga', or 'none'
    provider: 'plausible',
    
    // Plausible configuration
    plausible: {
      domain: 'YOUR_PLAUSIBLE_DOMAIN', // Replace with your domain
      apiHost: 'https://plausible.io',
    },
    
    // Google Analytics configuration (fallback)
    ga: {
      measurementId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
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

    // GA4 gtag snippet
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga.measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', config.ga.measurementId, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure',
    });
    
    console.info('[Analytics] Google Analytics initialized');
  }

  // Initialize based on provider
  function init() {
    if (config.provider === 'plausible') {
      initPlausible();
    } else if (config.provider === 'ga') {
      initGA();
    } else {
      console.info('[Analytics] No analytics provider configured');
    }
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose config for testing
  window.AnalyticsConfig = config;
})();
