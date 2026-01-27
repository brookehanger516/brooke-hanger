// Contact Form - Client-Side Validation & Submission
// Version: 1.0.0

(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');
  const submittingBtn = document.getElementById('submitting-btn');
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');
  const messageField = document.getElementById('message');
  const charCount = document.getElementById('char-count');

  // Character counter for message field
  if (messageField && charCount) {
    messageField.addEventListener('input', () => {
      charCount.textContent = messageField.value.length;
    });
  }

  // Custom validation messages
  const validationMessages = {
    name: {
      valueMissing: 'Please enter your name.',
      tooShort: 'Name must be at least 2 characters.',
    },
    email: {
      valueMissing: 'Please enter your email address.',
      typeMismatch: 'Please enter a valid email address.',
    },
    subject: {
      valueMissing: 'Please select a subject.',
    },
    message: {
      valueMissing: 'Please enter a message.',
      tooShort: 'Message must be at least 10 characters.',
    },
  };

  // Show error message for a field
  function showError(field, message) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      field.setAttribute('aria-invalid', 'true');
      field.classList.add('error');
    }
  }

  // Clear error message for a field
  function clearError(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      field.removeAttribute('aria-invalid');
      field.classList.remove('error');
    }
  }

  // Validate individual field
  function validateField(field) {
    const validity = field.validity;
    const fieldName = field.name;
    const messages = validationMessages[fieldName];

    if (!messages) return true;

    if (validity.valueMissing) {
      showError(field, messages.valueMissing);
      return false;
    }

    if (validity.typeMismatch) {
      showError(field, messages.typeMismatch);
      return false;
    }

    if (validity.tooShort) {
      showError(field, messages.tooShort);
      return false;
    }

    clearError(field);
    return true;
  }

  // Validate all fields
  function validateForm() {
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Real-time validation on blur
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      if (field.hasAttribute('required')) {
        validateField(field);
      }
    });

    // Clear error on input
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) {
        clearError(field);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateForm()) {
      // Focus first invalid field
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Hide previous messages
    if (successMsg) successMsg.hidden = true;
    if (errorMsg) errorMsg.hidden = true;

    // Show loading state
    if (submitBtn) submitBtn.hidden = true;
    if (submittingBtn) submittingBtn.hidden = false;

    try {
      // Submit to Formspree
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        // Success
        if (successMsg) {
          successMsg.hidden = false;
          successMsg.focus();
        }
        form.reset();
        if (charCount) charCount.textContent = '0';
        
        // Scroll to success message
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      // Error
      console.error('Form submission error:', error);
      if (errorMsg) {
        errorMsg.hidden = false;
        errorMsg.focus();
      }
    } finally {
      // Reset button state
      if (submitBtn) submitBtn.hidden = false;
      if (submittingBtn) submittingBtn.hidden = true;
    }
  });

})();
