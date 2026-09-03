---
name: grpc-protocol-buffers
description: >-
  gRPC and Protocol Buffers communication: binary serialization, HTTP/2 streaming, proto3 schemas, and code generation.
---

# gRPC & Protocol Buffers Skill

## Core Principles
- **Backward Compatibility**: Never change existing proto field numbers; use reserved fields for deprecations.
- **Streaming Patterns**: Leverage client, server, and bidirectional streaming for high-throughput pipelines.
- **Interceptors**: Implement authentication, tracing, and metric collection as gRPC interceptors.
