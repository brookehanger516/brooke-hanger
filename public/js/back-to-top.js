/**
 * Back to Top Button
 * Shows/hides button based on scroll position
 * Smooth scrolls to top when clicked
 */

(function () {
  'use strict';

  const backToTopButton = document.getElementById('back-to-top');
  if (!backToTopButton) return;

  const SCROLL_THRESHOLD = 400; // Show button after scrolling 400px

  // Show/hide button based on scroll position
  function handleScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }

  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  backToTopButton.addEventListener('click', scrollToTop);

  // Initial check
  handleScroll();
})();
