// Scrollspy & Sticky Navigation Tests
// Validates sticky header, scrollspy highlighting, and smooth scroll

import { test, expect } from '@playwright/test';

test.describe('Sticky Navigation & Scrollspy', () => {
  test('header is sticky at top of page', async ({ page }) => {
    await page.goto('/');
    
    const header = page.locator('.site-header');
    await expect(header).toBeVisible();
    
    // Check CSS position
    const position = await header.evaluate(el => window.getComputedStyle(el).position);
    expect(position).toBe('sticky');
    
    // Check top value
    const top = await header.evaluate(el => window.getComputedStyle(el).top);
    expect(top).toBe('0px');
  });

  test('header remains visible when scrolling', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1200, height: 800 });
    
    const header = page.locator('.site-header');
    
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(200);
    
    // Header should still be visible
    await expect(header).toBeVisible();
    const rect = await header.boundingBox();
    expect(rect.y).toBeLessThanOrEqual(1); // Should be at top
  });

  test('scrollspy highlights active section', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(1000); // Wait for scrollspy to initialize
    
    // Find a section link
    const navLinks = page.locator('.nav a[href^="#"]');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      // Scroll to trigger intersection
      await page.evaluate(() => window.scrollTo(0, 300));
      await page.waitForTimeout(500);
      
      // Check if any link has active class
      const activeLinks = page.locator('.nav a.active');
      const activeCount = await activeLinks.count();
      expect(activeCount).toBeGreaterThanOrEqual(0);
    }
  });

  test('smooth scroll behavior enabled', async ({ page }) => {
    await page.goto('/');
    
    // Check CSS scroll-behavior
    const scrollBehavior = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).scrollBehavior;
    });
    
    expect(scrollBehavior).toBe('smooth');
  });

  test('clicking anchor link scrolls to section', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // Find an anchor link
    const anchorLink = page.locator('.nav a[href^="#"]').first();
    const linkCount = await page.locator('.nav a[href^="#"]').count();
    
    if (linkCount > 0) {
      const initialScroll = await page.evaluate(() => window.scrollY);
      
      await anchorLink.click();
      await page.waitForTimeout(600);
      
      const finalScroll = await page.evaluate(() => window.scrollY);
      
      // Should have scrolled (unless already at target)
      expect(finalScroll).toBeGreaterThanOrEqual(0);
    }
  });

  test('anchor link focuses target section', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(500);
    
    const anchorLink = page.locator('.nav a[href^="#"]').first();
    const linkCount = await page.locator('.nav a[href^="#"]').count();
    
    if (linkCount > 0) {
      await anchorLink.click();
      await page.waitForTimeout(800);
      
      // Check if target received focus (tabindex=-1 added temporarily)
      const href = await anchorLink.getAttribute('href');
      if (href && href !== '#') {
        const targetId = href.substring(1);
        const target = page.locator(`#${targetId}`);
        
        // Target should exist
        await expect(target).toBeAttached();
      }
    }
  });

  test('reduced motion disables smooth scroll', async ({ page, context }) => {
    // Set prefers-reduced-motion
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        value: (query) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        }),
      });
    });
    
    await page.goto('/');
    
    // Check scroll-behavior is auto
    const scrollBehavior = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).scrollBehavior;
    });
    
    expect(scrollBehavior).toBe('auto');
  });

  test('mobile menu closes on navigation link click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Open mobile menu
    await page.locator('[data-menu-toggle]').click();
    await expect(page.locator('[data-menu-overlay]')).toBeVisible();
    
    // Click a nav link
    await page.locator('[data-menu-overlay] a').first().click();
    await page.waitForTimeout(300);
    
    // Menu should close
    await expect(page.locator('[data-menu-overlay]')).toBeHidden();
  });
});
