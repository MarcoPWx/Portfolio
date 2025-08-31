---
layout: product
title: REDIS PATTERNS REFERENCE
product: DevMentor
source: infrastructure/services/redis/REDIS_PATTERNS_REFERENCE.md
---

{% raw %}
CURRENT ARCHITECTURE

# Redis Patterns Reference Guide

## Currently Implemented Patterns in DevMentor

### 1. Cache Database Queries (✅ In Use)
```typescript
// UI Server - devmentor-ui/src/server/redis.ts
async function getCachedData(key: string): Promise<Data | null> {
  try {
    // Try cache first
    const cached = await redis.get(`cache:${key}`);
    if (cached) return JSON.parse(cached);

    // Cache miss - get from database
    const data = await expensiveDbQuery();
    await redis.setex(
      `cache:${key}`,
      300,  // 5 min TTL
      JSON.stringify(data)
    );
    return data;
  } catch (e) {
    return expensiveDbQuery(); // Fallback to DB
  }
}
```

### 2. Message Queue (✅ In Use - Project Events)
```typescript
// Project Service - project-service/src/redis.ts
async function publishEvent(event) {
  // Add to stream for durable processing
  await redis.xadd(
    'stream:projects',
    '*',  // Auto ID
    'event', JSON.stringify(event)
  );
}

// Consumer
const events = await redis.xreadgroup(
  'GROUP', 'analytics', 'consumer1',
  'STREAMS', 'stream:projects', '>'
);
```

### 3. Distributed Locking (✅ In Use)
```typescript
// Auth Service - auth-service/src/redis.ts
async function acquireLock(resource: string): Promise<boolean> {
  return redis.set(
    `lock:${resource}`,
    serverId,
    'NX',  // Only set if not exists
    'PX',  // Expire in milliseconds
    5000   // 5 second lock
  );
}
```

### 4. Request Throttling (✅ In Use)
```typescript
// Rate Limiter - auth-service/src/redis.ts
async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate:${ip}`;
  const requests = await redis.incr(key);
  if (requests === 1) {
    await redis.expire(key, 60); // 1 minute window
  }
  return requests > 100; // Limit: 100 requests/minute
}
```

### 5. Session Store (✅ In Use)
```typescript
// Auth Service - auth-service/src/redis.ts
async function storeSession(token: string, data: SessionData) {
  await redis.setex(
    `session:${token}`,
    3600,  // 1 hour
    JSON.stringify(data)
  );
}

async function getSession(token: string): Promise<SessionData | null> {
  const data = await redis.get(`session:${token}`);
  return data ? JSON.parse(data) : null;
}
```

### 6. Rate Limiting (✅ In Use)
```typescript
// API Gateway - api-gateway/src/middleware/rateLimiter.ts
async function rateLimit(req, res, next) {
  const key = `ratelimit:${req.ip}`;
  const count = await redis.incr(key);
  
  if (count === 1) {
    await redis.expire(key, 60);
  }
  
  if (count > 100) {
    return res.status(429).send('Too Many Requests');
  }
  
  next();
}
```

### 7. Real-time Leaderboard (🔄 Partially Implemented)
```typescript
// Learning Service - learning-service/src/redis.ts
async function updateUserScore(userId: string, score: number) {
  await redis.zadd('leaderboard', score, userId);
}

async function getTopUsers(count: number = 10) {
  return redis.zrevrange('leaderboard', 0, count - 1, 'WITHSCORES');
}
```

### 8. HyperLogLog for Metrics (⏳ Planned)
```typescript
// To be implemented in analytics service
// Will track unique visitors per endpoint
async function trackEndpointVisit(endpoint: string, userId: string) {
  await redis.pfadd(`visitors:${endpoint}`, userId);
}

async function getUniqueVisitors(endpoint: string) {
  return redis.pfcount(`visitors:${endpoint}`);
}
```

### 9. Pub/Sub for Real-time Updates (✅ In Use)
```typescript
// Project Service - project-service/src/redis.ts
// Publisher
await redisPub.publish(
  'realtime:projects',
  JSON.stringify(event)
);

// Subscriber (WebSocket Server)
redisSub.subscribe('realtime:projects');
redisSub.on('message', (channel, message) => {
  websocketServer.broadcast(message);
});
```

### 10. Geospatial (⏳ Planned)
```typescript
// To be implemented for nearby user features
async function updateUserLocation(userId: string, lat: number, lon: number) {
  await redis.geoadd('user_locations', lon, lat, userId);
}

async function getNearbyUsers(lat: number, lon: number, radius: number) {
  return redis.georadius('user_locations', lon, lat, radius, 'km');
}
```

### 11. Time Series (⏳ Planned)
```typescript
// To be implemented for analytics
async function trackMetric(metric: string, value: number) {
  const ts = Date.now();
  await redis.ts.add(`metrics:${metric}`, ts, value);
}
```

### 12. Social Timeline (✅ In Use)
```typescript
// User Activity Feed
async function addToTimeline(userId: string, activity: Activity) {
  await redis.lpush(
    `timeline:${userId}`,
    JSON.stringify(activity)
  );
  await redis.ltrim(`timeline:${userId}`, 0, 999); // Keep last 1000
}
```

### 13. Full-text Search (⏳ Planned)
Will be used for documentation search

### 14. Nested JSON (✅ In Use)
```typescript
// Learning Service - Context Storage
async function storeContext(userId: string, context: any) {
  await redis.json.set(
    `context:${userId}`,
    '.',  // Root path
    context
  );
}
```

### 15. Graph Relationships (⏳ Planned)
Will be used for skill tree visualization

### 16. Job Scheduler (✅ In Use)
```typescript
// Task Scheduler
async function scheduleTask(task: Task, time: number) {
  await redis.zadd('scheduled_tasks', time, JSON.stringify(task));
}

// Worker
async function processScheduledTasks() {
  const now = Date.now();
  const tasks = await redis.zrangebyscore('scheduled_tasks', 0, now);
  
  for (const task of tasks) {
    await processTask(JSON.parse(task));
    await redis.zrem('scheduled_tasks', task);
  }
}
```

### 17. Bloom Filter (⏳ Planned)
Will be used for content recommendation deduplication

### 18. Distributed Counter (✅ In Use)
```typescript
// Analytics Service
async function incrementMetric(metric: string) {
  return redis.incr(`counter:${metric}`);
}
```

### 19. Shopping Cart (⏳ Planned)
```typescript
// To be implemented for premium features store
async function addToCart(userId: string, item: string) {
  await redis.hset(`cart:${userId}`, item, 1);
}
```

### 20. Idempotency Keys (✅ In Use)
```typescript
// API Gateway - Idempotency Middleware
async function checkIdempotency(req, res, next) {
  const key = req.headers['idempotency-key'];
  if (!key) return next();
  
  const exists = await redis.set(
    `idempotent:${key}`,
    'processing',
    'NX',
    'EX',
    3600
  );
  
  if (!exists) {
    return res.status(409).send('Request already processed');
  }
  
  next();
}
```

## Implementation Status Summary

✅ Fully Implemented:
- Caching (1)
- Message Queue (2)
- Distributed Locking (3)
- Request Throttling (4)
- Session Store (5)
- Rate Limiting (6)
- Pub/Sub (9)
- Social Timeline (12)
- Nested JSON (14)
- Job Scheduler (16)
- Distributed Counter (18)
- Idempotency Keys (20)

🔄 Partially Implemented:
- Real-time Leaderboard (7)

⏳ Planned:
- HyperLogLog Metrics (8)
- Geospatial (10)
- Time Series (11)
- Full-text Search (13)
- Graph DB (15)
- Bloom Filter (17)
- Shopping Cart (19)

## Key Files to Reference

1. `devmentor-ui/src/server/redis.ts` - Caching implementation
2. `auth-service/src/redis.ts` - Sessions, rate limiting
3. `project-service/src/redis.ts` - Events, pub/sub
4. `learning-service/src/redis.ts` - Leaderboards, context

## Common Interview Questions

1. **"How do you handle Redis failures?"**
   ```typescript
   // We implement graceful degradation
   try {
     const cached = await redis.get(key);
     if (cached) return JSON.parse(cached);
   } catch (e) {
     // Redis down - fallback to database
     return expensiveDbQuery();
   }
   ```

2. **"How do you prevent race conditions?"**
   ```typescript
   // We use distributed locks
   const lock = await redis.set(
     `lock:${resource}`,
     serverId,
     'NX',
     'PX',
     5000
   );
   if (!lock) {
     throw new Error('Resource locked');
   }
   ```

3. **"How do you handle hot keys?"**
   ```typescript
   // We shard the keys
   const shard = userId % 10;
   const key = `rate_limit:${shard}:${userId}`;
   ```
{% endraw %}
