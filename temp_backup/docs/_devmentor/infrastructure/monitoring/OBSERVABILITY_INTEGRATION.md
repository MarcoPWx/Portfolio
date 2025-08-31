---
layout: product
title: OBSERVABILITY INTEGRATION
product: DevMentor
source: infrastructure/monitoring/OBSERVABILITY_INTEGRATION.md
---

{% raw %}
# 🔭 Observability Integration Guide

## Overview

This document describes how the monitoring service integrates with the broader DevMentor observability ecosystem, including events, metrics, logs, and traces.

## The Four Pillars of Observability

```
┌────────────────────────────────────────────────────────────────────┐
│                     DEVMENTOR OBSERVABILITY STACK                  │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────┐│
│  │   METRICS    │  │     LOGS     │  │   TRACES     │  │ EVENTS ││
│  │              │  │              │  │              │  │        ││
│  │ Prometheus   │  │   Winston    │  │ OpenTelemetry│  │WebSocket│
│  │   Grafana    │  │     ELK      │  │    Jaeger    │  │  Redis ││
│  └──────────────┘  └──────────────┘  └──────────────┘  └────────┘│
│         │                 │                 │               │      │
│         └─────────────────┴─────────────────┴───────────────┘      │
│                                 │                                   │
│                    ┌────────────────────────┐                      │
│                    │  MONITORING SERVICE    │                      │
│                    │   (Aggregation Hub)    │                      │
│                    └────────────────────────┘                      │
│                                 │                                   │
│                    ┌────────────────────────┐                      │
│                    │    UNIFIED DASHBOARD   │                      │
│                    └────────────────────────┘                      │
└────────────────────────────────────────────────────────────────────┘
```

## Event System Integration

### Event Sources and Consumers

```javascript
// Event flow through the system
const eventFlow = {
  producers: [
    'auth-service',      // Login/logout events
    'memory-service',    // Knowledge updates
    'ai-gateway',        // AI decisions
    'project-service',   // Project changes
    'monitoring-service' // System events
  ],
  
  broker: 'Redis Pub/Sub',
  
  consumers: [
    'monitoring-service', // Processes all events
    'frontend-dashboard', // Real-time updates
    'notification-service', // Alerts
    'audit-service'      // Compliance logging
  ]
};
```

### Event Types and Handlers

```javascript
// Core event types from /docs/events/EMITTERS.md
const SystemEvents = {
  // Service Lifecycle
  'service.started': handleServiceStart,
  'service.stopped': handleServiceStop,
  'service.crashed': handleServiceCrash,
  'service.recovered': handleServiceRecovery,
  
  // Health Events
  'health.check.passed': updateHealthStatus,
  'health.check.failed': triggerHealthAlert,
  
  // Performance Events
  'performance.threshold.exceeded': handlePerformanceIssue,
  'performance.anomaly.detected': investigateAnomaly,
  
  // Security Events
  'security.breach.attempted': handleSecurityEvent,
  'security.audit.completed': logAuditResult,
  
  // AI Events (from LEARNING.md)
  'ai.prediction.generated': processPrediction,
  'ai.pattern.detected': analyzePattern,
  'ai.model.updated': refreshModels
};
```

### WebSocket Event Broadcasting

```javascript
// From /docs/events/WEBSOCKET.md integration
class EventBroadcaster {
  constructor(io) {
    this.io = io;
    this.subscriptions = new Map();
  }
  
  // Broadcast to specific rooms
  broadcastToRoom(room, event, data) {
    this.io.to(room).emit(event, {
      timestamp: new Date(),
      source: 'monitoring-service',
      data
    });
  }
  
  // Broadcast to subscribers
  broadcastToSubscribers(eventType, data) {
    const subscribers = this.subscriptions.get(eventType) || [];
    subscribers.forEach(socketId => {
      this.io.to(socketId).emit(eventType, data);
    });
  }
  
  // Handle subscription management
  subscribe(socketId, eventTypes) {
    eventTypes.forEach(type => {
      if (!this.subscriptions.has(type)) {
        this.subscriptions.set(type, new Set());
      }
      this.subscriptions.get(type).add(socketId);
    });
  }
}
```

## Metrics Collection and Aggregation

### Prometheus Integration

```yaml
# prometheus.yml configuration
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'monitoring-service'
    static_configs:
      - targets: ['localhost:3006']
    metrics_path: '/metrics'
    
  - job_name: 'auth-service'
    static_configs:
      - targets: ['localhost:3002']
      
  - job_name: 'memory-service'
    static_configs:
      - targets: ['localhost:3003']
      
  - job_name: 'ai-gateway'
    static_configs:
      - targets: ['localhost:3004']
      
  - job_name: 'project-service'
    static_configs:
      - targets: ['localhost:3005']
```

### Custom Metrics

```javascript
// Application-specific metrics
const customMetrics = {
  // Business metrics
  activeUsers: new prometheus.Gauge({
    name: 'devmentor_active_users',
    help: 'Number of active users'
  }),
  
  aiRequestsTotal: new prometheus.Counter({
    name: 'devmentor_ai_requests_total',
    help: 'Total AI requests processed'
  }),
  
  projectsCreated: new prometheus.Counter({
    name: 'devmentor_projects_created_total',
    help: 'Total projects created'
  }),
  
  // Performance metrics
  apiLatency: new prometheus.Histogram({
    name: 'devmentor_api_latency_seconds',
    help: 'API endpoint latency',
    labelNames: ['method', 'endpoint', 'status']
  }),
  
  // Resource metrics
  memoryUsage: new prometheus.Gauge({
    name: 'devmentor_memory_usage_bytes',
    help: 'Memory usage in bytes',
    labelNames: ['service']
  })
};
```

## Logging Architecture

### Centralized Logging with ELK Stack

```javascript
// Winston transport for Elasticsearch
const { ElasticsearchTransport } = require('winston-elasticsearch');

const esTransport = new ElasticsearchTransport({
  level: 'info',
  clientOpts: {
    node: 'http://localhost:9200',
    auth: {
      username: 'elastic',
      password: process.env.ELASTIC_PASSWORD
    }
  },
  index: 'devmentor-logs',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

// Structured logging
logger.info('Service health check', {
  service: 'auth',
  status: 'healthy',
  responseTime: 45,
  metadata: {
    version: '1.0.0',
    environment: 'production'
  }
});
```

### Log Aggregation Pipeline

```
Services → Filebeat → Logstash → Elasticsearch → Kibana
     ↓                    ↓            ↓            ↓
  Log Files           Processing    Storage    Visualization
```

### Logstash Configuration

```ruby
# logstash.conf
input {
  beats {
    port => 5044
  }
}

filter {
  json {
    source => "message"
  }
  
  date {
    match => [ "timestamp", "ISO8601" ]
  }
  
  mutate {
    add_field => {
      "environment" => "${NODE_ENV:development}"
    }
  }
  
  if [level] == "error" {
    mutate {
      add_tag => [ "alert" ]
    }
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "devmentor-%{+YYYY.MM.dd}"
  }
  
  if "alert" in [tags] {
    email {
      to => "ops@devmentor.ai"
      subject => "Error Alert: %{service}"
      body => "%{message}"
    }
  }
}
```

## Distributed Tracing

### OpenTelemetry Integration (Future)

```javascript
// Tracing setup
const { NodeTracerProvider } = require('@opentelemetry/node');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'monitoring-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  }),
});

const jaegerExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
});

provider.addSpanProcessor(
  new BatchSpanProcessor(jaegerExporter)
);

provider.register();
```

### Trace Context Propagation

```javascript
// Propagate trace context across services
const { context, trace, propagation } = require('@opentelemetry/api');

async function makeServiceCall(serviceName, endpoint) {
  const tracer = trace.getTracer('monitoring-service');
  const span = tracer.startSpan(`call-${serviceName}`);
  
  try {
    const headers = {};
    propagation.inject(context.active(), headers);
    
    const response = await axios.get(endpoint, { headers });
    
    span.setAttributes({
      'http.status_code': response.status,
      'http.url': endpoint,
      'service.name': serviceName
    });
    
    return response.data;
  } catch (error) {
    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR });
    throw error;
  } finally {
    span.end();
  }
}
```

## Alerting and Notification System

### Alert Rules

```yaml
# alerts.yml
groups:
  - name: service_alerts
    interval: 30s
    rules:
      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service {{ $labels.job }} is down"
          description: "{{ $labels.job }} has been down for more than 1 minute"
      
      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage detected"
          description: "Memory usage is above 90% (current: {{ $value }})"
      
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected"
          description: "Error rate is above 5% (current: {{ $value }})"
```

### Notification Channels

```javascript
// Multi-channel notification system
class NotificationManager {
  constructor() {
    this.channels = {
      slack: new SlackNotifier(),
      email: new EmailNotifier(),
      pagerduty: new PagerDutyNotifier(),
      webhook: new WebhookNotifier()
    };
  }
  
  async sendAlert(alert) {
    const channels = this.getChannelsForSeverity(alert.severity);
    
    await Promise.all(
      channels.map(channel => 
        this.channels[channel].send(alert)
      )
    );
  }
  
  getChannelsForSeverity(severity) {
    switch(severity) {
      case 'critical':
        return ['slack', 'email', 'pagerduty'];
      case 'high':
        return ['slack', 'email'];
      case 'medium':
        return ['slack'];
      case 'low':
        return ['webhook'];
      default:
        return ['webhook'];
    }
  }
}
```

## Dashboard Integration

### Grafana Dashboard Configuration

```json
{
  "dashboard": {
    "title": "DevMentor Monitoring Dashboard",
    "panels": [
      {
        "id": 1,
        "title": "Service Health Status",
        "type": "stat",
        "targets": [
          {
            "expr": "up",
            "legendFormat": "{{ job }}"
          }
        ]
      },
      {
        "id": 2,
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{ method }} {{ route }}"
          }
        ]
      },
      {
        "id": 3,
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m])",
            "legendFormat": "{{ service }}"
          }
        ]
      },
      {
        "id": 4,
        "title": "Response Time (p95)",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, http_request_duration_seconds_bucket)",
            "legendFormat": "{{ service }}"
          }
        ]
      }
    ]
  }
}
```

### Custom Dashboard API

```javascript
// API for custom dashboard data
app.get('/api/dashboard/overview', async (req, res) => {
  const data = {
    services: await getServicesStatus(),
    metrics: {
      requests: await getTotalRequests(),
      errors: await getErrorRate(),
      latency: await getAverageLatency()
    },
    incidents: await getActiveIncidents(),
    predictions: await getLatestPredictions(),
    alerts: await getActiveAlerts()
  };
  
  res.json(data);
});
```

## Data Retention and Storage

### Time-Series Data Management

```javascript
// Data retention policies
const retentionPolicies = {
  raw: {
    resolution: '1s',
    retention: '1h'
  },
  aggregated_5m: {
    resolution: '5m',
    retention: '24h'
  },
  aggregated_1h: {
    resolution: '1h',
    retention: '7d'
  },
  aggregated_1d: {
    resolution: '1d',
    retention: '30d'
  }
};

// Automatic data aggregation
async function aggregateMetrics() {
  const rawData = await getMetrics('1s', '-1h');
  
  // 5-minute aggregation
  const aggregated5m = aggregate(rawData, '5m', ['avg', 'max', 'min']);
  await storeMetrics(aggregated5m, 'aggregated_5m');
  
  // Hourly aggregation
  const aggregated1h = aggregate(rawData, '1h', ['avg', 'max', 'min', 'p95']);
  await storeMetrics(aggregated1h, 'aggregated_1h');
  
  // Daily aggregation
  const aggregated1d = aggregate(rawData, '1d', ['avg', 'max', 'min', 'p95', 'p99']);
  await storeMetrics(aggregated1d, 'aggregated_1d');
  
  // Clean up old data
  await cleanupOldData(retentionPolicies);
}
```

## Security and Compliance

### Audit Logging

```javascript
// Audit trail for compliance
class AuditLogger {
  async log(event) {
    const auditEntry = {
      timestamp: new Date(),
      eventType: event.type,
      userId: event.userId,
      service: event.service,
      action: event.action,
      result: event.result,
      metadata: event.metadata,
      ipAddress: event.ipAddress,
      userAgent: event.userAgent
    };
    
    // Store in immutable log
    await this.writeToImmutableLog(auditEntry);
    
    // Send to SIEM if configured
    if (process.env.SIEM_ENABLED) {
      await this.sendToSIEM(auditEntry);
    }
  }
}
```

### Data Privacy

```javascript
// PII data masking
function maskSensitiveData(data) {
  const masked = { ...data };
  
  // Mask email addresses
  if (masked.email) {
    masked.email = masked.email.replace(/(.{2}).*(@.*)/, '$1***$2');
  }
  
  // Mask API keys
  if (masked.apiKey) {
    masked.apiKey = masked.apiKey.substring(0, 8) + '...';
  }
  
  // Remove passwords completely
  delete masked.password;
  
  return masked;
}
```

## Performance Optimization

### Metric Sampling

```javascript
// Adaptive sampling based on load
class AdaptiveSampler {
  constructor() {
    this.sampleRate = 1.0; // Start with 100% sampling
  }
  
  shouldSample() {
    return Math.random() < this.sampleRate;
  }
  
  adjustSampleRate(load) {
    if (load > 80) {
      this.sampleRate = Math.max(0.1, this.sampleRate - 0.1);
    } else if (load < 20) {
      this.sampleRate = Math.min(1.0, this.sampleRate + 0.1);
    }
  }
}
```

### Batch Processing

```javascript
// Batch event processing for efficiency
class EventBatcher {
  constructor(batchSize = 100, flushInterval = 1000) {
    this.batch = [];
    this.batchSize = batchSize;
    this.flushInterval = flushInterval;
    this.startFlushTimer();
  }
  
  add(event) {
    this.batch.push(event);
    if (this.batch.length >= this.batchSize) {
      this.flush();
    }
  }
  
  async flush() {
    if (this.batch.length === 0) return;
    
    const events = [...this.batch];
    this.batch = [];
    
    await this.processBatch(events);
  }
  
  startFlushTimer() {
    setInterval(() => this.flush(), this.flushInterval);
  }
}
```

## Integration Testing

### End-to-End Observability Tests

```javascript
// Test complete observability pipeline
describe('Observability Integration', () => {
  test('Event flows through entire pipeline', async () => {
    // Generate test event
    const testEvent = {
      type: 'test.event',
      service: 'test-service',
      data: { test: true }
    };
    
    // Emit event
    await eventEmitter.emit(testEvent);
    
    // Verify metric was recorded
    const metrics = await getMetrics('test_event_total');
    expect(metrics.value).toBeGreaterThan(0);
    
    // Verify log was created
    const logs = await searchLogs({ service: 'test-service' });
    expect(logs).toContainEqual(expect.objectContaining({
      event_type: 'test.event'
    }));
    
    // Verify trace was created
    const traces = await getTraces({ service: 'test-service' });
    expect(traces.length).toBeGreaterThan(0);
    
    // Verify dashboard updated
    const dashboard = await getDashboardData();
    expect(dashboard.events).toContainEqual(
      expect.objectContaining({ type: 'test.event' })
    );
  });
});
```

## Best Practices

### 1. Structured Data
- Use consistent field names across all services
- Include correlation IDs in all events/logs
- Add metadata for context

### 2. Performance
- Sample high-volume metrics
- Use batch processing for events
- Implement circuit breakers for external calls

### 3. Security
- Mask sensitive data
- Use TLS for all connections
- Implement rate limiting

### 4. Reliability
- Implement retry logic with exponential backoff
- Use dead letter queues for failed events
- Have fallback mechanisms

### 5. Cost Optimization
- Implement data retention policies
- Use appropriate storage tiers
- Aggregate old data

## Conclusion

The monitoring service serves as the central hub for DevMentor's observability stack, integrating:
- **Events** from all services
- **Metrics** via Prometheus
- **Logs** through Winston/ELK
- **Traces** with OpenTelemetry

This comprehensive approach ensures complete visibility into system behavior, enabling proactive issue detection and rapid incident response.

---

**Related Documentation:**
- [Event System](../events/EMITTERS.md)
- [WebSocket Events](../events/WEBSOCKET.md)
- [Learning Events](../events/LEARNING.md)
- [Operations Guide](../operations/DEVMENTOR_OPERATIONS_GUIDE.md)
{% endraw %}
