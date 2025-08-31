---
layout: product
title: DEVMENTOR CONTAINER QUICKREF
product: DevMentor
source: infrastructure/kubernetes/DEVMENTOR_CONTAINER_QUICKREF.md
---

{% raw %}
# 🎯 DevMentor Container Management Quick Reference

## 📊 Current Status Check

```bash
# Quick health check - run this first!
echo "=== Docker Containers ===" && \
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" && \
echo "\n=== Kubernetes Pods ===" && \
kubectl get pods -A | grep -E "(devmentor|keycloak|istio)" | grep -v Running && \
echo "\n=== Services Status ===" && \
kubectl get svc -A | grep -E "(devmentor|keycloak|istio)"
```

## 🔧 Common Tasks

### 1. View Logs

```bash
# Docker logs
docker logs -f devmentor-monitoring-service-1   # Monitoring service
docker logs --tail 50 devmentor-loki             # Last 50 lines of Loki

# Kubernetes logs
kubectl logs -n devmentor ai-gateway-7755bf9f65-bd259
kubectl logs -n devmentor auth-service-5bb76f4977-gzksp --previous  # Previous crash
kubectl logs -n istio-system grafana-84f968c4c9-2fl5p
```

### 2. Access Services

```bash
# Already exposed Docker services
open http://localhost:3006    # Monitoring Dashboard
open http://localhost:3100    # Loki
open http://localhost:9100    # Node Exporter

# Kubernetes services (need port-forward)
kubectl port-forward -n istio-system svc/grafana 3000:3000 &
kubectl port-forward -n istio-system svc/kiali 20001:20001 &
kubectl port-forward -n istio-system svc/prometheus 9090:9090 &
kubectl port-forward -n devmentor-data svc/postgresql 5432:5432 &
kubectl port-forward -n devmentor-data svc/redis 6379:6379 &

# Then access at:
open http://localhost:3000     # Grafana
open http://localhost:20001    # Kiali
open http://localhost:9090     # Prometheus
```

### 3. Restart Services

```bash
# Docker service
docker restart devmentor-monitoring-service-1

# Kubernetes deployment
kubectl rollout restart deployment -n devmentor ai-gateway
kubectl rollout restart deployment -n devmentor auth-service
```

### 4. Fix Common Issues

#### Auth Service Crashing
```bash
# Check the error
kubectl logs -n devmentor auth-service-5bb76f4977-gzksp

# Delete broken deployment
kubectl delete deployment -n devmentor auth-service

# Rebuild and redeploy
cd services/auth-service
docker build -t devmentor/auth-service:latest .
kind load docker-image devmentor/auth-service:latest --name devmentor
kubectl apply -f k8s/manifests/auth-service.yaml
```

#### Port Already in Use
```bash
# Find what's using a port (e.g., 3000)
lsof -i :3000

# Kill the process
kill -9 <PID>
```

#### Clean Up Disk Space
```bash
# Docker cleanup
docker system prune -a --volumes

# Kubernetes cleanup (be careful!)
kubectl delete pod -n devmentor --field-selector=status.phase=Failed
```

## 🚀 Quick Deployment

### Deploy to Kubernetes
```bash
# Build image
docker build -t myservice:latest ./services/myservice

# Load into Kind
kind load docker-image myservice:latest --name devmentor

# Apply manifest
kubectl apply -f k8s/manifests/myservice.yaml

# Check deployment
kubectl get pods -n devmentor -w
```

### Update Docker Service
```bash
# Stop old container
docker stop devmentor-monitoring-service-1

# Rebuild
cd services/monitoring-service
docker build -t devmentor-monitoring-service .

# Start with docker-compose
docker-compose up -d monitoring-service
```

## 📋 Service Matrix

| Service | Location | Port | Status Command | Access |
|---------|----------|------|----------------|--------|
| **Monitoring** | Docker | 3006 | `docker ps \| grep monitoring` | Direct |
| **Loki** | Docker | 3100 | `docker ps \| grep loki` | Direct |
| **Promtail** | Docker | - | `docker ps \| grep promtail` | N/A |
| **Node Exporter** | Docker | 9100 | `docker ps \| grep exporter` | Direct |
| **PostgreSQL** | K8s | 5432 | `kubectl get pod -n devmentor-data postgresql-0` | Port-forward |
| **Redis** | K8s | 6379 | `kubectl get pod -n devmentor-data \| grep redis` | Port-forward |
| **Qdrant** | K8s | 6333 | `kubectl get pod -n devmentor-data \| grep qdrant` | Port-forward |
| **AI Gateway** | K8s | 3004 | `kubectl get pod -n devmentor \| grep ai-gateway` | Port-forward |
| **Auth Service** | K8s | 3002 | `kubectl get pod -n devmentor \| grep auth` | Port-forward |
| **Ollama** | K8s | 11434 | `kubectl get pod -n devmentor \| grep ollama` | Port-forward |
| **Keycloak** | K8s | 8080 | `kubectl get pod -n keycloak` | Port-forward |
| **Grafana** | K8s/Istio | 3000 | `kubectl get pod -n istio-system \| grep grafana` | Port-forward |
| **Prometheus** | K8s/Istio | 9090 | `kubectl get pod -n istio-system \| grep prometheus` | Port-forward |
| **Kiali** | K8s/Istio | 20001 | `kubectl get pod -n istio-system \| grep kiali` | Port-forward |

## 🛠️ Debugging Commands

```bash
# Get detailed pod info
kubectl describe pod -n devmentor <pod-name>

# Get events (see what's happening)
kubectl get events -n devmentor --sort-by='.lastTimestamp'

# Check resource usage
kubectl top nodes
kubectl top pods -n devmentor

# Docker container shell
docker exec -it devmentor-monitoring-service-1 sh

# Kubernetes pod shell
kubectl exec -it -n devmentor ai-gateway-7755bf9f65-bd259 -- bash

# Check service endpoints
kubectl get endpoints -n devmentor

# View container resource usage
docker stats --no-stream
```

## 🔄 Migration Path

### Current State
- ✅ In Kubernetes: PostgreSQL, Redis, Qdrant, AI Gateway, Ollama, Istio stack
- 🐳 In Docker: Monitoring Service, Loki, Promtail, Node Exporter
- ❌ Broken: Auth Service (needs rebuild)
- 📦 Not Deployed: Frontend, API Gateway, Memory Service, Project Service

### Next Steps
1. Fix Auth Service build and deploy
2. Deploy remaining services to K8s
3. Migrate monitoring stack to K8s
4. Set up proper ingress for external access

## 💡 Pro Tips for Your Setup

1. **Use namespaces** to organize:
   - `devmentor` - Your application services
   - `devmentor-data` - Databases and storage
   - `istio-system` - Service mesh and observability
   - `keycloak` - Authentication

2. **Port-forward aliases** - Add to ~/.zshrc:
   ```bash
   alias kpf-grafana='kubectl port-forward -n istio-system svc/grafana 3000:3000'
   alias kpf-kiali='kubectl port-forward -n istio-system svc/kiali 20001:20001'
   alias kpf-db='kubectl port-forward -n devmentor-data svc/postgresql 5432:5432'
   ```

3. **Quick context switch**:
   ```bash
   kubectl config set-context --current --namespace=devmentor
   ```

4. **Watch deployments**:
   ```bash
   watch -n 2 'kubectl get pods -n devmentor'
   ```

5. **Clean restart of Kind cluster**:
   ```bash
   kind delete cluster --name devmentor
   kind create cluster --name devmentor --config k8s/kind-config.yaml
   ```

## 📝 Daily Workflow

### Morning Startup
```bash
# 1. Check what's running
docker ps
kubectl get pods -A | grep -v Running

# 2. Start port-forwards for K8s services you need
kubectl port-forward -n istio-system svc/grafana 3000:3000 &

# 3. Check monitoring dashboard
open http://localhost:3006
```

### Before Commits
```bash
# Check for issues
kubectl get pods -A | grep -E "(Error|CrashLoop|Pending)"
docker ps -a | grep Exited

# Clean up if needed
docker system prune -f
kubectl delete pod -n devmentor --field-selector=status.phase=Failed
```

### End of Day
```bash
# Stop port-forwards
pkill -f "kubectl port-forward"

# Optional: Stop non-essential Docker containers
docker stop devmentor-monitoring-service-1
```

## 🆘 Emergency Commands

```bash
# Everything is broken, start fresh
kind delete cluster --name devmentor
docker-compose down
docker system prune -a --volumes
# Then rebuild from scratch

# Out of disk space
docker system prune -a --volumes
kubectl delete pod --all-namespaces --field-selector=status.phase=Failed

# Can't connect to cluster
kubectl config use-context kind-devmentor
kubectl cluster-info

# Reset Docker
# On Mac: Docker Desktop > Preferences > Reset > Reset to factory defaults
```

---

Remember: When in doubt, check the logs first! 📜
{% endraw %}
