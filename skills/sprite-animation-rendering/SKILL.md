---
name: sprite-animation-rendering
description: >-
  2D sprite animation: texture atlases, frame interpolation, particle emitters, and multi-layer parallax scrolling.
---

# Sprite Animation & Parallax Rendering Skill

## Core Principles
- **Texture Atlases**: Combine individual animation frames into a single spritesheet to minimize draw calls.
- **Parallax Layers**: Move background layers at proportional fractions of the player velocity (0.2x, 0.5x, 1.0x).
- **Frame Timing**: Calculate current frame index using accumulated elapsed time rather than frame counts.
