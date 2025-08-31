---
layout: product
title: LEARNING
product: DevMentor
source: api/LEARNING.md
---

{% raw %}
CURRENT ARCHITECTURE

# Event Systems: A Complete Learning Guide

## Table of Contents
1. [Introduction: Why Event Systems Matter](#introduction)
2. [Chapter 1: Understanding Events](#chapter-1-understanding-events)
3. [Chapter 2: Communication Patterns](#chapter-2-communication-patterns)
4. [Chapter 3: Technologies Explained](#chapter-3-technologies-explained)
5. [Chapter 4: Building Your First Event System](#chapter-4-building-your-first-event-system)
6. [Chapter 5: Production Architecture](#chapter-5-production-architecture)
7. [Chapter 6: Real-World Implementation](#chapter-6-real-world-implementation)
8. [Chapter 7: Best Practices & Patterns](#chapter-7-best-practices-patterns)
---
## Introduction: Why Event Systems Matter {#introduction}
Imagine you're building a restaurant ordering system. When a customer places an order:
- The kitchen needs to know what to cook
- The payment system needs to process the transaction
- The inventory needs to be updated
- The customer needs a confirmation
- The delivery driver needs to be notified
Without events, each system would need to directly call all the others - a tangled mess! With events, the order system just announces "New order placed!" and each interested system reacts independently.
```ascii
Without Events (Tightly Coupled):          With Events (Loosely Coupled):
                                           
    Order ──┬──> Kitchen                       Order ──> [EVENT: Order Placed]
            ├──> Payment                                         │
            ├──> Inventory                    Kitchen <─────────┤
            ├──> Email                        Payment <─────────┤
            └──> Delivery                     Inventory <───────┤
                                              Email <───────────┤
         (5 direct connections)               Delivery <────────┘
                                              
                                              (1 event, 5 listeners)
```
## Chapter 1: Understanding Events {#chapter-1-understanding-events}
### What Is an Event?
An event is simply **a record that something happened**. It has:
```javascript
{
  what: "user.logged_in",        // What happened
  when: "2024-08-17T10:30:00Z",  // When it happened
  who: "user-123",               // Who did it
  where: "mobile-app",           // Where it came from
  details: {                     // Additional context
    ip: "192.168.1.1",
    device: "iPhone 14"
  }
}
### Events vs Commands vs Queries
Let's understand the difference:
┌─────────────────────────────────────────────────────────────┐
│ COMMAND: "Do this!"          (Imperative, expects action)   │
│ Example: createUser("John")                                 │
│                                                             │
│ EVENT: "This happened!"      (Past tense, informational)   │
│ Example: userCreated({name: "John", id: 123})              │
│ QUERY: "Tell me this"        (Request for information)     │
│ Example: getUser(123)                                      │
└─────────────────────────────────────────────────────────────┘
### Event Naming Conventions
Good event names tell a story:
- ✅ `order.placed`, `payment.processed`, `email.sent`
- ❌ `handleOrder`, `doPayment`, `sendEmailNow`
Events describe what **happened**, not what **should happen**.
## Chapter 2: Communication Patterns {#chapter-2-communication-patterns}
### Pattern 1: Request-Response (Traditional)
Client                          Server
  │                               │
  ├──── "Give me user 123" ──────>│
  │                               │ (Processes request)
  │<──── {name: "John"} ──────────│
  
Characteristics:
- Synchronous (client waits)
- Direct coupling
- Simple but rigid
### Pattern 2: Publish-Subscribe (Pub/Sub)
Publisher                    Event Bus                    Subscribers
    │                            │                            │
    ├──"User logged in"────────> │                            │
    │                            ├───"User logged in"────────>│ Analytics
    │                            ├───"User logged in"────────>│ Email
    │                            └───"User logged in"────────>│ Audit Log
    
- Asynchronous (fire and forget)
- Loose coupling
- Scalable but no persistence
### Pattern 3: Event Streaming
Producer                    Event Stream                  Consumers
    ├──Event 1────────────────> [1][2][3][4][5]              │
    ├──Event 2────────────────> [1][2][3][4][5][6]           │
    └──Event 3────────────────> [1][2][3][4][5][6][7]        │
                                 │                            │
                                 │<─── Read from position 3 ──│ Consumer A
                                 │<─── Read from position 1 ──│ Consumer B (replay)
- Persistent log of events
- Consumers can replay/rewind
- Perfect for event sourcing
## Chapter 3: Technologies Explained {#chapter-3-technologies-explained}
### WebSockets: The Two-Way Street
Think of WebSockets like a **phone call** - once connected, both parties can talk anytime:
// Client side
const ws = new WebSocket('ws://localhost:8080');
ws.onopen = () => {
  console.log('📞 Connected!');
  ws.send('Hello server!');
};
ws.onmessage = (event) => {
  console.log('📨 Received:', event.data);
// Server can push messages anytime
// Client can send messages anytime
**When to use WebSockets:**
- Chat applications
- Collaborative editing (Google Docs)
- Real-time gaming
- Live trading platforms
### Server-Sent Events (SSE): The Radio Broadcast
SSE is like **listening to radio** - server broadcasts, clients listen:
const eventSource = new EventSource('/api/events');
eventSource.onmessage = (event) => {
  console.log('📻 Broadcast received:', event.data);
// Only server can send
// Client just listens
// Auto-reconnects if connection drops!
**When to use SSE:**
- Live dashboards
- News feeds
- Stock price updates
- Progress notifications
### Redis Pub/Sub: The Intercom System
Redis Pub/Sub is like an **office intercom** - instant but not recorded:
// Publisher
redis.publish('news-channel', 'Breaking news!');
// Subscriber
redis.subscribe('news-channel');
redis.on('message', (channel, message) => {
  console.log(`📢 ${channel}: ${message}`);
});
// If subscriber is offline, message is lost!
**When to use Redis Pub/Sub:**
- Cross-server communication
- Real-time notifications
- Cache invalidation
- Temporary broadcasts
### Redis Streams: The Flight Recorder
Redis Streams is like a **flight recorder** - everything is logged permanently:
// Add to stream (like writing to a log)
redis.xadd('events-stream', '*', 
  'type', 'user.login',
  'user', 'john@example.com',
  'timestamp', Date.now()
);
// Read from beginning
const events = await redis.xrange('events-stream', '-', '+');
// Read new events as they arrive
const newEvents = await redis.xread('BLOCK', 0, 'STREAMS', 'events-stream', '$');
**When to use Redis Streams:**
- Event sourcing
- Audit logs
- Message queues with persistence
- Activity feeds
### Comparison Table
┌────────────┬────────────┬───────────┬──────────┬────────────┐
│ Technology │ Direction  │ Persisted │ Protocol │ Best For   │
├────────────┼────────────┼───────────┼──────────┼────────────┤
│ WebSocket  │ Bi-direct  │ No        │ WS       │ Chat, Games│
│ SSE        │ Server→Client│ No      │ HTTP     │ Dashboards │
│ Redis Pub/Sub│ Any→Any  │ No        │ Redis    │ Microservices│
│ Redis Streams│ Any→Any  │ Yes       │ Redis    │ Event Store│
└────────────┴────────────┴───────────┴──────────┴────────────┘
## Chapter 4: Building Your First Event System {#chapter-4-building-your-first-event-system}
Let's build a simple event system step by step:
### Step 1: Basic Event Emitter (In-Memory)
// Simple event emitter
class EventEmitter {
  constructor() {
    this.events = {};
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  emit(event, data) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(data));
// Usage
const emitter = new EventEmitter();
emitter.on('user.login', (data) => {
  console.log('User logged in:', data);
emitter.emit('user.login', { userId: 123 });
### Step 2: Adding Persistence with Redis Streams
import Redis from 'ioredis';
class PersistentEventSystem {
    this.redis = new Redis();
    this.listeners = new Map();
  async emit(eventType, data) {
    // Create event object
    const event = {
      id: `${Date.now()}-${Math.random()}`,
      type: eventType,
      timestamp: Date.now(),
      data
    };
    // Store in Redis Stream
    await this.redis.xadd(
      `stream:${eventType}`,
      '*',
      'event', JSON.stringify(event)
    );
    // Notify local listeners
    this.notifyListeners(eventType, event);
    return event.id;
  subscribe(pattern, callback) {
    if (!this.listeners.has(pattern)) {
      this.listeners.set(pattern, new Set());
    this.listeners.get(pattern).add(callback);
    // Return unsubscribe function
    return () => {
      this.listeners.get(pattern).delete(callback);
  notifyListeners(eventType, event) {
    this.listeners.forEach((callbacks, pattern) => {
      if (this.matchesPattern(eventType, pattern)) {
        callbacks.forEach(cb => cb(event));
      }
    });
  matchesPattern(eventType, pattern) {
    // Simple pattern matching (e.g., "user.*" matches "user.login")
    const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
    return regex.test(eventType);
### Step 3: Adding SSE for Browser Clients
// Server endpoint (Next.js example)
export async function GET(request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      controller.enqueue(
        encoder.encode('data: {"connected": true}\n\n')
      );
      
      // Subscribe to events
      const unsubscribe = eventSystem.subscribe('*', (event) => {
        const message = `data: ${JSON.stringify(event)}\n\n`;
        controller.enqueue(encoder.encode(message));
      });
      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        unsubscribe();
        controller.close();
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
eventSource.onmessage = (e) => {
  const event = JSON.parse(e.data);
  console.log('Received event:', event);
## Chapter 5: Production Architecture {#chapter-5-production-architecture}
### The Complete System
┌─────────────────────────────────────────────────────────────────────┐
│                     Production Event Architecture                     │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Layer 1: Event Producers (Sources)                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐              │
│  │   API    │ │Background│ │   Cron   │ │  External│              │
│  │ Handlers │ │   Jobs   │ │   Jobs   │ │  Systems │              │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘              │
│       └────────────┴────────────┴────────────┘                      │
│                            │                                         │
│  Layer 2: Event Router & Persistence                                 │
│  ┌────────────────────────▼──────────────────────────┐             │
│  │            Unified Event System                     │             │
│  │  ┌────────────────────────────────────────────┐   │             │
│  │  │  1. Validate & enrich event                 │   │             │
│  │  │  2. Generate ID & timestamp                 │   │             │
│  │  │  3. Store in Redis Stream                   │   │             │
│  │  │  4. Publish to Redis Pub/Sub                │   │             │
│  │  │  5. Broadcast to connected clients          │   │             │
│  │  └────────────────────────────────────────────┘   │             │
│  └────────────┬───────────────────┬──────────────────┘             │
│               │                   │                                  │
│  Layer 3: Storage & Distribution                                     │
│       ┌───────▼────────┐   ┌─────▼──────┐                         │
│       │ Redis Streams  │   │   Redis    │                         │
│       │  (Persistent)  │   │  Pub/Sub   │                         │
│       └───────┬────────┘   └─────┬──────┘                         │
│  Layer 4: Consumers                                                  │
│    ┌──────────┼───────────────────┼──────────────┐                │
│    ▼          ▼                   ▼              ▼                 │
│ ┌──────┐ ┌─────────┐      ┌─────────┐    ┌──────────┐           │
│ │ SSE  │ │WebSocket│      │Analytics│    │ External │           │
│ │Clients│ │ Clients │      │ Service │    │   APIs   │           │
│ └──────┘ └─────────┘      └─────────┘    └──────────┘           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
### Scaling Considerations
Single Server (Development):
┌──────────────┐
│   Server 1   │
│ ┌──────────┐ │
│ │   App    │ │
│ │  Redis   │ │
│ └──────────┘ │
└──────────────┘
Events: ~1K/sec
Connections: ~100
Horizontal Scaling (Beta):
┌──────────────┐  ┌──────────────┐
│   Server 1   │  │   Server 2   │
│ ┌──────────┐ │  │ ┌──────────┐ │
│ │   App    │ │  │ │   App    │ │
│ └─────┬────┘ │  │ └─────┬────┘ │
└───────┼──────┘  └───────┼──────┘
        └──────┬──────────┘
               ▼
        ┌──────────┐
        │  Redis   │
        │ (Shared) │
        └──────────┘
Events: ~10K/sec
Connections: ~1K
Production Scale:
┌─────────────────────────────────┐
│      Load Balancer (Nginx)      │
└────┬─────────┬─────────┬────────┘
     ▼         ▼         ▼
┌────────┐┌────────┐┌────────┐
│ Node 1 ││ Node 2 ││ Node 3 │
└───┬────┘└───┬────┘└───┬────┘
    └─────────┼──────────┘
              ▼
    ┌─────────────────┐
    │  Redis Cluster  │
    │   (3 nodes)     │
    └─────────────────┘
Events: ~50K/sec
Connections: ~10K
## Chapter 6: Real-World Implementation {#chapter-6-real-world-implementation}
### Use Case 1: AI Assistant Integration
// When user sends a message to AI
async function handleAIRequest(userMessage) {
  // 1. Emit request event
  const requestId = await eventSystem.emit('ai.request', {
    message: userMessage,
    userId: currentUser.id,
    model: 'gpt-4'
  // 2. Show loading state (don't wait for response)
  showLoadingIndicator();
  // 3. Response will come through event stream
// Listen for AI responses
eventSystem.subscribe('ai.response', (event) => {
  if (event.data.requestId === currentRequestId) {
    // Stream tokens as they arrive
    appendToChat(event.data.token);
// Listen for completion
eventSystem.subscribe('ai.complete', (event) => {
  hideLoadingIndicator();
  enableUserInput();
### Use Case 2: Real-time Dashboard
// Dashboard component
function MetricsDashboard() {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    requests: 0,
    errors: 0
  useEffect(() => {
    // Connect to SSE endpoint
    const eventSource = new EventSource('/api/events');
    eventSource.addEventListener('metrics.update', (e) => {
      const data = JSON.parse(e.data);
      setMetrics(prev => ({ ...prev, ...data }));
    eventSource.addEventListener('alert', (e) => {
      const alert = JSON.parse(e.data);
      showNotification(alert.message, alert.severity);
    return () => eventSource.close();
  }, []);
  return (
    <div className="dashboard">
      <MetricCard title="CPU" value={`${metrics.cpu}%`} />
      <MetricCard title="Memory" value={`${metrics.memory}MB`} />
      <MetricCard title="Requests/sec" value={metrics.requests} />
      <MetricCard title="Errors" value={metrics.errors} />
    </div>
  );
### Use Case 3: Audit Trail
// Automatically log all important events
eventSystem.subscribe('user.*', async (event) => {
  await auditLog.record({
    eventType: event.type,
    userId: event.data.userId,
    timestamp: event.timestamp,
    details: event.data,
    ip: event.metadata?.ip,
    userAgent: event.metadata?.userAgent
// Query audit history
async function getUserActivity(userId, days = 7) {
  const since = Date.now() - (days * 24 * 60 * 60 * 1000);
  const events = await eventSystem.getEventHistory(
    'stream:user:*',
    1000,
    since
  return events.filter(e => e.data.userId === userId);
## Chapter 7: Best Practices & Patterns {#chapter-7-best-practices-patterns}
### 1. Event Design Principles
// ❌ BAD: Coupled, imperative
  type: "SEND_EMAIL_TO_USER",
  userId: 123,
  template: "welcome"
// ✅ GOOD: Decoupled, declarative
  type: "user.registered",
  data: {
    userId: 123,
    email: "user@example.com",
    registeredAt: "2024-08-17T10:00:00Z"
// Email service decides what to do with this event
### 2. Error Handling Pattern
class ResilientEventSystem {
  async emit(type, data, options = {}) {
    const maxRetries = options.retries || 3;
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await this._doEmit(type, data);
      } catch (error) {
        lastError = error;
        
        // Exponential backoff
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        // Log retry attempt
        console.warn(`Retry ${i + 1}/${maxRetries} for ${type}`, error);
    // Failed after retries - add to dead letter queue
    await this.deadLetterQueue.add({
      type,
      data,
      error: lastError.message,
      timestamp: Date.now()
    throw lastError;
### 3. Event Versioning
// Support multiple versions during migration
const eventHandlers = {
  'user.registered.v1': (data) => {
    // Old format
    return {
      userId: data.id,
      name: data.full_name
  },
  'user.registered.v2': (data) => {
    // New format
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName
// Adapter pattern for backward compatibility
function handleUserRegistered(event) {
  const version = event.version || 'v1';
  const handler = eventHandlers[`user.registered.${version}`];
  return handler(event.data);
### 4. Testing Events
// Test utilities
class EventSystemMock {
    this.emitted = [];
    this.subscribers = new Map();
  async emit(type, data) {
    const event = { type, data, timestamp: Date.now() };
    this.emitted.push(event);
    // Notify subscribers synchronously for testing
    this.subscribers.forEach((callbacks, pattern) => {
      if (this.matchesPattern(type, pattern)) {
  // Assertion helpers
  assertEmitted(type) {
    const found = this.emitted.find(e => e.type === type);
    if (!found) {
      throw new Error(`Event ${type} was not emitted`);
    return found;
  assertNotEmitted(type) {
    if (found) {
      throw new Error(`Event ${type} should not have been emitted`);
// Example test
describe('User Registration', () => {
  it('should emit user.registered event', async () => {
    const eventSystem = new EventSystemMock();
    const userService = new UserService(eventSystem);
    await userService.registerUser({
      email: 'test@example.com',
      password: 'secure123'
    const event = eventSystem.assertEmitted('user.registered');
    expect(event.data.email).toBe('test@example.com');
### 5. Monitoring & Observability
// Instrument your event system
class MonitoredEventSystem extends EventSystem {
  constructor(metrics) {
    super();
    this.metrics = metrics;
    const startTime = Date.now();
    try {
      const result = await super.emit(type, data);
      // Record metrics
      this.metrics.increment('events.emitted', { type });
      this.metrics.histogram('events.size', JSON.stringify(data).length);
      this.metrics.histogram('events.latency', Date.now() - startTime);
      return result;
    } catch (error) {
      this.metrics.increment('events.errors', { type, error: error.name });
      throw error;
## Summary: Your Event System Journey
Your Learning Path:
┌────────────────┐
│ 1. Basics      │ Learn what events are
└───────┬────────┘
        ▼
│ 2. Patterns    │ Understand pub/sub, streaming
│ 3. Technologies│ Master SSE, WebSockets, Redis
│ 4. Build       │ Create your first system
│ 5. Scale       │ Make it production-ready
│ 6. Master      │ Apply best practices
└────────────────┘
## Next Steps
1. **Start Small**: Implement a basic event emitter in your app
2. **Add Persistence**: Integrate Redis Streams for one feature
3. **Go Real-time**: Add SSE for a dashboard or notification
4. **Scale Up**: Implement the unified system across your app
5. **Monitor**: Add metrics and observability
6. **Optimize**: Fine-tune based on real usage patterns
Remember: **Events are about what happened, not what should happen.** Design your events to tell the story of your application, and the rest will follow naturally.
## Quick Reference
// Emit an event
await eventSystem.emit('user.action', { 
  action: 'clicked_button',
  button: 'save'
// Subscribe to events
const unsubscribe = eventSystem.subscribe('user.*', (event) => {
  console.log('User event:', event);
// Query history
const history = await eventSystem.getEventHistory('stream:user:*', 100);
// Clean up
unsubscribe();
Happy eventing! 🚀
{% endraw %}
