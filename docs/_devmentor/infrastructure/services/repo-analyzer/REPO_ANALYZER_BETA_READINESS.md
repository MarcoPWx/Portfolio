---
layout: product
title: REPO ANALYZER BETA READINESS
product: DevMentor
source: infrastructure/services/repo-analyzer/REPO_ANALYZER_BETA_READINESS.md
---

{% raw %}
Current architecture
# Repo Analyzer: From Code to Insights

**Owner:** @betolbook  
**Status:** In Development  
**Target:** Beta Release v0.2  
**Updated:** 2025-08-17  

## What is it?

Think of Repo Analyzer as "X-ray vision for code". It:
1. Looks at your code
2. Figures out how everything connects
3. Creates diagrams automatically
4. Finds problems
5. Suggests fixes

```
  YOUR CODE                REPO ANALYZER               WHAT YOU GET
     📦      ───────→    🔍 Analyze          ───────→  📊 Diagrams
  /src                    🔄 Process                   📝 Reports
  /tests                  🎯 Find Issues               ✅ Task List
  /docs                   🎨 Make Diagrams             🚨 Warnings
```

## How do you use it?

### 1. From DevMentor UI
```
Click "Analyze" ──→ Wait 30s ──→ Get Results
```

### 2. From Terminal
```bash
# Analyze current project
devmentor analyze .

# Analyze any GitHub repo
devmentor analyze github.com/user/repo
```

### 3. From CI/CD
```yaml
# In .github/workflows/analyze.yml
- name: Analyze Code
  uses: devmentor/repo-analyzer@v1
  with:
    path: .
    depth: full
```

## Real Example: What it finds

```
┌─────────────────────────────────────────────────────┐
│ ANALYZING: DevMentor Project                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│ 1. ARCHITECTURE ISSUES                             │
│    ❌ Circular Import: auth → project → memory → auth│
│    ❌ Hard-coded paths in repo-analyzer service      │
│    ✅ Good API structure                            │
│                                                     │
│ 2. SECURITY                                        │
│    ❌ Missing auth checks on /api/repo/analyze       │
│    ✅ Good password handling                        │
│    ✅ Proper JWT usage                              │
│                                                     │
│ 3. PERFORMANCE                                     │
│    ⚠️ Large file: src/components/RepoAnalyzer.tsx   │
│    ⚠️ Complex function: analyzeRepository()         │
│                                                     │
│ 4. SUGGESTED FIXES                                 │
│    1. Move shared code to common/auth.ts           │
│    2. Add auth middleware to repo endpoints        │
│    3. Split RepoAnalyzer into smaller components   │
└─────────────────────────────────────────────────────┘
```

## How it connects to everything

```
┌──────────────────────────────────────────────────────────┐
│                   DEVMENTOR SYSTEM                       │
│                                                          │
│            ┌────────────────┐                           │
│            │  UI DASHBOARD  │                           │
│            └────────────────┘                           │
│                    │                                     │
│            "Analyze Repo"                               │
│                    │                                     │
│                    ▼                                     │
│         ┌────────────────────┐                          │
│         │   REPO ANALYZER    │                          │
│         └────────────────────┘                          │
│           │      │      │                               │
│           ▼      ▼      ▼                               │
│  ┌─────────┐  ┌─────┐  ┌─────────┐                     │
│  │ MEMORY  │  │TASKS│  │DIAGRAMS │                     │
│  └─────────┘  └─────┘  └─────────┘                     │
│                                                          │
└──────────────────────────────────────────────────────────┘

1. UI: Click "Analyze"
2. Repo Analyzer: Does the work
3. Results go to:
   - Memory: Stores analysis
   - Tasks: Creates todo items
   - Diagrams: Saves visuals
```

## Examples of Tasks It Creates

```
TASK LIST
├── 🔥 HIGH PRIORITY
│   ├── Fix circular dependency in auth service
│   │   • Why: Causes memory leaks
│   │   • Where: services/auth/index.ts
│   │   • How: Extract shared code
│   │
│   └── Add missing auth checks
│       • Why: Security risk
│       • Where: api/repo/analyze
│       • How: Add auth middleware
│
├── ⚠️ MEDIUM PRIORITY
│   ├── Split large component
│   │   • Why: Hard to maintain
│   │   • Where: RepoAnalyzer.tsx
│   │   • How: Break into subcomponents
│   │
│   └── Add error handling
│       • Why: Better user experience
│       • Where: analysis service
│       • How: Try/catch blocks
│
└── 📝 LOW PRIORITY
    └── Add more tests
        • Why: Only 65% coverage
        • Where: repo analyzer
        • How: Write missing tests
```

## Integration by Example

### 1. UI Integration
```typescript
// In your React component:
function AnalyzeButton() {
  const analyze = async () => {
    // 1. Start analysis
    const results = await repoAnalyzer.analyze('./');
    
    // 2. Show results
    showDiagram(results.diagram);
    showIssues(results.issues);
    
    // 3. Create tasks
    if (results.suggestedTasks) {
      const tasks = await createTasks(results.suggestedTasks);
      showTaskList(tasks);
    }
  };
  
  return <Button onClick={analyze}>Analyze Repo</Button>;
}
```

### 2. Task Creation Integration
```typescript
// When analysis finds issues:
const task = {
  title: "Fix circular dependency in auth service",
  priority: "high",
  estimate: "2 hours",
  details: {
    problem: "Auth → Project → Memory → Auth cycle",
    impact: "Memory leaks, hard to test",
    fix: "Extract shared code to common/auth.ts"
  },
  files: ["services/auth/index.ts"]
};

// Creates task in your project system
await projectService.createTask(task);
```

### 3. Memory Integration
```typescript
// Store analysis results for later
await memoryService.store({
  type: "repo_analysis",
  repo: "devmentor",
  findings: results,
  timestamp: new Date(),
  tags: ["architecture", "security"]
});

// Can be searched later:
const pastAnalysis = await memoryService.search({
  type: "repo_analysis",
  tags: ["architecture"]
});
```

## What's Next for Beta?

```
BETA CHECKLIST
├── 🎯 MUST HAVE
│   ├── ⬜ Fix auth on all endpoints
│   ├── ⬜ Remove hardcoded paths
│   ├── ⬜ Add error handling
│   └── ⬜ Connect to real services
│
├── 💡 SHOULD HAVE
│   ├── ⬜ Progress indicators
│   ├── ⬜ Result caching
│   └── ⬜ Better logging
│
└── ✨ NICE TO HAVE
    ├── ⬜ Scheduled analysis
    └── ⬜ More languages
```

## Technical Details (if you're curious)

```
SUPPORTED NOW        COMING SOON
├── Languages        ├── Languages
│   ├── TypeScript  │   ├── Ruby
│   ├── JavaScript  │   ├── Rust
│   ├── Python      │   └── PHP
│   └── Go          │
│                   ├── Frameworks
├── Frameworks      │   ├── Rails
│   ├── React       │   ├── Laravel
│   ├── Next.js     │   └── Phoenix
│   └── Express     │
                    └── Databases
├── Databases          ├── Cassandra
│   ├── PostgreSQL    └── CouchDB
│   ├── MySQL
│   └── MongoDB
```

## Want to help?

1. Try it out: `devmentor analyze .`
2. Report issues you find
3. Suggest new features
4. Add support for more languages

Questions? Ask in #repo-analyzer channel!
The **Repo-Analyzer** is a standalone, containerized microservice that performs deep static analysis on source code repositories. Think of it as an "MRI machine for code" - it scans, analyzes, and visualizes the internal structure of any codebase without executing it.

### The Problem It Solves

**Without Repo Analyzer:**
- 🤯 New developers spend weeks trying to understand a codebase
- 📚 Documentation is always outdated or non-existent
- 🐛 Technical debt accumulates invisibly until it's too late
- 🔍 Code reviews miss architectural problems
- 💸 Refactoring is risky because nobody knows all the dependencies
- ⏰ Creating architecture diagrams manually takes days

**With Repo Analyzer:**
- 🚀 New developers understand the codebase in hours
- 📊 Auto-generated, always-current documentation
- 📈 Technical debt tracked and quantified continuously
- 🛡️ Architectural issues caught before merge
- ✅ Safe refactoring with complete dependency maps
- ⚡ Architecture diagrams generated in seconds

### What It Actually Does

```
┌─────────────────────────────────────────────────────────────────────┐
│                   REPO ANALYZER CAPABILITIES                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  INPUT                     PROCESSING                    OUTPUT      │
│  ─────                     ──────────                    ──────      │
│                                                                      │
│  GitHub URL       ──→   1. Clone Repository      ──→   Analysis JSON │
│  Local Path       ──→   2. Parse AST             ──→   Draw.io XML   │
│  GitLab URL       ──→   3. Build Dep Graph       ──→   Task List     │
│  Bitbucket URL    ──→   4. Detect Patterns       ──→   Tech Debt Score│
│                   ──→   5. Find Issues           ──→   Insights      │
│                   ──→   6. Generate Diagrams     ──→   SVG Images    │
│                                                                      │
│  WHAT IT FINDS:                                                     │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │ • Microservices & their connections                        │    │
│  │ • API endpoints and their dependencies                     │    │
│  │ • Database schemas and relationships                       │    │
│  │ • Frontend components and their hierarchy                  │    │
│  │ • Design patterns (MVC, Repository, Factory, etc.)         │    │
│  │ • Anti-patterns (God objects, spaghetti code, etc.)        │    │
│  │ • Circular dependencies                                    │    │
│  │ • Dead code and unused exports                             │    │
│  │ • Security vulnerabilities                                 │    │
│  │ • Performance bottlenecks                                  │    │
│  │ • Test coverage gaps                                       │    │
│  │ • Code complexity hotspots                                 │    │
│  └────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

## 2. Why Do We Need This As A Separate Service?

### Resource Isolation
```
MAIN APPLICATION                  REPO ANALYZER SERVICE
───────────────                   ────────────────────
• Handles user requests           • Clones large repos (100MB-1GB)
• Serves UI quickly               • Parses thousands of files
• Low memory footprint            • Builds complex AST trees
• Consistent response times       • Runs CPU-intensive analysis
                                 • Uses 2GB+ RAM for large repos

        ↓                                   ↓

✅ STAYS FAST & RESPONSIVE        ✅ CAN USE ALL RESOURCES NEEDED
```

### Scalability Benefits
```
┌─────────────────────────────────────────────────────────────────────┐
│                      INDEPENDENT SCALING                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Regular Traffic:              Analysis Spike:                      │
│  ────────────────              ───────────────                      │
│                                                                      │
│  Main App: ████ (4 pods)       Main App: ████ (4 pods)             │
│  Analyzer: █ (1 pod)           Analyzer: ██████████ (10 pods)      │
│                                                                      │
│  • Main app unaffected         • Scale only what's needed           │
│  • Cost efficient              • Handle burst analysis              │
│  • Optimal resource use        • Queue management                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Security Isolation
```
┌─────────────────────────────────────────────────────────────────────┐
│                      SECURITY BOUNDARIES                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  MAIN APPLICATION               │  REPO ANALYZER SERVICE            │
│  ────────────────               │  ────────────────────             │
│  • User data                    │  • Temporary cloned repos         │
│  • API keys                     │  • Sandboxed file access          │
│  • Database credentials         │  • Limited network access         │
│  • Session tokens               │  • Read-only operations           │
│                                 │  • Auto-cleanup after analysis    │
│                                 │                                   │
│  🔒 PROTECTED ZONE              │  🏗️ ANALYSIS SANDBOX             │
└─────────────────────────────────────────────────────────────────────┘
```

## 3. How It Works - Complete Flow

### Analysis Flow (What Happens When You Analyze a Repo):

```
USER TRIGGERS ANALYSIS
         |
         v
┌─────────────────────────────────────────────────────────────────┐
│                    REPO ANALYZER SERVICE                        │
│                                                                  │
│  Step 1: INTAKE                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Receive Request → Validate → Check Cache               │    │
│  │   • repoUrl: "github.com/user/repo"                   │    │
│  │   • branch: "main"                                    │    │
│  │   • depth: "full" | "basic" | "security"             │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                    │
│  Step 2: CLONE & PREPARE                                        │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Git Clone → Verify Size → Create Workspace             │    │
│  │   • Clone to /tmp/repo-analyzer-{uuid}                │    │
│  │   • Check repo size < MAX_REPO_SIZE                   │    │
│  │   • Set up analysis workspace                         │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                    │
│  Step 3: SCAN & INDEX                                           │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ File Discovery → Parse → Build Dependency Graph        │    │
│  │   • Find all source files (.ts, .js, .py, .go, etc)   │    │
│  │   • Parse imports/exports with AST                    │    │
│  │   • Map file dependencies                             │    │
│  │   • Detect circular dependencies                      │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                    │
│  Step 4: ANALYZE ARCHITECTURE                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Detect Services → Find APIs → Map Databases           │    │
│  │   • Identify microservices from structure             │    │
│  │   • Extract API endpoints from routes                 │    │
│  │   • Find database schemas and migrations              │    │
│  │   • Map service-to-service connections                │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                    │
│  Step 5: PATTERN DETECTION                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Design Patterns → Anti-patterns → Best Practices      │    │
│  │   • MVC, Repository, Factory, Observer patterns       │    │
│  │   • God objects, spaghetti code, copy-paste           │    │
│  │   • SOLID violations, missing error handling          │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                    │
│  Step 6: GENERATE INSIGHTS                                      │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Tech Debt → Security Issues → Performance → Tasks     │    │
│  │   • Calculate technical debt score                    │    │
│  │   • Identify security vulnerabilities                 │    │
│  │   • Find performance bottlenecks                      │    │
│  │   • Generate actionable improvement tasks             │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                    │
│  Step 7: CREATE DIAGRAMS                                        │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Generate Draw.io XML → Multi-page → Export SVG        │    │
│  │   • Page 1: Complete Architecture Overview            │    │
│  │   • Page 2: Frontend Components & Flow                │    │
│  │   • Page 3: API Endpoints & Routes                    │    │
│  │   • Page 4: Backend Services & Microservices          │    │
│  │   • Page 5: Database Schemas & Relations              │    │
│  │   • Page 6: Infrastructure & Deployment               │    │
│  │   • Page 7: External Integrations                     │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                    │
│  Step 8: PERSIST & INTEGRATE                                    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Save to Redis → Store Diagrams → Notify Services      │    │
│  │   • Cache analysis in Redis (1hr TTL)                 │    │
│  │   • Save diagrams to filesystem                       │    │
│  │   • Send insights to Memory Service                   │    │
│  │   • Create tasks in Project Service                   │    │
│  │   • Cleanup temp files                                │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ↓                                    │
│  Step 9: RETURN RESULTS                                         │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ {                                                      │    │
│  │   "success": true,                                    │    │
│  │   "analysisId": "ana_xyz123",                        │    │
│  │   "summary": {                                        │    │
│  │     "services": 12,                                   │    │
│  │     "apis": 67,                                       │    │
│  │     "databases": 3,                                   │    │
│  │     "issues": 23,                                     │    │
│  │     "suggestedTasks": 8                               │    │
│  │   },                                                   │    │
│  │   "diagram": "<xml>...</xml>",                       │    │
│  │   "insights": { ... }                                 │    │
│  │ }                                                      │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### System Architecture (How It Fits in the Cluster):

```
┌─────────────────────────────────────────────────────────────────┐
│                     KUBERNETES CLUSTER                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   INGRESS CONTROLLER                      │  │
│  │                                                           │  │
│  │  Routes:                                                  │  │
│  │    /api/repo/* ────────────> repo-analyzer:8085          │  │
│  │    /api/auth/* ────────────> auth-service:8081           │  │
│  │    /api/projects/* ────────> project-service:8082        │  │
│  │    /api/memory/* ──────────> memory-service:8083         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              REPO-ANALYZER POD (2 replicas)               │  │
│  │                                                           │  │
│  │  Container: repo-analyzer:v0.1.0                          │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │ Express Server (port 8085)                      │     │  │
│  │  │   ├── /api/repo/analyze    [POST]              │     │  │
│  │  │   ├── /api/repo/diagram    [POST]              │     │  │
│  │  │   ├── /api/repo/index      [POST]              │     │  │
│  │  │   ├── /api/repo/cache/:key [GET]               │     │  │
│  │  │   └── /health              [GET]               │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  │                                                           │  │
│  │  Internal Components:                                     │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │ • RepoAnalyzer    - Core analysis engine        │     │  │
│  │  │ • DiagramGenerator - Draw.io XML creator        │     │  │
│  │  │ • GitManager      - Clone & manage repos       │     │  │
│  │  │ • PatternDetector - Find patterns/anti-patterns│     │  │
│  │  │ • TaskGenerator   - Create improvement tasks    │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  │                                                           │  │
│  │  Resources:                                               │  │
│  │    • CPU: 250m-1000m                                      │  │
│  │    • Memory: 512Mi-2Gi                                    │  │
│  │    • Temp Storage: 5Gi EmptyDir                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  External Connections:                                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  ┌──────────┐      ┌──────────┐      ┌──────────┐       │  │
│  │  │  Redis   │      │PostgreSQL│      │  Memory  │       │  │
│  │  │          │      │          │      │ Service  │       │  │
│  │  │ Caching  │      │ Metadata │      │          │       │  │
│  │  │ Results  │      │ Storage  │      │ Insights │       │  │
│  │  └──────────┘      └──────────┘      └──────────┘       │  │
│  │                                                           │  │
│  │  ┌──────────┐      ┌──────────┐      ┌──────────┐       │  │
│  │  │ Project  │      │   Auth   │      │  GitHub  │       │  │
│  │  │ Service  │      │ Service  │      │   API    │       │  │
│  │  │          │      │          │      │          │       │  │
│  │  │  Tasks   │      │ Validate │      │  Clone   │       │  │
│  │  └──────────┘      └──────────┘      └──────────┘       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 4. How We Use The Repo Analyzer

### Usage Scenarios

```
┌─────────────────────────────────────────────────────────────────────┐
│                      USAGE PATTERNS                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. ON-DEMAND ANALYSIS (Most Common)                                │
│  ────────────────────────────────────                               │
│  Developer → UI → Click "Analyze" → Results in 30s                  │
│                                                                      │
│  2. CI/CD INTEGRATION                                               │
│  ────────────────────                                               │
│  Push to main → GitHub Action → Analyze → Block if issues           │
│                                                                      │
│  3. SCHEDULED ANALYSIS                                              │
│  ─────────────────────                                              │
│  Cron job → Analyze weekly → Track tech debt trends                 │
│                                                                      │
│  4. API INTEGRATION                                                 │
│  ──────────────────                                                 │
│  External tool → REST API → Get analysis → Display results          │
└─────────────────────────────────────────────────────────────────────┘
```

### Frontend Integration Example

```typescript
// RepoAnalyzer.tsx - How the UI uses the service

const analyzeRepository = async (repoUrl: string) => {
  // 1. Call the containerized service through API Gateway
  const response = await fetch('/api/repo/analyze', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      repoUrl: repoUrl,
      branch: 'main',
      depth: 'full'
    })
  });
  
  const { analysisId, summary } = await response.json();
  
  // 2. Show immediate summary
  displaySummary(summary);
  
  // 3. Poll for detailed results
  const results = await pollForResults(analysisId);
  
  // 4. Display diagram
  renderDiagram(results.diagram);
  
  // 5. Create tasks from suggestions
  await createTasks(results.suggestedTasks);
};
```

### CLI Usage Example

```bash
# Analyze current directory
curl -X POST http://localhost:8085/api/repo/analyze \
  -H "Content-Type: application/json" \
  -d '{"localPath": "."}'

# Analyze GitHub repo
curl -X POST http://localhost:8085/api/repo/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "repoUrl": "https://github.com/facebook/react",
    "branch": "main",
    "depth": "full"
  }'

# Get cached results
curl http://localhost:8085/api/repo/cache/analysis:react:1234567890
```

### Real-World Examples

#### Example 1: Analyzing This DevMentor Repository
```json
// INPUT
{
  "repoUrl": "https://github.com/devmentor/devmentor",
  "branch": "main",
  "depth": "full"
}

// OUTPUT SUMMARY
{
  "success": true,
  "analysisId": "ana_devmentor_2025",
  "summary": {
    "services": 8,
    "components": 156,
    "apis": 84,
    "databases": 3,
    "patterns": ["Microservices", "Repository", "Factory"],
    "antiPatterns": ["Hardcoded paths", "Missing error handling"],
    "techDebtScore": 6.8,
    "suggestedTasks": 23
  },
  "insights": {
    "critical": [
      "Hardcoded paths in /api/repo/diagram/route.ts",
      "Missing authentication on /api/repo/analyze"
    ],
    "improvements": [
      "Extract RepoAnalyzer to separate service",
      "Add Redis caching for analysis results",
      "Implement progress tracking"
    ]
  }
}
```

#### Example 2: Finding Circular Dependencies
```
┌─────────────────────────────────────────────────────────────────────┐
│                 CIRCULAR DEPENDENCY DETECTED                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  services/auth/index.ts                                             │
│       ↓                                                             │
│  services/project/index.ts                                          │
│       ↓                                                             │
│  services/memory/index.ts                                           │
│       ↓                                                             │
│  services/auth/index.ts  ← CIRCULAR!                               │
│                                                                      │
│  Impact: High                                                       │
│  Fix: Extract shared logic to common module                         │
└─────────────────────────────────────────────────────────────────────┘
```

## 5. Integration with DevMentor Ecosystem

### Service Communication Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│              REPO ANALYZER INTEGRATION POINTS                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                      REPO ANALYZER                                  │
│                           │                                          │
│           ┌───────────────┼───────────────┐                        │
│           │               │               │                         │
│           ↓               ↓               ↓                         │
│                                                                      │
│    MEMORY SERVICE   PROJECT SERVICE   AI GATEWAY                   │
│    ──────────────   ───────────────   ──────────                   │
│                                                                      │
│    Stores:          Creates:          Enhances:                     │
│    • Analysis       • Tasks from      • Uses GPT-4                 │
│      results          suggestions       for deeper                  │
│    • Code           • Links tasks       analysis                    │
│      insights         to code         • Generates                   │
│    • Architecture   • Tracks            better task                 │
│      snapshots       progress           descriptions               │
│                                                                      │
│           ↓               ↓               ↓                         │
│                                                                      │
│                   DEVMENTOR DASHBOARD                               │
│                   ────────────────────                              │
│                   • View analysis results                           │
│                   • Browse architecture diagrams                    │
│                   • Manage suggested tasks                          │
│                   • Track tech debt over time                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow Between Services

```typescript
// 1. Repo Analyzer → Memory Service
POST http://memory-service:8083/api/memory/store
{
  "type": "repo_analysis",
  "content": {
    "repository": "github.com/user/repo",
    "analysisId": "ana_xyz123",
    "summary": { ... },
    "insights": { ... }
  },
  "tags": ["analysis", "architecture", "tech-debt"],
  "timestamp": "2025-01-16T10:30:00Z"
}

// 2. Repo Analyzer → Project Service  
POST http://project-service:8082/api/tasks/bulk
{
  "source": "repo_analyzer",
  "analysisId": "ana_xyz123",
  "tasks": [
    {
      "title": "Fix circular dependency in auth service",
      "description": "Auth service has circular dependency with project service",
      "priority": "high",
      "category": "tech-debt",
      "estimatedHours": 4,
      "files": ["services/auth/index.ts"]
    }
  ]
}

// 3. Repo Analyzer → AI Gateway (optional enhancement)
POST http://ai-gateway:8080/api/enhance
{
  "type": "repo_analysis",
  "data": { ... },
  "prompt": "Suggest refactoring strategy for these circular dependencies"
}
```

## 6. Technical Implementation Details

### Language & Framework Support

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SUPPORTED TECHNOLOGIES                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  LANGUAGES           FRAMEWORKS         DATABASES                   │
│  ─────────           ──────────         ─────────                   │
│  ✅ TypeScript       ✅ Next.js         ✅ PostgreSQL              │
│  ✅ JavaScript       ✅ React           ✅ MySQL                    │
│  ✅ Python           ✅ Express         ✅ MongoDB                  │
│  ✅ Go               ✅ NestJS          ✅ Redis                    │
│  ✅ Java             ✅ Django          ✅ Elasticsearch            │
│  ✅ C#               ✅ Flask           ✅ DynamoDB                 │
│  🚧 Rust             ✅ Spring Boot     🚧 Cassandra                │
│  🚧 Ruby             ✅ .NET Core       🚧 CouchDB                  │
│                                                                      │
│  ANALYSIS FEATURES                                                  │
│  ─────────────────                                                  │
│  • AST Parsing         • Complexity Scoring    • Dead Code Detection│
│  • Import Analysis     • Pattern Matching      • Security Scanning  │
│  • Dependency Graphs   • Anti-pattern Detection• Performance Analysis│
│  • Type Analysis       • Test Coverage         • Documentation Coverage│
└─────────────────────────────────────────────────────────────────────┘
```

### Performance Characteristics

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PERFORMANCE METRICS                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Repository Size    Files    Analysis Time    Memory Usage          │
│  ───────────────    ─────    ─────────────    ────────────          │
│  Small (< 10MB)     < 100    5-10 seconds     256MB                 │
│  Medium (10-50MB)   100-500  15-30 seconds    512MB                 │
│  Large (50-200MB)   500-2000 30-60 seconds    1GB                   │
│  XL (200-500MB)     2000+    1-3 minutes      2GB                   │
│                                                                      │
│  OPTIMIZATION STRATEGIES                                            │
│  • Parallel file processing (4 workers)                             │
│  • Incremental analysis for unchanged files                         │
│  • Redis caching with 1-hour TTL                                    │
│  • Skip binary files and node_modules                               │
│  • Stream processing for large files                                │
└─────────────────────────────────────────────────────────────────────┘
```

### Error Handling & Recovery

```
┌─────────────────────────────────────────────────────────────────────┐
│                     ERROR HANDLING MATRIX                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ERROR TYPE             HANDLING                 RECOVERY           │
│  ──────────             ────────                 ────────           │
│  Repo too large         Return 413               Suggest filtering  │
│  Clone failed           Retry 3x                 Return error       │
│  Parse error            Skip file                Continue analysis  │
│  Pattern match fail     Log warning              Continue           │
│  Memory exceeded        Garbage collect          Restart pod        │
│  Timeout                Save partial             Return partial     │
│  Redis down             Continue                 No caching         │
│  Service unreachable    Queue for retry          Store locally      │
└─────────────────────────────────────────────────────────────────────┘
```

## 7. Beta Readiness Checklist

This checklist tracks the remaining tasks to ensure the service is stable, scalable, and secure for a beta launch.

### High Priority (Must-Have for Beta)
- [ ] **Implement Core Logic**: Complete the `RepoAnalyzer` class with robust logic for parsing various languages and frameworks.
- [ ] **Finalize API Endpoints**: Stabilize the request/response contracts for `/analyze`, `/diagram`, and `/index`.
- [ ] **Replace Hardcoded Paths**: Remove all filesystem paths (e.g., `/Users/betolbook/...`) and replace with environment variables or relative paths from a workspace volume.
- [ ] **Wire Up Integrations**: Connect to the real Memory and Project services instead of using mock `console.log` calls.
- [ ] **Add Auth Middleware**: Secure all endpoints to ensure only authorized users can initiate analysis.
- [ ] **Comprehensive Error Handling**: Implement global error handling and validation middleware.
- [ ] **Create Kubernetes Manifests**: Write and test the `deployment.yaml`, `service.yaml`, and `ingress.yaml` files.
- [ ] **Configure API Gateway**: Add the routing rules to the main Ingress controller to forward traffic.
- [ ] **Refactor Frontend**: Update the `RepoAnalyzer.tsx` component to call the new containerized service via the API gateway.

### Medium Priority (Should-Have for Beta)
- [ ] **Implement Analysis Caching**: Use Redis to cache analysis results to avoid re-analyzing unchanged repositories.
- [ ] **Add Progress Indicators**: For long-running analyses, provide a mechanism (e.g., WebSockets, polling) for the frontend to show progress.
- [ ] **Configuration Management**: Move all configuration (e.g., Redis URL, temp directories) to a Kubernetes `ConfigMap` or environment variables.
- [ ] **Add CI/CD Pipeline**: Create a GitHub Actions workflow to build and push the Docker image to a container registry and deploy to the cluster.
- [ ] **Implement Logging**: Integrate a structured logger (like Winston or Pino) and ensure logs are captured by the cluster's logging solution.

### Low Priority (Nice-to-Have)
- [ ] **Add Metrics & Monitoring**: Expose Prometheus metrics for analysis duration, success/failure rates, and resource usage.
- [ ] **Analysis Versioning**: Implement a system to version the analysis logic, allowing for re-analysis when the engine is updated.
- [ ] **Scheduled Analysis**: Add the ability to schedule recurring analysis of key repositories.

## 4. Deployment

**Build & Push Docker Image:**
```bash
# Navigate to the service directory
cd services/repo-analyzer

# Build the Docker image
docker build -t your-registry/repo-analyzer:v0.1.0 .

# Push the image to the container registry
docker push your-registry/repo-analyzer:v0.1.0
```

**Deploy to Kubernetes:**
```bash
# Apply the Kubernetes manifests
kubectl apply -f k8s/

# Verify the deployment
kubectl get pods -l app=repo-analyzer
```

## 5. API Contracts (Initial Draft)

- **`POST /api/repo/analyze`**:
  - **Body**: `{ "repoUrl": "string", "branch": "string" }`
  - **Response**: `{ "success": true, "analysisId": "string", "summary": { ... } }`
- **`GET /api/repo/status/:analysisId`**:
  - **Response**: `{ "status": "processing|completed|failed", "progress": "number" }`
- **`GET /api/repo/results/:analysisId`**:
  - **Response**: `{ "analysis": { ... }, "diagram": "string" }`
- **`GET /health`**:
  - **Response**: `{ "status": "healthy" }`

This document will be updated as development progresses toward the beta release.

{% endraw %}
