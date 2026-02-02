// Dynamic Headline Rotation
// Rotates through multiple value propositions in the hero section

(function () {
  'use strict';

  // Configuration
  const config = {
    headlines: [
      'Salesforce Sales Cloud Expert',
      'B2B Revenue Accelerator',
      'Pipeline Management Authority',
      'Cloud & AI Solutions Specialist',
      'Enterprise Sales Strategist'
    ],
    rotationInterval: 4000, // 4 seconds
    transitionDuration: 600, // 0.6 seconds
    targetSelector: '.hero-subtitle' // First h2 with this class
  };

  let currentIndex = 0;
  let rotationTimer = null;
  let isRotating = false;

  /**
   * Initialize headline rotation
   */
  function init() {
    const targetElement = document.querySelector(config.targetSelector);
    
    if (!targetElement) {
      console.warn('Dynamic headline: Target element not found');
      return;
    }

    // Store original content as fallback
    const originalContent = targetElement.textContent;
    
    // Set first headline
    targetElement.setAttribute('data-original', originalContent);
    targetElement.textContent = config.headlines[0];
    
    // Start rotation after initial delay
    setTimeout(() => {
      startRotation(targetElement);
    }, config.rotationInterval);

    // Pause on hover
    targetElement.addEventListener('mouseenter', pauseRotation);
    targetElement.addEventListener('mouseleave', () => resumeRotation(targetElement));

    // Pause when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        pauseRotation();
      } else {
        resumeRotation(targetElement);
      }
    });

    // Add rotation class for CSS animations
    targetElement.classList.add('rotating-headline');
  }

  /**
   * Start headline rotation
   */
  function startRotation(element) {
    if (isRotating) return;
    
    isRotating = true;
    rotationTimer = setInterval(() => {
      rotateHeadline(element);
    }, config.rotationInterval);
  }

  /**
   * Rotate to next headline
   */
  function rotateHeadline(element) {
    // Add fade-out class
    element.classList.add('fading-out');

    // After fade-out, change text and fade in
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % config.headlines.length;
      element.textContent = config.headlines[currentIndex];
      element.classList.remove('fading-out');
      element.classList.add('fading-in');

      // Remove fading-in class after transition
      setTimeout(() => {
        element.classList.remove('fading-in');
      }, config.transitionDuration);
    }, config.transitionDuration / 2);
  }

  /**
   * Pause rotation
   */
  function pauseRotation() {
    if (rotationTimer) {
      clearInterval(rotationTimer);
      rotationTimer = null;
      isRotating = false;
    }
  }

  /**
   * Resume rotation
   */
  function resumeRotation(element) {
    if (!isRotating && element) {
      startRotation(element);
    }
  }

  /**
   * Stop rotation and restore original
   */
  function stop() {
    pauseRotation();
    const targetElement = document.querySelector(config.targetSelector);
    if (targetElement) {
      const original = targetElement.getAttribute('data-original');
      if (original) {
        targetElement.textContent = original;
      }
      targetElement.classList.remove('rotating-headline', 'fading-out', 'fading-in');
    }
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  // Public API for manual control
  window.stopHeadlineRotation = stop;
})();
