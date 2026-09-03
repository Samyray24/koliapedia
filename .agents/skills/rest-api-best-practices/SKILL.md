---
name: rest-api-best-practices
description: >-
  RESTful API standard: HTTP status codes, idempotency keys, RFC 7807 problem details, and semantic versioning.
---

# REST API Best Practices Skill

## Core Principles
- **Semantic Status Codes**: Use 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 409 Conflict.
- **Idempotency**: Support `Idempotency-Key` headers for critical POST requests (payments, creations).
- **Standard Errors**: Structure errors with RFC 7807 (type, title, status, detail, instance).
