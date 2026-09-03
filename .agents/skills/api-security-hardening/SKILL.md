---
name: api-security-hardening
description: >-
  API security hardening: Helmet HTTP headers, CORS configurations, rate limiting, and request sanitization.
---

# API Security Hardening Skill

## Core Principles
- **Strict CORS**: Explicitly enumerate allowed origins; never reflect wildcards with credentials enabled.
- **Rate Limiting**: Enforce IP-based and user-based token bucket rate limits on sensitive endpoints.
- **Payload Limits**: Cap maximum JSON request body sizes to 100KB-1MB to prevent memory exhaustion.
