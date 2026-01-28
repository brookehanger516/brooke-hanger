// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Resume Page', () => {
  
  test('page renders with correct metadata', async ({ page }) => {
    await page.goto('/resume-new.html');
    
    // Check title
    await expect(page).toHaveTitle(/Brooke Alexis Hanger.*Resume/i);
    
    // Check meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toContain('Account Executive');
    expect(description).toContain('Cloud');
    
    // Check canonical link
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('/resume');
    
    // Check alternate JSON link
    const jsonLink = await page.locator('link[rel="alternate"][type="application/json"]');
    await expect(jsonLink).toHaveAttribute('href', '/assets/data/resume.json');
  });

  test('JSON-LD structured data is present and valid', async ({ page }) => {
    await page.goto('/resume-new.html');
    
    const jsonLdScript = page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();
    
    const jsonContent = await jsonLdScript.textContent();
    expect(jsonContent).toBeTruthy();
    
    // Parse and validate structure
    let schema;
    expect(() => {
      schema = JSON.parse(jsonContent);
    }).not.toThrow();
    
    // Validate Person schema
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe('Brooke Alexis Hanger');
    expect(schema.email).toBe('brookehanger@gmail.com');
    expect(schema.jobTitle).toContain('Account Executive');
    
    // Check languages
    expect(schema.knowsLanguage).toBeDefined();
    expect(schema.knowsLanguage.length).toBeGreaterThanOrEqual(4);
    
    // Check credentials
    expect(schema.hasCredential).toBeDefined();
    expect(schema.hasCredential[0].name).toContain('Salesforce');
    
    // Check education
    expect(schema.alumniOf).toBeDefined();
    expect(schema.alumniOf.name).toContain('James Madison');
  });

  test('resume content sections are present', async ({ page }) => {
    await page.goto('/resume-new.html');
    
    // Check main sections
    await expect(page.locator('h2:has-text("Professional Summary")')).toBeVisible();
    await expect(page.locator('h2:has-text("Professional Experience")')).toBeVisible();
    await expect(page.locator('h2:has-text("Education")')).toBeVisible();
    await expect(page.locator('h2:has-text("Certifications")')).toBeVisible();
    await expect(page.locator('h2:has-text("Core Skills")')).toBeVisible();
    await expect(page.locator('h2:has-text("Languages")')).toBeVisible();
    
    // Check key content
    await expect(page.locator('text=Cloud Compute')).toBeVisible();
    await expect(page.locator('text=Salesforce Certified Associate')).toBeVisible();
    await expect(page.locator('text=James Madison University')).toBeVisible();
  });

  test('action buttons are present and keyboard accessible', async ({ page }) => {
    await page.goto('/resume-new.html');
    
    const downloadPdf = page.locator('#download-pdf');
    const downloadJson = page.locator('#download-json');
    const copyLink = page.locator('#copy-link');
    
    // Check visibility
    await expect(downloadPdf).toBeVisible();
    await expect(downloadJson).toBeVisible();
    await expect(copyLink).toBeVisible();
    
    // Check ARIA labels
    await expect(downloadPdf).toHaveAttribute('aria-label', /PDF/i);
    await expect(downloadJson).toHaveAttribute('aria-label', /JSON/i);
    await expect(copyLink).toHaveAttribute('aria-label', /link/i);
    
    // Check keyboard focusability
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.id);
    expect(['download-pdf', 'download-json', 'copy-link']).toContain(focused);
  });

  test('JSON file is accessible and valid', async ({ page }) => {
    const response = await page.request.get('/assets/data/resume.json');
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');
    
    const json = await response.json();
    
    // Validate JSON Resume schema basics
    expect(json.basics).toBeDefined();
    expect(json.basics.name).toBe('Brooke Alexis Hanger');
    expect(json.basics.email).toBe('brookehanger@gmail.com');
    expect(json.basics.label).toContain('Account Executive');
    
    // Check work history
    expect(json.work).toBeDefined();
    expect(Array.isArray(json.work)).toBe(true);
    expect(json.work.length).toBeGreaterThan(0);
    
    const currentJob = json.work[0];
    expect(currentJob.name).toBe('Cloud Compute');
    expect(currentJob.position).toContain('Account Executive');
    expect(currentJob.highlights).toBeDefined();
    expect(currentJob.highlights.length).toBeGreaterThan(0);
    
    // Check education
    expect(json.education).toBeDefined();
    expect(json.education[0].institution).toContain('James Madison');
    
    // Check skills
    expect(json.skills).toBeDefined();
    expect(json.skills.length).toBeGreaterThan(0);
    
    // Check languages
    expect(json.languages).toBeDefined();
    expect(json.languages.length).toBe(4);
    const langNames = json.languages.map(l => l.language);
    expect(langNames).toContain('English');
    expect(langNames).toContain('Spanish');
    expect(langNames).toContain('French');
    expect(langNames).toContain('Chinese');
    
    // Check certificates
    expect(json.certificates).toBeDefined();
    const certNames = json.certificates.map(c => c.name);
    expect(certNames).toContain('Salesforce Certified Associate');
  });

  test('print styles hide navigation and format for print', async ({ page }) => {
    await page.goto('/resume-new.html');
    
    // Emulate print media
    await page.emulateMedia({ media: 'print' });
    
    // Check that screen-only elements are hidden
    const actions = page.locator('.resume-actions');
    const header = page.locator('#header-placeholder');
    
    await expect(actions).toBeHidden();
    await expect(header).toBeHidden();
    
    // Check that print header is visible
    const printHeader = page.locator('.print-header');
    await expect(printHeader).toBeVisible();
    await expect(printHeader.locator('h1')).toContainText('Brooke Alexis Hanger');
    
    // Check main content still visible
    const mainContent = page.locator('.resume-content');
    await expect(mainContent).toBeVisible();
  });

  test('download JSON button triggers file download', async ({ page }) => {
    await page.goto('/resume-new.html');
    
    // Set up download listener
    const downloadPromise = page.waitForEvent('download');
    
    await page.locator('#download-json').click();
    
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain('resume.json');
  });

  test('copy link button copies URL to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/resume-new.html');
    
    await page.locator('#copy-link').click();
    
    // Wait for feedback
    await page.waitForTimeout(500);
    
    // Check button feedback
    const buttonText = await page.locator('#copy-link').textContent();
    expect(buttonText).toContain('Copied');
    
    // Verify clipboard content
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('/resume');
  });

  test('expandable job sections work correctly', async ({ page }) => {
    await page.goto('/resume-new.html');
    
    const detailsElement = page.locator('details.job-group');
    await expect(detailsElement).toBeAttached();
    
    // Should be collapsed initially
    const isOpen = await detailsElement.evaluate(el => el.hasAttribute('open'));
    expect(isOpen).toBe(false);
    
    // Click to expand
    await detailsElement.locator('summary').click();
    
    // Should now be open
    const isOpenAfter = await detailsElement.evaluate(el => el.hasAttribute('open'));
    expect(isOpenAfter).toBe(true);
    
    // Check that additional jobs are visible
    await expect(page.locator('text=Adjunct Professor')).toBeVisible();
    await expect(page.locator('text=University of New Hampshire')).toBeVisible();
  });

  test('semantic HTML structure and accessibility', async ({ page }) => {
    await page.goto('/resume-new.html');
    
    // Check skip link
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main');
    
    // Check main landmark
    const main = page.locator('main#main');
    await expect(main).toBeAttached();
    await expect(main).toHaveAttribute('tabindex', '-1');
    
    // Check heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Check time elements have datetime
    const timeElements = await page.locator('time').all();
    for (const time of timeElements) {
      const datetime = await time.getAttribute('datetime');
      expect(datetime).toBeTruthy();
    }
    
    // Check links have accessible text
    const links = await page.locator('a').all();
    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/resume-new.html');
    
    // Check that content is visible
    await expect(page.locator('.resume-name')).toBeVisible();
    
    // Check that action buttons stack properly
    const actions = page.locator('.resume-actions .container');
    const box = await actions.boundingBox();
    expect(box.width).toBeLessThan(600);
    
    // Check job headers stack on mobile
    const jobHeader = page.locator('.job-header').first();
    await expect(jobHeader).toBeVisible();
  });

  test('reduced motion preference is respected', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/resume-new.html');
    
    // Check that transitions are disabled
    const button = page.locator('#download-json');
    const transition = await button.evaluate(el => 
      window.getComputedStyle(el).transition
    );
    
    expect(transition).toBe('none');
  });

});
