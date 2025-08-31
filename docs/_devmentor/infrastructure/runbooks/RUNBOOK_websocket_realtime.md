---
layout: product
title: RUNBOOK websocket realtime
product: DevMentor
source: infrastructure/runbooks/RUNBOOK_websocket_realtime.md
---

{% raw %}
# Runbook: WebSocket and Real-time Features

**Service**: WebSocket Gateway & Frontend Real-time Integration  
**Last Updated**: 2025-08-25  
**Criticality**: HIGH  
**On-call Team**: Platform & Frontend  

## Table of Contents
1. [Quick Reference](#quick-reference)
2. [Service Overview](#service-overview)
3. [Common Operations](#common-operations)
4. [Troubleshooting](#troubleshooting)
5. [Emergency Procedures](#emergency-procedures)
6. [Monitoring & Alerts](#monitoring--alerts)
7. [Deployment Procedures](#deployment-procedures)

## Quick Reference

### Key URLs
- **WebSocket Gateway**: `ws://localhost:8002` (dev) | `wss://devmentor.io/ws` (prod)
- **Frontend**: `http://localhost:3001` (dev) | `https://devmentor.io` (prod)
- **Health Check**: `http://localhost:8002/health`

### Critical Commands
```bash
# Check WebSocket server status
curl http://localhost:8002/health

# View WebSocket connections
kubectl logs -n devmentor-app deployment/websocket-gateway --tail=100

# Restart WebSocket gateway
kubectl rollout restart deployment/websocket-gateway -n devmentor-app

# Check frontend WebSocket config
grep WEBSOCKET .env.local
```

### Key Files
- Service: `/services/websocket-gateway/`
- Frontend: `/frontend/devmentor-ui/src/services/websocket.service.ts`
- Config: `/frontend/devmentor-ui/.env.local`
- Tests: `/frontend/devmentor-ui/tests/playwright/e2e/realtime-updates.spec.ts`

## Service Overview

### Architecture
```
┌─────────────┐     WebSocket      ┌──────────────┐     Redis      ┌─────────────┐
│   Browser   │ ←────────────────→ │  WS Gateway  │ ←────────────→ │   PubSub    │
│  (Client)   │     Socket.io      │   (Server)   │                │   (Events)  │
└─────────────┘                    └──────────────┘                └─────────────┘
                                           ↓
                                    ┌──────────────┐
                                    │   Services   │
                                    │ (Project/AI) │
                                    └──────────────┘
```

### Dependencies
- **Frontend**: socket.io-client v4.8.1
- **Backend**: socket.io server (port 8002)
- **Redis**: For multi-instance scaling (optional)
- **Services**: Project Service, Auth Service

## Common Operations

### 1. Starting WebSocket Service Locally

```bash
# Terminal 1: Start WebSocket server
cd services/websocket-gateway
npm install
npm run dev

# Terminal 2: Start frontend with WebSocket enabled
cd frontend/devmentor-ui
export NEXT_PUBLIC_ENABLE_REALTIME=true
export NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:8002
npm run dev

# Verify connection
curl http://localhost:8002/health
# Expected: {"status":"healthy","connections":0}
```

### 2. Enabling/Disabling Real-time Features

#### Enable WebSocket (Real-time)
```bash
# Update .env.local
echo "NEXT_PUBLIC_ENABLE_REALTIME=true" >> .env.local
echo "NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:8002" >> .env.local

# Restart frontend
npm run dev
```

#### Disable WebSocket (Polling Mode)
```bash
# Update .env.local
sed -i '' 's/NEXT_PUBLIC_ENABLE_REALTIME=true/NEXT_PUBLIC_ENABLE_REALTIME=false/' .env.local

# Restart frontend
npm run dev
```

### 3. Testing Real-time Features

```bash
# Run verification script
cd frontend/devmentor-ui
./scripts/verify-integration.sh

# Manual test
1. Open two browser windows
2. Navigate both to http://localhost:3001/projects
3. Drag a task in window 1
4. Verify task moves in window 2
5. Check for "Live" indicator (green badge)
```

### 4. Monitoring Connections

```bash
# Local development
# Check browser console for WebSocket logs
localStorage.setItem('DEBUG', 'socket.io-client:*');

# Production - Check server logs
kubectl logs -n devmentor-app deployment/websocket-gateway --tail=100 -f

# Count active connections
kubectl exec -n devmentor-app deployment/websocket-gateway -- \
  curl -s localhost:8002/metrics | grep websocket_connections
```

## Troubleshooting

### Issue: Connection Not Establishing

**Symptoms**: 
- "Polling" badge shown instead of "Live"
- Console errors about WebSocket connection

**Diagnosis**:
```bash
# 1. Check if WebSocket server is running
curl http://localhost:8002/health

# 2. Check browser console
# Look for: WebSocket connection to 'ws://...' failed

# 3. Check CORS settings
grep -A5 "cors:" services/websocket-gateway/src/index.ts

# 4. Check firewall/proxy
# Ensure WebSocket upgrade headers are allowed
```

**Resolution**:
```bash
# Option 1: Restart WebSocket server
cd services/websocket-gateway
npm run dev

# Option 2: Check environment variables
cd frontend/devmentor-ui
cat .env.local | grep WEBSOCKET

# Option 3: Force polling mode temporarily
export NEXT_PUBLIC_ENABLE_REALTIME=false
npm run dev
```

### Issue: Events Not Received

**Symptoms**:
- Connected but updates not showing
- Other users don't see changes

**Diagnosis**:
```bash
# 1. Check room membership
# In browser console:
websocketService.getConnectionStatus()

# 2. Check server broadcasting
tail -f services/websocket-gateway/logs/app.log | grep "emit"

# 3. Verify event names match
grep -r "task:updated" frontend/devmentor-ui/src/
```

**Resolution**:
```bash
# Option 1: Rejoin project room
# In browser console:
websocketService.leaveProject('old-id');
websocketService.joinProject('correct-id');

# Option 2: Clear and reconnect
websocketService.disconnect();
websocketService.connect();
```

### Issue: High Memory Usage

**Symptoms**:
- Server memory increasing over time
- Slow WebSocket responses

**Diagnosis**:
```bash
# Check memory usage
kubectl top pod -n devmentor-app | grep websocket

# Check for memory leaks
npm run test:memory

# Count connections
curl http://localhost:8002/metrics | grep connections
```

**Resolution**:
```bash
# Option 1: Restart with memory limit
kubectl set resources deployment/websocket-gateway \
  --limits=memory=512Mi -n devmentor-app

# Option 2: Enable connection limits
# In websocket config:
export MAX_CONNECTIONS=1000
export CONNECTION_TIMEOUT=300000  # 5 minutes

# Option 3: Clean up stale connections
kubectl exec -it deployment/websocket-gateway -- \
  node scripts/cleanup-connections.js
```

## Emergency Procedures

### 1. Complete WebSocket Failure

**Immediate Response** (2 minutes):
```bash
# 1. Switch to polling mode globally
kubectl set env deployment/frontend \
  NEXT_PUBLIC_ENABLE_REALTIME=false -n devmentor-app

# 2. Notify users
kubectl apply -f emergency/polling-mode-banner.yaml

# 3. Page on-call
./scripts/page-oncall.sh "WebSocket service down"
```

**Investigation** (5 minutes):
```bash
# Check logs
kubectl logs -n devmentor-app deployment/websocket-gateway --tail=500

# Check events
kubectl get events -n devmentor-app --sort-by='.lastTimestamp'

# Check resource usage
kubectl describe pod -l app=websocket-gateway -n devmentor-app
```

**Recovery** (10 minutes):
```bash
# Option 1: Rolling restart
kubectl rollout restart deployment/websocket-gateway -n devmentor-app
kubectl rollout status deployment/websocket-gateway -n devmentor-app

# Option 2: Scale and restart
kubectl scale deployment/websocket-gateway --replicas=0 -n devmentor-app
sleep 10
kubectl scale deployment/websocket-gateway --replicas=2 -n devmentor-app

# Option 3: Rollback to previous version
kubectl rollout undo deployment/websocket-gateway -n devmentor-app
```

### 2. Performance Degradation

**Symptoms**:
- Slow updates (>1 second latency)
- Intermittent disconnections

**Response**:
```bash
# 1. Scale up immediately
kubectl scale deployment/websocket-gateway --replicas=4 -n devmentor-app

# 2. Enable rate limiting
kubectl set env deployment/websocket-gateway \
  RATE_LIMIT_ENABLED=true \
  RATE_LIMIT_WINDOW=60000 \
  RATE_LIMIT_MAX=100 -n devmentor-app

# 3. Clear Redis cache if used
kubectl exec -it deployment/redis -- redis-cli FLUSHDB

# 4. Monitor recovery
watch 'kubectl top pod -n devmentor-app | grep websocket'
```

### 3. Security Incident

**Suspicious Activity Detected**:
```bash
# 1. Enable strict mode immediately
kubectl set env deployment/websocket-gateway \
  STRICT_MODE=true \
  REQUIRE_AUTH=true -n devmentor-app

# 2. Block suspicious IPs
kubectl apply -f security/websocket-network-policy.yaml

# 3. Rotate secrets
kubectl delete secret websocket-secrets -n devmentor-app
kubectl create secret generic websocket-secrets \
  --from-literal=jwt-secret=$(openssl rand -base64 32) \
  -n devmentor-app

# 4. Audit connections
kubectl exec deployment/websocket-gateway -- \
  node scripts/audit-connections.js > audit.log
```

## Monitoring & Alerts

### Key Metrics

```yaml
# Prometheus queries
- name: websocket_connections_total
  query: sum(websocket_connections)
  warning: > 1000
  critical: > 2000

- name: websocket_message_rate
  query: rate(websocket_messages_total[5m])
  warning: > 1000
  critical: > 5000

- name: websocket_error_rate
  query: rate(websocket_errors_total[5m])
  warning: > 10
  critical: > 50

- name: websocket_latency_p99
  query: histogram_quantile(0.99, websocket_latency_seconds)
  warning: > 1
  critical: > 5
```

### Grafana Dashboard

Import dashboard:
```bash
kubectl create configmap websocket-dashboard \
  --from-file=dashboards/websocket-realtime.json \
  -n monitoring
```

### Alert Rules

```yaml
# AlertManager configuration
groups:
  - name: websocket
    rules:
      - alert: WebSocketDown
        expr: up{job="websocket-gateway"} == 0
        for: 1m
        annotations:
          summary: "WebSocket gateway is down"
          runbook: "docs/runbooks/RUNBOOK_websocket_realtime.md#emergency-procedures"
      
      - alert: HighWebSocketConnections
        expr: websocket_connections > 2000
        for: 5m
        annotations:
          summary: "High number of WebSocket connections"
          runbook: "docs/runbooks/RUNBOOK_websocket_realtime.md#performance-degradation"
```

## Deployment Procedures

### 1. Pre-deployment Checklist

```bash
# 1. Run tests
cd frontend/devmentor-ui
npm run test:unit:services
npm run test:e2e

# 2. Check configuration
./scripts/verify-integration.sh

# 3. Backup current deployment
kubectl get deployment websocket-gateway -n devmentor-app -o yaml > backup.yaml

# 4. Check current connections
curl http://websocket-gateway:8002/metrics | grep connections
```

### 2. Blue-Green Deployment

```bash
# 1. Deploy green version
kubectl apply -f deployments/websocket-gateway-green.yaml

# 2. Test green version
curl http://websocket-gateway-green:8002/health

# 3. Switch traffic
kubectl patch service websocket-gateway -p \
  '{"spec":{"selector":{"version":"green"}}}'

# 4. Monitor
kubectl logs -f deployment/websocket-gateway-green

# 5. Cleanup old version
kubectl delete deployment websocket-gateway-blue
```

### 3. Rollback Procedure

```bash
# Immediate rollback
kubectl rollout undo deployment/websocket-gateway -n devmentor-app

# Rollback to specific version
kubectl rollout history deployment/websocket-gateway -n devmentor-app
kubectl rollout undo deployment/websocket-gateway --to-revision=3 -n devmentor-app

# Verify rollback
kubectl rollout status deployment/websocket-gateway -n devmentor-app
```

### 4. Post-deployment Verification

```bash
# 1. Health check
curl http://websocket-gateway:8002/health

# 2. Test real-time features
npm run test:e2e -- --grep "real-time"

# 3. Check metrics
curl http://websocket-gateway:8002/metrics

# 4. Monitor logs for 5 minutes
kubectl logs -f deployment/websocket-gateway --tail=100

# 5. User verification
echo "Please verify real-time updates are working at https://devmentor.io/projects"
```

## Appendix

### Environment Variables Reference

```bash
# Frontend (.env.local)
NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:8002
NEXT_PUBLIC_ENABLE_REALTIME=true
NEXT_PUBLIC_MOCK_MODE=false

# WebSocket Server
PORT=8002
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3001
MAX_CONNECTIONS=1000
CONNECTION_TIMEOUT=300000
RATE_LIMIT_ENABLED=false
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=100
```

### Useful Scripts

```bash
# Monitor connections in real-time
watch -n 1 'curl -s http://localhost:8002/metrics | grep websocket'

# Test WebSocket connection
wscat -c ws://localhost:8002

# Generate load test
npm run test:load -- --connections=100 --duration=60

# Clean up stale connections
node scripts/cleanup-stale-connections.js
```

### Contact Information

- **Platform Team**: platform@devmentor.io
- **Frontend Team**: frontend@devmentor.io
- **On-call**: Use PagerDuty or call +1-555-DEVMENT

---

**Remember**: When in doubt, switch to polling mode first to maintain service availability, then investigate.

Last reviewed: 2025-08-25 | Next review: 2025-09-25
{% endraw %}
