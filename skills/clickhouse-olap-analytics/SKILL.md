---
name: clickhouse-olap-analytics
description: >-
  ClickHouse column-oriented database mastery: MergeTree engines, vectorized execution, and high-speed aggregation.
---

# ClickHouse OLAP Analytics Skill

## Core Principles
- **MergeTree Primary Keys**: Structure primary keys matching the most common analytical filter and group-by columns.
- **Batch Ingestion**: Insert data in large batches (10,000+ rows) rather than single-row inserts to prevent excessive parts creation.
- **Materialized Views**: Pre-aggregate metrics in real-time via Materialized Views with SummingMergeTree.
