---
layout: product
title: INDEX
product: DevMentor
source: infrastructure/services/monitoring-service/INDEX.md
---

{% raw %}
# 🎯 DevMentor Monitoring & Observability Hub

## Overview

This directory contains all documentation related to monitoring, observability, operations, and infrastructure management for the DevMentor platform. The monitoring service (Port 3006) serves as the central hub for all these systems.

## 📚 Documentation Structure

```
monitoring-service/
│
├── 📊 Core Monitoring
│   ├── README.md                      # Main monitoring service documentation
│   ├── QUICK_REFERENCE.md            # Quick commands and API reference
│   └── OBSERVABILITY_INTEGRATION.md  # Integration with observability stack
│
├── 🔔 Events System
│   ├── events/
│   │   ├── EMITTERS.md              # Event emitters and handlers
│   │   ├── WEBSOCKET.md             # WebSocket real-time events
│   │   ├── WEBSOCKET_BETA_READINESS.md # WebSocket implementation status
│   │   └── LEARNING.md              # AI learning event patterns
│   │
├── ☸️ Cluster & Infrastructure
│   ├── cluster/
│   │   ├── CONTAINER_ORCHESTRATION_GUIDE.md # Complete Docker & K8s learning guide
│   │   ├── DEVMENTOR_CONTAINER_QUICKREF.md  # DevMentor-specific quick reference
│   │   ├── cluster_beta-readiness.md        # Cluster readiness status
│   │   └── istio_mesh_beta-readiness.md     # Service mesh status
│   │
├── 🔧 Operations
│   ├── operations/
│   │   ├── DEVMENTOR_OPERATIONS_GUIDE.md # Complete ops guide
│   │   └── OPS_GETTING_STARTED_GUIDE.md  # Quick start for operators
│   │
└── 📈 Scaling & Performance
    └── scaling/
        ├── DEVMENTOR_SCALING_TO_1M.md    # Scaling to 1M users
        └── HORIZONTAL_SCALING_KUBERNETES.md # K8s scaling strategies
```

## 🔗 System Interconnections

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DEVMENTOR OBSERVABILITY ECOSYSTEM                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  User Interfaces                                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │   Terminal   │  │   Web UI     │  │   Mobile     │             │
│  │   Monitor    │  │   Dashboard  │  │   (Future)   │             │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │
│         │                  │                  │                      │
│         └──────────────────┴──────────────────┘                     │
│                            │                                         │
│  ┌─────────────────────────▼────────────────────────────────────┐  │
│  │              MONITORING SERVICE (Port 3006)                   │  │
│  │  ┌──────────────────────────────────────────────────────┐    │  │
│  │  │ • Health Checks    • Metrics Collection              │    │  │
│  │  │ • Event Processing • Incident Management             │    │  │
│  │  │ • AI Predictions   • Alert Routing                   │    │  │
│  │  └──────────────────────────────────────────────────────┘    │  │
│  └────────┬──────────┬──────────┬──────────┬───────────────────┘  │
│           │          │          │          │                        │
│    Events │   Metrics│    Logs  │   Traces │                        │
│           ▼          ▼          ▼          ▼                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐              │
│  │  Redis   │ │Prometheus│ │   ELK    │ │  Jaeger  │              │
│  │  Pub/Sub │ │  Grafana │ │  Stack   │ │   (OTel) │              │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘              │
│           │          │          │          │                        │
│           └──────────┴──────────┴──────────┘                        │
│                            │                                         │
│  ┌─────────────────────────▼────────────────────────────────────┐  │
│  │                    KUBERNETES CLUSTER                         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │   Auth   │  │  Memory  │  │    AI    │  │  Project │    │  │
│  │  │  Service │  │  Service │  │  Gateway │  │  Service │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start Guides

### 1. Start Monitoring Locally
```bash
# Terminal monitoring
npm run monitor:ultra

# Web dashboard
cd services/monitoring-service
npm install
npm run dev

# Access at http://localhost:3001/architecture/monitoring
```

### 2. Deploy to Kubernetes
```bash
# Setup local cluster (see cluster/KUBERNETES_K3S_DEV_SETUP.md)
k3s up

# Deploy monitoring
kubectl apply -f k8s/monitoring-service.yaml

# Check status
kubectl get pods -n devmentor
```

### 3. Configure Events
```javascript
// See events/WEBSOCKET.md for WebSocket setup
const socket = io('http://localhost:3006');

socket.on('incident', (data) => {
  console.log('Incident:', data);
});

// See events/EMITTERS.md for event types
socket.emit('service.health.check', { service: 'auth' });
```

### 4. Scale Services
```bash
# See scaling/HORIZONTAL_SCALING_KUBERNETES.md
kubectl scale deployment auth-service --replicas=3

# See scaling/DEVMENTOR_SCALING_TO_1M.md for production scaling
```

## 📊 Key Integration Points

### Events → Monitoring
- **Location**: `events/` → `server.js`
- **Purpose**: Real-time event processing
- **Key Files**:
  - `events/EMITTERS.md` - Event types and handlers
  - `events/WEBSOCKET.md` - WebSocket implementation
  - `OBSERVABILITY_INTEGRATION.md` - How events flow through system

### Cluster → Monitoring
- **Location**: `cluster/` → Kubernetes configs
- **Purpose**: Container orchestration and service discovery
- **Key Files**:
  - `cluster/CONTAINER_ORCHESTRATION_GUIDE.md` - Complete Docker & K8s learning guide
  - `cluster/DEVMENTOR_CONTAINER_QUICKREF.md` - DevMentor-specific operations
  - `cluster/cluster_beta-readiness.md` - Cluster readiness status
  - `cluster/istio_mesh_beta-readiness.md` - Service mesh configuration

### Operations → Monitoring
- **Location**: `operations/` → Operational procedures
- **Purpose**: Day-to-day operations and incident response
- **Key Files**:
  - `operations/DEVMENTOR_OPERATIONS_GUIDE.md` - Complete ops manual
  - `operations/OPS_GETTING_STARTED_GUIDE.md` - Quick start

### Scaling → Monitoring
- **Location**: `scaling/` → Performance and capacity
- **Purpose**: Handle growth and load distribution
- **Key Files**:
  - `scaling/DEVMENTOR_SCALING_TO_1M.md` - Growth strategy
  - `scaling/HORIZONTAL_SCALING_KUBERNETES.md` - Auto-scaling

## 🔍 Monitoring Capabilities

### Real-Time Monitoring
- Service health checks (10s intervals)
- System metrics collection (5s intervals)
- Docker container monitoring
- Network latency tracking

### Event Processing
- WebSocket real-time streaming
- Event aggregation and correlation
- Pattern recognition
- Automated responses

### Incident Management
- Automatic detection
- Severity classification
- Auto-recovery actions
- Incident timeline tracking

### AI Intelligence
- Predictive maintenance
- Anomaly detection
- Root cause analysis
- Performance optimization suggestions

### Metrics & Visualization
- Prometheus metrics export
- Grafana dashboard templates
- Custom React dashboard
- Historical trend analysis

## 📈 Performance Metrics

### System Health Targets
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| CPU Usage | < 70% | > 80% |
| Memory Usage | < 80% | > 90% |
| Disk Usage | < 75% | > 85% |
| Network Latency | < 50ms | > 100ms |

### Service Level Objectives (SLOs)
| Service | Uptime | Response Time | Error Rate |
|---------|--------|---------------|------------|
| Auth | 99.9% | < 200ms | < 0.1% |
| Memory | 99.5% | < 100ms | < 0.5% |
| AI Gateway | 99% | < 2000ms | < 1% |
| Project | 99.5% | < 500ms | < 0.5% |
| Monitoring | 99.99% | < 100ms | < 0.01% |

## 🛠️ Configuration

### Environment Variables
```bash
# Core Settings
MONITORING_PORT=3006
NODE_ENV=production

# Service Discovery
SERVICES_CONFIG=/config/services.json
AUTO_DISCOVER=true

# Event System
REDIS_URL=redis://localhost:6379
EVENT_RETENTION=7d

# Metrics
PROMETHEUS_PORT=9090
METRICS_RETENTION=30d

# Scaling
AUTO_SCALE_ENABLED=true
MIN_REPLICAS=1
MAX_REPLICAS=10

# Alerts
ALERT_CHANNELS=slack,email,pagerduty
```

### Service Dependencies
```yaml
monitoring-service:
  depends_on:
    - redis          # Event bus
    - postgres       # Metrics storage
    - elasticsearch  # Log aggregation
  integrates_with:
    - prometheus     # Metrics collection
    - grafana        # Visualization
    - jaeger         # Distributed tracing
```

## 🔐 Security Considerations

### Access Control
- JWT authentication for dashboard
- Role-based access (Admin, Operator, Viewer)
- API key management for external integrations

### Data Protection
- TLS encryption for all connections
- Sensitive data masking in logs
- Audit trail for all operations

### Compliance
- GDPR-compliant data retention
- SOC 2 audit logging
- HIPAA-ready encryption

## 📝 Common Tasks

### View Real-Time Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f monitoring-service

# Structured logs
tail -f services/monitoring-service/logs/combined.log | jq
```

### Check Service Health
```bash
# Via API
curl http://localhost:3006/api/services

# Via kubectl
kubectl get pods -n devmentor

# Via monitoring dashboard
open http://localhost:3001/architecture/monitoring
```

### Trigger Manual Incident
```bash
curl -X POST http://localhost:3006/api/incidents \
  -H "Content-Type: application/json" \
  -d '{"service":"auth","description":"Manual test","severity":"low"}'
```

### Export Metrics
```bash
# Prometheus format
curl http://localhost:3006/metrics

# JSON format
curl http://localhost:3006/api/metrics
```

## 🚨 Troubleshooting

### Service Not Appearing in Dashboard
1. Check health endpoint: `curl http://localhost:SERVICE_PORT/health`
2. Verify service registration in `config/services.js`
3. Check monitoring service logs
4. Ensure network connectivity

### High Memory Usage
1. Check for memory leaks: `npm run monitor:ultra` (press 'm' for metrics)
2. Review recent deployments
3. Check log retention settings
4. Scale horizontally if needed

### WebSocket Connection Issues
1. Verify CORS settings
2. Check firewall rules
3. Ensure Redis is running
4. Review WebSocket event subscriptions

### Missing Metrics
1. Verify Prometheus is running
2. Check scrape configuration
3. Ensure metrics endpoint is accessible
4. Review metric retention policies

## 📚 Additional Resources

### Internal Documentation
- [System Status](../status/SYSTEM_STATUS.md)
- [Epic Management](../status/EPIC_MANAGEMENT.md)
- [Testing Guide](../testing/)
- [API Documentation](../services/)

### External Tools
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Tutorials](https://grafana.com/tutorials/)
- [Kubernetes Monitoring](https://kubernetes.io/docs/tasks/debug/)
- [OpenTelemetry Guide](https://opentelemetry.io/docs/)

## 🤝 Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines on:
- Adding new monitoring capabilities
- Creating dashboard panels
- Defining alert rules
- Documenting operational procedures

## 📞 Support

- **Slack Channel**: #devmentor-monitoring
- **Email**: monitoring@devmentor.ai
- **On-Call**: See PagerDuty rotation
- **Documentation Issues**: Create GitHub issue

---

**Last Updated**: January 19, 2024
**Version**: 1.0.0
**Maintainers**: DevOps Team
{% endraw %}
