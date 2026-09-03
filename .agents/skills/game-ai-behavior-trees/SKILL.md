---
name: game-ai-behavior-trees
description: >-
  Game AI architecture: Behavior Trees, Selector and Sequence nodes, Blackboards, and Decorator guards.
---

# Game AI Behavior Trees Skill

## Core Principles
- **Composite Nodes**: Use Selectors (fallback until SUCCESS) and Sequences (step-by-step until FAILURE) to compose decision logic.
- **Blackboard State**: Store shared environmental knowledge (target position, alert level, health) in a centralized Blackboard.
- **Decorator Guards**: Gate node execution with preconditions (cooldown timers, distance checks, line-of-sight).
