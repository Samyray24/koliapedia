---
name: unity-csharp-architecture
description: >-
  Unity and C# game programming: ScriptableObjects, Component design patterns, object pooling, and performance profiling.
---

# Unity & C# Architecture Skill

## Core Principles
- **ScriptableObjects**: Store game configurations, weapon stats, and shared event channels in ScriptableObjects.
- **Avoid GC in Update**: Never allocate new objects, strings, or LINQ queries inside `Update()`.
- **Object Pooling**: Pre-instantiate bullets, particles, and enemies to eliminate runtime instantiate/destroy spikes.
