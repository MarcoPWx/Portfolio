---
layout: product
title: PRACTICAL OBSERVABILITY GUIDE
product: DevMentor
source: infrastructure/services/monitoring-service/PRACTICAL_OBSERVABILITY_GUIDE.md
---

{% raw %}
# 🎯 Practical Observability Guide - Simplified

## Current Setup (What You Actually Need)

### Essential Tools Only:
1. **Prometheus** (Port 9090) - Collects metrics
2. **Grafana** (Port 3007) - Visualizes data  
3. **Jaeger** (Port 16686) - Traces requests
4. **Loki** (Port 3100) - Aggregates logs
5. **Your Monitoring Service** (Port 3006) - Central hub

### Tools You Can Remove:
- **AlertManager** - Redundant for development
- **cAdvisor** - Node exporter gives enough info
- **Kiali** - Only needed with service mesh

## 🚀 Quick Access URLs

1. **Grafana Dashboard**: http://localhost:3007
   - Login: `admin` / `devmentor123`
   - Your custom dashboard: http://localhost:3007/d/6b05a080-3b70-440d-a085-9d5128ea5940/devmentor-system-overview

2. **Prometheus**: http://localhost:9090
   - No login required
   - Direct query interface

3. **Jaeger**: http://localhost:16686
   - No login required
   - Trace viewer

## 📊 How to Actually Use Grafana

### Step 1: Access Your Dashboard
1. Go to http://localhost:3007
2. Login with `admin` / `devmentor123`
3. Click "Dashboards" in left menu
4. Select "DevMentor System Overview"

### Step 2: What You'll See
- **Service Health**: Green = Running, Red = Down
- **Memory Usage**: How much RAM each container uses
- **CPU Usage**: Processing power consumption
- **HTTP Requests**: Traffic to your services
- **Recent Logs**: Live log stream

### Step 3: Create Your Own Panels

#### Example 1: See Which Containers Are Running
1. Click "+" → "Dashboard" → "Add Panel"
2. Select "Prometheus" data source
3. Enter query: `up`
4. Change visualization to "Stat"
5. Apply

#### Example 2: Monitor Memory Usage
1. Add new panel
2. Query: `container_memory_usage_bytes{name=~"devmentor.*"}/1024/1024/1024`
3. Visualization: "Time series"
4. Unit: GB
5. Apply

#### Example 3: Count Errors in Logs
1. Add new panel
2. Change data source to "Loki"
3. Query: `{container_name=~"devmentor.*"} |= "error"`
4. Visualization: "Logs"
5. Apply

## 🔍 Useful Prometheus Queries

Open http://localhost:9090 and try these:

### Basic Health Checks
```promql
# Which services are up?
up

# Only DevMentor services
up{job=~".*devmentor.*"}

# Services that are DOWN
up == 0
```

### Resource Usage
```promql
# Memory usage in GB
container_memory_usage_bytes{name=~"devmentor.*"}/1024/1024/1024

# CPU percentage
rate(container_cpu_usage_seconds_total{name=~"devmentor.*"}[5m]) * 100

# Network traffic
rate(container_network_receive_bytes_total[5m])
```

### Performance Metrics
```promql
# HTTP request rate
rate(http_requests_total[5m])

# Response time (if instrumented)
http_request_duration_seconds

# Error rate
rate(http_requests_total{status=~"5.."}[5m])
```

## 📝 How to View Logs in Grafana

1. Go to Grafana → Explore (compass icon)
2. Select "Loki" from dropdown
3. Use these queries:

```logql
# All logs from DevMentor services
{container_name=~"devmentor.*"}

# Only errors
{container_name=~"devmentor.*"} |= "error"

# Specific service
{container_name="devmentor-monitoring-service-1"}

# JSON parsing (if logs are JSON)
{container_name=~"devmentor.*"} | json | level="error"
```

## 🔧 Simplified Docker Compose

To remove redundant services, create this simplified version:

```yaml
# docker-compose.observability-simple.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./configs/prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
    networks:
      - devmentor-network

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3007:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=devmentor123
      - GF_INSTALL_PLUGINS=redis-datasource
    volumes:
      - ./configs/grafana-datasources.yml:/etc/grafana/provisioning/datasources/datasources.yml
    networks:
      - devmentor-network

  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./configs/loki-config.yml:/etc/loki/config.yml
    command: -config.file=/etc/loki/config.yml
    networks:
      - devmentor-network

  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"  # UI
      - "6831:6831/udp" # Accept traces
    environment:
      - COLLECTOR_OTLP_ENABLED=true
    networks:
      - devmentor-network

  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9100:9100"
    networks:
      - devmentor-network

networks:
  devmentor-network:
    external: true
```

## 🎯 5-Minute Practical Exercises

### Exercise 1: Find the Biggest Memory User
1. Go to Prometheus: http://localhost:9090
2. Query: `topk(3, container_memory_usage_bytes{name=~"devmentor.*"})`
3. This shows top 3 memory consumers

### Exercise 2: Create an Alert-like Query
1. In Prometheus, query: `container_memory_usage_bytes{name=~"devmentor.*"} > 500000000`
2. This shows containers using more than 500MB

### Exercise 3: Find Recent Errors
1. In Grafana → Explore → Loki
2. Query: `{container_name=~"devmentor.*"} |= "error" | json`
3. See all recent errors across services

### Exercise 4: Monitor Your Monitoring
1. Query in Prometheus: `up{job="monitoring-service"}`
2. Should show 1 if monitoring service is healthy

## 🚨 Common Issues & Solutions

### "No Data" in Grafana
- Check Prometheus is running: `curl http://localhost:9090/-/healthy`
- Verify data source in Grafana settings
- Ensure time range is correct (top right)

### Can't See Container Metrics
- Node exporter doesn't show container metrics
- Use: `docker stats` for quick check
- Or query monitoring service: `curl http://localhost:3006/api/metrics`

### Loki Not Showing Logs
- Check Promtail is running: `docker ps | grep promtail`
- Verify containers have labels
- Try broader query: `{container_name=~".+"}`

## 💡 Pro Tips

1. **Start Simple**: Use existing metrics before adding custom ones
2. **Time Ranges Matter**: Adjust time range in top-right of Grafana
3. **Use Labels**: Filter by labels like `{service="frontend"}`
4. **Rate vs Gauge**: Use `rate()` for counters, direct value for gauges
5. **Refresh Rate**: Set appropriate refresh (5s for dev, 30s for prod)

## 🎓 What to Learn Next

1. **Week 1**: Master these 5 queries in Prometheus
2. **Week 2**: Build one dashboard in Grafana
3. **Week 3**: Add custom metrics to one service
4. **Week 4**: Set up one alert rule
5. **Week 5**: Implement distributed tracing

## 📞 Quick Commands

```bash
# Check what's running
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "(prometheus|grafana|jaeger|loki)"

# View monitoring service health
curl http://localhost:3006/health

# Get all metrics
curl http://localhost:3006/api/metrics

# Restart observability stack
docker-compose -f docker-compose.observability.yml restart prometheus grafana loki jaeger

# Stop redundant services
docker stop devmentor-alertmanager devmentor-cadvisor devmentor-kiali
```

## 🔗 Direct Links to Your Data

- **Your Dashboard**: http://localhost:3007/d/6b05a080-3b70-440d-a085-9d5128ea5940/devmentor-system-overview
- **Explore Metrics**: http://localhost:3007/explore?left=%5B%22now-1h%22,%22now%22,%22Prometheus%22,%7B%7D%5D
- **Explore Logs**: http://localhost:3007/explore?left=%5B%22now-1h%22,%22now%22,%22Loki%22,%7B%7D%5D
- **Prometheus Targets**: http://localhost:9090/targets
- **Jaeger Search**: http://localhost:16686/search

Remember: The goal is to understand your system better, not to have the fanciest dashboards!
{% endraw %}
