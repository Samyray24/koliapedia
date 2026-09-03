---
name: websocket-realtime-engine
description: >-
  WebSocket realtime architecture: Socket.io, ws protocol, pub/sub rooms, heartbeat ping/pong, and reconnection.
---

# WebSocket Realtime Engine Skill

## Core Principles
- **Heartbeat Monitoring**: Implement ping/pong frames every 30s to terminate dead connections immediately.
- **Room Pub/Sub**: Distribute events horizontally across nodes using Redis adapter.
- **State Reconciliation**: Replay missed events via sequence numbers upon client reconnection.
