// Dark Mode Toggle System
// Theme switcher with localStorage persistence

(function () {
  'use strict';

  const STORAGE_KEY = 'brooke-portfolio-theme';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
  };

  let currentTheme = THEMES.AUTO;

  // ============================================================================
  // Theme Detection & Application
  // ============================================================================

  function detectPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored;
    }

    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }

    return THEMES.LIGHT;
  }

  function applyTheme(theme) {
    currentTheme = theme;
    
    // Apply theme to document
    if (theme === THEMES.DARK) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (theme === THEMES.LIGHT) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      // Auto mode - follow system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, theme);

    // Update toggle button if present
    updateToggleButton();

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  }

  function toggleTheme() {
    const currentDataTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentDataTheme === 'dark' ? THEMES.LIGHT : THEMES.DARK;
    
    // Add transition class for smooth theme change
    document.documentElement.classList.add('theme-transitioning');
    
    applyTheme(newTheme);
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 300);

    console.log('[Theme] Switched to:', newTheme);
  }

  // ============================================================================
  // Toggle Button
  // ============================================================================

  function createToggleButton() {
    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle dark mode');
    button.setAttribute('aria-pressed', 'false');
    
    button.innerHTML = `
      <svg class="theme-icon theme-icon-sun" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
      <svg class="theme-icon theme-icon-moon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    `;

    button.addEventListener('click', toggleTheme);

    return button;
  }

  function addToggleToNav() {
    const nav = document.querySelector('.header-nav, nav');
    if (!nav) {
      console.warn('[Theme] Navigation not found, adding to body');
      document.body.appendChild(createToggleButton());
      return;
    }

    const button = createToggleButton();
    nav.appendChild(button);
  }

  function updateToggleButton() {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    const theme = document.documentElement.getAttribute('data-theme');
    button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  // ============================================================================
  // System Preference Listener
  // ============================================================================

  function watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      if (currentTheme === THEMES.AUTO) {
        console.log('[Theme] System preference changed to:', e.matches ? 'dark' : 'light');
        applyTheme(THEMES.AUTO);
      }
    });
  }

  // ============================================================================
  // Keyboard Shortcut
  // ============================================================================

  function setupKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
      // Alt+T to toggle theme
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
        
        if (window.toast) {
          const theme = document.documentElement.getAttribute('data-theme');
          window.toast.info(`${theme === 'dark' ? '🌙 Dark' : '☀️ Light'} mode enabled`, 2000);
        }
      }
    });
  }

  // ============================================================================
  // High Contrast Detection
  // ============================================================================

  function detectHighContrast() {
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      console.log('[Theme] High contrast mode detected');
      document.documentElement.classList.add('high-contrast');
    }

    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
      if (e.matches) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    });
  }

  // ============================================================================
  // Initialize
  // ============================================================================

  function init() {
    // Apply theme immediately (before DOM ready to avoid flash)
    const theme = detectPreferredTheme();
    applyTheme(theme);

    // Wait for DOM for UI elements
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        addToggleToNav();
        watchSystemTheme();
        setupKeyboardShortcut();
        detectHighContrast();
      });
    } else {
      addToggleToNav();
      watchSystemTheme();
      setupKeyboardShortcut();
      detectHighContrast();
    }

    console.log('[Theme] Dark mode system initialized');
  }

  // Public API
  window.themeManager = {
    toggle: toggleTheme,
    set: applyTheme,
    get: () => document.documentElement.getAttribute('data-theme')
  };

  // Initialize immediately
  init();

})();
