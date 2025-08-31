---
layout: product
title: WEBSOCKET
product: DevMentor
source: api/WEBSOCKET.md
---

{% raw %}

CURRENT ARCHITECTURE

# WebSocket & Events System - Beta Production Guide

## 🎯 Overview

DevMentor uses a dual real-time communication strategy:
- **WebSockets**: Bidirectional communication between IDE extensions and the dashboard
- **Server-Sent Events (SSE)**: One-way streaming from backend services to the UI

This guide will teach you how to make this system production-ready for beta users.

## 📐 Architecture

### Current System Design

```
┌──────────────┐     WebSocket      ┌─────────────┐     Redis PubSub    ┌──────────────┐
│ IDE/Editor   │ ←─────────────────→ │  Dashboard  │ ←─────────────────→ │ Backend Jobs │
│  Extension   │    (port 8080)      │  (port 3000)│                     │   Workers    │
└──────────────┘                     └─────────────┘                     └──────────────┘
                                            │
                                            │ SSE
                                            ↓
                                     ┌─────────────┐
                                     │   Browser   │
                                     │     UI      │
                                     └─────────────┘
```

### Two WebSocket Services

1. **WebSocket Server** (`websocketServer.ts`)
   - Runs on the dashboard at `/ws`
   - Accepts connections from IDE extensions
   - Handles: handshake, codeContext, startTDD, analyzeCode, ping

2. **WebSocket Client** (`websocketService.ts`)
   - Connects FROM dashboard TO IDE extension at `ws://localhost:8080/devmentor`
   - Handles: context_update, file_changed, selection_changed, suggestion_request, tdd_action

### Event Streaming (SSE)

- **Endpoint**: `/api/events`
- **Channels**: ui:activity, ai:jobs:status, sse:progress:scraper, memory:new-items
- **Transport**: Redis Pub/Sub → SSE → Browser EventSource

## 🚀 Making It Beta-Ready

### Step 1: Understanding the Flow

#### IDE → Dashboard Flow
```javascript
// IDE sends code context
{
  "type": "codeContext",
  "data": {
    "file": "src/utils.ts",
    "language": "typescript",
    "content": "function add(a, b) { return a + b; }"
  }
}

// Dashboard analyzes and responds
{
  "type": "suggestions",
  "data": [
    {
      "id": "uuid",
      "type": "test",
      "title": "Add unit test",
      "description": "This function needs tests",
      "confidence": 0.75
    }
  ]
}
```

#### Backend → UI Flow (via Redis/SSE)
```javascript
// Backend publishes to Redis
redis.publish('ai:jobs:status', JSON.stringify({
  jobId: 'job_123',
  status: 'completed',
  result: { suggestions: 5 }
}));

// UI receives via EventSource
eventSource.onmessage = (event) => {
  const { channel, message } = JSON.parse(event.data);
  // Update UI based on channel and message
};
```

### Step 2: Production Requirements

#### ✅ Beta Readiness Checklist

##### Infrastructure
- [ ] Redis instance running and accessible
- [ ] WebSocket server properly initialized
- [ ] SSL/TLS for secure WebSocket connections (wss://)
- [ ] CORS headers configured correctly
- [ ] Rate limiting implemented
- [ ] Connection pooling for Redis

##### Reliability
- [ ] Automatic reconnection logic
- [ ] Message queuing for offline clients
- [ ] Heartbeat/ping mechanism
- [ ] Graceful degradation when services unavailable
- [ ] Circuit breaker pattern for external services

##### Security
- [ ] Authentication for WebSocket connections
- [ ] Message validation and sanitization
- [ ] Rate limiting per client
- [ ] DDoS protection
- [ ] Secure Redis configuration

##### Monitoring
- [ ] Connection metrics (active, total, failed)
- [ ] Message throughput tracking
- [ ] Error logging and alerting
- [ ] Performance metrics (latency, queue size)
- [ ] Client version tracking

##### Developer Experience
- [ ] Clear documentation for IDE extension developers
- [ ] SDK/client libraries
- [ ] Example implementations
- [ ] Debugging tools
- [ ] Event replay capability

## 💻 Implementation Steps

### Step 1: Set Up Custom Server with WebSocket Support

Next.js doesn't natively support WebSocket servers, so we need a custom server:

```javascript
// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { websocketService } = require('./dist/lib/services/websocketServer');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Initialize WebSocket server
  websocketService.initialize(server);

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
    console.log('> WebSocket ready on ws://localhost:3000/ws');
  });
});
```

### Step 2: Add Authentication

```typescript
// Enhanced WebSocket authentication
interface AuthenticatedClient extends ExtensionClient {
  userId: string;
  apiKey: string;
  permissions: string[];
}

private async handleHandshake(client: ExtensionClient, data: any): Promise<void> {
  // Validate API key
  const apiKey = data.apiKey;
  if (!apiKey || !await this.validateApiKey(apiKey)) {
    this.sendError(client, 'Invalid API key');
    client.ws.close();
    return;
  }

  // Set authenticated client data
  const authClient = client as AuthenticatedClient;
  authClient.apiKey = apiKey;
  authClient.userId = await this.getUserIdFromApiKey(apiKey);
  authClient.permissions = await this.getPermissions(authClient.userId);

  // Continue with normal handshake...
}
```

### Step 3: Implement Message Queue

```typescript
// Redis-backed message queue for reliability
class MessageQueue {
  private redis: Redis;
  
  async queueMessage(clientId: string, message: any): Promise<void> {
    const key = `queue:${clientId}`;
    await this.redis.rpush(key, JSON.stringify(message));
    await this.redis.expire(key, 86400); // 24 hour TTL
  }

  async getQueuedMessages(clientId: string): Promise<any[]> {
    const key = `queue:${clientId}`;
    const messages = await this.redis.lrange(key, 0, -1);
    await this.redis.del(key);
    return messages.map(m => JSON.parse(m));
  }
}
```

### Step 4: Add Monitoring

```typescript
// Metrics collection
class WebSocketMetrics {
  private metrics = {
    connections: { active: 0, total: 0, failed: 0 },
    messages: { sent: 0, received: 0, errors: 0 },
    latency: []
  };

  trackConnection(event: 'connect' | 'disconnect' | 'error'): void {
    if (event === 'connect') {
      this.metrics.connections.active++;
      this.metrics.connections.total++;
    } else if (event === 'disconnect') {
      this.metrics.connections.active--;
    } else {
      this.metrics.connections.failed++;
    }
    this.publishMetrics();
  }

  private publishMetrics(): void {
    redis.publish('metrics:websocket', JSON.stringify(this.metrics));
  }
}
```

### Step 5: Client-Side Implementation

```tsx
// React hook for WebSocket connection
import { useEffect, useRef, useState } from 'react';

export function useWebSocket(url: string) {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttempts = useRef(0);

  const connect = () => {
    try {
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        reconnectAttempts.current = 0;
      };

      ws.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setLastMessage(message);
      };

      ws.current.onclose = () => {
        setIsConnected(false);
        handleReconnect();
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      handleReconnect();
    }
  };

  const handleReconnect = () => {
    if (reconnectAttempts.current < 5) {
      const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
      reconnectTimeoutRef.current = setTimeout(() => {
        reconnectAttempts.current++;
        connect();
      }, delay);
    }
  };

  const sendMessage = (message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimeoutRef.current);
      ws.current?.close();
    };
  }, [url]);

  return { isConnected, lastMessage, sendMessage };
}
```

### Step 6: SSE Client Implementation

```tsx
// React hook for Server-Sent Events
import { useEffect, useRef, useState } from 'react';

export function useEventSource(url: string) {
  const eventSource = useRef<EventSource | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    eventSource.current = new EventSource(url);

    eventSource.current.onopen = () => {
      console.log('SSE connected');
      setIsConnected(true);
    };

    eventSource.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setEvents(prev => [...prev.slice(-99), data]); // Keep last 100
    };

    eventSource.current.onerror = (error) => {
      console.error('SSE error:', error);
      setIsConnected(false);
    };

    return () => {
      eventSource.current?.close();
    };
  }, [url]);

  return { isConnected, events };
}
```

## 🧪 Testing Strategy

### Unit Tests
```typescript
// websocket.test.ts
describe('WebSocket Server', () => {
  it('should handle handshake', async () => {
    const client = await connectClient();
    await client.send({ type: 'handshake', data: { ... } });
    const response = await client.receive();
    expect(response.type).toBe('welcome');
  });

  it('should queue messages for offline clients', async () => {
    // Test message queuing logic
  });
});
```

### Integration Tests
```typescript
// e2e.test.ts
describe('End-to-End Flow', () => {
  it('should process IDE context and return suggestions', async () => {
    // Connect WebSocket
    // Send code context
    // Verify suggestions received
    // Check Redis for events
    // Verify SSE delivers events
  });
});
```

### Load Testing
```javascript
// load-test.js
const { Worker } = require('worker_threads');

// Spawn multiple WebSocket clients
for (let i = 0; i < 100; i++) {
  new Worker('./websocket-client-worker.js');
}

// Monitor metrics
setInterval(async () => {
  const metrics = await redis.get('metrics:websocket');
  console.log('Current metrics:', metrics);
}, 1000);
```

## 🔍 Debugging Tools

### WebSocket Inspector
```typescript
// Add to your dashboard
export function WebSocketInspector() {
  const { clients } = useWebSocketAdmin();
  
  return (
    <div>
      <h3>Connected Clients: {clients.length}</h3>
      {clients.map(client => (
        <div key={client.id}>
          <p>ID: {client.id}</p>
          <p>Type: {client.type}</p>
          <p>Last Activity: {client.lastActivity}</p>
        </div>
      ))}
    </div>
  );
}
```

### Event Stream Monitor
```typescript
export function EventMonitor() {
  const { events } = useEventSource('/api/events');
  
  return (
    <div>
      <h3>Recent Events</h3>
      {events.map((event, i) => (
        <div key={i}>
          <span>{event.channel}</span>
          <pre>{JSON.stringify(event.message, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
```

## 🚦 Production Deployment

### Environment Variables
```bash
# .env.production
REDIS_URL=redis://production-redis:6379
WS_PORT=3000
WS_PATH=/ws
ENABLE_METRICS=true
MAX_CONNECTIONS=1000
AUTH_REQUIRED=true
```

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm run build

EXPOSE 3000
CMD ["node", "server.js"]
```

### Nginx Configuration (for WebSocket proxy)
```nginx
location /ws {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_read_timeout 86400;
}

location /api/events {
    proxy_pass http://localhost:3000;
    proxy_set_header Connection '';
    proxy_http_version 1.1;
    chunked_transfer_encoding off;
    proxy_buffering off;
    proxy_cache off;
}
```

## 📊 Monitoring Dashboard

Create a real-time monitoring dashboard:

```tsx
export function RealtimeMonitor() {
  const { wsMetrics } = useWebSocketMetrics();
  const { sseMetrics } = useSSEMetrics();
  
  return (
    <Dashboard>
      <MetricCard 
        title="WebSocket Connections"
        value={wsMetrics.connections.active}
        total={wsMetrics.connections.total}
      />
      <MetricCard 
        title="Messages/sec"
        value={wsMetrics.throughput}
      />
      <MetricCard 
        title="SSE Subscribers"
        value={sseMetrics.subscribers}
      />
      <LatencyChart data={wsMetrics.latency} />
      <ErrorLog errors={[...wsMetrics.errors, ...sseMetrics.errors]} />
    </Dashboard>
  );
}
```

## 🎯 Beta Launch Checklist

### Week 1: Infrastructure
- [ ] Set up production Redis with persistence
- [ ] Configure SSL certificates for wss://
- [ ] Deploy custom Next.js server
- [ ] Set up monitoring infrastructure

### Week 2: Security & Reliability
- [ ] Implement authentication system
- [ ] Add rate limiting
- [ ] Set up message queuing
- [ ] Implement circuit breakers

### Week 3: Testing
- [ ] Run load tests (target: 100 concurrent connections)
- [ ] Test failover scenarios
- [ ] Verify message delivery guarantees
- [ ] Test reconnection logic

### Week 4: Documentation & Tools
- [ ] Write IDE extension integration guide
- [ ] Create example client implementations
- [ ] Build debugging dashboard
- [ ] Prepare beta user onboarding

## 🆘 Common Issues & Solutions

### Issue: WebSocket connections dropping
**Solution**: Implement heartbeat/ping mechanism and aggressive reconnection

### Issue: Messages lost during disconnection
**Solution**: Queue messages in Redis with TTL

### Issue: SSE connections timing out
**Solution**: Send periodic keep-alive comments, configure proxy timeouts

### Issue: High memory usage with many connections
**Solution**: Implement connection pooling and client limits

## 📚 Next Steps

1. **Implement the custom server** (server.js)
2. **Add authentication layer**
3. **Set up Redis with proper configuration**
4. **Create monitoring dashboard**
5. **Write comprehensive tests**
6. **Document for beta users**

This system is the nervous system of DevMentor - it enables real-time collaboration between the IDE and the AI-powered dashboard. Getting it right is crucial for a smooth beta experience.
{% endraw %}
