---
name: redis-caching-queues
description: >-
  Redis in-memory caching and messaging: cache-aside, write-through, TTL expiration, BullMQ, and pub/sub.
---

# Redis Caching & Queue Engineering Skill

## Core Principles
- **Cache-Aside Pattern**: Read from cache first; on miss, query database, store in Redis with TTL, and return.
- **TTL Mandatory**: Always specify TTL on cache keys to prevent memory saturation.
- **Atomic Operations**: Use Lua scripts or Redis transactions (`MULTI`/`EXEC`) for concurrent state changes.
