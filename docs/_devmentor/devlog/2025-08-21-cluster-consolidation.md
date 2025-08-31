---
layout: product
title: 2025-08-21-cluster-consolidation
product: DevMentor
source: devlog/2025-08-21-cluster-consolidation.md
---

{% raw %}
# Cluster Consolidation - August 21, 2025

## Issue
Two Kind clusters were running simultaneously:
1. **desktop** cluster - Empty, unnecessary 
2. **devmentor** cluster - Production cluster with all services

## Resolution Steps

### 1. Identified Duplicate Clusters
```bash
# Found two clusters
kind get clusters
# Output: desktop, devmentor

# Checked which had services
kubectl --context=docker-desktop get pods -A  # 13 pods (only system)
kubectl --context=kind-devmentor get pods -A   # 34 pods (all services)
```

### 2. Deleted Unnecessary Cluster
```bash
# Deleted the empty desktop cluster
kind delete cluster --name desktop

# Cleaned up kubectl config
kubectl config delete-context docker-desktop
kubectl config delete-cluster docker-desktop
```

### 3. Fixed Control Plane Issue
The control plane node was NotReady due to kubelet unable to connect to API server on 172.18.0.2:6443

**Root Cause**: Network connectivity issue within the container
**Solution**: Modified kubelet config to use localhost instead of IP

```bash
# Fixed kubelet configuration
docker exec devmentor-control-plane bash -c \
  "sed -i 's/server: https:\/\/172.18.0.2:6443/server: https:\/\/localhost:6443/' \
   /etc/kubernetes/kubelet.conf && systemctl restart kubelet"
```

### 4. Cleaned Up Excess Pods
- Deleted pending Ollama pod (insufficient memory)
- Scaled Ollama deployment to 1 replica

## Current State

### Single Healthy Cluster
- **Name**: devmentor
- **Nodes**: 3 (1 control-plane, 2 workers)
- **Version**: v1.33.1
- **Status**: All nodes Ready

### Running Services
- **devmentor namespace**: ai-gateway, auth-service, ollama, postgres, redis
- **istio-system**: istiod, ingress-gateway, kiali
- **monitoring**: Prometheus stack (Grafana, AlertManager, etc.)
- **kube-system**: Core Kubernetes components

### Docker Containers
Only Kind cluster nodes remain:
- devmentor-control-plane
- devmentor-worker
- devmentor-worker2
- kind-cloud-provider
- kind-registry-mirror

## Benefits
1. **Resource Efficiency**: Eliminated duplicate cluster overhead
2. **Clarity**: Single cluster to manage
3. **Stability**: Fixed control plane connectivity issue
4. **Memory**: Freed up resources by removing duplicate nodes

## Verification
```bash
# All nodes healthy
kubectl get nodes
NAME                      STATUS   ROLES           AGE   VERSION
devmentor-control-plane   Ready    control-plane   17h   v1.33.1
devmentor-worker          Ready    <none>          17h   v1.33.1
devmentor-worker2         Ready    <none>          17h   v1.33.1

# All pods running (except intentionally scaled down)
kubectl get pods -A | grep -v Running | grep -v Completed
# No output - all pods healthy
```

## Next Steps
- Monitor cluster stability
- Consider resource limits for memory-intensive services
- Document standard operating procedures for cluster management
{% endraw %}
