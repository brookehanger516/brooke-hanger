// Multi-Layer Parallax Effects
// Smooth parallax scrolling with performance optimization

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Only enable on desktop
  const isDesktop = window.innerWidth >= 768;

  if (prefersReducedMotion || !isDesktop) {
    console.log('Parallax disabled: reduced motion or mobile device');
    return;
  }

  // ============================================================================
  // Hero Multi-Layer Parallax
  // ============================================================================

  function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create parallax layers if they don't exist
    let backgroundLayer = hero.querySelector('.parallax-background');
    let middleLayer = hero.querySelector('.parallax-middle');
    let foregroundLayer = hero.querySelector('.parallax-foreground');

    // If layers don't exist, create them
    if (!backgroundLayer) {
      // Move background to parallax layer
      const heroInner = hero.querySelector('.hero-content');
      if (!heroInner) return;

      // Create layer structure
      const layersContainer = document.createElement('div');
      layersContainer.className = 'parallax-layers';

      backgroundLayer = document.createElement('div');
      backgroundLayer.className = 'parallax-background';
      
      middleLayer = document.createElement('div');
      middleLayer.className = 'parallax-middle';
      
      foregroundLayer = document.createElement('div');
      foregroundLayer.className = 'parallax-foreground';

      layersContainer.appendChild(backgroundLayer);
      layersContainer.appendChild(middleLayer);
      layersContainer.appendChild(foregroundLayer);
      
      hero.insertBefore(layersContainer, heroInner);
    }

    // Parallax scroll handler
    function handleParallaxScroll() {
      const scrolled = window.pageYOffset;
      const heroHeight = hero.offsetHeight;

      // Only apply parallax while hero is in view
      if (scrolled > heroHeight) return;

      // Different speeds for each layer
      const backgroundSpeed = scrolled * 0.5;  // Slowest
      const middleSpeed = scrolled * 0.3;      // Medium
      const foregroundSpeed = scrolled * 0.15; // Fastest

      // Apply transforms using GPU-accelerated properties
      backgroundLayer.style.transform = `translate3d(0, ${backgroundSpeed}px, 0)`;
      middleLayer.style.transform = `translate3d(0, ${middleSpeed}px, 0)`;
      foregroundLayer.style.transform = `translate3d(0, ${foregroundSpeed}px, 0)`;
    }

    // Throttle scroll events for performance
    let ticking = false;
    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleParallaxScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Initial call
    handleParallaxScroll();
  }

  // ============================================================================
  // Timeline Perspective Tilt
  // ============================================================================

  function initTimelinePerspective() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          const windowCenter = window.innerHeight / 2;
          
          // Calculate tilt based on distance from center
          const distance = itemCenter - windowCenter;
          const maxDistance = window.innerHeight / 2;
          const normalizedDistance = Math.max(-1, Math.min(1, distance / maxDistance));
          
          // Apply subtle tilt (max 3 degrees)
          const tiltX = normalizedDistance * 3;
          
          // Add perspective transform
          item.style.transform = `perspective(1000px) rotateX(${tiltX}deg)`;
          item.style.transition = 'transform 0.3s ease-out';
        }
      });
    }, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '0px'
    });

    timelineItems.forEach(item => {
      observer.observe(item);
    });

    // Reset on scroll end
    let scrollEndTimer;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        timelineItems.forEach(item => {
          if (item.getBoundingClientRect().top < window.innerHeight) {
            item.style.transform = 'perspective(1000px) rotateX(0deg)';
          }
        });
      }, 150);
    }, { passive: true });
  }

  // ============================================================================
  // Card Hover Parallax
  // ============================================================================

  function initCardParallax() {
    const cards = document.querySelectorAll('.card, .skill-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        
        // Apply subtle 3D transform
        const rotateY = percentX * 5;  // Max 5 degrees
        const rotateX = -percentY * 5; // Max 5 degrees
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease-out';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.3s ease-out';
      });
    });
  }

  // ============================================================================
  // Smooth Scroll Progress Indicator
  // ============================================================================

  function initScrollProgress() {
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);
    }

    function updateProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial call
  }

  // ============================================================================
  // Initialize All Effects
  // ============================================================================

  function init() {
    initHeroParallax();
    initTimelinePerspective();
    initCardParallax();
    initScrollProgress();
    
    console.log('Parallax effects initialized');
  }

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Re-check if still desktop
      if (window.innerWidth < 768) {
        console.log('Parallax disabled: switched to mobile');
        // Could cleanup here if needed
      }
    }, 250);
  });

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
