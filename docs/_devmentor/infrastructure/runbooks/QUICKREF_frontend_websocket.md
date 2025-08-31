---
layout: product
title: QUICKREF frontend websocket
product: DevMentor
source: infrastructure/runbooks/QUICKREF_frontend_websocket.md
---

{% raw %}
# Quick Reference: Frontend & WebSocket Operations

**For on-call engineers** | **Print this page** | **Keep it handy**

## 🚨 Emergency Commands (Copy & Paste)

### WebSocket Down - Switch to Polling (2 min fix)
```bash
kubectl set env deployment/frontend NEXT_PUBLIC_ENABLE_REALTIME=false -n devmentor-app
kubectl rollout restart deployment/frontend -n devmentor-app
```

### Frontend Not Loading - Quick Rollback (3 min fix)
```bash
kubectl rollout undo deployment/frontend -n devmentor-app
kubectl rollout status deployment/frontend -n devmentor-app
```

### High Error Rate - Enable Debug Mode
```bash
kubectl set env deployment/frontend NEXT_PUBLIC_DEBUG=true -n devmentor-app
kubectl logs deployment/frontend -n devmentor-app --tail=500 | grep ERROR
```

### Performance Issues - Scale Up
```bash
kubectl scale deployment/frontend --replicas=5 -n devmentor-app
kubectl scale deployment/websocket-gateway --replicas=3 -n devmentor-app
```

## 📊 Health Check URLs

| Service | Health Check | Expected |
|---------|--------------|----------|
| Frontend Dev | `curl http://localhost:3001/api/health` | 200 OK |
| Frontend Prod | `curl https://devmentor.io/api/health` | 200 OK |
| WebSocket Dev | `curl http://localhost:8002/health` | `{"status":"healthy"}` |
| WebSocket Prod | `curl https://ws.devmentor.io/health` | `{"status":"healthy"}` |

## 🔍 Quick Diagnostics

### Is WebSocket Working?
```bash
# Check connection count
curl http://websocket-gateway:8002/metrics | grep connections

# Check logs for errors
kubectl logs deployment/websocket-gateway -n devmentor-app --tail=50 | grep ERROR

# Test from browser console
websocketService.getConnectionStatus()  // Should return true
```

### Is Frontend Healthy?
```bash
# Check pod status
kubectl get pods -n devmentor-app | grep frontend

# Check recent errors
kubectl logs deployment/frontend -n devmentor-app --tail=100 | grep -E "ERROR|CRASH"

# Check memory usage
kubectl top pod -n devmentor-app | grep frontend
```

## 🔧 Common Fixes

### Problem: "Polling" badge instead of "Live"
```bash
# Fix 1: Restart WebSocket gateway
kubectl rollout restart deployment/websocket-gateway -n devmentor-app

# Fix 2: Check WebSocket URL config
kubectl get deployment frontend -o yaml | grep WEBSOCKET_URL

# Fix 3: Check CORS settings
kubectl exec deployment/websocket-gateway -- cat config.json | grep cors
```

### Problem: Tasks not updating in real-time
```bash
# Fix 1: Clear Redis cache
kubectl exec deployment/redis -- redis-cli FLUSHDB

# Fix 2: Restart both services
kubectl rollout restart deployment/websocket-gateway deployment/frontend -n devmentor-app

# Fix 3: Check room subscriptions (browser console)
websocketService.joinProject('project-id')
```

### Problem: High memory usage
```bash
# Fix 1: Restart with limits
kubectl set resources deployment/websocket-gateway --limits=memory=512Mi -n devmentor-app

# Fix 2: Clean connections
kubectl exec deployment/websocket-gateway -- node scripts/cleanup-connections.js

# Fix 3: Scale horizontally instead
kubectl scale deployment/websocket-gateway --replicas=3 -n devmentor-app
```

## 📱 Who to Call

| Issue | Primary | Backup | Escalation |
|-------|---------|--------|------------|
| Frontend Down | Frontend On-call | Platform On-call | CTO |
| WebSocket Down | Platform On-call | Frontend On-call | CTO |
| Data Loss | Backend On-call | Database Admin | CTO |
| Security | Security On-call | Platform Lead | CISO |

**PagerDuty**: +1-555-DEVMENT  
**Slack**: #incident-response  
**Status Page**: https://status.devmentor.io

## 🎯 Decision Tree

```
Frontend Issue?
├─ Loading at all?
│  ├─ No → Rollback deployment
│  └─ Yes → Check console errors
│     ├─ API errors → Check backend services
│     └─ JS errors → Check recent commits
└─ Performance issue?
   ├─ Slow loading → Check bundle size, CDN
   └─ Slow updates → Check WebSocket
      ├─ Not connected → Switch to polling
      └─ Connected → Check server load
```

## 📝 Monitoring Dashboard Links

- **Grafana**: https://grafana.devmentor.io/d/frontend
- **WebSocket Metrics**: https://grafana.devmentor.io/d/websocket
- **Error Tracking**: https://sentry.devmentor.io/projects/frontend
- **Uptime**: https://uptime.devmentor.io

## ⚡ Performance Thresholds

| Metric | Good | Warning | Critical | Action |
|--------|------|---------|----------|--------|
| Page Load | <3s | 3-5s | >5s | Check CDN, bundle size |
| WebSocket Latency | <100ms | 100-500ms | >500ms | Scale WebSocket servers |
| Error Rate | <1% | 1-5% | >5% | Check logs, rollback |
| Memory Usage | <70% | 70-85% | >85% | Restart pods |
| CPU Usage | <60% | 60-80% | >80% | Scale horizontally |

## 🔄 Rollback Procedures

### Frontend Rollback
```bash
# List versions
kubectl rollout history deployment/frontend -n devmentor-app

# Rollback to previous
kubectl rollout undo deployment/frontend -n devmentor-app

# Rollback to specific version
kubectl rollout undo deployment/frontend --to-revision=5 -n devmentor-app
```

### WebSocket Rollback
```bash
# Quick rollback
kubectl rollout undo deployment/websocket-gateway -n devmentor-app

# Verify
kubectl rollout status deployment/websocket-gateway -n devmentor-app
```

## 🛠️ Useful Browser Console Commands

```javascript
// Check WebSocket status
websocketService.getConnectionStatus()

// Manually reconnect
websocketService.disconnect()
websocketService.connect()

// Join project room
websocketService.joinProject('project-123')

// Enable debug logging
localStorage.setItem('DEBUG', 'socket.io-client:*')

// Check environment
console.log(process.env.NEXT_PUBLIC_ENABLE_REALTIME)
console.log(process.env.NEXT_PUBLIC_WEBSOCKET_URL)

// Force refresh data
location.reload(true)
```

## 📋 Pre-incident Checklist

Before declaring an incident:
- [ ] Check status page for known issues
- [ ] Verify from multiple locations (VPN on/off)
- [ ] Check recent deployments (last 2 hours)
- [ ] Test in incognito mode
- [ ] Check monitoring dashboards

## 🔴 Incident Response Steps

1. **Acknowledge** (2 min)
   - Respond in #incident-response
   - Create incident channel #inc-YYYYMMDD-description

2. **Assess** (5 min)
   - Impact: How many users affected?
   - Scope: Which features broken?
   - Severity: P1/P2/P3?

3. **Mitigate** (10 min)
   - Try quick fixes first
   - Consider rollback
   - Enable degraded mode if needed

4. **Communicate** (ongoing)
   - Update status page
   - Post in #general every 30 min
   - Email for P1 incidents

5. **Resolve** (varies)
   - Fix root cause
   - Verify resolution
   - Monitor for 30 min

6. **Review** (next day)
   - Schedule post-mortem
   - Document lessons learned
   - Update runbooks

---

**Remember**: 
- 🚀 **Fast mitigation > perfect fix**
- 📢 **Over-communicate during incidents**
- 🔄 **When in doubt, rollback**
- 📝 **Document everything**

**Last Updated**: 2025-08-25 | **Version**: 1.0
{% endraw %}
