/**
 * Resume Page Interactive Features
 * - Download JSON/PDF
 * - Copy share link
 * - Respects prefers-reduced-motion
 */

(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Download JSON resume
  const downloadJsonBtn = document.getElementById('download-json');
  if (downloadJsonBtn) {
    downloadJsonBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('/assets/data/resume.json');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'brooke-hanger-resume.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showFeedback(downloadJsonBtn, 'Downloaded!');
      } catch (error) {
        console.error('Error downloading JSON:', error);
        showFeedback(downloadJsonBtn, 'Error', true);
      }
    });
  }

  // Print to PDF
  const downloadPdfBtn = document.getElementById('download-pdf');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Copy share link
  const copyLinkBtn = document.getElementById('copy-link');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
      const url = window.location.origin + '/resume';
      
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
          showFeedback(copyLinkBtn, 'Copied!');
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = url;
          textarea.style.position = 'fixed';
          textarea.style.left = '-999999px';
          textarea.style.top = '-999999px';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          try {
            document.execCommand('copy');
            showFeedback(copyLinkBtn, 'Copied!');
          } catch (err) {
            console.error('Fallback copy failed:', err);
            showFeedback(copyLinkBtn, 'Error', true);
          }
          document.body.removeChild(textarea);
        }
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        showFeedback(copyLinkBtn, 'Error', true);
      }
    });
  }

  /**
   * Show temporary feedback on button
   * @param {HTMLElement} button - The button element
   * @param {string} message - Feedback message
   * @param {boolean} isError - Whether this is an error message
   */
  function showFeedback(button, message, isError = false) {
    const originalText = button.innerHTML;
    const originalBg = button.style.background;
    
    button.innerHTML = message;
    
    if (!prefersReducedMotion) {
      button.style.background = isError ? '#c23934' : '#2e844a';
      button.style.color = '#fff';
    }
    
    button.disabled = true;
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = originalBg;
      button.style.color = '';
      button.disabled = false;
    }, 2000);
  }

  // Expand/collapse details on print
  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('details').forEach(details => {
      details.setAttribute('open', '');
    });
  });

  // Keyboard navigation enhancement
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + P: Print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      window.print();
    }
    
    // Ctrl/Cmd + S: Download JSON
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      downloadJsonBtn?.click();
    }
  });

  // Announce page load for screen readers
  const main = document.getElementById('main');
  if (main) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'visually-hidden';
    announcement.textContent = 'Resume page loaded. Use Download PDF, Download JSON, or Copy Link buttons to export.';
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      announcement.remove();
    }, 3000);
  }

})();
