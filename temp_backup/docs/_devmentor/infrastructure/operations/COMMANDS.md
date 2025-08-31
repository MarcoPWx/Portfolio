---
layout: product
title: COMMANDS
product: DevMentor
source: infrastructure/operations/COMMANDS.md
---

{% raw %}
# DevMentor Commands Reference
**Updated**: 2025-08-20  
**Focus**: Logging, Monitoring, and Troubleshooting in Kind/Kubernetes

---

## 🔍 UNDERSTANDING PORT FORWARDING

Port forwarding creates a tunnel from your local machine to services running inside the Kubernetes cluster.

```
Your Mac (localhost:PORT) ──────> Kubernetes Service (ClusterIP:PORT)
```

Why needed? Services in Kubernetes use ClusterIP by default, which is only accessible from within the cluster.

---

## 📊 OBSERVABILITY STACK ACCESS

### Start All Monitoring UIs
```bash
# Grafana - Metrics Dashboard (http://localhost:3000)
kubectl port-forward -n istio-system svc/grafana 3000:3000 &

# Kiali - Service Mesh Visualization (http://localhost:20001)
kubectl port-forward -n istio-system svc/kiali 20001:20001 &

# Prometheus - Raw Metrics (http://localhost:9090)
kubectl port-forward -n istio-system svc/prometheus 9090:9090 &

# Jaeger - Distributed Tracing (http://localhost:16686)
kubectl port-forward -n istio-system svc/tracing 16686:16686 &

# List all active port-forwards
ps aux | grep port-forward

# Kill all port-forwards
pkill -f "kubectl port-forward"
```

### Access URLs
- **Grafana**: http://localhost:3000 (admin/admin)
- **Kiali**: http://localhost:20001 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Jaeger**: http://localhost:16686

---

## 📝 LOGGING COMMANDS

### Basic Pod Logs
```bash
# List all pods in devmentor namespace
kubectl get pods -n devmentor

# Get logs from a specific pod
kubectl logs -n devmentor <pod-name>

# Get logs from specific container in pod (when pod has multiple containers)
kubectl logs -n devmentor <pod-name> -c auth-service
kubectl logs -n devmentor <pod-name> -c istio-proxy

# Follow logs in real-time (like tail -f)
kubectl logs -n devmentor <pod-name> -c auth-service -f

# Get last 100 lines
kubectl logs -n devmentor <pod-name> -c auth-service --tail=100

# Get logs with timestamps
kubectl logs -n devmentor <pod-name> -c auth-service --timestamps

# Get logs from previous container instance (useful for crashes)
kubectl logs -n devmentor <pod-name> -c auth-service --previous
```

### Advanced Log Queries
```bash
# Get logs from all pods with a label
kubectl logs -n devmentor -l app=auth-service --all-containers=true

# Get logs from the last hour
kubectl logs -n devmentor <pod-name> --since=1h

# Get logs since specific time
kubectl logs -n devmentor <pod-name> --since-time=2025-08-20T10:00:00Z

# Export logs to file
kubectl logs -n devmentor <pod-name> > pod-logs.txt

# Stream logs from multiple pods
kubectl logs -n devmentor -l app=auth-service -f --all-containers=true --prefix=true
```

---

## 🔧 TROUBLESHOOTING COMMANDS

### Pod Debugging
```bash
# Describe pod (shows events, status, conditions)
kubectl describe pod -n devmentor <pod-name>

# Get pod events
kubectl get events -n devmentor --field-selector involvedObject.name=<pod-name>

# Get all namespace events sorted by time
kubectl get events -n devmentor --sort-by='.lastTimestamp'

# Check pod resource usage
kubectl top pod -n devmentor <pod-name>

# Execute commands inside pod
kubectl exec -it -n devmentor <pod-name> -c auth-service -- /bin/sh
kubectl exec -it -n devmentor <pod-name> -c auth-service -- ls -la
kubectl exec -it -n devmentor <pod-name> -c auth-service -- cat /app/.env

# Check pod's environment variables
kubectl exec -n devmentor <pod-name> -- env

# Check network connectivity from pod
kubectl exec -n devmentor <pod-name> -- wget -O- http://keycloak.keycloak:8080/health
kubectl exec -n devmentor <pod-name> -- nslookup keycloak.keycloak
```

### Service Debugging
```bash
# Check service endpoints
kubectl get endpoints -n devmentor auth-service

# Test service connectivity
kubectl run test-pod --image=busybox -it --rm --restart=Never -- wget -O- http://auth-service.devmentor:3002/health

# Check service details
kubectl describe svc -n devmentor auth-service

# Port-forward to service for local testing
kubectl port-forward -n devmentor svc/auth-service 3002:3002
```

---

## 🚀 KIND CLUSTER MANAGEMENT

### Cluster Operations
```bash
# List kind clusters
kind get clusters

# Get cluster info
kubectl cluster-info --context kind-devmentor

# List nodes
kubectl get nodes -o wide

# Check node resources
kubectl top nodes

# Get kind cluster config
kind get kubeconfig --name devmentor

# Delete and recreate cluster
kind delete cluster --name devmentor
kind create cluster --name devmentor --config kind-config.yaml
```

### Loading Images to Kind
```bash
# Load single image
kind load docker-image <image-name>:latest --name devmentor

# Load with verbose output
kind load docker-image <image-name>:latest --name devmentor -v 5

# Load multiple images
kind load docker-image auth-service:latest ai-gateway:latest --name devmentor

# Verify image is loaded
docker exec -it devmentor-control-plane crictl images | grep auth-service
```

---

## 🔄 DEPLOYMENT OPERATIONS

### Deploy Services
```bash
# Apply all deployments
kubectl apply -f deployment/k8s/deployments/

# Deploy specific service
kubectl apply -f deployment/k8s/deployments/auth-service.yaml

# Force recreate pods
kubectl rollout restart deployment/auth-service -n devmentor

# Check rollout status
kubectl rollout status deployment/auth-service -n devmentor

# Scale deployment
kubectl scale deployment/auth-service --replicas=3 -n devmentor

# Update image
kubectl set image deployment/auth-service auth-service=devmentor/auth-service:v2 -n devmentor

# Rollback deployment
kubectl rollout undo deployment/auth-service -n devmentor
```

---

## 📊 MONITORING SERVICE HEALTH

### Health Checks
```bash
# Check all pods status
kubectl get pods -n devmentor -o wide

# Watch pod status changes
kubectl get pods -n devmentor -w

# Check pod readiness
kubectl get pods -n devmentor -o json | jq '.items[] | {name: .metadata.name, ready: .status.conditions[] | select(.type=="Ready") | .status}'

# Check liveness/readiness probe status
kubectl describe pod -n devmentor <pod-name> | grep -A5 "Liveness\|Readiness"
```

### Resource Monitoring
```bash
# CPU and Memory usage
kubectl top pods -n devmentor
kubectl top pods --all-namespaces --sort-by=cpu
kubectl top pods --all-namespaces --sort-by=memory

# Get resource requests/limits
kubectl get pods -n devmentor -o custom-columns=NAME:.metadata.name,MEM_REQ:.spec.containers[0].resources.requests.memory,MEM_LIMIT:.spec.containers[0].resources.limits.memory,CPU_REQ:.spec.containers[0].resources.requests.cpu,CPU_LIMIT:.spec.containers[0].resources.limits.cpu
```

---

## 🔍 ISTIO SERVICE MESH DEBUGGING

### Istio Proxy Logs
```bash
# Get Istio proxy logs
kubectl logs -n devmentor <pod-name> -c istio-proxy

# Check Istio proxy status
istioctl proxy-status

# Get proxy configuration
istioctl proxy-config cluster <pod-name> -n devmentor
istioctl proxy-config listeners <pod-name> -n devmentor
istioctl proxy-config routes <pod-name> -n devmentor

# Analyze Istio configuration
istioctl analyze -n devmentor

# Check mTLS status
istioctl authn tls-check <pod-name>.devmentor auth-service.devmentor.svc.cluster.local
```

---

## 🚨 COMMON ISSUES & SOLUTIONS

### Pod in CrashLoopBackOff
```bash
# Check logs from crashed container
kubectl logs -n devmentor <pod-name> --previous

# Check events
kubectl describe pod -n devmentor <pod-name>

# Check resource limits
kubectl get pod -n devmentor <pod-name> -o yaml | grep -A10 resources:
```

### Pod Stuck in Pending
```bash
# Check events
kubectl describe pod -n devmentor <pod-name>

# Check node capacity
kubectl describe nodes

# Check PVC status
kubectl get pvc -n devmentor
```

### Service Not Accessible
```bash
# Check endpoints
kubectl get endpoints -n devmentor <service-name>

# Check service selector matches pod labels
kubectl get svc -n devmentor <service-name> -o yaml | grep selector -A5
kubectl get pods -n devmentor --show-labels
```

### Image Pull Errors
```bash
# Check image availability in kind
docker exec -it devmentor-control-plane crictl images

# Re-load image to kind
kind load docker-image <image-name>:latest --name devmentor

# Check pod events
kubectl describe pod -n devmentor <pod-name> | grep -A10 Events:
```

---

## 🔐 SECURITY & SECRETS

### Managing Secrets
```bash
# List secrets
kubectl get secrets -n devmentor

# Describe secret
kubectl describe secret -n devmentor <secret-name>

# Decode secret value
kubectl get secret -n devmentor <secret-name> -o jsonpath="{.data.<key>}" | base64 -d

# Create secret from literal
kubectl create secret generic my-secret --from-literal=key=value -n devmentor

# Create secret from file
kubectl create secret generic my-secret --from-file=path/to/file -n devmentor
```

---

## 📦 CLEANUP COMMANDS

### Clean Up Resources
```bash
# Delete all pods in namespace
kubectl delete pods --all -n devmentor

# Delete deployment
kubectl delete deployment auth-service -n devmentor

# Delete all resources in namespace
kubectl delete all --all -n devmentor

# Kill all port-forwards
pkill -f "kubectl port-forward"

# Clean up Docker resources
docker system prune -a --volumes
```

---

## 🎯 QUICK TROUBLESHOOTING WORKFLOW

```bash
# 1. Check pod status
kubectl get pods -n devmentor

# 2. If pod is not running, describe it
kubectl describe pod -n devmentor <pod-name>

# 3. Check logs
kubectl logs -n devmentor <pod-name> --tail=50

# 4. Check events
kubectl get events -n devmentor --sort-by='.lastTimestamp' | tail -10

# 5. If still issues, exec into pod
kubectl exec -it -n devmentor <pod-name> -- /bin/sh

# 6. Check service connectivity
kubectl port-forward -n devmentor svc/<service-name> <local-port>:<service-port>
curl http://localhost:<local-port>/health
```

---

## 📈 MONITORING DASHBOARDS

After setting up port-forwards, access:

1. **Grafana** (http://localhost:3000)
   - Default dashboards for Istio metrics
   - Request rate, error rate, latency (RED metrics)
   - Resource usage

2. **Kiali** (http://localhost:20001)
   - Service mesh topology
   - Traffic flow visualization
   - Health indicators

3. **Prometheus** (http://localhost:9090)
   - Raw metrics queries
   - PromQL for custom queries

4. **Jaeger** (http://localhost:16686)
   - Distributed traces
   - Request flow through services
   - Latency analysis

---

Remember: Most observability tools need port-forwarding because they run inside the cluster with ClusterIP services!
{% endraw %}
