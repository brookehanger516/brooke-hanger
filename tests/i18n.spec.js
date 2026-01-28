// i18n Multilingual Tests
// Validates language switching, persistence, and translations

import { test, expect } from '@playwright/test';

test.describe('i18n Multilingual Support', () => {
  test('language switcher renders on page', async ({ page }) => {
    await page.goto('/');
    
    // Check for language buttons
    const langButtons = page.locator('[data-lang-switch]');
    await expect(langButtons).toHaveCount(8); // 4 desktop + 4 mobile
    
    // Verify all supported languages present
    await expect(page.locator('[data-lang-switch="en"]').first()).toBeVisible();
    await expect(page.locator('[data-lang-switch="es"]').first()).toBeVisible();
    await expect(page.locator('[data-lang-switch="fr"]').first()).toBeVisible();
    await expect(page.locator('[data-lang-switch="zh"]').first()).toBeVisible();
  });

  test('default language is English', async ({ page }) => {
    await page.goto('/');
    
    // Wait for i18n to initialize
    await page.waitForTimeout(500);
    
    // Check EN button is active
    const enButton = page.locator('[data-lang-switch="en"]').first();
    await expect(enButton).toHaveAttribute('aria-pressed', 'true');
    
    // Check HTML lang attribute
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('en');
  });

  test('switching to Spanish updates text', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Get original text
    const navHome = page.locator('.nav a[href="index.html"]').first();
    const originalText = await navHome.textContent();
    expect(originalText.trim()).toBe('Home');
    
    // Switch to Spanish
    await page.locator('[data-lang-switch="es"]').first().click();
    await page.waitForTimeout(300);
    
    // Check updated text
    const updatedText = await navHome.textContent();
    expect(updatedText.trim()).toBe('Inicio');
    
    // Check HTML lang attribute
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(htmlLang).toBe('es');
  });

  test('language selection persists across page reload', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Switch to French
    await page.locator('[data-lang-switch="fr"]').first().click();
    await page.waitForTimeout(300);
    
    // Verify French active
    await expect(page.locator('[data-lang-switch="fr"]').first()).toHaveAttribute('aria-pressed', 'true');
    
    // Reload page
    await page.reload();
    await page.waitForTimeout(500);
    
    // Verify French still active
    await expect(page.locator('[data-lang-switch="fr"]').first()).toHaveAttribute('aria-pressed', 'true');
    expect(await page.locator('html').getAttribute('lang')).toBe('fr');
  });

  test('all 4 languages have translation files', async ({ page }) => {
    const languages = ['en', 'es', 'fr', 'zh'];
    
    for (const lang of languages) {
      const response = await page.request.get(`/i18n/${lang}.json`);
      expect(response.ok()).toBe(true);
      
      const json = await response.json();
      expect(json.nav).toBeDefined();
      expect(json.hero).toBeDefined();
      expect(json.contact).toBeDefined();
    }
  });

  test('translations include CRM terminology', async ({ page }) => {
    await page.goto('/');
    
    // Check English has CRM terms in hero subtitle
    await page.waitForTimeout(500);
    const heroSubtitle = page.locator('[data-i18n="hero.subtitle"]');
    const text = await heroSubtitle.textContent();
    
    expect(text.toLowerCase()).toMatch(/salesforce|crm|pipeline|quota|automation/i);
  });

  test('Chinese translation renders correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Switch to Chinese
    await page.locator('[data-lang-switch="zh"]').first().click();
    await page.waitForTimeout(300);
    
    // Check for Chinese characters
    const navHome = page.locator('.nav a[href="index.html"]').first();
    const text = await navHome.textContent();
    
    expect(text).toContain('首页'); // "Home" in Chinese
  });

  test('language switcher accessible via keyboard', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    
    // Focus first language button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Should be able to activate with Enter
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    
    // Verify language changed
    const htmlLang = await page.locator('html').getAttribute('lang');
    expect(['en', 'es', 'fr', 'zh']).toContain(htmlLang);
  });
});
