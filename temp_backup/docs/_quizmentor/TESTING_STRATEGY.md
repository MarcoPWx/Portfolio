---
layout: product
title: TESTING STRATEGY
product: QuizMentor
source: TESTING_STRATEGY.md
---

{% raw %}
# QuizMentor Testing Strategy

## Overview

Comprehensive testing strategy covering unit tests, integration tests, E2E tests, and performance testing for the QuizMentor manipulation stack and remote configuration system.

## Testing Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Testing Pyramid                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    E2E Tests (10%)                          │
│                 ┌─────────────────┐                         │
│                 │  User Journeys   │                         │
│                 │  Manipulation    │                         │
│                 │  Remote Config   │                         │
│                 └─────────────────┘                         │
│                                                              │
│             Integration Tests (30%)                          │
│         ┌───────────────────────────────┐                   │
│         │  API Integration              │                   │
│         │  Service Communication        │                   │
│         │  Database Operations          │                   │
│         │  Remote Config Sync           │                   │
│         └───────────────────────────────┘                   │
│                                                              │
│               Unit Tests (60%)                               │
│     ┌─────────────────────────────────────────┐             │
│     │  Stores (Streak, Hearts, Challenges)    │             │
│     │  Services (Notification, Ad, Analytics) │             │
│     │  Components (UI Elements)               │             │
│     │  Utilities (Helpers, Formatters)        │             │
│     └─────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────┘
```

## Test Coverage Requirements

### Minimum Coverage Targets
- **Overall**: 80%
- **Manipulation Logic**: 95% (critical path)
- **Remote Config**: 90%
- **UI Components**: 70%
- **Utilities**: 85%

## 1. Unit Tests

### Store Tests (`tests/unit/stores/`)

#### StreakStore Tests
```typescript
describe('StreakStore', () => {
  // Core functionality
  ✓ should increment streak on consecutive days
  ✓ should reset streak after 24 hours gap
  ✓ should not increment if already updated today
  ✓ should update longest streak when exceeded
  
  // Streak danger detection
  ✓ should detect danger zone (18-24 hours)
  ✓ should trigger notifications at critical times
  
  // Freeze mechanics
  ✓ should use freeze to preserve streak
  ✓ should not use freeze if none available
  ✓ should not use freeze if not in danger
  
  // Milestones
  ✓ should award milestone rewards at 7, 30, 100, 365 days
  ✓ should trigger celebration animations
  
  // Edge cases
  ✓ should handle timezone changes
  ✓ should handle daylight saving time
  ✓ should persist state to AsyncStorage
});
```

#### HeartsStore Tests
```typescript
describe('HeartsStore', () => {
  // Core mechanics
  ✓ should start with 5 hearts
  ✓ should lose heart on wrong answer
  ✓ should block quiz when depleted
  
  // Regeneration
  ✓ should regenerate 1 heart per 30 minutes
  ✓ should cap at maximum hearts
  ✓ should calculate time until next heart
  
  // Premium features
  ✓ should give unlimited hearts to premium users
  ✓ should not regenerate for premium users
  
  // Ad rewards
  ✓ should grant hearts after watching ad
  ✓ should apply diminishing returns
});
```

#### LeaderboardStore Tests
```typescript
describe('LeaderboardStore', () => {
  // Fake user generation
  ✓ should generate 200+ realistic fake users
  ✓ should position user in middle ranks (100-150)
  ✓ should show nearby competitors
  
  // Live updates
  ✓ should update fake user scores periodically
  ✓ should show rank changes
  ✓ should trigger notifications when passed
  
  // Manipulation
  ✓ should keep user in frustrating middle
  ✓ should show achievable targets ahead
  ✓ should apply premium badges to fake users
});
```

### Service Tests (`tests/unit/services/`)

#### RemoteConfigService Tests
```typescript
describe('RemoteConfigService', () => {
  // Initialization
  ✓ should load cached config first
  ✓ should fetch remote config
  ✓ should fall back to cache on error
  
  // Feature flags
  ✓ should return correct flag values
  ✓ should apply rollout percentages
  ✓ should handle nested values
  
  // A/B testing
  ✓ should assign variants consistently
  ✓ should respect target audience
  ✓ should track experiment exposure
  
  // Dynamic pricing
  ✓ should apply engagement-based pricing
  ✓ should apply location-based pricing
  ✓ should apply frustration discounts
  
  // Content management
  ✓ should fetch dynamic quiz questions
  ✓ should submit user questions
  ✓ should handle errors gracefully
});
```

#### NotificationService Tests
```typescript
describe('NotificationService', () => {
  // Scheduling
  ✓ should schedule daily notifications
  ✓ should send at optimal times
  ✓ should respect user timezone
  
  // Streak reminders
  ✓ should send danger zone alerts
  ✓ should escalate urgency
  
  // Social pressure
  ✓ should send fake friend activity
  ✓ should create FOMO
  
  // Win-back campaigns
  ✓ should escalate re-engagement
  ✓ should offer increasing discounts
});
```

## 2. Integration Tests

### API Integration Tests
```typescript
describe('API Integration', () => {
  // Supabase operations
  ✓ should authenticate users
  ✓ should sync user progress
  ✓ should fetch remote config
  ✓ should handle real-time updates
  
  // Error handling
  ✓ should retry on network failure
  ✓ should queue offline mutations
  ✓ should sync when reconnected
});
```

### Service Communication Tests
```typescript
describe('Service Communication', () => {
  // Store-Service integration
  ✓ should update analytics on store changes
  ✓ should trigger notifications from stores
  ✓ should sync with remote config
  
  // Cross-service communication
  ✓ should coordinate between services
  ✓ should handle circular dependencies
  ✓ should maintain data consistency
});
```

## 3. E2E Tests

### Complete User Journey Tests
```typescript
describe('Manipulation User Journey', () => {
  // Onboarding to conversion
  ✓ Day 1: Easy success for dopamine hit
  ✓ Day 2-6: Build streak habit
  ✓ Day 7: Milestone celebration
  ✓ Day 8: Introduce frustration
  ✓ Day 9: Apply social pressure
  ✓ Day 10: Convert to premium
  
  // Streak manipulation
  ✓ should show danger notifications
  ✓ should reset and offer freeze
  ✓ should celebrate milestones
  
  // Hearts frustration
  ✓ should deplete on wrong answers
  ✓ should show regeneration timer
  ✓ should push ads then premium
  
  // Daily challenges
  ✓ should show countdown urgency
  ✓ should lock premium challenges
  ✓ should animate last minute
  
  // Leaderboard manipulation
  ✓ should show fake users progressing
  ✓ should position strategically
  ✓ should create competition anxiety
  
  // Notification manipulation
  ✓ should send at optimal times
  ✓ should fake social activity
  ✓ should escalate urgency
  
  // Dynamic pricing
  ✓ should trigger frustration discounts
  ✓ should adjust by location
  ✓ should personalize offers
});
```

### Remote Configuration E2E Tests
```typescript
describe('Remote Configuration E2E', () => {
  // Feature flags
  ✓ should toggle features without update
  ✓ should apply gradual rollouts
  ✓ should target user segments
  
  // A/B testing
  ✓ should assign variants consistently
  ✓ should track metrics correctly
  ✓ should conclude experiments
  
  // Dynamic content
  ✓ should load new questions
  ✓ should update categories
  ✓ should schedule events
});
```

## 4. Performance Tests

### Load Testing
```typescript
describe('Performance Under Load', () => {
  // Concurrent users
  ✓ should handle 10,000 concurrent users
  ✓ should maintain <100ms response time
  ✓ should scale horizontally
  
  // Data operations
  ✓ should efficiently query large datasets
  ✓ should cache frequently accessed data
  ✓ should optimize database queries
});
```

### UI Performance Tests
```typescript
describe('UI Performance', () => {
  // Animation performance
  ✓ should maintain 60 FPS during animations
  ✓ should not block main thread
  ✓ should lazy load heavy components
  
  // Memory management
  ✓ should not leak memory
  ✓ should clean up listeners
  ✓ should optimize image loading
});
```

## 5. Manipulation Effectiveness Tests

### Dark Pattern Validation
```typescript
describe('Dark Pattern Effectiveness', () => {
  // Loss aversion
  ✓ should create streak anxiety
  ✓ should trigger FOMO responses
  
  // Social pressure
  ✓ should induce competition anxiety
  ✓ should create peer pressure
  
  // Artificial scarcity
  ✓ should create urgency with hearts
  ✓ should limit time for challenges
  
  // Variable rewards
  ✓ should create dopamine responses
  ✓ should maintain engagement
});
```

### Conversion Funnel Tests
```typescript
describe('Conversion Funnel', () => {
  // Metrics tracking
  ✓ should track funnel steps
  ✓ should identify drop-off points
  ✓ should measure conversion rates
  
  // Optimization
  ✓ should A/B test variations
  ✓ should personalize experience
  ✓ should maximize LTV
});
```

## Test Execution

### Running Tests

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Performance tests
npm run test:performance

# All tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### CI/CD Pipeline

```yaml
name: Test Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm install
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Check coverage
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v2
```

## Mocking Strategy

### Mock Data Generators
```typescript
// Generate realistic fake users
export const generateFakeUser = (overrides = {}) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  xp: faker.datatype.number({ min: 1000, max: 5000 }),
  streak: faker.datatype.number({ min: 0, max: 365 }),
  isPremium: faker.datatype.boolean(),
  ...overrides
});

// Generate test scenarios
export const generateTestScenario = (type: 'frustration' | 'engagement' | 'conversion') => {
  // Return appropriate test data
};
```

### Service Mocks
```typescript
// Mock notification service
export const mockNotificationService = {
  scheduleNotification: jest.fn(),
  cancelNotification: jest.fn(),
  getScheduledNotifications: jest.fn(() => [])
};

// Mock analytics service
export const mockAnalyticsService = {
  track: jest.fn(),
  identify: jest.fn(),
  getMetrics: jest.fn(() => ({
    frustrationScore: 0.5,
    conversionLikelihood: 0.3
  }))
};
```

## Test Data Management

### Fixtures
```typescript
// User states
export const userStates = {
  newUser: { /* ... */ },
  engagedUser: { /* ... */ },
  frustratedUser: { /* ... */ },
  premiumUser: { /* ... */ }
};

// Quiz data
export const quizFixtures = {
  easyQuestions: [ /* ... */ ],
  hardQuestions: [ /* ... */ ],
  premiumQuestions: [ /* ... */ ]
};
```

### Database Seeds
```sql
-- Test users
INSERT INTO users (id, email, created_at) VALUES
  ('test-user-1', 'new@test.com', NOW() - INTERVAL '1 day'),
  ('test-user-2', 'engaged@test.com', NOW() - INTERVAL '30 days'),
  ('test-user-3', 'premium@test.com', NOW() - INTERVAL '90 days');

-- Test progress
INSERT INTO user_progress (user_id, streak, hearts, xp) VALUES
  ('test-user-1', 1, 5, 100),
  ('test-user-2', 30, 3, 5000),
  ('test-user-3', 100, 999, 50000);
```

## Monitoring & Metrics

### Test Metrics to Track
1. **Test Coverage**: Overall and per module
2. **Test Execution Time**: Identify slow tests
3. **Flaky Test Rate**: Tests that fail intermittently
4. **Test Failure Rate**: By category and severity
5. **Performance Regression**: Response time changes

### Test Quality Indicators
- **Deterministic**: Tests should not be flaky
- **Independent**: Tests should not depend on each other
- **Fast**: Unit tests < 10ms, Integration < 100ms, E2E < 10s
- **Readable**: Clear test names and assertions
- **Maintainable**: DRY principle, shared utilities

## Best Practices

1. **Test Naming Convention**
   ```typescript
   describe('[Component/Service]', () => {
     it('should [expected behavior] when [condition]', () => {
       // Test implementation
     });
   });
   ```

2. **AAA Pattern**
   ```typescript
   it('should calculate correct price', () => {
     // Arrange
     const user = { frustrationLevel: 0.8 };
     
     // Act
     const price = calculateDynamicPrice(user);
     
     // Assert
     expect(price).toBeLessThan(BASE_PRICE);
   });
   ```

3. **Test Isolation**
   - Reset state before each test
   - Mock external dependencies
   - Use test databases
   - Clean up after tests

4. **Snapshot Testing**
   - Use for UI components
   - Review snapshot changes carefully
   - Keep snapshots small and focused

5. **Continuous Testing**
   - Run tests on every commit
   - Block merge on test failure
   - Monitor test metrics
   - Regular test review and refactoring

## Troubleshooting

### Common Issues

1. **Flaky Tests**
   - Check for timing dependencies
   - Ensure proper async handling
   - Mock Date.now() and timers
   - Use explicit waits over arbitrary delays

2. **Slow Tests**
   - Profile test execution
   - Mock heavy operations
   - Use test data builders
   - Parallelize where possible

3. **False Positives**
   - Verify assertions are specific
   - Check mock implementations
   - Ensure proper test data

4. **Maintenance Burden**
   - Extract common test utilities
   - Use page object pattern for E2E
   - Regular test refactoring
   - Remove redundant tests

This comprehensive testing strategy ensures the QuizMentor manipulation stack and remote configuration system are robust, reliable, and effective at achieving their dark pattern objectives while maintaining system stability.
{% endraw %}
