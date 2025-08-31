# Testing & Storybook Documentation

## Table of Contents
- [Overview](#overview)
- [Test Architecture](#test-architecture)
- [Running Tests](#running-tests)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [E2E Testing](#e2e-testing)
- [Storybook](#storybook)
- [Coverage](#coverage)
- [CI/CD](#cicd)
- [Best Practices](#best-practices)

## Overview

This project uses a comprehensive testing strategy with:
- **Jest** for unit and integration tests
- **Playwright** for E2E testing
- **Storybook** for component documentation and visual testing
- **Testing Library** for React component testing

## Test Architecture

```
tests/
├── unit/           # Unit tests for components and functions
├── integration/    # Integration tests for component interactions
├── e2e/           # End-to-end tests with Playwright
└── utils/         # Testing utilities and helpers
```

## Running Tests

### All Tests
```bash
# Run all test suites
npm run test:all

# Run tests in watch mode during development
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Unit Tests
```bash
# Run Jest unit tests
npm test

# Watch mode for TDD
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### E2E Tests
```bash
# Run Playwright E2E tests
npm run test:e2e

# Run with UI mode for debugging
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug specific test
npm run test:e2e:debug
```

### Storybook
```bash
# Start Storybook dev server
npm run storybook

# Build static Storybook
npm run build-storybook
```

## Unit Testing

Unit tests focus on testing individual components and functions in isolation.

### Example Unit Test
```typescript
// tests/unit/Component.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from '@/components/Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    const onClick = jest.fn();
    render(<Component onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Key Files
- `tests/unit/InteractivePortfolio.test.tsx` - Main portfolio component tests
- `tests/unit/ComprehensiveSkills.test.tsx` - Skills showcase component tests
- `jest.setup.js` - Test configuration and mocks
- `tests/utils/test-utils.tsx` - Custom render functions and utilities

## Integration Testing

Integration tests verify that multiple components work together correctly.

### Example Integration Test
```typescript
// tests/integration/navigation.test.tsx
describe('Navigation Flow', () => {
  test('complete navigation through all sections', async () => {
    render(<InteractivePortfolio />);
    
    // Navigate to Projects
    fireEvent.click(screen.getByText('Projects'));
    await waitFor(() => {
      expect(screen.getByText('QuizMentor')).toBeInTheDocument();
    });
    
    // Navigate to About
    fireEvent.click(screen.getByText('About'));
    await waitFor(() => {
      expect(screen.getByText('Professional Summary')).toBeInTheDocument();
    });
  });
});
```

## E2E Testing

Playwright tests verify the complete user journey across multiple browsers.

### Example E2E Test
```typescript
// tests/e2e/portfolio.spec.ts
import { test, expect } from '@playwright/test';

test('should navigate between sections', async ({ page }) => {
  await page.goto('/');
  
  // Click on Projects navigation
  await page.click('text=Projects');
  
  // Verify project cards are visible
  await expect(page.locator('text=QuizMentor')).toBeVisible();
  await expect(page.locator('text=DevMentor')).toBeVisible();
  
  // Test responsive design
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('button[aria-label*="menu"]')).toBeVisible();
});
```

### Browser Coverage
- Chromium (Desktop & Mobile)
- Firefox (Desktop)
- WebKit/Safari (Desktop & Mobile)

## Storybook

Storybook provides component documentation and visual testing.

### Component Stories
```typescript
// src/components/Component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'UI/Component',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Example',
    variant: 'primary',
  },
};
```

### Available Stories
- `InteractivePortfolio` - Main portfolio showcase
- `ComprehensiveSkills` - Technical skills display
- `PortfolioDashboard` - Product dashboard view

## Coverage

Current coverage thresholds (configured in `jest.config.js`):
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

Generate coverage report:
```bash
npm run test:coverage
```

View coverage report:
```bash
open coverage/lcov-report/index.html
```

## CI/CD

### GitHub Actions Workflow
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:coverage
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

## Best Practices

### 1. Test Organization
- Group related tests in `describe` blocks
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)

### 2. Component Testing
- Test user behavior, not implementation details
- Use Testing Library queries appropriately
- Mock external dependencies

### 3. E2E Testing
- Test critical user paths
- Use page object pattern for complex pages
- Run on multiple browsers
- Set appropriate timeouts

### 4. Mocking
- Mock external services and APIs
- Use MSW for API mocking if needed
- Keep mocks up-to-date with actual implementations

### 5. Performance
- Keep tests fast and focused
- Use `beforeAll`/`afterAll` for expensive setup
- Parallelize E2E tests where possible

### 6. Debugging
```bash
# Debug Jest tests
node --inspect-brk ./node_modules/.bin/jest --runInBand

# Debug Playwright tests
npm run test:e2e:debug

# Use Storybook for visual debugging
npm run storybook
```

### 7. Accessibility Testing
- Include accessibility checks in tests
- Use `screen.getByRole` preferentially
- Test keyboard navigation
- Verify ARIA attributes

## Common Issues & Solutions

### Issue: Tests fail with "Cannot find module"
**Solution**: Check module mappings in `jest.config.js` and ensure paths match `tsconfig.json`.

### Issue: Framer Motion animations break tests
**Solution**: Animations are mocked in `jest.setup.js`. Ensure the mock is properly configured.

### Issue: E2E tests timeout
**Solution**: Increase timeout in `playwright.config.ts` or use `test.slow()` for specific tests.

### Issue: Storybook version conflicts
**Solution**: Ensure all @storybook/* packages are the same version. Run `npm ls storybook` to check.

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)
- [Next.js Testing](https://nextjs.org/docs/app/building-your-application/testing)

## Contributing

When adding new features:
1. Write unit tests for new components/functions
2. Add integration tests for component interactions
3. Create E2E tests for critical user paths
4. Document components in Storybook
5. Ensure coverage thresholds are met
6. Run all tests before submitting PR

```bash
# Pre-commit checklist
npm run type-check     # TypeScript validation
npm run lint          # ESLint checks
npm run test:coverage # Unit test coverage
npm run test:e2e      # E2E tests
npm run build         # Production build
```
