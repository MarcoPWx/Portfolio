# Testing Documentation

This document outlines the comprehensive testing strategy for the NatureQuest Portfolio.

## Testing Structure

```
tests/
├── e2e/                    # End-to-end tests with Playwright
│   └── portfolio.spec.ts   # Main portfolio E2E tests
├── unit/                   # Unit tests with Jest
│   ├── InteractivePortfolio.test.tsx
│   └── ComprehensiveSkills.test.tsx
├── integration/            # Integration tests
│   └── navigation.test.tsx
├── utils/                  # Test utilities and helpers
│   └── test-utils.tsx
└── README.md              # This file
```

## Test Types

### 1. Unit Tests (Jest + React Testing Library)
- **Purpose**: Test individual components in isolation
- **Coverage**: Component rendering, props, state changes, user interactions
- **Location**: `tests/unit/`
- **Command**: `npm run test`

### 2. Integration Tests (Jest + React Testing Library)
- **Purpose**: Test component interactions and data flow
- **Coverage**: Navigation flows, state management, API integrations
- **Location**: `tests/integration/`
- **Command**: `npm run test`

### 3. End-to-End Tests (Playwright)
- **Purpose**: Test complete user journeys across the application
- **Coverage**: Full application functionality, cross-browser compatibility
- **Location**: `tests/e2e/`
- **Command**: `npm run test:e2e`

## Running Tests

### Unit & Integration Tests
```bash
# Run all unit and integration tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- tests/unit/InteractivePortfolio.test.tsx
```

### E2E Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (visible browser)
npm run test:e2e:headed

# Run E2E tests in debug mode
npm run test:e2e:debug

# Run all tests (unit + E2E)
npm run test:all
```

## Test Coverage

### Unit Tests Coverage
- **InteractivePortfolio**: Main portfolio component
  - Navigation functionality
  - Section rendering
  - Terminal interactions
  - Social links
  - Professional information display

- **ComprehensiveSkills**: Skills section component
  - Technology categories
  - Card expansion
  - Project examples
  - Interactive elements

### E2E Tests Coverage
- **Homepage Loading**: Verify portfolio loads correctly
- **Navigation**: Test all section navigation
- **Interactive Elements**: Skills expansion, project roadmaps
- **Responsive Design**: Mobile and desktop layouts
- **Accessibility**: ARIA labels, alt text, keyboard navigation
- **Social Links**: LinkedIn, GitHub integration
- **Admin Dashboard**: Admin section functionality

## Test Configuration

### Jest Configuration (`jest.config.js`)
- Next.js integration
- React Testing Library setup
- Coverage thresholds (70% minimum)
- Mock configurations for Framer Motion

### Playwright Configuration (`playwright.config.ts`)
- Multiple browser support (Chrome, Firefox, Safari)
- Mobile device testing
- Screenshot and video capture on failure
- Parallel test execution

### GitHub Actions (`.github/workflows/test.yml`)
- Automated testing on push/PR
- Unit tests with coverage reporting
- E2E tests with artifact upload
- Type checking and linting

## Mocking Strategy

### Framer Motion
All Framer Motion components are mocked to return simple HTML elements for consistent testing.

### Next.js Router
Router hooks are mocked to provide consistent navigation behavior.

### Browser APIs
- `IntersectionObserver`
- `ResizeObserver`
- `MutationObserver`

## Best Practices

### Writing Unit Tests
1. **Arrange**: Set up test data and component state
2. **Act**: Perform user interactions or state changes
3. **Assert**: Verify expected outcomes

### Writing E2E Tests
1. **User-Centric**: Focus on user journeys, not implementation details
2. **Reliable Selectors**: Use data-testid attributes for stable selectors
3. **Wait Strategies**: Use proper wait conditions for async operations

### Test Data
- Use mock data from `tests/utils/test-utils.tsx`
- Keep test data realistic and up-to-date
- Avoid hardcoded values in tests

## Debugging Tests

### Unit Tests
```bash
# Debug specific test
npm test -- --testNamePattern="should render navigation"
```

### E2E Tests
```bash
# Debug with UI
npm run test:e2e:ui

# Debug specific test
npx playwright test --grep "should load homepage"
```

## Continuous Integration

The GitHub Actions workflow runs:
1. **Unit Tests**: Jest with coverage reporting
2. **E2E Tests**: Playwright across multiple browsers
3. **Type Checking**: TypeScript compilation
4. **Linting**: ESLint code quality checks

## Coverage Reports

Coverage reports are generated for:
- **Statements**: 70% minimum
- **Branches**: 70% minimum
- **Functions**: 70% minimum
- **Lines**: 70% minimum

Reports are uploaded to Codecov for tracking over time.

## Performance Testing

E2E tests include performance checks:
- Page load times
- Animation performance
- Responsive behavior
- Cross-browser compatibility

## Accessibility Testing

E2E tests verify:
- ARIA labels and roles
- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios
- Alt text for images

## Future Enhancements

1. **Visual Regression Testing**: Screenshot comparison
2. **Performance Monitoring**: Lighthouse CI integration
3. **API Testing**: Backend integration tests
4. **Security Testing**: Vulnerability scanning
5. **Load Testing**: Stress testing for high traffic

## Troubleshooting

### Common Issues

1. **Tests failing due to animations**: Ensure Framer Motion is properly mocked
2. **Async test failures**: Use proper wait conditions and timeouts
3. **Selector issues**: Use data-testid attributes for stable selectors
4. **Browser compatibility**: Test across multiple browsers and devices

### Debug Commands
```bash
# Clear Jest cache
npm test -- --clearCache

# Update Playwright browsers
npx playwright install

# Debug E2E test
npx playwright test --debug
```
