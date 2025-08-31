---
layout: product
title: 2024-08-20-k8s-deployment-fixes
product: DevMentor
source: devlog/2024-08-20-k8s-deployment-fixes.md
---

{% raw %}
# DevLog: Kubernetes Deployment Fixes
**Date**: August 20, 2024
**Author**: DevMentor Team
**Category**: Infrastructure, Kubernetes, Debugging

## Overview
This devlog documents the process of fixing critical Kubernetes deployment issues in the DevMentor platform, including Auth Service configuration errors, AI Gateway module dependencies, and consolidating duplicate services.

## 📐 Service Architecture Diagrams
Each service now has detailed architecture documentation in DesignGurus.io format:
- **[AI Gateway Architecture](../../services/ai-gateway/docs/ai-gateway-architecture.md)** - Port 3001
- **[Auth Service Architecture](../../services/auth-service/docs/auth-service-architecture.md)** - Port 3002
- **[Memory Service Architecture](../../services/memory-service/docs/memory-service-architecture.md)** - Port 3003
- **[Project Service Architecture](../../services/project-service/docs/project-service-architecture.md)** - Port 3004

## Initial State
- **Cluster**: Kind (Kubernetes in Docker) with 3 nodes
- **Issues Found**:
  - Auth Service: `CreateContainerConfigError` - missing secrets
  - AI Gateway: `CrashLoopBackOff` - missing npm modules
  - Duplicate services running in both K8s and standalone Docker
  - Keycloak: Frequent restarts (34 times)

## Issues and Resolutions

### 1. Auth Service Configuration Issues

#### Problem
```
Error: couldn't find key database-url in Secret devmentor/devmentor-secrets
```

#### Root Cause
- Deployment expected lowercase keys (`database-url`, `jwt-secret`)
- Secret contained uppercase keys (`DATABASE_URL`, `JWT_SECRET`)
- Missing ConfigMap `devmentor-config`
- Missing `vault-token` secret

#### Solution
```bash
# Added lowercase keys to existing secret
kubectl patch secret devmentor-secrets -n devmentor --type='json' \
  -p='[{"op": "add", "path": "/data/database-url", "value": "..."}, 
       {"op": "add", "path": "/data/jwt-secret", "value": "..."}]'

# Created missing ConfigMap
kubectl create configmap devmentor-config -n devmentor \
  --from-literal=redis-url="redis://redis.devmentor-data:6379"

# Created vault-token secret
kubectl create secret generic vault-token -n devmentor \
  --from-literal=token="dummy-vault-token"
```

### 2. AI Gateway Module Dependencies

#### Problem
```
Error: Cannot find module 'ws'
Require stack:
- /app/src/index.ts
```

#### Root Cause
- Missing WebSocket (`ws`) package in package.json
- Docker image built without required dependency

#### Solution
1. Updated `services/ai-gateway/package.json`:
```json
"dependencies": {
  // ... existing deps
  "ws": "^8.14.2"
}
```

2. Rebuilt and loaded image:
```bash
cd services/ai-gateway
docker build -t devmentor/ai-gateway:latest .
kind load docker-image devmentor/ai-gateway:latest --name devmentor
kubectl rollout restart deployment -n devmentor ai-gateway
```

### 3. Service Architecture Analysis

#### Current Hybrid Setup
**Kubernetes Services**:
- PostgreSQL, Redis, Qdrant (devmentor-data namespace)
- Ollama, AI Gateway (devmentor namespace)
- Full Istio service mesh with observability
- Keycloak for authentication

**Standalone Docker Containers**:
- Duplicate PostgreSQL (postgres-1)
- Duplicate Redis (redis-1)
- Custom monitoring-service
- Duplicate observability stack (Prometheus, Grafana, Loki, etc.)

## Debugging Commands Used

### Pod Status Checks
```bash
kubectl get pods --all-namespaces
kubectl get pods -n devmentor | grep -E "NAME|ai-gateway|auth-service"
```

### Log Investigation
```bash
kubectl logs -n devmentor <pod-name> --tail=30
kubectl describe pod -n devmentor <pod-name>
```

### Secret/ConfigMap Debugging
```bash
kubectl get secret -n devmentor devmentor-secrets -o yaml
kubectl get configmap -n devmentor devmentor-config -o yaml
```

### Service Discovery
```bash
kubectl get services --all-namespaces
kubectl get deployments -n devmentor
```

## Current Status

### ✅ Fixed
- AI Gateway: Now running with all dependencies
- ConfigMaps and Secrets: All required keys added
- Basic connectivity established

### ⚠️ Pending Issues
- Auth Service: Still needs proper Docker image build
- Duplicate services need consolidation
- Monitoring service needs K8s deployment

### 🔄 Next Steps
1. Build proper auth-service Docker image
2. Create K8s deployment for monitoring-service
3. Clean up duplicate Docker containers
4. Update system documentation

## Lessons Learned

1. **Secret Key Format**: Always verify the exact key names expected by deployments
2. **Module Dependencies**: Ensure all npm packages are listed in package.json before building
3. **Image Loading**: Use `kind load docker-image` after every rebuild for local clusters
4. **Service Discovery**: Use full DNS names (e.g., `service.namespace.svc.cluster.local`)
5. **Debugging Order**: Check Events → Logs → Describe → ConfigMaps/Secrets

## Performance Impact
- Reduced resource usage by identifying duplicate services
- Improved startup time with proper dependency management
- Better error visibility through structured logging

## References
- [Kubernetes Debugging Guide](https://kubernetes.io/docs/tasks/debug/)
- [Kind Documentation](https://kind.sigs.k8s.io/)
- [Istio Service Mesh](https://istio.io/)
{% endraw %}
