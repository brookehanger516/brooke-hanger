// Lazy Loading with Blur-Up Effect
// Progressive image loading for better perceived performance

(function () {
  'use strict';

  // Check for native lazy loading support
  const supportsNativeLazyLoading = 'loading' in HTMLImageElement.prototype;

  /**
   * Load image with blur-up effect
   * @param {HTMLImageElement} img - Image element
   */
  function loadImageWithBlur(img) {
    const lowSrc = img.getAttribute('data-src-low');
    const highSrc = img.getAttribute('data-src') || img.getAttribute('data-src-high');
    
    if (!highSrc) return;

    // Create a placeholder with blur
    if (lowSrc && !img.style.backgroundImage) {
      img.style.backgroundImage = `url(${lowSrc})`;
      img.style.backgroundSize = 'cover';
      img.style.backgroundPosition = 'center';
      img.style.filter = 'blur(10px)';
      img.style.transition = 'filter 400ms ease-out';
    }

    // Load high-res image
    const highResImg = new Image();
    
    highResImg.onload = function() {
      img.src = highSrc;
      img.classList.add('lazy-loaded');
      
      // Remove blur after a brief delay to ensure smooth transition
      requestAnimationFrame(() => {
        img.style.filter = 'blur(0)';
        setTimeout(() => {
          img.style.backgroundImage = '';
        }, 400);
      });
    };

    highResImg.onerror = function() {
      console.error('Failed to load image:', highSrc);
      img.classList.add('lazy-error');
    };

    highResImg.src = highSrc;
  }

  /**
   * Simple lazy load (for native loading support)
   * @param {HTMLImageElement} img - Image element
   */
  function loadImageSimple(img) {
    const src = img.getAttribute('data-src');
    if (src) {
      img.src = src;
      img.classList.add('lazy-loaded');
    }
  }

  // ============================================================================
  // Skeleton Loaders
  // ============================================================================

  /**
   * Add skeleton loader to an element
   * @param {HTMLElement} element - Element to add skeleton to
   */
  function addSkeletonLoader(element) {
    if (element.classList.contains('skeleton-loading')) {
      return;
    }

    element.classList.add('skeleton-loading');
    
    // Store original content
    if (!element.hasAttribute('data-skeleton-original')) {
      element.setAttribute('data-skeleton-original', 'true');
    }
  }

  /**
   * Remove skeleton loader from an element
   * @param {HTMLElement} element - Element to remove skeleton from
   */
  function removeSkeletonLoader(element) {
    element.classList.remove('skeleton-loading');
    element.classList.add('skeleton-loaded');
  }

  // ============================================================================
  // Intersection Observer Setup
  // ============================================================================

  // For images with blur-up
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        if (img.hasAttribute('data-src-low') || img.hasAttribute('data-src-high')) {
          loadImageWithBlur(img);
        } else {
          loadImageSimple(img);
        }
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // For skeleton loaders
  const skeletonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Simulate content loading (in real app, this would be actual data fetch)
        const delay = parseInt(element.getAttribute('data-skeleton-delay')) || 500;
        
        setTimeout(() => {
          removeSkeletonLoader(element);
          skeletonObserver.unobserve(element);
        }, delay);
      }
    });
  }, {
    rootMargin: '100px 0px',
    threshold: 0.1
  });

  // ============================================================================
  // Initialize
  // ============================================================================

  function init() {
    // Native lazy loading fallback
    if (supportsNativeLazyLoading) {
      const nativeLazyImages = document.querySelectorAll('img[loading="lazy"]');
      nativeLazyImages.forEach(img => {
        if (img.hasAttribute('data-src')) {
          const src = img.getAttribute('data-src');
          img.src = src;
        }
      });
    }

    // Observe images for blur-up effect
    const lazyImages = document.querySelectorAll('img[data-src], img[data-src-high]');
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });

    // Observe skeleton loaders
    const skeletonElements = document.querySelectorAll('.skeleton-loading');
    skeletonElements.forEach(element => {
      skeletonObserver.observe(element);
    });
  }

  // Public API
  window.lazyLoading = {
    loadImage: loadImageWithBlur,
    addSkeleton: addSkeletonLoader,
    removeSkeleton: removeSkeletonLoader
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
