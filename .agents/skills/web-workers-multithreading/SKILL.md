---
name: web-workers-multithreading
description: >-
  Browser multithreading: Web Workers, SharedArrayBuffer, Comlink RPC, and offloading heavy computations from UI thread.
---

# Web Workers Multithreading Skill

## Core Principles
- **Main Thread Isolation**: Never block the 60fps UI thread; delegate heavy math, parsing, and physics to background workers.
- **Comlink RPC**: Wrap worker communication with Comlink to call worker functions transparently as async promises.
- **Transferable Objects**: Transfer `ArrayBuffer` ownership instead of copying large binary payloads.
