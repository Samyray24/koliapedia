---
name: nodejs-backend-architecture
description: >-
  Node.js enterprise backend standard: asynchronous streams, clustering, event loop health, and structured logging.
---

# Node.js Backend Architecture Skill

## Core Principles
- **Event Loop Health**: Never execute CPU-heavy sync computations on the main loop; use worker threads.
- **Stream Processing**: Pipe large files and payloads with streams to avoid memory exhaustion.
- **Graceful Shutdown**: Intercept SIGTERM and SIGINT to close database connections and finish pending requests.
