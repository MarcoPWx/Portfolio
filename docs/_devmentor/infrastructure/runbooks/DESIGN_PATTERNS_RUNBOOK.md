---
layout: product
title: DESIGN PATTERNS RUNBOOK
product: DevMentor
source: infrastructure/runbooks/DESIGN_PATTERNS_RUNBOOK.md
---

{% raw %}
# Design Patterns Implementation Runbook

## Table of Contents
1. [Distributed Locking Pattern](#distributed-locking-pattern)
2. [Blackboard Pattern](#blackboard-pattern)
3. [Circuit Breaker Pattern](#circuit-breaker-pattern)
4. [Actor Pattern](#actor-pattern)
5. [Event Streaming Pattern](#event-streaming-pattern)
6. [Saga Pattern](#saga-pattern)

---

## Distributed Locking Pattern

### Why We Need It
In DevMentor, multiple users might try to edit the same project simultaneously. Without distributed locking:
- **Race Conditions**: Two users save conflicting changes
- **Lost Updates**: User B overwrites User A's changes
- **Inconsistent State**: Partial updates from multiple sources

### How It Works
```
User A                Redis Lock            User B
  |                      |                     |
  |--Request Lock------->|                     |
  |<--Lock Granted-------|                     |
  |                      |<----Request Lock----|
  |                      |--Lock Denied------->|
  |--Make Changes------->|                     |
  |--Release Lock------->|                     |
  |                      |<----Request Lock----|
  |                      |--Lock Granted------>|
```

### Implementation Steps

#### Step 1: Install Dependencies
```bash
npm install ioredis uuid
```

#### Step 2: Create Lock Manager
```typescript
// infrastructure/services/shared/RedisLockManager.ts
import Redis from 'ioredis';
import { v4 as uuid } from 'uuid';

export class RedisLockManager {
  private redis: Redis;
  
  constructor(redisUrl: string) {
    this.redis = new Redis(redisUrl);
  }
  
  async acquireLock(resource: string, ttl: number = 30000): Promise<string | null> {
    const lockId = uuid();
    const lockKey = `lock:${resource}`;
    
    // SET NX (only if not exists) EX (with expiry)
    const result = await this.redis.set(
      lockKey, 
      lockId, 
      'PX', ttl,  // milliseconds
      'NX'        // only if not exists
    );
    
    return result === 'OK' ? lockId : null;
  }
  
  async releaseLock(resource: string, lockId: string): Promise<boolean> {
    const lockKey = `lock:${resource}`;
    
    // Lua script ensures atomic check-and-delete
    const luaScript = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;
    
    const result = await this.redis.eval(luaScript, 1, lockKey, lockId);
    return result === 1;
  }
  
  async extendLock(resource: string, lockId: string, ttl: number): Promise<boolean> {
    const lockKey = `lock:${resource}`;
    
    const luaScript = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("pexpire", KEYS[1], ARGV[2])
      else
        return 0
      end
    `;
    
    const result = await this.redis.eval(luaScript, 1, lockKey, lockId, ttl);
    return result === 1;
  }
}
```

#### Step 3: Use in Project Service
```typescript
// Usage in project editing
async claimProject(projectId: string, userId: string): Promise<ClaimToken> {
  const lockManager = new RedisLockManager(process.env.REDIS_URL);
  
  // Try to acquire lock
  const lockId = await lockManager.acquireLock(`project:${projectId}`, 300000); // 5 min
  
  if (!lockId) {
    throw new Error('Project is currently being edited by another user');
  }
  
  // Create claim token
  const claimToken = {
    id: lockId,
    projectId,
    userId,
    expiresAt: Date.now() + 300000
  };
  
  // Store claim in database
  await db.claims.create(claimToken);
  
  return claimToken;
}
```

### Testing the Pattern
```bash
# Terminal 1: Try to acquire lock
curl -X POST http://localhost:8080/api/projects/123/claim \
  -H "Authorization: Bearer user1_token"

# Terminal 2: Should fail while locked
curl -X POST http://localhost:8080/api/projects/123/claim \
  -H "Authorization: Bearer user2_token"
```

### Common Pitfalls & Solutions
1. **Deadlocks**: Always use timeouts (TTL)
2. **Clock Skew**: Use Redis server time, not client time
3. **Network Partitions**: Implement retry with exponential backoff

---

## Blackboard Pattern

### Why We Need It
DevMentor's AI needs multiple specialized agents to collaborate:
- Code Analysis Agent
- Documentation Agent
- Architecture Agent
- Security Agent

Without coordination, these agents would work in isolation, missing insights.

### How It Works
```
     Blackboard (Shared Knowledge)
           |
    +------+------+------+
    |      |      |      |
Agent1  Agent2  Agent3  Controller
(Code)  (Docs)  (Arch)  (Orchestrator)
```

### Implementation Steps

#### Step 1: Create Blackboard Structure
```typescript
// infrastructure/services/ai-gateway/blackboard/BlackboardSystem.ts
export interface Knowledge {
  id: string;
  source: string;
  type: 'analysis' | 'suggestion' | 'warning' | 'insight';
  confidence: number;
  data: any;
  timestamp: number;
}

export class BlackboardSystem {
  private redis: Redis;
  private knowledgeBase: Map<string, Knowledge[]> = new Map();
  private agents: Map<string, IKnowledgeAgent> = new Map();
  
  async initializeProblem(problemId: string, problemData: any): Promise<void> {
    // Initialize blackboard in Redis
    await this.redis.hset(`blackboard:${problemId}`, {
      status: 'active',
      problem: JSON.stringify(problemData),
      createdAt: Date.now()
    });
    
    // Create Redis Stream for contributions
    await this.redis.xadd(
      `blackboard:${problemId}:stream`,
      '*',
      'event', 'initialized',
      'data', JSON.stringify(problemData)
    );
  }
  
  async contribute(problemId: string, knowledge: Knowledge): Promise<void> {
    // Add to Redis Stream
    await this.redis.xadd(
      `blackboard:${problemId}:stream`,
      '*',
      'source', knowledge.source,
      'type', knowledge.type,
      'data', JSON.stringify(knowledge.data),
      'confidence', knowledge.confidence.toString()
    );
    
    // Notify controller
    this.emit('knowledge:added', { problemId, knowledge });
  }
  
  async synthesizeSolution(problemId: string): Promise<Solution> {
    // Get all contributions
    const contributions = await this.redis.xrange(
      `blackboard:${problemId}:stream`,
      '-', '+'
    );
    
    // Aggregate knowledge by type
    const aggregated = this.aggregateKnowledge(contributions);
    
    // Apply synthesis rules
    return this.applySynthesisRules(aggregated);
  }
}
```

#### Step 2: Create Knowledge Agents
```typescript
// infrastructure/services/ai-gateway/agents/CodeAnalysisAgent.ts
export class CodeAnalysisAgent implements IKnowledgeAgent {
  async analyze(problem: Problem): Promise<Knowledge[]> {
    const knowledge: Knowledge[] = [];
    
    // Analyze code structure
    const structure = await this.analyzeStructure(problem.code);
    knowledge.push({
      id: uuid(),
      source: 'CodeAnalysisAgent',
      type: 'analysis',
      confidence: 0.9,
      data: structure,
      timestamp: Date.now()
    });
    
    // Check for patterns
    const patterns = await this.detectPatterns(problem.code);
    knowledge.push({
      id: uuid(),
      source: 'CodeAnalysisAgent',
      type: 'insight',
      confidence: 0.85,
      data: patterns,
      timestamp: Date.now()
    });
    
    return knowledge;
  }
}
```

#### Step 3: Orchestrate Collaboration
```typescript
// Usage
async function solveProblem(problemData: any) {
  const blackboard = new BlackboardSystem();
  const problemId = uuid();
  
  // Initialize
  await blackboard.initializeProblem(problemId, problemData);
  
  // Register agents
  blackboard.registerAgent(new CodeAnalysisAgent());
  blackboard.registerAgent(new DocumentationAgent());
  blackboard.registerAgent(new ArchitectureAgent());
  
  // Let agents contribute (parallel)
  await blackboard.runAgents(problemId);
  
  // Wait for contributions
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Synthesize solution
  const solution = await blackboard.synthesizeSolution(problemId);
  
  return solution;
}
```

### Testing the Pattern
```bash
# Submit problem to blackboard
curl -X POST http://localhost:8080/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function getData() { ... }",
    "context": "performance optimization"
  }'

# Monitor blackboard contributions
redis-cli XREAD STREAMS blackboard:problem123:stream 0
```

---

## Circuit Breaker Pattern

### Why We Need It
External services (Ollama, APIs) can fail. Without protection:
- **Cascading Failures**: One service failure brings down everything
- **Resource Exhaustion**: Threads blocked waiting for timeouts
- **Poor User Experience**: Long waits for inevitable failures

### How It Works
```
CLOSED (Normal)
  |
  | (failures > threshold)
  v
OPEN (Blocking calls)
  |
  | (timeout expires)
  v
HALF_OPEN (Testing recovery)
  |
  | (success/failure)
  v
CLOSED or OPEN
```

### Implementation (Already Exists!)
Location: `infrastructure/services/ai-gateway/src/patterns/circuitBreaker.ts`

### Usage Example
```typescript
const breaker = new CircuitBreaker({
  failureThreshold: 5,
  recoveryTimeout: 60000,
  monitoringPeriod: 10000
});

// Wrap risky calls
async function callOllama(prompt: string) {
  return breaker.execute(async () => {
    const response = await fetch('http://ollama:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      timeout: 5000
    });
    
    if (!response.ok) throw new Error('Ollama error');
    return response.json();
  });
}
```

---

## Actor Pattern

### Why We Need It
Managing concurrent AI agents with independent state and behavior.

### How It Works (Already Implemented!)
Location: `infrastructure/services/learning-engine/core/agents/`

Each agent is an independent actor with:
- Own state
- Message queue
- Capability declarations
- Lifecycle management

---

## Event Streaming Pattern

### Why We Need It
Real-time updates across distributed services without tight coupling.

### Implementation (Already Exists!)
Location: `infrastructure/services/ai-gateway/src/principal-developer/RedisStreamsIntegration.ts`

---

## Saga Pattern

### Why We Need It
Distributed transactions across multiple services.

### Implementation Steps

#### Step 1: Define Saga
```typescript
// infrastructure/services/shared/saga/SagaOrchestrator.ts
export interface SagaStep {
  service: string;
  action: string;
  params: any;
  compensation?: SagaStep;
}

export class SagaOrchestrator {
  private steps: SagaStep[] = [];
  private executedSteps: SagaStep[] = [];
  
  async execute(saga: Saga): Promise<void> {
    for (const step of saga.steps) {
      try {
        await this.executeStep(step);
        this.executedSteps.push(step);
      } catch (error) {
        // Rollback in reverse order
        await this.compensate();
        throw error;
      }
    }
  }
  
  private async compensate(): Promise<void> {
    for (const step of this.executedSteps.reverse()) {
      if (step.compensation) {
        await this.executeStep(step.compensation);
      }
    }
  }
}
```

#### Step 2: Define Business Saga
```typescript
// Example: Create project with AI analysis
const createProjectSaga: Saga = {
  name: 'CreateProjectWithAnalysis',
  steps: [
    {
      service: 'auth',
      action: 'validateUser',
      params: { userId },
      compensation: null // Can't undo validation
    },
    {
      service: 'projects',
      action: 'create',
      params: { projectData },
      compensation: {
        service: 'projects',
        action: 'delete',
        params: { projectId: '{{result.id}}' }
      }
    },
    {
      service: 'ai-gateway',
      action: 'analyzeProject',
      params: { projectId: '{{steps[1].result.id}}' },
      compensation: {
        service: 'ai-gateway',
        action: 'deleteAnalysis',
        params: { projectId: '{{steps[1].result.id}}' }
      }
    }
  ]
};
```

---

## Quick Reference Commands

### Check Pattern Implementations
```bash
# Check Redis locks
redis-cli KEYS "lock:*"

# Monitor blackboard streams
redis-cli XREAD STREAMS blackboard:*:stream 0

# Check circuit breaker status
curl http://localhost:8080/api/admin/circuit-breakers

# View actor system status
curl http://localhost:8080/api/learning/agents/status
```

### Debug Commands
```bash
# Watch Redis operations
redis-cli MONITOR

# Check service logs
kubectl logs -f deployment/api-gateway -n devmentor-app

# Test distributed lock
node -e "
const Redis = require('ioredis');
const redis = new Redis();
redis.set('lock:test', 'myid', 'NX', 'EX', 10).then(console.log);
"
```

---

## Implementation Priority

1. **Distributed Locking** (Critical for data integrity)
2. **Blackboard Pattern** (Enables AI collaboration)
3. **Saga Pattern** (Ensures transaction consistency)

## Next Steps
1. Implement RedisLockManager
2. Add lock/claim endpoints to Project Service
3. Create Blackboard system for AI Gateway
4. Test patterns with integration tests
{% endraw %}
