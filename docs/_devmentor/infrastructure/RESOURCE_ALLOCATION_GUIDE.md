---
layout: product
title: RESOURCE ALLOCATION GUIDE
product: DevMentor
source: infrastructure/RESOURCE_ALLOCATION_GUIDE.md
---

{% raw %}
# DevMentor Resource Allocation Guide

## 🎯 Overview
This document provides comprehensive resource allocation recommendations for all DevMentor services based on their workload characteristics and criticality.

## 📊 Current State Analysis

### ⚠️ Critical Issues
1. **AI Gateway**: No resource limits set (can consume unlimited resources)
2. **Ollama**: Memory limited to 4GB (insufficient for Llama 3.2)
3. **Monitoring Stack**: Many components have no resource limits
4. **Missing Services**: Redis, PostgreSQL, Memory Service, Project Service, API Gateway

## 🚀 Recommended Resource Allocations

### Core AI Services

#### Ollama (GPT-OSS)
```yaml
resources:
  requests:
    memory: "6Gi"
    cpu: "2000m"
  limits:
    memory: "8Gi"
    cpu: "4000m"
```
**Rationale**: Large language models require significant memory. 8GB allows running models like Llama 3.2 effectively.

#### AI Gateway
```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```
**Rationale**: Gateway service with moderate traffic, needs headroom for request handling.

### Authentication & API Services

#### Auth Service (Current: OK)
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

#### API Gateway (To Deploy)
```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

### Data Services

#### PostgreSQL (To Deploy)
```yaml
resources:
  requests:
    memory: "1Gi"
    cpu: "500m"
  limits:
    memory: "2Gi"
    cpu: "2000m"
```

#### Redis (To Deploy)
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### Memory & Learning Services

#### Memory Service (To Deploy)
```yaml
resources:
  requests:
    memory: "1Gi"
    cpu: "500m"
  limits:
    memory: "2Gi"
    cpu: "1000m"
```
**Rationale**: Vector database operations require substantial memory.

#### PBML Service (To Deploy)
```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

#### Learning Engine (To Deploy)
```yaml
resources:
  requests:
    memory: "1Gi"
    cpu: "500m"
  limits:
    memory: "2Gi"
    cpu: "1000m"
```

### Project Management Services

#### Project Service (To Deploy)
```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "1Gi"
    cpu: "500m"
```

#### PM Service (To Deploy)
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

#### Repo Analyzer (To Deploy)
```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
```

### Observability Stack

#### Prometheus
```yaml
resources:
  requests:
    memory: "1Gi"
    cpu: "500m"
  limits:
    memory: "2Gi"
    cpu: "1000m"
```

#### Grafana
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "100m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

#### Loki
```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "1Gi"
    cpu: "500m"
```

#### Jaeger
```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "1Gi"
    cpu: "500m"
```

#### AlertManager
```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "50m"
  limits:
    memory: "256Mi"
    cpu: "250m"
```

#### Monitoring Service
```yaml
resources:
  requests:
    memory: "512Mi"
    cpu: "250m"
  limits:
    memory: "1Gi"
    cpu: "500m"
```

### Service Mesh (Istio)

#### Istiod (Current: Needs Limits)
```yaml
resources:
  requests:
    memory: "2Gi"
    cpu: "500m"
  limits:
    memory: "4Gi"
    cpu: "2000m"
```

#### Istio Ingress Gateway (Current: OK)
```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "100m"
  limits:
    memory: "1Gi"
    cpu: "2000m"
```

#### Kiali (Current: OK)
```yaml
resources:
  requests:
    memory: "64Mi"
    cpu: "10m"
  limits:
    memory: "1Gi"
    cpu: "500m"
```

## 📈 Total Resource Requirements

### Minimum (Requests)
- **CPU**: ~7.5 cores
- **Memory**: ~14 GB
- **Storage**: ~50 GB (including PVCs)

### Maximum (Limits)
- **CPU**: ~20 cores
- **Memory**: ~32 GB
- **Storage**: ~100 GB (with headroom)

## 🎮 Deployment Priority

### Phase 1: Critical Infrastructure
1. **Update Ollama** resources (for GPT-OSS)
2. **Deploy Redis** (for caching and sessions)
3. **Deploy PostgreSQL** (for persistent data)
4. **Add resource limits to AI Gateway**

### Phase 2: Core Services
1. **Deploy Memory Service** (for vector search)
2. **Deploy API Gateway** (for external access)
3. **Deploy Project Service** (for project management)
4. **Deploy Monitoring Service** (custom monitoring)

### Phase 3: Advanced Features
1. **Deploy PBML Service** (learning engine)
2. **Deploy Learning Engine** (AI training)
3. **Deploy PM Service** (project management)
4. **Deploy Repo Analyzer** (code analysis)

### Phase 4: Observability
1. **Start Observability Stack** (Prometheus, Grafana, etc.)
2. **Configure dashboards and alerts**
3. **Set up log aggregation**

## 🔧 Implementation Commands

### Update Ollama Resources
```bash
kubectl patch deployment ollama -n devmentor --type='json' -p='[
  {
    "op": "replace",
    "path": "/spec/template/spec/containers/0/resources",
    "value": {
      "requests": {"memory": "6Gi", "cpu": "2000m"},
      "limits": {"memory": "8Gi", "cpu": "4000m"}
    }
  }
]'
```

### Add AI Gateway Resources
```bash
kubectl patch deployment ai-gateway -n devmentor --type='json' -p='[
  {
    "op": "add",
    "path": "/spec/template/spec/containers/0/resources",
    "value": {
      "requests": {"memory": "512Mi", "cpu": "250m"},
      "limits": {"memory": "1Gi", "cpu": "1000m"}
    }
  }
]'
```

### Deploy Redis
```bash
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: devmentor
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        volumeMounts:
        - name: redis-data
          mountPath: /data
      volumes:
      - name: redis-data
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: redis
  namespace: devmentor
spec:
  selector:
    app: redis
  ports:
  - port: 6379
    targetPort: 6379
EOF
```

### Deploy PostgreSQL
```bash
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: devmentor
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_DB
          value: devmentor
        - name: POSTGRES_USER
          value: devmentor
        - name: POSTGRES_PASSWORD
          value: devmentor123
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "2000m"
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
      volumes:
      - name: postgres-data
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: devmentor
spec:
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432
EOF
```

## 🔍 Monitoring Resource Usage

### Check Current Usage
```bash
# Install metrics server if not present
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# View resource usage
kubectl top nodes
kubectl top pods -n devmentor
```

### Set Up Resource Alerts
```yaml
# Example PrometheusRule for resource alerts
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: resource-alerts
  namespace: monitoring
spec:
  groups:
  - name: resources
    rules:
    - alert: HighMemoryUsage
      expr: |
        (container_memory_usage_bytes / container_spec_memory_limit_bytes) > 0.9
      for: 5m
      annotations:
        summary: "Pod {{ $labels.pod }} memory usage above 90%"
```

## 📝 Best Practices

### 1. Request vs Limit Ratio
- **CPU**: Limit should be 2-4x the request
- **Memory**: Limit should be 1.5-2x the request

### 2. Burst Capacity
- Services handling user requests need higher CPU limits for burst capacity
- Background services can have lower CPU limits

### 3. Memory Management
- Language models and databases need guaranteed memory (high requests)
- Stateless services can have lower memory requests

### 4. Horizontal Scaling
Consider HPA (Horizontal Pod Autoscaler) for:
- API Gateway
- Auth Service
- AI Gateway
- Project Service

### 5. Resource Quotas
Set namespace resource quotas to prevent runaway consumption:
```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: devmentor-quota
  namespace: devmentor
spec:
  hard:
    requests.cpu: "20"
    requests.memory: "40Gi"
    limits.cpu: "40"
    limits.memory: "80Gi"
    persistentvolumeclaims: "10"
```

## 🚨 Troubleshooting

### Pod OOMKilled
- Increase memory limits
- Check for memory leaks
- Enable memory profiling

### Pod CPU Throttled
- Increase CPU limits
- Optimize code performance
- Consider horizontal scaling

### Pending Pods
- Check node resources: `kubectl describe nodes`
- Scale down non-critical services
- Add more nodes to cluster

## 📚 Additional Resources
- [Kubernetes Resource Management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler)
- [Resource Quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/)
{% endraw %}
