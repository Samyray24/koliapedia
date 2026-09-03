---
name: prisma-orm-patterns
description: >-
  Prisma ORM schema modeling: relation design, migration workflows, connection pooling, and typed extensions.
---

# Prisma ORM Patterns Skill

## Core Principles
- **Relation Discipline**: Declare explicit onDelete actions (Cascade, SetNull, Restrict) on all foreign keys.
- **Query Selection**: Use `select` to fetch only needed fields, avoiding over-fetching on large schemas.
- **Accelerate & Pulse**: Use connection pooling proxies when connecting from serverless lambdas.
