---
layout: product
title: PROJECT SERVICE GUIDE
product: DevMentor
source: infrastructure/services/project-service/PROJECT_SERVICE_GUIDE.md
---

{% raw %}
CURRENT ARCHITECTURE

# DevMentor Project Service Guide

## 🎯 Quick Start

```bash
# 1. Clone and install
git clone git@github.com:devmentor/project-service.git
cd project-service
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env with your settings

# 3. Start dependencies (using Docker)
docker-compose up -d postgres redis

# 4. Run the service
npm run dev

# 5. Test it works
curl http://localhost:3005/health
```

## 📚 Learning Path

### 1. Basics (Day 1)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
- [Basic Operations](#basic-operations)

### 2. Advanced (Day 2-3)
- [Integration Patterns](#integration-patterns)
- [Event System](#event-system)
- [Error Handling](#error-handling)

### 3. Operations (Day 4-5)
- [Deployment Guide](#deployment-guide)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

---

## Project Structure

### Key Files & Directories
```
project-service/
├── src/
│   ├── index.ts         # Service entry point
│   ├── routes/          # API endpoints
│   ├── services/        # Business logic
│   ├── models/          # Data models
│   └── events/          # Event handlers
├── config/              # Configuration
├── scripts/             # Utility scripts
└── docs/               # Documentation
```

### Key Components
```mermaid
graph TD
    A[API Layer] --> B[Service Layer]
    B --> C[Data Layer]
    B --> D[Event Bus]
    D --> E[Other Services]
```

## Core Concepts

### 1. Project Management
```typescript
// Example: Creating a new project
const project = await projectService.create({
  name: "My First Project",
  description: "Learning the Project Service",
  type: "web",
  techStack: ["nodejs", "typescript"]
});
```

### 2. Task Organization
```
Project
├── Epic: User Authentication
│   ├── Task: Login UI
│   ├── Task: Backend API
│   └── Task: Testing
└── Epic: Dashboard
    ├── Task: Analytics
    └── Task: Reports
```

### 3. File Management
```typescript
// Example: Uploading a project file
const file = await fileService.upload({
  projectId: "proj-123",
  file: fileBuffer,
  metadata: {
    type: "document",
    tags: ["specs"]
  }
});
```

## Integration Patterns

### 1. Service Integration Map
```
┌──────────────────────────────────────────────────────┐
│                 PROJECT SERVICE                       │
├──────────────────────────────────────────────────────┤
│                                                      │
│ ┌──────────┐   ┌──────────┐   ┌──────────┐         │
│ │Auth      │   │Learning  │   │AI        │         │
│ │Service   │◀──┤Service   │◀──┤Gateway   │         │
│ └──────────┘   └──────────┘   └──────────┘         │
│                                                      │
│ ┌──────────┐   ┌──────────┐   ┌──────────┐         │
│ │Database  │   │Redis     │   │File      │         │
│ │(Postgres)│   │Cache     │   │Storage   │         │
│ └──────────┘   └──────────┘   └──────────┘         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 2. Authentication Flow
```mermaid
sequenceDiagram
    Client->>Project Service: Request with JWT
    Project Service->>Auth Service: Validate Token
    Auth Service-->>Project Service: Token Valid
    Project Service->>Database: Execute Request
    Database-->>Project Service: Response
    Project Service-->>Client: Response
```

### 3. Event Communication
```typescript
// Publishing Events
eventBus.publish('project.created', {
  projectId: 'proj-123',
  name: 'New Project',
  userId: 'user-456'
});

// Subscribing to Events
eventBus.subscribe('user.deleted', async (event) => {
  await cleanupUserProjects(event.userId);
});
```

## Basic Operations

### 1. Project Operations
```typescript
// Create Project
const project = await projectService.create({
  name: "Learning Project",
  type: "education"
});

// List Projects
const projects = await projectService.list({
  userId: "user-123",
  status: "active"
});

// Update Project
await projectService.update("proj-123", {
  status: "completed"
});
```

### 2. Epic & Task Management
```typescript
// Create Epic
const epic = await epicService.create({
  projectId: "proj-123",
  name: "User Authentication",
  priority: "P1"
});

// Add Task to Epic
const task = await taskService.create({
  epicId: epic.id,
  name: "Implement Login",
  assignee: "dev-456"
});
```

### 3. File Handling
```typescript
// Upload File
const file = await fileService.upload({
  projectId: "proj-123",
  file: fileBuffer,
  name: "requirements.md"
});

// List Project Files
const files = await fileService.list({
  projectId: "proj-123",
  type: "document"
});
```

## Event System

### 1. Available Events
```yaml
Published Events:
  project.created:
    - projectId: string
    - name: string
    - userId: string
  
  epic.updated:
    - epicId: string
    - changes: object
  
  task.completed:
    - taskId: string
    - completedBy: string

Subscribed Events:
  user.deleted:
    - userId: string
  
  maintenance.started:
    - duration: number
```

### 2. Event Handlers
```typescript
// Task Completion Handler
eventBus.on('task.completed', async (event) => {
  // Update project progress
  await updateProgress(event.taskId);
  
  // Notify relevant users
  await notifyAssignees(event.taskId);
  
  // Trigger AI analysis
  await analyzeTaskCompletion(event.taskId);
});
```

### 3. Integration Example
```typescript
// Complete Service Integration
class ProjectService {
  async createProject(data) {
    // 1. Store in database
    const project = await db.projects.create(data);
    
    // 2. Create project directory
    await fileSystem.createDirectory(project.id);
    
    // 3. Publish event
    await eventBus.publish('project.created', {
      projectId: project.id,
      name: project.name,
      userId: data.userId
    });
    
    // 4. Update cache
    await cache.set(`project:${project.id}`, project);
    
    // 5. Log activity
    await activityLog.record({
      type: 'PROJECT_CREATED',
      projectId: project.id,
      userId: data.userId
    });
    
    return project;
  }
}
```

## Error Handling

### 1. Common Errors
```typescript
// Error Types
enum ProjectServiceError {
  PROJECT_NOT_FOUND = 'PROJECT_NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_INPUT = 'INVALID_INPUT',
  INTEGRATION_ERROR = 'INTEGRATION_ERROR'
}

// Error Handler
app.use((err, req, res, next) => {
  logger.error({
    error: err.message,
    stack: err.stack,
    requestId: req.id
  });

  res.status(err.status || 500).json({
    error: {
      code: err.code,
      message: err.message,
      requestId: req.id
    }
  });
});
```

### 2. Integration Error Handling
```typescript
// Resilient Integration
class IntegrationService {
  async callExternalService(operation) {
    const retries = 3;
    
    for (let i = 0; i < retries; i++) {
      try {
        return await operation();
      } catch (error) {
        if (i === retries - 1) throw error;
        await sleep(Math.pow(2, i) * 1000);
      }
    }
  }
}
```

## Deployment Guide

### 1. Local Development
```bash
# Start dependencies
docker-compose up -d

# Run migrations
npm run migrate:up

# Start service
npm run dev
```

### 2. Production Deployment
```yaml
# kubernetes/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: project-service
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: project-service
        image: devmentor/project-service:2.0.0
        ports:
        - containerPort: 3005
        env:
        - name: NODE_ENV
          value: production
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
```

## Monitoring

### 1. Health Checks
```http
GET /health

Response:
{
  "status": "healthy",
  "version": "2.0.0",
  "checks": {
    "database": "connected",
    "redis": "connected",
    "fileSystem": "writable"
  }
}
```

### 2. Metrics
```typescript
// Metric Collection
const metrics = {
  projectsCreated: new Counter({
    name: 'projects_created_total',
    help: 'Total number of projects created'
  }),
  
  taskCompletionTime: new Histogram({
    name: 'task_completion_seconds',
    help: 'Time taken to complete tasks'
  })
};
```

### 3. Logging
```typescript
// Structured Logging
logger.info('Project created', {
  projectId: project.id,
  userId: user.id,
  type: project.type,
  duration: timing.end - timing.start
});
```

## Troubleshooting

### 1. Common Issues
```yaml
Database Connection:
  symptoms:
    - Slow responses
    - Connection errors
  checks:
    - Database connectivity
    - Connection pool status
    - Query performance
  solution:
    - Check DATABASE_URL
    - Verify network access
    - Monitor connection pool

Event Processing:
  symptoms:
    - Missing notifications
    - Delayed updates
  checks:
    - Redis connection
    - Event queue size
    - Consumer health
  solution:
    - Verify Redis connectivity
    - Check consumer logs
    - Monitor queue length
```

### 2. Debug Mode
```bash
# Enable debug logging
DEBUG=project-service:* npm run dev

# Monitor events
redis-cli monitor

# Check database queries
DEBUG=knex:query npm run dev
```

### 3. Support Resources
```yaml
Documentation:
  - API Docs: /api-docs
  - OpenAPI Spec: /openapi.json
  - Integration Guide: /docs/integration.md

Support:
  - Slack: #devmentor-platform
  - Email: platform@devmentor.ai
  - On-call: +1-XXX-XXX-XXXX
```

## Best Practices

### 1. Code Standards
```typescript
// Use TypeScript for type safety
interface Project {
  id: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
}

// Use dependency injection
class ProjectService {
  constructor(
    private db: Database,
    private eventBus: EventBus,
    private fileSystem: FileSystem
  ) {}
}
```

### 2. Error Handling
```typescript
// Centralized error handling
class ProjectError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message);
  }
}

// Usage
throw new ProjectError(
  'Project not found',
  'PROJECT_NOT_FOUND',
  404
);
```

### 3. Testing
```typescript
// Unit test example
describe('ProjectService', () => {
  it('should create project', async () => {
    const service = new ProjectService(db, eventBus, fs);
    const project = await service.create({
      name: 'Test Project'
    });
    expect(project).toHaveProperty('id');
  });
});
```

## Integration Examples

### 1. Frontend Integration
```typescript
// React hook example
function useProject(projectId: string) {
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    projectService.get(projectId)
      .then(setProject);
      
    const subscription = eventBus.subscribe(
      `project.${projectId}.updated`,
      setProject
    );
    
    return () => subscription.unsubscribe();
  }, [projectId]);
  
  return project;
}
```

### 2. Service-to-Service Integration
```typescript
// Learning service integration
class LearningService {
  async onProjectCreated(event) {
    // Create learning path
    const path = await this.createLearningPath(event.projectId);
    
    // Add initial resources
    await this.addResources(path.id, event.type);
    
    // Notify project service
    await eventBus.publish('learning.path.created', {
      projectId: event.projectId,
      pathId: path.id
    });
  }
}
```

### 3. AI Integration
```typescript
// AI Gateway integration
class AIService {
  async analyzePullRequest(pr) {
    // Get project context
    const project = await projectService.get(pr.projectId);
    
    // Get related tasks
    const tasks = await taskService.findByPR(pr.id);
    
    // Run AI analysis
    const analysis = await aiGateway.analyze({
      type: 'code-review',
      context: {
        project,
        tasks,
        pullRequest: pr
      }
    });
    
    return analysis;
  }
}
```

---

## Quick Reference

### Common Operations
```typescript
// Create project
const project = await projectService.create({
  name: "New Project",
  type: "web"
});

// Add epic
const epic = await epicService.create({
  projectId: project.id,
  name: "Authentication"
});

// Add task
const task = await taskService.create({
  epicId: epic.id,
  name: "Login UI"
});

// Upload file
const file = await fileService.upload({
  projectId: project.id,
  file: fileBuffer
});
```

### Environment Variables
```bash
# Required
DATABASE_URL=postgresql://user:pass@localhost:5432/devmentor
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key

# Optional
NODE_ENV=development
LOG_LEVEL=debug
PORT=3005
```

### API Routes
```http
# Projects
GET    /projects
POST   /projects
GET    /projects/:id
PUT    /projects/:id
DELETE /projects/:id

# Epics
GET    /projects/:id/epics
POST   /projects/:id/epics

# Tasks
GET    /epics/:id/tasks
POST   /epics/:id/tasks

# Files
POST   /projects/:id/files
GET    /files/:id
```

---

## Further Reading

1. [Complete API Documentation](./docs/api.md)
2. [Event System Guide](./docs/events.md)
3. [Deployment Guide](./docs/deployment.md)
4. [Contributing Guide](./CONTRIBUTING.md)
5. [Security Practices](./docs/security.md)

---

*Last Updated: August 17, 2024*
*Version: 2.0.0*
*Status: Production Ready*
{% endraw %}
