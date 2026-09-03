---
name: canvas-webgl-graphics
description: >-
  High-performance 2D Canvas rendering, 60fps game loops, WebGL shaders, particle systems, and memory pooling.
---

# Canvas & WebGL High-Performance Graphics Skill

## Core Principles
- **Object Pooling**: Pre-allocate particle and entity arrays to prevent garbage collection hiccups during render loops.
- **Delta Time Synchronization**: Calculate physics using delta time (`dt`) rather than fixed frame rates.
- **Offscreen Canvas**: Pre-render static sprite sheets and complex backgrounds to offscreen canvases.
