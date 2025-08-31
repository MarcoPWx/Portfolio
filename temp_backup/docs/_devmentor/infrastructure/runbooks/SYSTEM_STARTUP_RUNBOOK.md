---
layout: product
title: SYSTEM STARTUP RUNBOOK
product: DevMentor
source: infrastructure/runbooks/SYSTEM_STARTUP_RUNBOOK.md
---

{% raw %}
# DevMentor System Startup & Verification Runbook

## Current System Status Check

### ✅ What's Working
```bash
# Kubernetes Cluster: RUNNING
kubectl get nodes
# Output: 3 nodes ready (control-plane + 2 workers)

# Core Services: PARTIALLY RUNNING
- PostgreSQL: ✅ Running (port 5432)
- Redis: ✅ Running (port 6379)
- API Gateway: ⚠️ Running but crashlooping (1/2 containers)
- Frontend: ✅ Running (port 3000 with health endpoint)
```

### ❌ What's Missing/Broken
1. **API Gateway Issues**: CrashLoopBackOff - needs investigation
2. **Auth Service**: Not deployed
3. **AI Gateway**: Not deployed
4. **Ollama**: Not deployed
5. **Frontend → Backend Connection**: Not configured

## Step-by-Step Startup Guide

### Step 1: Fix API Gateway
```bash
# Check why it's crashing
kubectl logs deployment/api-gateway -n devmentor-app

# Common fixes:
# 1. Missing environment variables
kubectl set env deployment/api-gateway \
  REDIS_URL=redis://redis.devmentor-data.svc.cluster.local:6379 \
  DATABASE_URL=postgresql://postgres:password@postgresql.devmentor-data.svc.cluster.local:5432/devmentor \
  -n devmentor-app

# 2. Restart the deployment
kubectl rollout restart deployment/api-gateway -n devmentor-app

# 3. Check status
kubectl get pods -n devmentor-app -w
```

### Step 2: Deploy Missing Services
```bash
# Deploy Auth Service
kubectl apply -f infrastructure/k8s/services/auth-service.yaml

# Deploy AI Gateway
kubectl apply -f infrastructure/k8s/services/ai-gateway.yaml

# Deploy Ollama (if needed for AI)
kubectl apply -f infrastructure/k8s/services/ollama.yaml
```

### Step 3: Connect Frontend to Backend

#### Option A: Direct Connection (Development)
```typescript
// frontend/devmentor-ui/.env.local
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8080
NEXT_PUBLIC_USE_MOCK_DATA=false
```

```bash
# Port-forward API Gateway
kubectl port-forward service/api-gateway 8080:8080 -n devmentor-app
```

#### Option B: Through Istio Ingress (Production-like)
```bash
# Check Istio Gateway
kubectl get gateway -n istio-system

# Port-forward Istio Ingress
kubectl port-forward service/istio-ingressgateway 8080:80 -n istio-system
```

### Step 4: Verify All Endpoints

```bash
# 1. Frontend Health
curl http://localhost:3000/api/health
# Expected: {"database":"ok","version":"12.1.0"}

# 2. API Gateway Health (after port-forward)
curl http://localhost:8080/health
# Expected: {"status":"healthy"}

# 3. Test Auth Flow
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# 4. Test Project Service
curl http://localhost:8080/api/projects \
  -H "Authorization: Bearer <token>"
```

## Quick Start Commands

### Start Everything (From Scratch)
```bash
# 1. Ensure cluster is running
kind get clusters
# If not: kind create cluster --config infrastructure/k8s/kind-config.yaml

# 2. Apply all manifests
kubectl apply -f infrastructure/k8s/namespaces/
kubectl apply -f infrastructure/k8s/services/

# 3. Wait for pods
kubectl wait --for=condition=ready pod --all -n devmentor-app --timeout=300s
kubectl wait --for=condition=ready pod --all -n devmentor-data --timeout=300s

# 4. Port forwards
kubectl port-forward service/api-gateway 8080:8080 -n devmentor-app &
kubectl port-forward service/postgresql 5432:5432 -n devmentor-data &
kubectl port-forward service/redis 6379:6379 -n devmentor-data &

# 5. Start frontend
cd frontend/devmentor-ui
npm run dev
```

### Health Check Script
```bash
#!/bin/bash
# save as: check-health.sh

echo "🔍 Checking DevMentor System Health..."

# Check Kubernetes
echo -n "Kubernetes Cluster: "
kubectl get nodes > /dev/null 2>&1 && echo "✅" || echo "❌"

# Check Pods
echo -n "PostgreSQL: "
kubectl get pod -l app=postgresql -n devmentor-data -o jsonpath='{.items[0].status.phase}' 2>/dev/null | grep -q Running && echo "✅" || echo "❌"

echo -n "Redis: "
kubectl get pod -l app=redis -n devmentor-data -o jsonpath='{.items[0].status.phase}' 2>/dev/null | grep -q Running && echo "✅" || echo "❌"

echo -n "API Gateway: "
kubectl get pod -l app=api-gateway -n devmentor-app -o jsonpath='{.items[0].status.phase}' 2>/dev/null | grep -q Running && echo "✅" || echo "❌"

# Check Frontend
echo -n "Frontend: "
curl -s http://localhost:3000/api/health > /dev/null 2>&1 && echo "✅" || echo "❌"

# Check Endpoints
echo -n "API Gateway Endpoint: "
curl -s http://localhost:8080/health > /dev/null 2>&1 && echo "✅" || echo "❌"
```

## Development Priorities

### 1. Immediate Fix (Today)
```bash
# Fix API Gateway crash
kubectl describe pod -l app=api-gateway -n devmentor-app
# Look for "Events" section for error details

# Most likely issue: Missing service dependencies
# Solution: Check if auth-service is running
kubectl get svc -n devmentor-app
```

### 2. Critical Implementation (This Week)
1. **RedisLockManager** - Prevent data conflicts
   - Location: `infrastructure/services/shared/RedisLockManager.ts`
   - Test: Multiple users editing same project

2. **API Gateway Routes** - Connect frontend to backend
   - Add `/api/projects/*/claim` endpoint
   - Add `/api/projects/*/release` endpoint

3. **Frontend API Client** - Unified backend communication
   - Location: `frontend/lib/api/client.ts`

### 3. Important Features (Next Week)
1. **Blackboard Pattern** - AI collaboration
2. **OpenAPI Specs** - API documentation
3. **Saga Pattern** - Distributed transactions

## Troubleshooting Guide

### API Gateway CrashLoopBackOff
```bash
# Get detailed error
kubectl logs deployment/api-gateway -n devmentor-app --previous

# Common solutions:
# 1. Database connection issue
kubectl exec -it deployment/api-gateway -n devmentor-app -- nc -zv postgresql.devmentor-data.svc.cluster.local 5432

# 2. Redis connection issue
kubectl exec -it deployment/api-gateway -n devmentor-app -- nc -zv redis.devmentor-data.svc.cluster.local 6379

# 3. Missing ConfigMap
kubectl get configmap -n devmentor-app

# 4. Resource limits
kubectl describe pod -l app=api-gateway -n devmentor-app | grep -A 5 "Limits"
```

### Frontend Can't Connect to Backend
```bash
# 1. Check CORS settings in API Gateway
# 2. Verify port-forward is running
ps aux | grep "port-forward"

# 3. Test direct connection
curl -v http://localhost:8080/api/health

# 4. Check browser console for errors
# Open DevTools → Network tab → Look for failed requests
```

### Database Connection Issues
```bash
# Test connection from pod
kubectl run -it --rm debug --image=postgres:14 --restart=Never -n devmentor-data -- \
  psql -h postgresql -U postgres -d devmentor -c "SELECT 1"
```

## Beta Launch Checklist

- [ ] All services running without crashes
- [ ] Frontend connects to API Gateway
- [ ] Authentication flow works
- [ ] Project creation/editing works
- [ ] AI features respond (even if mocked)
- [ ] Real-time updates work (WebSocket/SSE)
- [ ] No errors in browser console
- [ ] Health endpoints return 200 OK

## Next Development Steps

Based on current state, here's where to start:

1. **Fix API Gateway** (30 minutes)
   ```bash
   cd infrastructure/services/api-gateway
   # Check logs, fix configuration
   ```

2. **Implement RedisLockManager** (2 hours)
   ```bash
   cd infrastructure/services/shared
   # Create RedisLockManager.ts
   ```

3. **Add Claim/Release Endpoints** (1 hour)
   ```bash
   cd infrastructure/services/project-service
   # Add to routes.ts
   ```

4. **Test End-to-End** (1 hour)
   ```bash
   cd frontend/devmentor-ui
   npm run test:e2e
   ```

Ready to start? Begin with fixing the API Gateway!
{% endraw %}
