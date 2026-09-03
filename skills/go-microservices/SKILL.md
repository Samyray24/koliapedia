---
name: go-microservices
description: >-
  Go microservice development: goroutines, channels, context cancellation, gRPC, and structured logging.
---

# Go Microservices Skill

## Core Principles
- **Context Everywhere**: Pass `context.Context` to all network and database calls for timeout/cancellation.
- **Explicit Error Handling**: Check and wrap errors with context; never swallow errors silently.
- **Concurrency Safety**: Protect shared memory with mutexes or coordinate via typed channels.
