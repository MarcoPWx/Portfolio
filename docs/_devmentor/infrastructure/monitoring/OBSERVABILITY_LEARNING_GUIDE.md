---
layout: product
title: OBSERVABILITY LEARNING GUIDE
product: DevMentor
source: infrastructure/monitoring/OBSERVABILITY_LEARNING_GUIDE.md
---

{% raw %}
# 🎓 DevMentor Observability Learning Guide

## 📊 Current System Status

### ✅ Running Services
- **Monitoring Service** (Port 3006) - Central monitoring hub
- **PostgreSQL** (Port 5432) - Database 
- **Redis** (Port 6379) - Cache & messaging
- **Prometheus** (Port 9090) - Metrics collection
- **Grafana** (Port 3007) - Visualization dashboards
- **Jaeger** (Port 16686) - Distributed tracing
- **Loki** (Port 3100) - Log aggregation
- **AlertManager** (Port 9093) - Alert management
- **cAdvisor** (Port 8080) - Container metrics
- **Node Exporter** (Port 9100) - System metrics

### ❌ Not Running Services
- **Frontend** (devmentor-ui) - Main UI application
- **Auth Service** - Authentication microservice
- **Memory Service** - Context memory service
- **AI Gateway** - AI integration service
- **Project Service** - Project management service
- **Kiali** - Service mesh observability (restarting)

## 🚀 Quick Start Guide

### Step 1: Start Missing Core Services

```bash
# Start all core application services
docker-compose up -d

# Or start specific services
docker-compose up -d frontend auth-service memory-service ai-gateway project-service
```

### Step 2: Verify All Services Are Running

```bash
# Check service health
curl http://localhost:3006/api/services | jq .

# Check container status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

## 🎯 Learning Path by Tool

### 1. 📈 Prometheus (Metrics) - http://localhost:9090

#### What You'll Learn:
- How to query time-series metrics
- Understanding metric types (counters, gauges, histograms)
- Writing PromQL queries
- Service discovery mechanisms

#### Beginner Exercises:
1. **Explore Available Metrics**
   - Go to http://localhost:9090
   - Click "Graph" → Type `up` → Execute
   - This shows which services are up (1) or down (0)

2. **Container Memory Usage**
   ```promql
   container_memory_usage_bytes{name=~"devmentor.*"}
   ```
   - Shows memory usage for all DevMentor containers

3. **HTTP Request Rate**
   ```promql
   rate(http_requests_total[5m])
   ```
   - Shows requests per second over 5 minutes

#### Intermediate Exercises:
1. **CPU Usage by Container**
   ```promql
   sum(rate(container_cpu_usage_seconds_total{name=~"devmentor.*"}[5m])) by (name) * 100
   ```

2. **Memory Usage Percentage**
   ```promql
   (container_memory_usage_bytes / container_spec_memory_limit_bytes) * 100
   ```

3. **Alert Query Example**
   ```promql
   up{job="monitoring-service"} == 0
   ```
   - Returns 1 if monitoring service is down

### 2. 📊 Grafana (Visualization) - http://localhost:3007

**Login:** admin / devmentor123

#### What You'll Learn:
- Creating dashboards
- Setting up alerts
- Data source configuration
- Panel types and visualizations

#### Getting Started:
1. **Import Pre-built Dashboard**
   - Go to Dashboards → Import
   - Enter ID: `1860` (Node Exporter Full)
   - Select Prometheus data source
   - Click Import

2. **Create Your First Dashboard**
   - Click "+" → "Dashboard"
   - Add Panel → Select Prometheus
   - Query: `up{job=~".*service.*"}`
   - Visualization: Stat
   - Title: "Service Health"

3. **Set Up an Alert**
   - Edit any panel → Alert tab
   - Create alert rule for when value < 1
   - Configure notification channel

#### Dashboard Ideas:
- **Service Health Overview**: Status of all microservices
- **Performance Metrics**: Response times, throughput
- **Resource Usage**: CPU, memory, disk, network
- **Business Metrics**: User activity, API usage

### 3. 📝 Loki (Logs) - via Grafana

#### What You'll Learn:
- Log aggregation patterns
- LogQL query language
- Log correlation with metrics
- Structured logging benefits

#### Exercises:
1. **View All Logs**
   - In Grafana, go to Explore
   - Select Loki data source
   - Query: `{container_name=~"devmentor.*"}`

2. **Filter by Log Level**
   ```logql
   {container_name="devmentor-monitoring-service-1"} |= "ERROR"
   ```

3. **Parse JSON Logs**
   ```logql
   {container_name=~"devmentor.*"} | json | level="error"
   ```

4. **Count Errors Over Time**
   ```logql
   sum(rate({container_name=~"devmentor.*"} |= "error" [5m]))
   ```

### 4. 🔍 Jaeger (Tracing) - http://localhost:16686

#### What You'll Learn:
- Distributed tracing concepts
- Span and trace relationships
- Performance bottleneck identification
- Service dependency mapping

#### How to Generate Traces:
1. **Enable Tracing in Services**
   ```javascript
   // Add to your service code
   const tracer = require('jaeger-client').initTracer({
     serviceName: 'frontend',
     sampler: { type: 'const', param: 1 },
     reporter: { agentHost: 'localhost', agentPort: 6831 }
   });
   ```

2. **View Traces**
   - Go to http://localhost:16686
   - Select service from dropdown
   - Click "Find Traces"
   - Click on any trace to see details

#### Trace Analysis:
- **Latency Breakdown**: See time spent in each service
- **Error Detection**: Red spans indicate errors
- **Dependency Graph**: Service → System Architecture

### 5. 🎚️ Monitoring Service API - http://localhost:3006

#### Available Endpoints:

```bash
# Health Check
curl http://localhost:3006/health

# Service Status
curl http://localhost:3006/api/services | jq .

# System Metrics
curl http://localhost:3006/api/metrics | jq .

# Incidents
curl http://localhost:3006/api/incidents | jq .

# Prometheus Metrics (Unified)
curl http://localhost:3006/api/observability/metrics?query=up | jq .

# Loki Logs (Unified)
curl http://localhost:3006/api/observability/logs?query={container_name=\"devmentor-frontend\"} | jq .

# Jaeger Traces (Unified)
curl http://localhost:3006/api/observability/traces?service=frontend | jq .
```

## 🏗️ Architecture Understanding

### Service Communication Flow:
```
User Request → Frontend (3001)
     ↓
Auth Service (3002) → Redis (6379)
     ↓                    ↓
AI Gateway (3004)    PostgreSQL (5432)
     ↓
Project Service (3005)
     ↓
Memory Service (3003)

All services → Monitoring Service (3006)
            → Prometheus (9090)
            → Loki (3100)
            → Jaeger (16686)
```

## 📚 Learning Projects

### Project 1: Build a Service Health Dashboard
1. Create a Grafana dashboard showing all service statuses
2. Add CPU and memory usage for each service
3. Set up alerts for when services go down
4. Add log panels showing recent errors

### Project 2: Trace a User Journey
1. Add tracing to the frontend
2. Follow a request through all services
3. Identify the slowest service
4. Optimize based on findings

### Project 3: Create SLO Dashboard
1. Define SLIs (Service Level Indicators)
   - Availability: `avg(up{job=~".*service"})`
   - Latency: P95 response time
   - Error rate: Errors per minute
2. Set SLOs (Service Level Objectives)
   - 99.9% availability
   - P95 latency < 200ms
   - Error rate < 1%
3. Create dashboard tracking SLO compliance

### Project 4: Implement Chaos Engineering
1. Use monitoring to establish baseline
2. Introduce controlled failures
3. Observe system behavior
4. Improve resilience based on findings

## 🔧 Troubleshooting Common Issues

### Frontend Not Running
```bash
# Check if frontend image exists
docker images | grep devmentor-ui

# Build if missing
cd devmentor-ui
docker build -t devmentor-frontend .
cd ..

# Start frontend
docker-compose up -d frontend
```

### Service Can't Connect
```bash
# Check network
docker network ls | grep devmentor

# Recreate if needed
docker network create devmentor-network

# Restart services
docker-compose restart
```

### Kiali Keeps Restarting
```bash
# Check logs
docker logs devmentor-kiali

# Fix signing key if needed
docker-compose -f docker-compose.observability.yml up -d kiali
```

## 📖 Advanced Topics to Explore

### 1. **Service Mesh Integration**
- Add Istio for advanced traffic management
- Use Kiali for service mesh visualization
- Implement circuit breakers and retries

### 2. **Machine Learning for Observability**
- Anomaly detection in metrics
- Log pattern recognition
- Predictive alerting

### 3. **Cost Optimization**
- Monitor resource usage patterns
- Identify over-provisioned services
- Implement auto-scaling based on metrics

### 4. **Security Observability**
- Track authentication failures
- Monitor for suspicious patterns
- Audit log analysis

## 🎯 Daily Practice Routine

### Morning (15 mins)
1. Check Grafana dashboards for overnight issues
2. Review any triggered alerts
3. Check service health status

### Afternoon (30 mins)
1. Write one new PromQL query
2. Add one new panel to a dashboard
3. Investigate one interesting trace

### Evening (15 mins)
1. Review the day's incidents
2. Document any learnings
3. Plan tomorrow's monitoring improvements

## 🚀 Next Steps

1. **Start the missing services** using docker-compose
2. **Access Grafana** and explore the dashboards
3. **Generate some traffic** to see real metrics
4. **Create your first custom dashboard**
5. **Set up your first alert**
6. **Investigate a trace** in Jaeger
7. **Query logs** in Loki

## 📞 Quick Help

```bash
# Check all services status
curl http://localhost:3006/api/services | jq '.[] | select(.status != "healthy")'

# View recent errors
docker logs devmentor-monitoring-service-1 --tail 50 | grep ERROR

# Restart everything
docker-compose restart
docker-compose -f docker-compose.observability.yml restart

# Emergency shutdown
docker-compose down
docker-compose -f docker-compose.observability.yml down
```

## 🎓 Educational Resources

### Concepts to Master:
1. **RED Method**: Rate, Errors, Duration
2. **USE Method**: Utilization, Saturation, Errors
3. **Four Golden Signals**: Latency, Traffic, Errors, Saturation
4. **SRE Principles**: SLIs, SLOs, SLAs, Error Budgets
5. **Observability Pillars**: Metrics, Logs, Traces

### Recommended Learning Path:
1. Week 1: Master Prometheus queries
2. Week 2: Build comprehensive Grafana dashboards
3. Week 3: Implement distributed tracing
4. Week 4: Set up alerting and incident response
5. Week 5: Optimize based on observations
6. Week 6: Implement chaos engineering

Remember: Observability is not just about tools, but about understanding your system's behavior and continuously improving it based on data-driven insights!
{% endraw %}
