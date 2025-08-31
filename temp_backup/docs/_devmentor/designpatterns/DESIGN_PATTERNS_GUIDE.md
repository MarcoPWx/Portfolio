---
layout: product
title: DESIGN PATTERNS GUIDE
product: DevMentor
source: designpatterns/DESIGN_PATTERNS_GUIDE.md
---

{% raw %}
CURRENT_ARCHITECTURE

# 🚀 DevMentor Design Patterns

> *Your ultimate playbook for building scalable, testable, and clean code in the DevMentor ecosystem!*

<div align="center">
  <h3>🏗️ Architecture • 🎨 Patterns • 🧪 Testing • 📈 Scalability • ✨ Clean Code</h3>
  <p><em>"Code like a poet, architect like an engineer, test like a detective!"</em></p>
</div>

---

## 📚 Table of Contents

### Part I: Foundations
1. [🎯 Introduction](#introduction)
2. [💡 Core Concepts](#core-concepts)
3. [🎨 Design Patterns in Action](#design-patterns-in-action)

### Part II: Building & Scaling
4. [⚡ Frontend Scalability Guide](#frontend-scalability-guide)
5. [🏗️ Technology Stack](#technology-stack)
6. [🛠️ Building with These Patterns](#building-with-these-patterns)

### Part III: Quality & Testing
7. [🧪 Testing Patterns & Strategies](#testing-patterns-strategies)
8. [✨ Clean Code Principles](#clean-code-principles)
9. [📋 Best Practices](#best-practices)

### Part IV: Mastery
10. [🎮 Interactive Examples](#interactive-examples)
11. [🚨 Common Pitfalls](#common-pitfalls)
12. [🎓 Quiz Yourself](#quiz-yourself)
13. [📖 Further Learning](#further-learning)

---

## Introduction

DevMentor is built using modern software engineering principles and design patterns. This guide will teach you:
- **What** each pattern is
- **Why** we use it
- **How** to implement it
- **When** to apply it
- **Real examples** from our codebase

## Core Concepts

### 🎯 What is a Design Pattern?

A design pattern is a **reusable solution** to a commonly occurring problem in software design. Think of them as **blueprints** or **recipes** that you can customize to solve problems in your code.

### 💉 Dependency Injection (DI) Explained

**What is it?**
Dependency Injection is a technique where an object receives its dependencies from external sources rather than creating them itself.

**Why use it?**
- Makes code more testable (you can inject mock dependencies)
- Reduces coupling between components
- Makes code more flexible and maintainable

**Simple Example:**
```typescript
// ❌ WITHOUT Dependency Injection
class EmailService {
  private smtp = new SMTPClient('smtp.gmail.com'); // Hard-coded dependency
  
  sendEmail(to: string, message: string) {
    this.smtp.send(to, message);
  }
}

// ✅ WITH Dependency Injection
class EmailService {
  constructor(private smtp: ISMTPClient) {} // Dependency injected
  
  sendEmail(to: string, message: string) {
    this.smtp.send(to, message);
  }
}

// Now you can inject different SMTP clients
const gmailService = new EmailService(new GmailSMTP());
const sendgridService = new EmailService(new SendGridSMTP());
const testService = new EmailService(new MockSMTP()); // For testing!
```

**Real Example from DevMentor:**
```typescript
// services/auth-service/authService.ts
export class AuthService implements IAuthService {
  constructor(private apiClient: IApiClient) {} // DI: API client injected
  
  async login(credentials: LoginCredentials) {
    return this.apiClient.post('/auth/login', credentials);
  }
}

// In app/providers.tsx
const authService = useMemo(() => createAuthService(apiClient), []); // Injecting the dependency
```

---

## Design Patterns in Action

### 1. 🏗️ Microservices Architecture Pattern

**What is it?**
Breaking down a large application into small, independent services that communicate over a network.

**Our Implementation:**
```yaml
# docker-compose.yml structure
services:
  api-gateway:     # Port 8080 - Single entry point
  auth-service:    # Port 3002 - Handles authentication
  memory-service:  # Port 3003 - Vector DB & RAG
  project-service: # Port 3005 - Project management
  ai-gateway:      # Port 3001 - AI orchestration
```

**Benefits:**
- Each service can be developed independently
- Services can scale separately
- Failure in one service doesn't crash the entire system
- Different teams can work on different services

**How Services Communicate:**
```typescript
// API Gateway routes requests to appropriate services
app.use('/api/auth', proxy('http://auth-service:3002'));
app.use('/api/projects', proxy('http://project-service:3005'));
app.use('/api/memory', proxy('http://memory-service:3003'));
```

---

### 2. 🤖 Agent-Based Architecture (Strategy + Template Method Pattern)

**What is it?**
A system where autonomous "agents" handle specific tasks. Each agent has its own capabilities and can work independently or together.

**The Interface (Contract):**
```typescript
// Every agent MUST implement these methods
export interface IAgent {
  id: string;
  name: string;
  capabilities: AgentCapability[];
  
  execute(task: AgentTask): Promise<AgentResult>;
  canHandle(task: AgentTask): boolean;
  getHealth(): AgentHealth;
}
```

**The Base Template:**
```typescript
export abstract class BaseAgent implements IAgent {
  // Template Method Pattern: Defines the algorithm structure
  async execute(task: AgentTask): Promise<AgentResult> {
    // Step 1: Validate (common for all agents)
    if (!this.canHandle(task)) {
      return this.createErrorResult(task, 'TASK_NOT_SUPPORTED');
    }
    
    // Step 2: Check health (common)
    if (this.status !== AgentStatus.READY) {
      return this.createErrorResult(task, 'AGENT_NOT_READY');
    }
    
    // Step 3: Execute specific logic (different for each agent)
    const result = await this.executeTask(task); // Abstract method
    
    // Step 4: Update metrics (common)
    this.updateHealthMetrics(result);
    
    return result;
  }
  
  // Subclasses MUST implement these
  abstract canHandle(task: AgentTask): boolean;
  protected abstract executeTask(task: AgentTask): Promise<any>;
}
```

**Concrete Agent Example:**
```typescript
class WebSearchAgent extends BaseAgent {
  canHandle(task: AgentTask): boolean {
    return task.type === 'SEARCH' && task.capabilities.includes('WEB_SEARCH');
  }
  
  protected async executeTask(task: AgentTask): Promise<any> {
    // Specific web search logic
    const results = await this.searchGoogle(task.input);
    return this.formatResults(results);
  }
}
```

---

### 3. 📚 Registry Pattern

**What is it?**
A centralized place to register and find objects (like a phone book for your services).

**Why use it?**
- Central management of all agents
- Easy discovery of capabilities
- Dynamic registration/unregistration

**Implementation:**
```typescript
export class AgentRegistry {
  private agents: Map<string, IAgent> = new Map();
  private capabilityIndex: Map<AgentCapability, Set<string>> = new Map();
  
  // Register a new agent
  async register(agent: IAgent): Promise<void> {
    this.agents.set(agent.id, agent);
    
    // Index by capabilities for fast lookup
    for (const capability of agent.capabilities) {
      if (!this.capabilityIndex.has(capability)) {
        this.capabilityIndex.set(capability, new Set());
      }
      this.capabilityIndex.get(capability)!.add(agent.id);
    }
  }
  
  // Find agents that can handle a specific task
  async findCapableAgents(task: AgentTask): Promise<IAgent[]> {
    const capableAgents: IAgent[] = [];
    const requiredCapabilities = this.getRequiredCapabilities(task.type);
    
    for (const capability of requiredCapabilities) {
      const agentIds = this.capabilityIndex.get(capability);
      if (agentIds) {
        for (const agentId of agentIds) {
          const agent = this.agents.get(agentId);
          if (agent && agent.canHandle(task)) {
            capableAgents.push(agent);
          }
        }
      }
    }
    
    return this.sortAgentsBySuitability(capableAgents, task);
  }
}
```

---

### 4. 🏭 Factory Pattern

**What is it?**
A pattern that creates objects without specifying their exact class. It's like a restaurant menu - you order "pizza" and the kitchen (factory) decides how to make it.

**Why use it?**
- Centralizes object creation logic
- Makes it easy to change how objects are created
- Hides complex initialization

**Our API Client Factory:**
```typescript
// Factory function that creates configured API clients
export const createApiClient = (config: Partial<ApiConfig> = {}): ApiClient => {
  // Default configuration
  const defaultConfig: ApiConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
    timeout: 30000,
    retries: 3,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
  
  // Merge with custom config
  return new ApiClient({ ...defaultConfig, ...config });
};

// Usage
const apiClient = createApiClient(); // Default config
const customClient = createApiClient({ timeout: 60000 }); // Custom timeout
```

---

### 5. ⚛️ Provider Pattern (React Context)

**What is it?**
A way to share data across your React component tree without manually passing props down through every level.

**The Problem (Prop Drilling):**
```typescript
// ❌ Without Provider Pattern - props passed through every level
function App() {
  const [user, setUser] = useState(null);
  return <Dashboard user={user} setUser={setUser} />;
}

function Dashboard({ user, setUser }) {
  return <Profile user={user} setUser={setUser} />;
}

function Profile({ user, setUser }) {
  return <Avatar user={user} />;
}
```

**The Solution (Provider Pattern):**
```typescript
// ✅ With Provider Pattern
// 1. Create Context
const AuthContext = React.createContext<AuthContextType | null>(null);

// 2. Create Provider Component
export function Providers({ children }: PropsWithChildren) {
  const queryClient = useMemo(() => new QueryClient(), []);
  const authService = useMemo(() => createAuthService(apiClient), []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ authService }}>
        {children}
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

// 3. Use anywhere in the tree
function Avatar() {
  const { authService } = useContext(AuthContext);
  const user = authService.getCurrentUser();
  return <img src={user.avatar} />;
}
```

---

### 6. 👁️ Observer Pattern

**What is it?**
A pattern where an object (subject) maintains a list of dependents (observers) and notifies them of state changes.

**Real-world analogy:** YouTube subscriptions - when a channel posts a video, all subscribers get notified.

**VS Code Extension Example:**
```typescript
// Subject: DevMentorClient
class DevMentorClient {
  private listeners: Array<() => void> = [];
  
  onConnectionChanged(callback: () => void) {
    this.listeners.push(callback);
  }
  
  private notifyConnectionChange() {
    this.listeners.forEach(callback => callback());
  }
}

// Observers: Various providers that react to connection changes
devMentorClient.onConnectionChanged(() => {
  updateConnectionStatus();      // Observer 1
  suggestionsProvider.refresh();  // Observer 2
  tddProvider.refresh();          // Observer 3
  memoryProvider.refresh();       // Observer 4
});

// Document watching
vscode.workspace.onDidChangeTextDocument(async (event) => {
  // React to document changes
  await devMentorClient.sendCodeContext(event.document);
});
```

---

### 7. 📝 Command Pattern

**What is it?**
Encapsulates a request as an object, allowing you to parameterize clients with different requests, queue operations, and support undo operations.

**VS Code Extension Commands:**
```typescript
// Each command is an object with its own execute logic
const commands = [
  {
    id: 'devmentor.connect',
    execute: async () => {
      await devMentorClient.connect();
      updateConnectionStatus();
    }
  },
  {
    id: 'devmentor.startTDD',
    execute: async () => {
      const taskName = await vscode.window.showInputBox({
        prompt: 'Enter a name for your TDD task'
      });
      if (taskName) {
        await devMentorClient.startTDDCycle(taskName, editor.document);
      }
    }
  }
];

// Register all commands
commands.forEach(cmd => {
  vscode.commands.registerCommand(cmd.id, cmd.execute);
});
```

---

### 8. 🛡️ Queue Pattern with Guardian

**What is it?**
A pattern that manages a queue of items with protection mechanisms (the "guardian" part).

**Our Implementation:**
```typescript
export class QueueGuardian {
  private queue: QueueItem[] = [];
  private config = {
    maxItems: 500,        // Guardian: Prevents memory overflow
    autoSaveMs: 5000,     // Guardian: Auto-persists data
    tokenBudget: 2800     // Guardian: Prevents API overload
  };
  
  capture(item: QueueItem): QueueItem {
    this.queue.push(item);
    
    // Guardian logic: Maintain size limit
    if (this.queue.length > this.config.maxItems) {
      this.queue.splice(0, this.queue.length - this.config.maxItems);
    }
    
    return item;
  }
  
  // Batch processing with token budget
  async flushToMemoryBank(tags: string[]): Promise<number> {
    // Guardian: Chunk by token budget to prevent API overload
    for (const batch of this.chunkByTokens(this.queue, this.config.tokenBudget)) {
      await this.sendBatch(batch);
    }
  }
  
  private chunkByTokens(items: QueueItem[], budget: number): QueueItem[][] {
    // Smart chunking algorithm
    const chunks: QueueItem[][] = [];
    let current: QueueItem[] = [];
    let tokens = 0;
    
    for (const item of items) {
      const tokenCount = this.approxTokens(item.content);
      if (tokens + tokenCount > budget && current.length) {
        chunks.push(current);
        current = [];
        tokens = 0;
      }
      current.push(item);
      tokens += tokenCount;
    }
    
    return chunks;
  }
}
```

---

### 9. 🔄 Retry Pattern with Exponential Backoff

**What is it?**
A pattern that automatically retries failed operations with increasing delays between attempts.

**Why use it?**
- Handles temporary network failures
- Prevents overwhelming servers
- Improves reliability

**Implementation:**
```typescript
export class ApiClient {
  async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const maxRetries = 3;
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(endpoint, { method, body: data });
        if (response.ok) return response.json();
        
        // Don't retry client errors (except specific ones)
        if (response.status >= 400 && response.status < 500) {
          const retryableStatuses = [408, 429]; // Timeout, Too Many Requests
          if (!retryableStatuses.includes(response.status)) {
            throw new Error(`HTTP ${response.status}`);
          }
        }
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) break;
        
        // Exponential backoff: 1s, 2s, 4s, 8s...
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        console.log(`Retry ${attempt + 1}/${maxRetries} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }
}
```

---

### 10. 💾 Repository Pattern

**What is it?**
A pattern that encapsulates data access logic and provides a more object-oriented view of the persistence layer.

**Why use it?**
- Separates business logic from data access
- Makes it easy to switch databases
- Centralizes query logic

**Implementation:**
```typescript
// Repository Interface
interface IProjectRepository {
  create(project: CreateProjectDTO): Promise<Project>;
  findById(id: string): Promise<Project | null>;
  update(id: string, data: UpdateProjectDTO): Promise<Project>;
  delete(id: string): Promise<void>;
  findByUser(userId: string): Promise<Project[]>;
}

// PostgreSQL Implementation
export class PostgresProjectRepository implements IProjectRepository {
  constructor(private pool: Pool) {}
  
  async create(data: CreateProjectDTO): Promise<Project> {
    const query = `
      INSERT INTO projects (name, description, user_id, tech_stack)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await this.pool.query(query, [
      data.name,
      data.description,
      data.userId,
      data.techStack
    ]);
    return this.mapToProject(result.rows[0]);
  }
  
  async findById(id: string): Promise<Project | null> {
    const query = 'SELECT * FROM projects WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rows[0] ? this.mapToProject(result.rows[0]) : null;
  }
  
  // Maps database row to domain object
  private mapToProject(row: any): Project {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      userId: row.user_id,
      techStack: row.tech_stack,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

// Service uses repository
export class ProjectService {
  constructor(private repository: IProjectRepository) {} // DI!
  
  async createProject(userId: string, data: CreateProjectDTO): Promise<Project> {
    // Business logic
    if (!data.name || data.name.length < 3) {
      throw new Error('Project name must be at least 3 characters');
    }
    
    // Delegate to repository
    return this.repository.create({ ...data, userId });
  }
}
```

---

### 11. 🎼 Workflow Orchestration Pattern

**What is it?**
A pattern that coordinates multiple services/agents to complete complex tasks.

**Our Implementation:**
```typescript
export interface IWorkflowOrchestrator {
  executeWorkflow(query: string, context: AgentContext): Promise<WorkflowResult>;
}

export class WorkflowOrchestrator implements IWorkflowOrchestrator {
  constructor(
    private registry: AgentRegistry,
    private taskDecomposer: TaskDecomposer
  ) {}
  
  async executeWorkflow(query: string, context: AgentContext): Promise<WorkflowResult> {
    // Step 1: Decompose complex query into tasks
    const tasks = await this.taskDecomposer.decompose(query, context);
    
    // Step 2: Find capable agents for each task
    const assignments = new Map<string, IAgent>();
    for (const task of tasks) {
      const agent = await this.registry.findBestAgent(task);
      if (!agent) throw new Error(`No agent available for task: ${task.type}`);
      assignments.set(task.id, agent);
    }
    
    // Step 3: Execute tasks (some in parallel, some sequential)
    const results = await this.executeTasks(tasks, assignments);
    
    // Step 4: Synthesize results
    return this.synthesizeResults(results);
  }
  
  private async executeTasks(
    tasks: AgentTask[], 
    assignments: Map<string, IAgent>
  ): Promise<AgentResult[]> {
    // Group tasks by dependencies
    const taskGraph = this.buildDependencyGraph(tasks);
    const results: AgentResult[] = [];
    
    // Execute in topological order
    for (const level of taskGraph) {
      // Execute all tasks at this level in parallel
      const levelResults = await Promise.all(
        level.map(task => {
          const agent = assignments.get(task.id)!;
          return agent.execute(task);
        })
      );
      results.push(...levelResults);
    }
    
    return results;
  }
}
```

---

### 12. 🧩 Component Composition Pattern

**What is it?**
Building complex UI components by combining simpler ones.

**Our Button Component:**
```typescript
// Base button with composition of styles
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles (always applied)
          'inline-flex items-center justify-center rounded-md',
          'focus:outline-none focus:ring-2',
          
          // Variant styles (conditional)
          buttonVariants[variant],
          
          // Size styles (conditional)
          buttonSizes[size],
          
          // State styles (conditional)
          loading && 'opacity-50 cursor-not-allowed'
        )}
        disabled={loading}
        {...props}
      >
        {loading && <Spinner />}
        {children}
      </button>
    );
  }
);

// Usage - composing different variations
<Button variant="primary" size="lg">Submit</Button>
<Button variant="danger" size="sm" loading>Delete</Button>
<Button variant="ghost">Cancel</Button>
```

---

## Technology Stack

### Backend Technologies

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **Node.js + TypeScript** | Runtime & Language | Type safety, modern JS features, great ecosystem |
| **Express.js** | Web Framework | Simple, flexible, well-documented |
| **PostgreSQL** | Primary Database | ACID compliance, complex queries, reliability |
| **Qdrant** | Vector Database | Semantic search, embeddings storage for AI |
| **Redis** | Cache & Pub/Sub | Fast in-memory operations, message broker |
| **Docker** | Containerization | Consistent environments, easy deployment |
| **Kubernetes/Istio** | Orchestration | Auto-scaling, service mesh, traffic management |

### Frontend Technologies

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **Next.js 14** | React Framework | SSR/SSG, App Router, built-in optimizations |
| **TypeScript** | Language | Type safety, better IDE support |
| **TanStack Query** | Data Fetching | Caching, synchronization, background updates |
| **Tailwind CSS** | Styling | Utility-first, consistent design, fast development |
| **Radix UI** | Components | Accessible, unstyled, composable |

### AI/ML Technologies

| Technology | Purpose | Why We Use It |
|------------|---------|---------------|
| **OpenAI API** | LLM | GPT-4 for code generation and analysis |
| **LangChain** | AI Framework | Chain LLM calls, manage prompts |
| **Embeddings** | Semantic Search | Convert text to vectors for similarity search |
| **RAG Pattern** | Knowledge Retrieval | Enhance AI responses with relevant context |

---

## Frontend Scalability Guide

### ⚡ The Art of Scaling React Applications

> "A scalable frontend is like a LEGO set - small pieces that combine to build something amazing!"

### 🎯 Core Scalability Principles

#### 1. **Code Splitting & Lazy Loading** 🚀

**The Problem:** Loading your entire app at once = slow initial load
**The Solution:** Load only what users need, when they need it!

```typescript
// ❌ Before: Everything loads at once
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';

// ✅ After: Dynamic imports with lazy loading
const Dashboard = lazy(() => import('./Dashboard'));
const Analytics = lazy(() => import('./Analytics'));
const Settings = lazy(() => import('./Settings'));

// In your component
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

#### 2. **Virtualization for Large Lists** 📜

**When you have 10,000 items to render:**

```typescript
// Using react-window for virtualization
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }: { items: Item[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}  // Viewport height
      itemCount={items.length}
      itemSize={50} // Each row height
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

#### 3. **State Management Architecture** 🏗️

**The Scalability Pyramid:**

```
         🔺 Global State (Zustand/Redux)
        /  \
       /    \
      /      \
     / Server \
    /  State   \
   / (TanStack) \
  /______________\
 /                \
/   Local State    \
(useState/useReducer)
```

**Implementation:**

```typescript
// 1. Local State - Component-specific
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// 2. Server State - TanStack Query
function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  if (isLoading) return <Skeleton />;
  return <Profile user={data} />;
}

// 3. Global State - Zustand
import { create } from 'zustand';

const useAppStore = create((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'light' ? 'dark' : 'light' 
  })),
}));
```

#### 4. **Micro-Frontend Architecture** 🧩

**Split your app into independent deployable units:**

```typescript
// Module Federation with Webpack 5
// Shell Application (Container)
const RemoteButton = lazy(() => import('designSystem/Button'));
const RemoteDashboard = lazy(() => import('dashboard/Main'));

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<Loading />}>
        <RemoteDashboard />
        <RemoteButton onClick={() => {}}>Click me!</RemoteButton>
      </Suspense>
    </ErrorBoundary>
  );
}

// webpack.config.js
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        designSystem: 'designSystem@http://localhost:3001/remoteEntry.js',
        dashboard: 'dashboard@http://localhost:3002/remoteEntry.js',
      },
    }),
  ],
};
```

#### 5. **Performance Optimization Patterns** 🏎️

**a) Memoization Strategy:**

```typescript
// Expensive computation? Memoize it!
const ExpensiveComponent = memo(({ data }: { data: ComplexData }) => {
  const processedData = useMemo(
    () => expensiveProcessing(data),
    [data] // Only recompute when data changes
  );
  
  const handleClick = useCallback(
    (item: Item) => {
      // Handle click with item
    },
    [] // Never recreate this function
  );
  
  return <DataGrid data={processedData} onItemClick={handleClick} />;
});
```

**b) Debouncing & Throttling:**

```typescript
// Custom hooks for performance
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage in search
function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  
  const { data } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchAPI(debouncedQuery),
    enabled: debouncedQuery.length > 2,
  });
  
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

#### 6. **Component Architecture for Scale** 🏛️

**The SOLID Components Pattern:**

```typescript
// 1. Single Responsibility
// ❌ Bad: Component does too much
function UserCard({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateUser } = useMutation(updateUserAPI);
  const { data: posts } = useQuery(['posts', user.id], fetchUserPosts);
  
  // Handles display, editing, data fetching... too much!
}

// ✅ Good: Separated concerns
function UserCard({ user }) {
  return (
    <Card>
      <UserInfo user={user} />
      <UserActions userId={user.id} />
    </Card>
  );
}

function UserInfo({ user }) {
  // Only displays user info
}

function UserActions({ userId }) {
  // Only handles actions
}

// 2. Composition over Inheritance
function Card({ children, variant = 'default' }) {
  return (
    <div className={cn('card', `card--${variant}`)}>
      {children}
    </div>
  );
}

function ProfileCard({ user }) {
  return (
    <Card variant="profile">
      <CardHeader>{user.name}</CardHeader>
      <CardBody>
        <Avatar src={user.avatar} />
        <Bio text={user.bio} />
      </CardBody>
      <CardFooter>
        <FollowButton userId={user.id} />
      </CardFooter>
    </Card>
  );
}
```

#### 7. **Bundle Size Optimization** 📦

```javascript
// webpack.config.js - Production optimizations
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
    // Tree shaking
    usedExports: true,
    // Minification
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
};

// Use dynamic imports for heavy libraries
const loadChart = async () => {
  const { Chart } = await import('chart.js');
  return new Chart(ctx, config);
};
```

### 📊 Scalability Metrics & Monitoring

```typescript
// Performance monitoring with Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  // Send to your analytics endpoint
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify(metric),
  });
}

getCLS(sendToAnalytics);  // Cumulative Layout Shift
getFID(sendToAnalytics);  // First Input Delay
getFCP(sendToAnalytics);  // First Contentful Paint
getLCP(sendToAnalytics);  // Largest Contentful Paint
getTTFB(sendToAnalytics); // Time to First Byte
```

---

## Testing Patterns & Strategies

### 🧪 The Testing Trophy 🏆

> "Write tests. Not too many. Mostly integration." - Kent C. Dodds

```
       🏆 E2E Tests
      /   \
     /     \
    / Integration \
   /     Tests     \
  /_________________\
 /                   \
/    Unit Tests       \
/_____________________\
     Static Types
```

### 1. **Unit Testing Patterns** 🔬

#### The AAA Pattern (Arrange, Act, Assert)

```typescript
describe('UserService', () => {
  it('should create a user with valid data', async () => {
    // Arrange
    const mockRepository = {
      save: jest.fn().mockResolvedValue({ id: '123', name: 'John' })
    };
    const service = new UserService(mockRepository);
    const userData = { name: 'John', email: 'john@example.com' };
    
    // Act
    const user = await service.createUser(userData);
    
    // Assert
    expect(user).toEqual({ id: '123', name: 'John' });
    expect(mockRepository.save).toHaveBeenCalledWith(userData);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });
});
```

#### Testing Hooks

```typescript
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

### 2. **Integration Testing** 🔗

```typescript
// Testing React Components with React Testing Library
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TodoList Integration', () => {
  it('should add and complete a todo', async () => {
    const user = userEvent.setup();
    
    render(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );
    
    // Add a new todo
    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, 'Write tests');
    await user.keyboard('{Enter}');
    
    // Verify todo appears
    const todoItem = await screen.findByText('Write tests');
    expect(todoItem).toBeInTheDocument();
    
    // Complete the todo
    const checkbox = within(todoItem.parentElement!).getByRole('checkbox');
    await user.click(checkbox);
    
    // Verify todo is marked complete
    await waitFor(() => {
      expect(todoItem).toHaveClass('completed');
    });
  });
});
```

### 3. **E2E Testing with Playwright** 🎭

```typescript
import { test, expect } from '@playwright/test';

test.describe('User Journey', () => {
  test('complete signup flow', async ({ page }) => {
    // Navigate to signup
    await page.goto('/signup');
    
    // Fill form
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'SecurePass123!');
    await page.fill('[name="confirmPassword"]', 'SecurePass123!');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Verify redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
  });
  
  test('handle API errors gracefully', async ({ page, route }) => {
    // Mock API failure
    await route('**/api/signup', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' })
      });
    });
    
    await page.goto('/signup');
    await page.fill('[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    
    // Verify error message
    await expect(page.locator('.error-message')).toContainText('Server error');
  });
});
```

### 4. **Test Doubles & Mocking Strategies** 🎪

```typescript
// Different types of test doubles
class TestDoubles {
  // 1. Stub - Returns predefined data
  createStub() {
    return {
      getUser: () => ({ id: '1', name: 'Test User' })
    };
  }
  
  // 2. Mock - Verifies interactions
  createMock() {
    const mock = {
      sendEmail: jest.fn(),
      calls: [] as string[]
    };
    return mock;
  }
  
  // 3. Spy - Records interactions
  createSpy(realService: EmailService) {
    const spy = jest.spyOn(realService, 'send');
    return spy;
  }
  
  // 4. Fake - Working implementation
  createFake() {
    class FakeDatabase {
      private data = new Map();
      
      async save(id: string, value: any) {
        this.data.set(id, value);
      }
      
      async find(id: string) {
        return this.data.get(id);
      }
    }
    return new FakeDatabase();
  }
}
```

### 5. **Testing Async Code** ⏳

```typescript
// Testing promises and async operations
describe('Async Testing Patterns', () => {
  // Pattern 1: async/await
  it('should fetch user data', async () => {
    const data = await fetchUser('123');
    expect(data.name).toBe('John');
  });
  
  // Pattern 2: Testing rejections
  it('should handle errors', async () => {
    await expect(fetchUser('invalid')).rejects.toThrow('User not found');
  });
  
  // Pattern 3: Testing with fake timers
  it('should debounce search', () => {
    jest.useFakeTimers();
    const search = jest.fn();
    const debouncedSearch = debounce(search, 300);
    
    debouncedSearch('query');
    debouncedSearch('query2');
    
    expect(search).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(300);
    
    expect(search).toHaveBeenCalledTimes(1);
    expect(search).toHaveBeenCalledWith('query2');
  });
});
```

### 6. **Testing Best Practices** 📝

```typescript
// 1. Use descriptive test names
describe('ShoppingCart', () => {
  // ❌ Bad
  it('works', () => {});
  
  // ✅ Good
  it('should calculate total price including tax when items are added', () => {});
});

// 2. Keep tests independent
beforeEach(() => {
  // Reset state before each test
  jest.clearAllMocks();
  localStorage.clear();
});

// 3. Test behavior, not implementation
// ❌ Bad: Testing implementation details
it('should call setState', () => {
  const setState = jest.fn();
  // ...
  expect(setState).toHaveBeenCalled();
});

// ✅ Good: Testing behavior
it('should display error message when login fails', async () => {
  render(<LoginForm />);
  
  fireEvent.submit(screen.getByRole('form'));
  
  await waitFor(() => {
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});

// 4. Use data-testid for reliable element selection
<button data-testid="submit-button">Submit</button>

const button = screen.getByTestId('submit-button');
```

---

## Clean Code Principles

### ✨ The Art of Writing Beautiful Code

> "Clean code reads like well-written prose." - Robert C. Martin

### 1. **Meaningful Names** 📛

```typescript
// ❌ Bad: Cryptic names
const d = new Date();
const u = users.filter(x => x.a > 18);

// ✅ Good: Self-documenting names
const currentDate = new Date();
const adultUsers = users.filter(user => user.age > 18);

// ❌ Bad: Misleading names
const userList = new Map(); // It's a Map, not a List!

// ✅ Good: Accurate names
const userMap = new Map();
const usersByEmail = new Map();

// Use searchable names
const SECONDS_IN_DAY = 86400; // ✅ Good
const 86400 = 86400; // ❌ Bad: What is this number?
```

### 2. **Functions Should Do One Thing** 🎯

```typescript
// ❌ Bad: Function does multiple things
function processUserData(users: User[]) {
  // Validate users
  users.forEach(user => {
    if (!user.email) throw new Error('Invalid email');
  });
  
  // Transform users
  const transformed = users.map(user => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`
  }));
  
  // Save to database
  database.save(transformed);
  
  // Send emails
  transformed.forEach(user => {
    emailService.sendWelcome(user.email);
  });
  
  return transformed;
}

// ✅ Good: Each function has single responsibility
function validateUsers(users: User[]): void {
  users.forEach(user => {
    if (!user.email) throw new Error('Invalid email');
  });
}

function transformUsers(users: User[]): TransformedUser[] {
  return users.map(user => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`
  }));
}

function saveUsers(users: TransformedUser[]): Promise<void> {
  return database.save(users);
}

function sendWelcomeEmails(users: TransformedUser[]): Promise<void> {
  return Promise.all(
    users.map(user => emailService.sendWelcome(user.email))
  );
}

// Orchestrate
async function processUserData(users: User[]) {
  validateUsers(users);
  const transformed = transformUsers(users);
  await saveUsers(transformed);
  await sendWelcomeEmails(transformed);
  return transformed;
}
```

### 3. **The Boy Scout Rule** 🏕️

> "Leave the code cleaner than you found it."

```typescript
// Before: Found this in the codebase
function calc(x, y, t) {
  if (t == 'add') return x + y;
  if (t == 'sub') return x - y;
  if (t == 'mul') return x * y;
  if (t == 'div') return x / y;
}

// After: Refactored while working on feature
type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

function calculate(a: number, b: number, operation: Operation): number {
  const operations = {
    add: (x: number, y: number) => x + y,
    subtract: (x: number, y: number) => x - y,
    multiply: (x: number, y: number) => x * y,
    divide: (x: number, y: number) => {
      if (y === 0) throw new Error('Division by zero');
      return x / y;
    }
  };
  
  const operationFn = operations[operation];
  if (!operationFn) {
    throw new Error(`Unknown operation: ${operation}`);
  }
  
  return operationFn(a, b);
}
```

### 4. **DRY (Don't Repeat Yourself)** 🔁

```typescript
// ❌ Bad: Duplicated logic
function calculateOrderTotal(order: Order): number {
  let total = 0;
  order.items.forEach(item => {
    total += item.price * item.quantity;
  });
  const tax = total * 0.08;
  const shipping = total > 100 ? 0 : 10;
  return total + tax + shipping;
}

function calculateCartTotal(cart: Cart): number {
  let total = 0;
  cart.items.forEach(item => {
    total += item.price * item.quantity;
  });
  const tax = total * 0.08;
  const shipping = total > 100 ? 0 : 10;
  return total + tax + shipping;
}

// ✅ Good: Extracted common logic
function calculateSubtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateTax(subtotal: number, rate: number = 0.08): number {
  return subtotal * rate;
}

function calculateShipping(subtotal: number, threshold: number = 100): number {
  return subtotal > threshold ? 0 : 10;
}

function calculateTotal(items: LineItem[]): number {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  return subtotal + tax + shipping;
}
```

### 5. **Comments & Documentation** 📝

```typescript
// ❌ Bad: Obvious comments
// Increment i by 1
i++;

// Check if user is admin
if (user.role === 'admin') {
  // ...
}

// ✅ Good: Explain WHY, not WHAT
// We need to increment by 2 because the API returns paginated results
// in pairs for legacy compatibility reasons
i += 2;

// Admin users bypass rate limiting to allow bulk operations
if (user.role === 'admin') {
  rateLimiter.bypass();
}

// ✅ Good: Complex business logic documentation
/**
 * Calculates the customer's loyalty discount based on their purchase history.
 * 
 * Discount tiers:
 * - Bronze (100-499 points): 5% discount
 * - Silver (500-999 points): 10% discount
 * - Gold (1000+ points): 15% discount
 * 
 * Points are calculated as: $1 spent = 1 point
 * Points expire after 365 days
 * 
 * @param customer - The customer object with purchase history
 * @returns The discount percentage to apply
 */
function calculateLoyaltyDiscount(customer: Customer): number {
  const points = calculateActivePoints(customer);
  
  if (points >= 1000) return 0.15;
  if (points >= 500) return 0.10;
  if (points >= 100) return 0.05;
  return 0;
}
```

### 6. **Error Handling Excellence** ⚠️

```typescript
// ❌ Bad: Silent failures
try {
  processPayment();
} catch (e) {
  // Swallowing error
}

// ❌ Bad: Generic error messages
try {
  processPayment();
} catch (e) {
  throw new Error('Error occurred');
}

// ✅ Good: Specific, actionable errors
class PaymentError extends Error {
  constructor(
    message: string,
    public code: string,
    public retryable: boolean,
    public details?: any
  ) {
    super(message);
    this.name = 'PaymentError';
  }
}

try {
  await processPayment(payment);
} catch (error) {
  if (error instanceof PaymentError) {
    if (error.retryable) {
      await retryPayment(payment);
    } else {
      await notifyUser({
        title: 'Payment Failed',
        message: error.message,
        action: getActionForErrorCode(error.code)
      });
    }
    
    // Log for monitoring
    logger.error('Payment processing failed', {
      error,
      payment,
      userId: payment.userId,
      timestamp: new Date().toISOString()
    });
  }
  
  throw error; // Re-throw for upstream handling
}
```

### 7. **Code Formatting & Style** 🎨

```typescript
// Use consistent formatting (Prettier config)
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}

// ✅ Good: Consistent structure
class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly emailService: EmailService,
    private readonly logger: Logger
  ) {}
  
  async createUser(data: CreateUserDto): Promise<User> {
    this.logger.info('Creating user', { email: data.email });
    
    const user = await this.repository.create(data);
    await this.emailService.sendWelcomeEmail(user);
    
    this.logger.info('User created successfully', { userId: user.id });
    return user;
  }
}
```

### 8. **Refactoring Patterns** 🔨

```typescript
// Extract Method
// Before
function printBill(order: Order) {
  console.log('Order Details:');
  order.items.forEach(item => {
    console.log(`${item.name}: $${item.price}`);
  });
  const subtotal = order.items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  console.log(`Subtotal: $${subtotal}`);
  console.log(`Tax: $${tax}`);
  console.log(`Total: $${total}`);
}

// After
function printBill(order: Order) {
  printOrderItems(order.items);
  printOrderTotals(order);
}

function printOrderItems(items: OrderItem[]) {
  console.log('Order Details:');
  items.forEach(item => {
    console.log(`${item.name}: $${item.price}`);
  });
}

function printOrderTotals(order: Order) {
  const totals = calculateOrderTotals(order);
  console.log(`Subtotal: $${totals.subtotal}`);
  console.log(`Tax: $${totals.tax}`);
  console.log(`Total: $${totals.total}`);
}

// Replace Conditional with Polymorphism
// Before
function calculateDiscount(customer: Customer): number {
  if (customer.type === 'regular') return 0.05;
  if (customer.type === 'premium') return 0.10;
  if (customer.type === 'vip') return 0.20;
  return 0;
}

// After
interface DiscountStrategy {
  calculate(amount: number): number;
}

class RegularDiscount implements DiscountStrategy {
  calculate(amount: number): number {
    return amount * 0.05;
  }
}

class PremiumDiscount implements DiscountStrategy {
  calculate(amount: number): number {
    return amount * 0.10;
  }
}

class VIPDiscount implements DiscountStrategy {
  calculate(amount: number): number {
    return amount * 0.20;
  }
}
```

---

## Interactive Examples

### 🎮 Try It Yourself!

#### Challenge 1: Implement a Caching Decorator

```typescript
// TODO: Implement a decorator that caches function results
function memoize(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  // Your implementation here
  // Hint: Store results in a Map with arguments as key
}

class MathService {
  @memoize
  fibonacci(n: number): number {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}

// Test your implementation
const math = new MathService();
console.time('First call');
math.fibonacci(40); // Should be slow
console.timeEnd('First call');

console.time('Second call');
math.fibonacci(40); // Should be instant!
console.timeEnd('Second call');
```

#### Challenge 2: Build a Mini State Management Library

```typescript
// TODO: Create a simple state management solution
class Store<T> {
  private state: T;
  private listeners: Set<(state: T) => void> = new Set();
  
  constructor(initialState: T) {
    // Your implementation
  }
  
  getState(): T {
    // Your implementation
  }
  
  setState(updater: (state: T) => T): void {
    // Your implementation
    // Should notify all listeners
  }
  
  subscribe(listener: (state: T) => void): () => void {
    // Your implementation
    // Should return unsubscribe function
  }
}

// Test your store
const counterStore = new Store({ count: 0 });

const unsubscribe = counterStore.subscribe(state => {
  console.log('Count updated:', state.count);
});

counterStore.setState(state => ({ count: state.count + 1 }));
```

---

## Common Pitfalls

### 🚨 Mistakes to Avoid at All Costs!

#### 1. **The God Object Anti-Pattern** 👹

```typescript
// ❌ Bad: One class that does everything
class GodManager {
  users: User[];
  products: Product[];
  orders: Order[];
  database: Database;
  emailService: EmailService;
  paymentGateway: PaymentGateway;
  analytics: Analytics;
  cache: Cache;
  logger: Logger;
  
  createUser() { /* ... */ }
  deleteUser() { /* ... */ }
  updateUser() { /* ... */ }
  createProduct() { /* ... */ }
  processPayment() { /* ... */ }
  sendEmail() { /* ... */ }
  generateReport() { /* ... */ }
  // ... 100 more methods
}

// ✅ Good: Separated concerns
class UserService { /* user-related logic */ }
class ProductService { /* product-related logic */ }
class PaymentService { /* payment-related logic */ }
```

#### 2. **Callback Hell** 🔥

```typescript
// ❌ Bad: Pyramid of doom
getUser(userId, (err, user) => {
  if (err) handleError(err);
  else {
    getOrders(user.id, (err, orders) => {
      if (err) handleError(err);
      else {
        getProducts(orders, (err, products) => {
          if (err) handleError(err);
          else {
            // ... more nesting
          }
        });
      }
    });
  }
});

// ✅ Good: Async/await
try {
  const user = await getUser(userId);
  const orders = await getOrders(user.id);
  const products = await getProducts(orders);
  // Clean, linear flow
} catch (error) {
  handleError(error);
}
```

---

## Quiz Yourself

### 🎓 Test Your Knowledge!

Test your understanding with our interactive quiz system. The quiz covers:

1. **Design Patterns** (25 questions)
2. **Architecture** (20 questions)  
3. **Frontend Scalability** (15 questions)
4. **Testing Strategies** (20 questions)
5. **Clean Code** (20 questions)

[Access the quiz system →](#) *(Quiz implementation in separate file)*

---

## Building with These Patterns

### Step-by-Step: Creating a New Service

Let's create a new "Notification Service" using these patterns:

```typescript
// 1. Define the Interface (Contract)
interface INotificationService {
  send(notification: Notification): Promise<void>;
  getHistory(userId: string): Promise<Notification[]>;
}

// 2. Define Domain Types
interface Notification {
  id: string;
  userId: string;
  type: 'email' | 'push' | 'in-app';
  title: string;
  message: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// 3. Create Repository Pattern
interface INotificationRepository {
  save(notification: Notification): Promise<void>;
  findByUser(userId: string): Promise<Notification[]>;
}

class PostgresNotificationRepository implements INotificationRepository {
  constructor(private pool: Pool) {} // DI: Database injected
  
  async save(notification: Notification): Promise<void> {
    await this.pool.query(
      'INSERT INTO notifications (id, user_id, type, title, message, metadata, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [notification.id, notification.userId, notification.type, notification.title, notification.message, notification.metadata, notification.createdAt]
    );
  }
  
  async findByUser(userId: string): Promise<Notification[]> {
    const result = await this.pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows.map(this.mapToNotification);
  }
  
  private mapToNotification(row: any): Notification {
    return {
      id: row.id,
      userId: row.user_id,
      type: row.type,
      title: row.title,
      message: row.message,
      metadata: row.metadata,
      createdAt: row.created_at
    };
  }
}

// 4. Create Service with Strategy Pattern for different notification types
interface INotificationStrategy {
  send(notification: Notification): Promise<void>;
}

class EmailStrategy implements INotificationStrategy {
  constructor(private emailClient: IEmailClient) {} // DI
  
  async send(notification: Notification): Promise<void> {
    await this.emailClient.send({
      to: notification.userId, // Would need to lookup email
      subject: notification.title,
      body: notification.message
    });
  }
}

class PushStrategy implements INotificationStrategy {
  constructor(private pushClient: IPushClient) {} // DI
  
  async send(notification: Notification): Promise<void> {
    await this.pushClient.send({
      token: await this.getUserToken(notification.userId),
      title: notification.title,
      body: notification.message
    });
  }
}

// 5. Main Service Implementation
export class NotificationService implements INotificationService {
  private strategies: Map<string, INotificationStrategy>;
  
  constructor(
    private repository: INotificationRepository,
    private emailStrategy: EmailStrategy,
    private pushStrategy: PushStrategy
  ) {
    // Strategy Pattern: Map notification types to strategies
    this.strategies = new Map([
      ['email', emailStrategy],
      ['push', pushStrategy],
      ['in-app', new InAppStrategy()]
    ]);
  }
  
  async send(notification: Notification): Promise<void> {
    // Save to database
    await this.repository.save(notification);
    
    // Get appropriate strategy
    const strategy = this.strategies.get(notification.type);
    if (!strategy) {
      throw new Error(`Unknown notification type: ${notification.type}`);
    }
    
    // Send using strategy
    await strategy.send(notification);
    
    // Emit event (Observer Pattern)
    this.emit('notification:sent', notification);
  }
  
  async getHistory(userId: string): Promise<Notification[]> {
    return this.repository.findByUser(userId);
  }
}

// 6. Factory Pattern for creation
export function createNotificationService(config: ServiceConfig): NotificationService {
  const pool = new Pool(config.database);
  const repository = new PostgresNotificationRepository(pool);
  const emailStrategy = new EmailStrategy(new SendGridClient(config.sendgrid));
  const pushStrategy = new PushStrategy(new FCMClient(config.firebase));
  
  return new NotificationService(repository, emailStrategy, pushStrategy);
}

// 7. Express Route Handler
export function createNotificationRoutes(service: INotificationService): Router {
  const router = express.Router();
  
  router.post('/send', async (req, res) => {
    try {
      const notification: Notification = {
        id: uuidv4(),
        userId: req.user.id, // From auth middleware
        type: req.body.type,
        title: req.body.title,
        message: req.body.message,
        metadata: req.body.metadata,
        createdAt: new Date()
      };
      
      await service.send(notification);
      res.json({ success: true, id: notification.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/history', async (req, res) => {
    const notifications = await service.getHistory(req.user.id);
    res.json(notifications);
  });
  
  return router;
}

// 8. Wire it all together in main app
const notificationService = createNotificationService(config);
app.use('/api/notifications', createNotificationRoutes(notificationService));
```

---

## Best Practices

### 1. Interface-First Design
Always define interfaces before implementations:
```typescript
// 1. Define the contract
interface IUserService {
  getUser(id: string): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
}

// 2. Then implement
class UserService implements IUserService {
  // Implementation details
}
```

### 2. Single Responsibility Principle
Each class/module should have one reason to change:
```typescript
// ✅ Good: Each class has one responsibility
class UserValidator {
  validate(user: User): ValidationResult {}
}

class UserRepository {
  save(user: User): Promise<void> {}
}

class UserNotifier {
  notifyUserCreated(user: User): Promise<void> {}
}

// ❌ Bad: Too many responsibilities
class UserManager {
  validate(user: User): ValidationResult {}
  save(user: User): Promise<void> {}
  notifyUserCreated(user: User): Promise<void> {}
}
```

### 3. Dependency Injection
Always inject dependencies, don't create them:
```typescript
// ✅ Good: Dependencies injected
class OrderService {
  constructor(
    private paymentGateway: IPaymentGateway,
    private emailService: IEmailService,
    private repository: IOrderRepository
  ) {}
}

// ❌ Bad: Creating dependencies internally
class OrderService {
  private paymentGateway = new StripeGateway(); // Hard to test!
  private emailService = new SendGridService();  // Can't mock!
}
```

### 4. Use TypeScript Properly
Leverage TypeScript's type system:
```typescript
// Use union types for state
type LoadingState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: Error };

// Use generics for reusable components
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Use type guards
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}
```

### 5. Error Handling
Implement proper error handling:
```typescript
// Custom error classes
class ServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ServiceError) {
    res.status(err.statusCode).json({
      error: err.code,
      message: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    });
  }
});
```

### 6. Testing Patterns
Write testable code:
```typescript
// Repository interface makes testing easy
describe('UserService', () => {
  it('should create user', async () => {
    // Mock repository
    const mockRepo: IUserRepository = {
      save: jest.fn().mockResolvedValue(mockUser),
      findById: jest.fn()
    };
    
    // Inject mock
    const service = new UserService(mockRepo);
    
    // Test
    const user = await service.createUser(userData);
    expect(mockRepo.save).toHaveBeenCalledWith(userData);
    expect(user).toEqual(mockUser);
  });
});
```

---

## Common Pitfalls to Avoid

### 1. Over-Engineering
Don't use patterns just because you can:
```typescript
// ❌ Over-engineered for simple case
class SimpleCalculatorFactoryBuilderStrategy {
  // 100 lines of code for adding two numbers
}

// ✅ Keep it simple when appropriate
function add(a: number, b: number): number {
  return a + b;
}
```

### 2. Tight Coupling
Avoid direct dependencies between modules:
```typescript
// ❌ Tight coupling
class EmailService {
  sendWelcomeEmail(user: User) {
    const db = new Database(); // Direct dependency!
    const template = db.getTemplate('welcome');
    // ...
  }
}

// ✅ Loose coupling
class EmailService {
  constructor(private templateService: ITemplateService) {}
  
  sendWelcomeEmail(user: User) {
    const template = this.templateService.get('welcome');
    // ...
  }
}
```

### 3. Ignoring SOLID Principles
- **S**ingle Responsibility
- **O**pen/Closed (open for extension, closed for modification)
- **L**iskov Substitution (derived classes must be substitutable)
- **I**nterface Segregation (many specific interfaces > one general)
- **D**ependency Inversion (depend on abstractions, not concretions)

---

## Conclusion

These design patterns aren't just theoretical concepts - they solve real problems:

- **Microservices** → Scale different parts independently
- **Agent Architecture** → Handle complex AI workflows
- **Registry Pattern** → Manage dynamic service discovery
- **Repository Pattern** → Abstract database operations
- **Factory Pattern** → Centralize object creation
- **Observer Pattern** → Decouple event producers and consumers
- **Retry Pattern** → Handle network failures gracefully
- **DI Pattern** → Make code testable and flexible

Remember:
1. **Patterns are tools**, not rules - use them when they solve a problem
2. **Start simple**, refactor to patterns when complexity grows
3. **Consistency matters** - use patterns consistently across the codebase
4. **Document your decisions** - explain why you chose specific patterns

The key to mastering these patterns is **practice**. Start by identifying them in existing code, then try implementing them in new features. Over time, you'll develop an intuition for when and how to apply each pattern effectively.

---

## Further Learning Resources

- **Books:**
  - "Design Patterns" by Gang of Four (classic)
  - "Clean Architecture" by Robert C. Martin
  - "Domain-Driven Design" by Eric Evans

- **Online:**
  - [Refactoring Guru](https://refactoring.guru/design-patterns)
  - [Patterns.dev](https://www.patterns.dev/)
  - [TypeScript Design Patterns](https://www.typescriptlang.org/docs/handbook/2/classes.html)

- **Practice:**
  - Implement each pattern in a small project
  - Refactor existing code to use patterns
  - Contribute to open source projects

Happy coding! 🚀
{% endraw %}
