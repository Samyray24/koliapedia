---
name: godot-game-engine
description: >-
  Godot 4 game engine development: GDScript, scene trees, node architecture, signals, and physics bodies.
---

# Godot 4 Game Engine Skill

## Core Principles
- **Scene Tree Hierarchy**: Favor composition of reusable scenes over deep inheritance hierarchies.
- **Signal Decoupling**: Connect signals upward to parent controllers; invoke methods downward.
- **Physics Tick**: Implement character movement inside `_physics_process(delta)` using `move_and_slide()`.
