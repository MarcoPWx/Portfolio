---
layout: product
title: auth-service-architecture
product: DevMentor
source: infrastructure/services/auth-service/auth-service-architecture.md
---

{% raw %}
# Auth Service System Design

```
                    DevMentor Auth Service Architecture
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
                    │   API Gateway 1      │              │  API Gateway 2  │
                    │                      │              │                 │
                    └──────────────────────┘              └─────────────────┘
                          Control │ Data                         │
                                  ▼                              │
     ┌──────────────────────────────────────────────────────────┼────────────┐
     │                                                           │            │
     │  ┌─────────────────────────────────────────────────────────────────┐  │
     │  │                    AUTH SERVICE CORE                            │  │
     │  │                                                                 │  │
     │  │  ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
     │  │  │Notification │        │ Rate Limiter│       │   CORS      │ │  │
┌────────┐ │  Service    │        │             │       │   Handler   │ │  │
│Search  │ └─────────────┘        └─────────────┘       └─────────────┘ │  │
│Index   │                                                                │  │
│(Elastic│ ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
│Search) │ │Authentication│        │Authorization│       │   Caching   │ │  │
└────────┘ │   Handler   │        │   Handler   │       │   Layer     │ │  │
     │     └─────────────┘        └─────────────┘       └─────────────┘ │  │
┌────────┐                                                                │  │
│ Cache  │ ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
│(Redis) │ │  Monitoring │        │   Logging   │       │   Tracing   │ │  │
└────────┘ │             │        │  (Winston)  │       │(OpenTelemetry│ │  │
     │     └─────────────┘        └─────────────┘       └─────────────┘ │  │
┌────────┐                                                                │  │
│Storage │ ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
│(S3/GCS)│ │Serverless   │        │   Session   │       │    JWT      │ │  │
└────────┘ │  Functions  │        │  Management │       │   Handler   │ │  │
     ▲     └─────────────┘        └─────────────┘       └─────────────┘ │  │
     │     └─────────────────────────────────────────────────────────────┘  │
     │                                                                       │
     │                            ┌──────────────┐                          │
     │     ┌──────────────┐      │              │      ┌──────────────┐    │
     │     │              │◄──────│  Metadata    │─────►│              │    │
     │     │   GitHub     │       │   Server     │      │  User Data   │    │
     │     │   OAuth      │       │              │      │   Server     │    │
     │     │              │       └──────────────┘      │              │    │
     │     └──────────────┘              ▲              └──────────────┘    │
     │            │                      │                      │           │
     │            │              Read/Write metadata            │           │
     │            │                      │                      │           │
     │            ▼                      ▼                      ▼           │
     │  ┌─────────────────────────────────────────────────────────────┐    │
     │  │                                                             │    │
     │  │                     🔶 Cache Layer 🔶                      │    │
     │  │                    (Redis/Memcached)                       │    │
     │  │                                                             │    │
     │  └─────────────────────────────────────────────────────────┘    │
     │            │                                              │           │
     │            │                                              │           │
     └────────────┼──────────────────────────────────────────────┼──────────┘
                  │                                              │
                  ▼                                              ▼
     ┌────────────────────────────┐                ┌─────────────────────────┐
     │                            │                │                         │
     │     Directory-based        │                │    Distributed File     │
     │     Partitioning          │                │        Storage          │
     │                            │                │                         │
     └────────────────────────────┘                └─────────────────────────┘
                  │                                              │
                  │                                              │
     ┌────────────┼────────────┐                   ┌────────────┼────────────┐
     │            │            │                   │            │            │
     ▼            ▼            ▼                   ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐      ┌──────────┐ ┌──────────┐ ┌──────────┐
│          │ │          │ │          │      │  Image/  │ │  Video   │ │  Audit   │
│ Users    │ │ Sessions │ │  Teams   │      │Thumbnail │ │  Storage │ │   Logs   │
│   DB     │ │    DB    │ │    DB    │      │ Storage  │ │          │ │  Storage │
│          │ │          │ │          │      │          │ │          │ │          │
└──────────┘ └──────────┘ └──────────┘      └──────────┘ └──────────┘ └──────────┘
     │            │            │                   │            │            │
     └────────────┼────────────┘                   └────────────┼────────────┘
                  │                                              │
                  ▼                                              ▼
     ┌────────────────────────────┐                ┌─────────────────────────┐
     │   🗄️ PostgreSQL Database   │                │  📊 Analytics Storage   │
     │                            │                │                         │
     │  • Users Table             │                │  • Login Analytics      │
     │  • Sessions Table          │                │  • User Behavior        │
     │  • Teams Table             │                │  • Security Events      │
     │  • Permissions Table       │                │  • Performance Metrics  │
     │  • Audit Logs Table        │                │                         │
     └────────────────────────────┘                └─────────────────────────┘
                  │                                              │
                  └──────────────────┬───────────────────────────┘
                                     │
                                     ▼
                  ┌──────────────────────────────────────┐
                  │                                      │
                  │     Data Processing Pipeline         │
                  │                                      │
                  │  (Hadoop/MapReduce, Spark)          │
                  │                                      │
                  └──────────────────────────────────────┘
                           │                    │
                           ▼                    ▼
                  ┌──────────────┐     ┌──────────────┐
                  │              │     │              │
                  │ Distributed  │     │ Distributed  │
                  │  Scheduler   │     │   Workers    │
                  │              │     │              │
                  └──────────────┘     └──────────────┘
                           │                    │
                           └────────┬───────────┘
                                    │
                                    ▼
                           ┌──────────────┐
                           │              │
                           │    Data      │
                           │  Warehouse   │
                           │              │
                           └──────────────┘
                                    │
                                    │ Output
                                    ▼
                           ┌──────────────┐
                           │              │
                           │   Database   │─────────────────┐
                           │              │                 │
                           └──────────────┘                 │
                                    │                       ▼
                                    │              ┌──────────────┐
                                    │              │  Reports     │
                                    └─────────────►│  Viewing &   │
                                                   │  Analytics   │
                                                   └──────────────┘


┌──────────────────────────────────────────────────────────────────────┐
│                         Service Components                           │
├───────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  🔐 Authentication & Authorization                                  │
│  ├── JWT Token Management                                           │
│  ├── OAuth 2.0 Integration (GitHub)                                 │
│  ├── Role-Based Access Control (RBAC)                              │
│  ├── Session Management                                             │
│  └── Multi-Factor Authentication (MFA)                             │
│                                                                      │
│  📊 Monitoring & Observability                                      │
│  ├── OpenTelemetry Tracing                                         │
│  ├── Prometheus Metrics                                            │
│  ├── Winston Logging                                               │
│  └── Health Check Endpoints                                        │
│                                                                      │
│  🛡️ Security Features                                              │
│  ├── Bcrypt Password Hashing                                       │
│  ├── Rate Limiting (100 req/15min)                                │
│  ├── CSRF Protection                                               │
│  ├── Token Blacklisting                                            │
│  └── Audit Logging                                                 │
│                                                                      │
│  ⚡ Performance Optimization                                        │
│  ├── Redis Caching Layer                                           │
│  ├── Database Connection Pooling                                   │
│  ├── Horizontal Scaling (3 replicas)                              │
│  └── Load Balancing                                                │
│                                                                      │
│  🔄 Integration Points                                              │
│  ├── AI Gateway Service (Port 3001)                                │
│  ├── Memory Service (Port 3003)                                    │
│  ├── Email Service (SMTP)                                          │
│  └── GitHub API                                                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                         Data Flow Patterns                           │
├───────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  User Login Flow:                                                   │
│  Client → Load Balancer → API Gateway → Auth Service                │
│     ↓                                                               │
│  Validate Credentials (bcrypt) → Generate JWT → Store Session       │
│     ↓                                                               │
│  Cache in Redis → Log Event → Return Token                         │
│                                                                      │
│  GitHub OAuth Flow:                                                 │
│  Client → Request OAuth URL → Redirect to GitHub                    │
│     ↓                                                               │
│  User Authorizes → Callback → Exchange Code → Fetch Profile        │
│     ↓                                                               │
│  Create/Link Account → Generate JWT → Return Token                  │
│                                                                      │
│  Token Validation Flow:                                             │
│  Request with JWT → Check Blacklist → Verify Signature             │
│     ↓                                                               │
│  Check Expiration → Validate Permissions → Allow/Deny              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## System Components Legend

| Component | Description | Technology |
|-----------|-------------|------------|
| 🖥️ Client | Web/Mobile/CLI Applications | React, Mobile Apps |
| ◇ Load Balancer | Traffic Distribution | NGINX/HAProxy |
| 🔶 Cache | High-speed Data Cache | Redis/Memcached |
| 🗄️ Database | Persistent Storage | PostgreSQL |
| 📊 Analytics | Metrics & Reporting | Prometheus/Grafana |
| 🔐 Auth | Security Layer | JWT/OAuth 2.0 |
| ⚡ Workers | Background Processing | Node.js Workers |
| 🛡️ Security | Protection Layer | Helmet/CORS/Rate Limiting |

## Service Ports & Endpoints

- **Auth Service**: Port 3002
- **Health Check**: `/health`
- **API Base**: `/auth/*`
- **OAuth Callback**: `/auth/github/callback`
- **Metrics**: `/metrics`
{% endraw %}
