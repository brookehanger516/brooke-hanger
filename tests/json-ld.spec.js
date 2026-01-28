// JSON-LD Structured Data Tests
// Validates Schema.org markup across pages

import { test, expect } from '@playwright/test';

test.describe('JSON-LD Structured Data', () => {
  test('index page has valid JSON-LD graph', async ({ page }) => {
    await page.goto('/');
    
    // Find JSON-LD script
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScripts).toHaveCount(1);
    
    // Parse and validate
    const jsonLdContent = await jsonLdScripts.first().textContent();
    expect(jsonLdContent).toBeTruthy();
    
    let schema;
    expect(() => {
      schema = JSON.parse(jsonLdContent);
    }).not.toThrow();
    
    // Validate @graph structure
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@graph']).toBeDefined();
    expect(Array.isArray(schema['@graph'])).toBe(true);
    
    // Find entities
    const person = schema['@graph'].find(item => item['@type'] === 'Person');
    const website = schema['@graph'].find(item => item['@type'] === 'WebSite');
    const org = schema['@graph'].find(item => item['@type'] === 'Organization');
    
    // Validate Person entity
    expect(person).toBeDefined();
    expect(person['@id']).toBe('https://brookehanger.com/#person');
    expect(person.name).toBe('Brooke Alexis Hanger');
    expect(person.jobTitle).toContain('Account Executive');
    expect(person.knowsLanguage).toBeDefined();
    expect(person.knowsLanguage.length).toBeGreaterThanOrEqual(4);
    expect(person.knowsAbout).toBeDefined();
    expect(person.knowsAbout).toContain('Salesforce CRM');
    expect(person.sameAs).toBeDefined();
    expect(Array.isArray(person.sameAs)).toBe(true);
    
    // Validate WebSite entity
    expect(website).toBeDefined();
    expect(website['@id']).toBe('https://brookehanger.com/#website');
    expect(website.url).toBe('https://brookehanger.com/');
    expect(website.inLanguage).toContain('en');
    expect(website.inLanguage).toContain('es');
    expect(website.author['@id']).toBe('https://brookehanger.com/#person');
    
    // Validate Organization entity
    expect(org).toBeDefined();
    expect(org['@id']).toBe('https://brookehanger.com/#organization');
    expect(org.employee['@id']).toBe('https://brookehanger.com/#person');
  });

  test('JSON-LD has stable @id references', async ({ page }) => {
    await page.goto('/');
    
    const jsonLdContent = await page.locator('script[type="application/ld+json"]').first().textContent();
    const schema = JSON.parse(jsonLdContent);
    
    // Collect all @id values
    const ids = schema['@graph']
      .filter(item => item['@id'])
      .map(item => item['@id']);
    
    // Ensure no duplicate IDs
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
    
    // Ensure IDs use canonical domain
    ids.forEach(id => {
      expect(id).toContain('brookehanger.com');
      expect(id).toContain('#');
    });
  });

  test('JSON-LD includes CRM/sales terminology', async ({ page }) => {
    await page.goto('/');
    
    const jsonLdContent = await page.locator('script[type="application/ld+json"]').first().textContent();
    const schema = JSON.parse(jsonLdContent);
    
    const person = schema['@graph'].find(item => item['@type'] === 'Person');
    const knowsAbout = person.knowsAbout.join(' ');
    
    // Check for professional CRM terms
    expect(knowsAbout.toLowerCase()).toContain('salesforce');
    expect(knowsAbout.toLowerCase()).toContain('crm');
    expect(knowsAbout.toLowerCase()).toMatch(/pipeline|quota|forecast|automation/i);
  });

  test('all pages have JSON-LD present', async ({ page }) => {
    const pages = ['/', '/about.html', '/automation-lab.html', '/contact.html'];
    
    for (const url of pages) {
      await page.goto(url);
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').count();
      expect(jsonLdScripts).toBeGreaterThanOrEqual(1);
    }
  });
});
