---
layout: product
title: project-service-architecture
product: DevMentor
source: infrastructure/services/project-service/project-service-architecture.md
---

{% raw %}
# Project Service System Design

```
                    DevMentor Project Service Architecture
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
                    │  Project Service 1   │              │ Project Service 2│
                    │      (Port 3004)     │              │   (Port 3004)   │
                    └──────────────────────┘              └─────────────────┘
                          Control │ Data                         │
                                  ▼                              │
     ┌──────────────────────────────────────────────────────────┼────────────┐
     │                                                           │            │
     │  ┌─────────────────────────────────────────────────────────────────┐  │
     │  │                   PROJECT SERVICE CORE                          │  │
     │  │                                                                 │  │
     │  │  ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
     │  │  │Notification │        │ Rate Limiter│       │   CORS      │ │  │
┌────────┐ │  Service    │        │             │       │   Handler   │ │  │
│Search  │ └─────────────┘        └─────────────┘       └─────────────┘ │  │
│Index   │                                                                │  │
│(Elastic│ ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
│Search) │ │  Project    │        │   File      │       │   Caching   │ │  │
└────────┘ │  Manager    │        │  Manager    │       │   Layer     │ │  │
     │     └─────────────┘        └─────────────┘       └─────────────┘ │  │
┌────────┐                                                                │  │
│ Cache  │ ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
│(Redis) │ │  Monitoring │        │   Logging   │       │   Tracing   │ │  │
└────────┘ │             │        │  (Winston)  │       │(OpenTelemetry│ │  │
     │     └─────────────┘        └─────────────┘       └─────────────┘ │  │
┌────────┐                                                                │  │
│Storage │ ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
│(S3/GCS)│ │ Serverless  │        │   Code      │       │   Build     │ │  │
└────────┘ │  Functions  │        │  Analysis   │       │   System    │ │  │
     ▲     └─────────────┘        └─────────────┘       └─────────────┘ │  │
     │     └─────────────────────────────────────────────────────────────┘  │
     │                                                                       │
     │                            ┌──────────────┐                          │
     │     ┌──────────────┐      │              │      ┌──────────────┐    │
     │     │              │◄──────│   Project    │─────►│              │    │
     │     │    GitHub    │       │ Orchestrator │      │    GitLab    │    │
     │     │ Integration  │       │              │      │ Integration  │    │
     │     │              │       └──────────────┘      │              │    │
     │     └──────────────┘              ▲              └──────────────┘    │
     │            │                      │                      │           │
     │            │              Repository Sync                │           │
     │            │                      │                      │           │
     │            ▼                      ▼                      ▼           │
     │  ┌─────────────────────────────────────────────────────────────┐    │
     │  │                                                             │    │
     │  │                   📁 Project Repository 📁                  │    │
     │  │                 (Git, Files, Dependencies)                 │    │
     │  │                                                             │    │
     │  └─────────────────────────────────────────────────────────┘    │
     │            │                                              │           │
     │            │                                              │           │
     └────────────┼──────────────────────────────────────────────┼──────────┘
                  │                                              │
                  ▼                                              ▼
     ┌────────────────────────────┐                ┌─────────────────────────┐
     │                            │                │                         │
     │    Code Analysis Pipeline  │                │   Build & Test Pipeline │
     │                            │                │                         │
     └────────────────────────────┘                └─────────────────────────┘
                  │                                              │
                  │                                              │
     ┌────────────┼────────────┐                   ┌────────────┼────────────┐
     │            │            │                   │            │            │
     ▼            ▼            ▼                   ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐      ┌──────────┐ ┌──────────┐ ┌──────────┐
│          │ │          │ │          │      │  Docker  │ │  Test    │ │  Deploy  │
│ Projects │ │  Files   │ │  Tasks   │      │  Build   │ │  Runner  │ │  Config  │
│   Store  │ │  Store   │ │  Store   │      │  System  │ │          │ │  Store   │
│          │ │          │ │          │      │          │ │          │ │          │
└──────────┘ └──────────┘ └──────────┘      └──────────┘ └──────────┘ └──────────┘
     │            │            │                   │            │            │
     └────────────┼────────────┘                   └────────────┼────────────┘
                  │                                              │
                  ▼                                              ▼
     ┌────────────────────────────┐                ┌─────────────────────────┐
     │  🗄️ PostgreSQL Database    │                │  📊 Analytics Storage   │
     │                            │                │                         │
     │  • Projects Table          │                │  • Build Statistics     │
     │  • Files Metadata          │                │  • Code Metrics         │
     │  • Tasks & Issues          │                │  • Test Results         │
     │  • Dependencies            │                │  • Performance Data     │
     │  • Collaborators           │                │  • Usage Analytics      │
     └────────────────────────────┘                └─────────────────────────┘
                  │                                              │
                  └──────────────────┬───────────────────────────┘
                                     │
                                     ▼
                  ┌──────────────────────────────────────┐
                  │                                      │
                  │      CI/CD Processing Pipeline       │
                  │                                      │
                  │   (Jenkins, GitHub Actions, GitLab)  │
                  │                                      │
                  └──────────────────────────────────────┘
                           │                    │
                           ▼                    ▼
                  ┌──────────────┐     ┌──────────────┐
                  │              │     │              │
                  │    Build     │     │    Deploy    │
                  │   Scheduler  │     │   Manager    │
                  │              │     │              │
                  └──────────────┘     └──────────────┘
                           │                    │
                           └────────┬───────────┘
                                    │
                                    ▼
                           ┌──────────────┐
                           │              │
                           │  Container   │
                           │   Registry   │
                           │              │
                           └──────────────┘
                                    │
                                    │ Output
                                    ▼
                           ┌──────────────┐
                           │              │
                           │  Deployment  │─────────────────┐
                           │   Target     │                 │
                           └──────────────┘                 │
                                    │                       ▼
                                    │              ┌──────────────┐
                                    │              │  Monitoring  │
                                    └─────────────►│  Dashboard   │
                                                   │              │
                                                   └──────────────┘


┌──────────────────────────────────────────────────────────────────────┐
│                         Service Components                           │
├───────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  📁 Project Management                                              │
│  ├── Project Creation & Configuration                               │
│  ├── File System Management                                         │
│  ├── Dependency Management                                          │
│  ├── Task & Issue Tracking                                          │
│  └── Collaboration Tools                                            │
│                                                                      │
│  🔧 Development Tools                                               │
│  ├── Code Editor Integration                                        │
│  ├── Version Control (Git)                                          │
│  ├── Build System Integration                                       │
│  ├── Testing Framework                                              │
│  └── Debugging Tools                                                │
│                                                                      │
│  🚀 CI/CD Integration                                               │
│  ├── Automated Builds                                               │
│  ├── Test Automation                                                │
│  ├── Deployment Pipelines                                           │
│  ├── Container Management                                           │
│  └── Environment Configuration                                      │
│                                                                      │
│  📊 Analytics & Monitoring                                          │
│  ├── Code Quality Metrics                                           │
│  ├── Build Performance                                              │
│  ├── Test Coverage Reports                                          │
│  ├── Deployment Tracking                                            │
│  └── Resource Usage                                                 │
│                                                                      │
│  🔄 Integration Points                                              │
│  ├── AI Gateway (Port 3001)                                        │
│  ├── Auth Service (Port 3002)                                      │
│  ├── Memory Service (Port 3003)                                    │
│  └── Learning Engine (Port 3005)                                   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                         Data Flow Patterns                           │
├───────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Project Creation Flow:                                             │
│  Client → Load Balancer → Project Service → Validate                │
│     ↓                                                               │
│  Create Repo → Initialize Structure → Setup Dependencies            │
│     ↓                                                               │
│  Configure CI/CD → Index Files → Return Project ID                  │
│                                                                      │
│  Code Sync Flow:                                                    │
│  Git Push → Webhook → Project Service → Parse Changes               │
│     ↓                                                               │
│  Update Files → Run Analysis → Trigger Build → Update Status        │
│                                                                      │
│  Build & Deploy Flow:                                               │
│  Trigger Build → Clone Repo → Install Dependencies                  │
│     ↓                                                               │
│  Run Tests → Build Artifacts → Push Container → Deploy              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## System Components Legend

| Component | Description | Technology |
|-----------|-------------|------------|
| 🖥️ Client | Web/Mobile/CLI Applications | React, VS Code |
| ◇ Load Balancer | Traffic Distribution | NGINX/HAProxy |
| 📁 Repository | Code Storage | Git/GitHub/GitLab |
| 🔧 Build System | CI/CD Pipeline | Jenkins/Actions |
| 📊 Analytics | Project Metrics | Prometheus/Grafana |
| 🗄️ Database | Project Data | PostgreSQL |
| 🚀 Deploy | Deployment System | K8s/Docker |
| ⚡ Cache | Fast Access | Redis |

## Service Ports & Endpoints

- **Project Service**: Port 3004
- **Health Check**: `/health`
- **Create Project**: `/projects/create`
- **List Projects**: `/projects/list`
- **Get Project**: `/projects/:id`
- **Update Project**: `/projects/:id/update`
- **Build Project**: `/projects/:id/build`
- **Deploy Project**: `/projects/:id/deploy`
- **Metrics**: `/metrics`
{% endraw %}
