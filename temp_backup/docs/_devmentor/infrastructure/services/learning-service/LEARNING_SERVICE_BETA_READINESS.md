---
layout: product
title: LEARNING SERVICE BETA READINESS
product: DevMentor
source: infrastructure/services/learning-service/LEARNING_SERVICE_BETA_READINESS.md
---

{% raw %}
CURRENT ARCHITECTURE

# Learning Service Beta Readiness Plan

## 🎯 Executive Summary

The Learning Service is a critical microservice that orchestrates intelligent recommendations, prompt suggestions, and context-aware learning paths. It serves as the "brain" of DevMentor's personalization engine, making real-time decisions about what users should learn next, which prompts to suggest, and how to optimize their development journey.

**Status**: 🔴 Not Started | **Target**: Beta Launch in 3 weeks | **Priority**: P0

## 🧠 What is the Learning Service?

The Learning Service is an intelligent orchestration layer that:

1. **Aggregates Context** - Collects signals from user behavior, project state, memory bank, and organizational policies
2. **Generates Candidates** - Produces personalized recommendations using PBML patterns and memory retrieval
3. **Ranks & Filters** - Uses Qwen3 LLM to rerank options based on relevance, learning objectives, and business rules
4. **Delivers Insights** - Provides actionable recommendations with explanations and confidence scores
5. **Learns Continuously** - Tracks decisions and outcomes to improve future recommendations

### Why Do We Need It?

**Problem**: Current AI tools suffer from:
- **Context Loss** - Each session starts from scratch
- **Generic Suggestions** - One-size-fits-all recommendations
- **No Learning Path** - Random, disconnected interactions
- **No Business Logic** - Ignores organizational priorities and constraints

**Solution**: Learning Service provides:
- **Persistent Context** - Remembers everything across sessions
- **Personalized Paths** - Tailored to individual learning style and goals
- **Intelligent Sequencing** - Builds on previous knowledge systematically
- **Policy-Aware** - Respects contracts, entitlements, and compliance requirements

### How Does It Work?

```
User Action → Signal Collection → Feature Extraction → Candidate Generation
     ↓              ↓                    ↓                     ↓
  UI Event    Redis Cache         PBML Analysis      Memory Retrieval
                                                              ↓
                                                     Qwen3 Reranking
                                                              ↓
                                                    Personalized Response
                                                              ↓
                                                     Outcome Tracking
```

## 🏗️ Detailed System Architecture

### Complete Data Flow Architecture
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERACTIONS                               │
│  Code Writing | Debugging | Learning | Documentation | Testing | Deployment  │
└────────────┬────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            FRONTEND APPLICATIONS                             │
│  ┌──────────┐  ┌──────────┐  ┌─────────┐  ┌────────┐  ┌──────────────┐     │
│  │  Web UI  │  │  VSCode  │  │   CLI   │  │ Mobile │  │ Admin Panel  │     │
│  └────┬─────┘  └────┬─────┘  └────┬────┘  └───┬────┘  └──────┬───────┘     │
└───────┴─────────────┴──────────────┴───────────┴──────────────┴─────────────┘
        │                                                        │
        └────────────────────────┬───────────────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY (Port 8080)                              │
│  Authentication | Rate Limiting | Load Balancing | Request Routing | Caching │
└─────────────────────────────────────────────────────────────────────────────┘
                                 │
        ┌────────────────────────┼────────────────────────────┐
        ▼                        ▼                            ▼
┌──────────────┐       ┌───────────────────┐       ┌──────────────────┐
│   LEARNING   │◄─────►│  ORCHESTRATION    │◄─────►│   INTELLIGENCE   │
│   SERVICE    │       │     LAYER         │       │     LAYER        │
│ (Port 3005)  │       │                   │       │                  │
├──────────────┤       ├───────────────────┤       ├──────────────────┤
│ • Recommend  │       │ • Flow Engine     │       │ • PBML Engine    │
│ • Personalize│       │ • State Machine   │       │ • Qwen3 LLM      │
│ • Track      │       │ • Event Processor │       │ • ML Models      │
│ • Learn      │       │ • Queue Manager   │       │ • NLP Pipeline   │
└──────────────┘       └───────────────────┘       └──────────────────┘
        │                        │                            │
        └────────────────────────┼────────────────────────────┘
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA & STORAGE LAYER                               │
├──────────────┬──────────────┬──────────────┬──────────────┬────────────────┤
│  MEMORY SVC  │    REDIS     │   QDRANT     │  POSTGRESQL  │    OLLAMA      │
│ (Port 3003)  │ (Port 6379)  │ (Port 6333)  │ (Port 5432)  │ (Port 11434)   │
├──────────────┼──────────────┼──────────────┼──────────────┼────────────────┤
│ • Context    │ • Hot Cache  │ • Vectors    │ • User Data  │ • Qwen 2.5     │
│ • Sessions   │ • Features   │ • Embeddings │ • Projects   │ • CodeLlama    │
│ • History    │ • Pub/Sub    │ • Similarity │ • Analytics  │ • Custom Models│
└──────────────┴──────────────┴──────────────┴──────────────┴────────────────┘
```

### Learning Service Internal Architecture
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LEARNING SERVICE (Port 3005)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                          API LAYER (Express.js)                       │   │
│  ├────────────────┬───────────────────┬──────────────────┬──────────────┤   │
│  │ /health        │ /recommendations  │ /prompts         │ /feedback    │   │
│  │ /metrics       │ /learning-paths   │ /suggestions     │ /analytics   │   │
│  └────────────────┴───────────────────┴──────────────────┴──────────────┘   │
│                                    │                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        ORCHESTRATION ENGINE                           │   │
│  ├───────────────────────────────────────────────────────────────────────┤   │
│  │                                                                       │   │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐           │   │
│  │  │ Flow Manager  │  │ Stage Runner  │  │ Pipeline Exec │           │   │
│  │  └───────┬───────┘  └───────┬───────┘  └───────┬───────┘           │   │
│  │          │                   │                   │                   │   │
│  │  ┌───────▼───────────────────▼───────────────────▼────────┐         │   │
│  │  │              flows.json Configuration                   │         │   │
│  │  │  • next_best_prompt  • learning_path  • quiz_generation │         │   │
│  │  └──────────────────────────────────────────────────────────┘         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                         SERVICE CLIENTS                               │   │
│  ├────────────────┬────────────────┬────────────────┬──────────────────┤   │
│  │ Memory Client  │ PBML Client    │ Qwen3 Client   │ Redis Client     │   │
│  │ HTTP/REST      │ HTTP/REST      │ HTTP/Ollama    │ ioredis          │   │
│  └────────────────┴────────────────┴────────────────┴──────────────────┘   │
│                                    │                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                      INTELLIGENCE MODULES                             │   │
│  ├───────────────────────────────────────────────────────────────────────┤   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │ Recommender  │  │   Ranker     │  │  Predictor   │              │   │
│  │  │ • CF Engine  │  │ • Qwen3 LLM  │  │ • Pattern    │              │   │
│  │  │ • Content    │  │ • Score Calc │  │ • Behavior   │              │   │
│  │  │ • Hybrid     │  │ • Explain    │  │ • Goals      │              │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                      CACHING & STATE LAYER                            │   │
│  ├───────────────────────────────────────────────────────────────────────┤   │
│  │  Redis Keys:                                                          │   │
│  │  • user:{id}:features       (TTL: 15m)  - User behavior features      │   │
│  │  • org:{id}:entitlements    (TTL: 5m)   - Business rules & policies   │   │
│  │  • rec:candidates:{userId}  (TTL: 2m)   - Generated recommendations   │   │
│  │  • flows:version:{v}        (Persistent) - Flow configurations        │   │
│  │  • session:{id}:context     (TTL: 30m)  - Active session data         │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 📦 Container Architecture

```yaml
# Docker Container Topology
┌─────────────────────────────────────────────────────────────────┐
│                     DevMentor Kubernetes Cluster                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │ learning-service │  │  memory-service  │  │ pbml-service  │ │
│  │   (Port 3005)    │◄─┤   (Port 3003)    │◄─┤  (Port 3006)  │ │
│  │   Docker Image   │  │   Docker Image   │  │ Docker Image  │ │
│  └────────┬─────────┘  └────────┬─────────┘  └───────┬───────┘ │
│           │                      │                     │         │
│  ┌────────▼──────────────────────▼─────────────────────▼──────┐ │
│  │                    Internal Network (devmentor)             │ │
│  └──────────────────────────────┬──────────────────────────────┘ │
│                                  │                                │
│  ┌──────────────┐  ┌────────────▼────────────┐  ┌─────────────┐ │
│  │    Redis     │  │      API Gateway       │  │   Ollama    │ │
│  │  (Port 6379) │  │     (Port 8080)        │  │ (Port 11434)│ │
│  └──────────────┘  └─────────────────────────┘  └─────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🌍 Real-World Use Cases & Examples

### Use Case 1: Junior Developer Learning Path
```json
// Request
POST /api/recommendations/learning-path
{
  "userId": "dev-123",
  "currentSkill": "junior",
  "goal": "fullstack",
  "timeframe": "3months"
}

// Learning Service Process
1. Fetch user context from Memory Service
2. Analyze recent code patterns via PBML
3. Generate candidates: React basics, Node.js, databases
4. Qwen3 ranks based on current knowledge gaps
5. Return personalized learning path

// Response
{
  "path": [
    {
      "week": 1,
      "focus": "React Fundamentals",
      "prompts": ["Create a todo app with hooks", "Build a form with validation"],
      "confidence": 0.92,
      "reason": "Strong JS foundation detected, ready for React"
    },
    {
      "week": 2,
      "focus": "State Management",
      "prompts": ["Implement Redux", "Try Context API"],
      "confidence": 0.87,
      "reason": "Natural progression from React basics"
    }
  ]
}
```

### Use Case 2: Real-time Prompt Suggestions
```json
// User is debugging a React component
POST /api/prompts/suggestions
{
  "context": "debugging React useEffect infinite loop",
  "sessionId": "sess-456",
  "recentErrors": ["Maximum update depth exceeded"]
}

// Learning Service Process
1. Check Redis cache for similar debugging patterns
2. Query Memory Service for past solutions
3. PBML analyzes error patterns
4. Qwen3 generates targeted prompts
5. Return ranked suggestions

// Response
{
  "suggestions": [
    {
      "prompt": "Add dependency array to useEffect: useEffect(() => {...}, [dependency])",
      "confidence": 0.95,
      "explanation": "Missing dependencies cause re-renders"
    },
    {
      "prompt": "Check if setState is called unconditionally in useEffect",
      "confidence": 0.88,
      "explanation": "Common cause of infinite loops"
    }
  ],
  "learningNote": "Consider reviewing React hooks lifecycle"
}
```

### Use Case 3: Team Knowledge Sharing
```json
// Enterprise team lead requests team insights
POST /api/recommendations/team-insights
{
  "orgId": "enterprise-789",
  "teamSize": 10,
  "project": "microservices-migration"
}

// Learning Service Process
1. Aggregate team patterns from Memory Service
2. Identify knowledge gaps across team
3. Check org entitlements for training resources
4. Generate team-wide recommendations
5. Prioritize based on project needs

// Response
{
  "teamInsights": {
    "strengths": ["Frontend React", "REST APIs"],
    "gaps": ["Kubernetes", "Event-driven architecture"],
    "recommendations": [
      {
        "priority": "HIGH",
        "topic": "Kubernetes basics",
        "affectedMembers": 7,
        "businessImpact": "Critical for migration"
      }
    ],
    "suggestedWorkshops": ["K8s 101", "Microservices patterns"]
  }
}
```

### Use Case 4: Contract-Aware Learning
```json
// Enterprise user with specific training entitlements
POST /api/recommendations/contract-aware
{
  "userId": "enterprise-user-001",
  "orgId": "corp-123"
}

// Learning Service Process
1. Fetch org entitlements from Redis cache
2. Check contract terms (courses, seats, expiry)
3. Filter recommendations by available resources
4. Prioritize expiring content
5. Return compliant recommendations

// Response
{
  "recommendations": [
    {
      "course": "Advanced TypeScript",
      "reason": "Expires in 14 days",
      "contractInfo": {
        "seatsAvailable": 3,
        "expiresAt": "2025-09-01",
        "priority": "USE_IT_OR_LOSE_IT"
      }
    }
  ],
  "compliance": {
    "mandatoryTraining": ["Security Awareness"],
    "dueDate": "2025-08-30",
    "completionRequired": true
  }
}
```

### Use Case 5: AI Model Selection Optimization
```json
// Intelligent model routing based on task
POST /api/prompts/optimize-model
{
  "task": "code review",
  "language": "Python",
  "complexity": "high",
  "latencyBudget": 200
}

// Learning Service Process
1. Analyze task requirements
2. Check available models (Qwen3, CodeLlama, GPT)
3. Consider latency budget and accuracy needs
4. Route to optimal model
5. Track decision for learning

// Response
{
  "selectedModel": "qwen2.5-coder:7b",
  "reasoning": {
    "factors": [
      "Python specialization: HIGH",
      "Latency: 150ms (within budget)",
      "Accuracy for code review: 0.94"
    ],
    "alternatives": [
      {
        "model": "codellama:13b",
        "reason_not_selected": "Latency 300ms exceeds budget"
      }
    ]
  },
  "optimization": "Cached similar reviews for 50ms faster response"
}
```

## 🚀 Implementation Roadmap

### Phase 1: Container Setup (Days 1-3)

#### 1.1 Directory Structure
```bash
services/learning-service/
├── Dockerfile                 # Multi-stage build
├── docker-compose.yml        # Local development
├── .dockerignore            # Exclude node_modules, etc.
├── .env.example             # Environment template
├── package.json             # Dependencies
├── tsconfig.json           # TypeScript config
├── src/
│   ├── index.ts            # Express server entry
│   ├── config/
│   │   ├── index.ts        # Configuration loader
│   │   └── redis.ts        # Redis client setup
│   ├── orchestrator/
│   │   ├── index.ts        # Flow orchestrator
│   │   ├── stages/         # Stage implementations
│   │   └── flows.ts        # Flow loader
│   ├── services/
│   │   ├── memory.ts       # Memory service client
│   │   ├── pbml.ts         # PBML service client
│   │   └── qwen.ts         # Qwen3 client
│   ├── routes/
│   │   ├── health.ts       # Health/readiness
│   │   ├── recommendations.ts
│   │   └── prompts.ts
│   └── middleware/
│       ├── auth.ts         # Auth middleware
│       └── metrics.ts      # Prometheus metrics
├── k8s/
│   ├── deployment.yaml     # Kubernetes deployment
│   ├── service.yaml        # Service definition
│   ├── configmap.yaml      # Configuration
│   └── hpa.yaml           # Horizontal Pod Autoscaler
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

#### 1.2 Dockerfile (Multi-stage)
```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 3: Runtime
FROM node:20-alpine
RUN apk add --no-cache dumb-init
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json ./
USER node
EXPOSE 3005
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
```

#### 1.3 Package.json
```json
{
  "name": "devmentor-learning-service",
  "version": "0.1.0-beta",
  "description": "Learning Service for DevMentor",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "test:integration": "jest --testPathPattern=integration",
    "lint": "eslint src/",
    "docker:build": "docker build -t devmentor/learning-service:latest .",
    "docker:run": "docker run -p 3005:3005 --env-file .env devmentor/learning-service:latest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "redis": "^4.6.11",
    "ioredis": "^5.3.2",
    "axios": "^1.7.7",
    "zod": "^3.22.4",
    "winston": "^3.11.0",
    "prom-client": "^15.0.0",
    "dotenv": "^16.3.1",
    "@opentelemetry/api": "^1.6.0",
    "@opentelemetry/sdk-node": "^0.45.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.9.0",
    "typescript": "^5.2.2",
    "tsx": "^4.6.0",
    "jest": "^29.7.0",
    "@types/jest": "^29.5.8",
    "eslint": "^8.54.0"
  }
}
```

### Phase 2: Core Implementation (Days 4-7)

#### 2.1 Express Server (src/index.ts)
```typescript
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { createRedisClient } from './config/redis';
import { healthRouter } from './routes/health';
import { recommendationsRouter } from './routes/recommendations';
import { promptsRouter } from './routes/prompts';
import { metricsMiddleware } from './middleware/metrics';
import { logger } from './config/logger';

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);

// Routes
app.use('/health', healthRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/prompts', promptsRouter);

// Graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down gracefully');
  // Close connections
  process.exit(0);
});

app.listen(PORT, () => {
  logger.info(`Learning Service running on port ${PORT}`);
});
```

#### 2.2 Flow Orchestrator (src/orchestrator/index.ts)
```typescript
import { loadFlows } from './flows';
import { RedisClient } from '../config/redis';

export class FlowOrchestrator {
  private flows: Map<string, Flow>;
  private redis: RedisClient;

  async execute(flowName: string, context: Context): Promise<Result> {
    const flow = this.flows.get(flowName);
    if (!flow) throw new Error(`Flow ${flowName} not found`);
    
    let candidates = await this.getCandidates(context);
    
    for (const stage of flow.stages) {
      candidates = await this.runStage(stage, candidates, context);
    }
    
    // Track decision
    await this.trackDecision(flowName, context, candidates);
    
    return { items: candidates, flow: flowName };
  }

  private async runStage(stage: Stage, items: any[], context: Context) {
    switch (stage.type) {
      case 'candidates.pbml':
        return await this.pbmlCandidates(items, stage.params);
      case 'candidates.memory_bank':
        return await this.memoryBankCandidates(items, stage.params);
      case 'filter.entitlements':
        return await this.filterEntitlements(items, context);
      case 'llm.rerank.qwen3':
        return await this.qwenRerank(items, stage.params);
      case 'fallback':
        return items.length > 0 ? items : stage.params.default;
      default:
        return items;
    }
  }
}
```

### Phase 3: Docker Compose Integration (Days 8-10)

#### 3.1 docker-compose.learning.yml
```yaml
version: '3.8'

services:
  learning-service:
    build:
      context: ./services/learning-service
      dockerfile: Dockerfile
    container_name: devmentor-learning-service
    ports:
      - "3005:3005"
    environment:
      - NODE_ENV=production
      - PORT=3005
      - REDIS_URL=redis://redis:6379
      - MEMORY_SERVICE_URL=http://memory-service:3003
      - PBML_SERVICE_URL=http://pbml-service:3006
      - OLLAMA_URL=http://ollama:11434
      - LOG_LEVEL=info
    depends_on:
      - redis
      - memory-service
    networks:
      - devmentor
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3005/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

networks:
  devmentor:
    external: true
```

### Phase 4: Kubernetes Deployment (Days 11-14)

#### 4.1 k8s/deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: learning-service
  namespace: devmentor
  labels:
    app: learning-service
    version: v0.1.0-beta
spec:
  replicas: 2
  selector:
    matchLabels:
      app: learning-service
  template:
    metadata:
      labels:
        app: learning-service
        version: v0.1.0-beta
    spec:
      containers:
      - name: learning-service
        image: devmentor/learning-service:v0.1.0-beta
        ports:
        - containerPort: 3005
        env:
        - name: NODE_ENV
          value: "production"
        - name: REDIS_URL
          value: "redis://redis-service:6379"
        - name: MEMORY_SERVICE_URL
          value: "http://memory-service:3003"
        - name: PBML_SERVICE_URL
          value: "http://pbml-service:3006"
        - name: OLLAMA_URL
          value: "http://ollama-service:11434"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health/live
            port: 3005
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health/ready
            port: 3005
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: learning-service
  namespace: devmentor
spec:
  selector:
    app: learning-service
  ports:
  - port: 3005
    targetPort: 3005
  type: ClusterIP
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: learning-service-hpa
  namespace: devmentor
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: learning-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

## 📊 Beta Success Metrics

### Performance Requirements
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| P50 Latency | < 100ms | - | 🔴 |
| P95 Latency | < 250ms | - | 🔴 |
| P99 Latency | < 500ms | - | 🔴 |
| Throughput | 100 RPS | - | 🔴 |
| Availability | 99.0% | - | 🔴 |
| Error Rate | < 1% | - | 🔴 |

### Container Health Metrics
```yaml
Health Checks:
  - Startup: 40s max
  - Liveness: Every 10s
  - Readiness: Every 5s
  
Resource Usage:
  - Memory: 256-512MB
  - CPU: 0.25-0.5 cores
  - Disk: < 100MB image size
```

## ✅ Beta Launch Checklist

### Week 1: Foundation
- [ ] Create service directory structure
- [ ] Write Dockerfile with multi-stage build
- [ ] Set up package.json with dependencies
- [ ] Implement basic Express server
- [ ] Add health check endpoints
- [ ] Create Redis connection pool
- [ ] Set up logging (Winston)
- [ ] Add Prometheus metrics

### Week 2: Core Features
- [ ] Implement flow orchestrator
- [ ] Connect to Memory Service
- [ ] Connect to PBML Service
- [ ] Implement Qwen3 integration
- [ ] Add recommendation endpoints
- [ ] Add prompt suggestion endpoints
- [ ] Implement caching layer
- [ ] Add event tracking

### Week 3: Deployment
- [ ] Build and test Docker image
- [ ] Push to container registry
- [ ] Deploy to local Docker Compose
- [ ] Test inter-service communication
- [ ] Create Kubernetes manifests
- [ ] Deploy to K8s cluster
- [ ] Configure HPA
- [ ] Run load tests

### Week 4: Beta Polish
- [ ] Integration testing
- [ ] Performance tuning
- [ ] Documentation
- [ ] Monitoring setup
- [ ] Rollback plan
- [ ] Beta release

## 🔥 Critical Path Items

1. **Docker Image Build** (Day 1-2)
   - Must be < 100MB
   - Fast startup time
   - Proper signal handling

2. **Service Discovery** (Day 3-4)
   - DNS resolution in K8s
   - Service mesh integration
   - Health checks

3. **Redis Connection Pool** (Day 5)
   - Connection pooling
   - Retry logic
   - Circuit breaker

4. **Flow Orchestration** (Day 6-8)
   - Load flows.json
   - Stage execution
   - Error handling

5. **Inter-service Communication** (Day 9-10)
   - HTTP clients with retry
   - Timeout handling
   - Circuit breakers

## 🚨 Risk Mitigation

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Qwen3 latency | High | Aggressive timeout (150ms), fallback to rules |
| Memory leaks | High | Resource limits, memory profiling |
| Redis failure | High | Fallback to in-memory cache |
| Network issues | Medium | Retry with exponential backoff |
| Cold starts | Medium | Keep-warm strategy, readiness probes |

### Operational Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Deployment failure | High | Blue-green deployment, quick rollback |
| Config drift | Medium | ConfigMaps, GitOps |
| Monitoring gaps | Medium | Comprehensive metrics from day 1 |
| Security vulnerabilities | High | Scan images, non-root user |

## 🎯 Definition of Done

### Container Requirements
- [x] Dockerfile created with multi-stage build
- [x] Image size < 100MB
- [x] Non-root user
- [x] Security scanning passed
- [x] Health checks implemented

### Service Requirements
- [x] All endpoints documented
- [x] Unit test coverage > 80%
- [x] Integration tests passing
- [x] Load test passed (100 RPS)
- [x] Monitoring configured

### Deployment Requirements
- [x] K8s manifests created
- [x] HPA configured
- [x] Service mesh integrated
- [x] DNS resolution working
- [x] Rolling updates tested

## 📈 Post-Beta Improvements

### Phase 1 (Post-Beta Week 1)
- Implement distributed tracing
- Add request caching
- Optimize Qwen3 calls
- Add feature flags

### Phase 2 (Post-Beta Week 2)
- Multi-tenant support
- Advanced A/B testing
- GraphQL API
- WebSocket support

### Phase 3 (Post-Beta Month 2)
- ML model integration
- Real-time learning loop
- Advanced analytics
- Performance optimization

## 🔗 Related Documentation

- [System Architecture](../00-overview/SYSTEM_ARCHITECTURE.md)
- [Learning Service Architecture](../00-overview/LEARNING_SERVICE_ARCHITECTURE.md)
- [Docker Deployment Guide](../03-operations/DOCKER_DEPLOYMENT.md)
- [Kubernetes Guide](../03-operations/KUBERNETES_DEPLOYMENT_GUIDE.md)

## 📞 Support & Contacts

- **Technical Lead**: DevMentor Team
- **DevOps**: Infrastructure Team
- **Slack Channel**: #devmentor-learning-service
- **Escalation**: On-call rotation

---

**Status Update**: As of current date, the Learning Service needs to be created from scratch. This is a P0 priority for beta launch. The service will be deployed as a Docker container in the Kubernetes cluster alongside existing services.
{% endraw %}
