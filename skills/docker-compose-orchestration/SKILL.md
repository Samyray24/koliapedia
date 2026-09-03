---
name: docker-compose-orchestration
description: >-
  Docker Compose orchestration: multi-service local stacks, named volumes, health checks, and network isolation.
---

# Docker Compose Orchestration Skill

## Core Principles
- **Health Checks**: Define `healthcheck` blocks so dependent services only launch when upstream DBs are healthy.
- **Volume Persistence**: Map persistent data to named volumes rather than arbitrary host directories.
- **Environment Isolation**: Load configurations from `.env` files without committing credentials.
