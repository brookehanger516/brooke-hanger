// Skills Section Filter System
// Interactive filtering and animations for skills/expertise cards

(function () {
  'use strict';

  const config = {
    filterBarSelector: '.skills-filter-bar',
    cardSelector: '.skill-card',
    activeClass: 'active',
    animationDelay: 80,
    categories: ['all', 'sales', 'crm', 'ai', 'cloud', 'analytics']
  };

  let currentFilter = 'all';

  /**
   * Initialize skills filter system
   */
  function init() {
    const filterBar = document.querySelector(config.filterBarSelector);
    
    if (!filterBar) {
      return; // Skills section may not exist on all pages
    }

    // Set up filter button listeners
    const filterButtons = filterBar.querySelectorAll('[data-category]');
    filterButtons.forEach(button => {
      button.addEventListener('click', handleFilterClick);
    });

    // Initial state - show all cards
    filterCards('all');
  }

  /**
   * Handle filter button click
   */
  function handleFilterClick(event) {
    const button = event.currentTarget;
    const category = button.getAttribute('data-category');

    // Update active button
    const filterBar = document.querySelector(config.filterBarSelector);
    filterBar.querySelectorAll('[data-category]').forEach(btn => {
      btn.classList.remove(config.activeClass);
      btn.setAttribute('aria-pressed', 'false');
    });
    
    button.classList.add(config.activeClass);
    button.setAttribute('aria-pressed', 'true');

    // Filter cards
    currentFilter = category;
    filterCards(category);
  }

  /**
   * Filter and animate cards
   */
  function filterCards(category) {
    const cards = document.querySelectorAll(config.cardSelector);
    let visibleCount = 0;

    cards.forEach((card, index) => {
      const cardCategories = card.getAttribute('data-categories')?.split(' ') || [];
      const shouldShow = category === 'all' || cardCategories.includes(category);

      if (shouldShow) {
        // Show card with staggered animation
        setTimeout(() => {
          card.classList.remove('filtered-out');
          card.classList.add('filtered-in');
          card.style.order = visibleCount;
          card.setAttribute('aria-hidden', 'false');
        }, visibleCount * config.animationDelay);
        
        visibleCount++;
      } else {
        // Hide card
        card.classList.add('filtered-out');
        card.classList.remove('filtered-in');
        card.style.order = 999;
        card.setAttribute('aria-hidden', 'true');
      }
    });

    // Update count display if it exists
    updateCount(visibleCount);
  }

  /**
   * Update visible count display
   */
  function updateCount(count) {
    const countDisplay = document.querySelector('.skills-count');
    if (countDisplay) {
      countDisplay.textContent = `${count} ${count === 1 ? 'skill' : 'skills'}`;
    }
  }

  /**
   * Get current filter
   */
  function getCurrentFilter() {
    return currentFilter;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API for external access
  window.skillsFilter = {
    getCurrentFilter,
    filterCards
  };
})();
