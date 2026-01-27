// Mobile Navigation & Accessibility Tests
// Tests hamburger menu, focus trap, keyboard navigation, responsive behavior

import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test('hamburger menu opens and closes', async ({ page }) => {
    await page.goto('/');
    
    // Menu should be hidden initially
    const menuOverlay = page.locator('[data-menu-overlay]');
    await expect(menuOverlay).toBeHidden();
    
    // Click hamburger to open
    const menuToggle = page.locator('[data-menu-toggle]');
    await menuToggle.click();
    
    // Menu should be visible
    await expect(menuOverlay).toBeVisible();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    
    // Click again to close
    await menuToggle.click();
    await expect(menuOverlay).toBeHidden();
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('ESC key closes mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Open menu
    await page.locator('[data-menu-toggle]').click();
    await expect(page.locator('[data-menu-overlay]')).toBeVisible();
    
    // Press ESC
    await page.keyboard.press('Escape');
    
    // Menu should close
    await expect(page.locator('[data-menu-overlay]')).toBeHidden();
  });

  test('clicking overlay backdrop closes menu', async ({ page }) => {
    await page.goto('/');
    
    // Open menu
    await page.locator('[data-menu-toggle]').click();
    const overlay = page.locator('[data-menu-overlay]');
    await expect(overlay).toBeVisible();
    
    // Click overlay (not a link)
    await overlay.click({ position: { x: 10, y: 10 } });
    
    // Menu should close
    await expect(overlay).toBeHidden();
  });

  test('focus trap works in mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Open menu
    await page.locator('[data-menu-toggle]').click();
    await expect(page.locator('[data-menu-overlay]')).toBeVisible();
    
    // Get all focusable elements
    const links = page.locator('[data-menu-overlay] a');
    const linkCount = await links.count();
    
    // First link should receive focus
    const firstLink = links.first();
    await expect(firstLink).toBeFocused();
    
    // Tab through all links
    for (let i = 0; i < linkCount - 1; i++) {
      await page.keyboard.press('Tab');
    }
    
    // Last link should now be focused
    const lastLink = links.last();
    await expect(lastLink).toBeFocused();
    
    // Tab once more should cycle to first
    await page.keyboard.press('Tab');
    await expect(firstLink).toBeFocused();
  });

  test('mobile menu works at small viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Hamburger should be visible at mobile size
    const menuToggle = page.locator('[data-menu-toggle]');
    await expect(menuToggle).toBeVisible();
    
    // Open menu
    await menuToggle.click();
    const overlay = page.locator('[data-menu-overlay]');
    await expect(overlay).toBeVisible();
    
    // Menu should occupy full viewport
    const overlayBox = await overlay.boundingBox();
    expect(overlayBox?.width).toBeGreaterThan(300);
  });

  test('desktop nav visible at large viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    
    // Primary nav should be visible
    const primaryNav = page.locator('#primary-nav');
    await expect(primaryNav).toBeVisible();
    
    // Hamburger should be hidden
    const menuToggle = page.locator('[data-menu-toggle]');
    await expect(menuToggle).toBeHidden();
  });

  test('skip link navigates to main content', async ({ page }) => {
    await page.goto('/');
    
    // Focus skip link (first tab)
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeFocused();
    
    // Activate skip link
    await page.keyboard.press('Enter');
    
    // Main content should receive focus
    const main = page.locator('#main');
    await expect(main).toBeFocused();
  });
});
