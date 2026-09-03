---
name: mongodb-nosql-patterns
description: >-
  MongoDB document database design: aggregation pipelines, embedded vs reference data modeling, and sharding.
---

# MongoDB & NoSQL Patterns Skill

## Core Principles
- **Model for Access**: Embed data that is queried together; reference data that grows unbounded.
- **Aggregation Pipelines**: Place `$match` and `$project` stages as early as possible to reduce pipeline memory.
- **Index Support**: Ensure compound indexes cover sorting and filtering criteria.
