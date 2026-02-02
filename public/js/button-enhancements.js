// Button Enhancements - Advanced Interactions
// Animated arrows, ripple effects, loading states

(function () {
  'use strict';

  // ============================================================================
  // Animated Arrow Enhancement
  // ============================================================================

  function addAnimatedArrows() {
    const primaryButtons = document.querySelectorAll('.cta-button:not(.secondary)');
    
    primaryButtons.forEach(button => {
      // Skip if arrow already added
      if (button.querySelector('.btn-arrow')) return;
      
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrow.setAttribute('class', 'btn-arrow');
      arrow.setAttribute('width', '20');
      arrow.setAttribute('height', '20');
      arrow.setAttribute('viewBox', '0 0 20 20');
      arrow.setAttribute('fill', 'none');
      arrow.setAttribute('stroke', 'currentColor');
      arrow.setAttribute('stroke-width', '2');
      arrow.setAttribute('aria-hidden', 'true');
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M4 10h12m-6-6l6 6-6 6');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      
      arrow.appendChild(path);
      button.appendChild(arrow);
    });
  }

  // ============================================================================
  // Ripple Effect
  // ============================================================================

  function createRipple(event) {
    const button = event.currentTarget;
    
    // Don't add ripple if button is disabled
    if (button.disabled) return;
    
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    // Remove old ripples
    const oldRipple = button.querySelector('.ripple');
    if (oldRipple) {
      oldRipple.remove();
    }
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  function addRippleEffects() {
    const buttons = document.querySelectorAll('.cta-button, button[type="submit"], .filter-btn, .tab-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', createRipple);
    });
  }

  // ============================================================================
  // Loading Spinner
  // ============================================================================

  function createSpinner() {
    const spinner = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    spinner.setAttribute('class', 'btn-spinner');
    spinner.setAttribute('width', '20');
    spinner.setAttribute('height', '20');
    spinner.setAttribute('viewBox', '0 0 20 20');
    spinner.setAttribute('aria-hidden', 'true');
    
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '10');
    circle.setAttribute('cy', '10');
    circle.setAttribute('r', '8');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'currentColor');
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('stroke-linecap', 'round');
    circle.setAttribute('stroke-dasharray', '12 38');
    
    spinner.appendChild(circle);
    return spinner;
  }

  /**
   * Set button loading state
   * @param {HTMLButtonElement} button - Button element
   * @param {boolean} isLoading - Loading state
   */
  function setButtonLoading(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.classList.add('is-loading');
      
      // Store original content
      if (!button.dataset.originalContent) {
        button.dataset.originalContent = button.innerHTML;
      }
      
      // Add spinner
      const spinner = createSpinner();
      button.innerHTML = '';
      button.appendChild(spinner);
      
      const loadingText = document.createElement('span');
      loadingText.textContent = 'Loading...';
      loadingText.className = 'btn-loading-text';
      button.appendChild(loadingText);
      
    } else {
      button.disabled = false;
      button.classList.remove('is-loading');
      
      // Restore original content
      if (button.dataset.originalContent) {
        button.innerHTML = button.dataset.originalContent;
        delete button.dataset.originalContent;
      }
    }
  }

  // ============================================================================
  // Demo: Form Submit Loading State
  // ============================================================================

  function setupFormLoadingStates() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(event) {
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (submitButton && !form.hasAttribute('data-no-loading')) {
          // Don't prevent default - let form validation handle it
          if (form.checkValidity()) {
            setButtonLoading(submitButton, true);
            
            // Demo: Reset after 2 seconds (in real app, reset after actual submission)
            setTimeout(() => {
              setButtonLoading(submitButton, false);
            }, 2000);
          }
        }
      });
    });
  }

  // ============================================================================
  // Public API
  // ============================================================================

  window.buttonEnhancements = {
    setLoading: setButtonLoading,
    addRipple: createRipple
  };

  // ============================================================================
  // Initialize
  // ============================================================================

  function init() {
    addAnimatedArrows();
    addRippleEffects();
    setupFormLoadingStates();
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
