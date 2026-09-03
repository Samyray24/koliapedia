---
name: postgresql-advanced-dba
description: >-
  PostgreSQL database administration: B-Tree, GIN, GiST indexing, EXPLAIN ANALYZE, vacuuming, and partitioning.
---

# PostgreSQL Advanced DBA Skill

## Core Principles
- **Index Precision**: Use partial and composite indexes matching exact WHERE and ORDER BY clauses.
- **Query Plan Auditing**: Inspect `EXPLAIN (ANALYZE, BUFFERS)` to eradicate sequential scans on large tables.
- **Connection Pooling**: Always place PgBouncer in front of Postgres to cap connection overhead.
