---
layout: product
title: README
product: DevMentor
source: infrastructure/services/redis/README.md
---

{% raw %}
CURRENT ARCHITECTURE

# Redis Documentation

## Overview
This directory contains comprehensive documentation about Redis usage in DevMentor.

## Key Documents

### 1. [Redis Patterns Reference](./REDIS_PATTERNS_REFERENCE.md)
- Complete guide to all Redis patterns used in DevMentor
- Code examples for each pattern
- Implementation status
- Common interview questions

### 2. [Redis Beta Readiness](./REDIS_BETA_READINESS.md)
- Current state of Redis integration
- Architecture overview
- Risk assessment
- Action items before beta

## Quick Links to Common Redis Patterns

### Currently Implemented
1. [Caching](./REDIS_PATTERNS_REFERENCE.md#1-cache-database-queries-✅-in-use)
2. [Message Queue](./REDIS_PATTERNS_REFERENCE.md#2-message-queue-✅-in-use---project-events)
3. [Distributed Locking](./REDIS_PATTERNS_REFERENCE.md#3-distributed-locking-✅-in-use)
4. [Request Throttling](./REDIS_PATTERNS_REFERENCE.md#4-request-throttling-✅-in-use)
5. [Session Store](./REDIS_PATTERNS_REFERENCE.md#5-session-store-✅-in-use)
6. [Rate Limiting](./REDIS_PATTERNS_REFERENCE.md#6-rate-limiting-✅-in-use)

### Partially Implemented
- [Real-time Leaderboard](./REDIS_PATTERNS_REFERENCE.md#7-real-time-leaderboard-🔄-partially-implemented)

### Planned Features
- [HyperLogLog Metrics](./REDIS_PATTERNS_REFERENCE.md#8-hyperloglog-for-metrics-⏳-planned)
- [Geospatial](./REDIS_PATTERNS_REFERENCE.md#10-geospatial-⏳-planned)
- [Time Series](./REDIS_PATTERNS_REFERENCE.md#11-time-series-⏳-planned)
- [Full-text Search](./REDIS_PATTERNS_REFERENCE.md#13-full-text-search-⏳-planned)

## Common Interview Topics

1. [Handling Redis Failures](./REDIS_PATTERNS_REFERENCE.md#common-interview-questions)
2. [Preventing Race Conditions](./REDIS_PATTERNS_REFERENCE.md#common-interview-questions)
3. [Handling Hot Keys](./REDIS_PATTERNS_REFERENCE.md#common-interview-questions)

## Key Architecture Diagrams

### Redis in DevMentor
```
┌─────────────────────────────────────────┐
│              Redis Stack                │
├─────────────────────┬───────────────────┤
│   Cache (:6379)     │  Learning (:6380) │
│   - Sessions        │  - Event Streams  │
│   - Rate Limits     │  - Pub/Sub       │
│   - API Cache       │  - Leaderboards   │
└─────────────────────┴───────────────────┘
           ▲                  ▲
           │                  │
    ┌──────┴──────┐    ┌─────┴─────┐
    │  Auth/API   │    │ Learning   │
    │  Services   │    │ Pipeline   │
    └─────────────┘    └───────────┘
```

## Getting Started with Redis Development

1. Run Redis locally:
   ```bash
   docker-compose up redis-cache redis-learning
   ```

2. Access Redis Commander:
   ```bash
   open http://localhost:8081
   ```

3. Check logs:
   ```bash
   docker-compose logs -f redis-cache redis-learning
   ```
{% endraw %}
