---
layout: product
title: FEATURE CENTER CONFIG
product: DevMentor
source: infrastructure/services/feature-center/FEATURE_CENTER_CONFIG.md
---

{% raw %}
CURRENT ARCHITECTURE

### 1. Basic Service Setup
```yaml
# This is the main Feature Center service configuration
name: feature-center        # The service name
port: 8084                 # Where it listens for requests
version: 1.0.0             # Current version
type: core-service         # It's a main DevMentor service
```

### 2. What It Needs to Run
```yaml
# Resources needed by Feature Center
memory:
  minimum: 512MB     # Won't start with less
  preferred: 1GB     # Works best with this
cpu:
  minimum: "0.25"    # Quarter of a CPU core
  preferred: "0.5"   # Half a CPU core
storage:
  type: postgresql   # Uses PostgreSQL database
  size: 10GB        # Needs this much space
```

### 3. How It Connects to Other Services
```yaml
# Connection details (simplified)
connections:
  devlog:
    url: http://devlog-service:8085
    type: http
    purpose: "Stores development history"

  tdd-service:
    url: http://tdd-service:8087
    type: http
    purpose: "Manages test workflows"

  ai-service:
    url: http://ai-service:8088
    type: http
    purpose: "Provides AI assistance"
```

## Main Features 🌟

### 1. Task Handling
```python
# Example of how tasks are managed
task_config = {
    "types": ["feature", "bug", "improvement"],
    "states": ["new", "in-progress", "review", "done"],
    "priorities": ["low", "medium", "high", "urgent"]
}
```

### 2. Development Workflows
```yaml
# Supported development workflows
workflows:
  tdd:                     # Test Driven Development
    phases: 
      - red               # Write failing test
      - green            # Make test pass
      - refactor         # Improve code
    
  standard:               # Regular Development
    phases:
      - code
      - test
      - review
```

### 3. Service Communication
```yaml
# How Feature Center talks to others
communication:
  type: http              # Uses HTTP/REST
  format: json            # Sends/receives JSON
  security: tls           # Encrypted connections
```

## Database Layout 📁

### Main Tables (Simplified)
```sql
-- This is what Feature Center remembers
TASKS:
  - ID
  - Title
  - Status
  - Priority
  - Assigned To
  - Due Date

WORKFLOWS:
  - Task ID
  - Type (TDD/Standard)
  - Current Phase
  - Progress

EVENTS:
  - When It Happened
  - What Happened
  - Related Task
  - Details
```

## Configuration Examples 📝

### 1. Setting Up a New Task
```json
{
  "task": {
    "title": "Add login button",
    "type": "feature",
    "priority": "high",
    "description": "Add login button to homepage",
    "assignee": "dev.team.member"
  }
}
```

### 2. Starting a Workflow
```json
{
  "workflow": {
    "task_id": "TASK-123",
    "type": "tdd",
    "initial_context": {
      "component": "authentication",
      "location": "homepage",
      "requirements": [
        "Use company design system",
        "Follow accessibility guidelines"
      ]
    }
  }
}
```

### 3. Service Integration
```yaml
# How Feature Center connects to everything
integrations:
  devlog:
    enabled: true
    sync_interval: 30s    # Update every 30 seconds
    
  tdd_service:
    enabled: true
    auto_setup: true     # Automatically prepare TDD environment
    
  ai_service:
    enabled: true
    context_sharing: true # Share task context with AI
```

## Running in Development 🚀

### Local Setup
```bash
# Start Feature Center locally
docker run --name feature-center \
  -p 8084:8084 \
  -e DATABASE_URL=postgresql://localhost:5432/devmentor \
  -e DEVLOG_SERVICE_URL=http://localhost:8085 \
  devmentor/feature-center:latest
```

### Development URLs
```yaml
# Where to find everything in development
urls:
  feature_center: http://localhost:8084
  api_docs: http://localhost:8084/docs
  health_check: http://localhost:8084/health
  metrics: http://localhost:8084/metrics
```

## Common Operations 🛠️

### 1. Creating a Task
```http
POST http://feature-center:8084/api/v1/tasks
Content-Type: application/json

{
  "title": "Add login button",
  "type": "feature",
  "priority": "high"
}
```

### 2. Starting a Workflow
```http
POST http://feature-center:8084/api/v1/workflows
Content-Type: application/json

{
  "task_id": "TASK-123",
  "type": "tdd"
}
```

### 3. Checking Status
```http
GET http://feature-center:8084/api/v1/tasks/TASK-123/status
```

## Health & Monitoring 🏥

### Health Checks
```yaml
# How to know if Feature Center is healthy
health_checks:
  - name: database
    endpoint: /health/db
    interval: 30s
    
  - name: services
    endpoint: /health/services
    interval: 1m
```

### Metrics
```yaml
# What Feature Center measures
metrics:
  - active_tasks
  - workflow_durations
  - service_response_times
  - error_rates
```

## Need Help? 🤝

### Common Issues
1. Can't connect to other services?
   ```bash
   # Check service health
   curl http://feature-center:8084/health
   ```

2. Task not starting?
   ```bash
   # Check task status
   curl http://feature-center:8084/api/v1/tasks/{task_id}
   ```

3. Workflow stuck?
   ```bash
   # Check workflow status
   curl http://feature-center:8084/api/v1/workflows/{task_id}
   ```

### Getting Support
- Check logs: `docker logs feature-center`
- Health API: `/health`
- Documentation: `/docs`

Remember: Feature Center is designed to be developer-friendly. If something's not working, it's probably trying to tell you what's wrong through its health checks and logs!

---

*Need more help? The DevMentor team is always here to assist!*
{% endraw %}
