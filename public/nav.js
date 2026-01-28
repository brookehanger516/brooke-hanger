// Navigation Component – Salesforce-style Portfolio
// Author: Refactored for Brooke Alexis Hanger
// Version: 2.0.0

(function () {
  'use strict';

  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  // Header HTML template
  const headerHTML = `
    <header class="site-header" role="banner">
      <div class="container">
        <nav class="navbar" aria-label="Main navigation">
          <a class="brand" href="index.html">Brooke Hanger</a>
          
          <button
            class="nav-toggle"
            type="button"
            aria-controls="mobile-nav"
            aria-expanded="false"
            aria-label="Toggle navigation menu"
            data-menu-toggle
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>

          <nav id="primary-nav" class="nav" aria-label="Primary">
            <ul>
              <li><a href="index.html" data-i18n="nav.home">Home</a></li>
              <li><a href="about.html" data-i18n="nav.about">About</a></li>
              <li><a href="experience.html" data-i18n="nav.experience">Experience</a></li>
              <li><a href="automation-lab.html" data-i18n="nav.automationLab">Automation Lab</a></li>
              <li><a href="resume.html" data-i18n="nav.resume">Resume</a></li>
              <li><a href="contact.html" data-i18n="nav.contact">Contact</a></li>
            </ul>
            
            <!-- Language Switcher -->
            <div class="lang-switcher" role="group" aria-label="Language selection">
              <button type="button" data-lang-switch="en" aria-pressed="true" title="English">EN</button>
              <button type="button" data-lang-switch="es" aria-pressed="false" title="Español">ES</button>
              <button type="button" data-lang-switch="fr" aria-pressed="false" title="Français">FR</button>
              <button type="button" data-lang-switch="zh" aria-pressed="false" title="中文">ZH</button>
            </div>
          </nav>
        </nav>
      </div>
    </header>

    <div
      id="mobile-nav"
      class="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      hidden
      data-menu-overlay
    >
      <nav class="nav" aria-label="Mobile">
        <ul>
          <li><a href="index.html" data-i18n="nav.home">Home</a></li>
          <li><a href="about.html" data-i18n="nav.about">About</a></li>
          <li><a href="experience.html" data-i18n="nav.experience">Experience</a></li>
          <li><a href="automation-lab.html" data-i18n="nav.automationLab">Automation Lab</a></li>
          <li><a href="resume.html" data-i18n="nav.resume">Resume</a></li>
          <li><a href="contact.html" data-i18n="nav.contact">Contact</a></li>
        </ul>
        
        <!-- Mobile Language Switcher -->
        <div class="lang-switcher mobile" role="group" aria-label="Language selection">
          <button type="button" data-lang-switch="en" aria-pressed="true">English</button>
          <button type="button" data-lang-switch="es" aria-pressed="false">Español</button>
          <button type="button" data-lang-switch="fr" aria-pressed="false">Français</button>
          <button type="button" data-lang-switch="zh" aria-pressed="false">中文</button>
        </div>
      </nav>
    </div>
  `;

  // Inject header
  placeholder.outerHTML = headerHTML;

  // Get references
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuOverlay = document.querySelector('[data-menu-overlay]');
  const body = document.body;

  if (!menuToggle || !menuOverlay) return;

  // Toggle menu function
  function toggleMenu(forceClose = false) {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    const shouldOpen = forceClose ? false : !isExpanded;

    menuToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', shouldOpen ? 'Close navigation menu' : 'Open navigation menu');
    
    if (shouldOpen) {
      menuOverlay.removeAttribute('hidden');
      body.classList.add('scroll-lock');
      
      // Focus first link
      const firstLink = menuOverlay.querySelector('a');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    } else {
      menuOverlay.setAttribute('hidden', '');
      body.classList.remove('scroll-lock');
      menuToggle.focus();
    }
  }

  // Event listeners
  menuToggle.addEventListener('click', () => toggleMenu());

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu(true);
    }
  });

  // Close when clicking overlay backdrop
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      toggleMenu(true);
    }
  });

  // Touch swipe to close (mobile UX)
  let touchStartY = 0;
  menuOverlay.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  menuOverlay.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY - touchEndY;
    
    // Swipe down to close (threshold: 80px)
    if (swipeDistance < -80) {
      toggleMenu(true);
    }
  }, { passive: true });

  // Close when clicking any nav link
  menuOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Focus trap
  menuOverlay.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusableElements = menuOverlay.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  });

  // Highlight current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.setAttribute('aria-current', 'page');
      link.style.color = 'var(--color-primary)';
      link.style.fontWeight = 'var(--font-weight-semibold)';
    }
  });

  // Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 10) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'var(--shadow-sm)';
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

})();
