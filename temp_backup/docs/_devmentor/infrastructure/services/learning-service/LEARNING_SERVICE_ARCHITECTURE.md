---
layout: product
title: LEARNING SERVICE ARCHITECTURE
product: DevMentor
source: infrastructure/services/learning-service/LEARNING_SERVICE_ARCHITECTURE.md
---

{% raw %}
CURRENT ARCHITECTURE

# Learning Service Architecture

## 🎯 Overview

The Learning Service acts as the AI orchestration layer for DevMentor, providing intelligent recommendations and personalized learning experiences through deep integration with:
- Memory Service (context persistence)
- PBML (pattern recognition)
- Qwen3 (LLM reasoning)
- Qdrant (vector search)
- PostgreSQL (relational data)

## 🏗️ System Architecture

```ascii
┌──────────────────────────────────────────────────────────────────────────────┐
│                               USER LAYER                                      │
│    IDE Integration | CLI | Web UI | API Clients | Admin Dashboard            │
└──────────────────────────────────┬───────────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼───────────────────────────────────────────┐
│                            LEARNING SERVICE                                   │
│                                                                              │
│  ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐      │
│  │ Context Layer   │      │ Analysis Layer   │      │ Response Layer  │      │
│  │                 │      │                  │      │                 │      │
│  │ • User State    │──────│ • PBML Patterns  │──────│ • Suggestions  │      │
│  │ • Memory Access │      │ • Vector Search  │      │ • Learning     │      │
│  │ • Session Data  │      │ • Qwen3 Ranking  │      │ • Feedback     │      │
│  └─────────────────┘      └─────────────────┘      └─────────────────┘      │
│            │                      │                         │                 │
└────────────┼──────────────────────┼─────────────────────────┼────────────────┘
             │                      │                         │
┌────────────┼──────────────────────┼─────────────────────────┼────────────────┐
│                             STORAGE LAYER                                     │
│                                                                              │
│   ┌─────────────┐    ┌─────────────┐    ┌──────────────┐    ┌────────────┐  │
│   │  Qdrant     │    │ PostgreSQL  │    │ Redis Cache  │    │   S3       │  │
│   │             │    │             │    │              │    │            │  │
│   │ • Vectors   │    │ • Metadata  │    │ • Hot Data   │    │ • Blobs    │  │
│   │ • Patterns  │    │ • Relations │    │ • Sessions   │    │ • Backups  │  │
│   └─────────────┘    └─────────────┘    └──────────────┘    └────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 Core Components

### 1. Context Layer
```typescript
interface ContextManager {
  // Get user's current context
  getCurrentContext(userId: string): Promise<Context>;
  
  // Update context with new information
  updateContext(userId: string, update: ContextUpdate): Promise<void>;
  
  // Get relevant historical context
  getHistoricalContext(userId: string, scope: TimeRange): Promise<Context[]>;
}
```

### 2. Analysis Layer
```typescript
interface AnalysisEngine {
  // Analyze patterns with PBML
  analyzePatterns(context: Context): Promise<PatternAnalysis>;
  
  // Search similar vectors
  findSimilarVectors(embedding: Float32Array): Promise<SearchResult[]>;
  
  // Rank suggestions with Qwen3
  rankSuggestions(candidates: Suggestion[]): Promise<RankedSuggestion[]>;
}
```

### 3. Response Layer
```typescript
interface ResponseManager {
  // Generate personalized suggestions
  generateSuggestions(context: Context): Promise<Suggestion[]>;
  
  // Create learning path
  createLearningPath(userId: string, goal: Goal): Promise<LearningPath>;
  
  // Process user feedback
  processFeedback(feedback: Feedback): Promise<void>;
}
```

## 📡 Inter-Service Communication

### 1. Memory Service Integration
```typescript
class MemoryServiceClient {
  async getMemories(userId: string): Promise<Memory[]> {
    const response = await this.client.get(`/api/memories/${userId}`);
    return this.processMemories(response.data);
  }
  
  async storeMemory(memory: Memory): Promise<void> {
    await this.client.post('/api/memories', memory);
  }
}
```

### 2. PBML Integration
```typescript
class PBMLClient {
  async analyzePattern(data: PatternData): Promise<Analysis> {
    const response = await this.client.post('/api/analyze', data);
    return this.processAnalysis(response.data);
  }
  
  async generatePath(context: Context): Promise<LearningPath> {
    const response = await this.client.post('/api/generate-path', context);
    return this.processPath(response.data);
  }
}
```

### 3. Qwen3 Integration
```typescript
class Qwen3Client {
  async rankItems(items: Item[], context: Context): Promise<RankedItem[]> {
    const response = await this.client.post('/api/rank', {
      items,
      context,
      config: this.rankingConfig
    });
    return this.processRanking(response.data);
  }
}
```

## 💾 Data Storage

### 1. Qdrant Collections
```typescript
interface VectorCollections {
  patterns: {
    dimension: 1536;
    distance: 'Cosine';
    metadata: PatternMetadata;
  };
  
  contexts: {
    dimension: 1536;
    distance: 'Cosine';
    metadata: ContextMetadata;
  };
}
```

### 2. PostgreSQL Schema
```sql
-- Core tables
CREATE TABLE users (
  user_id UUID PRIMARY KEY,
  preferences JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE learning_paths (
  path_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id),
  path_data JSONB,
  status VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE suggestions (
  suggestion_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id),
  suggestion_data JSONB,
  confidence FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. Redis Caching
```typescript
interface CacheConfig {
  keys: {
    userContext: string;    // user:{id}:context
    suggestions: string;    // user:{id}:suggestions
    patterns: string;      // user:{id}:patterns
  };
  
  ttl: {
    context: number;      // 15 minutes
    suggestions: number;  // 5 minutes
    patterns: number;    // 30 minutes
  };
}
```

## 🔒 Security & Privacy

### 1. Authentication & Authorization
```typescript
interface SecurityConfig {
  auth: {
    type: 'JWT';
    scope: ['read', 'write', 'admin'];
    expiry: '1h';
  };
  
  encryption: {
    algorithm: 'AES-256-GCM';
    keyRotation: '30d';
  };
}
```

### 2. Data Protection
```typescript
interface DataProtection {
  pii: {
    fields: ['userId', 'email'];
    handling: 'encrypt';
  };
  
  audit: {
    enabled: true;
    retention: '90d';
  };
}
```

## 📊 Monitoring & Metrics

### 1. Performance Metrics
```typescript
interface Metrics {
  latency: {
    p50: number;
    p95: number;
    p99: number;
  };
  
  throughput: {
    requests: number;
    suggestions: number;
    analysis: number;
  };
}
```

### 2. Health Checks
```typescript
interface HealthCheck {
  services: {
    memory: boolean;
    pbml: boolean;
    qwen3: boolean;
  };
  
  storage: {
    qdrant: boolean;
    postgres: boolean;
    redis: boolean;
  };
}
```

## 🚀 Deployment & Scaling

### 1. Container Configuration
```yaml
resources:
  limits:
    cpu: '1'
    memory: '2Gi'
  requests:
    cpu: '500m'
    memory: '1Gi'

scaling:
  minReplicas: 2
  maxReplicas: 10
  targetCPU: 70%
```

### 2. Load Balancing
```typescript
interface LoadBalancer {
  algorithm: 'round-robin';
  healthCheck: {
    path: '/health';
    interval: '30s';
    timeout: '5s';
    threshold: 3;
  };
}
```

## 🔄 Error Handling & Recovery

### 1. Circuit Breakers
```typescript
interface CircuitBreaker {
  threshold: 5;
  timeout: '60s';
  fallback: {
    type: 'cache';
    ttl: '5m';
  };
}
```

### 2. Retry Logic
```typescript
interface RetryConfig {
  maxAttempts: 3;
  backoff: {
    initial: '1s';
    multiplier: 2;
    max: '10s';
  };
}
```
{% endraw %}
