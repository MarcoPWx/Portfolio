---
layout: product
title: SWAGGER BETA READINESS
product: DevMentor
source: infrastructure/services/swagger/SWAGGER_BETA_READINESS.md
---

{% raw %}
CURRENT ARCHITECTURE

# Swagger DevMentor Beta Readiness Guide 🚀

## Overview
This document provides a comprehensive framework for API documentation completeness and beta readiness validation. It ensures all Swagger/OpenAPI specifications are properly documented, validated, and unified across all DevMentor services, along with automated verification scripts and deployment validation procedures.

## What is Swagger/OpenAPI?

### Understanding Swagger - The Complete Picture

**Swagger** (now **OpenAPI Specification**) is the world's most popular framework for designing, building, documenting, and consuming RESTful APIs. Think of it as the "blueprint" or "contract" that defines exactly how your API works - what endpoints exist, what data they accept, what they return, and how to authenticate.

#### The Evolution: Swagger → OpenAPI
- **2011**: Swagger created by Tony Tam at Wordnik
- **2015**: Swagger donated to Linux Foundation, became OpenAPI Initiative
- **2017**: OpenAPI 3.0 released with enhanced features
- **Today**: OpenAPI is the de facto standard for REST API documentation

### Why DevMentor Needs Swagger

#### 1. **Developer Productivity** 🚀
```
Without Swagger:                   With Swagger:
- Read outdated wiki ❌            - Interactive docs ✅
- Guess parameters ❌               - Auto-complete ✅
- Test with Postman ❌              - Test in browser ✅
- Manual integration ❌             - Generated SDKs ✅
```

#### 2. **API Lifecycle Management**
- **Design-First**: Define API contract before implementation
- **Documentation**: Always up-to-date, generated from code
- **Testing**: Automated contract testing ensures compliance
- **Versioning**: Track API changes over time
- **Governance**: Enforce API standards across teams

#### 3. **Business Value**
- **Faster Onboarding**: New developers productive in hours, not days
- **Reduced Support**: Self-service documentation reduces support tickets
- **Partner Integration**: External partners can integrate without hand-holding
- **API Monetization**: Clear documentation enables API-as-a-product

### How DevMentor Uses Swagger

#### Complete Architecture Flow
```
┌────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL CONSUMERS                         │
│  Mobile Apps | Web Apps | Partners | Third-party Integrations     │
└────────────────────────────┬───────────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────────┐
│                      SWAGGER UI PORTAL                             │
│                  https://api.devmentor.ai/docs                     │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  • Interactive API Explorer                              │     │
│  │  • Try-it-out functionality                             │     │
│  │  • Authentication testing                               │     │
│  │  • Request/Response examples                            │     │
│  └──────────────────────────────────────────────────────────┘     │
└────────────────────────────┬───────────────────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────────┐
│                    API GATEWAY (Kong)                              │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  • Request validation against OpenAPI spec               │     │
│  │  • Rate limiting per endpoint                           │     │
│  │  • Authentication/Authorization                         │     │
│  │  • Request/Response transformation                      │     │
│  └──────────────────────────────────────────────────────────┘     │
└────────────────────────────┬───────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ AUTH SERVICE  │    │  AI GATEWAY   │    │MEMORY SERVICE │
├───────────────┤    ├───────────────┤    ├───────────────┤
│OpenAPI Spec:  │    │OpenAPI Spec:  │    │OpenAPI Spec:  │
│auth-api.yaml  │    │ai-api.yaml    │    │memory-api.yaml│
├───────────────┤    ├───────────────┤    ├───────────────┤
│Endpoints:     │    │Endpoints:     │    │Endpoints:     │
│• /auth/login  │    │• /chat        │    │• /memories    │
│• /auth/signup │    │• /completions │    │• /search      │
│• /auth/oauth  │    │• /analyze     │    │• /vectors     │
└───────────────┘    └───────────────┘    └───────────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────────────────┐
│                   UNIFIED OPENAPI SPEC                             │
│               /contracts/openapi.merged.yaml                       │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  Merged using: openapi-merge-cli                         │     │
│  │  Validated with: spectral lint                          │     │
│  │  Version controlled: Git with semantic versioning       │     │
│  │  CI/CD: Automated on every commit                       │     │
│  └──────────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────────┘
```

### OpenAPI Specification Deep Dive

#### Basic Structure Explained
```yaml
openapi: 3.0.3  # OpenAPI version (not your API version!)

info:
  title: DevMentor AI Gateway API
  version: 2.0.0  # Your API version
  description: |
    AI orchestration service for DevMentor platform.
    Handles routing to various LLMs and AI models.
  contact:
    name: DevMentor Team
    email: api@devmentor.ai
  license:
    name: MIT
    url: https://opensource.org/licenses/MIT

servers:
  - url: https://api.devmentor.ai
    description: Production server
  - url: https://staging-api.devmentor.ai
    description: Staging server
  - url: http://localhost:3001
    description: Local development

tags:
  - name: Chat
    description: Chat completion endpoints
  - name: Analysis
    description: Code analysis endpoints

paths:
  /api/chat/completions:
    post:
      tags: [Chat]
      summary: Generate chat completion
      operationId: createChatCompletion
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ChatRequest'
            examples:
              simple:
                summary: Simple chat
                value:
                  model: "llama2"
                  messages:
                    - role: "user"
                      content: "Hello, how are you?"
              code:
                summary: Code assistance
                value:
                  model: "codellama"
                  messages:
                    - role: "user"
                      content: "Write a Python function to sort a list"
      responses:
        '200':
          description: Successful completion
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ChatResponse'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '429':
          $ref: '#/components/responses/RateLimitError'
        '500':
          $ref: '#/components/responses/InternalServerError'

components:
  schemas:
    ChatRequest:
      type: object
      required: [model, messages]
      properties:
        model:
          type: string
          enum: [llama2, codellama, mistral]
          description: AI model to use
        messages:
          type: array
          items:
            $ref: '#/components/schemas/Message'
          minItems: 1
          maxItems: 100
        temperature:
          type: number
          minimum: 0
          maximum: 2
          default: 0.7
          description: Sampling temperature
        max_tokens:
          type: integer
          minimum: 1
          maximum: 4096
          default: 2048
    
    Message:
      type: object
      required: [role, content]
      properties:
        role:
          type: string
          enum: [system, user, assistant]
        content:
          type: string
          maxLength: 10000
    
    ChatResponse:
      type: object
      properties:
        id:
          type: string
          format: uuid
        choices:
          type: array
          items:
            type: object
            properties:
              message:
                $ref: '#/components/schemas/Message'
              finish_reason:
                type: string
                enum: [stop, length, error]
        usage:
          type: object
          properties:
            prompt_tokens:
              type: integer
            completion_tokens:
              type: integer
            total_tokens:
              type: integer
    
    ErrorResponse:
      type: object
      required: [error]
      properties:
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
            details:
              type: object
  
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  
  responses:
    UnauthorizedError:
      description: Authentication required
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
          example:
            error:
              code: "UNAUTHORIZED"
              message: "Invalid or missing authentication token"
    
    RateLimitError:
      description: Rate limit exceeded
      headers:
        X-RateLimit-Limit:
          schema:
            type: integer
          description: Request limit per hour
        X-RateLimit-Remaining:
          schema:
            type: integer
          description: Remaining requests
        X-RateLimit-Reset:
          schema:
            type: integer
          description: Unix timestamp when limit resets
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    
    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
```

### Swagger Tools in DevMentor Ecosystem

#### 1. **Swagger UI** - Interactive Documentation
```
┌─────────────────────────────────────────────────────────────┐
│                      SWAGGER UI                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │  [DevMentor API Documentation]                     │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │ ▼ Authentication                            │  │    │
│  │  │   ○ No Auth  ● Bearer Token  ○ API Key     │  │    │
│  │  │   [Token: ________________] [Authorize]    │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  │                                                     │    │
│  │  ▼ Chat Endpoints                                  │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │ POST /api/chat/completions                  │  │    │
│  │  │ [Try it out]                                │  │    │
│  │  │                                             │  │    │
│  │  │ Request Body:                              │  │    │
│  │  │ {                                           │  │    │
│  │  │   "model": "llama2",                       │  │    │
│  │  │   "messages": [{                           │  │    │
│  │  │     "role": "user",                        │  │    │
│  │  │     "content": "Hello"                     │  │    │
│  │  │   }]                                        │  │    │
│  │  │ }                                           │  │    │
│  │  │                                             │  │    │
│  │  │ [Execute]                                  │  │    │
│  │  └──────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

#### 2. **Swagger Codegen** - Client SDK Generation
```bash
# Generate TypeScript client for frontend
swagger-codegen generate \
  -i contracts/openapi.merged.yaml \
  -l typescript-axios \
  -o devmentor-ui/src/api/generated

# Generate Python client for testing
swagger-codegen generate \
  -i contracts/openapi.merged.yaml \
  -l python \
  -o tests/api-client

# Generate Go client for services
swagger-codegen generate \
  -i contracts/openapi.merged.yaml \
  -l go \
  -o services/client-sdk/go
```

#### 3. **Swagger Editor** - Visual API Design
```
┌─────────────────────────────────────────────────────────────┐
│                    SWAGGER EDITOR                           │
│  ┌──────────────────────┬─────────────────────────────┐    │
│  │   YAML Editor        │   Live Preview              │    │
│  │                      │                             │    │
│  │ openapi: 3.0.3       │  DevMentor API             │    │
│  │ info:                │  ┌─────────────────────┐   │    │
│  │   title: DevMentor   │  │ • POST /auth/login  │   │    │
│  │   version: 2.0.0     │  │ • GET /auth/profile │   │    │
│  │ paths:               │  │ • POST /chat        │   │    │
│  │   /auth/login:       │  └─────────────────────┘   │    │
│  │     post:            │                             │    │
│  │       summary: Login │  [Try this operation]      │    │
│  └──────────────────────┴─────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Swagger Implementation Workflow

#### 1. **Design Phase**
```mermaid
Design → Write OpenAPI Spec → Review → Approve
         ↓                     ↓        ↓
    Use Editor            Team Input  Mock Server
```

#### 2. **Development Phase**
```bash
# Step 1: Generate server stubs
npx @openapitools/openapi-generator-cli generate \
  -i services/auth-service/openapi.yaml \
  -g nodejs-express-server \
  -o services/auth-service/generated

# Step 2: Implement business logic
# Developers fill in the generated stubs

# Step 3: Validate implementation
npx swagger-cli validate services/auth-service/openapi.yaml

# Step 4: Test against spec
npx dredd services/auth-service/openapi.yaml \
  http://localhost:3002
```

#### 3. **Testing Phase**
```javascript
// Contract Testing with Jest
const SwaggerParser = require('@apidevtools/swagger-parser');
const request = require('supertest');

describe('API Contract Tests', () => {
  let api;
  let spec;
  
  beforeAll(async () => {
    spec = await SwaggerParser.validate('openapi.yaml');
    api = request('http://localhost:3001');
  });
  
  test('POST /api/chat/completions matches spec', async () => {
    const response = await api
      .post('/api/chat/completions')
      .send({
        model: 'llama2',
        messages: [{ role: 'user', content: 'test' }]
      })
      .expect(200);
    
    // Validate response against schema
    expect(response.body).toMatchSchema(
      spec.paths['/api/chat/completions'].post.responses['200']
    );
  });
});
```

### Advanced Swagger Features for DevMentor

#### 1. **Webhooks** (OpenAPI 3.1)
```yaml
webhooks:
  learningEvent:
    post:
      summary: Learning event notification
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                event:
                  type: string
                  enum: [lesson.completed, quiz.passed]
                userId:
                  type: string
                timestamp:
                  type: string
                  format: date-time
      responses:
        '200':
          description: Webhook processed
```

#### 2. **Callbacks** for Async Operations
```yaml
paths:
  /api/analysis/async:
    post:
      callbacks:
        analysisComplete:
          '{$request.body#/callbackUrl}':
            post:
              requestBody:
                content:
                  application/json:
                    schema:
                      $ref: '#/components/schemas/AnalysisResult'
              responses:
                '200':
                  description: Callback received
```

#### 3. **Links** for API Workflow
```yaml
responses:
  '201':
    description: Project created
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Project'
    links:
      GetProjectById:
        operationId: getProject
        parameters:
          projectId: '$response.body#/id'
      UpdateProject:
        operationId: updateProject
        parameters:
          projectId: '$response.body#/id'
```

### Swagger Best Practices for DevMentor

#### 1. **API Versioning Strategy**
```yaml
# URL Path Versioning
paths:
  /v1/users:    # Old version
  /v2/users:    # New version

# Header Versioning
parameters:
  - name: API-Version
    in: header
    schema:
      type: string
      default: '2.0'
```

#### 2. **Comprehensive Examples**
```yaml
examples:
  validRequest:
    summary: Valid chat request
    value:
      model: "llama2"
      messages:
        - role: "system"
          content: "You are a helpful assistant"
        - role: "user"
          content: "Explain Docker"
  
  errorResponse:
    summary: Rate limit error
    value:
      error:
        code: "RATE_LIMIT_EXCEEDED"
        message: "Too many requests"
        retryAfter: 3600
```

#### 3. **Security Definitions**
```yaml
security:
  - bearerAuth: []
  - apiKey: []
  - oauth2:
    - read:projects
    - write:projects

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    
    apiKey:
      type: apiKey
      in: header
      name: X-API-Key
    
    oauth2:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.devmentor.ai/oauth/authorize
          tokenUrl: https://auth.devmentor.ai/oauth/token
          scopes:
            read:projects: Read project data
            write:projects: Modify projects
```

### Monitoring Swagger Usage

```yaml
# Metrics to track
metrics:
  documentation:
    - page_views_per_endpoint
    - try_it_out_usage
    - download_sdk_count
    - time_to_first_api_call
  
  compliance:
    - spec_validation_errors
    - breaking_change_violations
    - deprecated_endpoint_usage
    - undocumented_endpoint_calls
```

### Common Swagger Pitfalls & Solutions

| Problem | Solution |
|---------|----------|  
| Spec drift from implementation | Use automated contract testing |
| Large spec files | Split by service, merge in CI/CD |
| Breaking changes | Use versioning and deprecation |
| Poor examples | Add realistic, tested examples |
| Missing error responses | Define standard error schemas |
| Inconsistent naming | Use linting rules (Spectral) |
| No authentication docs | Provide clear security schemes |

## Table of Contents
- [What is Swagger/OpenAPI?](#what-is-swaggeropenapi)
- [Beta Launch Criteria](#beta-launch-criteria)
- [Service Readiness Matrix](#service-readiness-matrix)
- [API Documentation Status](#api-documentation-status)
- [Automated Validation Script](#automated-validation-script)
- [Pre-Launch Checklist](#pre-launch-checklist)
- [Monitoring and Observability](#monitoring-and-observability)
- [Known Issues and Workarounds](#known-issues-and-workarounds)

## Beta Launch Criteria

### Core Requirements ✅
- [ ] All core services deployed and healthy
- [ ] Unified API documentation available
- [ ] Authentication flow functional
- [ ] AI Gateway operational with at least 2 models
- [ ] Basic monitoring and logging in place
- [ ] Database migrations completed
- [ ] SSL certificates configured
- [ ] Rate limiting enabled
- [ ] Error handling standardized

### Documentation Requirements 📚
- [ ] API documentation complete for all endpoints
- [ ] User onboarding guide available
- [ ] Architecture documentation current
- [ ] Troubleshooting guide published
- [ ] Privacy policy and ToS ready

## Service Readiness Matrix

| Service | Status | Health Endpoint | API Docs | Critical Features | Notes |
|---------|--------|-----------------|----------|-------------------|-------|
| **API Gateway** | 🟢 Ready | `/health` | ✅ Complete | Rate limiting, JWT validation | Kong-based |
| **Auth Service** | 🟢 Ready | `/health` | ✅ Complete | Login, Register, OAuth | GitHub OAuth configured |
| **AI Gateway** | 🟢 Ready | `/health` | ✅ Complete | Chat, Code Analysis | Ollama integration |
| **Memory Service** | 🟡 Partial | `/health` | 🔄 In Progress | Vector search | Qdrant pending |
| **Project Service** | 🟡 Partial | `/health` | 🔄 In Progress | Project CRUD | Schema updates needed |
| **Frontend UI** | 🟢 Ready | N/A | N/A | Chat interface, Auth | Next.js 14 |

### Legend
- 🟢 **Ready**: Fully functional and tested
- 🟡 **Partial**: Core features work, some pending
- 🔴 **Blocked**: Critical issues preventing launch
- ✅ **Complete**: Documentation/feature is finalized
- 🔄 **In Progress**: Actively being worked on

## API Documentation Status

### Unified OpenAPI Specification
```yaml
# Location: /contracts/openapi.merged.yaml
# Generated from individual service specs
# Served at: https://api.devmentor.ai/docs
```

### Service-Specific Documentation

#### Auth Service Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication  
- `GET /auth/profile` - User profile (protected)
- `POST /auth/beta-signup` - Beta program enrollment
- `GET /auth/github` - GitHub OAuth initiation
- `GET /auth/github/callback` - OAuth callback
- `GET /health` - Service health check

#### AI Gateway Endpoints
- `GET /health` - Service health check
- `GET /api/models` - List available AI models
- `POST /api/chat/completions` - Chat completion
- `POST /api/code/analyze` - Code analysis
- `POST /api/github/analyze` - Repository analysis
- `POST /api/pbml/emit` - Learning event emission
- `GET /api/pbml/status` - PBML system status
- `GET /api/pbml/rehydrate` - Aggregate learning context
- `GET /api/learning/status` - Learning content status
- `POST /api/feedback` - User feedback submission
- `POST /api/tooltips/generate` - Generate contextual tooltips

#### Memory Service Endpoints (Pending)
- `POST /api/memories` - Store memory
- `GET /api/memories/search` - Vector search
- `DELETE /api/memories/{id}` - Delete memory
- `GET /api/memories/context` - Get contextual memories

#### Project Service Endpoints (Pending)
- `POST /api/projects` - Create project
- `GET /api/projects` - List projects
- `GET /api/projects/{id}` - Get project details
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

## Automated Validation Script

### Beta Readiness Check Script
Save as `scripts/beta-readiness-check.js`:

```javascript
#!/usr/bin/env node

const axios = require('axios');
const chalk = require('chalk');
const Table = require('cli-table3');
const fs = require('fs').promises;
const yaml = require('js-yaml');

// Configuration
const CONFIG = {
  services: [
    {
      name: 'API Gateway',
      url: process.env.API_GATEWAY_URL || 'http://localhost:8080',
      healthEndpoint: '/health',
      required: true
    },
    {
      name: 'Auth Service',
      url: process.env.AUTH_SERVICE_URL || 'http://localhost:3002',
      healthEndpoint: '/health',
      required: true
    },
    {
      name: 'AI Gateway',
      url: process.env.AI_GATEWAY_URL || 'http://localhost:3001',
      healthEndpoint: '/health',
      required: true
    },
    {
      name: 'Memory Service',
      url: process.env.MEMORY_SERVICE_URL || 'http://localhost:3003',
      healthEndpoint: '/health',
      required: false
    },
    {
      name: 'Project Service',
      url: process.env.PROJECT_SERVICE_URL || 'http://localhost:3005',
      healthEndpoint: '/health',
      required: false
    }
  ],
  openApiFiles: [
    'contracts/services/auth-service/openapi.yaml',
    'contracts/services/ai-gateway/openapi.yaml',
    'contracts/services/memory-service/openapi.yaml',
    'contracts/services/project-service/openapi.yaml'
  ],
  criticalEndpoints: [
    { service: 'Auth Service', path: '/auth/login', method: 'POST' },
    { service: 'AI Gateway', path: '/api/chat/completions', method: 'POST' },
    { service: 'AI Gateway', path: '/api/models', method: 'GET' }
  ]
};

class BetaReadinessChecker {
  constructor() {
    this.results = {
      services: [],
      apiDocs: [],
      endpoints: [],
      overall: 'UNKNOWN'
    };
  }

  async checkServices() {
    console.log(chalk.blue('\n📡 Checking Service Health...\n'));
    const table = new Table({
      head: ['Service', 'URL', 'Status', 'Response Time', 'Details'],
      colWidths: [20, 30, 15, 15, 30]
    });

    for (const service of CONFIG.services) {
      const start = Date.now();
      try {
        const response = await axios.get(service.url + service.healthEndpoint, {
          timeout: 5000
        });
        const duration = Date.now() - start;
        
        table.push([
          service.name,
          service.url,
          chalk.green('✅ Healthy'),
          `${duration}ms`,
          JSON.stringify(response.data.status || 'OK').substring(0, 28)
        ]);
        
        this.results.services.push({
          name: service.name,
          status: 'healthy',
          required: service.required,
          responseTime: duration
        });
      } catch (error) {
        table.push([
          service.name,
          service.url,
          service.required ? chalk.red('❌ Down') : chalk.yellow('⚠️ Down'),
          'N/A',
          error.message.substring(0, 28)
        ]);
        
        this.results.services.push({
          name: service.name,
          status: 'down',
          required: service.required,
          error: error.message
        });
      }
    }

    console.log(table.toString());
  }

  async checkApiDocumentation() {
    console.log(chalk.blue('\n📚 Checking API Documentation...\n'));
    const table = new Table({
      head: ['OpenAPI File', 'Status', 'Version', 'Endpoints', 'Issues'],
      colWidths: [40, 15, 10, 15, 30]
    });

    for (const file of CONFIG.openApiFiles) {
      try {
        const content = await fs.readFile(file, 'utf8');
        const spec = yaml.load(content);
        const endpointCount = Object.keys(spec.paths || {}).length;
        
        table.push([
          file,
          chalk.green('✅ Valid'),
          spec.info?.version || 'N/A',
          endpointCount,
          'None'
        ]);
        
        this.results.apiDocs.push({
          file,
          status: 'valid',
          version: spec.info?.version,
          endpoints: endpointCount
        });
      } catch (error) {
        const status = error.code === 'ENOENT' ? 
          chalk.yellow('⚠️ Missing') : 
          chalk.red('❌ Invalid');
        
        table.push([
          file,
          status,
          'N/A',
          'N/A',
          error.message.substring(0, 28)
        ]);
        
        this.results.apiDocs.push({
          file,
          status: 'invalid',
          error: error.message
        });
      }
    }

    console.log(table.toString());
  }

  async checkCriticalEndpoints() {
    console.log(chalk.blue('\n🔍 Testing Critical Endpoints...\n'));
    const table = new Table({
      head: ['Endpoint', 'Method', 'Status', 'Test Result'],
      colWidths: [30, 10, 15, 35]
    });

    for (const endpoint of CONFIG.criticalEndpoints) {
      const service = CONFIG.services.find(s => s.name === endpoint.service);
      if (!service) continue;

      const url = service.url + endpoint.path;
      let status, result;

      try {
        if (endpoint.method === 'GET') {
          await axios.get(url, { timeout: 3000 });
          status = chalk.green('✅ Working');
          result = 'Endpoint responsive';
        } else {
          // For POST endpoints, just check if they respond (even with 400)
          try {
            await axios.post(url, {}, { timeout: 3000 });
          } catch (postError) {
            if (postError.response && postError.response.status < 500) {
              status = chalk.green('✅ Working');
              result = 'Endpoint responsive (validation works)';
            } else {
              throw postError;
            }
          }
        }
      } catch (error) {
        status = chalk.red('❌ Failed');
        result = error.message.substring(0, 33);
      }

      table.push([endpoint.path, endpoint.method, status, result]);
      this.results.endpoints.push({
        path: endpoint.path,
        method: endpoint.method,
        status: status.includes('✅') ? 'working' : 'failed'
      });
    }

    console.log(table.toString());
  }

  async checkDatabaseConnections() {
    console.log(chalk.blue('\n🗄️  Checking Database Connections...\n'));
    // This would typically check Redis, PostgreSQL, Qdrant connections
    // For now, we'll check if services report database status in health checks
    
    const table = new Table({
      head: ['Database', 'Service', 'Status', 'Details'],
      colWidths: [20, 20, 15, 35]
    });

    // Check Redis through AI Gateway health
    try {
      const aiHealth = await axios.get('http://localhost:3001/health');
      const redisStatus = aiHealth.data.services?.redis ? 
        chalk.green('✅ Connected') : 
        chalk.red('❌ Disconnected');
      
      table.push(['Redis (Cache)', 'AI Gateway', redisStatus, 'Session and cache storage']);
      table.push(['Redis (Learning)', 'AI Gateway', 
        aiHealth.data.services?.redisLearning ? 
          chalk.green('✅ Connected') : 
          chalk.yellow('⚠️ Disconnected'),
        'PBML event streams'
      ]);
    } catch (error) {
      table.push(['Redis', 'AI Gateway', chalk.yellow('⚠️ Unknown'), 'Could not verify']);
    }

    console.log(table.toString());
  }

  generateReport() {
    console.log(chalk.blue('\n📊 Beta Readiness Report\n'));
    
    // Calculate overall readiness
    const requiredServicesUp = this.results.services
      .filter(s => s.required)
      .every(s => s.status === 'healthy');
    
    const apiDocsValid = this.results.apiDocs
      .filter(d => d.file.includes('auth-service') || d.file.includes('ai-gateway'))
      .every(d => d.status === 'valid');
    
    const criticalEndpointsWorking = this.results.endpoints
      .every(e => e.status === 'working');
    
    const overallReady = requiredServicesUp && apiDocsValid && criticalEndpointsWorking;
    
    const summary = new Table({
      head: ['Category', 'Status', 'Details'],
      colWidths: [25, 20, 45]
    });

    summary.push([
      'Required Services',
      requiredServicesUp ? chalk.green('✅ Ready') : chalk.red('❌ Not Ready'),
      `${this.results.services.filter(s => s.required && s.status === 'healthy').length}/${this.results.services.filter(s => s.required).length} services up`
    ]);

    summary.push([
      'API Documentation',
      apiDocsValid ? chalk.green('✅ Ready') : chalk.yellow('⚠️ Incomplete'),
      `${this.results.apiDocs.filter(d => d.status === 'valid').length}/${this.results.apiDocs.length} specs valid`
    ]);

    summary.push([
      'Critical Endpoints',
      criticalEndpointsWorking ? chalk.green('✅ Ready') : chalk.red('❌ Issues'),
      `${this.results.endpoints.filter(e => e.status === 'working').length}/${this.results.endpoints.length} endpoints working`
    ]);

    console.log(summary.toString());

    // Overall Status
    console.log('\n' + chalk.bold('Overall Beta Readiness: ') + 
      (overallReady ? 
        chalk.green.bold('✅ READY FOR BETA') : 
        chalk.red.bold('❌ NOT READY - Issues need resolution')
      )
    );

    // Recommendations
    if (!overallReady) {
      console.log(chalk.yellow('\n⚠️ Recommendations:'));
      
      if (!requiredServicesUp) {
        const downServices = this.results.services
          .filter(s => s.required && s.status === 'down')
          .map(s => s.name);
        console.log(chalk.yellow(`  • Start required services: ${downServices.join(', ')}`));
      }
      
      if (!apiDocsValid) {
        const missingDocs = this.results.apiDocs
          .filter(d => d.status === 'invalid')
          .map(d => d.file);
        console.log(chalk.yellow(`  • Fix/create API docs: ${missingDocs.join(', ')}`));
      }
      
      if (!criticalEndpointsWorking) {
        const failedEndpoints = this.results.endpoints
          .filter(e => e.status === 'failed')
          .map(e => `${e.method} ${e.path}`);
        console.log(chalk.yellow(`  • Fix endpoints: ${failedEndpoints.join(', ')}`));
      }
    }

    // Write report to file
    this.saveReport(overallReady);
  }

  async saveReport(isReady) {
    const report = {
      timestamp: new Date().toISOString(),
      ready: isReady,
      results: this.results,
      environment: {
        node: process.version,
        platform: process.platform,
        env: process.env.NODE_ENV || 'development'
      }
    };

    try {
      await fs.writeFile(
        'beta-readiness-report.json',
        JSON.stringify(report, null, 2)
      );
      console.log(chalk.gray('\n📄 Full report saved to beta-readiness-report.json'));
    } catch (error) {
      console.error(chalk.red('Failed to save report:', error.message));
    }
  }

  async run() {
    console.log(chalk.bold.blue(`
╔═══════════════════════════════════════╗
║   DevMentor Beta Readiness Check      ║
║   Version 2.0.0                       ║
╚═══════════════════════════════════════╝
    `));

    try {
      await this.checkServices();
      await this.checkApiDocumentation();
      await this.checkCriticalEndpoints();
      await this.checkDatabaseConnections();
      this.generateReport();
    } catch (error) {
      console.error(chalk.red('\n❌ Critical error during checks:'), error.message);
      process.exit(1);
    }
  }
}

// Run the checker
if (require.main === module) {
  const checker = new BetaReadinessChecker();
  checker.run().catch(console.error);
}

module.exports = BetaReadinessChecker;
```

### Quick Check Script
Save as `scripts/quick-beta-check.sh`:

```bash
#!/bin/bash

# DevMentor Beta Quick Check
# Performs rapid validation of critical components

set -e

echo "🚀 DevMentor Beta Quick Check"
echo "=============================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Docker
echo -n "Docker Engine: "
if docker info > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    exit 1
fi

# Check Docker Compose
echo -n "Docker Compose: "
if docker-compose version > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    exit 1
fi

# Check critical services
services=("api-gateway:8080" "auth-service:3002" "ai-gateway:3001")

for service in "${services[@]}"; do
    name="${service%%:*}"
    port="${service##*:}"
    echo -n "$name (port $port): "
    
    if curl -s -o /dev/null -w "%{http_code}" "http://localhost:$port/health" | grep -q "200\|503"; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${YELLOW}⚠${NC}"
    fi
done

# Check Ollama
echo -n "Ollama API: "
if curl -s "http://localhost:11434/api/tags" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC} (AI features limited)"
fi

# Check Frontend
echo -n "Frontend UI: "
if curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000" | grep -q "200\|304"; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC}"
fi

echo ""
echo "Run 'npm run beta:check' for detailed report"
```

## Pre-Launch Checklist

### Infrastructure ⚙️
- [ ] All Docker images built and tagged
- [ ] Docker Compose files validated
- [ ] Environment variables configured
- [ ] Secrets management in place
- [ ] SSL certificates installed
- [ ] Domain DNS configured
- [ ] CDN/CloudFlare setup
- [ ] Backup strategy implemented

### Security 🔒
- [ ] JWT secret keys rotated
- [ ] CORS policies configured
- [ ] Rate limiting enabled
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] OAuth apps registered

### Performance 🚀
- [ ] Database indexes created
- [ ] Redis caching configured
- [ ] Static assets optimized
- [ ] Image compression enabled
- [ ] Gzip/Brotli compression active
- [ ] CDN configured
- [ ] Connection pooling tuned

### Monitoring 📊
- [ ] Health check endpoints verified
- [ ] Logging aggregation setup
- [ ] Error tracking configured (Sentry)
- [ ] Performance monitoring active
- [ ] Uptime monitoring configured
- [ ] Alert thresholds defined
- [ ] Dashboards created

### Documentation 📖
- [ ] API documentation published
- [ ] User guides completed
- [ ] Admin documentation ready
- [ ] Troubleshooting guide available
- [ ] Architecture diagrams current
- [ ] Deployment procedures documented
- [ ] Rollback procedures defined

### Legal & Compliance 📜
- [ ] Terms of Service finalized
- [ ] Privacy Policy published
- [ ] Cookie Policy implemented
- [ ] GDPR compliance verified
- [ ] Data retention policies defined
- [ ] User consent flows implemented

## Monitoring and Observability

### Key Metrics to Track
```yaml
services:
  api_gateway:
    - request_rate
    - error_rate
    - p95_latency
    - active_connections
    
  auth_service:
    - login_success_rate
    - registration_rate
    - token_validation_time
    - oauth_callback_errors
    
  ai_gateway:
    - model_request_rate
    - completion_time_p95
    - ollama_connection_errors
    - cache_hit_rate
    
  frontend:
    - page_load_time
    - js_error_rate
    - api_call_failures
    - websocket_reconnections
```

### Alert Thresholds
- Error rate > 5% for 5 minutes
- P95 latency > 2 seconds
- Service health check fails 3 times
- Database connection pool exhausted
- Disk usage > 80%
- Memory usage > 85%
- CPU usage > 90% for 10 minutes

## Known Issues and Workarounds

### Current Limitations
1. **Qdrant Integration**: Vector search using fallback to Redis
   - *Workaround*: Basic keyword search implemented
   
2. **Project Service**: Schema migrations pending
   - *Workaround*: Core CRUD operations functional
   
3. **WebSocket Scaling**: Single-instance only
   - *Workaround*: Sticky sessions configured

4. **Ollama Models**: Large models may timeout
   - *Workaround*: Increased timeout to 30s, recommend smaller models for beta

### Beta-Specific Constraints
- Maximum 100 concurrent users
- Rate limit: 100 requests/minute per user
- AI model context: 4096 tokens
- File upload: 10MB maximum
- Project limit: 50 per user

## Deployment Commands

### Full Stack Deployment
```bash
# Build all services
make build-all

# Run beta readiness check
npm run beta:check

# Deploy with Docker Compose
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Verify deployment
./scripts/quick-beta-check.sh

# View logs
docker-compose logs -f --tail=100
```

### Individual Service Deployment
```bash
# Deploy specific service
docker-compose up -d [service-name]

# Restart service
docker-compose restart [service-name]

# Scale service
docker-compose up -d --scale [service-name]=3
```

## Rollback Procedures

### Quick Rollback
```bash
# Stop current deployment
docker-compose down

# Restore previous version
git checkout tags/v2.0.0-beta.1
docker-compose up -d

# Verify rollback
npm run beta:check
```

### Database Rollback
```bash
# Backup current state
pg_dump devmentor > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore previous backup
psql devmentor < backup_20240815_120000.sql

# Verify data integrity
npm run db:verify
```

## Support and Troubleshooting

### Common Issues

#### Service Won't Start
```bash
# Check logs
docker-compose logs [service-name]

# Verify port availability
lsof -i :[port-number]

# Reset service
docker-compose rm -f [service-name]
docker-compose up -d [service-name]
```

#### Authentication Failures
```bash
# Verify JWT secret
echo $JWT_SECRET

# Check Redis connection
redis-cli ping

# Test auth endpoint
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test1234"}'
```

#### AI Gateway Timeout
```bash
# Check Ollama status
curl http://localhost:11434/api/tags

# Pull required model
ollama pull llama2

# Test AI endpoint
curl -X POST http://localhost:3001/api/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}],"model":"llama2"}'
```

## Contact Information

### Beta Support Team
- **Technical Lead**: tech-lead@devmentor.ai
- **DevOps**: devops@devmentor.ai
- **Support**: beta-support@devmentor.ai
- **Slack Channel**: #devmentor-beta
- **Status Page**: https://status.devmentor.ai

### Escalation Path
1. Check status page and known issues
2. Review logs and error messages
3. Contact on-call engineer via Slack
4. Escalate to technical lead if critical
5. Emergency hotline: [TBD]

---

## Next Steps

1. **Run Beta Readiness Check**
   ```bash
   npm run beta:check
   ```

2. **Review Report**
   - Check `beta-readiness-report.json`
   - Address any failures

3. **Deploy to Staging**
   - Run full integration tests
   - Perform load testing

4. **Beta Launch**
   - Enable feature flags
   - Monitor metrics closely
   - Gather user feedback

---

*Last Updated: 2024-08-15*
*Version: 2.0.0-beta*
*Status: PREPARING FOR BETA*
{% endraw %}
