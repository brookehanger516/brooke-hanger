// Touch Gestures - Swipe navigation for mobile
// Swipe for tabs, pull-to-refresh for timeline

(function () {
  'use strict';

  // Only enable on touch devices
  if (!('ontouchstart' in window)) {
    console.log('[Touch] No touch support detected');
    return;
  }

  // ============================================================================
  // Swipe Detection
  // ============================================================================

  class SwipeDetector {
    constructor(element, options = {}) {
      this.element = element;
      this.options = {
        threshold: options.threshold || 50,
        maxVerticalDistance: options.maxVerticalDistance || 100,
        onSwipeLeft: options.onSwipeLeft || (() => {}),
        onSwipeRight: options.onSwipeRight || (() => {}),
        onSwipeUp: options.onSwipeUp || (() => {}),
        onSwipeDown: options.onSwipeDown || (() => {})
      };

      this.startX = 0;
      this.startY = 0;
      this.endX = 0;
      this.endY = 0;

      this.init();
    }

    init() {
      this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
      this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
      this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    }

    handleTouchStart(e) {
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
      this.endX = e.touches[0].clientX;
      this.endY = e.touches[0].clientY;
    }

    handleTouchEnd() {
      const deltaX = this.endX - this.startX;
      const deltaY = this.endY - this.startY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Horizontal swipe
      if (absDeltaX > this.options.threshold && absDeltaY < this.options.maxVerticalDistance) {
        if (deltaX > 0) {
          this.options.onSwipeRight();
        } else {
          this.options.onSwipeLeft();
        }
      }

      // Vertical swipe
      if (absDeltaY > this.options.threshold && absDeltaX < this.options.maxVerticalDistance) {
        if (deltaY > 0) {
          this.options.onSwipeDown();
        } else {
          this.options.onSwipeUp();
        }
      }
    }
  }

  // ============================================================================
  // Tab Swipe Navigation
  // ============================================================================

  function initTabSwipe() {
    const tabContainers = document.querySelectorAll('.segment-tabs, .skills-filter-bar');
    
    tabContainers.forEach(container => {
      const tabs = Array.from(container.querySelectorAll('button'));
      if (tabs.length <= 1) return;

      let currentIndex = tabs.findIndex(tab => 
        tab.classList.contains('active') || tab.classList.contains('filter-active')
      );
      if (currentIndex === -1) currentIndex = 0;

      new SwipeDetector(container, {
        onSwipeLeft: () => {
          // Next tab
          const nextIndex = (currentIndex + 1) % tabs.length;
          tabs[nextIndex].click();
          currentIndex = nextIndex;
        },
        onSwipeRight: () => {
          // Previous tab
          const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          tabs[prevIndex].click();
          currentIndex = prevIndex;
        }
      });

      console.log('[Touch] Swipe navigation enabled for tabs');
    });
  }

  // ============================================================================
  // Pull-to-Refresh
  // ============================================================================

  function initPullToRefresh() {
    const timeline = document.querySelector('.timeline, .experience-content');
    if (!timeline) return;

    let startY = 0;
    let currentY = 0;
    let pulling = false;
    let refreshing = false;

    const threshold = 150; // pixels
    const refreshIndicator = document.createElement('div');
    refreshIndicator.className = 'pull-refresh-indicator';
    refreshIndicator.innerHTML = `
      <svg class="pull-refresh-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 4v6h6M23 20v-6h-6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="pull-refresh-text">Pull to refresh</span>
    `;
    timeline.parentElement.insertBefore(refreshIndicator, timeline);

    timeline.addEventListener('touchstart', (e) => {
      if (window.pageYOffset === 0 && !refreshing) {
        startY = e.touches[0].clientY;
        pulling = true;
      }
    }, { passive: true });

    timeline.addEventListener('touchmove', (e) => {
      if (!pulling) return;

      currentY = e.touches[0].clientY;
      const distance = currentY - startY;

      if (distance > 0) {
        const pullDistance = Math.min(distance, threshold);
        refreshIndicator.style.transform = `translateY(${pullDistance}px)`;
        refreshIndicator.style.opacity = Math.min(pullDistance / threshold, 1);

        if (pullDistance >= threshold) {
          refreshIndicator.classList.add('pull-refresh-ready');
        } else {
          refreshIndicator.classList.remove('pull-refresh-ready');
        }
      }
    }, { passive: true });

    timeline.addEventListener('touchend', () => {
      if (!pulling) return;

      const distance = currentY - startY;

      if (distance >= threshold && !refreshing) {
        refreshing = true;
        refreshIndicator.classList.add('pull-refresh-refreshing');
        
        // Simulate refresh (in real app, would reload data)
        setTimeout(() => {
          console.log('[Touch] Page refreshed');
          if (window.toast) {
            window.toast.success('Content refreshed');
          }
          
          refreshing = false;
          refreshIndicator.classList.remove('pull-refresh-refreshing', 'pull-refresh-ready');
          refreshIndicator.style.transform = '';
          refreshIndicator.style.opacity = '0';
        }, 1500);
      } else {
        // Reset
        refreshIndicator.classList.remove('pull-refresh-ready');
        refreshIndicator.style.transform = '';
        refreshIndicator.style.opacity = '0';
      }

      pulling = false;
      startY = 0;
      currentY = 0;
    }, { passive: true });

    console.log('[Touch] Pull-to-refresh enabled');
  }

  // ============================================================================
  // Long Press Handler
  // ============================================================================

  function initLongPress() {
    const cards = document.querySelectorAll('.card, .skill-card, .timeline-item');
    
    cards.forEach(card => {
      let pressTimer;
      
      card.addEventListener('touchstart', (e) => {
        pressTimer = setTimeout(() => {
          // Trigger long press action
          card.classList.add('long-pressed');
          navigator.vibrate?.(50); // Haptic feedback
          
          console.log('[Touch] Long press detected on card');
        }, 500);
      }, { passive: true });
      
      card.addEventListener('touchend', () => {
        clearTimeout(pressTimer);
        setTimeout(() => {
          card.classList.remove('long-pressed');
        }, 200);
      }, { passive: true });
      
      card.addEventListener('touchmove', () => {
        clearTimeout(pressTimer);
      }, { passive: true });
    });
  }

  // ============================================================================
  // Initialize
  // ============================================================================

  function init() {
    initTabSwipe();
    initPullToRefresh();
    initLongPress();
    
    console.log('[Touch] Gesture handlers initialized');
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  window.touchGestures = {
    SwipeDetector
  };

})();
