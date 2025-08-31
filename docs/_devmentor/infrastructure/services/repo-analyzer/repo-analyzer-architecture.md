---
layout: product
title: repo-analyzer-architecture
product: DevMentor
source: infrastructure/services/repo-analyzer/repo-analyzer-architecture.md
---

{% raw %}
# Repository Analyzer Service System Design

```
                    DevMentor Repository Analyzer Architecture
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
                    │  Repo Analyzer 1     │              │ Repo Analyzer 2  │
                    │      (Port 3007)     │              │   (Port 3007)   │
                    └──────────────────────┘              └─────────────────┘
                          Control │ Data                         │
                                  ▼                              │
     ┌──────────────────────────────────────────────────────────┼────────────┐
     │                                                           │            │
     │  ┌─────────────────────────────────────────────────────────────────┐  │
     │  │                  REPO ANALYZER CORE                             │  │
     │  │                                                                 │  │
     │  │  ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
     │  │  │     AST     │        │  Dependency │       │   Security  │ │  │
┌────────┐ │   Parser    │        │   Analyzer  │       │   Scanner   │ │  │
│  Git   │ └─────────────┘        └─────────────┘       └─────────────┘ │  │
│ Client │                                                                │  │
└────────┘ ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
     │     │    Code     │        │  Complexity │       │   Tech      │ │  │
┌────────┐ │   Quality   │        │   Metrics   │       │   Stack     │ │  │
│ GitHub │ │   Analyzer  │        │             │       │  Detector   │ │  │
│  API   │ └─────────────┘        └─────────────┘       └─────────────┘ │  │
└────────┘                                                                │  │
     │     ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
┌────────┐ │  Test       │        │Documentation│       │  Pattern    │ │  │
│ GitLab │ │  Coverage   │        │  Generator  │       │ Recognition │ │  │
│  API   │ └─────────────┘        └─────────────┘       └─────────────┘ │  │
└────────┘                                                                │  │
     │     ┌─────────────┐        ┌─────────────┐       ┌─────────────┐ │  │
┌────────┐ │Performance  │        │    Task     │       │  Refactor   │ │  │
│Bitbucket│ │  Hotspot   │        │  Suggester  │       │ Suggestions │ │  │
│  API   │ └─────────────┘        └─────────────┘       └─────────────┘ │  │
└────────┘ └─────────────────────────────────────────────────────────────┘  │
     ▲                                                                       │
     │                            ┌──────────────┐                          │
     │     ┌──────────────┐      │              │      ┌──────────────┐    │
     │     │              │◄──────│   Analysis   │─────►│              │    │
     │     │   Language   │       │ Orchestrator │      │     AI       │    │
     │     │   Detectors  │       │              │      │  Insights    │    │
     │     │              │       └──────────────┘      │              │    │
     │     └──────────────┘              ▲              └──────────────┘    │
     │            │                      │                      │           │
     │            │              Repository Analysis            │           │
     │            │                      │                      │           │
     │            ▼                      ▼                      ▼           │
     │  ┌─────────────────────────────────────────────────────────────┐    │
     │  │                                                             │    │
     │  │                   🔍 Code Analysis Engine 🔍               │    │
     │  │            (Static Analysis, Dynamic Analysis)              │    │
     │  │                                                             │    │
     │  └─────────────────────────────────────────────────────────┘    │
     │            │                                              │           │
     │            │                                              │           │
     └────────────┼──────────────────────────────────────────────┼──────────┘
                  │                                              │
                  ▼                                              ▼
     ┌────────────────────────────┐                ┌─────────────────────────┐
     │                            │                │                         │
     │    Static Analysis         │                │   AI-Powered Analysis  │
     │       Pipeline             │                │       Pipeline          │
     │                            │                │                         │
     └────────────────────────────┘                └─────────────────────────┘
                  │                                              │
                  │                                              │
     ┌────────────┼────────────┐                   ┌────────────┼────────────┐
     │            │            │                   │            │            │
     ▼            ▼            ▼                   ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐      ┌──────────┐ ┌──────────┐ ┌──────────┐
│          │ │          │ │          │      │   Code   │ │  Issue   │ │  Task    │
│   AST    │ │  Lint    │ │ Security │      │  Smell   │ │Prediction│ │Generation│
│  Trees   │ │  Results │ │ Findings │      │Detection │ │          │ │          │
│          │ │          │ │          │      │          │ │          │ │          │
└──────────┘ └──────────┘ └──────────┘      └──────────┘ └──────────┘ └──────────┘
     │            │            │                   │            │            │
     └────────────┼────────────┘                   └────────────┼────────────┘
                  │                                              │
                  ▼                                              ▼
     ┌────────────────────────────┐                ┌─────────────────────────┐
     │  🗄️ Analysis Database      │                │  📊 Metrics Storage     │
     │                            │                │                         │
     │  • Repository Metadata     │                │  • Code Metrics         │
     │  • Dependency Graphs       │                │  • Quality Scores       │
     │  • Code Snapshots          │                │  • Tech Debt Tracking   │
     │  • Analysis History        │                │  • Performance Metrics  │
     │  • Security Vulnerabilities│                │  • Complexity Trends    │
     └────────────────────────────┘                └─────────────────────────┘
                  │                                              │
                  └──────────────────┬───────────────────────────┘
                                     │
                                     ▼
                  ┌──────────────────────────────────────┐
                  │                                      │
                  │      Code Intelligence Engine        │
                  │                                      │
                  │   (Pattern Learning, Suggestions)    │
                  │                                      │
                  └──────────────────────────────────────┘
                           │                    │
                           ▼                    ▼
                  ┌──────────────┐     ┌──────────────┐
                  │              │     │              │
                  │   Pattern    │     │   Task       │
                  │   Database   │     │  Generator   │
                  │              │     │              │
                  └──────────────┘     └──────────────┘
                           │                    │
                           └────────┬───────────┘
                                    │
                                    ▼
                           ┌──────────────┐
                           │              │
                           │  Suggested   │
                           │    Tasks     │
                           │              │
                           └──────────────┘
                                    │
                                    │ Output
                                    ▼
                           ┌──────────────┐
                           │              │
                           │   Analysis   │─────────────────┐
                           │    Report    │                 │
                           └──────────────┘                 │
                                    │                       ▼
                                    │              ┌──────────────┐
                                    │              │  Automated   │
                                    └─────────────►│  PR Creation │
                                                   │              │
                                                   └──────────────┘


┌──────────────────────────────────────────────────────────────────────┐
│                         Service Components                           │
├───────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  🔍 Code Analysis                                                   │
│  ├── Abstract Syntax Tree (AST) Parsing                             │
│  ├── Static Code Analysis                                           │
│  ├── Cyclomatic Complexity Calculation                              │
│  ├── Code Duplication Detection                                     │
│  └── Design Pattern Recognition                                     │
│                                                                      │
│  🔐 Security Analysis                                               │
│  ├── Vulnerability Scanning (OWASP Top 10)                          │
│  ├── Dependency Vulnerability Check                                 │
│  ├── Secret Detection                                               │
│  ├── License Compliance                                             │
│  └── Security Best Practices Validation                             │
│                                                                      │
│  📊 Quality Metrics                                                 │
│  ├── Code Coverage Analysis                                         │
│  ├── Technical Debt Calculation                                     │
│  ├── Maintainability Index                                          │
│  ├── Code Smell Detection                                           │
│  └── Documentation Coverage                                         │
│                                                                      │
│  🤖 AI-Powered Features                                            │
│  ├── Intelligent Task Suggestions                                   │
│  ├── Automated Refactoring Recommendations                          │
│  ├── Performance Optimization Hints                                 │
│  ├── Bug Prediction                                                 │
│  └── Auto-documentation Generation                                  │
│                                                                      │
│  🔄 Integration Points                                              │
│  ├── Git Repositories (GitHub, GitLab, Bitbucket)                   │
│  ├── AI Gateway (Port 3001)                                        │
│  ├── Project Service (Port 3004)                                    │
│  └── PBML Service (Port 3008)                                       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                         Data Flow Patterns                           │
├───────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Repository Analysis Flow:                                          │
│  Git Clone/Pull → Language Detection → AST Generation               │
│     ↓                                                               │
│  Static Analysis → Metrics Collection → Pattern Recognition         │
│     ↓                                                               │
│  AI Enhancement → Report Generation → Task Suggestions              │
│                                                                      │
│  Security Scan Flow:                                                │
│  Code Scan → Vulnerability Detection → Dependency Check             │
│     ↓                                                               │
│  Secret Detection → License Check → Security Report                 │
│                                                                      │
│  Task Generation Flow:                                              │
│  Code Analysis → Issue Detection → Priority Scoring                 │
│     ↓                                                               │
│  Task Creation → Assignment Suggestion → Project Integration        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## System Components Legend

| Component | Description | Technology |
|-----------|-------------|------------|
| 🖥️ Client | Developer Tools | VS Code, CLI |
| ◇ Load Balancer | Traffic Distribution | NGINX/HAProxy |
| 🔍 Analysis | Code Analysis Engine | AST Parser |
| 🔐 Security | Vulnerability Scanner | Snyk/OWASP |
| 📊 Metrics | Code Quality Metrics | SonarQube |
| 🤖 AI | Intelligence Engine | Python/TensorFlow |
| 🗄️ Database | Analysis Storage | PostgreSQL |
| 📁 Repository | Version Control | Git |

## Service Ports & Endpoints

- **Repo Analyzer**: Port 3007
- **Health Check**: `/health`
- **Analyze Repo**: `/api/analyzer/scan`
- **Tech Stack**: `/api/analyzer/tech-stack`
- **Dependencies**: `/api/analyzer/dependencies`
- **Security Scan**: `/api/analyzer/security`
- **Metrics**: `/api/analyzer/metrics`
- **Task Suggestions**: `/api/analyzer/suggest-tasks`
{% endraw %}
