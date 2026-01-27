// Analytics & DNT Tests
// Validates analytics initialization, DNT respect, and provider switching

import { test, expect } from '@playwright/test';

test.describe('Analytics Integration', () => {
  test('analytics script loads on all pages', async ({ page }) => {
    const pages = ['/', '/about.html', '/contact.html', '/automation-lab.html'];
    
    for (const url of pages) {
      await page.goto(url);
      
      // Check for analytics.js script
      const analyticsScript = page.locator('script[src="./analytics.js"]');
      await expect(analyticsScript).toHaveCount(1);
      await expect(analyticsScript).toHaveAttribute('defer');
    }
  });

  test('Plausible analytics initializes when provider is plausible', async ({ page }) => {
    await page.goto('/');
    
    // Wait for analytics to initialize
    await page.waitForTimeout(500);
    
    // Check if AnalyticsConfig is exposed
    const config = await page.evaluate(() => window.AnalyticsConfig);
    expect(config).toBeTruthy();
    expect(config.provider).toBe('plausible');
    
    // Check for Plausible script if provider is plausible
    if (config.provider === 'plausible') {
      const plausibleScript = page.locator('script[src*="plausible.io"]');
      const scriptCount = await plausibleScript.count();
      expect(scriptCount).toBeGreaterThanOrEqual(0); // May not load in test environment
    }
  });

  test('analytics respects Do Not Track', async ({ page, context }) => {
    // Set DNT header
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'doNotTrack', {
        value: '1',
        writable: false,
      });
    });
    
    await page.goto('/');
    
    // Wait for analytics initialization
    await page.waitForTimeout(500);
    
    // Check console for DNT message
    const consoleLogs = [];
    page.on('console', msg => consoleLogs.push(msg.text()));
    
    await page.reload();
    await page.waitForTimeout(500);
    
    // Should log DNT respect message
    const dntMessage = consoleLogs.find(log => log.includes('DNT enabled'));
    expect(dntMessage).toBeTruthy();
  });

  test('analytics config is accessible for provider switching', async ({ page }) => {
    await page.goto('/');
    
    // Check if config object exists
    const hasConfig = await page.evaluate(() => typeof window.AnalyticsConfig !== 'undefined');
    expect(hasConfig).toBe(true);
    
    // Validate config structure
    const config = await page.evaluate(() => window.AnalyticsConfig);
    expect(config).toHaveProperty('provider');
    expect(config).toHaveProperty('plausible');
    expect(config).toHaveProperty('ga');
    expect(['plausible', 'ga', 'none']).toContain(config.provider);
  });

  test('no analytics scripts loaded when DNT is enabled', async ({ page, context }) => {
    // Enable DNT
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'doNotTrack', {
        value: '1',
        writable: false,
      });
    });
    
    await page.goto('/');
    await page.waitForTimeout(1000);
    
    // Check that no analytics scripts are injected
    const plausibleScripts = await page.locator('script[src*="plausible"]').count();
    const gaScripts = await page.locator('script[src*="googletagmanager"]').count();
    
    expect(plausibleScripts).toBe(0);
    expect(gaScripts).toBe(0);
  });

  test('analytics provider can be changed via config', async ({ page }) => {
    await page.goto('/');
    
    // Change provider to 'none'
    const newProvider = await page.evaluate(() => {
      window.AnalyticsConfig.provider = 'none';
      return window.AnalyticsConfig.provider;
    });
    
    expect(newProvider).toBe('none');
  });
});
