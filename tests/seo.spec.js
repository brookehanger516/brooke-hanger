// SEO & Meta Tags Tests
// Validates presence and correctness of meta tags, Open Graph, Twitter Cards, structured data

import { test, expect } from '@playwright/test';

const pages = [
  { url: '/', title: 'Brooke Alexis Hanger - Account Executive' },
  { url: '/about.html', title: 'About' },
  { url: '/experience.html', title: 'Experience' },
  { url: '/automation-lab.html', title: 'Automation Lab' },
  { url: '/resume.html', title: 'Resume' },
  { url: '/contact.html', title: 'Contact' },
];

test.describe('SEO & Meta Tags', () => {
  for (const page of pages) {
    test(`${page.url} has complete meta tags`, async ({ page: browser }) => {
      await browser.goto(page.url);
      
      // Basic meta tags
      await expect(browser.locator('meta[name="description"]')).toHaveCount(1);
      const description = await browser.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description.length).toBeGreaterThan(50);
      
      await expect(browser.locator('meta[name="viewport"]')).toHaveCount(1);
      await expect(browser.locator('meta[name="robots"]')).toHaveCount(1);
      
      // Title
      const title = await browser.title();
      expect(title).toContain(page.title);
      expect(title.length).toBeLessThan(70); // Optimal length
      
      // Canonical
      await expect(browser.locator('link[rel="canonical"]')).toHaveCount(1);
      
      // Open Graph
      await expect(browser.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(browser.locator('meta[property="og:description"]')).toHaveCount(1);
      await expect(browser.locator('meta[property="og:type"]')).toHaveCount(1);
      await expect(browser.locator('meta[property="og:url"]')).toHaveCount(1);
      await expect(browser.locator('meta[property="og:image"]')).toHaveCount(1);
      await expect(browser.locator('meta[property="og:image:alt"]')).toHaveCount(1);
      
      // Twitter Card
      await expect(browser.locator('meta[name="twitter:card"]')).toHaveCount(1);
      await expect(browser.locator('meta[name="twitter:title"]')).toHaveCount(1);
      await expect(browser.locator('meta[name="twitter:description"]')).toHaveCount(1);
      await expect(browser.locator('meta[name="twitter:image"]')).toHaveCount(1);
      
      // Theme color
      await expect(browser.locator('meta[name="theme-color"]')).toHaveCount(1);
      const themeColor = await browser.locator('meta[name="theme-color"]').getAttribute('content');
      expect(themeColor).toBe('#0176d3'); // Salesforce blue
    });
  }

  test('index page has structured data (Person + WebSite)', async ({ page }) => {
    await page.goto('/');
    
    // Check for JSON-LD scripts
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScripts).toHaveCount(2);
    
    // Parse and validate Person schema
    const personScript = await jsonLdScripts.nth(0).textContent();
    const personData = JSON.parse(personScript);
    expect(personData['@type']).toBe('Person');
    expect(personData.name).toBe('Brooke Alexis Hanger');
    expect(personData.jobTitle).toContain('Account Executive');
    expect(personData.knowsLanguage).toContain('en');
    expect(personData.knowsLanguage).toContain('es');
    expect(personData.knowsLanguage).toContain('pt');
    
    // Parse and validate WebSite schema
    const websiteScript = await jsonLdScripts.nth(1).textContent();
    const websiteData = JSON.parse(websiteScript);
    expect(websiteData['@type']).toBe('WebSite');
    expect(websiteData.name).toBeTruthy();
    expect(websiteData.url).toBeTruthy();
  });

  test('social card images exist and are correct size', async ({ page }) => {
    await page.goto('/');
    
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toContain('social-card.jpg');
    
    const twitterImage = await page.locator('meta[name="twitter:image"]').getAttribute('content');
    expect(twitterImage).toContain('social-card.jpg');
    
    // Validate image dimensions meta
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630');
  });

  test('all pages have unique meta descriptions', async ({ page }) => {
    const descriptions = [];
    
    for (const pageData of pages) {
      await page.goto(pageData.url);
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(descriptions).not.toContain(description); // Ensure unique
      descriptions.push(description);
    }
  });
});
