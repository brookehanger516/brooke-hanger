// Scroll Animations Framework
// Enhanced portfolio interactions with Intersection Observer

(function () {
  'use strict';

  // Configuration
  const config = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    animationDelay: 100,
  };

  // ============================================================================
  // Intersection Observer Setup
  // ============================================================================

  const observerOptions = {
    threshold: config.threshold,
    rootMargin: config.rootMargin,
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for list items
        const delay = index * config.animationDelay;
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, delay);
        
        // Optionally unobserve after animation
        if (!entry.target.hasAttribute('data-repeat')) {
          animateOnScroll.unobserve(entry.target);
        }
      } else if (entry.target.hasAttribute('data-repeat')) {
        entry.target.classList.remove('is-visible');
      }
    });
  }, observerOptions);

  // ============================================================================
  // Animated Counter
  // ============================================================================

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count') || element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      // Format number with commas
      const formatted = Math.floor(current).toLocaleString();
      const prefix = element.getAttribute('data-prefix') || '';
      const suffix = element.getAttribute('data-suffix') || '';
      
      element.textContent = prefix + formatted + suffix;
    }, 16);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
        entry.target.setAttribute('data-animated', 'true');
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // ============================================================================
  // Sticky Header Enhancement
  // ============================================================================

  function handleHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const scrollThreshold = 50;
    
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // ============================================================================
  // Parallax Effect (Hero Background)
  // ============================================================================

  function handleParallax() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const scrolled = window.scrollY;
    const parallaxSpeed = 0.5;
    
    heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
  }

  // ============================================================================
  // Back to Top Button
  // ============================================================================

  function createBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    `;
    
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    document.body.appendChild(button);

    // Show/hide based on scroll position
    const toggleBackToTop = () => {
      const showThreshold = window.innerHeight * 0.5; // 50vh
      if (window.scrollY > showThreshold) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    toggleBackToTop(); // Initial check
  }

  // ============================================================================
  // Smooth Scroll for Anchor Links
  // ============================================================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ============================================================================
  // Scroll Indicator in Hero
  // ============================================================================

  function createScrollIndicator() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = `
      <span>Scroll to explore</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    `;

    indicator.addEventListener('click', () => {
      const nextSection = heroSection.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    heroSection.appendChild(indicator);

    // Hide indicator after scrolling
    const hideIndicator = () => {
      if (window.scrollY > 100) {
        indicator.style.opacity = '0';
        indicator.style.pointerEvents = 'none';
      } else {
        indicator.style.opacity = '1';
        indicator.style.pointerEvents = 'auto';
      }
    };

    window.addEventListener('scroll', hideIndicator, { passive: true });
  }

  // ============================================================================
  // Initialize
  // ============================================================================

  function init() {
    // Observe elements with fade-in animations
    document.querySelectorAll('.fade-in-up, .fade-in, .slide-in-left, .slide-in-right').forEach((el) => {
      animateOnScroll.observe(el);
    });

    // Observe stats/metric numbers for counter animation
    document.querySelectorAll('.metric-number, [data-counter]').forEach((el) => {
      counterObserver.observe(el);
    });

    // Observe cards for stagger effect
    document.querySelectorAll('.card, .expertise-card, .stats-card, .skill-card, .kpi-card').forEach((el, index) => {
      el.style.setProperty('--animation-order', index);
      animateOnScroll.observe(el);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
      el.style.setProperty('--animation-order', index);
      animateOnScroll.observe(el);
    });

    // Set up scroll handlers
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      
      scrollTimeout = window.requestAnimationFrame(() => {
        handleHeaderScroll();
        
        // Only run parallax on larger screens for performance
        if (window.innerWidth >= 768) {
          handleParallax();
        }
      });
    }, { passive: true });

    // Initialize features
    handleHeaderScroll(); // Initial state
    createBackToTopButton();
    initSmoothScroll();
    createScrollIndicator();

    // Add loaded class to body for entrance animations
    document.body.classList.add('page-loaded');
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
  }
})();
