---
layout: product
title: EMITTERS
product: DevMentor
source: api/EMITTERS.md
---

{% raw %}
CURRENT ARCHITECTURE

# Event Emitters & Real-time Systems: Beta Readiness Checklist

## 📡 Current State Assessment
### What You Have Now
1. **incidentsBus.ts** - In-memory SSE publisher with process-local subscribers
2. **Redis Pub/Sub SSE endpoint** (`/api/events/route.ts`) - Cross-process event streaming
3. **WebSocketService** - IDE bridge with basic reconnection logic
4. **Multiple event types** - Scattered across different systems without unified schema
### Critical Issues for Beta
- **Message Loss**: Redis Pub/Sub is fire-and-forget - no persistence or replay capability
- **Fragmented Architecture**: 3 separate systems that don't talk to each other
- **No Delivery Guarantees**: No acknowledgments, retries, or dead letter queues
- **Limited Observability**: Can't track event flow, failures, or performance metrics
## 🚀 The Solution: Unified Event System
I've created `devmentor-ui/src/lib/events/unifiedEventSystem.ts` that consolidates all event handling into a single, production-ready system.
### Key Features
- **Redis Streams** for persistence and replay
- **Multi-channel broadcast** (SSE, WebSocket, Redis)
- **Automatic reconnection** with exponential backoff
- **Message queuing** during disconnections
- **Event history** with configurable retention
## ✅ Beta Readiness Checklist
### Phase 1: Core Infrastructure (Days 1-2)
#### Redis Streams Setup
```bash
# Verify Redis version supports streams (5.0+)
redis-cli INFO server | grep redis_version
# Configure Redis for production
cat >> redis.conf << EOF
# Persistence
appendonly yes
appendfsync everysec
# Memory management
maxmemory 2gb
maxmemory-policy allkeys-lru
# Stream specific
stream-node-max-bytes 4096
stream-node-max-entries 100
EOF
```
- [ ] **Upgrade Redis to 6.2+** for better stream performance
- [ ] **Enable AOF persistence** for data durability
- [ ] **Configure stream retention** policies
- [ ] **Set up Redis Sentinel** for high availability
- [ ] **Create backup procedures** for stream data
#### Migration Tasks
- [ ] **Initialize UnifiedEventSystem on startup**
  ```typescript
  // app/layout.tsx or _app.tsx
  import { getEventSystem } from '@/lib/events/unifiedEventSystem';
  
  // Initialize once
  if (typeof window === 'undefined') {
    getEventSystem().initialize();
  }
  ```
- [ ] **Replace incidentsBus usage**
  // Before
  import { publish } from '@/lib/incidentsBus';
  publish(incident);
  // After
  await getEventSystem().emit({
    type: 'incident',
    source: 'system',
    data: incident
  });
- [ ] **Update SSE endpoints**
  // app/api/events/route.ts
  export async function GET() {
    await getEventSystem().initialize();
    const stream = getEventSystem().createEventStream();
    
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no'
      }
    });
### Phase 2: WebSocket Integration (Days 3-4)
#### Enhanced WebSocket Service
- [ ] **Integrate with UnifiedEventSystem**
  // lib/services/websocketService.ts
  class WebSocketService {
    private async handleIDEMessage(data: string) {
      const message = JSON.parse(data);
      
      // Emit to unified system
      await getEventSystem().emit({
        type: `ide.${message.type}`,
        source: 'vscode',
        data: message.data,
        metadata: { requestId: message.requestId }
      });
    }
    private initializePBMLConnection() {
      // Subscribe to events
      getEventSystem().subscribe('learning.*', (event) => {
        this.sendToDashboard({
          type: 'learning_recommendation',
          data: event.data,
          timestamp: event.timestamp
        });
- [ ] **Add connection state management**
  enum ConnectionState {
    CONNECTING = 'connecting',
    CONNECTED = 'connected',
    RECONNECTING = 'reconnecting',
    DISCONNECTED = 'disconnected'
  class WebSocketManager {
    private state: ConnectionState = ConnectionState.DISCONNECTED;
    private reconnectTimer?: NodeJS.Timeout;
    private backoffMs = 1000;
    async connect() {
      this.state = ConnectionState.CONNECTING;
      // Connection logic with proper state transitions
- [ ] **Implement message buffering**
  class MessageBuffer {
    private buffer: BaseEvent[] = [];
    private maxSize = 1000;
    add(event: BaseEvent) {
      this.buffer.push(event);
      if (this.buffer.length > this.maxSize) {
        this.buffer.shift(); // FIFO
    flush(): BaseEvent[] {
      const events = [...this.buffer];
      this.buffer = [];
      return events;
### Phase 3: Event Schema & Types (Day 5)
#### Define Event Taxonomy
- [ ] **Create structured event types**
  // types/events.ts
  export enum EventCategory {
    SYSTEM = 'system',
    USER = 'user',
    AI = 'ai',
    IDE = 'ide',
    LEARNING = 'learning'
  export interface SystemEvent extends BaseEvent {
    type: `${EventCategory.SYSTEM}.${string}`;
    data: {
      service: string;
      status: 'healthy' | 'degraded' | 'down';
      metrics?: Record<string, number>;
    };
  export interface AIEvent extends BaseEvent {
    type: `${EventCategory.AI}.${string}`;
      model: string;
      prompt?: string;
      response?: string;
      latency?: number;
      tokens?: number;
- [ ] **Document all event types**
  ```markdown
  # Event Catalog
  ## System Events
  - `system.health` - Service health updates
  - `system.error` - System-level errors
  - `system.metric` - Performance metrics
  ## AI Events
  - `ai.request` - AI model request initiated
  - `ai.response` - AI model response received
  - `ai.error` - AI processing error
  ## IDE Events
  - `ide.connected` - IDE extension connected
  - `ide.file_changed` - File modification detected
  - `ide.context_update` - Context window updated
### Phase 4: Monitoring & Observability (Days 6-7)
#### Metrics Collection
- [ ] **Add Prometheus metrics**
  import { Registry, Counter, Histogram, Gauge } from 'prom-client';
  const registry = new Registry();
  const eventsEmitted = new Counter({
    name: 'events_emitted_total',
    help: 'Total events emitted',
    labelNames: ['type', 'source'],
    registers: [registry]
  const eventLatency = new Histogram({
    name: 'event_processing_duration_seconds',
    help: 'Event processing latency',
    labelNames: ['type'],
  const activeConnections = new Gauge({
    name: 'active_connections',
    help: 'Number of active connections',
    labelNames: ['type'], // 'sse' | 'websocket'
- [ ] **Create monitoring dashboard**
  ```yaml
  # docker-compose.monitoring.yml
  services:
    prometheus:
      image: prom/prometheus:latest
      volumes:
        - ./prometheus.yml:/etc/prometheus/prometheus.yml
      ports:
        - "9090:9090"
    grafana:
      image: grafana/grafana:latest
        - "3000:3000"
      environment:
        - GF_SECURITY_ADMIN_PASSWORD=admin
#### Health Checks
- [ ] **Add event system health endpoint**
  // app/api/health/events/route.ts
    const eventSystem = getEventSystem();
    const health = {
      redis: await checkRedisConnection(),
      sseConnections: eventSystem.getSSEConnectionCount(),
      wsConnections: eventSystem.getWebSocketCount(),
      queuedEvents: eventSystem.getQueueSize(),
      lastEventTime: eventSystem.getLastEventTime()
    const isHealthy = health.redis === 'connected' && 
                      health.queuedEvents < 1000;
    return Response.json(health, { 
      status: isHealthy ? 200 : 503 
### Phase 5: Testing & Validation (Days 8-9)
#### Load Testing
- [ ] **Create load test scenarios**
  ```javascript
  // tests/load/event-system.test.js
  import { check } from 'k6';
  import ws from 'k6/ws';
  export const options = {
    stages: [
      { duration: '2m', target: 100 }, // Ramp up
      { duration: '5m', target: 100 }, // Stay at 100 users
      { duration: '2m', target: 0 },   // Ramp down
    ],
    thresholds: {
      ws_connecting: ['p(95)<1000'], // 95% connect within 1s
      ws_msgs_sent: ['rate>1000'],   // >1000 msgs/sec
    },
  };
  export default function () {
    const url = 'ws://localhost:3001/ws';
    const response = ws.connect(url, {}, function (socket) {
      socket.on('open', () => {
        socket.send(JSON.stringify({
          type: 'test',
          data: { timestamp: Date.now() }
        }));
      socket.on('message', (data) => {
        check(data, {
          'message received': (d) => d !== null,
#### Integration Tests
- [ ] **Test event flow end-to-end**
  // tests/integration/events.test.ts
  describe('Event System Integration', () => {
    it('should persist events to Redis Streams', async () => {
      const eventId = await getEventSystem().emit({
        type: 'test.event',
        source: 'test',
        data: { test: true }
      const history = await getEventSystem().getEventHistory(
        'stream:test.event:' + getDateKey(),
        1
      );
      expect(history[0].id).toBe(eventId);
    it('should handle reconnection gracefully', async () => {
      // Simulate connection loss
      await redis.quit();
      // Events should queue
      const promise = getEventSystem().emit({
        type: 'test.queued',
        data: { queued: true }
      // Reconnect
      await redis.connect();
      // Queued event should process
      await expect(promise).resolves.toBeDefined();
### Phase 6: Production Deployment (Days 10-11)
#### Environment Configuration
- [ ] **Set production environment variables**
  ```bash
  # .env.production
  REDIS_URL=redis://prod-redis:6379
  REDIS_STREAM_RETENTION=604800000  # 7 days in ms
  EVENT_QUEUE_SIZE=5000
  WS_HEARTBEAT_INTERVAL=30000
  SSE_HEARTBEAT_INTERVAL=45000
  MAX_RECONNECT_ATTEMPTS=10
  INSTANCE_ID=${HOSTNAME}  # For multi-instance deployments
#### Deployment Checklist
- [ ] **Configure nginx for WebSocket/SSE**
  ```nginx
  location /api/events {
    proxy_pass http://backend;
    proxy_http_version 1.1;
    proxy_set_header Connection '';
    proxy_buffering off;
    proxy_cache off;
    chunked_transfer_encoding off;
    proxy_read_timeout 86400s;
  location /ws {
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
- [ ] **Set up connection limits**
  // Prevent resource exhaustion
  const MAX_SSE_CONNECTIONS = 10000;
  const MAX_WS_CONNECTIONS = 5000;
  if (sseWriters.size >= MAX_SSE_CONNECTIONS) {
    return new Response('Too many connections', { status: 503 });
## 📊 Success Metrics
### Performance Targets
- **Event Latency**: p99 < 100ms
- **Connection Time**: p95 < 1s
- **Message Throughput**: > 10,000 events/sec
- **Reconnection Success**: > 99.9%
- **Message Delivery**: 100% (with retries)
### Monitoring KPIs
- Active connections (SSE + WebSocket)
- Events per second (by type)
- Queue depth
- Redis memory usage
- Stream lag (for consumers)
- Error rate
## 🔥 Rollback Plan
If issues arise during beta:
1. **Quick Rollback** (< 5 minutes)
   ```bash
   # Revert to separate systems
   git revert HEAD
   npm run build
   npm run deploy
   ```
2. **Feature Flag** (recommended)
   ```typescript
   const useUnifiedEvents = process.env.USE_UNIFIED_EVENTS === 'true';
   
   if (useUnifiedEvents) {
     return getEventSystem().emit(event);
   } else {
     return legacyPublish(event);
   }
3. **Gradual Rollout**
   - Start with 10% of traffic
   - Monitor for 24 hours
   - Increase to 50%, then 100%
## 📚 Documentation & Training
- [ ] **Developer Guide**: How to emit and subscribe to events
- [ ] **Operations Runbook**: Troubleshooting common issues
- [ ] **Architecture Diagram**: Visual representation of event flow
- [ ] **API Reference**: Complete event type documentation
- [ ] **Migration Guide**: Step-by-step for existing code
## 🎯 Beta Launch Criteria
Before launching beta, ensure:
- [ ] All unit tests passing (100% of event system tests)
- [ ] Load test successful (10k concurrent connections)
- [ ] Monitoring dashboards configured
- [ ] Alerts configured for critical metrics
- [ ] Rollback procedure tested
- [ ] Team trained on new system
- [ ] Documentation complete
---
**Timeline**: 11 days to complete all phases
**Risk Level**: Medium (mitigated by feature flags and gradual rollout)
**Impact**: High (affects all real-time features)
✨ Once complete, you'll have a production-grade event system that can scale to millions of events per day with full observability and reliability.
{% endraw %}
