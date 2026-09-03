---
name: graphql-api-design
description: >-
  GraphQL API architecture: Apollo Server, schema stitching, DataLoader N+1 prevention, and subscriptions.
---

# GraphQL API Design Skill

## Core Principles
- **DataLoader Pattern**: Batch and cache database reads to resolve the GraphQL N+1 problem.
- **Schema-First Design**: Define clear scalar types, interfaces, and strict non-null fields.
- **Cost Analysis**: Protect endpoints against denial-of-service via query depth and complexity limits.
