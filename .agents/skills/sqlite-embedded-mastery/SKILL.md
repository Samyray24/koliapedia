---
name: sqlite-embedded-mastery
description: >-
  SQLite embedded database mastery: WAL mode, PRAGMA optimizations, full-text search (FTS5), and concurrency.
---

# SQLite Embedded Mastery Skill

## Core Principles
- **WAL Mode**: Always execute `PRAGMA journal_mode = WAL;` for concurrent readers alongside writers.
- **Performance Pragmas**: Configure `PRAGMA synchronous = NORMAL;` and `PRAGMA cache_size = -64000;`.
- **Transactions**: Wrap batch insertions inside explicit `BEGIN TRANSACTION` blocks.
