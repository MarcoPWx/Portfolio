---
layout: product
title: memory-service-architecture
product: DevMentor
source: infrastructure/services/memory-service/memory-service-architecture.md
---

{% raw %}
# Memory Service System Design

```
                    DevMentor Memory Service Architecture
                                                                    DesignGurus.io
                              Client
                                🖥️
                          ────────────────
                                │
                                ▼
                         ◇─────────────◇
                        ╱  Load         ╲
                       ╱   Balancer      ╲───────────────────────────┐
                      ╱                   ╲                          │
                     ◇─────────────────────◇                         │
                                │                                    │
                                ▼                                    ▼
                    ┌──────────────────────┐              ┌─────────────────┐
                    │  Memory Service 1    │              │ Memory Service 2 │
                    │      (Port 3003)     │              │   (Port 3003)   │
                    └──────────────────────┘              └─────────────────┘
                          Control │ Data                         │
                                  ▼                              │
     ┌──────────────────────────────────────────────────────────┼────────────┐
     │                                                           │            │
     │  ┌─────────────────────────────────────────────────────────────────┐  │
     │  │                   MEMORY SERVICE CORE                           │  │
     │  │                                                                 │  │
     │  │  ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
     │  │  │Notification │        │ Rate Limiter│       │   CORS      │ │  │
┌────────┐ │  Service    │        │             │       │   Handler   │ │  │
│Search  │ └─────────────┘        └─────────────┘       └─────────────┘ │  │
│Index   │                                                                │  │
│(Elastic│ ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
│Search) │ │Memory Store │        │Context Manager│      │   Caching   │ │  │
└────────┘ │   Handler   │        │             │       │   Layer     │ │  │
     │     └─────────────┘        └─────────────┘       └─────────────┘ │  │
┌────────┐                                                                │  │
│ Cache  │ ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
│(Redis) │ │  Monitoring │        │   Logging   │       │   Tracing   │ │  │
└────────┘ │             │        │  (Winston)  │       │(OpenTelemetry│ │  │
     │     └─────────────┘        └─────────────┘       └─────────────┘ │  │
┌────────┐                                                                │  │
│Storage │ ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
│(S3/GCS)│ │ Serverless  │        │  Memory     │       │   Vector    │ │  │
└────────┘ │  Functions  │        │  Retrieval  │       │  Embeddings │ │  │
     ▲     └─────────────┘        └─────────────┘       └─────────────┘ │  │
     │     └─────────────────────────────────────────────────────────────┘  │
     │                                                                       │
     │                            ┌──────────────┐                          │
     │     ┌──────────────┐      │              │      ┌──────────────┐    │
     │     │              │◄──────│   Memory     │─────►│              │    │
     │     │  Short-term  │       │ Orchestrator │      │  Long-term   │    │
     │     │   Memory     │       │              │      │   Memory     │    │
     │     │              │       └──────────────┘      │              │    │
     │     └──────────────┘              ▲              └──────────────┘    │
     │            │                      │                      │           │
     │            │              Memory Consolidation           │           │
     │            │                      │                      │           │
     │            ▼                      ▼                      ▼           │
     │  ┌─────────────────────────────────────────────────────────────┐    │
     │  │                                                             │    │
     │  │                    🧠 Memory Layer 🧠                      │    │
     │  │               (Working, Episodic, Semantic)                │    │
     │  │                                                             │    │
     │  └─────────────────────────────────────────────────────────┘    │
     │            │                                              │           │
     │            │                                              │           │
     └────────────┼──────────────────────────────────────────────┼──────────┘
                  │                                              │
                  ▼                                              ▼
     ┌────────────────────────────┐                ┌─────────────────────────┐
     │                            │                │                         │
     │     Context Processing     │                │    Memory Indexing      │
     │         Pipeline           │                │       Pipeline          │
     │                            │                │                         │
     └────────────────────────────┘                └─────────────────────────┘
                  │                                              │
                  │                                              │
     ┌────────────┼────────────┐                   ┌────────────┼────────────┐
     │            │            │                   │            │            │
     ▼            ▼            ▼                   ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐      ┌──────────┐ ┌──────────┐ ┌──────────┐
│          │ │          │ │          │      │  Vector  │ │  Graph   │ │  Time    │
│  User    │ │  Project │ │  Code    │      │Embeddings│ │Relations │ │ Series   │
│ Context  │ │  Context │ │ Context  │      │  Store   │ │  Store   │ │  Store   │
│          │ │          │ │          │      │          │ │          │ │          │
└──────────┘ └──────────┘ └──────────┘      └──────────┘ └──────────┘ └──────────┘
     │            │            │                   │            │            │
     └────────────┼────────────┘                   └────────────┼────────────┘
                  │                                              │
                  ▼                                              ▼
     ┌────────────────────────────┐                ┌─────────────────────────┐
     │  🗄️ PostgreSQL Database    │                │  📊 Analytics Storage   │
     │                            │                │                         │
     │  • User Memories           │                │  • Memory Usage Stats   │
     │  • Project Memories        │                │  • Retrieval Patterns   │
     │  • Code Snippets           │                │  • Context Analytics    │
     │  • Learning Patterns       │                │  • Performance Metrics  │
     │  • Conversation History    │                │                         │
     └────────────────────────────┘                └─────────────────────────┘
                  │                                              │
                  └──────────────────┬───────────────────────────┘
                                     │
                                     ▼
                  ┌──────────────────────────────────────┐
                  │                                      │
                  │     Memory Processing System         │
                  │                                      │
                  │  (Consolidation, Pruning, Indexing)  │
                  │                                      │
                  └──────────────────────────────────────┘
                           │                    │
                           ▼                    ▼
                  ┌──────────────┐     ┌──────────────┐
                  │              │     │              │
                  │   Memory     │     │   Memory     │
                  │Consolidation │     │   Pruning    │
                  │              │     │              │
                  └──────────────┘     └──────────────┘
                           │                    │
                           └────────┬───────────┘
                                    │
                                    ▼
                           ┌──────────────┐
                           │              │
                           │   Knowledge  │
                           │    Graph     │
                           │              │
                           └──────────────┘
                                    │
                                    │ Output
                                    ▼
                           ┌──────────────┐
                           │              │
                           │   Context    │─────────────────┐
                           │   Output     │                 │
                           └──────────────┘                 │
                                    │                       ▼
                                    │              ┌──────────────┐
                                    │              │  Learning    │
                                    └─────────────►│  Insights    │
                                                   │  Generation  │
                                                   └──────────────┘


┌──────────────────────────────────────────────────────────────────────┐
│                         Service Components                           │
├───────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  🧠 Memory Management                                               │
│  ├── Working Memory (Active Context)                                │
│  ├── Short-term Memory (Session Data)                               │
│  ├── Long-term Memory (Persistent Storage)                          │
│  ├── Episodic Memory (Event Sequences)                              │
│  └── Semantic Memory (Facts & Concepts)                             │
│                                                                      │
│  📊 Monitoring & Observability                                      │
│  ├── OpenTelemetry Tracing                                         │
│  ├── Prometheus Metrics                                            │
│  ├── Winston Logging                                               │
│  └── Memory Usage Analytics                                         │
│                                                                      │
│  🔍 Search & Retrieval                                              │
│  ├── Vector Similarity Search                                       │
│  ├── Semantic Search (Embeddings)                                   │
│  ├── Temporal Search (Time-based)                                   │
│  ├── Graph Traversal (Relations)                                    │
│  └── Full-text Search                                               │
│                                                                      │
│  ⚡ Performance Optimization                                        │
│  ├── Redis Memory Caching                                          │
│  ├── LRU Cache Management                                           │
│  ├── Memory Consolidation                                          │
│  └── Automatic Pruning                                              │
│                                                                      │
│  🔄 Integration Points                                              │
│  ├── AI Gateway (Port 3001)                                        │
│  ├── Auth Service (Port 3002)                                      │
│  ├── Project Service (Port 3004)                                   │
│  └── Learning Engine (Port 3005)                                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                         Data Flow Patterns                           │
├───────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Memory Storage Flow:                                               │
│  Client → Load Balancer → Memory Service → Validate                 │
│     ↓                                                               │
│  Categorize → Generate Embeddings → Store → Index                   │
│     ↓                                                               │
│  Update Graph → Cache → Return Confirmation                         │
│                                                                      │
│  Memory Retrieval Flow:                                             │
│  Query → Parse Intent → Search Strategy Selection                   │
│     ↓                                                               │
│  Execute Search → Rank Results → Filter → Return Context            │
│                                                                      │
│  Memory Consolidation Flow:                                         │
│  Scheduled Job → Identify Patterns → Merge Similar                  │
│     ↓                                                               │
│  Update Relations → Prune Obsolete → Reindex → Complete             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## System Components Legend

| Component | Description | Technology |
|-----------|-------------|------------|
| 🖥️ Client | Web/Mobile/CLI Applications | React, Mobile Apps |
| ◇ Load Balancer | Traffic Distribution | NGINX/HAProxy |
| 🧠 Memory Store | Context Storage | PostgreSQL/MongoDB |
| 🔍 Search | Memory Retrieval | ElasticSearch |
| 📊 Analytics | Usage Tracking | Prometheus/Grafana |
| 🗄️ Vector Store | Embeddings | Pinecone/Weaviate |
| ⚡ Cache | Fast Access | Redis |
| 🔄 Graph | Relations | Neo4j |

## Service Ports & Endpoints

- **Memory Service**: Port 3003
- **Health Check**: `/health`
- **Store Memory**: `/memory/store`
- **Retrieve Memory**: `/memory/retrieve`
- **Search Memories**: `/memory/search`
- **Update Memory**: `/memory/update`
- **Delete Memory**: `/memory/delete`
- **Metrics**: `/metrics`
{% endraw %}
