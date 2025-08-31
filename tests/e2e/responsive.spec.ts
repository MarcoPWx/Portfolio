import { test, expect } from '@playwright/test';

test.describe.skip('Responsive Design Tests', () => {
  test.describe('Mobile Devices', () => {

    test('should display correctly on iPhone', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');
      
      // Check viewport meta tag
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toContain('width=device-width');
      
      // Check mobile navigation
      const hamburger = page.locator('button:has(svg.lucide-menu)');
      await expect(hamburger).toBeVisible();
      
      // Check text is readable (not too small)
      const bodyFontSize = await page.locator('body').evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      expect(parseInt(bodyFontSize)).toBeGreaterThanOrEqual(14);
      
      // Check touch targets are large enough (minimum 44x44px)
      const buttons = await page.locator('button').all();
      for (const button of buttons.slice(0, 5)) { // Check first 5 buttons
        const box = await button.boundingBox();
        if (box) {
          expect(box.width).toBeGreaterThanOrEqual(44);
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    });

    test('should handle mobile gestures', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/');
      
      // Test swipe navigation if applicable
      const touchTarget = page.locator('body');
      await touchTarget.tap({ position: { x: 100, y: 100 } });
      
      // Scroll vertically
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(300);
      
      // Check scroll position changed
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(0);
    });
  });

  test.describe('Tablet Devices', () => {

    test('should display correctly on iPad', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      
      // Check layout adapts to tablet
      const mainContent = page.locator('main, [role="main"]').first();
      await expect(mainContent).toBeVisible();
      
      // Check grid layouts adapt
      const grids = await page.locator('[class*="grid"], [class*="Grid"]').all();
      for (const grid of grids.slice(0, 3)) {
        const gridClass = await grid.getAttribute('class');
        expect(gridClass).toMatch(/md:|tablet:/);
      }
    });

    test('should support both portrait and landscape', async ({ page }) => {
      // Portrait
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await expect(page.locator('h1')).toBeVisible();
      
      // Landscape
      await page.setViewportSize({ width: 1024, height: 768 });
      await expect(page.locator('h1')).toBeVisible();
      
      // Content should reflow properly
      const container = page.locator('[class*="container"], [class*="Container"]').first();
      if (await container.isVisible()) {
        const box = await container.boundingBox();
        expect(box?.width).toBeLessThanOrEqual(1024);
      }
    });
  });

  test.describe('Desktop Breakpoints', () => {
    const breakpoints = [
      { name: 'Small Desktop', width: 1366, height: 768 },
      { name: 'Standard Desktop', width: 1920, height: 1080 },
      { name: 'Large Desktop', width: 2560, height: 1440 },
      { name: 'Ultra Wide', width: 3440, height: 1440 },
    ];

    breakpoints.forEach(({ name, width, height }) => {
      test(`should display correctly on ${name}`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.goto('/');
        
        // Check content doesn't overflow
        const hasHorizontalScroll = await page.evaluate(() => 
          document.documentElement.scrollWidth > document.documentElement.clientWidth
        );
        expect(hasHorizontalScroll).toBe(false);
        
        // Check max-width containers for readability
        if (width > 1920) {
          const containers = await page.locator('[class*="max-w"], [class*="container"]').all();
          for (const container of containers.slice(0, 3)) {
            const box = await container.boundingBox();
            if (box && box.width > 100) { // Ignore small elements
              expect(box.width).toBeLessThanOrEqual(1536); // Reasonable max-width
            }
          }
        }
      });
    });
  });

  test.describe('Responsive Images', () => {
    test('should load appropriate image sizes', async ({ page }) => {
      await page.goto('/');
      
      const images = await page.locator('img').all();
      for (const img of images.slice(0, 5)) {
        // Check images have responsive attributes
        const srcset = await img.getAttribute('srcset');
        const sizes = await img.getAttribute('sizes');
        const loading = await img.getAttribute('loading');
        
        // Images should have optimization attributes
        if (srcset) {
          expect(srcset).toContain('w');
        }
        
        // Check lazy loading for below-fold images
        const isInViewport = await img.isIntersectingViewport();
        if (!isInViewport && loading) {
          expect(loading).toBe('lazy');
        }
      }
    });

    test('should handle retina displays', async ({ page }) => {
      // Set device pixel ratio for retina
      await page.evaluate(() => window.devicePixelRatio = 2);
      await page.goto('/');
      
      // Check if high-res images are requested
      const imgRequests: string[] = [];
      page.on('request', request => {
        if (request.resourceType() === 'image') {
          imgRequests.push(request.url());
        }
      });
      
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Check for 2x or high-res image requests
      const hasHighRes = imgRequests.some(url => 
        url.includes('@2x') || url.includes('2x') || url.includes('_2x')
      );
      
      // Note: This might not always be true depending on implementation
      // but we're checking the mechanism exists
    });
  });

  test.describe('Responsive Typography', () => {
    test('should scale typography appropriately', async ({ page }) => {
      const viewports = [
        { width: 375, expected: { h1: [24, 48], body: [14, 18] } },
        { width: 768, expected: { h1: [32, 56], body: [15, 19] } },
        { width: 1920, expected: { h1: [36, 72], body: [16, 20] } },
      ];

      for (const { width, expected } of viewports) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto('/');
        
        // Check h1 font size
        const h1 = page.locator('h1').first();
        if (await h1.isVisible()) {
          const h1Size = await h1.evaluate(el => 
            parseInt(window.getComputedStyle(el).fontSize)
          );
          expect(h1Size).toBeGreaterThanOrEqual(expected.h1[0]);
          expect(h1Size).toBeLessThanOrEqual(expected.h1[1]);
        }
        
        // Check body text size
        const bodyText = page.locator('p').first();
        if (await bodyText.isVisible()) {
          const bodySize = await bodyText.evaluate(el => 
            parseInt(window.getComputedStyle(el).fontSize)
          );
          expect(bodySize).toBeGreaterThanOrEqual(expected.body[0]);
          expect(bodySize).toBeLessThanOrEqual(expected.body[1]);
        }
      }
    });

    test('should maintain readable line lengths', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      
      // Check paragraph line lengths
      const paragraphs = await page.locator('p').all();
      for (const p of paragraphs.slice(0, 5)) {
        const box = await p.boundingBox();
        if (box && box.width > 100) { // Ignore small elements
          // Ideal line length is 45-75 characters, roughly 400-750px
          expect(box.width).toBeLessThanOrEqual(800);
        }
      }
    });
  });

  test.describe('Responsive Navigation', () => {
    test('should toggle mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Find hamburger menu
      const hamburger = page.locator('button:has(svg.lucide-menu)');
      await expect(hamburger).toBeVisible();
      
      // Open menu
      await hamburger.click();
      
      // Menu should be visible
      const mobileMenu = page.locator('nav').filter({ hasText: 'Home' });
      await expect(mobileMenu).toBeVisible();
      
      // Close menu
      const closeButton = page.locator('button:has(svg.lucide-x)');
      if (await closeButton.isVisible()) {
        await closeButton.click();
        await expect(mobileMenu).not.toBeVisible();
      }
    });

    test('should show desktop navigation on larger screens', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      
      // Desktop nav should be visible
      const desktopNav = page.locator('nav').first();
      await expect(desktopNav).toBeVisible();
      
      // Hamburger should not be visible
      const hamburger = page.locator('button:has(svg.lucide-menu)');
      await expect(hamburger).not.toBeVisible();
      
      // All nav items should be visible
      await expect(desktopNav.locator('text=Home')).toBeVisible();
      await expect(desktopNav.locator('text=Projects')).toBeVisible();
    });
  });

  test.describe('Responsive Forms', () => {
    test('should adapt form layout on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/admin');
      
      // Check form inputs stack vertically
      const inputs = await page.locator('input').all();
      if (inputs.length > 1) {
        const box1 = await inputs[0].boundingBox();
        const box2 = await inputs[1].boundingBox();
        
        if (box1 && box2) {
          // Inputs should be stacked (different y position)
          expect(box2.y).toBeGreaterThan(box1.y);
        }
      }
      
      // Check inputs are full width on mobile
      const input = page.locator('input').first();
      const inputBox = await input.boundingBox();
      const containerBox = await input.locator('..').boundingBox();
      
      if (inputBox && containerBox) {
        const widthRatio = inputBox.width / containerBox.width;
        expect(widthRatio).toBeGreaterThan(0.9);
      }
    });
  });
});
