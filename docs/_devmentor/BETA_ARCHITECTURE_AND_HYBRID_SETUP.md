---
layout: product
title: BETA ARCHITECTURE AND HYBRID SETUP
product: DevMentor
source: BETA_ARCHITECTURE_AND_HYBRID_SETUP.md
---

{% raw %}
# 🚀 DevMentor BETA Architecture & Hybrid Setup
## Redis + Supabase Integration Strategy

## Overview: The Hybrid Architecture

**NOT MVP - This is BETA!** We're launching a production-ready BETA with a smart hybrid approach:

```yaml
BETA Architecture:
  Supabase (Managed):
    - PostgreSQL with pgvector (vector storage)
    - Authentication & JWT
    - Row Level Security (RLS)
    - Vault for secrets
    - Realtime subscriptions
    - Storage for files
    
  DigitalOcean (Compute):
    - Redis (caching & sessions)
    - Learning Service
    - PBML Engine
    - Repository Analyzer
    - AI Gateway
    
  Integration Layer:
    - Redis caches Supabase queries
    - pgvector stores embeddings
    - Redis handles hot data
    - Supabase is source of truth
```

## 🔄 Redis + Supabase Hybrid Pattern

### The Problem We're Solving
- Supabase PostgreSQL is great for persistence but has connection limits
- Redis is fast but volatile
- We need both speed AND persistence
- pgvector needs to be in PostgreSQL for similarity search

### The Solution: Smart Hybrid Caching

```typescript
// hybrid-cache.ts
export class HybridCache {
  private redis: Redis;
  private supabase: SupabaseClient;
  
  // Three-layer caching strategy
  async get(key: string): Promise<any> {
    // Layer 1: Memory cache (10ms)
    const memCached = this.memCache.get(key);
    if (memCached) return memCached;
    
    // Layer 2: Redis cache (50ms)
    const redisCached = await this.redis.get(key);
    if (redisCached) {
      this.memCache.set(key, redisCached);
      return JSON.parse(redisCached);
    }
    
    // Layer 3: Supabase (200ms)
    const { data } = await this.supabase
      .from('cache_data')
      .select('*')
      .eq('key', key)
      .single();
    
    if (data) {
      // Populate both caches
      await this.redis.setex(key, 3600, JSON.stringify(data.value));
      this.memCache.set(key, data.value);
      return data.value;
    }
    
    return null;
  }
  
  // Write-through caching
  async set(key: string, value: any, ttl = 3600): Promise<void> {
    // Write to all layers
    await Promise.all([
      // Supabase (persistent)
      this.supabase.from('cache_data').upsert({
        key,
        value,
        expires_at: new Date(Date.now() + ttl * 1000)
      }),
      
      // Redis (fast)
      this.redis.setex(key, ttl, JSON.stringify(value)),
      
      // Memory (immediate)
      this.memCache.set(key, value, ttl * 1000)
    ]);
  }
}
```

## 🎯 Vector Storage: pgvector + Redis

### Why We Need Both

```yaml
pgvector (in Supabase):
  Purpose: Similarity search, embeddings
  Use Cases:
    - Pattern matching in PBML
    - Code similarity search
    - Learning content recommendations
    - Semantic search
  
Redis (on DigitalOcean):
  Purpose: Fast lookups, hot vectors
  Use Cases:
    - Recently accessed patterns
    - Active learning sessions
    - Frequently searched vectors
    - Real-time recommendations
```

### Vector Hybrid Implementation

```typescript
// vector-hybrid.ts
export class VectorHybridStore {
  private redis: Redis;
  private supabase: SupabaseClient;
  
  async storeVector(
    id: string,
    vector: number[],
    metadata: any
  ): Promise<void> {
    // Store in pgvector for similarity search
    await this.supabase.from('vectors').insert({
      id,
      embedding: vector,
      metadata,
      created_at: new Date()
    });
    
    // Cache in Redis if frequently accessed
    if (metadata.access_frequency > 10) {
      await this.redis.zadd(
        'hot_vectors',
        Date.now(),
        JSON.stringify({ id, vector, metadata })
      );
      
      // Keep only top 1000 hot vectors
      await this.redis.zremrangebyrank('hot_vectors', 0, -1001);
    }
  }
  
  async searchSimilar(
    queryVector: number[],
    limit = 10
  ): Promise<any[]> {
    // Check Redis for cached similar vectors
    const cacheKey = `similar:${this.hashVector(queryVector)}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    
    // Search in pgvector
    const { data } = await this.supabase.rpc('match_vectors', {
      query_embedding: queryVector,
      match_count: limit,
      match_threshold: 0.8
    });
    
    // Cache results
    await this.redis.setex(cacheKey, 300, JSON.stringify(data));
    
    return data;
  }
  
  private hashVector(vector: number[]): string {
    // Simple hash for cache key
    return vector.slice(0, 5).join(',');
  }
}
```

## 🔐 Secrets Management with Supabase Vault

### Vault Configuration

```sql
-- Enable Vault in Supabase
CREATE EXTENSION IF NOT EXISTS vault;

-- Create secrets table with encryption
CREATE TABLE vault.secrets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL,
  secret text NOT NULL,
  description text,
  service text,
  rotation_period interval DEFAULT '90 days',
  last_rotated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Store secrets
SELECT vault.create_secret('OPENAI_API_KEY', 'sk-...');
SELECT vault.create_secret('REDIS_PASSWORD', 'your-redis-password');
SELECT vault.create_secret('GITHUB_APP_PRIVATE_KEY', '-----BEGIN RSA...');

-- Retrieve secrets (only in backend)
SELECT vault.reveal_secret('OPENAI_API_KEY');
```

### Accessing Secrets from Services

```typescript
// secrets-manager.ts
export class SecretsManager {
  private supabase: SupabaseClient;
  private cache = new Map<string, string>();
  
  async getSecret(name: string): Promise<string> {
    // Check memory cache first
    if (this.cache.has(name)) {
      return this.cache.get(name)!;
    }
    
    // Fetch from Supabase Vault
    const { data, error } = await this.supabase
      .rpc('reveal_secret', { secret_name: name });
    
    if (error) {
      throw new Error(`Failed to retrieve secret: ${name}`);
    }
    
    // Cache for 5 minutes
    this.cache.set(name, data);
    setTimeout(() => this.cache.delete(name), 5 * 60 * 1000);
    
    return data;
  }
  
  async rotateSecret(name: string): Promise<void> {
    // Generate new secret
    const newSecret = this.generateSecret();
    
    // Update in Vault
    await this.supabase.rpc('rotate_secret', {
      secret_name: name,
      new_value: newSecret
    });
    
    // Clear cache
    this.cache.delete(name);
    
    // Notify services
    await this.notifyServicesOfRotation(name);
  }
}
```

## 📊 Redis Configuration for BETA

### Redis Setup on DigitalOcean

```yaml
# docker-compose.redis.yml
version: '3.8'

services:
  redis:
    image: redis:7-alpine
    command: >
      redis-server
      --requirepass ${REDIS_PASSWORD}
      --maxmemory 2gb
      --maxmemory-policy allkeys-lru
      --save 60 1
      --save 300 10
      --save 900 100
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    environment:
      - REDIS_PASSWORD=${REDIS_PASSWORD}
    restart: unless-stopped
    
  redis-commander:
    image: rediscommander/redis-commander:latest
    environment:
      - REDIS_HOSTS=local:redis:6379:0:${REDIS_PASSWORD}
    ports:
      - "8081:8081"
    depends_on:
      - redis

volumes:
  redis-data:
```

### Redis Connection from Services

```typescript
// redis-config.ts
import Redis from 'ioredis';
import { SecretsManager } from './secrets-manager';

export async function createRedisClient(): Promise<Redis> {
  const secrets = new SecretsManager();
  const password = await secrets.getSecret('REDIS_PASSWORD');
  const host = process.env.REDIS_HOST || 'redis.devmentor.internal';
  
  const redis = new Redis({
    host,
    port: 6379,
    password,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    reconnectOnError: (err) => {
      const targetError = 'READONLY';
      if (err.message.includes(targetError)) {
        return true; // Reconnect on READONLY error
      }
      return false;
    },
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: false
  });
  
  redis.on('error', (err) => {
    console.error('Redis Client Error', err);
  });
  
  redis.on('connect', () => {
    console.log('Redis Client Connected');
  });
  
  return redis;
}
```

## 🔄 Session Management: Redis + Supabase

```typescript
// session-manager.ts
export class SessionManager {
  private redis: Redis;
  private supabase: SupabaseClient;
  
  async createSession(userId: string, data: any): Promise<string> {
    const sessionId = crypto.randomUUID();
    const session = {
      id: sessionId,
      userId,
      data,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };
    
    // Store in Redis for fast access
    await this.redis.setex(
      `session:${sessionId}`,
      86400, // 24 hours in seconds
      JSON.stringify(session)
    );
    
    // Backup to Supabase for persistence
    await this.supabase.from('sessions').insert(session);
    
    return sessionId;
  }
  
  async getSession(sessionId: string): Promise<any> {
    // Try Redis first
    const cached = await this.redis.get(`session:${sessionId}`);
    if (cached) return JSON.parse(cached);
    
    // Fallback to Supabase
    const { data } = await this.supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();
    
    if (data) {
      // Repopulate Redis
      await this.redis.setex(
        `session:${sessionId}`,
        86400,
        JSON.stringify(data)
      );
    }
    
    return data;
  }
  
  async invalidateSession(sessionId: string): Promise<void> {
    // Remove from both stores
    await Promise.all([
      this.redis.del(`session:${sessionId}`),
      this.supabase
        .from('sessions')
        .delete()
        .eq('id', sessionId)
    ]);
  }
}
```

## 📈 BETA Monitoring Stack

### What to Monitor

```yaml
Supabase Metrics:
  - Database connections (< 100)
  - Storage usage (< 1GB for free tier)
  - Auth MAU (Monthly Active Users)
  - Realtime concurrent connections
  - pgvector query performance
  
Redis Metrics:
  - Memory usage (< 2GB)
  - Hit rate (target > 80%)
  - Eviction rate
  - Connection count
  - Command latency
  
Service Metrics:
  - Request rate
  - Error rate (< 0.5%)
  - P95 latency (< 400ms)
  - CPU usage (< 70%)
  - Memory usage (< 80%)
```

### Monitoring Implementation

```typescript
// monitoring.ts
export class BetaMonitoring {
  async collectMetrics(): Promise<Metrics> {
    const [supabase, redis, services] = await Promise.all([
      this.getSupabaseMetrics(),
      this.getRedisMetrics(),
      this.getServiceMetrics()
    ]);
    
    return {
      timestamp: new Date(),
      supabase,
      redis,
      services,
      alerts: this.checkAlerts({ supabase, redis, services })
    };
  }
  
  private async getRedisMetrics(): Promise<RedisMetrics> {
    const info = await this.redis.info();
    const stats = this.parseRedisInfo(info);
    
    return {
      memory_used: stats.used_memory,
      memory_max: stats.maxmemory,
      hit_rate: stats.keyspace_hits / (stats.keyspace_hits + stats.keyspace_misses),
      connected_clients: stats.connected_clients,
      evicted_keys: stats.evicted_keys,
      ops_per_sec: stats.instantaneous_ops_per_sec
    };
  }
  
  private checkAlerts(metrics: any): Alert[] {
    const alerts: Alert[] = [];
    
    // Redis memory alert
    if (metrics.redis.memory_used / metrics.redis.memory_max > 0.9) {
      alerts.push({
        severity: 'warning',
        message: 'Redis memory usage above 90%',
        action: 'Consider increasing memory or optimizing cache'
      });
    }
    
    // Hit rate alert
    if (metrics.redis.hit_rate < 0.7) {
      alerts.push({
        severity: 'info',
        message: 'Redis hit rate below 70%',
        action: 'Review caching strategy'
      });
    }
    
    return alerts;
  }
}
```

## 💰 BETA Cost Breakdown

```yaml
Monthly Costs (BETA):
  Supabase Pro: $25
    - 8GB database
    - 100GB storage
    - 100GB bandwidth
    - No connection limits
    
  DigitalOcean: $48
    - Redis Droplet: $12 (2GB RAM)
    - Services Droplet: $24 (4GB RAM)
    - Load Balancer: $12
    
  Vercel: $0-20
    - Frontend hosting
    - Admin dashboard
    
  GitHub Pages: FREE
    - Documentation hosting
    
  Cloudflare: FREE
    - DNS management
    - Basic CDN
    
Total: ~$93-113/month for BETA
```

## 🚀 BETA Launch Checklist

```yaml
Pre-Launch:
  - [ ] Supabase Pro subscription
  - [ ] Redis deployed on DO
  - [ ] Vault secrets configured
  - [ ] pgvector indexes created
  - [ ] RLS policies enabled
  - [ ] Monitoring dashboards ready
  - [ ] Load testing completed
  - [ ] Backup strategy tested
  
Launch Day:
  - [ ] DNS configured
  - [ ] SSL certificates active
  - [ ] Health checks passing
  - [ ] Monitoring alerts configured
  - [ ] Support channels ready
  
Post-Launch:
  - [ ] Monitor Redis hit rates
  - [ ] Check Supabase connection pool
  - [ ] Review pgvector query performance
  - [ ] Analyze user behavior
  - [ ] Gather feedback
```

## Summary

The BETA architecture leverages:
- **Supabase** for persistent data, auth, and vectors
- **Redis** for fast caching and sessions
- **Hybrid approach** for optimal performance
- **Vault** for secure secrets management
- **Smart caching** between Redis and Supabase
- **pgvector** for AI/ML similarity searches

This gives us enterprise-grade performance at startup costs (~$93/month)!

---

**Status**: BETA Architecture Ready
**Next**: Create the missing runbooks for SLO monitoring, DB optimization, and caching patterns
{% endraw %}
