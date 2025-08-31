---
layout: product
title: USING SWAGGER
product: DevMentor
source: infrastructure/services/swagger/USING_SWAGGER.md
---

{% raw %}
CURRENT ARCHITECTURE

# Using Swagger in DevMentor Services 📚

## Quick Start Guide

### 1. Accessing Swagger UI 🌐

Each service has its own Swagger documentation available at:

```
Auth Service:    http://localhost:3002/api-docs
AI Gateway:      http://localhost:3001/api-docs
Memory Service:  http://localhost:3003/api-docs
Project Service: http://localhost:3005/api-docs
```

### 2. Starting the Services 🚀

```bash
# Start all services
docker-compose up -d

# Or start individual services
docker-compose up -d auth-service
docker-compose up -d ai-gateway
```

## Service-by-Service Guide

### Auth Service (/api-docs)

```ascii
┌───────────────────────────────────────────────────────┐
│ DevMentor Auth Service API                           │
├───────────────────────────────────────────────────────┤
│ 🔐 Authentication                                     │
│  POST /auth/login         - Login user               │
│  POST /auth/register     - Register new user         │
│                                                      │
│ 👤 Profile                                           │
│  GET  /auth/profile      - Get user profile          │
│  PUT  /auth/profile      - Update profile            │
│                                                      │
│ 🔄 OAuth                                             │
│  GET  /auth/github       - GitHub OAuth              │
│  GET  /auth/github/cb    - OAuth callback            │
└───────────────────────────────────────────────────────┘
```

#### Using Auth Service Swagger:
1. Open `http://localhost:3002/api-docs`
2. Click "Authentication" section
3. Try "POST /auth/register":
   ```json
   {
     "email": "test@example.com",
     "password": "test1234",
     "role": "user"
   }
   ```
4. Copy the token from response
5. Click "Authorize" button at top
6. Enter token: "Bearer your_token_here"

### AI Gateway (/api-docs)

```ascii
┌───────────────────────────────────────────────────────┐
│ DevMentor AI Gateway API                             │
├───────────────────────────────────────────────────────┤
│ 🤖 Chat                                              │
│  POST /api/chat/completions  - Chat completion       │
│  GET  /api/models           - List models            │
│                                                      │
│ 📊 Analysis                                          │
│  POST /api/code/analyze     - Code analysis          │
│  POST /api/github/analyze   - Repository analysis    │
│                                                      │
│ 📚 Learning                                          │
│  POST /api/pbml/emit       - Learning events         │
│  GET  /api/pbml/status     - PBML status            │
└───────────────────────────────────────────────────────┘
```

#### Using AI Gateway Swagger:
1. Open `http://localhost:3001/api-docs`
2. Authorize with token from Auth Service
3. Try chat completion:
   ```json
   {
     "model": "llama2",
     "messages": [
       {
         "role": "user",
         "content": "Hello, how can you help me?"
       }
     ]
   }
   ```

### Memory Service (/api-docs)

```ascii
┌───────────────────────────────────────────────────────┐
│ DevMentor Memory Service API                         │
├───────────────────────────────────────────────────────┤
│ 🧠 Memories                                          │
│  POST /api/memories        - Store memory            │
│  GET  /api/memories/search - Search memories         │
│  GET  /api/memories/{id}   - Get specific memory     │
│                                                      │
│ 🔍 Context                                           │
│  GET  /api/context        - Get learning context     │
│  POST /api/context/update - Update context           │
└───────────────────────────────────────────────────────┘
```

#### Using Memory Service Swagger:
1. Open `http://localhost:3003/api-docs`
2. Authorize with token
3. Try memory search:
   ```json
   {
     "query": "docker",
     "limit": 10,
     "type": "code"
   }
   ```

### Project Service (/api-docs)

```ascii
┌───────────────────────────────────────────────────────┐
│ DevMentor Project Service API                        │
├───────────────────────────────────────────────────────┤
│ 📂 Projects                                          │
│  POST /api/projects       - Create project           │
│  GET  /api/projects      - List projects             │
│  GET  /api/projects/{id} - Get project details       │
│                                                      │
│ 📝 Tasks                                             │
│  POST /api/tasks         - Create task               │
│  PUT  /api/tasks/{id}    - Update task status        │
└───────────────────────────────────────────────────────┘
```

#### Using Project Service Swagger:
1. Open `http://localhost:3005/api-docs`
2. Authorize with token
3. Try creating project:
   ```json
   {
     "name": "My Project",
     "description": "Test project",
     "type": "personal"
   }
   ```

## Common Operations

### 1. Authentication 🔑
```ascii
┌─────────────────────────────────────────┐
│ 1. Get Token (Auth Service)             │
│    POST /auth/login                     │
│    → Copy token from response           │
│                                         │
│ 2. Click "Authorize" button (any UI)    │
│    Enter: Bearer <your_token>           │
│                                         │
│ 3. Look for 🔓 icon = Authenticated     │
└─────────────────────────────────────────┘
```

### 2. Testing Endpoints ✅
```ascii
┌─────────────────────────────────────────┐
│ 1. Expand endpoint                      │
│ 2. Click "Try it out"                   │
│ 3. Fill in parameters                   │
│ 4. Click "Execute"                      │
│ 5. Check response below                 │
└─────────────────────────────────────────┘
```

### 3. Viewing Models 📋
```ascii
┌─────────────────────────────────────────┐
│ 1. Scroll to "Schemas" section          │
│ 2. Click model name to expand           │
│ 3. See all properties and types         │
│ 4. Required fields marked with *        │
└─────────────────────────────────────────┘
```

## Tips & Tricks 💡

### 1. Request Examples
Each endpoint has example requests. Click "Example Value" in the request body section:

```json
// Auth Login Example
{
  "email": "demo@devmentor.ai",
  "password": "demo1234"
}

// Chat Completion Example
{
  "model": "llama2",
  "messages": [
    {
      "role": "user",
      "content": "Hello"
    }
  ]
}
```

### 2. Response Codes
```ascii
🟢 2XX - Success
  200 - OK
  201 - Created
  204 - No Content

🟡 4XX - Client Error
  400 - Bad Request
  401 - Unauthorized
  403 - Forbidden
  404 - Not Found
  429 - Too Many Requests

🔴 5XX - Server Error
  500 - Internal Error
  503 - Service Unavailable
```

### 3. Common Headers
```yaml
Authorization: Bearer <token>
Content-Type: application/json
Accept: application/json
```

## Troubleshooting 🔧

### 1. Can't Access Swagger UI
```bash
# Check if service is running
docker-compose ps

# Check service logs
docker-compose logs auth-service
docker-compose logs ai-gateway

# Verify ports are available
lsof -i :3001
lsof -i :3002
```

### 2. Authentication Issues
```bash
# 1. Ensure token format is correct:
Bearer eyJhbGciOiJIUzI1NiIs...

# 2. Check token expiration:
jwt-decode your_token_here

# 3. Try logging in again:
POST /auth/login
```

### 3. Request Errors
```bash
# 400 Bad Request
→ Check request body matches schema

# 401 Unauthorized
→ Verify token is provided and valid

# 429 Too Many Requests
→ Wait and retry (rate limit)
```

## Keyboard Shortcuts ⌨️

```
Alt + E    : Expand endpoint
Alt + C    : Collapse endpoint
Alt + M    : Scroll to models
Alt + L    : Collapse/Expand all
```

## Environment Setup 🛠️

### Local Development
```bash
# Start all services
docker-compose up -d

# Check Swagger availability
curl http://localhost:3001/api-docs
curl http://localhost:3002/api-docs
curl http://localhost:3003/api-docs
curl http://localhost:3005/api-docs
```

### Production URLs
```
https://api.devmentor.ai/auth/docs
https://api.devmentor.ai/ai/docs
https://api.devmentor.ai/memory/docs
https://api.devmentor.ai/projects/docs
```

## Maintaining Documentation 📝

### 1. Update OpenAPI Specs
```bash
# Auth Service
vi services/auth-service/openapi.yaml

# AI Gateway
vi services/ai-gateway/openapi.yaml
```

### 2. Generate Updated Docs
```bash
# Using npm script
npm run generate-docs

# Or directly
swagger-cli bundle services/*/openapi.yaml
```

### 3. Verify Changes
```bash
# Validate specs
swagger-cli validate services/*/openapi.yaml

# Start services to check UI
docker-compose up -d
```

---

*Last Updated: 2025-08-18*
*Version: 2.0.0*
*Status: ACTIVE*
{% endraw %}
