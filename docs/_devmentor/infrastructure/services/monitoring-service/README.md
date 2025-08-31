---
layout: product
title: README
product: DevMentor
source: infrastructure/services/monitoring-service/README.md
---

{% raw %}
# 🎯 DevMentor Monitoring & Observability Service

## Overview

The DevMentor Monitoring Service is an AI-powered, comprehensive observability platform that provides real-time monitoring, predictive maintenance, and intelligent incident management for the entire DevMentor ecosystem.

## Table of Contents

1. [Architecture](#architecture)
2. [Features](#features)
3. [Components](#components)
4. [Event System](#event-system)
5. [Observability Stack](#observability-stack)
6. [API Reference](#api-reference)
7. [WebSocket Events](#websocket-events)
8. [Deployment](#deployment)
9. [Configuration](#configuration)
10. [Troubleshooting](#troubleshooting)

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     MONITORING SERVICE ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                        Frontend Dashboard                         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │  │
│  │  │ Services │  │ Metrics  │  │Incidents │  │ AI Insights  │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────┘    │  │
│  └─────────────────────────┬────────────────────────────────────────┘  │
│                            │ WebSocket + REST                           │
│  ┌─────────────────────────┴────────────────────────────────────────┐  │
│  │                    Monitoring Service (Port 3006)                │  │
│  │  ┌────────────────────────────────────────────────────────────┐ │  │
│  │  │                     Core Components                        │ │  │
│  │  │  • Monitoring Engine    • Event Processor                  │ │  │
│  │  │  • Health Checker       • Metrics Collector               │ │  │
│  │  │  • Incident Manager     • Prediction Engine               │ │  │
│  │  │  • Alert System         • Pattern Analyzer                │ │  │
│  │  └────────────────────────────────────────────────────────────┘ │  │
│  └─────────────────────────┬────────────────────────────────────────┘  │
│                            │                                            │
│  ┌─────────────────────────┴────────────────────────────────────────┐  │
│  │                        Data Layer                                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │  │
│  │  │  Redis   │  │ Postgres │  │  Docker  │  │  Prometheus  │    │  │
│  │  │  Cache   │  │ Metrics  │  │   API    │  │   Metrics    │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────┘    │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Features

### 🔍 Real-Time Monitoring
- **Service Health Checks**: Continuous monitoring of all microservices
- **System Metrics**: CPU, memory, disk, and network usage tracking
- **Container Monitoring**: Docker container status and statistics
- **Response Time Tracking**: API endpoint performance monitoring
- **Error Rate Analysis**: Service error rate calculation and trending

### 🤖 AI-Powered Intelligence
- **Predictive Maintenance**: Anticipate failures before they occur
- **Pattern Recognition**: Identify recurring issues and trends
- **Smart Suggestions**: AI-generated fix recommendations
- **Anomaly Detection**: Automatic detection of unusual behavior
- **Root Cause Analysis**: Intelligent problem diagnosis

### 🚨 Incident Management
- **Automatic Detection**: Real-time incident identification
- **Severity Classification**: Low, Medium, High, Critical levels
- **Auto-Response**: Automated recovery actions for known issues
- **Incident Timeline**: Complete history and action tracking
- **Escalation Policies**: Configurable alert routing

### 📊 Metrics & Analytics
- **Prometheus Integration**: Industry-standard metrics collection
- **Custom Dashboards**: Configurable visualization panels
- **Historical Data**: Long-term trend analysis
- **Performance Baselines**: Automatic baseline establishment
- **SLA Monitoring**: Service level agreement tracking

### 🔔 Event System
- **WebSocket Real-time Updates**: Live data streaming
- **Event Aggregation**: Intelligent event correlation
- **Event Filtering**: Customizable event subscriptions
- **Event History**: Complete audit trail
- **Event-Driven Actions**: Automated responses to events

## Components

### 1. Monitoring Engine (`MonitoringEngine`)
The core component responsible for orchestrating all monitoring activities.

```javascript
class MonitoringEngine {
  // Main monitoring loop
  start()
  stop()
  
  // Health checking
  checkServiceHealth(serviceName)
  checkSystemHealth()
  
  // Metrics collection
  collectMetrics()
  collectSystemMetrics()
  
  // Incident management
  createIncident(service, description, severity)
  respondToIncident(incident)
  
  // Predictive maintenance
  runPredictiveMaintenance()
  analyzePatterns()
}
```

### 2. Event Processor
Handles all event processing and distribution.

```javascript
// Event types
const EventTypes = {
  SERVICE_UP: 'service.up',
  SERVICE_DOWN: 'service.down',
  INCIDENT_CREATED: 'incident.created',
  INCIDENT_RESOLVED: 'incident.resolved',
  PREDICTION_GENERATED: 'prediction.generated',
  METRIC_THRESHOLD: 'metric.threshold',
  SYSTEM_ALERT: 'system.alert'
}
```

### 3. Metrics Collector
Gathers and processes various metrics.

```javascript
// Metric types
const MetricTypes = {
  GAUGE: 'gauge',      // Current value (e.g., CPU usage)
  COUNTER: 'counter',  // Cumulative value (e.g., request count)
  HISTOGRAM: 'histogram', // Distribution (e.g., response times)
  SUMMARY: 'summary'   // Statistical summary
}
```

### 4. Prediction Engine
AI-powered predictive analytics.

```javascript
// Prediction categories
const PredictionCategories = {
  MEMORY_LEAK: 'memory_leak',
  PERFORMANCE_DEGRADATION: 'performance_degradation',
  CAPACITY_PLANNING: 'capacity_planning',
  FAILURE_PREDICTION: 'failure_prediction',
  ANOMALY_DETECTION: 'anomaly_detection'
}
```

## Event System

### Event Flow
```
Producer → Event Bus → Event Processor → Consumers
    ↓          ↓            ↓               ↓
Services    Redis      Filtering      WebSocket
Metrics     Queue      Correlation    Database
Alerts      Buffer     Aggregation    Notifications
```

### Event Schema
```typescript
interface MonitoringEvent {
  id: string;
  type: EventType;
  source: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'error' | 'critical';
  data: any;
  metadata: {
    correlationId?: string;
    userId?: string;
    sessionId?: string;
    tags?: string[];
  };
}
```

### Event Subscriptions
```javascript
// Subscribe to specific events
socket.on('service.down', (event) => {
  console.log(`Service ${event.source} is down`);
});

// Subscribe to pattern
socket.on('incident.*', (event) => {
  console.log(`Incident event: ${event.type}`);
});

// Subscribe to all events
socket.on('*', (event) => {
  console.log(`Event received: ${event.type}`);
});
```

## Observability Stack

### 1. Metrics (Prometheus)
```yaml
# Exposed metrics
service_health_status{service="auth"} 1
http_request_duration_seconds{method="GET",route="/api/users"} 0.045
service_error_rate{service="memory"} 0.02
system_cpu_usage_percent 45.2
system_memory_usage_bytes 4294967296
```

### 2. Logging (Winston)
```javascript
// Log levels
logger.error('Service failure', { service: 'auth', error: err });
logger.warn('High memory usage', { usage: '85%' });
logger.info('Service started', { service: 'monitoring' });
logger.debug('Health check completed', { results });
```

### 3. Tracing (OpenTelemetry - Future)
```javascript
// Distributed tracing
const span = tracer.startSpan('health-check');
span.setAttributes({
  'service.name': 'monitoring',
  'check.type': 'health',
  'check.target': 'auth-service'
});
// ... perform check
span.end();
```

### 4. Visualization
- **Grafana Dashboards**: Real-time metrics visualization
- **Custom React Dashboard**: Integrated monitoring UI
- **Alert Manager**: Alert routing and management
- **Jaeger UI**: Distributed tracing visualization

## API Reference

### REST Endpoints

#### Health Check
```http
GET /health
Response: {
  "status": "healthy",
  "timestamp": "2024-01-19T10:00:00Z"
}
```

#### Get All Services Status
```http
GET /api/services
Response: {
  "auth": {
    "status": "healthy",
    "uptime": 3600,
    "metrics": {...}
  },
  ...
}
```

#### Get System Metrics
```http
GET /api/metrics
Response: {
  "services": {...},
  "system": {
    "cpu": { "usage": 45.2, "cores": 8 },
    "memory": { "used": 4294967296, "total": 8589934592 }
  },
  "docker": [...]
}
```

#### Get Incidents
```http
GET /api/incidents
Query Parameters:
  - status: open|resolved|all
  - severity: low|medium|high|critical
  - limit: number
  - offset: number
```

#### Create Incident
```http
POST /api/incidents
Body: {
  "service": "auth",
  "description": "Service not responding",
  "severity": "high"
}
```

#### Get Predictions
```http
GET /api/predictions
Response: [{
  "service": "memory",
  "type": "memory_leak",
  "severity": "medium",
  "message": "Memory leak detected",
  "suggestion": "Restart service and investigate memory allocation"
}]
```

#### Restart Service
```http
POST /api/services/:service/restart
Response: {
  "message": "Service restart initiated",
  "service": "auth"
}
```

#### Prometheus Metrics
```http
GET /metrics
Response: Prometheus formatted metrics
```

## WebSocket Events

### Client → Server Events

#### Request Metrics Update
```javascript
socket.emit('requestMetrics');
```

#### Restart Service
```javascript
socket.emit('restartService', 'auth');
```

#### Subscribe to Events
```javascript
socket.emit('subscribe', {
  events: ['service.*', 'incident.created'],
  services: ['auth', 'memory']
});
```

### Server → Client Events

#### Initial State
```javascript
socket.on('initialState', (data) => {
  // data.services: Current service states
  // data.system: System metrics
  // data.incidents: Active incidents
  // data.predictions: AI predictions
});
```

#### Service Update
```javascript
socket.on('servicesUpdate', (services) => {
  // Real-time service status updates
});
```

#### System Metrics
```javascript
socket.on('systemMetrics', (metrics) => {
  // CPU, memory, disk, network stats
});
```

#### New Incident
```javascript
socket.on('incident', (incident) => {
  // New incident created
});
```

#### AI Prediction
```javascript
socket.on('prediction', (prediction) => {
  // New AI prediction generated
});
```

#### Service Restarted
```javascript
socket.on('serviceRestarted', (service) => {
  // Service restart completed
});
```

## Deployment

### Docker Deployment
```bash
# Build the image
docker build -t devmentor-monitoring ./services/monitoring-service

# Run standalone
docker run -p 3006:3006 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e NODE_ENV=production \
  devmentor-monitoring

# Run with docker-compose
docker-compose up -d monitoring-service
```

### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: monitoring-service
  namespace: devmentor
spec:
  replicas: 1
  selector:
    matchLabels:
      app: monitoring-service
  template:
    metadata:
      labels:
        app: monitoring-service
    spec:
      containers:
      - name: monitoring
        image: devmentor-monitoring:latest
        ports:
        - containerPort: 3006
        env:
        - name: NODE_ENV
          value: "production"
        volumeMounts:
        - name: dockersock
          mountPath: /var/run/docker.sock
      volumes:
      - name: dockersock
        hostPath:
          path: /var/run/docker.sock
---
apiVersion: v1
kind: Service
metadata:
  name: monitoring-service
  namespace: devmentor
spec:
  selector:
    app: monitoring-service
  ports:
  - port: 3006
    targetPort: 3006
```

## Configuration

### Environment Variables
```bash
# Server Configuration
PORT=3006
NODE_ENV=production

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3001

# Database Configuration
DATABASE_URL=postgresql://user:pass@localhost:5432/monitoring
REDIS_URL=redis://localhost:6379

# Monitoring Intervals (ms)
HEALTH_CHECK_INTERVAL=10000
METRICS_COLLECTION_INTERVAL=5000
PREDICTIVE_MAINTENANCE_INTERVAL=300000

# Alert Configuration
ALERT_EMAIL_ENABLED=true
ALERT_SLACK_ENABLED=true
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# AI Configuration
ENABLE_PREDICTIONS=true
PREDICTION_THRESHOLD=0.8

# Prometheus Configuration
PROMETHEUS_PORT=9090
PROMETHEUS_SCRAPE_INTERVAL=15s
```

### Service Configuration
```javascript
// config/services.js
module.exports = {
  services: {
    auth: {
      port: 3002,
      healthEndpoint: '/health',
      timeout: 2000,
      retryAttempts: 3,
      criticalService: true
    },
    // ... other services
  },
  thresholds: {
    cpu: 80,        // Alert if CPU > 80%
    memory: 90,     // Alert if memory > 90%
    errorRate: 0.05, // Alert if error rate > 5%
    responseTime: 2000 // Alert if response time > 2s
  }
};
```

## Troubleshooting

### Common Issues

#### 1. Cannot connect to Docker socket
```bash
# Fix: Ensure Docker socket is accessible
sudo chmod 666 /var/run/docker.sock
# Or run container with proper permissions
docker run --privileged ...
```

#### 2. WebSocket connection fails
```javascript
// Check CORS configuration
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});
```

#### 3. High memory usage
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm start
```

#### 4. Metrics not updating
```bash
# Check Prometheus is running
curl http://localhost:3006/metrics

# Verify health endpoints
curl http://localhost:3002/health
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=monitoring:* npm run dev

# View detailed logs
tail -f logs/combined.log
tail -f logs/error.log
```

### Performance Tuning
```javascript
// Adjust monitoring intervals
HEALTH_CHECK_INTERVAL=30000  // Less frequent checks
METRICS_COLLECTION_INTERVAL=10000  // Less frequent metrics

// Limit log buffer size
maxLogBuffer: 100  // Reduce memory usage

// Optimize WebSocket connections
io.engine.generateId = () => {
  return uuidv4(); // Better ID generation
};
```

## Integration with DevMentor Ecosystem

### Service Dependencies
- **Auth Service**: User authentication for dashboard access
- **Memory Service**: Stores monitoring history and patterns
- **AI Gateway**: Powers predictive analytics
- **Project Service**: Monitors project-specific metrics

### Event Integration
The monitoring service integrates with the DevMentor event system to:
- Receive service lifecycle events
- Emit monitoring alerts
- Trigger automated workflows
- Update system status in real-time

### Data Flow
```
Services → Health Checks → Monitoring Service → Metrics Store
    ↓                              ↓                    ↓
 Events                      Predictions           Dashboard
    ↓                              ↓                    ↓
WebSocket                    Incidents              Alerts
```

## Future Enhancements

### Planned Features
- [ ] Distributed tracing with OpenTelemetry
- [ ] Custom alert rules engine
- [ ] Machine learning model training
- [ ] Cost monitoring and optimization
- [ ] Chaos engineering integration
- [ ] Mobile application
- [ ] Grafana dashboard templates
- [ ] SLA monitoring and reporting
- [ ] Capacity planning recommendations
- [ ] Security vulnerability scanning

### API Extensions
- GraphQL endpoint for flexible queries
- Batch operations for bulk updates
- Streaming APIs for real-time data
- Webhook integrations
- Third-party service monitoring

## Related Documentation

This monitoring service is part of a larger observability ecosystem. See the following documentation:

### 📚 Complete Documentation Index
- **[INDEX.md](./INDEX.md)** - Master index of all monitoring, events, operations, and scaling documentation

### 🔔 Event System
- **[events/EMITTERS.md](./events/EMITTERS.md)** - Event emitters and handlers
- **[events/WEBSOCKET.md](./events/WEBSOCKET.md)** - WebSocket real-time events
- **[events/LEARNING.md](./events/LEARNING.md)** - AI learning event patterns

### ☸️ Infrastructure
- **[cluster/KUBERNETES_K3S_DEV_SETUP.md](./cluster/KUBERNETES_K3S_DEV_SETUP.md)** - Local Kubernetes setup
- **[cluster/LOCAL_K8S_FIX.md](./cluster/LOCAL_K8S_FIX.md)** - Kubernetes troubleshooting

### 🔧 Operations
- **[operations/DEVMENTOR_OPERATIONS_GUIDE.md](./operations/DEVMENTOR_OPERATIONS_GUIDE.md)** - Complete operations manual
- **[operations/OPS_GETTING_STARTED_GUIDE.md](./operations/OPS_GETTING_STARTED_GUIDE.md)** - Quick start for operators

### 📈 Scaling
- **[scaling/DEVMENTOR_SCALING_TO_1M.md](./scaling/DEVMENTOR_SCALING_TO_1M.md)** - Scaling to 1 million users
- **[scaling/HORIZONTAL_SCALING_KUBERNETES.md](./scaling/HORIZONTAL_SCALING_KUBERNETES.md)** - Kubernetes auto-scaling

### 🔍 Quick References
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick commands and API reference
- **[OBSERVABILITY_INTEGRATION.md](./OBSERVABILITY_INTEGRATION.md)** - Integration details

## Contributing

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines on contributing to the monitoring service.

## License

MIT License - See [LICENSE](../../LICENSE) for details.

---

**Last Updated**: January 19, 2024
**Version**: 1.0.0
**Status**: Production Ready
**Documentation Hub**: See [INDEX.md](./INDEX.md) for complete documentation structure
{% endraw %}
