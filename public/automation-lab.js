// Automation Lab Dashboard - Interactive Components
// Carousel, Tab Filtering, and Accessibility Features

(function () {
  'use strict';

  // ============================================================================
  // Carousel Component
  // ============================================================================
  
  const carousel = {
    track: document.querySelector('.carousel-track'),
    slides: document.querySelectorAll('.carousel-slide'),
    prevBtn: document.querySelector('.carousel-btn.prev'),
    nextBtn: document.querySelector('.carousel-btn.next'),
    indicatorsContainer: document.querySelector('.carousel-indicators'),
    currentIndex: 0,
    autoplayInterval: null,
    autoplayDelay: 8000,

    init() {
      if (!this.track || this.slides.length === 0) return;

      this.createIndicators();
      this.attachEventListeners();
      this.updateButtons();
      this.startAutoplay();
    },

    createIndicators() {
      this.slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `indicator-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.dataset.index = index;
        this.indicatorsContainer.appendChild(dot);
      });
    },

    attachEventListeners() {
      this.prevBtn?.addEventListener('click', () => this.goToPrev());
      this.nextBtn?.addEventListener('click', () => this.goToNext());

      // Indicator clicks
      this.indicatorsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('indicator-dot')) {
          const index = parseInt(e.target.dataset.index, 10);
          this.goToSlide(index);
        }
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.target.closest('.carousel-container')) {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.goToPrev();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.goToNext();
          }
        }
      });

      // Touch swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      this.track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      this.track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, { passive: true });

      const handleSwipe = () => {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
          this.goToNext();
        } else if (touchEndX - touchStartX > swipeThreshold) {
          this.goToPrev();
        }
      };
      this.handleSwipe = handleSwipe;

      // Pause autoplay on hover/focus
      this.track.addEventListener('mouseenter', () => this.stopAutoplay());
      this.track.addEventListener('mouseleave', () => this.startAutoplay());
      this.track.addEventListener('focusin', () => this.stopAutoplay());
      this.track.addEventListener('focusout', () => this.startAutoplay());
    },

    goToSlide(index) {
      if (index < 0 || index >= this.slides.length) return;

      // Remove active class from current slide
      this.slides[this.currentIndex]?.classList.remove('active');
      const indicators = this.indicatorsContainer.querySelectorAll('.indicator-dot');
      indicators[this.currentIndex]?.classList.remove('active');

      // Add active class to new slide
      this.currentIndex = index;
      this.slides[this.currentIndex]?.classList.add('active');
      indicators[this.currentIndex]?.classList.add('active');

      this.updateButtons();
      this.announceSlideChange();
      this.resetAutoplay();
    },

    goToNext() {
      const nextIndex = (this.currentIndex + 1) % this.slides.length;
      this.goToSlide(nextIndex);
    },

    goToPrev() {
      const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(prevIndex);
    },

    updateButtons() {
      // Enable/disable buttons based on position (optional for infinite loop)
      // For now, keep all enabled as we loop
      this.prevBtn?.removeAttribute('disabled');
      this.nextBtn?.removeAttribute('disabled');
    },

    announceSlideChange() {
      // Throttle announcements to avoid verbosity
      if (this.announceTimeout) clearTimeout(this.announceTimeout);
      
      this.announceTimeout = setTimeout(() => {
        const currentSlide = this.slides[this.currentIndex];
        const title = currentSlide?.querySelector('h3')?.textContent;
        if (title) {
          // Announce to screen readers without being intrusive
          const announcement = `Viewing case study ${this.currentIndex + 1} of ${this.slides.length}: ${title}`;
          this.track.setAttribute('aria-label', announcement);
        }
      }, 500);
    },

    startAutoplay() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      
      this.stopAutoplay();
      this.autoplayInterval = setInterval(() => {
        this.goToNext();
      }, this.autoplayDelay);
    },

    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    },

    resetAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }
  };

  // ============================================================================
  // Tab Filter Component
  // ============================================================================
  
  const tabFilter = {
    tabs: document.querySelectorAll('.tab-btn'),
    filterableItems: null,
    currentFilter: 'all',

    init() {
      if (this.tabs.length === 0) return;

      // Collect all filterable items
      this.filterableItems = [
        ...document.querySelectorAll('.carousel-slide[data-category]'),
        ...document.querySelectorAll('.kpi-card[data-category]'),
        ...document.querySelectorAll('.video-card[data-category]'),
        ...document.querySelectorAll('.download-card[data-category]'),
        ...document.querySelectorAll('.flow-card[data-category]')
      ];

      this.attachEventListeners();
    },

    attachEventListeners() {
      this.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const filter = tab.dataset.filter;
          this.applyFilter(filter);
          this.updateActiveTab(tab);
        });
      });
    },

    applyFilter(filter) {
      this.currentFilter = filter;

      this.filterableItems.forEach(item => {
        const category = item.dataset.category;
        
        if (filter === 'all' || category === filter) {
          item.classList.remove('filtered');
        } else {
          item.classList.add('filtered');
        }
      });

      // Update carousel to show first non-filtered slide
      const firstVisibleSlide = Array.from(carousel.slides).findIndex(
        slide => !slide.classList.contains('filtered')
      );
      if (firstVisibleSlide !== -1 && firstVisibleSlide !== carousel.currentIndex) {
        carousel.goToSlide(firstVisibleSlide);
      }
    },

    updateActiveTab(activeTab) {
      this.tabs.forEach(tab => {
        const isActive = tab === activeTab;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }
  };

  // ============================================================================
  // Video Play Buttons (Modal/Inline Player)
  // ============================================================================
  
  const videoPlayers = {
    init() {
      const playButtons = document.querySelectorAll('.video-play-btn');
      
      playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const videoCard = btn.closest('.video-card');
          const title = videoCard?.querySelector('h3')?.textContent;
          
          // TODO: Implement video modal player
          // Option 1: YouTube/Vimeo embed in modal
          // Option 2: HTML5 video player with custom controls
        });
      });
    }
  };

  // ============================================================================
  // Timeframe Filter (Cosmetic - updates label only)
  // ============================================================================
  
  const timeframeFilter = {
    select: document.getElementById('timeframe'),

    init() {
      if (!this.select) return;

      this.select.addEventListener('change', (e) => {
        const selected = e.target.value;
        // In production, this would filter data by timeframe
        
        // Visual feedback
        this.select.style.borderColor = 'var(--color-primary)';
        setTimeout(() => {
          this.select.style.borderColor = '';
        }, 300);
      });
    }
  };

  // ============================================================================
  // Analytics Tracking (Placeholder)
  // ============================================================================
  
  const analytics = {
    init() {
      // Track carousel slide views
      const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const slideTitle = entry.target.querySelector('h3')?.textContent;
            this.trackEvent('carousel_view', { slide: slideTitle });
          }
        });
      }, { threshold: 0.5 });

      carousel.slides.forEach(slide => slideObserver.observe(slide));

      // Track downloads
      document.querySelectorAll('.download-card').forEach(card => {
        card.addEventListener('click', (e) => {
          const title = card.querySelector('h3')?.textContent;
          this.trackEvent('download', { document: title });
        });
      });
    },

    trackEvent(eventName, data) {
      // Placeholder for analytics integration
      // In production: window.gtag?.('event', eventName, data);
      if (window.gtag) {
        window.gtag('event', eventName, data);
      }
    }
  };

  // ============================================================================
  // Reduced Motion Support
  // ============================================================================
  
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  function handleReducedMotion(e) {
    if (e.matches) {
      // Disable animations
      carousel.stopAutoplay();
      document.body.style.setProperty('--transition-base', '0ms');
      document.body.style.setProperty('--transition-fast', '0ms');
      document.body.style.setProperty('--transition-slow', '0ms');
    } else {
      // Re-enable animations
      carousel.startAutoplay();
      document.body.style.removeProperty('--transition-base');
      document.body.style.removeProperty('--transition-fast');
      document.body.style.removeProperty('--transition-slow');
    }
  }

  reducedMotion.addEventListener('change', handleReducedMotion);
  handleReducedMotion(reducedMotion);

  // ============================================================================
  // Initialize All Components
  // ============================================================================
  
  document.addEventListener('DOMContentLoaded', () => {
    carousel.init();
    tabFilter.init();
    videoPlayers.init();
    timeframeFilter.init();
    analytics.init();

    // Announce page load to screen readers
    setTimeout(() => {
      const main = document.getElementById('main');
      if (main) {
        main.setAttribute('aria-label', 'Automation Lab dashboard loaded with interactive case studies and demos');
      }
    }, 500);
  });

  // ============================================================================
  // Expose API for testing
  // ============================================================================
  
  window.AutomationLab = {
    carousel,
    tabFilter,
    videoPlayers,
    timeframeFilter
  };

})();
