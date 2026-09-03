---
name: game-loop-math-physics
description: >-
  Game engine fundamentals: fixed timestep updates, Euler/Verlet integration, AABB collision detection, and 2D vectors.
---

# Game Loop & Physics Mathematics Skill

## Core Principles
- **Fixed Timestep**: Separate variable render frame rate from fixed physics updates (e.g. 60Hz accumulator loop).
- **AABB Collision**: Implement fast axis-aligned bounding box checks before calculating expensive pixel-perfect collisions.
- **Vector Operations**: Use standardized Vector2 math (normalize, dot product, magnitude, lerp).
