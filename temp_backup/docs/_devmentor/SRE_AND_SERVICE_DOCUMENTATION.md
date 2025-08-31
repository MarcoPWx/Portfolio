---
layout: product
title: SRE AND SERVICE DOCUMENTATION
product: DevMentor
source: SRE_AND_SERVICE_DOCUMENTATION.md
---

{% raw %}
# 🔧 DevMentor SRE & Service Documentation
## Complete Observability, API Documentation, and Self-Healing Infrastructure

## Overview

This document provides:
1. **API Documentation** - Swagger/OpenAPI for all services
2. **Monitoring Stack** - Prometheus, Grafana, Sentry setup
3. **Service Documentation** - Comprehensive docs for each microservice
4. **Self-Healing** - Automated recovery and scaling
5. **Data Export** - Metrics and log export capabilities

## Part 1: API Documentation (Swagger/OpenAPI)

### 🎯 Centralized API Gateway with Swagger

```yaml
# api-gateway/swagger-config.yaml
openapi: 3.0.0
info:
  title: DevMentor API Gateway
  version: 1.0.0
  description: Central API documentation for all DevMentor services
servers:
  - url: https://api.devmentor.app
    description: Production
  - url: http://localhost:3000
    description: Local Development

paths:
  # Auth Service
  /api/auth/login:
    post:
      tags: [Authentication]
      summary: User login
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
      responses:
        200:
          description: Successful login
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'
  
  # Learning Service
  /api/learning/session:
    post:
      tags: [Learning]
      summary: Start learning session
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LearningSessionRequest'
      responses:
        201:
          description: Session created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LearningSession'
  
  /api/learning/validate:
    post:
      tags: [Learning]
      summary: Validate learning progress using Bloom's Taxonomy
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                userId:
                  type: string
                topic:
                  type: string
                level:
                  type: string
                  enum: [remember, understand, apply, analyze, evaluate, create]
                response:
                  type: object
      responses:
        200:
          description: Validation result
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ValidationResult'
  
  # PBML Service
  /api/pbml/patterns:
    get:
      tags: [PBML]
      summary: Get learned patterns
      security:
        - bearerAuth: []
      parameters:
        - name: userId
          in: query
          schema:
            type: string
        - name: language
          in: query
          schema:
            type: string
      responses:
        200:
          description: Pattern list
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Pattern'
    
    post:
      tags: [PBML]
      summary: Store new pattern
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PatternInput'
      responses:
        201:
          description: Pattern stored
  
  # Repository Analyzer
  /api/repo/analyze:
    post:
      tags: [Repository]
      summary: Analyze repository
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                repoUrl:
                  type: string
                  format: uri
                depth:
                  type: string
                  enum: [quick, standard, deep]
                includeSecurityScan:
                  type: boolean
      responses:
        202:
          description: Analysis started
          content:
            application/json:
              schema:
                type: object
                properties:
                  analysisId:
                    type: string
                  status:
                    type: string
                  estimatedTime:
                    type: integer
  
  # AI Gateway
  /api/ai/complete:
    post:
      tags: [AI]
      summary: AI completion request
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                prompt:
                  type: string
                model:
                  type: string
                  enum: [gpt-3.5-turbo, gpt-4, claude-3]
                maxTokens:
                  type: integer
      responses:
        200:
          description: AI response
          content:
            application/json:
              schema:
                type: object
                properties:
                  completion:
                    type: string
                  usage:
                    type: object

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  
  schemas:
    LoginRequest:
      type: object
      required: [email, password]
      properties:
        email:
          type: string
          format: email
        password:
          type: string
          format: password
    
    AuthResponse:
      type: object
      properties:
        token:
          type: string
        refreshToken:
          type: string
        user:
          $ref: '#/components/schemas/User'
    
    User:
      type: object
      properties:
        id:
          type: string
        email:
          type: string
        name:
          type: string
        roles:
          type: array
          items:
            type: string
    
    LearningSessionRequest:
      type: object
      required: [topic, difficulty]
      properties:
        topic:
          type: string
        difficulty:
          type: string
          enum: [beginner, intermediate, advanced, expert]
        duration:
          type: integer
          description: Duration in minutes
    
    LearningSession:
      type: object
      properties:
        sessionId:
          type: string
        topic:
          type: string
        startTime:
          type: string
          format: date-time
        estimatedDuration:
          type: integer
        currentLevel:
          type: string
        nextSteps:
          type: array
          items:
            type: string
    
    ValidationResult:
      type: object
      properties:
        passed:
          type: boolean
        score:
          type: number
        feedback:
          type: string
        nextLevel:
          type: string
        recommendations:
          type: array
          items:
            type: string
    
    Pattern:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        language:
          type: string
        code:
          type: string
        frequency:
          type: integer
        confidence:
          type: number
    
    PatternInput:
      type: object
      required: [code, language]
      properties:
        code:
          type: string
        language:
          type: string
        context:
          type: object
        metadata:
          type: object
```

### Swagger UI Setup

```typescript
// api-gateway/src/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import yaml from 'yamljs';

const swaggerDocument = yaml.load('./swagger-config.yaml');

// Aggregate swagger from all services
export async function setupSwagger(app: Express) {
  // Collect OpenAPI specs from all services
  const services = [
    { name: 'auth', url: 'http://auth-service:3000/openapi.json' },
    { name: 'learning', url: 'http://learning-service:3001/openapi.json' },
    { name: 'pbml', url: 'http://pbml-service:3005/openapi.json' },
    { name: 'repo', url: 'http://repo-analyzer:3007/openapi.json' }
  ];
  
  for (const service of services) {
    try {
      const response = await fetch(service.url);
      const spec = await response.json();
      
      // Merge paths
      Object.keys(spec.paths).forEach(path => {
        swaggerDocument.paths[`/${service.name}${path}`] = spec.paths[path];
      });
      
      // Merge schemas
      Object.assign(swaggerDocument.components.schemas, spec.components?.schemas || {});
    } catch (error) {
      console.warn(`Could not fetch OpenAPI spec from ${service.name}`);
    }
  }
  
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "DevMentor API Documentation",
    customfavIcon: "/favicon.ico"
  }));
  
  // Serve OpenAPI spec
  app.get('/openapi.json', (req, res) => {
    res.json(swaggerDocument);
  });
  
  console.log('📚 Swagger UI available at http://localhost:3000/api-docs');
}
```

## Part 2: Monitoring Stack (Prometheus + Grafana + Sentry)

### 📊 Prometheus Configuration

```yaml
# monitoring/prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s
  external_labels:
    cluster: 'devmentor-prod'
    environment: 'production'

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']

# Rule files
rule_files:
  - '/etc/prometheus/alerts/*.yml'

# Service discovery and scraping
scrape_configs:
  # Kubernetes service discovery
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
        target_label: __address__
  
  # DevMentor services
  - job_name: 'learning-service'
    static_configs:
      - targets: ['learning-service:3001']
    metrics_path: '/metrics'
  
  - job_name: 'pbml-service'
    static_configs:
      - targets: ['pbml-service:3005']
    metrics_path: '/metrics'
  
  - job_name: 'repo-analyzer'
    static_configs:
      - targets: ['repo-analyzer:3007']
    metrics_path: '/metrics'
  
  - job_name: 'ai-gateway'
    static_configs:
      - targets: ['ai-gateway:3003']
    metrics_path: '/metrics'
  
  # Database metrics
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']
  
  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']
  
  # Node metrics
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
```

### Alert Rules

```yaml
# monitoring/prometheus/alerts/devmentor-alerts.yml
groups:
  - name: devmentor_alerts
    interval: 30s
    rules:
      # Service availability
      - alert: ServiceDown
        expr: up{job=~"learning-service|pbml-service|repo-analyzer|ai-gateway"} == 0
        for: 2m
        labels:
          severity: critical
          team: backend
        annotations:
          summary: "Service {{ $labels.job }} is down"
          description: "{{ $labels.job }} has been down for more than 2 minutes"
      
      # High error rate
      - alert: HighErrorRate
        expr: |
          rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate on {{ $labels.service }}"
          description: "Error rate is {{ $value | humanizePercentage }} over last 5 minutes"
      
      # Response time
      - alert: HighResponseTime
        expr: |
          histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High response time on {{ $labels.service }}"
          description: "95th percentile response time is {{ $value }}s"
      
      # Database
      - alert: DatabaseConnectionPoolExhausted
        expr: |
          pg_stat_database_numbackends / pg_settings_max_connections > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Database connection pool nearly exhausted"
          description: "{{ $value | humanizePercentage }} of connections in use"
      
      # Memory usage
      - alert: HighMemoryUsage
        expr: |
          container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage in {{ $labels.pod }}"
          description: "Memory usage is at {{ $value | humanizePercentage }}"
      
      # Learning algorithm specific
      - alert: LearningAlgorithmFailure
        expr: |
          increase(learning_algorithm_errors_total[5m]) > 10
        for: 5m
        labels:
          severity: warning
          team: ml
        annotations:
          summary: "Learning algorithm experiencing failures"
          description: "{{ $value }} failures in the last 5 minutes"
      
      # PBML pattern storage
      - alert: PatternStorageLatency
        expr: |
          histogram_quantile(0.99, rate(pbml_pattern_storage_duration_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High pattern storage latency"
          description: "99th percentile storage time is {{ $value }}s"
```

### 📈 Grafana Dashboards

```json
// monitoring/grafana/dashboards/devmentor-overview.json
{
  "dashboard": {
    "title": "DevMentor Overview",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total[5m])) by (service)",
            "legendFormat": "{{ service }}"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "sum(rate(http_requests_total{status=~\"5..\"}[5m])) by (service)",
            "legendFormat": "{{ service }}"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Response Time (p95)",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) by (service)",
            "legendFormat": "{{ service }}"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Learning Sessions Active",
        "targets": [
          {
            "expr": "learning_sessions_active",
            "legendFormat": "Active Sessions"
          }
        ],
        "type": "stat"
      },
      {
        "title": "Patterns Learned Today",
        "targets": [
          {
            "expr": "increase(pbml_patterns_stored_total[24h])",
            "legendFormat": "Patterns"
          }
        ],
        "type": "stat"
      },
      {
        "title": "Repository Analyses",
        "targets": [
          {
            "expr": "increase(repo_analyses_completed_total[24h])",
            "legendFormat": "Analyses"
          }
        ],
        "type": "stat"
      }
    ]
  }
}
```

### 🐛 Sentry Integration

```typescript
// shared/sentry-config.ts
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

export function initSentry(serviceName: string) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: 1.0,
    beforeSend(event, hint) {
      // Filter out sensitive data
      if (event.request?.cookies) {
        delete event.request.cookies;
      }
      if (event.request?.headers?.authorization) {
        event.request.headers.authorization = '[REDACTED]';
      }
      return event;
    },
    beforeSendTransaction(event) {
      // Add service name to all transactions
      event.tags = {
        ...event.tags,
        service: serviceName
      };
      return event;
    }
  });

  // Capture unhandled rejections
  process.on('unhandledRejection', (error) => {
    Sentry.captureException(error);
  });

  process.on('uncaughtException', (error) => {
    Sentry.captureException(error);
    process.exit(1);
  });
}

// Error handler middleware
export const sentryErrorHandler = Sentry.Handlers.errorHandler({
  shouldHandleError(error) {
    // Capture 4xx and 5xx errors
    if (error.status >= 400) {
      return true;
    }
    return false;
  }
});
```

## Part 3: Service Documentation

### 📚 Learning Service Documentation

```markdown
# Learning Service

## Overview
The Learning Service implements adaptive learning algorithms based on Bloom's Taxonomy and tracks user progress through personalized learning paths.

## Architecture
- **Port**: 3001
- **Database**: PostgreSQL (learning schema)
- **Cache**: Redis
- **Dependencies**: AI Gateway, PBML Service

## API Endpoints

### POST /api/learning/session
Start a new learning session
- **Auth**: Required
- **Body**: `{ topic, difficulty, duration }`
- **Response**: `{ sessionId, currentLevel, nextSteps }`

### POST /api/learning/validate
Validate learning progress using Bloom's Taxonomy
- **Auth**: Required
- **Body**: `{ userId, topic, level, response }`
- **Response**: `{ passed, score, feedback, nextLevel }`

### GET /api/learning/progress/:userId
Get user learning progress
- **Auth**: Required
- **Response**: `{ completedTopics, currentLevel, recommendations }`

## Algorithms

### Bloom's Taxonomy Validator
```typescript
class BloomsTaxonomyValidator {
  levels = ['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create'];
  
  validateLevel(response, expectedLevel) {
    // Implementation details in services/learning-service/
  }
}
```

### Adaptive Learning Engine
- Adjusts difficulty based on performance
- Suggests personalized learning paths
- Tracks skill progression over time

## Metrics
- `learning_sessions_active`: Current active sessions
- `learning_validations_total`: Total validations performed
- `learning_progress_score`: Average user progress score

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `AI_GATEWAY_URL`: AI Gateway service URL
- `JWT_SECRET`: JWT validation secret
```

### 📚 PBML Service Documentation

```markdown
# PBML (Pattern-Based Machine Learning) Service

## Overview
PBML Service discovers, stores, and retrieves coding patterns from user repositories and interactions.

## Architecture
- **Port**: 3005
- **Vector DB**: Qdrant
- **Cache**: Redis
- **Storage**: PostgreSQL (patterns schema)

## API Endpoints

### POST /api/pbml/patterns
Store a new pattern
- **Auth**: Required
- **Body**: `{ code, language, context, metadata }`
- **Response**: `{ patternId, similarity }`

### GET /api/pbml/patterns
Retrieve patterns
- **Auth**: Required
- **Query**: `userId, language, limit`
- **Response**: `[{ id, name, code, frequency, confidence }]`

### POST /api/pbml/search
Search similar patterns
- **Auth**: Required
- **Body**: `{ code, threshold }`
- **Response**: `[{ pattern, similarity }]`

## Pattern Recognition Algorithm
```python
def extract_patterns(code):
    ast = parse(code)
    patterns = []
    
    for node in walk(ast):
        if is_pattern(node):
            pattern = {
                'type': node.type,
                'structure': extract_structure(node),
                'vector': encode_to_vector(node)
            }
            patterns.append(pattern)
    
    return patterns
```

## Metrics
- `pbml_patterns_stored_total`: Total patterns stored
- `pbml_pattern_matches_total`: Pattern matches found
- `pbml_vector_search_duration`: Vector search latency

## Environment Variables
- `QDRANT_URL`: Qdrant vector database URL
- `QDRANT_API_KEY`: Qdrant API key
- `REDIS_URL`: Redis cache URL
```

### 📚 Repository Analyzer Documentation

```markdown
# Repository Analyzer Service

## Overview
Analyzes Git repositories for code quality, security issues, and architectural patterns.

## Architecture
- **Port**: 3007
- **Queue**: Redis Bull
- **Storage**: PostgreSQL (analyses schema)
- **Dependencies**: AI Gateway, PBML Service

## API Endpoints

### POST /api/repo/analyze
Start repository analysis
- **Auth**: Required
- **Body**: `{ repoUrl, depth, includeSecurityScan }`
- **Response**: `{ analysisId, status, estimatedTime }`

### GET /api/repo/analysis/:id
Get analysis results
- **Auth**: Required
- **Response**: Complete analysis object

### GET /api/repo/status/:id
Get analysis status
- **Auth**: Required
- **Response**: `{ status, progress, currentStep }`

## Analysis Pipeline
1. Clone repository
2. Detect languages and frameworks
3. Analyze code structure
4. Run security scans
5. Extract patterns
6. Generate insights
7. Store results

## Security Scanning
- Dependency vulnerabilities (npm audit, pip-audit)
- Secret detection (gitleaks)
- SAST analysis (semgrep)

## Metrics
- `repo_analyses_total`: Total analyses performed
- `repo_analysis_duration`: Analysis duration
- `repo_security_issues_found`: Security issues detected
```

## Part 4: Self-Healing Infrastructure

### 🔄 Auto-Recovery Configuration

```yaml
# k8s/self-healing.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: self-healing-config
  namespace: devmentor
data:
  config.yaml: |
    rules:
      - name: restart-on-memory-leak
        condition: memory_usage > 90%
        duration: 5m
        action: restart
        
      - name: scale-on-high-load
        condition: cpu_usage > 80%
        duration: 3m
        action: scale
        params:
          min: 2
          max: 10
          
      - name: circuit-breaker
        condition: error_rate > 10%
        duration: 1m
        action: circuit-break
        params:
          timeout: 30s
          
      - name: database-failover
        condition: database_unreachable
        duration: 30s
        action: failover
        params:
          target: replica
```

```typescript
// self-healing/controller.ts
export class SelfHealingController {
  private rules: HealingRule[];
  private prometheus: PrometheusClient;
  
  async monitor() {
    setInterval(async () => {
      for (const rule of this.rules) {
        const triggered = await this.checkCondition(rule);
        
        if (triggered) {
          await this.executeAction(rule);
        }
      }
    }, 10000); // Check every 10 seconds
  }
  
  private async checkCondition(rule: HealingRule): Promise<boolean> {
    const query = this.buildPrometheusQuery(rule.condition);
    const result = await this.prometheus.query(query);
    
    return this.evaluateResult(result, rule);
  }
  
  private async executeAction(rule: HealingRule) {
    console.log(`Executing self-healing action: ${rule.name}`);
    
    switch (rule.action) {
      case 'restart':
        await this.restartService(rule.target);
        break;
        
      case 'scale':
        await this.scaleService(rule.target, rule.params);
        break;
        
      case 'circuit-break':
        await this.enableCircuitBreaker(rule.target);
        break;
        
      case 'failover':
        await this.performFailover(rule.target);
        break;
    }
    
    // Send notification
    await this.notifyTeam(rule);
  }
  
  private async restartService(service: string) {
    const k8s = new KubernetesClient();
    await k8s.rolloutRestart(`deployment/${service}`);
  }
  
  private async scaleService(service: string, params: any) {
    const currentReplicas = await this.getCurrentReplicas(service);
    const targetReplicas = Math.min(
      params.max,
      Math.max(params.min, currentReplicas + 2)
    );
    
    await this.k8s.scale(`deployment/${service}`, targetReplicas);
  }
}
```

## Part 5: Data Export Capabilities

### 📊 Metrics Export

```typescript
// export/metrics-exporter.ts
export class MetricsExporter {
  async exportToS3(timeRange: TimeRange) {
    const metrics = await this.prometheus.queryRange({
      query: 'up',
      start: timeRange.start,
      end: timeRange.end,
      step: '1m'
    });
    
    const csv = this.convertToCSV(metrics);
    const filename = `metrics-${Date.now()}.csv`;
    
    await this.s3.upload({
      Bucket: 'devmentor-exports',
      Key: `metrics/${filename}`,
      Body: csv,
      ContentType: 'text/csv'
    });
    
    return `s3://devmentor-exports/metrics/${filename}`;
  }
  
  async exportToGoogleSheets(spreadsheetId: string) {
    const metrics = await this.collectCurrentMetrics();
    
    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Metrics!A1',
      valueInputOption: 'RAW',
      resource: {
        values: metrics
      }
    });
  }
  
  async generateReport(): Promise<Report> {
    const data = {
      summary: await this.getSummaryMetrics(),
      services: await this.getServiceMetrics(),
      errors: await this.getErrorMetrics(),
      performance: await this.getPerformanceMetrics()
    };
    
    return {
      timestamp: new Date(),
      period: 'daily',
      data
    };
  }
}
```

### 📝 Log Export

```typescript
// export/log-exporter.ts
export class LogExporter {
  async exportLogs(filter: LogFilter) {
    const logs = await this.loki.query({
      query: filter.query || '{job="devmentor"}',
      start: filter.start,
      end: filter.end,
      limit: filter.limit || 10000
    });
    
    // Export formats
    const formats = {
      json: () => JSON.stringify(logs, null, 2),
      csv: () => this.convertToCSV(logs),
      elasticsearch: () => this.convertToElasticsearch(logs)
    };
    
    const formatted = formats[filter.format]();
    
    // Upload to storage
    const url = await this.uploadToStorage(formatted, filter.format);
    
    return {
      url,
      count: logs.length,
      size: formatted.length,
      format: filter.format
    };
  }
}
```

## Part 6: Complete Monitoring Stack Deployment

### 🚀 Docker Compose for Monitoring

```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./monitoring/prometheus:/etc/prometheus
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/usr/share/prometheus/console_libraries'
      - '--web.console.templates=/usr/share/prometheus/consoles'
      - '--web.enable-lifecycle'
    ports:
      - "9090:9090"
    networks:
      - devmentor

  grafana:
    image: grafana/grafana:latest
    volumes:
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning
      - grafana-data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD:-admin}
      - GF_INSTALL_PLUGINS=redis-datasource,redis-app
    ports:
      - "3000:3000"
    networks:
      - devmentor

  alertmanager:
    image: prom/alertmanager:latest
    volumes:
      - ./monitoring/alertmanager:/etc/alertmanager
    command:
      - '--config.file=/etc/alertmanager/config.yml'
      - '--storage.path=/alertmanager'
    ports:
      - "9093:9093"
    networks:
      - devmentor

  node-exporter:
    image: prom/node-exporter:latest
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    ports:
      - "9100:9100"
    networks:
      - devmentor

  postgres-exporter:
    image: prometheuscommunity/postgres-exporter
    environment:
      DATA_SOURCE_NAME: "postgresql://user:password@postgres:5432/devmentor?sslmode=disable"
    ports:
      - "9187:9187"
    networks:
      - devmentor

  redis-exporter:
    image: oliver006/redis_exporter
    environment:
      REDIS_ADDR: "redis:6379"
    ports:
      - "9121:9121"
    networks:
      - devmentor

  loki:
    image: grafana/loki:latest
    volumes:
      - ./monitoring/loki:/etc/loki
      - loki-data:/loki
    command: -config.file=/etc/loki/local-config.yaml
    ports:
      - "3100:3100"
    networks:
      - devmentor

  promtail:
    image: grafana/promtail:latest
    volumes:
      - ./monitoring/promtail:/etc/promtail
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    command: -config.file=/etc/promtail/config.yml
    networks:
      - devmentor

volumes:
  prometheus-data:
  grafana-data:
  loki-data:

networks:
  devmentor:
    external: true
```

## Part 7: Service Health Dashboard

```typescript
// admin-dashboard/src/app/dashboard/health/page.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, Title, Badge, Grid, BarList } from '@tremor/react';

export default function ServiceHealthPage() {
  const { data: services } = useQuery({
    queryKey: ['service-health'],
    queryFn: async () => {
      const response = await fetch('/api/admin/health/services');
      return response.json();
    },
    refetchInterval: 5000
  });

  const { data: metrics } = useQuery({
    queryKey: ['service-metrics'],
    queryFn: async () => {
      const response = await fetch('/api/admin/metrics/current');
      return response.json();
    },
    refetchInterval: 10000
  });

  return (
    <div className="space-y-6">
      <Title>Service Health Dashboard</Title>
      
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
        {services?.map((service: any) => (
          <Card key={service.name}>
            <div className="flex justify-between items-start">
              <div>
                <Text>{service.name}</Text>
                <Metric>{service.uptime}%</Metric>
              </div>
              <Badge color={service.status === 'healthy' ? 'green' : 'red'}>
                {service.status}
              </Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU</span>
                <span>{service.cpu}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Memory</span>
                <span>{service.memory}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Requests/s</span>
                <span>{service.rps}</span>
              </div>
            </div>
          </Card>
        ))}
      </Grid>

      {/* API Documentation Links */}
      <Card>
        <Title>API Documentation</Title>
        <div className="mt-4 space-y-2">
          <a href="/api-docs" target="_blank" className="text-blue-600 hover:underline">
            📚 Swagger UI - Interactive API Documentation
          </a>
          <a href="/openapi.json" target="_blank" className="text-blue-600 hover:underline">
            📄 OpenAPI Specification (JSON)
          </a>
        </div>
      </Card>

      {/* Monitoring Links */}
      <Card>
        <Title>Monitoring Dashboards</Title>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <a href="http://localhost:3000" target="_blank" className="p-4 border rounded hover:bg-gray-50">
            <div className="font-semibold">Grafana</div>
            <div className="text-sm text-gray-500">Metrics & Dashboards</div>
          </a>
          <a href="http://localhost:9090" target="_blank" className="p-4 border rounded hover:bg-gray-50">
            <div className="font-semibold">Prometheus</div>
            <div className="text-sm text-gray-500">Metrics Database</div>
          </a>
          <a href={process.env.NEXT_PUBLIC_SENTRY_URL} target="_blank" className="p-4 border rounded hover:bg-gray-50">
            <div className="font-semibold">Sentry</div>
            <div className="text-sm text-gray-500">Error Tracking</div>
          </a>
          <a href="http://localhost:8089" target="_blank" className="p-4 border rounded hover:bg-gray-50">
            <div className="font-semibold">Locust</div>
            <div className="text-sm text-gray-500">Load Testing</div>
          </a>
        </div>
      </Card>
    </div>
  );
}
```

## 🎯 Quick Setup Guide

### 1. Start Monitoring Stack
```bash
# Start all monitoring services
docker-compose -f docker-compose.monitoring.yml up -d

# Verify services are running
curl http://localhost:9090/-/healthy  # Prometheus
curl http://localhost:3000/api/health # Grafana
```

### 2. Configure Sentry
```bash
# Install Sentry CLI
npm install -g @sentry/cli

# Create project
sentry-cli projects create devmentor

# Get DSN
sentry-cli projects list

# Add to .env
echo "SENTRY_DSN=your-dsn-here" >> .env
```

### 3. Access Dashboards
- **Swagger UI**: http://localhost:3000/api-docs
- **Grafana**: http://localhost:3000 (admin/admin)
- **Prometheus**: http://localhost:9090
- **AlertManager**: http://localhost:9093
- **Sentry**: https://sentry.io/organizations/your-org

### 4. Import Grafana Dashboards
```bash
# Import dashboards via API
curl -X POST http://admin:admin@localhost:3000/api/dashboards/db \
  -H "Content-Type: application/json" \
  -d @monitoring/grafana/dashboards/devmentor-overview.json
```

## 📊 What We Monitor

### Service Metrics
- Request rate, error rate, latency (RED metrics)
- CPU, memory, disk usage
- Database connections and query performance
- Cache hit rates
- Queue lengths and processing times

### Business Metrics
- Active learning sessions
- Patterns discovered
- Repositories analyzed
- User engagement
- Feature flag adoption

### Infrastructure Metrics
- Node health
- Container resource usage
- Network latency
- Disk I/O
- Service dependencies

## 🔔 Alert Channels

Configure in `monitoring/alertmanager/config.yml`:
```yaml
receivers:
  - name: 'devops-team'
    email_configs:
      - to: 'devops@devmentor.app'
    slack_configs:
      - api_url: '${SLACK_WEBHOOK_URL}'
        channel: '#alerts'
    pagerduty_configs:
      - service_key: '${PAGERDUTY_KEY}'
```

## Summary

We now have:

✅ **Complete API Documentation** - Swagger/OpenAPI for all services
✅ **Full Monitoring Stack** - Prometheus + Grafana + Sentry
✅ **Service Documentation** - Comprehensive docs for each microservice
✅ **Self-Healing Infrastructure** - Automated recovery and scaling
✅ **Data Export Capabilities** - Export metrics and logs to various formats
✅ **Service Health Dashboard** - Real-time monitoring in admin panel
✅ **Alert Configuration** - Proactive monitoring with notifications

This provides enterprise-grade observability and documentation for DevMentor!

---

**Next Steps**:
1. Deploy monitoring stack with Docker Compose
2. Configure Sentry for error tracking
3. Import Grafana dashboards
4. Set up alert channels
5. Test self-healing rules
{% endraw %}
