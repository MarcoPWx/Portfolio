---
layout: product
title: RUNBOOK istio-gateway-setup
product: DevMentor
source: infrastructure/runbooks/RUNBOOK_istio-gateway-setup.md
---

{% raw %}
# Istio Gateway & Service Deployment Runbook

## Overview
This runbook documents how to set up Istio Gateway, VirtualService, and deploy core services for DevMentor.

## Prerequisites
- Kind cluster running with Istio installed
- Docker images built locally
- kubectl configured to access the cluster

## Quick Status Check
```bash
# Check current status
kubectl get pods -n devmentor-app
kubectl get pods -n devmentor-data
kubectl get gateway,virtualservice -n devmentor-app
```

## Step 1: Apply Istio Configuration

### What it does
- Creates Gateway on port 80 for host `devmentor.local`
- Sets up VirtualService routing rules
- Configures DestinationRules for canary deployments
- Enables external API access via ServiceEntry

```bash
kubectl apply -f infrastructure/k8s/istio/devmentor-traffic.yaml
```

### Verify
```bash
kubectl get gateway,virtualservice -n devmentor-app
# Expected: devmentor-gateway and devmentor-routes
```

## Step 2: Create Required Secrets

### Create basic secrets for services
```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: auth-service-secrets
  namespace: devmentor-app
type: Opaque
stringData:
  JWT_SECRET: "dev-jwt-secret-change-in-production"
  GITHUB_CLIENT_ID: "placeholder"
  GITHUB_CLIENT_SECRET: "placeholder"
---
apiVersion: v1
kind: Secret
metadata:
  name: postgres-conn
  namespace: devmentor-app
type: Opaque
stringData:
  DATABASE_URL: "postgresql://postgres:postgres@postgresql.devmentor-data.svc.cluster.local:5432/devmentor"
  POSTGRES_HOST: "postgresql.devmentor-data.svc.cluster.local"
  POSTGRES_PORT: "5432"
  POSTGRES_DB: "devmentor"
  POSTGRES_USER: "postgres"
  POSTGRES_PASSWORD: "postgres"
---
apiVersion: v1
kind: Secret
metadata:
  name: redis-conn
  namespace: devmentor-app
type: Opaque
stringData:
  REDIS_URL: "redis://redis.devmentor-data.svc.cluster.local:6379"
  REDIS_HOST: "redis.devmentor-data.svc.cluster.local"
  REDIS_PORT: "6379"
EOF
```

## Step 3: Load Docker Images into Kind

```bash
# Build images if needed
docker build -t devmentor/api-gateway:latest infrastructure/services/api-gateway/
docker build -t devmentor/auth-service:latest infrastructure/services/auth-service/

# Load into Kind cluster
kind load docker-image devmentor/api-gateway:latest devmentor/auth-service:latest --name devmentor
```

## Step 4: Deploy Services

### API Gateway
```bash
kubectl apply -f infrastructure/k8s/deployments/api-gateway.yaml
```

### Auth Service
```bash
kubectl apply -f infrastructure/k8s/deployments/auth-service.yaml
```

### Other services (when ready)
```bash
# kubectl apply -f infrastructure/k8s/deployments/ai-gateway.yaml
# kubectl apply -f infrastructure/k8s/deployments/memory-service.yaml
# kubectl apply -f infrastructure/k8s/deployments/project-service.yaml
```

## Step 5: Verify Services are Running

```bash
# Check pod status
kubectl get pods -n devmentor-app

# Wait for pods to be ready
kubectl wait --for=condition=ready pod -l app=api-gateway -n devmentor-app --timeout=60s
kubectl wait --for=condition=ready pod -l app=auth-service -n devmentor-app --timeout=60s
```

## Step 6: Test the Setup

### Direct port-forward test
```bash
# Port forward to API Gateway
kubectl port-forward -n devmentor-app svc/api-gateway 8080:8080 &

# Test health endpoint
curl http://localhost:8080/health | jq

# Expected output shows service status
```

### Via Istio Gateway (if configured)
```bash
# Add host entry (if not already added)
echo "127.0.0.1 devmentor.local" | sudo tee -a /etc/hosts

# Test via Istio
curl -H "Host: devmentor.local" http://localhost/api/health
```

## Architecture Explained

### Service Types in Kubernetes
- **ClusterIP**: Internal-only access (what we use)
- **NodePort**: Exposes on node IP (30000-32767)
- **LoadBalancer**: External LB (pending in local)
- **Ingress/Gateway**: L7 routing (Istio)

### Traffic Flow
```
External Request → Istio Ingress Gateway → 
Gateway (devmentor-gateway) → VirtualService (devmentor-routes) → 
Backend Services (ClusterIP)
```

### Routing Rules
- `/api/ai/*` → ai-gateway:3001
- `/api/auth/*` → auth-service:3002
- `/api/memory/*` → memory-service:3003
- `/api/projects/*` → project-service:3004
- `/api/*` → api-gateway:8080

## Troubleshooting

### Pod not starting - ImagePullBackOff
```bash
# Check if image exists locally
docker images | grep devmentor

# Load image into Kind
kind load docker-image <image-name> --name devmentor
```

### Pod not starting - CreateContainerConfigError
```bash
# Usually missing secret
kubectl get secrets -n devmentor-app

# Check what secret is needed
kubectl describe pod <pod-name> -n devmentor-app
```

### Service returning 503
```bash
# Check if health checks are failing
kubectl logs <pod-name> -n devmentor-app

# Temporarily disable health checks in deployment
# Edit deployment and comment out readinessProbe/livenessProbe
```

### Port mismatch
```bash
# Check what port the container is actually using
kubectl logs <pod-name> -n devmentor-app | grep -i port

# Update deployment ENV PORT and service targetPort accordingly
```

## Current Status (as of 2025-08-25)

✅ **Working:**
- API Gateway: Running on port 8000, service exposes 8080
- Auth Service: Healthy and responding
- PostgreSQL, Redis, Qdrant: All running
- Istio Gateway & VirtualService: Configured

⚠️ **Not Deployed Yet:**
- AI Gateway: Needs deployment
- Memory Service: Needs deployment
- Project Service: Needs deployment
- Frontend: Build issues, needs fixing

## Next Steps for Development

1. **Deploy remaining services** when ready:
   ```bash
   kubectl apply -f infrastructure/k8s/deployments/ai-gateway.yaml
   kubectl apply -f infrastructure/k8s/deployments/memory-service.yaml
   ```

2. **Fix frontend build issues**:
   - Missing components need to be created or imports fixed
   - Consider using dev mode for now

3. **Set up proper secrets**:
   - Replace placeholder secrets with real values
   - Consider using External Secrets Operator

4. **Enable health checks**:
   - Once services are stable, re-enable health checks
   - Configure appropriate timeouts and thresholds

## Quick Commands Reference

```bash
# Status check
kubectl get all -n devmentor-app

# Logs
kubectl logs -f deployment/api-gateway -n devmentor-app

# Port forwards
kubectl port-forward -n devmentor-app svc/api-gateway 8080:8080 &
kubectl port-forward -n devmentor-data svc/postgresql 5432:5432 &
kubectl port-forward -n devmentor-data svc/redis 6379:6379 &

# Restart deployment
kubectl rollout restart deployment api-gateway -n devmentor-app

# Delete and recreate
kubectl delete -f infrastructure/k8s/deployments/api-gateway.yaml
kubectl apply -f infrastructure/k8s/deployments/api-gateway.yaml
```

## Resources
- Istio Docs: https://istio.io/latest/docs/
- Kind Docs: https://kind.sigs.k8s.io/
- Kubernetes Service Types: https://kubernetes.io/docs/concepts/services-networking/service/
{% endraw %}
