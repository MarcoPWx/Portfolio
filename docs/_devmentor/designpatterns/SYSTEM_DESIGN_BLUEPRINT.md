---
layout: product
title: SYSTEM DESIGN BLUEPRINT
product: DevMentor
source: designpatterns/SYSTEM_DESIGN_BLUEPRINT.md
---

{% raw %}
CURRENT_ARCHITECTURE

# DevMentor System Design Blueprint

## System Overview

DevMentor is a comprehensive AI-powered development assistant with these key capabilities:
- 🤖 AI-powered code analysis and assistance
- 📝 Project management and organization
- 🧠 Long-term memory and context awareness
- 🔄 Integration with development tools

## Diagram Annotations

1. **Next.js Web App**: Functions as the primary user interface, providing interactive components and server-side rendering support. Integrated with APIs for seamless data exchange.

2. **VS Code Extension**: Embeds DevMentor functionalities directly within the coding environment, offering assistance like code suggestions, project management, and real-time collaboration tools.

3. **CLI Tool**: Provides command-line access to DevMentor’s features, suitable for automation and quick task execution without a graphical interface.

4. **Load Balancer**: Helps in distributing incoming requests across multiple servers, ensuring efficient resource use and high availability.

5. **API Gateway**: Acts as a central hub, managing API requests, performing security checks, managing rate limits, and directing traffic to appropriate services.

6. **Auth Middleware**: Manages authentication routines, facilitating user identity verification, session handling, and integration with third-party identity providers through OAuth.

7. **AI Gateway (3001)**: Central to orchestrating AI functionalities, including task management, integration with AI models, and coordination of AI service responses.

8. **LLM Orchestrator**: Responsible for managing interactions with language models, ensuring efficient context management, and generating responses accurately and swiftly.

9. **Memory Service**: Manages vector storage, crucial for maintaining long-term contextual memory across sessions, enhancing AI’s responses based on past interactions.

10. **PostgreSQL**: Serves as the main relational database, hosting user data, project configurations, and relational mappings.

11. **Redis**: Functions as a real-time data cache and message broker, enabling fast data retrievals and managing task queues efficiently.

12. **Qdrant**: Dedicated to storing high-dimensional vector data, enabling advanced semantic searches and maintaining context for AI functionalities.

These annotations provide a comprehensive foundation for understanding the system's architecture and main functionalities, equipping you to address a variety of inquiries about DevMentor’s design.

## High-Level Architecture

```
+----------------------------------------------------------------------------------------+
|                                    CLIENT LAYER                                          |
|                                                                                         |
|   +-------------+               +-----------------+              +------------+          |
|   |  Next.js    |               |    VS Code      |              |   CLI      |          |
|   |  Web App    |               |   Extension     |              |   Tool     |          |
|   +------+------+               +--------+--------+              +-----+------+          |
|          |                              |                              |                 |
+----------|------------------------------ | ------------------------------|-----------------+
           |                              |                              |
           +------------------------------+------------------------------+
                                         |
+------------------------------------ GATEWAY ----------------------------------------+
|                                         |                                            |
|                              +----------v----------+                                 |
|                              |    Load Balancer    |                                 |
|                              +----------+----------+                                 |
|                                         |                                            |
|                              +----------v----------+      +-----------------+        |
|                              |    API Gateway     |<---->| Rate Limiter    |        |
|                              |     (Port 8080)    |      +-----------------+        |
|                              +----------+----------+                                 |
|                                         |                                            |
|   +------------------+   +--------------+-------------+    +------------------+      |
|   | Auth Middleware  |<->|    Request Router         |<-->| Error Handler    |      |
|   +------------------+   +--------------------------+    +------------------+      |
|                                         |                                            |
+----------------------------------------|--------------------------------------------+
                                          |
+------------------+   +------------------v-----------------+   +-------------------+
|   AI Gateway     |   |          Core Services            |   |  Storage Layer    |
|   (Port 3001)    |   |                                   |   |                   |
| +-------------+  |   | +-------------+  +-------------+  |   | +--------------+ |
| |    LLM      |  |   | |    Auth     |  |   Memory    |  |   | |  PostgreSQL   | |
| | Orchestrator|  |   | |  (Port 3002)|  | (Port 3003) |  |   | |  (Primary DB) | |
| +-------------+ <-----> +-------------+  +-------------+  |   | +--------------+ |
|                 |   |         ^              ^          |   |         ^         |
| +-------------+ |   |         |              |          |   | +--------------+ |
| |   Agent     | |   |         |              |          |   | |    Redis     | |
| |   System    | |   | +-------------+  +-------------+  |   | |  (Cache/MQ)  | |
| +-------------+ |   | |  Project    |  |    Code     |  |   | +--------------+ |
|        ^        |   | | (Port 3005) |  |  Analysis   |  |   |         ^         |
|        |        |   | +-------------+  +-------------+  |   | +--------------+ |
| +-------------+ |   |         ^              ^          |   | |   Qdrant     | |
| |   Memory    |<-----------------------------+----------+----->|  (Vector DB) | |
| |    Bank     | |   |                                   |   | +--------------+ |
| +-------------+ |   |                                   |   |                   |
+------------------+   +-----------------------------------+   +-------------------+
```

## Component Details

```
┌─────────────────────────────────── CLIENT LAYER ───────────────────────────────────┐
│                                                                                    │
│     [Next.js Web App]          [VS Code Extension]           [CLI Tool]           │
│           │                           │                          │                 │
└───────────┼───────────────────────────┼──────────────────────────┼────────────────┘
            │                           │                          │
            └───────────────────────────┼──────────────────────────┘
                                       ▼
┌─────────────────────────────── GATEWAY LAYER ──────────────────────────────────┐
│                                                                                │
│                              [Load Balancer]                                   │
│                                    │                                           │
│                              [API Gateway]                                     │
│                                    │                                           │
│            ┌──────────┬───────────┴────────────┬──────────┐                   │
│   [Auth Middleware] [Rate Limiter] [Request Logger] [Error Handler]           │
│                                                                                │
└────────────────────────────────────────────────────────────────────────────────┘
            │           │            │             │
            └───────────┼────────────┼─────────────┘
                       ▼            ▼             ▼
┌─────────────────────────────── CORE SERVICES ──────────────────────────────────┐
│                                                                                │
│   ┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│   │ AI Gateway  │    │Auth Service  │    │Memory Service│    │Project Service│ │
│   │  (3001)    │    │   (3002)     │    │   (3003)     │    │    (3005)     │ │
│   └─────┬───────┘    └──────┬───────┘    └──────┬───────┘    └──────┬───────┘ │
│         │                   │                    │                    │         │
└─────────┼───────────────────┼────────────────────┼────────────────────┼─────────┘
          │                   │                    │                    │
          ▼                   ▼                    ▼                    ▼
┌─────────────────────────────── AI SERVICES ───────────────────────────────────┐
│                                                                               │
│    ┌────────────────┐   ┌────────────────┐   ┌────────────────┐              │
│    │LLM Orchestrator│   │  Agent System  │   │ Code Analyzer  │              │
│    └────────┬───────┘   └───────┬────────┘   └───────┬────────┘              │
│             │                    │                    │                        │
│             └──────────┬─────────┴──────────┬────────┘                        │
│                       │                     │                                 │
│                       ▼                     ▼                                 │
│                 [Memory Bank]         [Code Context]                          │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
          │                   │                    │                    │
          ▼                   ▼                    ▼                    ▼
┌─────────────────────────── STORAGE LAYER ────────────────────────────────────┐
│                                                                              │
│   ┌─────────────┐    ┌──────────────┐    ┌──────────────┐                   │
│   │  PostgreSQL │    │    Redis     │    │    Qdrant    │                   │
│   │  (Primary)  │    │(Cache/Stream)│    │   (Vector)   │                   │
│   └─────────────┘    └──────────────┘    └──────────────┘                   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Client Layer
- **Next.js Web App**: Main web interface
  - React components
  - Server-side rendering
  - API integration

- **VS Code Extension**: IDE integration
  - Code analysis
  - AI assistance
  - Project management

- **CLI Tool**: Command-line interface
  - Quick commands
  - System management
  - Development tools

### 2. Gateway Layer
- **Load Balancer**: Request distribution
  - Health checks
  - Traffic routing
  - Failover handling

- **API Gateway (8080)**: Central entry point
  - Request routing
  - Protocol translation
  - Rate limiting
  - Authentication

### 3. Core Services
- **AI Gateway (3001)**
  - AI model orchestration
  - Agent management
  - Response generation
  - Code analysis coordination

- **Auth Service (3002)**
  - User authentication
  - Session management
  - Permission control
  - OAuth integration

- **Memory Service (3003)**
  - Vector storage management
  - Embedding generation
  - Context retrieval
  - RAG operations

- **Project Service (3005)**
  - Project management
  - Code repository integration
  - Analysis coordination
  - Progress tracking

### 4. AI Services
- **LLM Orchestrator**
  - Model selection
  - Context management
  - Response generation
  - Performance optimization

- **Agent System**
  - Task distribution
  - Agent coordination
  - Context sharing
  - Result aggregation

- **Code Analyzer**
  - Static analysis
  - Pattern recognition
  - Suggestion generation
  - Quality assessment

### 5. Storage Layer
- **PostgreSQL**
  - User data
  - Project information
  - System configuration
  - Relationship management

- **Redis**
  - Session cache
  - Message streams
  - Real-time data
  - Task queues

- **Qdrant**
  - Vector embeddings
  - Semantic search
  - Context storage
  - Similarity matching

## Data Flow Examples

### 1. Code Analysis Request
```
User (VS Code) → API Gateway → AI Gateway → Code Analyzer
                                 ↓
                             Memory Bank ← Qdrant
                                 ↓
                             Response → User
```

### 2. Authentication Flow
```
User → API Gateway → Auth Service → PostgreSQL
                         ↓
                      Redis (Session)
                         ↓
                    JWT → User
```

### 3. Project Analysis
```
User → API Gateway → Project Service → GitHub API
                         ↓
                    AI Gateway → LLM Orchestrator
                         ↓
                    Memory Service → Qdrant
                         ↓
                    Response → User
```

## Scaling Points

### Horizontal Scaling
- API Gateway instances
- Core service replicas
- Database read replicas

### Vertical Scaling
- Database resources
- AI processing power
- Memory allocation

### Caching Strategy
- Client-side caching
- API response cache
- Database query cache
- Vector embedding cache

## Security Measures

### Authentication
- JWT tokens
- OAuth integration
- Session management

### Authorization
- Role-based access
- Resource permissions
- Service-level auth

### Data Protection
- Encryption at rest
- Secure communications
- Rate limiting
- Input validation

## Monitoring Points

### System Health
- Service status
- Resource usage
- Error rates
- Response times

### Performance
- Request latency
- Cache hit rates
- Database performance
- AI model performance

### Security
- Authentication attempts
- Rate limit breaches
- Error patterns
- Access logs

This blueprint provides a clear view of DevMentor's architecture, making it easy to:
1. Understand component relationships
2. Identify data flows
3. Plan scaling strategies
4. Implement security measures
5. Set up monitoring
## Infrastructure Layer (DNS & Load Balancing)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        INFRASTRUCTURE LAYER                         │
│                                                                     │
│  ┌─────────────────┐                                               │
│  │       DNS       │                                               │
│  │   Management    │                                               │
│  └────────┬────────┘                                               │
│           │                                                         │
│           ▼                                                         │
│  ┌─────────────────┐                                               │
│  │      CDN /      │                                               │
│  │   Edge Cache    │                                               │
│  └────────┬────────┘                                               │
│           │                                                         │
│           ▼                                                         │
│  ┌─────────────────┐                                               │
│  │  Load Balancer  │                                               │
│  │                 │                                               │
│  │  • Round-robin  │                                               │
│  │  • Health check │                                               │
│  │  • Failover     │                                               │
│  └────────┬────────┘                                               │
│           │                                                         │
└───────────┼─────────────────────────────────────────────────────────┘
            │
            ▼
```

## API Gateway Layer

```
┌─────────────────────────────────────────────────────────────────────┐
│                          API GATEWAY LAYER                          │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    API Gateway (Port 8080)                  │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                             │                                       │
│         ┌───────────────────┼───────────────────┐                  │
│         │                   │                   │                  │
│         ▼                   ▼                   ▼                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │     Auth     │  │    Rate      │  │   Request    │            │
│  │  Middleware  │  │   Limiter    │  │    Logger    │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Core Services Layer

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CORE SERVICES LAYER                             │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │   AI Gateway     │  │   Auth Service   │  │  Memory Service  │          │
│  │   Port: 3001     │  │   Port: 3002     │  │   Port: 3003     │          │
│  │                  │  │                  │  │                  │          │
│  │ • AI Orchestr.   │  │ • User Auth      │  │ • Vector Storage │          │
│  │ • Agent Mgmt     │  │ • JWT Tokens     │  │ • RAG Operations │          │
│  │ • Response Gen   │  │ • OAuth          │  │ • Embeddings     │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                                                                              │
│                        ┌──────────────────┐                                 │
│                        │  Project Service │                                 │
│                        │   Port: 3005     │                                 │
│                        │                  │                                 │
│                        │ • Project Mgmt   │                                 │
│                        │ • Code Repo Int. │                                 │
│                        │ • Analysis Coord │                                 │
│                        └──────────────────┘                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## AI Services Layer

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                               AI SERVICES LAYER                               │
│                                                                               │
│   ┌─────────────────────┐              ┌─────────────────────┐               │
│   │   LLM Orchestrator  │              │    Agent System     │               │
│   │                     │              │                     │               │
│   │ • Model Selection   │              │ • Task Distribution │               │
│   │ • Context Mgmt      │◄────────────►│ • Agent Coordination│               │
│   │ • Response Gen      │              │ • Result Aggregation│               │
│   └──────────┬──────────┘              └──────────┬──────────┘               │
│              │                                     │                          │
│              └──────────────┬──────────────────────┘                          │
│                            │                                                  │
│                            ▼                                                  │
│              ┌──────────────────────────┐                                    │
│              │      Memory Bank         │                                    │
│              │                          │                                    │
│              │ • Long-term Context      │                                    │
│              │ • Shared Knowledge       │                                    │
│              │ • Context Persistence    │                                    │
│              └──────────────────────────┘                                    │
│                            ▲                                                  │
│                            │                                                  │
│              ┌──────────────────────────┐                                    │
│              │     Code Analyzer        │                                    │
│              │                          │                                    │
│              │ • Static Analysis        │                                    │
│              │ • Pattern Recognition    │                                    │
│              │ • Quality Assessment     │                                    │
│              └──────────────────────────┘                                    │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

## Storage Layer

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                              STORAGE LAYER                                    │
│                                                                               │
│   ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│   │     PostgreSQL       │  │        Redis         │  │      Qdrant       │  │
│   │   Primary Database   │  │   Cache & Streams    │  │  Vector Database  │  │
│   │                      │  │                      │  │                   │  │
│   │ ┌──────────────────┐ │  │ ┌──────────────────┐ │  │ ┌───────────────┐ │  │
│   │ │   User Data      │ │  │ │  Session Cache   │ │  │ │ Vector        │ │  │
│   │ ├──────────────────┤ │  │ ├──────────────────┤ │  │ │ Embeddings    │ │  │
│   │ │   Project Info   │ │  │ │  Message Streams │ │  │ ├───────────────┤ │  │
│   │ ├──────────────────┤ │  │ ├──────────────────┤ │  │ │ Semantic      │ │  │
│   │ │   System Config  │ │  │ │  Real-time Data  │ │  │ │ Search        │ │  │
│   │ ├──────────────────┤ │  │ ├──────────────────┤ │  │ ├───────────────┤ │  │
│   │ │   Relationships  │ │  │ │  Task Queues     │ │  │ │ Context Store │ │  │
│   │ └──────────────────┘ │  │ └──────────────────┘ │  │ └───────────────┘ │  │
│   └──────────────────────┘  └──────────────────────┘  └──────────────────┘  │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

## User Interfaces Layer

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACES LAYER                               │
│                                                                               │
│   ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│   │   Next.js Web App    │  │  VS Code Extension   │  │     CLI Tool      │  │
│   │                      │  │                      │  │                   │  │
│   │ • React Components   │  │ • Code Analysis      │  │ • Quick Commands  │  │
│   │ • Server-side Render │  │ • AI Assistance      │  │ • System Mgmt     │  │
│   │ • API Integration    │  │ • Project Management │  │ • Dev Tools       │  │
│   │                      │  │                      │  │                   │  │
│   │  [Browser-based UI]  │  │   [IDE Integration]  │  │  [Terminal App]   │  │
│   └───────────┬──────────┘  └───────────┬──────────┘  └─────────┬────────┘  │
│               │                          │                        │           │
│               └──────────────────────────┼────────────────────────┘           │
│                                         │                                     │
└─────────────────────────────────────────┼─────────────────────────────────────┘
                                          │
                                          ▼
                                    [API Gateway]
```

## Key Components

### 1. DNS & Load Balancing
- DNS management
- CDN/Edge caching for static assets
- Load balancer for request distribution

### 2. API Gateway (Port 8080)
- Central entry point for all requests
- Authentication middleware
- Rate limiting
- Request logging
- Route distribution

### 3. Core Services
- **AI Gateway (3001)**: AI orchestration and agent management
- **Auth Service (3002)**: User authentication and authorization
- **Memory Service (3003)**: Vector storage and RAG operations
- **Project Service (3005)**: Project management and analysis

### 4. AI Services
- LLM Orchestrator: Manages AI model interactions
- Agent System: Autonomous AI agents for different tasks
- Memory Bank: Long-term context storage
- Code Analyzer: Code analysis and suggestions

### 5. Storage Layer
- **PostgreSQL**: Primary relational database
- **Redis**: Caching and message streams
- **Qdrant**: Vector database for embeddings

### 6. User Interfaces
- Next.js Web Application
- VS Code Extension
- CLI Tool

## Key Features

### Load Balancing
- Round-robin distribution
- Health checks
- Automatic failover
- Session persistence

### Caching Strategy
- CDN for static assets
- Redis for application cache
- Distributed caching
- Cache invalidation protocols

### Security
- JWT authentication
- Role-based access control
- Rate limiting
- Request validation
- SSL/TLS encryption

### Scalability
- Horizontal scaling of services
- Message queues for async operations
- Distributed caching
- Load balancing

### Monitoring
- Request logging
- Performance metrics
- Error tracking
- System health monitoring

## Data Flow

1. **Request Initiation**
   - Client makes request through DNS
   - Request routed through CDN/Load Balancer
   - API Gateway receives request

2. **Request Processing**
   - Authentication/Authorization check
   - Rate limiting verification
   - Route to appropriate service

3. **Service Execution**
   - Service processes request
   - Interacts with databases/cache
   - Returns response

4. **Response Delivery**
   - Response processed through API Gateway
   - Delivered back to client
   - Cached if applicable

## Scaling Considerations

### Horizontal Scaling
- Services can be scaled independently
- Container orchestration ready
- Stateless design

### Vertical Scaling
- Database optimization
- Cache utilization
- Resource allocation

### Bottleneck Prevention
- Rate limiting
- Cache strategies
- Async processing
- Load distribution

## Deployment Architecture

### Development
- Local Docker environment
- Mock services
- Development databases

### Staging
- Kubernetes cluster
- Reduced replicas
- Test data

### Production
- Full Kubernetes deployment
- Multiple replicas
- High availability
- Disaster recovery

## Future Considerations

1. **Service Mesh Integration**
   - Enhanced service discovery
   - Better traffic management
   - Advanced monitoring

2. **Additional AI Capabilities**
   - More specialized agents
   - Enhanced code analysis
   - Improved context understanding

3. **Enhanced Scalability**
   - Global distribution
   - More edge locations
   - Enhanced caching strategies

4. **Advanced Monitoring**
   - APM integration
   - Enhanced logging
   - Better analytics
{% endraw %}
