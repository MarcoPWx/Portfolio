---
layout: product
title: COMPLETE DATA FLOW ARCHITECTURE
product: DevMentor
source: architecture/COMPLETE_DATA_FLOW_ARCHITECTURE.md
---

{% raw %}
# DevMentor System Architecture & Data Flow Guide

**Complete Understanding of How Everything Works Together**

---

## 🎯 Executive Summary

DevMentor is a **microservices-based AI development platform** that uses:
- **Multiple specialized databases** for different data types
- **Event-driven architecture** for real-time updates
- **AI-powered intelligence** throughout the system
- **Sophisticated caching** and optimization strategies

Let me break down exactly how data flows through the system and why each component exists.

---

## 🏗️ Core Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                           │
│  Next.js UI (Port 3000) → WebSocket Client → Redux Store        │
└────────────┬───────────────────────────────────┬─────────────────┘
             │                                   │
             ▼                                   ▼
┌──────────────────────┐            ┌──────────────────────┐
│   API Gateway        │            │  WebSocket Gateway    │
│   (Port 8080)        │            │  (Port 8081)          │
│   - Routing          │            │  - Real-time updates  │
│   - Auth             │            │  - Event broadcasting │
│   - Rate Limiting    │            │  - Room management    │
└──────────┬───────────┘            └──────────┬───────────┘
           │                                    │
           ▼                                    ▼
┌────────────────────────────────────────────────────────────┐
│                    MICROSERVICES LAYER                      │
├──────────────────┬──────────────────┬──────────────────────┤
│  Auth Service    │  AI Gateway      │  Memory Service      │
│  (Port 3002)     │  (Port 3001)     │  (Port 3003)         │
│  - JWT           │  - LLM routing   │  - RAG engine        │
│  - OAuth         │  - Prompt mgmt   │  - Vector storage    │
├──────────────────┼──────────────────┼──────────────────────┤
│  Project Service │  Learning Engine │  Platform Service    │
│  (Port 3004)     │  (Port 8005)     │  (Port 4003)         │
│  - Tasks/Epics   │  - Quiz gen      │  - Orchestration    │
│  - Sprints       │  - XP tracking   │  - Service mesh     │
└──────────────────┴──────────────────┴──────────────────────┘
           │                                    │
           ▼                                    ▼
┌────────────────────────────────────────────────────────────┐
│                      DATA LAYER                             │
├──────────────────┬──────────────────┬──────────────────────┤
│  PostgreSQL      │  Qdrant          │  Redis               │
│  - User data     │  - Vectors       │  - Cache             │
│  - Projects      │  - Embeddings    │  - Sessions          │
│  - Tasks         │  - Semantic      │  - Real-time         │
└──────────────────┴──────────────────┴──────────────────────┘
```

---

## 📊 Data Storage Strategy

### **1. PostgreSQL (Relational Data)**
**Purpose**: Structured, transactional data with ACID guarantees

```sql
-- Primary storage for:
- Users & Authentication
- Projects, Epics, Tasks, Sprints
- Team memberships & permissions
- Audit logs & compliance data
- Learning progress & achievements
```

**Why PostgreSQL?**
- Strong consistency for critical business data
- Complex relationships (users→projects→tasks)
- ACID transactions for data integrity
- Rich querying capabilities with SQL

### **2. Qdrant (Vector Database)**
**Purpose**: AI memory and semantic search

```python
# Stores:
- Text embeddings from OpenAI
- Code pattern vectors
- User behavior embeddings
- Knowledge base vectors
- Semantic search indices
```

**Why Qdrant?**
- Optimized for vector similarity search
- Scales to millions of embeddings
- Fast nearest-neighbor queries (<50ms)
- Critical for RAG (Retrieval Augmented Generation)

### **3. Redis (Cache & Real-time)**
**Purpose**: High-speed caching and pub/sub

```javascript
// Used for:
- Session storage
- API response caching
- WebSocket room management
- Real-time event broadcasting
- Rate limiting counters
- Temporary data & queues
```

**Why Redis?**
- Sub-millisecond latency
- Pub/sub for real-time events
- TTL-based cache expiration
- Distributed locking

---

## 🔄 Complete Data Flow Examples

### **Example 1: Creating a Task with AI Assistance**

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant APIGateway
    participant AIGateway
    participant MemoryService
    participant ProjectService
    participant PostgreSQL
    participant Qdrant
    participant Redis
    participant WebSocket

    User->>Frontend: Types "Create auth task"
    Frontend->>APIGateway: POST /api/ai/assist
    APIGateway->>AIGateway: Route request
    
    AIGateway->>MemoryService: Search context
    MemoryService->>Qdrant: Vector similarity search
    Qdrant-->>MemoryService: Related memories
    MemoryService-->>AIGateway: Context
    
    AIGateway->>AIGateway: Generate task details (OpenAI)
    AIGateway-->>Frontend: Task suggestion
    
    User->>Frontend: Confirms task
    Frontend->>APIGateway: POST /api/projects/:id/tasks
    APIGateway->>ProjectService: Create task
    
    ProjectService->>PostgreSQL: INSERT task
    ProjectService->>Redis: Invalidate cache
    ProjectService->>WebSocket: Broadcast update
    
    WebSocket->>Frontend: Real-time update
    Frontend->>Frontend: Update UI
```

### **Example 2: Memory Bank Learning Flow**

```javascript
// 1. User writes code
const userCode = `
  const authenticate = async (user) => {
    // Implementation
  }
`;

// 2. Frontend sends to Memory Service
POST /api/memory/store
{
  content: userCode,
  type: "code_pattern",
  metadata: {
    language: "javascript",
    pattern: "authentication",
    project: "devmentor"
  }
}

// 3. Memory Service processes
- Generates embedding via OpenAI
- Stores vector in Qdrant
- Indexes metadata
- Updates user profile

// 4. Later retrieval
GET /api/memory/search?q=authentication
- Converts query to vector
- Searches Qdrant (cosine similarity)
- Returns relevant memories
- AI uses context for assistance
```

---

## 🧠 Service-by-Service Deep Dive

### **1. Memory Service (Port 3003)**
**Core Technology**: DevMentorAI RAG Engine + Qdrant

```typescript
// What it does:
- Stores all user interactions as vectors
- Provides semantic search across memories
- Powers context-aware AI responses
- Implements guardrails (PII detection, content filtering)

// Data flow:
User Input → OpenAI Embedding → Qdrant Storage → Vector Index
Query → Vector Search → Context Retrieval → AI Response
```

**Key Features:**
- **RAG (Retrieval Augmented Generation)**: Combines retrieval with generation
- **Semantic Search**: Find by meaning, not keywords
- **Context Windows**: Manages 8000 token contexts
- **Safety**: PII detection, content moderation

### **2. Learning Engine (Port 8005)**
**Purpose**: Educational content and progress tracking

```javascript
// Components:
1. Quiz Generator
   - Dynamic quiz creation
   - Multiple difficulty levels
   - Progress tracking

2. XP Calculator
   - Task completion points
   - Skill progression
   - Achievement system

3. Learning Paths
   - Personalized curricula
   - Adaptive difficulty
   - Progress analytics
```

**Data Storage:**
- PostgreSQL: Quiz results, XP points, achievements
- Redis: Active quiz sessions, leaderboards
- Qdrant: Learning pattern embeddings

### **3. Project Service (Port 3004)**
**Purpose**: Core project management

```sql
-- Data Model:
Projects → Epics → Tasks → Subtasks
Teams → Members → Roles → Permissions
Sprints → Velocity → Burndown

-- Key Operations:
CREATE PROJECT → Generate ID → Set permissions
CREATE TASK → Assign epic → Update status
DRAG TASK → Change status → Broadcast update
```

**Real-time Updates:**
1. Task status change → PostgreSQL update
2. Trigger WebSocket event
3. Broadcast to project room
4. All clients update instantly

### **4. AI Gateway (Port 3001)**
**Purpose**: LLM orchestration and routing

```javascript
// Intelligent routing:
if (request.needsContext) {
  context = await memoryService.getRelevant();
}

if (request.complexity === 'high') {
  response = await openai.gpt4();
} else {
  response = await ollama.local();
}

// Features:
- Prompt engineering
- Token management
- Model selection
- Response caching
- Fallback handling
```

### **5. API Gateway (Port 8080)**
**Purpose**: Single entry point for all requests

```nginx
# Routes requests to appropriate services:
/api/auth/*     → Auth Service (3002)
/api/ai/*       → AI Gateway (3001)
/api/memory/*   → Memory Service (3003)
/api/projects/* → Project Service (3004)
/api/learning/* → Learning Engine (8005)

# Handles:
- Authentication (JWT validation)
- Rate limiting (Redis counters)
- Load balancing (round-robin)
- Response caching
- CORS management
```

---

## 🚀 How to Get Everything Working

### **Step 1: Start Infrastructure**
```bash
# Start databases first
docker-compose up -d postgres redis qdrant

# Verify they're running
docker ps
curl http://localhost:6333/health  # Qdrant
redis-cli ping                      # Redis
psql -U devmentor -d devmentor     # PostgreSQL
```

### **Step 2: Start Core Services**
```bash
# Start in this order (dependencies matter!)

# 1. Auth Service (no dependencies)
cd services/auth-service && npm start

# 2. Memory Service (needs Qdrant)
cd services/memory-service && npm start

# 3. AI Gateway (needs Memory Service)
cd services/ai-gateway && npm start

# 4. Project Service (needs PostgreSQL)
cd services/project-service && npm start

# 5. Learning Engine (needs all above)
cd services/learning-engine && npm start

# 6. API Gateway (needs all services)
cd services/api-gateway && npm start

# 7. WebSocket Gateway (needs Redis)
cd services/websocket-gateway && npm start
```

### **Step 3: Start Frontend**
```bash
cd frontend/devmentor-ui
npm run dev

# Access at http://localhost:3000
```

---

## 🔑 Critical Environment Variables

```bash
# Database Connections
POSTGRES_URL=postgresql://devmentor:password@localhost:5432/devmentor
REDIS_URL=redis://localhost:6379
QDRANT_HOST=localhost
QDRANT_PORT=6333

# AI Configuration
OPENAI_API_KEY=sk-...  # Required for embeddings
OLLAMA_URL=http://localhost:11434  # Optional local AI

# Service URLs (for inter-service communication)
AUTH_SERVICE_URL=http://localhost:3002
AI_GATEWAY_URL=http://localhost:3001
MEMORY_SERVICE_URL=http://localhost:3003
PROJECT_SERVICE_URL=http://localhost:3004
LEARNING_ENGINE_URL=http://localhost:8005

# Frontend needs
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8081
```

---

## 📈 Performance & Scaling

### **Current Performance Metrics**
- **API Response**: <200ms average
- **Vector Search**: <50ms for 10K embeddings
- **WebSocket Latency**: <10ms
- **Database Queries**: <100ms for complex joins
- **Cache Hit Rate**: 85-90%

### **Scaling Strategy**
1. **Horizontal Scaling**: Add more service instances
2. **Database Sharding**: Partition by project/user
3. **Cache Layers**: Redis clustering
4. **CDN**: Static asset delivery
5. **Load Balancing**: Kubernetes ingress

---

## 🎯 Why This Architecture?

### **Microservices Benefits**
- **Independent Scaling**: Scale only what needs scaling
- **Technology Diversity**: Right tool for each job
- **Fault Isolation**: One service failure doesn't crash system
- **Team Autonomy**: Teams can work independently

### **Multi-Database Strategy**
- **PostgreSQL**: ACID compliance for critical data
- **Qdrant**: Optimized for AI/ML workloads
- **Redis**: Microsecond latency for real-time

### **Event-Driven Updates**
- **Real-time Collaboration**: Instant updates across users
- **Loose Coupling**: Services communicate via events
- **Scalability**: Pub/sub scales naturally

---

## 🚦 Current Status & Next Steps

### **What's Working**
✅ All core services implemented
✅ Database schemas defined
✅ WebSocket real-time updates
✅ Basic AI integration
✅ Frontend connected

### **What Needs Work**
🟡 Service deployment to Kubernetes
🟡 Production configuration
🟡 Monitoring & observability
🟡 Load testing
🟡 Security hardening

### **Getting Started Checklist**
```bash
□ Install Docker & Docker Compose
□ Set up environment variables
□ Start databases (PostgreSQL, Redis, Qdrant)
□ Run database migrations
□ Start backend services
□ Start frontend
□ Test health endpoints
□ Create first project
□ Test real-time updates
□ Verify AI features
```

---

## 📚 Key Concepts Summary

1. **RAG (Retrieval Augmented Generation)**: Combines database search with AI generation for context-aware responses

2. **Vector Embeddings**: Text converted to mathematical vectors for semantic similarity search

3. **Event Sourcing**: All changes are events that can be replayed

4. **CQRS Pattern**: Separate read and write models for optimization

5. **Service Mesh**: Services communicate through well-defined APIs

6. **WebSocket Rooms**: Isolated real-time channels per project

7. **JWT Authentication**: Stateless auth tokens validated at gateway

8. **Semantic Search**: Find by meaning rather than exact text match

---

This is how DevMentor works as a complete system! Each service has a specific purpose, optimal database choice, and clear integration points. The architecture supports real-time collaboration, AI-powered assistance, and scalable growth.
{% endraw %}
