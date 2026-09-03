---
name: mysql-performance-tuning
description: >-
  MySQL and MariaDB performance optimization: InnoDB buffer pool, slow query analysis, and indexing strategies.
---

# MySQL Performance Tuning Skill

## Core Principles
- **InnoDB Buffer Pool**: Allocate 70-80% of available server RAM to `innodb_buffer_pool_size`.
- **Covering Indexes**: Structure indexes so queries read entirely from the index tree without table lookups.
- **Transactions**: Keep transaction durations short to minimize row locking and deadlock frequency.
