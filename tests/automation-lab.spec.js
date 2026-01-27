// Playwright Tests for Automation Lab Dashboard
// Tests: page load, navigation, carousel, tabs, downloads

const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:4173';

test.describe('Automation Lab Dashboard', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/automation-lab.html`);
  });

  test('should load automation lab page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Automation Lab/i);
    await expect(page.locator('h1')).toContainText('Automation Lab');
  });

  test('should have navigation link to automation lab', async ({ page }) => {
    await page.goto(`${BASE_URL}/index.html`);
    const navLink = page.locator('nav a[href="automation-lab.html"]');
    await expect(navLink).toBeVisible();
    await expect(navLink).toContainText(/Automation Lab/i);
  });

  test('should display all major sections', async ({ page }) => {
    // Check KPI section
    await expect(page.locator('.kpi-section')).toBeVisible();
    const kpiCards = page.locator('.kpi-card');
    await expect(kpiCards).toHaveCount(4);

    // Check carousel section
    await expect(page.locator('.carousel-section')).toBeVisible();
    
    // Check video section
    await expect(page.locator('.video-section')).toBeVisible();
    
    // Check download section
    await expect(page.locator('.download-section')).toBeVisible();
    
    // Check flows section
    await expect(page.locator('.flows-section')).toBeVisible();
  });

  test('carousel navigation with buttons', async ({ page }) => {
    const nextBtn = page.locator('.carousel-btn.next');
    const prevBtn = page.locator('.carousel-btn.prev');
    const slides = page.locator('.carousel-slide');

    // First slide should be active
    await expect(slides.first()).toHaveClass(/active/);

    // Click next button
    await nextBtn.click();
    await page.waitForTimeout(300); // Wait for transition
    
    // Second slide should now be active
    await expect(slides.nth(1)).toHaveClass(/active/);

    // Click prev button
    await prevBtn.click();
    await page.waitForTimeout(300);
    
    // First slide should be active again
    await expect(slides.first()).toHaveClass(/active/);
  });

  test('carousel keyboard navigation', async ({ page }) => {
    const carouselContainer = page.locator('.carousel-container');
    const slides = page.locator('.carousel-slide');

    // Focus carousel
    await carouselContainer.focus();

    // First slide active
    await expect(slides.first()).toHaveClass(/active/);

    // Press right arrow
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
    
    // Second slide should be active
    await expect(slides.nth(1)).toHaveClass(/active/);

    // Press left arrow
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(300);
    
    // First slide active again
    await expect(slides.first()).toHaveClass(/active/);
  });

  test('carousel indicators work', async ({ page }) => {
    const indicators = page.locator('.indicator-dot');
    const slides = page.locator('.carousel-slide');

    // Should have 5 indicators (matching 5 slides)
    await expect(indicators).toHaveCount(5);

    // First indicator should be active
    await expect(indicators.first()).toHaveClass(/active/);

    // Click third indicator
    await indicators.nth(2).click();
    await page.waitForTimeout(300);

    // Third slide should be active
    await expect(slides.nth(2)).toHaveClass(/active/);
    await expect(indicators.nth(2)).toHaveClass(/active/);
  });

  test('tab filtering changes visible content', async ({ page }) => {
    const tabs = page.locator('.tab-btn');
    const allTab = tabs.filter({ hasText: 'All Solutions' });
    const salesforceTab = tabs.filter({ hasText: 'Salesforce' });
    const powerbiTab = tabs.filter({ hasText: 'Power BI' });
    const automationTab = tabs.filter({ hasText: 'Automation' });

    // All tab should be active initially
    await expect(allTab).toHaveClass(/active/);

    // Click Salesforce tab
    await salesforceTab.click();
    await expect(salesforceTab).toHaveClass(/active/);
    await expect(allTab).not.toHaveClass(/active/);

    // Check that filtering worked (some items should be filtered)
    const filteredItems = page.locator('.filtered');
    await expect(filteredItems).not.toHaveCount(0);

    // Click Power BI tab
    await powerbiTab.click();
    await expect(powerbiTab).toHaveClass(/active/);

    // Click Automation tab
    await automationTab.click();
    await expect(automationTab).toHaveClass(/active/);

    // Click All tab to reset
    await allTab.click();
    await expect(allTab).toHaveClass(/active/);
  });

  test('download links are present and have correct attributes', async ({ page }) => {
    const downloadCards = page.locator('.download-card');
    
    // Should have 4 download cards
    await expect(downloadCards).toHaveCount(4);

    // Check first download card
    const firstCard = downloadCards.first();
    await expect(firstCard).toHaveAttribute('href', /\.pdf$/);
    await expect(firstCard).toHaveAttribute('download');

    // Check all cards have proper structure
    for (let i = 0; i < 4; i++) {
      const card = downloadCards.nth(i);
      await expect(card.locator('h3')).toBeVisible();
      await expect(card.locator('.download-meta')).toBeVisible();
    }
  });

  test('video cards display and play buttons work', async ({ page }) => {
    const videoCards = page.locator('.video-card');
    
    // Should have 4 video cards
    await expect(videoCards).toHaveCount(4);

    // Each video card should have play button and poster
    for (let i = 0; i < 4; i++) {
      const card = videoCards.nth(i);
      await expect(card.locator('.video-poster')).toBeVisible();
      await expect(card.locator('.video-play-btn')).toBeVisible();
      await expect(card.locator('h3')).toBeVisible();
    }

    // Click play button (should trigger alert in placeholder)
    const firstPlayBtn = videoCards.first().locator('.video-play-btn');
    
    // Listen for dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Video player would open here');
      await dialog.accept();
    });
    
    await firstPlayBtn.click();
  });

  test('flow cards display with proper structure', async ({ page }) => {
    const flowCards = page.locator('.flow-card');
    
    // Should have 3 flow cards
    await expect(flowCards).toHaveCount(3);

    // Each flow should have logo, title, description, steps, and actions
    for (let i = 0; i < 3; i++) {
      const card = flowCards.nth(i);
      await expect(card.locator('.flow-logo')).toBeVisible();
      await expect(card.locator('h3')).toBeVisible();
      await expect(card.locator('.flow-description')).toBeVisible();
      await expect(card.locator('.flow-steps')).toBeVisible();
      await expect(card.locator('.flow-actions')).toBeVisible();
      
      // Should have trigger and action chips
      await expect(card.locator('.flow-chip.trigger')).toBeVisible();
      await expect(card.locator('.flow-chip.action')).toHaveCount(3);
    }
  });

  test('timeframe filter is functional', async ({ page }) => {
    const timeframeSelect = page.locator('#timeframe');
    
    await expect(timeframeSelect).toBeVisible();
    
    // Should have options
    await expect(timeframeSelect.locator('option')).toHaveCount(4);
    
    // Change selection
    await timeframeSelect.selectOption('Last 90 Days');
    await expect(timeframeSelect).toHaveValue('Last 90 Days');
  });

  test('CTA section is visible and links work', async ({ page }) => {
    const ctaSection = page.locator('.cta-section');
    
    await expect(ctaSection).toBeVisible();
    await expect(ctaSection.locator('h2')).toContainText(/Transform Your Sales/i);
    
    const bookDemoBtn = ctaSection.locator('.btn-cta-primary');
    const viewExpBtn = ctaSection.locator('.btn-cta-secondary');
    
    await expect(bookDemoBtn).toHaveAttribute('href', 'contact.html');
    await expect(viewExpBtn).toHaveAttribute('href', 'experience.html');
  });

  test('accessibility: semantic landmarks present', async ({ page }) => {
    // Check for main landmark
    const main = page.locator('main#main');
    await expect(main).toBeVisible();
    
    // Check for header
    const header = page.locator('header.site-header');
    await expect(header).toBeVisible();
    
    // Check for footer
    const footer = page.locator('footer.site-footer');
    await expect(footer).toBeVisible();
    
    // Check for navigation
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('accessibility: skip link present and functional', async ({ page }) => {
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeAttached();
    
    // Focus skip link
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();
    
    // Activate skip link
    await page.keyboard.press('Enter');
    
    // Main content should be focused
    const main = page.locator('main#main');
    await expect(main).toBeFocused();
  });

  test('accessibility: all images have alt text', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });

  test('accessibility: buttons have labels', async ({ page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const ariaLabel = await btn.getAttribute('aria-label');
      const textContent = await btn.textContent();
      
      // Button should have either aria-label or text content
      expect(ariaLabel || textContent?.trim()).toBeTruthy();
    }
  });

  test('responsive: mobile layout at 375px width', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Carousel buttons should be visible but positioned differently
    const prevBtn = page.locator('.carousel-btn.prev');
    const nextBtn = page.locator('.carousel-btn.next');
    
    await expect(prevBtn).toBeVisible();
    await expect(nextBtn).toBeVisible();
    
    // KPI cards should stack vertically
    const kpiGrid = page.locator('.kpi-grid');
    const gridCols = await kpiGrid.evaluate(el => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    
    // Should be single column on mobile
    expect(gridCols).toContain('1fr');
  });

  test('responsive: tablet layout at 768px width', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Video grid should show 2 columns
    const videoGrid = page.locator('.video-grid');
    const gridCols = await videoGrid.evaluate(el => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    
    // Should have 2 columns on tablet
    expect(gridCols.split(' ').length).toBe(2);
  });

  test('responsive: desktop layout at 1200px width', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    
    // KPI grid should show 4 columns
    const kpiGrid = page.locator('.kpi-grid');
    const gridCols = await kpiGrid.evaluate(el => 
      window.getComputedStyle(el).gridTemplateColumns
    );
    
    // Should have 4 columns on desktop
    expect(gridCols.split(' ').length).toBe(4);
  });

  test('performance: page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto(`${BASE_URL}/automation-lab.html`);
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.goto(`${BASE_URL}/automation-lab.html`);
    await page.waitForLoadState('networkidle');
    
    expect(consoleErrors).toHaveLength(0);
  });

});
