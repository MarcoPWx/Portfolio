---
layout: product
title: RUNBOOK frontend operations
product: DevMentor
source: infrastructure/runbooks/RUNBOOK_frontend_operations.md
---

{% raw %}
# Runbook: Frontend Operations

**Service**: DevMentor Frontend (Next.js Application)  
**Last Updated**: 2025-08-25  
**Criticality**: HIGH  
**On-call Team**: Frontend Team  

## Table of Contents
1. [Quick Start](#quick-start)
2. [Development Operations](#development-operations)
3. [Build & Deployment](#build--deployment)
4. [Testing Procedures](#testing-procedures)
5. [Performance Optimization](#performance-optimization)
6. [Incident Response](#incident-response)
7. [Feature Flags & Rollout](#feature-flags--rollout)

## Quick Start

### Essential Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test:unit
npm run test:e2e

# Type checking
npm run type-check

# Verify integration
./scripts/verify-integration.sh
```

### Health Checks
```bash
# Local development
curl http://localhost:3001/api/health

# Production
curl https://devmentor.io/api/health

# WebSocket status
curl http://localhost:8002/health
```

## Development Operations

### 1. Setting Up Local Environment

```bash
# Clone and setup
git clone https://github.com/devmentor/frontend.git
cd frontend/devmentor-ui
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# Required environment variables
cat << EOF > .env.local
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080
NEXT_PUBLIC_AI_GATEWAY_URL=http://localhost:3001
NEXT_PUBLIC_AUTH_SERVICE_URL=http://localhost:3002
NEXT_PUBLIC_MEMORY_SERVICE_URL=http://localhost:3003
NEXT_PUBLIC_PROJECT_SERVICE_URL=http://localhost:3004
NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:8002
NEXT_PUBLIC_ENABLE_REALTIME=true
NEXT_PUBLIC_MOCK_MODE=false
EOF

# Start development
npm run dev
```

### 2. Working with Mock Data

```bash
# Enable mock mode for development without backend
export NEXT_PUBLIC_MOCK_MODE=true
npm run dev:mock

# Test with mock data
# 1. Visit http://localhost:3001/projects
# 2. Look for "Mock Data" yellow badge
# 3. All features work with simulated data
```

### 3. Real-time Features Development

```bash
# Enable WebSocket for real-time
export NEXT_PUBLIC_ENABLE_REALTIME=true

# Disable for polling mode
export NEXT_PUBLIC_ENABLE_REALTIME=false

# Test real-time updates
# 1. Open two browser windows
# 2. Make changes in one
# 3. See updates in other
```

### 4. Component Development Workflow

```bash
# Create new component
mkdir -p src/features/new-feature
touch src/features/new-feature/NewComponent.tsx

# Component template
cat << 'EOF' > src/features/new-feature/NewComponent.tsx
'use client';

import React from 'react';

interface NewComponentProps {
  // Props
}

export default function NewComponent(props: NewComponentProps) {
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
EOF

# Create test file
touch src/features/new-feature/NewComponent.test.tsx

# Run type check
npm run type-check
```

## Build & Deployment

### 1. Pre-deployment Checklist

```bash
#!/bin/bash
echo "=== Pre-deployment Checklist ==="

# 1. Check for TypeScript errors
echo -n "TypeScript check... "
npm run type-check 2>&1 | grep -q "error" && echo "❌ FAILED" || echo "✅ PASSED"

# 2. Run unit tests
echo -n "Unit tests... "
npm run test:unit 2>&1 | grep -q "FAIL" && echo "❌ FAILED" || echo "✅ PASSED"

# 3. Check bundle size
echo -n "Bundle size check... "
npm run build 2>&1 | tee build.log
cat build.log | grep "First Load JS" | awk '{print $4}'

# 4. Verify environment variables
echo -n "Environment check... "
grep -q "NEXT_PUBLIC_API_GATEWAY_URL" .env.production && echo "✅ CONFIGURED" || echo "❌ MISSING"

# 5. Check for console.log statements
echo -n "Console.log check... "
grep -r "console.log" src/ --exclude-dir=node_modules | wc -l | read count
[ "$count" -gt 0 ] && echo "⚠️  Found $count console.log statements" || echo "✅ CLEAN"
```

### 2. Production Build

```bash
# Clean previous build
rm -rf .next

# Build with production config
NODE_ENV=production npm run build

# Analyze bundle
npm run build -- --analyze

# Test production build locally
npm run start

# Verify build
curl http://localhost:3001
```

### 3. Docker Deployment

```bash
# Build Docker image
docker build -t devmentor/frontend:latest .

# Test locally
docker run -p 3001:3001 \
  -e NEXT_PUBLIC_API_GATEWAY_URL=http://api.devmentor.io \
  devmentor/frontend:latest

# Push to registry
docker tag devmentor/frontend:latest registry.devmentor.io/frontend:v1.0.0
docker push registry.devmentor.io/frontend:v1.0.0

# Deploy to Kubernetes
kubectl set image deployment/frontend \
  frontend=registry.devmentor.io/frontend:v1.0.0 \
  -n devmentor-app

# Monitor rollout
kubectl rollout status deployment/frontend -n devmentor-app
```

### 4. Vercel Deployment (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_API_GATEWAY_URL production
```

## Testing Procedures

### 1. Unit Testing

```bash
# Run all unit tests
npm run test:unit

# Test specific component
npm run test:unit -- ProjectTasksWidget

# Test with coverage
npm run test:unit:coverage

# Watch mode for development
npm run test:unit:watch
```

### 2. E2E Testing

```bash
# Install Playwright browsers
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run specific test
npx playwright test realtime-updates.spec.ts

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Run specific browser
npm run test:e2e -- --project=chromium

# Debug mode
npm run test:e2e -- --debug
```

### 3. Integration Testing

```bash
# Test with real backend
export NEXT_PUBLIC_MOCK_MODE=false
npm run dev

# Run integration tests
npm run test:integration

# Test WebSocket integration
npm run test:integration -- websocket

# Test API integration
npm run test:integration -- api
```

### 4. Performance Testing

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Bundle analysis
npm run build -- --analyze

# Runtime performance
# 1. Open Chrome DevTools
# 2. Performance tab
# 3. Record interaction
# 4. Check for:
#    - Long tasks > 50ms
#    - FPS drops
#    - Memory leaks
```

## Performance Optimization

### 1. Bundle Size Optimization

```bash
# Check current bundle size
npm run build | grep "First Load"

# Find large dependencies
npm run analyze

# Common optimizations:
# 1. Dynamic imports
const HeavyComponent = dynamic(() => import('./HeavyComponent'))

# 2. Tree shaking
import { specific } from 'library'  // Good
import * as all from 'library'      // Bad

# 3. Image optimization
import Image from 'next/image'
<Image src="/image.jpg" width={500} height={300} />
```

### 2. Runtime Performance

```bash
# Enable React Profiler
# In browser: React DevTools → Profiler → Start recording

# Check for unnecessary re-renders
# Add React.memo to components
const MemoizedComponent = React.memo(Component)

# Use callbacks for event handlers
const handleClick = useCallback(() => {
  // handler
}, [dependencies])

# Optimize state updates
// Batch updates
unstable_batchedUpdates(() => {
  setState1(value1)
  setState2(value2)
})
```

### 3. WebSocket Performance

```bash
# Monitor WebSocket metrics
# In browser console:
websocketService.getConnectionStatus()

# Check message frequency
localStorage.setItem('DEBUG', 'socket.io-client:*')

# Optimize event handling
// Debounce rapid updates
const debouncedUpdate = useMemo(
  () => debounce(handleUpdate, 100),
  []
)
```

## Incident Response

### 1. Frontend Not Loading

**Immediate Actions**:
```bash
# 1. Check deployment status
kubectl get pods -n devmentor-app | grep frontend

# 2. Check logs
kubectl logs deployment/frontend -n devmentor-app --tail=100

# 3. Rollback if needed
kubectl rollout undo deployment/frontend -n devmentor-app

# 4. Switch to maintenance mode
kubectl apply -f maintenance-page.yaml
```

### 2. WebSocket Connection Issues

**Quick Fix**:
```bash
# 1. Disable WebSocket globally
kubectl set env deployment/frontend \
  NEXT_PUBLIC_ENABLE_REALTIME=false -n devmentor-app

# 2. Restart frontend pods
kubectl rollout restart deployment/frontend -n devmentor-app

# 3. Notify users about degraded mode
# Banner will automatically show "Polling" mode
```

### 3. High Error Rate

**Investigation**:
```bash
# 1. Check error logs
kubectl logs deployment/frontend -n devmentor-app | grep ERROR

# 2. Check browser errors (Sentry/LogRocket)
curl https://sentry.io/api/projects/devmentor/issues/

# 3. Enable debug mode
kubectl set env deployment/frontend \
  NEXT_PUBLIC_DEBUG=true -n devmentor-app

# 4. Check specific component errors
grep -r "throw new Error" src/
```

### 4. Performance Degradation

**Response**:
```bash
# 1. Scale up pods
kubectl scale deployment/frontend --replicas=5 -n devmentor-app

# 2. Clear CDN cache
curl -X POST https://api.cloudflare.com/client/v4/zones/ZONE_ID/purge_cache \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'

# 3. Enable performance mode
kubectl set env deployment/frontend \
  NEXT_PUBLIC_PERFORMANCE_MODE=true -n devmentor-app

# 4. Disable heavy features temporarily
kubectl set env deployment/frontend \
  NEXT_PUBLIC_DISABLE_ANIMATIONS=true \
  NEXT_PUBLIC_DISABLE_REALTIME=true -n devmentor-app
```

## Feature Flags & Rollout

### 1. Feature Flag Setup

```bash
# Add feature flag to .env
echo "NEXT_PUBLIC_FEATURE_NEW_DASHBOARD=false" >> .env.local

# Use in code
if (process.env.NEXT_PUBLIC_FEATURE_NEW_DASHBOARD === 'true') {
  return <NewDashboard />
} else {
  return <OldDashboard />
}
```

### 2. Gradual Rollout

```bash
# 10% rollout
kubectl set env deployment/frontend \
  NEXT_PUBLIC_FEATURE_ROLLOUT_PERCENTAGE=10 -n devmentor-app

# Check in code
const isEnabled = Math.random() * 100 < rolloutPercentage

# 50% rollout
kubectl set env deployment/frontend \
  NEXT_PUBLIC_FEATURE_ROLLOUT_PERCENTAGE=50 -n devmentor-app

# 100% rollout
kubectl set env deployment/frontend \
  NEXT_PUBLIC_FEATURE_ROLLOUT_PERCENTAGE=100 -n devmentor-app
```

### 3. A/B Testing

```bash
# Configure A/B test
export NEXT_PUBLIC_AB_TEST_ENABLED=true
export NEXT_PUBLIC_AB_TEST_VARIANT=B

# Track metrics
if (variant === 'B') {
  analytics.track('feature_b_usage', {
    user: userId,
    timestamp: Date.now()
  })
}

# Analyze results
curl https://analytics.devmentor.io/api/ab-test/results
```

### 4. Quick Rollback

```bash
# Disable feature immediately
kubectl set env deployment/frontend \
  NEXT_PUBLIC_FEATURE_NEW_DASHBOARD=false -n devmentor-app

# Full rollback
kubectl rollout undo deployment/frontend -n devmentor-app

# Verify rollback
kubectl rollout status deployment/frontend -n devmentor-app
```

## Monitoring & Alerts

### Key Metrics to Track

```yaml
# Frontend metrics
- Page Load Time: < 3s
- Time to Interactive: < 5s
- First Contentful Paint: < 1.5s
- WebSocket Connection Rate: > 95%
- Error Rate: < 1%
- Bounce Rate: < 30%
```

### Useful Commands

```bash
# Check frontend health
curl https://devmentor.io/api/health

# Monitor real-time connections
watch -n 1 'curl -s http://localhost:8002/metrics | grep websocket'

# Check error logs
kubectl logs deployment/frontend -n devmentor-app | grep -E "ERROR|WARN"

# Performance metrics
lighthouse https://devmentor.io --output=json --output-path=./report.json
```

## Appendix

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| TypeScript errors | `npm run type-check` then fix errors |
| Build fails | Clear `.next` folder and rebuild |
| WebSocket not connecting | Check `NEXT_PUBLIC_WEBSOCKET_URL` |
| Slow performance | Run bundle analyzer, check for large deps |
| Tests failing | Update snapshots: `npm run test:unit -- -u` |

### Environment Variables

```bash
# Complete list for production
NEXT_PUBLIC_API_GATEWAY_URL=https://api.devmentor.io
NEXT_PUBLIC_WEBSOCKET_URL=wss://ws.devmentor.io
NEXT_PUBLIC_ENABLE_REALTIME=true
NEXT_PUBLIC_MOCK_MODE=false
NEXT_PUBLIC_SENTRY_DSN=https://sentry.io/...
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Contact Information

- **Frontend Team Lead**: frontend-lead@devmentor.io
- **On-call Engineer**: Use PagerDuty
- **Slack Channel**: #frontend-oncall
- **Documentation**: https://docs.devmentor.io/frontend

---

**Golden Rule**: Always verify in staging before production deployment.

Last reviewed: 2025-08-25 | Next review: 2025-09-25
{% endraw %}
