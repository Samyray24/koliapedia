---
name: cloudflare-workers-edge
description: >-
  Cloudflare Workers and Pages: edge compute, KV storage, D1 SQL databases, and cache-control rules.
---

# Cloudflare Workers & Edge Compute Skill

## Core Principles
- **Sub-10ms Cold Starts**: Leverage V8 isolates on the edge for instantaneous response worldwide.
- **KV Storage**: Use Cloudflare KV for high-read, low-write caching and configurations.
- **Wrangler Deployments**: Manage configurations declaratively in `wrangler.jsonc` or `wrangler.toml`.
