// Scrollspy Navigation Highlighter
// Uses IntersectionObserver for performance

(function () {
  'use strict';

  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const sections = [];
  
  // Build section map
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '#') {
      const sectionId = href.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        sections.push({ id: sectionId, element: section, link });
      }
    }
  });

  if (sections.length === 0) return;

  // IntersectionObserver callback
  function onIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeSection = sections.find(s => s.element === entry.target);
        if (activeSection) {
          // Remove active from all
          sections.forEach(s => {
            s.link.classList.remove('active');
            s.link.removeAttribute('aria-current');
          });
          
          // Add active to current
          activeSection.link.classList.add('active');
          activeSection.link.setAttribute('aria-current', 'location');
        }
      }
    });
  }

  // Create observer
  const observer = new IntersectionObserver(onIntersect, {
    rootMargin: '-20% 0px -35% 0px',
    threshold: 0,
  });

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section.element);
  });

  // Smooth scroll with focus management
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          // Smooth scroll
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Focus management for accessibility
          setTimeout(() => {
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            
            // Remove tabindex after focus
            target.addEventListener('blur', () => {
              target.removeAttribute('tabindex');
            }, { once: true });
          }, 500);
        }
      }
    });
  });

  console.info('[Scrollspy] Initialized with', sections.length, 'sections');
})();
