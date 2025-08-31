---
layout: product
title: API GATEWAY GUIDE
product: DevMentor
source: infrastructure/services/api-gateway/API_GATEWAY_GUIDE.md
---

{% raw %}
CURRENT_ARCHITECTURE

# API Gateway Technical Guide

## Overview

This guide explains how our API Gateway serves as the entry point for all client requests to NatureQuest's backend services, specifically focusing on integration with QWEN, PBML, Qdrant, and PostgreSQL.

## API Design Best Practices

### 1. Clear Naming
- Use clear, consistent resource naming
- Follow REST conventions:
  - Create → POST /api/products
  - Read → GET /api/products
  - Update → PUT /api/products
  - Delete → DELETE /api/products

### 2. Idempotency
HTTP methods and their idempotency:
```yaml
GET:    Yes (Safe, no side effects)
HEAD:   Yes (Safe, no side effects)
PUT:    Yes (Same result regardless of retries)
DELETE: Yes (Same end state)
POST:   No  (May create multiple resources)
PATCH:  No  (May have different results)
```

### 3. Pagination
Support both methods:
```yaml
Offset-based:
  /api/products?page=2&limit=10

Cursor-based:
  /api/products?cursor=last_fetched_id
  Better for real-time data and large datasets
```

### 4. Sorting and Filtering
```yaml
Filtering:
  /api/products?filter=size:10&sort_by=date_added

Multiple Filters:
  /api/products?category=books&price_range=10-20
```

### 5. Cross Resource References
Preferred approach:
```
https://api.example.com/api/v1/carts/123/items/321 ✓

https://api.example.com/api/v1/items?cart_id=123&item_id=321 ✗
```

### 6. Rate Limiting
```yaml
Implementation:
  - Client identification
  - Rate limit window (e.g., 1000 req/hour)
  - Rate limiter before API server

Headers:
  X-RateLimit-Limit: 1000
  X-RateLimit-Remaining: 986
  X-RateLimit-Reset: 1640995200
```

### 7. Versioning
Two supported approaches:
```yaml
URL-based:
  https://api.example.com/v1/users
  https://api.example.com/v2/users

Query Parameter:
  https://api.example.com/users?version=1
  https://api.example.com/users?version=2
```

### 8. Security
```yaml
Authentication:
  - Bearer token in Authorization header
  - API keys for service-to-service
  - OAuth2 for user authorization

Access Control:
  - Role-based permissions
  - Resource-level access
  - Audit logging
```

## Core Components

1. **API Gateway Layer**
   - Entry point for all API requests
   - Request/response transformation
   - Authentication and authorization
   - Rate limiting and security
   - Response caching
   - Service routing

2. **Service Integration**
   - QWEN ML Service
   - Pattern-Based ML (PBML)
   - Qdrant Vector Store
   - PostgreSQL Database

## API Testing Types

As shown in our architecture, we implement multiple testing layers:

### 1. Smoke Testing
Purpose: Quick verification of core API functionalities
```yaml
Process:
  Input → Does Something Break? → Application
Focus:
  - Basic endpoint availability
  - Critical path validation
  - Essential service health
```

### 2. Functional Testing
Purpose: Test functional requirements and analyze responses
```yaml
Flow:
  1. Functional Specification → Service
  2. Compare Expected vs Actual Results
Components:
  - API endpoint behavior
  - Data validation
  - Business logic verification
```

### 3. Integration Testing
Purpose: Verify different components connected via APIs
```yaml
Process:
  Test Plan → Input Data → Application → Results
Covers:
  - Service interactions
  - Data flow between components
  - End-to-end scenarios
```

### 4. Regression Testing
Purpose: Ensure changes don't break existing behavior
```yaml
Steps:
  1. Functional Specification → Input Data
  2. Test both old and new versions
  3. Compare results
Focus:
  - Backward compatibility
  - Feature consistency
  - API contract adherence
```

### 5. Load Testing
Purpose: Test application capacity under load
```yaml
Setup:
  Apache JMeter → Test Engine → Application
Metrics:
  - Response times
  - Throughput
  - Error rates
  - Resource usage
```

### 6. Stress Testing
Purpose: Test API under high load conditions
```yaml
Configuration:
  JMeter → Multiple Test Engines → Application
Validation:
  - Breaking points
  - Recovery behavior
  - Error handling
  - Resource limits
```

### 7. Security Testing
Purpose: Test for external threats
```yaml
Process:
  Security Test Specification → Input Data → Application
Focus:
  - Authentication
  - Authorization
  - Data protection
  - Input validation
```

### 8. UI Testing
Purpose: Test UI-API interactions
```yaml
Flow:
  UI Specs → Input Data → Application
Coverage:
  - Frontend-API integration
  - Response handling
  - Error display
```

### 9. Fuzz Testing
Purpose: Test with unexpected input data
```yaml
Process:
  Unexpected Data → Does Something Break? → Application
Goals:
  - Edge cases
  - Error handling
  - Input validation
  - Security vulnerabilities
```

### 10. Reliability Testing
Purpose: Test API stability over time
```yaml
Approach:
  Long-running tests with monitoring
Focus:
  - Stability
  - Memory leaks
  - Resource usage
  - Performance degradation
```

## Gateway Architecture

### Request Flow
```
Client Request
    ↓
API Gateway
    ↓
Authentication → Rate Limiting → Request Transform → Service Routing
    ↓
Service (QWEN/PBML/Qdrant/PostgreSQL)
    ↓
Response Transform → Cache → Client Response
```

### Core Features

1. **Authentication & Authorization**
   ```yaml
   Methods:
     - JWT validation
     - API key authentication
     - OAuth 2.0 flows
   Headers:
     - Authorization: Bearer <token>
     - X-API-Key: <api_key>
   ```

2. **Rate Limiting**
   ```yaml
   Limits:
     - Per user: 100 req/min
     - Per IP: 1000 req/hour
     - Per API key: Configurable
   Implementation:
     - Redis for counter storage
     - Sliding window algorithm
   ```

3. **Request/Response Transform**
   ```yaml
   Request:
     - Add correlation ID
     - Validate content type
     - Check required headers
   Response:
     - Format standardization
     - Error wrapping
     - Cache headers
   ```

4. **Service Discovery**
   ```yaml
   Routes:
     - /ml/* → QWEN service
     - /vector/* → Qdrant
     - /data/* → PostgreSQL
     - /pattern/* → PBML
   ```

## Testing Implementation

### 1. Unit Tests
```python
def test_api_authentication():
    # Test API key validation
    response = client.get('/api/v1/data',
                         headers={'X-API-Key': 'invalid'})
    assert response.status_code == 401

    # Test JWT validation
    response = client.get('/api/v1/data',
                         headers={'Authorization': 'Bearer invalid'})
    assert response.status_code == 401
```

### 2. Integration Tests
```python
def test_ml_inference_flow():
    # Test complete flow through gateway
    data = {'image': 'base64_encoded_image'}
    response = client.post('/api/v1/ml/identify',
                         json=data,
                         headers={'Authorization': 'Bearer valid_token'})
    
    assert response.status_code == 200
    assert 'species' in response.json()
    assert 'confidence' in response.json()
```

### 3. Load Tests
```python
def test_gateway_performance():
    # Configure locust for load testing
    @task
    def test_api_endpoint(self):
        self.client.get('/api/v1/data',
                       headers={'X-API-Key': 'valid_key'})

    # Run with 1000 users, 100 spawn rate
    # Monitor response times and error rates
```

## Monitoring & Observability

### 1. Metrics Collection
```yaml
Key Metrics:
  - Request latency
  - Error rates
  - Cache hit ratio
  - Rate limit triggers
  - CPU/Memory usage
```

### 2. Logging
```yaml
Log Levels:
  - ERROR: Authentication failures, service errors
  - WARN: Rate limit hits, cache misses
  - INFO: Request/response details
  - DEBUG: Detailed debugging info
```

### 3. Alerting
```yaml
Thresholds:
  - Error rate > 1%
  - P95 latency > 500ms
  - Rate limit triggers > 100/min
  - Cache hit ratio < 80%
```

## Environment Configuration

### Development
```yaml
Gateway:
  host: localhost
  port: 8000
Services:
  qwen: localhost:8001
  qdrant: localhost:8002
  postgresql: localhost:5432
Rate Limits:
  default: 100/min
Cache:
  ttl: 300s
```

### Production
```yaml
Gateway:
  host: api.naturequest.com
  port: 443
Services:
  qwen: internal-ml-service:8001
  qdrant: internal-vector-service:8002
  postgresql: internal-db-service:5432
Rate Limits:
  default: 1000/min
Cache:
  ttl: 3600s
```

## Gateway Health Checks

### 1. Service Health
```bash
# Check gateway status
curl http://localhost:8000/health

# Check individual service health
curl http://localhost:8000/health/ml
curl http://localhost:8000/health/vector
curl http://localhost:8000/health/db
```

### 2. Performance Health
```bash
# Check gateway metrics
curl http://localhost:8000/metrics

# Check specific service metrics
curl http://localhost:8000/metrics/ml
curl http://localhost:8000/metrics/vector
curl http://localhost:8000/metrics/db
```

## Deployment & Scaling

### Container Configuration
```yaml
gateway:
  image: kong:latest
  ports:
    - "8000:8000"
    - "8001:8001"
  environment:
    KONG_DATABASE: postgres
    KONG_PG_HOST: kong-database
    KONG_PROXY_ACCESS_LOG: /dev/stdout
    KONG_ADMIN_ACCESS_LOG: /dev/stdout
    KONG_PROXY_ERROR_LOG: /dev/stderr
    KONG_ADMIN_ERROR_LOG: /dev/stderr
    KONG_ADMIN_LISTEN: 0.0.0.0:8001
```

### Scaling Rules
```yaml
Auto-scaling:
  min_replicas: 2
  max_replicas: 10
  metrics:
    - cpu_utilization: 70%
    - memory_utilization: 80%
    - request_count: 1000/min
```

## Security Implementation

### 1. Authentication
```yaml
Methods:
  - JWT with RS256
  - API keys with HMAC
  - OAuth 2.0 authorization code flow
Headers:
  - Authorization: Bearer {jwt_token}
  - X-API-Key: {api_key}
```

### 2. Rate Limiting
```yaml
Algorithms:
  - Token bucket
  - Sliding window
Storage:
  - Redis for counters
  - Distributed locking
```

### 3. Input Validation
```yaml
Validation:
  - Request size limits
  - Content type checks
  - Schema validation
  - SQL injection prevention
  - XSS protection
```

## Error Handling

### 1. Standard Error Responses
```json
{
  "error": {
    "code": "AUTH_ERROR",
    "message": "Invalid API key",
    "details": {
      "reason": "API key expired",
      "timestamp": "2024-12-15T10:00:00Z"
    }
  }
}
```

### 2. Error Categories
```yaml
4xx Errors:
  400: Bad Request
  401: Unauthorized
  403: Forbidden
  429: Too Many Requests
5xx Errors:
  500: Internal Server Error
  502: Bad Gateway
  503: Service Unavailable
  504: Gateway Timeout
```

## API Documentation

### 1. Swagger Integration
```yaml
swagger: "2.0"
info:
  title: NatureQuest API
  version: "1.0"
paths:
  /api/v1/ml/identify:
    post:
      summary: Identify species in image
      security:
        - Bearer: []
      parameters:
        - name: image
          in: body
          required: true
          schema:
            type: object
            properties:
              data:
                type: string
                format: base64
```

### 2. Postman Collections
```json
{
  "info": {
    "name": "NatureQuest API Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Identify Species",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{jwt_token}}"
          }
        ],
        "url": {
          "raw": "{{base_url}}/api/v1/ml/identify"
        }
      }
    }
  ]
}
```

## Conclusion

This guide covers the technical implementation of our API Gateway, focusing on practical aspects like testing, monitoring, and security. Use this as your reference for development and maintenance of the gateway infrastructure.
{% endraw %}
