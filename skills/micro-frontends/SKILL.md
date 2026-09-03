---
name: micro-frontends
description: >-
  Micro-frontend architecture using Webpack Module Federation, Vite federation, iframe isolation, and event bus communication.
---

# Micro-Frontends Architecture Skill

## Core Principles
- **Independent Deployability**: Each micro-app must build and deploy without rebuilding the shell.
- **Shared Dependencies**: Deduplicate core frameworks (React, Vue) via singleton federation configurations.
- **Event Bus Contract**: Use strictly typed CustomEvent contracts for inter-app communication.
