---
name: turborepo-monorepo
description: >-
  Turborepo high-speed monorepo management: pipeline caching, workspace packages, and remote cache orchestration.
---

# Turborepo Monorepo Mastery Skill

## Core Principles
- **Pipeline Task Graph**: Declare task dependencies in `turbo.json` with strict input/output caching hashes.
- **Internal Packages**: Share UI components and TypeScript configs across apps as direct workspace packages (`workspace:*`).
- **Remote Caching**: Accelerate CI builds by sharing build artifacts across machines via remote caches.
