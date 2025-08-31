---
layout: product
title: k8s-debugging-enhanced
product: DevMentor
source: infrastructure/debugging/k8s-debugging-enhanced.md
---

{% raw %}
# Enhanced Kubernetes Debugging Guide

## 🎯 Purpose
This guide contains all debugging commands and techniques used during DevMentor deployment, organized for learning and future reference.

## 📚 Table of Contents
1. [Pod Troubleshooting](#pod-troubleshooting)
2. [Image Issues](#image-issues)
3. [Resource Problems](#resource-problems)
4. [Service Discovery](#service-discovery)
5. [Istio Service Mesh](#istio-service-mesh)
6. [Logs and Events](#logs-and-events)
7. [Performance Analysis](#performance-analysis)
8. [Common Fixes](#common-fixes)

## 🔍 Pod Troubleshooting

### Check Pod Status
```bash
# List all pods with their status
kubectl get pods -n devmentor

# Get detailed pod information
kubectl describe pod <pod-name> -n devmentor

# Check pod events (last 20 lines)
kubectl describe pod <pod-name> -n devmentor | tail -20

# Get pods across all namespaces
kubectl get pods --all-namespaces

# Find problematic pods (not Running or Completed)
kubectl get pods --all-namespaces | grep -v Running | grep -v Completed
```

### Common Pod States and Solutions

#### ImagePullBackOff
**Symptoms**: Pod can't pull Docker image
```bash
# Check the exact error
kubectl describe pod <pod-name> -n devmentor | grep -A5 "Events:"

# Common causes:
# 1. Image doesn't exist
# 2. No credentials for private registry
# 3. Image not loaded in Kind cluster

# Fix for Kind:
kind load docker-image <image-name> --name <cluster-name>
```

#### CrashLoopBackOff
**Symptoms**: Container starts then immediately crashes
```bash
# Check logs
kubectl logs <pod-name> -n devmentor --previous

# Check container exit code
kubectl describe pod <pod-name> -n devmentor | grep -A10 "Last State:"

# Common causes:
# 1. Application error
# 2. Missing environment variables
# 3. Insufficient resources
```

#### Pending
**Symptoms**: Pod stuck in Pending state
```bash
# Check why scheduling failed
kubectl describe pod <pod-name> -n devmentor | grep -A5 "Events:"

# Check node resources
kubectl describe nodes
kubectl top nodes

# Common causes:
# 1. Insufficient resources
# 2. PVC not bound
# 3. Node selector not matching
```

## 🖼️ Image Issues

### Verify Image Availability
```bash
# Check local Docker images
docker images | grep <image-pattern>

# Check images in Kind nodes
docker exec -it <cluster-name>-control-plane crictl images

# Load image into Kind
kind load docker-image <image-name> --name <cluster-name>

# Force pod to use local image
kubectl patch deployment <deployment-name> -n devmentor -p \
  '{"spec":{"template":{"spec":{"containers":[{"name":"<container-name>","imagePullPolicy":"IfNotPresent"}]}}}}'
```

### Building and Loading Images
```bash
# Build Docker image
docker build -t <image-name>:latest .

# Tag for Kind
docker tag <image-name>:latest <image-name>:latest

# Load into Kind cluster
kind load docker-image <image-name>:latest --name devmentor

# Verify loaded
kubectl get pods -n devmentor -o jsonpath='{.items[*].spec.containers[*].image}' | tr ' ' '\n' | sort | uniq
```

## 💾 Resource Problems

### Check Resource Usage
```bash
# Install metrics server (if not present)
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Check node resources
kubectl top nodes

# Check pod resources
kubectl top pods -n devmentor

# Get resource requests and limits
kubectl get pods -n devmentor -o custom-columns=\
'NAME:.metadata.name,CPU-REQ:.spec.containers[*].resources.requests.cpu,MEM-REQ:.spec.containers[*].resources.requests.memory,CPU-LIM:.spec.containers[*].resources.limits.cpu,MEM-LIM:.spec.containers[*].resources.limits.memory'
```

### Update Resource Limits
```bash
# Add resources to deployment (if missing)
kubectl patch deployment <deployment-name> -n devmentor --type='json' -p='[
  {
    "op": "add",
    "path": "/spec/template/spec/containers/0/resources",
    "value": {
      "requests": {"memory": "512Mi", "cpu": "250m"},
      "limits": {"memory": "1Gi", "cpu": "1000m"}
    }
  }
]'

# Update existing resources
kubectl patch deployment <deployment-name> -n devmentor --type='json' -p='[
  {
    "op": "replace",
    "path": "/spec/template/spec/containers/0/resources",
    "value": {
      "requests": {"memory": "1Gi", "cpu": "500m"},
      "limits": {"memory": "2Gi", "cpu": "1000m"}
    }
  }
]'
```

## 🔌 Service Discovery

### Check Service Connectivity
```bash
# List services
kubectl get svc -n devmentor

# Get service endpoints
kubectl get endpoints -n devmentor

# Test service DNS resolution
kubectl run -it --rm debug --image=busybox --restart=Never -n devmentor -- nslookup <service-name>

# Test service connectivity
kubectl run -it --rm debug --image=busybox --restart=Never -n devmentor -- wget -qO- http://<service-name>:<port>/health

# Port forward for local testing
kubectl port-forward -n devmentor svc/<service-name> <local-port>:<service-port>
```

### Debug Service Issues
```bash
# Check if pods have correct labels
kubectl get pods -n devmentor --show-labels

# Check service selector
kubectl get svc <service-name> -n devmentor -o yaml | grep -A5 selector:

# Verify endpoints are populated
kubectl get endpoints <service-name> -n devmentor
```

## 🕸️ Istio Service Mesh

### Check Istio Status
```bash
# Verify Istio is installed
kubectl get pods -n istio-system

# Check if namespace has injection enabled
kubectl get namespace devmentor -o yaml | grep istio-injection

# Check if pod has sidecar
kubectl get pod <pod-name> -n devmentor -o jsonpath='{.spec.containers[*].name}'
```

### Manage Sidecar Injection
```bash
# Enable injection for namespace
kubectl label namespace devmentor istio-injection=enabled

# Disable injection for namespace
kubectl label namespace devmentor istio-injection=disabled --overwrite

# Disable injection for specific pod
kubectl patch deployment <deployment-name> -n devmentor -p \
  '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'

# Force restart to apply changes
kubectl rollout restart deployment -n devmentor
```

### Troubleshoot Istio Issues
```bash
# Check Istio configuration
istioctl analyze -n devmentor

# Check proxy status
istioctl proxy-status

# Get proxy configuration
istioctl proxy-config all <pod-name>.<namespace>

# Check mTLS status
istioctl authn tls-check <pod-name>.<namespace>
```

## 📝 Logs and Events

### View Logs
```bash
# Get pod logs
kubectl logs <pod-name> -n devmentor

# Get previous container logs (after crash)
kubectl logs <pod-name> -n devmentor --previous

# Follow logs in real-time
kubectl logs -f <pod-name> -n devmentor

# Get logs for specific container in pod
kubectl logs <pod-name> -n devmentor -c <container-name>

# Get logs with timestamps
kubectl logs <pod-name> -n devmentor --timestamps

# Get last N lines
kubectl logs <pod-name> -n devmentor --tail=50
```

### Check Events
```bash
# Get all events in namespace
kubectl get events -n devmentor

# Sort events by timestamp
kubectl get events -n devmentor --sort-by='.lastTimestamp'

# Watch events in real-time
kubectl get events -n devmentor -w

# Get events for specific pod
kubectl get events -n devmentor --field-selector involvedObject.name=<pod-name>
```

## 📊 Performance Analysis

### CPU and Memory
```bash
# Check container resource usage
kubectl top pod <pod-name> -n devmentor --containers

# Monitor resource usage over time
watch -n 2 kubectl top pods -n devmentor

# Check for OOMKilled pods
kubectl get pods -n devmentor -o json | jq '.items[] | select(.status.containerStatuses[]?.lastState.terminated.reason == "OOMKilled") | .metadata.name'

# Find resource-hungry pods
kubectl top pods -n devmentor --sort-by=memory
kubectl top pods -n devmentor --sort-by=cpu
```

### Network Analysis
```bash
# Test connectivity between pods
kubectl exec -it <source-pod> -n devmentor -- ping <target-pod-ip>

# Check network policies
kubectl get networkpolicies -n devmentor

# Debug DNS
kubectl exec -it <pod-name> -n devmentor -- nslookup kubernetes.default
kubectl exec -it <pod-name> -n devmentor -- cat /etc/resolv.conf
```

## 🔧 Common Fixes

### Fix 1: Pod Stuck Terminating
```bash
# Force delete pod
kubectl delete pod <pod-name> -n devmentor --grace-period=0 --force

# If still stuck, remove finalizers
kubectl patch pod <pod-name> -n devmentor -p '{"metadata":{"finalizers":null}}'
```

### Fix 2: Reset Failed Deployment
```bash
# Scale down
kubectl scale deployment <deployment-name> -n devmentor --replicas=0

# Scale back up
kubectl scale deployment <deployment-name> -n devmentor --replicas=1

# Or rollout restart
kubectl rollout restart deployment <deployment-name> -n devmentor
```

### Fix 3: Clear ImagePullBackOff
```bash
# Delete pod to retry
kubectl delete pod <pod-name> -n devmentor

# Or restart deployment
kubectl rollout restart deployment <deployment-name> -n devmentor
```

### Fix 4: Fix Permission Issues
```bash
# Add security context
kubectl patch deployment <deployment-name> -n devmentor --type='json' -p='[
  {
    "op": "add",
    "path": "/spec/template/spec/securityContext",
    "value": {
      "runAsUser": 1000,
      "runAsGroup": 1000,
      "fsGroup": 1000
    }
  }
]'
```

## 🏥 Health Checks

### Test Service Health
```bash
# Port forward and test
kubectl port-forward -n devmentor deployment/<deployment-name> 8080:8080 &
curl http://localhost:8080/health
kill %1

# Direct pod exec test
kubectl exec -it <pod-name> -n devmentor -- curl http://localhost:8080/health

# Through service
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -n devmentor -- \
  curl http://<service-name>.<namespace>.svc.cluster.local:<port>/health
```

### Liveness and Readiness Probes
```bash
# Check probe configuration
kubectl get deployment <deployment-name> -n devmentor -o yaml | grep -A10 "livenessProbe:"
kubectl get deployment <deployment-name> -n devmentor -o yaml | grep -A10 "readinessProbe:"

# Add probes to deployment
kubectl patch deployment <deployment-name> -n devmentor --type='json' -p='[
  {
    "op": "add",
    "path": "/spec/template/spec/containers/0/livenessProbe",
    "value": {
      "httpGet": {"path": "/health", "port": 8080},
      "initialDelaySeconds": 30,
      "periodSeconds": 10
    }
  }
]'
```

## 🎯 Quick Debugging Workflow

### 1. Initial Assessment
```bash
kubectl get pods -n devmentor
kubectl get events -n devmentor --sort-by='.lastTimestamp' | head -20
```

### 2. Deep Dive on Problem Pod
```bash
kubectl describe pod <pod-name> -n devmentor
kubectl logs <pod-name> -n devmentor --tail=50
```

### 3. Check Resources
```bash
kubectl top nodes
kubectl top pods -n devmentor
```

### 4. Test Connectivity
```bash
kubectl exec -it <pod-name> -n devmentor -- /bin/sh
# Inside pod:
nslookup <service-name>
curl http://<service-name>:<port>/health
exit
```

### 5. Apply Fix and Verify
```bash
# Apply fix (example: restart)
kubectl rollout restart deployment <deployment-name> -n devmentor

# Wait for rollout
kubectl rollout status deployment <deployment-name> -n devmentor

# Verify
kubectl get pods -n devmentor
```

## 📚 Learning Resources

### Essential kubectl Commands
- `kubectl explain` - Get documentation for resources
- `kubectl api-resources` - List all resource types
- `kubectl get <resource> -o yaml` - See full configuration
- `kubectl diff -f <file>` - Preview changes before applying

### Useful Aliases
```bash
# Add to ~/.zshrc or ~/.bashrc
alias k='kubectl'
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kgd='kubectl get deployment'
alias kdp='kubectl describe pod'
alias klf='kubectl logs -f'
alias kex='kubectl exec -it'
```

### Debug Container Template
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: debug
  namespace: devmentor
spec:
  containers:
  - name: debug
    image: nicolaka/netshoot
    command: ["/bin/bash"]
    args: ["-c", "while true; do sleep 30; done"]
```

## 🚨 Emergency Commands

### System is Down
```bash
# Check all pods
kubectl get pods --all-namespaces | grep -v Running

# Check nodes
kubectl get nodes
kubectl describe nodes | grep -A5 "Conditions:"

# Check events
kubectl get events --all-namespaces --sort-by='.lastTimestamp' | head -50

# Restart critical services
kubectl rollout restart deployment -n istio-system
kubectl rollout restart deployment -n devmentor
```

### Out of Resources
```bash
# Find resource hogs
kubectl top pods --all-namespaces --sort-by=memory | head -20
kubectl top pods --all-namespaces --sort-by=cpu | head -20

# Scale down non-critical services
kubectl scale deployment <deployment-name> -n devmentor --replicas=0

# Clear completed pods
kubectl delete pods --field-selector=status.phase=Succeeded --all-namespaces
kubectl delete pods --field-selector=status.phase=Failed --all-namespaces
```

---
*Created: 2025-08-21*
*Purpose: Comprehensive debugging reference for DevMentor Kubernetes deployment*
*Remember: Always check logs and events first!*
{% endraw %}
