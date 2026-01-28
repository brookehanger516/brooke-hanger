// Lightweight i18n Module
// Supports EN, ES, FR, ZH with localStorage persistence

(function () {
  'use strict';

  const STORAGE_KEY = 'brooke-lang';
  const SUPPORTED_LANGS = ['en', 'es', 'fr', 'zh'];
  const DEFAULT_LANG = 'en';
  
  let currentLang = DEFAULT_LANG;
  let translations = {};

  // Detect browser language
  function detectBrowserLang() {
    const browserLang = navigator.language.split('-')[0];
    return SUPPORTED_LANGS.includes(browserLang) ? browserLang : DEFAULT_LANG;
  }

  // Load translation dictionary
  async function loadTranslations(lang) {
    try {
      const response = await fetch(`/i18n/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}.json`);
      translations = await response.json();
      return translations;
    } catch (error) {
      console.warn(`[i18n] Failed to load ${lang}, falling back to ${DEFAULT_LANG}`, error);
      if (lang !== DEFAULT_LANG) {
        return loadTranslations(DEFAULT_LANG);
      }
      return {};
    }
  }

  // Apply translations to DOM
  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = getNestedValue(translations, key);
      
      if (translation) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
  }

  // Get nested object value by dot notation (e.g., "nav.home")
  function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // Change language
  async function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
      console.warn(`[i18n] Unsupported language: ${lang}`);
      return;
    }

    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    
    await loadTranslations(lang);
    applyTranslations();
    
    // Update language switcher active state
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang-switch') === lang);
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang-switch') === lang);
    });

    console.info(`[i18n] Language set to: ${lang}`);
  }

  // Initialize
  async function init() {
    // Determine initial language
    const savedLang = localStorage.getItem(STORAGE_KEY);
    const initialLang = savedLang || detectBrowserLang();
    
    await setLanguage(initialLang);

    // Attach event listeners to language switchers
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang-switch');
        setLanguage(lang);
      });
    });
  }

  // Public API
  window.i18n = {
    init,
    setLanguage,
    getCurrentLang: () => currentLang,
    t: (key) => getNestedValue(translations, key) || key,
  };

  // Auto-init when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
