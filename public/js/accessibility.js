// Enhanced Accessibility Features
// Skip links, live regions, keyboard shortcuts, and high contrast

(function () {
  'use strict';

  // ============================================================================
  // Enhanced Skip Links
  // ============================================================================

  function enhanceSkipLinks() {
    const existingSkipLink = document.querySelector('.skip-link');
    
    if (!existingSkipLink) {
      // Create skip links container
      const skipLinksContainer = document.createElement('div');
      skipLinksContainer.className = 'skip-links';
      
      const links = [
        { href: '#main', text: 'Skip to main content' },
        { href: '#navigation', text: 'Skip to navigation' },
        { href: '#footer', text: 'Skip to footer' }
      ];
      
      links.forEach(({ href, text }) => {
        const link = document.createElement('a');
        link.href = href;
        link.className = 'skip-link';
        link.textContent = text;
        skipLinksContainer.appendChild(link);
      });
      
      document.body.insertBefore(skipLinksContainer, document.body.firstChild);
    } else {
      // Enhance existing skip link
      const skipLinksContainer = document.createElement('div');
      skipLinksContainer.className = 'skip-links';
      
      skipLinksContainer.appendChild(existingSkipLink.cloneNode(true));
      
      // Add additional skip links
      const navLink = document.createElement('a');
      navLink.href = '#navigation';
      navLink.className = 'skip-link';
      navLink.textContent = 'Skip to navigation';
      skipLinksContainer.appendChild(navLink);
      
      const footerLink = document.createElement('a');
      footerLink.href = '#footer';
      footerLink.className = 'skip-link';
      footerLink.textContent = 'Skip to footer';
      skipLinksContainer.appendChild(footerLink);
      
      existingSkipLink.parentNode.replaceChild(skipLinksContainer, existingSkipLink);
    }
    
    // Ensure navigation and footer have IDs
    const nav = document.querySelector('nav, header');
    if (nav && !nav.id) {
      nav.id = 'navigation';
    }
    
    const footer = document.querySelector('footer');
    if (footer && !footer.id) {
      footer.id = 'footer';
    }

    console.log('[A11y] Enhanced skip links initialized');
  }

  // ============================================================================
  // Live Regions for Dynamic Content
  // ============================================================================

  function setupLiveRegions() {
    // Add live region for filter results
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
      let liveRegion = skillsSection.querySelector('[aria-live]');
      
      if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.className = 'sr-only';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.id = 'skills-filter-status';
        skillsSection.insertBefore(liveRegion, skillsSection.firstChild);
      }
      
      // Listen for filter changes
      window.addEventListener('skillsFiltered', (e) => {
        const count = e.detail?.count || 0;
        const category = e.detail?.category || 'all';
        
        liveRegion.textContent = category === 'all' 
          ? `Showing all ${count} skills`
          : `Showing ${count} ${category} skills`;
      });
    }

    // Add live region for form status
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      if (!form.querySelector('[aria-live]')) {
        const liveRegion = document.createElement('div');
        liveRegion.className = 'sr-only';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        form.appendChild(liveRegion);
        
        // Update on form submission
        form.addEventListener('submit', () => {
          liveRegion.textContent = 'Form submitted. Please wait...';
        });
      }
    });

    console.log('[A11y] Live regions initialized');
  }

  // ============================================================================
  // Keyboard Shortcuts
  // ============================================================================

  const shortcuts = {
    'Alt+K': { action: 'openSearch', description: 'Open search' },
    'Alt+T': { action: 'toggleTheme', description: 'Toggle dark mode' },
    'Alt+H': { action: 'goHome', description: 'Go to homepage' },
    'Alt+C': { action: 'goContact', description: 'Go to contact page' },
    'Alt+?': { action: 'showShortcuts', description: 'Show keyboard shortcuts' }
  };

  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      const key = [];
      if (e.altKey) key.push('Alt');
      if (e.ctrlKey) key.push('Ctrl');
      if (e.shiftKey) key.push('Shift');
      key.push(e.key.toUpperCase());
      
      const combo = key.join('+');
      const shortcut = shortcuts[combo];
      
      if (shortcut) {
        e.preventDefault();
        executeShortcut(shortcut.action);
      }
    });

    console.log('[A11y] Keyboard shortcuts initialized');
  }

  function executeShortcut(action) {
    switch (action) {
      case 'openSearch':
        // Placeholder for search feature
        if (window.toast) {
          window.toast.info('Search feature coming soon! (Alt+K)', 3000);
        }
        break;
        
      case 'toggleTheme':
        if (window.themeManager) {
          window.themeManager.toggle();
        }
        break;
        
      case 'goHome':
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
          window.location.href = '/';
        }
        break;
        
      case 'goContact':
        if (window.location.pathname !== '/contact.html') {
          window.location.href = '/contact.html';
        }
        break;
        
      case 'showShortcuts':
        showShortcutsModal();
        break;
    }
  }

  function showShortcutsModal() {
    // Create modal with keyboard shortcuts
    const modal = document.createElement('div');
    modal.className = 'shortcuts-modal-overlay';
    modal.innerHTML = `
      <div class="shortcuts-modal" role="dialog" aria-labelledby="shortcuts-title" aria-modal="true">
        <button class="shortcuts-modal-close" aria-label="Close shortcuts">×</button>
        <h2 id="shortcuts-title">Keyboard Shortcuts</h2>
        <ul class="shortcuts-list">
          ${Object.entries(shortcuts).map(([key, { description }]) => `
            <li>
              <kbd>${key.replace(/\+/g, '</kbd> + <kbd>')}</kbd>
              <span>${description}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    document.body.appendChild(modal);
    
    // Focus the modal
    const modalContent = modal.querySelector('.shortcuts-modal');
    modalContent.focus();

    // Close handlers
    const closeBtn = modal.querySelector('.shortcuts-modal-close');
    closeBtn.addEventListener('click', () => modal.remove());
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    document.addEventListener('keydown', function escapeHandler(e) {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', escapeHandler);
      }
    });
  }

  // ============================================================================
  // Focus Management
  // ============================================================================

  function enhanceFocusManagement() {
    // Add visible focus indicator class on keyboard navigation
    let isUsingKeyboard = false;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        isUsingKeyboard = true;
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      isUsingKeyboard = false;
      document.body.classList.remove('keyboard-navigation');
    });

    // Focus trap for modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('[aria-modal="true"]');
        if (modal) {
          trapFocus(modal, e);
        }
      }
    });
  }

  function trapFocus(element, event) {
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  // ============================================================================
  // Initialize
  // ============================================================================

  function init() {
    enhanceSkipLinks();
    setupLiveRegions();
    setupKeyboardShortcuts();
    enhanceFocusManagement();
    
    console.log('[A11y] Accessibility enhancements initialized');
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.accessibility = {
    showShortcuts: showShortcutsModal
  };

})();
