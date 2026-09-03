---
name: docker-containerization
description: >-
  Docker container engineering: multi-stage builds, alpine/distroless bases, image optimization, and non-root users.
---

# Docker Containerization Standard Skill

## Core Principles
- **Multi-Stage Builds**: Build in heavyweight SDK images; copy compiled assets into minimal runtime images.
- **Non-Root Execution**: Always declare `USER node` or create an unprivileged user before the entrypoint.
- **Layer Caching**: Copy `package.json` and install dependencies before copying the rest of the source code.
