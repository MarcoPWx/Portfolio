import { test, expect } from '@playwright/test';

test.describe.skip('Portfolio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });

  test('should load the portfolio homepage', async ({ page }) => {
    // Check if the main content is visible
    await expect(page.locator('text=PixelQuest')).toBeVisible();
    await expect(page.locator('text=Senior Full-Stack Engineer')).toBeVisible();
    
    // Check if navigation is present
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Projects')).toBeVisible();
    await expect(page.locator('text=About')).toBeVisible();
    await expect(page.locator('text=Stack')).toBeVisible();
  });

  test('should navigate between sections', async ({ page }) => {
    // Test navigation to Projects section
    await page.click('text=Projects');
    await expect(page.locator('text=QuizMentor')).toBeVisible();
    await expect(page.locator('text=DevMentor')).toBeVisible();
    await expect(page.locator('text=Harvest.ai')).toBeVisible();

    // Test navigation to About section
    await page.click('text=About');
    await expect(page.locator('text=Humberto Borges')).toBeVisible();
    await expect(page.locator('text=Professional Summary')).toBeVisible();
    await expect(page.locator('text=Work Experience')).toBeVisible();

    // Test navigation to Stack section
    await page.click('text=Stack');
    await expect(page.locator('text=Programming Languages')).toBeVisible();
    await expect(page.locator('text=Frontend Development')).toBeVisible();
    await expect(page.locator('text=Backend Development')).toBeVisible();
  });

  test('should display interactive skills section', async ({ page }) => {
    await page.click('text=Stack');
    
    // Check if technology categories are visible
    await expect(page.locator('text=TypeScript')).toBeVisible();
    await expect(page.locator('text=React')).toBeVisible();
    await expect(page.locator('text=Node.js')).toBeVisible();
    await expect(page.locator('text=Python')).toBeVisible();

    // Test expanding a technology card
    await page.click('text=TypeScript');
    await expect(page.locator('text=DevMentor AI Assistant')).toBeVisible();
    await expect(page.locator('text=95% type safety')).toBeVisible();
  });

  test('should show project roadmaps', async ({ page }) => {
    await page.click('text=Projects');
    
    // Click on a project's roadmap button
    await page.click('text=View Roadmap');
    
    // Check if roadmap modal opens
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.locator('text=Project Roadmap')).toBeVisible();
  });

  test('should have working social links', async ({ page }) => {
    // Check LinkedIn link
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute('href', /linkedin\.com/);

    // Check GitHub link
    const githubLink = page.locator('a[href*="github.com"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', /github\.com/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if mobile menu button is visible
    await expect(page.locator('button[aria-label*="menu"]')).toBeVisible();
    
    // Test mobile navigation
    await page.click('button[aria-label*="menu"]');
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Projects')).toBeVisible();
  });

  test('should have proper accessibility', async ({ page }) => {
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for proper alt text on images
    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check for proper ARIA labels
    await expect(page.locator('[aria-label]')).toBeVisible();
  });

  test('should handle animations and interactions', async ({ page }) => {
    // Test hover effects on navigation
    await page.hover('text=Projects');
    await expect(page.locator('text=Projects')).toBeVisible();
    
    // Test button interactions
    const buttons = page.locator('button');
    await expect(buttons.first()).toBeVisible();
  });

  test('should load admin dashboard', async ({ page }) => {
    await page.click('text=Admin');
    await expect(page.locator('text=Admin Dashboard')).toBeVisible();
    await expect(page.locator('text=Login')).toBeVisible();
  });

  test('should display correct professional information', async ({ page }) => {
    await page.click('text=About');
    
    // Check professional information
    await expect(page.locator('text=Senior Full-Stack Developer')).toBeVisible();
    await expect(page.locator('text=PixelQuest')).toBeVisible();
    await expect(page.locator('text=Founder & Lead Engineer')).toBeVisible();
    
    // Check skills and technologies
    await expect(page.locator('text=TypeScript')).toBeVisible();
    await expect(page.locator('text=React')).toBeVisible();
    await expect(page.locator('text=Python')).toBeVisible();
    await expect(page.locator('text=TensorFlow')).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/PixelQuest/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /developer tools/);
  });
});
