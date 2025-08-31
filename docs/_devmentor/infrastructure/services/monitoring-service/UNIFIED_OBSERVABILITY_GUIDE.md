---
layout: product
title: UNIFIED OBSERVABILITY GUIDE
product: DevMentor
source: infrastructure/services/monitoring-service/UNIFIED_OBSERVABILITY_GUIDE.md
---

{% raw %}
# 🎯 Unified Observability Guide - Two Stacks Working Together

## 🏗️ Your Complete Architecture

You have **TWO complementary observability stacks**:

### 1. 📦 Docker Compose Stack (Infrastructure Level)
- Monitors Docker containers directly
- Collects system-level metrics
- Aggregates all logs

### 2. ☸️ Istio/Kubernetes Stack (Service Mesh Level)
- Monitors service-to-service communication
- Provides traffic flow visualization
- Handles distributed tracing in mesh

## 🚀 Quick Access to Everything

### Docker Compose Stack:
- **Grafana**: http://localhost:3007 (admin/devmentor123)
  - Fixed Dashboard: http://localhost:3007/d/devmentor-fixed/devmentor-complete-observability
- **Prometheus**: http://localhost:9090
- **Jaeger**: http://localhost:16686
- **Monitoring Service**: http://localhost:3006

### Istio/Kubernetes Stack:
- **Kiali**: http://localhost:20001 (Service Mesh UI)
- **Istio Grafana**: Run `kubectl port-forward -n istio-system svc/grafana 3008:3000`
  - Then access: http://localhost:3008
- **Istio Prometheus**: Run `kubectl port-forward -n istio-system svc/prometheus 9091:9090`
  - Then access: http://localhost:9091

## 🔍 Why You Have Both Stacks

### Docker Stack Monitors:
- Container health and resources
- Application logs
- System metrics (CPU, memory, disk, network)
- Custom application metrics

### Istio Stack Monitors:
- Service mesh traffic
- Request routing
- Circuit breakers
- Retry policies
- mTLS between services
- Service dependencies

## 📊 How to Use Kiali (Service Mesh Observability)

### Access Kiali:
1. Go to http://localhost:20001
2. No authentication required (already configured)

### What Kiali Shows You:
1. **Graph View**: Visual service topology
   - Green edges = healthy traffic
   - Red edges = errors
   - Edge labels = requests per second

2. **Applications**: Grouped services by app
3. **Workloads**: Individual deployments
4. **Services**: Kubernetes services
5. **Istio Config**: Virtual services, destination rules

### Kiali Key Features:
- **Traffic Animation**: See requests flowing in real-time
- **Health Indicators**: Color-coded service health
- **Metrics Integration**: Built-in Grafana dashboards
- **Trace Integration**: Jump to Jaeger traces
- **Configuration Validation**: Istio config errors

## 🎯 Practical Use Cases

### Use Case 1: Debug Slow Response
1. **Kiali**: See which service path is slow
2. **Jaeger**: View detailed trace of slow request
3. **Grafana**: Check resource usage during slowdown

### Use Case 2: Service Down
1. **Docker Grafana**: Check container status
2. **Prometheus**: Query `up` metric
3. **Kiali**: See if traffic is reaching service

### Use Case 3: High Error Rate
1. **Kiali**: Identify which service connection has errors
2. **Loki**: View error logs from that service
3. **Istio Prometheus**: Check error rate metrics

## 📈 Key Metrics to Monitor

### From Docker Stack:
```promql
# Container health
up{job=~".*"}

# Memory usage
container_memory_usage_bytes{name=~"devmentor.*"}

# CPU usage
rate(container_cpu_usage_seconds_total[5m])

# Network traffic
rate(container_network_receive_bytes_total[5m])
```

### From Istio Stack:
```promql
# Request rate
sum(rate(istio_request_total[5m])) by (destination_service_name)

# Error rate
sum(rate(istio_request_total{response_code=~"5.."}[5m])) by (destination_service_name)

# P99 latency
histogram_quantile(0.99, sum(rate(istio_request_duration_milliseconds_bucket[5m])) by (destination_service_name, le))
```

## 🔧 Common Tasks

### View Service Dependencies:
1. Open Kiali: http://localhost:20001
2. Click "Graph"
3. Select namespace
4. Choose "Versioned app graph"

### Check Service Health:
```bash
# Docker containers
curl http://localhost:3006/api/services

# Kubernetes pods
kubectl get pods --all-namespaces
```

### Find Errors Quickly:
```bash
# In Loki (via Grafana Explore)
{container_name=~".*"} |= "error"

# In Kiali
Look for red edges in graph
```

### Monitor Traffic Flow:
1. In Kiali graph
2. Enable "Traffic Animation"
3. Watch requests flow between services

## 🎨 Best Practices

### 1. Use Kiali for Service Mesh:
- Traffic patterns
- Service dependencies
- Configuration issues

### 2. Use Docker Grafana for Resources:
- Memory/CPU usage
- Container health
- System metrics

### 3. Use Both Jaeger Instances:
- Docker Jaeger: Application traces
- Istio Jaeger: Service mesh traces

### 4. Correlate Across Stacks:
- Time-align issues across both stacks
- Use same time ranges when investigating

## 🚨 Troubleshooting

### Kiali Shows No Traffic:
```bash
# Check if pods have Istio sidecar
kubectl get pods -n default -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.containers[*].name}{"\n"}{end}'

# Enable sidecar injection
kubectl label namespace default istio-injection=enabled
kubectl rollout restart deployment -n default
```

### Can't Access Istio Services:
```bash
# Check port forwards
ps aux | grep port-forward

# Restart port forwards
kubectl port-forward -n istio-system svc/kiali 20001:20001 &
kubectl port-forward -n istio-system svc/grafana 3008:3000 &
```

### Service Not in Mesh:
```bash
# Add Istio sidecar to deployment
kubectl label namespace <namespace> istio-injection=enabled
kubectl rollout restart deployment/<deployment-name> -n <namespace>
```

## 📚 Learning Path

### Week 1: Master Kiali
- Explore service graph
- Understand traffic flow
- Learn health indicators

### Week 2: Correlate Metrics
- Match Kiali traffic with Prometheus metrics
- Compare both Grafana instances
- Align time ranges

### Week 3: Distributed Tracing
- Follow request through Kiali
- Deep dive in Jaeger
- Correlate with logs

### Week 4: Service Mesh Features
- Configure traffic routing
- Test circuit breakers
- Implement retry policies

## 🔗 Quick Links Summary

### Docker Stack:
- Grafana Dashboard: http://localhost:3007/d/devmentor-fixed/devmentor-complete-observability
- Prometheus: http://localhost:9090
- Jaeger: http://localhost:16686
- Monitoring API: http://localhost:3006/api/services

### Istio Stack:
- Kiali: http://localhost:20001
- Port-forward commands:
  ```bash
  kubectl port-forward -n istio-system svc/grafana 3008:3000
  kubectl port-forward -n istio-system svc/prometheus 9091:9090
  kubectl port-forward -n istio-system svc/jaeger 16687:16686
  ```

## 💡 Pro Tips

1. **Kiali is your service mesh command center** - Start here for service issues
2. **Docker Grafana is your resource monitor** - Check here for performance
3. **Correlate timestamps** across both stacks when debugging
4. **Use Kiali's built-in Grafana/Jaeger links** for quick navigation
5. **The Docker monitoring service** (port 3006) provides unified API access

Remember: Having both stacks gives you complete visibility from infrastructure to service mesh!
{% endraw %}
