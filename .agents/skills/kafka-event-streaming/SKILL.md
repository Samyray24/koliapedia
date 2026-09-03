---
name: kafka-event-streaming
description: >-
  Event-driven architecture with Apache Kafka: topics, consumer groups, partition keys, compaction, and idempotency.
---

# Apache Kafka Event Streaming Skill

## Core Principles
- **Partition Key Strategy**: Use domain entity IDs (e.g. `order_id`) as partition keys to guarantee strict message ordering.
- **Consumer Group Rebalancing**: Design consumer handlers to process batches within `max.poll.interval.ms` to prevent unwanted rebalancing.
- **Idempotent Producers**: Enable `enable.idempotence=true` to eliminate duplicate messages at the broker level.
