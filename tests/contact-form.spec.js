// Contact Form Tests
// Validates form validation, submission, error handling, accessibility

import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-new.html');
  });

  test('form renders with all required fields', async ({ page }) => {
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#subject')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('required field validation works', async ({ page }) => {
    // Try to submit empty form
    await page.locator('button[type="submit"]').click();
    
    // Check for validation errors
    await expect(page.locator('#name-error')).toContainText('Please enter your name');
    await expect(page.locator('#email-error')).toContainText('Please enter your email');
    await expect(page.locator('#subject-error')).toContainText('Please select a subject');
    await expect(page.locator('#message-error')).toContainText('Please enter a message');
  });

  test('email field validates email format', async ({ page }) => {
    const emailInput = page.locator('#email');
    
    // Enter invalid email
    await emailInput.fill('invalid-email');
    await emailInput.blur();
    
    // Check for error
    await expect(page.locator('#email-error')).toContainText('valid email');
  });

  test('name field enforces minimum length', async ({ page }) => {
    const nameInput = page.locator('#name');
    
    // Enter single character
    await nameInput.fill('A');
    await nameInput.blur();
    
    // Check for error
    await expect(page.locator('#name-error')).toContainText('at least 2 characters');
  });

  test('message field enforces minimum length', async ({ page }) => {
    const messageInput = page.locator('#message');
    
    // Enter short message
    await messageInput.fill('Hi');
    await messageInput.blur();
    
    // Check for error
    await expect(page.locator('#message-error')).toContainText('at least 10 characters');
  });

  test('character counter updates for message field', async ({ page }) => {
    const messageInput = page.locator('#message');
    const charCount = page.locator('#char-count');
    
    // Initially 0
    await expect(charCount).toHaveText('0');
    
    // Type message
    const testMessage = 'This is a test message';
    await messageInput.fill(testMessage);
    
    // Counter should update
    await expect(charCount).toHaveText(testMessage.length.toString());
  });

  test('honeypot field is hidden', async ({ page }) => {
    const honeypot = page.locator('input[name="_gotcha"]');
    await expect(honeypot).toBeHidden();
  });

  test('form fields have proper labels and ARIA attributes', async ({ page }) => {
    // Name field
    const nameLabel = page.locator('label[for="name"]');
    await expect(nameLabel).toBeVisible();
    await expect(page.locator('#name')).toHaveAttribute('aria-describedby', 'name-error');
    
    // Email field
    const emailLabel = page.locator('label[for="email"]');
    await expect(emailLabel).toBeVisible();
    await expect(page.locator('#email')).toHaveAttribute('aria-describedby', 'email-error');
    
    // Message field
    const messageLabel = page.locator('label[for="message"]');
    await expect(messageLabel).toBeVisible();
    await expect(page.locator('#message')).toHaveAttribute('aria-describedby', 'message-error');
  });

  test('invalid fields get aria-invalid attribute', async ({ page }) => {
    // Submit empty form
    await page.locator('button[type="submit"]').click();
    
    // Check aria-invalid on required fields
    await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true');
    await expect(page.locator('#message')).toHaveAttribute('aria-invalid', 'true');
  });

  test('errors clear when user starts typing', async ({ page }) => {
    const nameInput = page.locator('#name');
    const nameError = page.locator('#name-error');
    
    // Trigger validation error
    await page.locator('button[type="submit"]').click();
    await expect(nameError).toContainText('Please enter your name');
    
    // Start typing
    await nameInput.fill('J');
    
    // Error should clear
    await expect(nameError).toBeEmpty();
  });

  test('form has proper autocomplete attributes', async ({ page }) => {
    await expect(page.locator('#name')).toHaveAttribute('autocomplete', 'name');
    await expect(page.locator('#email')).toHaveAttribute('autocomplete', 'email');
    await expect(page.locator('#company')).toHaveAttribute('autocomplete', 'organization');
  });

  test('submit button shows loading state', async ({ page }) => {
    // Fill form with valid data
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#subject').selectOption('General Inquiry');
    await page.locator('#message').fill('This is a test message with sufficient length.');
    
    // Mock form submission to intercept
    await page.route('**/formspree.io/**', route => route.abort());
    
    // Submit form
    await page.locator('button[type="submit"]').click();
    
    // Loading button should appear briefly
    await expect(page.locator('#submitting-btn')).toBeVisible();
  });

  test('form has privacy notice', async ({ page }) => {
    const privacyText = page.getByText(/privacy/i);
    await expect(privacyText).toBeVisible();
  });

  test('form is keyboard navigable', async ({ page }) => {
    // Tab through all form fields
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Name
    await expect(page.locator('#name')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Email
    await expect(page.locator('#email')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Company
    await expect(page.locator('#company')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Subject
    await expect(page.locator('#subject')).toBeFocused();
    
    await page.keyboard.press('Tab'); // Message
    await expect(page.locator('#message')).toBeFocused();
  });
});

test.describe('Contact Form - Responsive', () => {
  test('form is usable on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact-new.html');
    
    // Form should be visible and not overflow
    const form = page.locator('#contact-form');
    await expect(form).toBeVisible();
    
    const formBox = await form.boundingBox();
    expect(formBox?.width).toBeLessThanOrEqual(375);
    
    // All fields should be touchable (min 44px height)
    const nameInput = page.locator('#name');
    const inputBox = await nameInput.boundingBox();
    expect(inputBox?.height).toBeGreaterThanOrEqual(44);
  });
});
