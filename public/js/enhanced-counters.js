// Enhanced Counter Animations - with progress bars and formatting
// Supports decimal, currency, percentage formats

(function () {
  'use strict';

  /**
   * Animate a number with custom formatting
   * @param {HTMLElement} element - Element containing the number
   * @param {Object} options - Animation options
   */
  function animateCounter(element, options = {}) {
    const defaults = {
      duration: 2000,
      format: 'number', // 'number', 'decimal', 'currency', 'percentage'
      decimals: 0,
      prefix: '',
      suffix: '',
      currency: 'USD',
      locale: 'en-US'
    };

    const settings = { ...defaults, ...options };
    
    // Get target value from data attribute or text content
    const targetText = element.getAttribute('data-count') || element.textContent;
    const target = parseFloat(targetText.replace(/[^0-9.-]/g, ''));
    
    if (isNaN(target)) {
      console.warn('Invalid counter target:', targetText);
      return;
    }

    const start = 0;
    const startTime = performance.now();

    function easeOutQuad(t) {
      return t * (2 - t);
    }

    function formatNumber(value) {
      let formatted;

      switch (settings.format) {
        case 'currency':
          formatted = new Intl.NumberFormat(settings.locale, {
            style: 'currency',
            currency: settings.currency,
            minimumFractionDigits: settings.decimals,
            maximumFractionDigits: settings.decimals
          }).format(value);
          break;

        case 'percentage':
          formatted = new Intl.NumberFormat(settings.locale, {
            style: 'percent',
            minimumFractionDigits: settings.decimals,
            maximumFractionDigits: settings.decimals
          }).format(value / 100);
          break;

        case 'decimal':
          formatted = new Intl.NumberFormat(settings.locale, {
            minimumFractionDigits: settings.decimals,
            maximumFractionDigits: settings.decimals
          }).format(value);
          break;

        case 'number':
        default:
          formatted = new Intl.NumberFormat(settings.locale, {
            minimumFractionDigits: 0,
            maximumFractionDigits: settings.decimals
          }).format(value);
          break;
      }

      return settings.prefix + formatted + settings.suffix;
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / settings.duration, 1);
      const eased = easeOutQuad(progress);
      const current = start + (target - start) * eased;

      element.textContent = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = formatNumber(target);
        element.classList.add('counter-complete');
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Animate a progress bar
   * @param {HTMLElement} bar - Progress bar element (.progress-bar)
   * @param {number} target - Target percentage (0-100)
   * @param {number} duration - Animation duration in ms
   */
  function animateProgressBar(bar, target, duration = 1500) {
    const startTime = performance.now();
    const start = 0;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = start + (target - start) * eased;

      bar.style.width = `${current}%`;
      bar.setAttribute('aria-valuenow', Math.round(current));

      // Update percentage text if present
      const percentText = bar.querySelector('.progress-percent');
      if (percentText) {
        percentText.textContent = `${Math.round(current)}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        bar.classList.add('progress-complete');
      }
    }

    requestAnimationFrame(update);
  }

  // ============================================================================
  // Intersection Observer for auto-trigger
  // ============================================================================

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Animated Counter
        if (element.classList.contains('counter')) {
          const options = {
            format: element.getAttribute('data-format') || 'number',
            decimals: parseInt(element.getAttribute('data-decimals')) || 0,
            prefix: element.getAttribute('data-prefix') || '',
            suffix: element.getAttribute('data-suffix') || '',
            currency: element.getAttribute('data-currency') || 'USD',
            duration: parseInt(element.getAttribute('data-duration')) || 2000
          };

          animateCounter(element, options);
          counterObserver.unobserve(element);
        }

        // Progress Bar
        if (element.classList.contains('progress-bar-wrapper')) {
          const bar = element.querySelector('.progress-bar');
          const target = parseInt(bar.getAttribute('data-progress')) || 0;
          const duration = parseInt(bar.getAttribute('data-duration')) || 1500;

          animateProgressBar(bar, target, duration);
          counterObserver.unobserve(element);
        }
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px'
  });

  // ============================================================================
  // Initialize
  // ============================================================================

  function init() {
    // Observe all counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => counterObserver.observe(counter));

    // Observe all progress bars
    const progressBars = document.querySelectorAll('.progress-bar-wrapper');
    progressBars.forEach(bar => counterObserver.observe(bar));
  }

  // Public API
  window.enhancedCounters = {
    animate: animateCounter,
    animateProgress: animateProgressBar
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
