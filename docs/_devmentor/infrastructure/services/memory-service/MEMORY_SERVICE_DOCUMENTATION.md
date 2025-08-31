---
layout: product
title: MEMORY SERVICE DOCUMENTATION
product: DevMentor
source: infrastructure/services/memory-service/MEMORY_SERVICE_DOCUMENTATION.md
---

{% raw %}
CURRENT ARCHITECTURE

# Memory Service Documentation

**Service:** Memory Service  
**Port:** 3003  
**Status:** ✅ Production Ready  
**Last Updated:** January 13, 2025  

---

## 🎯 **Overview**

The DevMentor Memory Service is a sophisticated vector-based memory system that provides intelligent storage, retrieval, and analysis of development knowledge, code patterns, and learning experiences. It serves as the "long-term memory" of the DevMentor platform, enabling context-aware assistance and personalized learning.

### **Key Capabilities**
- **🧠 Vector Memory Storage** - High-performance vector embeddings with Qdrant
- **🔍 Semantic Search** - Intelligent content discovery and retrieval
- **📊 Knowledge Graph** - Relationship mapping between concepts and solutions
- **🔄 Context Learning** - Continuous improvement through usage patterns
- **🎯 Personalization** - User-specific memory and preference learning
- **🔗 Cross-Service Integration** - Seamless integration with all DevMentor services

---

## 🏗️ **Architecture**

### **Service Architecture**

Simplified Architecture (ASCII)
```
Client -> Memory Service API -> RAG Engine -> (Ollama, Qdrant)
                   |-> Postgres (metadata)
                   \-> Redis (cache)
```
Detailed Architecture (ASCII)
```
+--------------------+        +----------------------+
|      Client        | -----> |  Memory Service API  |
+--------------------+        +----------------------+
                                     |   \
                                     |    \--> PostgreSQL (metadata)
                                     |    \--> Redis (cache)
                                     v
                          +-----------------------+
                          |  DevMentorAI (RAG)    |
                          +-----------------------+
                             | embeddings    | vectors
                             v               v
                       +-------------+   +-------------+
                       |   Ollama    |   |   Qdrant    |
                       +-------------+   +-------------+
```

### **Memory Processing Flow**

Simplified Flow (ASCII)
```
Client -> API -> (RAG -> Qdrant) + Postgres + Redis -> Response
```
Detailed Flow (ASCII)
```
[Client] --> [API]
    |            \
    |             \-> [PostgreSQL] (write/read metadata)
    |              \-> [Redis] (cache hot results)
    |-> [RAG Engine] --> [Qdrant] (upsert/search vectors)
[API] --> [Client] (results + metadata)
```

---

## 📡 **API Reference**

### **Base URL**
```
http://localhost:3003/api/v1
```

### **Authentication**
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### **Core Endpoints**

#### **1. Memory Storage**

**Store Memory**
```http
POST /memories
```

**Request Body:**
```json
{
  "userId": "user_123",
  "type": "code_pattern",
  "content": "React functional component with hooks pattern",
  "code": "const MyComponent = () => { const [state, setState] = useState(); return <div>{state}</div>; };",
  "language": "javascript",
  "framework": "react",
  "context": {
    "project": "e-commerce-app",
    "file": "src/components/ProductCard.tsx",
    "purpose": "state-management"
  },
  "metadata": {
    "tags": ["react", "hooks", "state", "functional"],
    "complexity": "beginner",
    "confidence": 0.95
  },
  "relationships": [
    {
      "type": "similar_to",
      "memoryId": "memory_456",
      "strength": 0.8
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "memory": {
    "id": "memory_789",
    "userId": "user_123",
    "type": "code_pattern",
    "content": "React functional component with hooks pattern",
    "embedding": {
      "vector": [0.1, 0.2, 0.3, ...],
      "dimensions": 768
    },
    "metadata": {
      "tags": ["react", "hooks", "state", "functional"],
      "complexity": "beginner",
      "confidence": 0.95,
      "createdAt": "2025-01-13T10:30:00Z"
    },
    "relationships": [
      {
        "id": "rel_123",
        "type": "similar_to",
        "memoryId": "memory_456",
        "strength": 0.8
      }
    ]
  }
}
```

**Batch Store Memories**
```http
POST /memories/batch
```

**Request Body:**
```json
{
  "memories": [
    {
      "userId": "user_123",
      "type": "solution",
      "content": "JWT authentication implementation",
      "code": "const token = jwt.sign(payload, secret);",
      "language": "javascript"
    },
    {
      "userId": "user_123",
      "type": "pattern",
      "content": "Error handling with try-catch",
      "code": "try { /* code */ } catch (error) { console.error(error); }",
      "language": "javascript"
    }
  ]
}
```

#### **2. Memory Retrieval**

**Search Memories**
```http
POST /memories/search
```

**Request Body:**
```json
{
  "userId": "user_123",
  "query": "React state management patterns",
  "filters": {
    "type": ["code_pattern", "solution"],
    "language": ["javascript", "typescript"],
    "framework": ["react"],
    "complexity": ["beginner", "intermediate"]
  },
  "options": {
    "limit": 10,
    "threshold": 0.7,
    "includeCode": true,
    "includeRelationships": true
  }
}
```

**Response:**
```json
{
  "memories": [
    {
      "id": "memory_789",
      "content": "React functional component with hooks pattern",
      "code": "const MyComponent = () => { const [state, setState] = useState(); return <div>{state}</div>; };",
      "similarity": 0.92,
      "metadata": {
        "tags": ["react", "hooks", "state", "functional"],
        "complexity": "beginner",
        "usageCount": 15
      },
      "relationships": [
        {
          "id": "rel_123",
          "type": "similar_to",
          "memoryId": "memory_456",
          "strength": 0.8
        }
      ]
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  },
  "analytics": {
    "searchTime": 45,
    "vectorSearchTime": 12,
    "metadataSearchTime": 33
  }
}
```

**Get Memory by ID**
```http
GET /memories/{memoryId}
```

**Response:**
```json
{
  "id": "memory_789",
  "userId": "user_123",
  "type": "code_pattern",
  "content": "React functional component with hooks pattern",
  "code": "const MyComponent = () => { const [state, setState] = useState(); return <div>{state}</div>; };",
  "language": "javascript",
  "framework": "react",
  "context": {
    "project": "e-commerce-app",
    "file": "src/components/ProductCard.tsx",
    "purpose": "state-management"
  },
  "metadata": {
    "tags": ["react", "hooks", "state", "functional"],
    "complexity": "beginner",
    "confidence": 0.95,
    "usageCount": 15,
    "lastUsed": "2025-01-13T10:30:00Z",
    "createdAt": "2025-01-10T15:20:00Z"
  },
  "relationships": [
    {
      "id": "rel_123",
      "type": "similar_to",
      "memoryId": "memory_456",
      "strength": 0.8,
      "relatedMemory": {
        "id": "memory_456",
        "content": "useState hook usage",
        "similarity": 0.8
      }
    }
  ]
}
```

#### **3. Memory Management**

**Update Memory**
```http
PUT /memories/{memoryId}
```

**Request Body:**
```json
{
  "content": "Updated React functional component pattern",
  "code": "const MyComponent = ({ props }) => { const [state, setState] = useState(props.initialValue); return <div>{state}</div>; };",
  "metadata": {
    "tags": ["react", "hooks", "state", "functional", "props"],
    "complexity": "intermediate",
    "confidence": 0.98
  }
}
```

**Delete Memory**
```http
DELETE /memories/{memoryId}
```

**Response:**
```json
{
  "success": true,
  "message": "Memory deleted successfully",
  "deletedRelationships": 3
}
```

**Get User Memories**
```http
GET /memories/user/{userId}?type=code_pattern&limit=20&offset=0
```

**Response:**
```json
{
  "memories": [
    {
      "id": "memory_789",
      "type": "code_pattern",
      "content": "React functional component with hooks pattern",
      "similarity": 0.95,
      "metadata": {
        "tags": ["react", "hooks", "state"],
        "usageCount": 15,
        "lastUsed": "2025-01-13T10:30:00Z"
      }
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

#### **4. Relationship Management**

**Create Relationship**
```http
POST /memories/{memoryId}/relationships
```

**Request Body:**
```json
{
  "type": "similar_to",
  "targetMemoryId": "memory_456",
  "strength": 0.85,
  "metadata": {
    "reason": "Both use React hooks for state management"
  }
}
```

**Get Memory Relationships**
```http
GET /memories/{memoryId}/relationships
```

**Response:**
```json
{
  "relationships": [
    {
      "id": "rel_123",
      "type": "similar_to",
      "targetMemoryId": "memory_456",
      "strength": 0.85,
      "targetMemory": {
        "id": "memory_456",
        "content": "useState hook usage",
        "type": "code_pattern"
      },
      "metadata": {
        "reason": "Both use React hooks for state management"
      }
    }
  ]
}
```

#### **5. Analytics and Insights**

**Get Memory Analytics**
```http
GET /memories/analytics?userId=user_123&period=30d
```

**Response:**
```json
{
  "summary": {
    "totalMemories": 150,
    "totalUsage": 1250,
    "averageSimilarity": 0.78,
    "topTags": ["react", "javascript", "state-management"]
  },
  "usage": {
    "daily": [
      {"date": "2025-01-13", "count": 45},
      {"date": "2025-01-12", "count": 38}
    ],
    "byType": [
      {"type": "code_pattern", "count": 80},
      {"type": "solution", "count": 45},
      {"type": "pattern", "count": 25}
    ]
  },
  "performance": {
    "averageSearchTime": 45,
    "cacheHitRate": 0.85,
    "vectorSearchAccuracy": 0.92
  }
}
```

**Get Learning Insights**
```http
GET /memories/insights?userId=user_123
```

**Response:**
```json
{
  "insights": [
    {
      "type": "learning_pattern",
      "title": "React Hooks Mastery",
      "description": "You've mastered React hooks patterns with 15+ related memories",
      "confidence": 0.95,
      "relatedMemories": ["memory_789", "memory_456", "memory_123"]
    },
    {
      "type": "knowledge_gap",
      "title": "Advanced State Management",
      "description": "Consider exploring Redux or Context API for complex state",
      "confidence": 0.78,
      "suggestions": [
        "Study Redux patterns",
        "Learn Context API",
        "Explore Zustand"
      ]
    }
  ]
}
```

---

## 🔧 **Configuration**

### **Environment Variables**
```bash
# Service Configuration
MEMORY_SERVICE_PORT=3003
MEMORY_SERVICE_ENV=production
MEMORY_SERVICE_LOG_LEVEL=info

# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=memory_service
POSTGRES_USER=memory_user
POSTGRES_PASSWORD=secure_password

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis_password
REDIS_DB=2

# Qdrant Configuration
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_COLLECTION=devmentor_memories
QDRANT_DIMENSIONS=768

# AI Configuration
OPENAI_API_KEY=your_openai_key
EMBEDDING_MODEL=nomic-embed-text-v1.5
EMBEDDING_DIMENSIONS=768

# Performance Configuration
VECTOR_BATCH_SIZE=100
SEARCH_CACHE_TTL=3600
MAX_SEARCH_RESULTS=100
SIMILARITY_THRESHOLD=0.7

# Security Configuration
ENCRYPTION_KEY=your_encryption_key
VECTOR_ENCRYPTION=true
```

### **Service Configuration**
```json
{
  "memory": {
    "storage": {
      "maxMemoriesPerUser": 10000,
      "maxMemorySize": "1MB",
      "compressionEnabled": true,
      "backupEnabled": true
    },
    "search": {
      "defaultLimit": 20,
      "maxLimit": 100,
      "defaultThreshold": 0.7,
      "enableFuzzySearch": true,
      "enableSemanticSearch": true
    },
    "vector": {
      "model": "nomic-embed-text-v1.5",
      "dimensions": 768,
      "batchSize": 100,
      "maxRetries": 3
    },
    "cache": {
      "enabled": true,
      "ttl": 3600,
      "maxSize": "100MB",
      "strategy": "lru"
    }
  },
  "analytics": {
    "enabled": true,
    "trackUsage": true,
    "trackPerformance": true,
    "retentionDays": 365
  },
  "relationships": {
    "maxRelationshipsPerMemory": 50,
    "autoDiscoverRelationships": true,
    "relationshipTypes": [
      "similar_to",
      "depends_on",
      "improves",
      "replaces",
      "complements"
    ]
  }
}
```

---

## 🚀 **Quick Start**

### **1. Prerequisites**
```bash
# Install dependencies
npm install

# Start required services
docker-compose up -d postgres redis qdrant
```

### **2. Environment Setup**
```bash
# Copy environment file
cp .env.example .env

# Edit configuration
nano .env
```

### **3. Database Setup**
```bash
# Run migrations
npm run migrate

# Initialize Qdrant collection
npm run init-qdrant

# Seed test data
npm run seed
```

### **4. Start the Service**
```bash
# Development mode
npm run dev

# Production mode
npm start

# Docker mode
docker-compose up memory-service
```

### **5. Verify Installation**
```bash
# Health check
curl http://localhost:3003/health

# Test memory storage
curl -X POST http://localhost:3003/api/v1/memories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d '{
    "userId": "test_user",
    "type": "test",
    "content": "Test memory content"
  }'
```

---

## 🧪 **Testing**

### **Unit Tests**
```bash
# Run all unit tests
npm run test:unit

# Run specific test suites
npm run test:unit -- --grep "memory storage"
npm run test:unit -- --grep "vector search"
```

### **Integration Tests**
```bash
# Run integration tests
npm run test:integration

# Test with real databases
npm run test:integration -- --with-db
```

### **End-to-End Tests**
```bash
# Run E2E tests
npm run test:e2e

# Test memory workflows
npm run test:e2e -- --grep "memory workflow"
```

### **Performance Tests**
```bash
# Run performance tests
npm run test:performance

# Test vector search performance
npm run test:performance -- --grep "vector search"
```

---

## 📊 **Monitoring & Observability**

### **Health Checks**
```bash
# Basic health check
curl http://localhost:3003/health

# Detailed health check
curl http://localhost:3003/health/detailed

# Component-specific health
curl http://localhost:3003/health/database
curl http://localhost:3003/health/qdrant
curl http://localhost:3003/health/redis
```

### **Metrics**
```bash
# Prometheus metrics
curl http://localhost:3003/metrics

# Memory-specific metrics
curl http://localhost:3003/metrics/memory
curl http://localhost:3003/metrics/search
curl http://localhost:3003/metrics/vector
```

### **Logging**
```bash
# View logs
tail -f logs/memory-service.log

# Filter by component
tail -f logs/memory-service.log | grep "vector"
tail -f logs/memory-service.log | grep "search"

# Log levels
curl -X POST http://localhost:3003/logs/level \
  -H "Content-Type: application/json" \
  -d '{"level": "debug"}'
```

---

## 🔒 **Security**

### **Data Security**
- **Vector Encryption** - Encrypted storage of sensitive embeddings
- **Access Control** - User-based memory isolation
- **Input Validation** - Comprehensive request validation
- **Rate Limiting** - Protection against abuse

### **Privacy Protection**
- **User Isolation** - Memories are isolated per user
- **Data Anonymization** - Analytics data is anonymized
- **GDPR Compliance** - Right to be forgotten implementation
- **Audit Logging** - Comprehensive access logging

### **Performance Security**
- **Query Validation** - Protection against malicious queries
- **Resource Limits** - Memory and CPU usage limits
- **Cache Security** - Secure cache key generation

---

## 🚨 **Troubleshooting**

### **Common Issues**

**1. Qdrant Connection Issues**
```bash
# Check Qdrant connection
curl http://localhost:3003/health/qdrant

# Test Qdrant operations
npm run test:qdrant

# Check Qdrant logs
docker-compose logs qdrant
```

**2. Vector Generation Issues**
```bash
# Check embedding service
curl http://localhost:3003/health/embeddings

# Test vector generation
curl -X POST http://localhost:3003/api/v1/test/embedding \
  -H "Content-Type: application/json" \
  -d '{"text": "test content"}'

# Check OpenAI API
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
  https://api.openai.com/v1/models
```

**3. Search Performance Issues**
```bash
# Check search performance
curl http://localhost:3003/metrics/search

# Optimize search
curl -X POST http://localhost:3003/api/v1/search/optimize \
  -H "Content-Type: application/json" \
  -d '{"action": "rebuild_index"}'

# Clear search cache
curl -X POST http://localhost:3003/api/v1/cache/clear \
  -H "Content-Type: application/json" \
  -d '{"type": "search"}'
```

**4. Memory Storage Issues**
```bash
# Check storage usage
curl http://localhost:3003/metrics/storage

# Cleanup old memories
curl -X POST http://localhost:3003/api/v1/memories/cleanup \
  -H "Content-Type: application/json" \
  -d '{"olderThan": "30d"}'

# Optimize storage
curl -X POST http://localhost:3003/api/v1/storage/optimize
```

### **Performance Optimization**
```bash
# Enable performance mode
curl -X POST http://localhost:3003/config/performance \
  -H "Content-Type: application/json" \
  -d '{"mode": "high-performance"}'

# Monitor performance
curl http://localhost:3003/metrics/performance
```

---

## 🔄 **Integration Examples**

### **Frontend Integration**
```javascript
import { MemoryService } from '@devmentor/memory-service';

const memory = new MemoryService({
  apiUrl: 'http://localhost:3003',
  userId: 'user_123'
});

// Store a memory
const storeMemory = async (content, code, context) => {
  const result = await memory.store({
    type: 'code_pattern',
    content,
    code,
    language: 'javascript',
    context
  });
  return result;
};

// Search memories
const searchMemories = async (query, filters) => {
  const results = await memory.search({
    query,
    filters,
    options: {
      limit: 10,
      threshold: 0.7
    }
  });
  return results;
};
```

### **Service Integration**
```javascript
// Store learning from code analysis
const storeLearning = async (userId, code, analysis) => {
  const response = await fetch('http://localhost:3003/api/v1/memories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      userId,
      type: 'learning',
      content: analysis.pattern,
      code,
      metadata: {
        tags: analysis.tags,
        complexity: analysis.complexity,
        confidence: analysis.confidence
      }
    })
  });
  
  return response.json();
};

// Get contextual suggestions
const getSuggestions = async (userId, context) => {
  const response = await fetch('http://localhost:3003/api/v1/memories/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      userId,
      query: context.description,
      filters: {
        type: ['solution', 'pattern'],
        language: [context.language]
      }
    })
  });
  
  return response.json();
};
```

### **CLI Integration**
```bash
#!/bin/bash

# Store memory from command line
store_memory() {
  user_id="$1"
  content="$2"
  code="$3"
  
  response=$(curl -s -X POST http://localhost:3003/api/v1/memories \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $MEMORY_TOKEN" \
    -d "{
      \"userId\": \"$user_id\",
      \"type\": \"code_pattern\",
      \"content\": \"$content\",
      \"code\": \"$code\",
      \"language\": \"javascript\"
    }")
  
  echo $response | jq '.'
}

# Search memories
search_memories() {
  user_id="$1"
  query="$2"
  
  response=$(curl -s -X POST http://localhost:3003/api/v1/memories/search \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $MEMORY_TOKEN" \
    -d "{
      \"userId\": \"$user_id\",
      \"query\": \"$query\",
      \"options\": {
        \"limit\": 10,
        \"threshold\": 0.7
      }
    }")
  
  echo $response | jq '.memories[] | {id, content, similarity}'
}

# Get analytics
get_analytics() {
  user_id="$1"
  
  response=$(curl -s -H "Authorization: Bearer $MEMORY_TOKEN" \
    "http://localhost:3003/api/v1/memories/analytics?userId=$user_id&period=30d")
  
  echo $response | jq '.'
}
```

---

## 📚 **Additional Resources**

- **API Documentation:** `/docs/api`
- **Swagger UI:** `http://localhost:3003/swagger`
- **Health Dashboard:** `http://localhost:3003/health`
- **Metrics Dashboard:** `http://localhost:3003/metrics`
- **Analytics Dashboard:** `http://localhost:3003/analytics`

---

*This documentation is maintained by the DevMentor Engineering Team. For questions or contributions, please contact the team.* {% endraw %}
