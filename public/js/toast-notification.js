// Toast Notification System
// Slide-in notifications with auto-dismiss

(function () {
  'use strict';

  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  toastContainer.setAttribute('aria-live', 'polite');
  toastContainer.setAttribute('aria-atomic', 'true');

  let toastIdCounter = 0;

  /**
   * Show a toast notification
   * @param {string} message - Message to display
   * @param {string} type - Type: 'success', 'error', 'info', 'warning'
   * @param {number} duration - Auto-dismiss duration in ms (0 = no auto-dismiss)
   * @returns {HTMLElement} - Toast element
   */
  function showToast(message, type = 'info', duration = 4000) {
    // Add container to DOM if not already present
    if (!toastContainer.parentElement) {
      document.body.appendChild(toastContainer);
    }

    const toastId = `toast-${++toastIdCounter}`;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.id = toastId;
    toast.setAttribute('role', 'status');

    // Icon based on type
    const icons = {
      success: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      error: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M15 9l-6 6m0-6l6 6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      warning: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round"/>
        <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
      </svg>`,
      info: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4m0-4h.01" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Close notification">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 5L5 15M5 5l10 10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;

    // Close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      dismissToast(toast);
    });

    // Add to container with slide-in animation
    toastContainer.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('toast-visible');
    });

    // Auto-dismiss
    if (duration > 0) {
      setTimeout(() => {
        dismissToast(toast);
      }, duration);
    }

    return toast;
  }

  /**
   * Dismiss a toast
   * @param {HTMLElement} toast - Toast element to dismiss
   */
  function dismissToast(toast) {
    if (!toast || !toast.parentElement) return;

    toast.classList.remove('toast-visible');
    toast.classList.add('toast-dismissing');

    setTimeout(() => {
      toast.remove();
      
      // Remove container if empty
      if (toastContainer.children.length === 0) {
        toastContainer.remove();
      }
    }, 300);
  }

  /**
   * Dismiss all toasts
   */
  function dismissAllToasts() {
    const toasts = toastContainer.querySelectorAll('.toast');
    toasts.forEach(toast => dismissToast(toast));
  }

  // Public API
  window.toast = {
    show: showToast,
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
    info: (message, duration) => showToast(message, 'info', duration),
    dismiss: dismissToast,
    dismissAll: dismissAllToasts
  };

})();
