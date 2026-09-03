---
name: state-machine-game-logic
description: >-
  Game state management: finite state machines (FSM), behavior trees, input buffering, and transition guards.
---

# Game State Machines & AI Logic Skill

## Core Principles
- **Finite State Machines**: Model character states (Idle, Run, Jump, Fall, Attack) with strict entry/exit callbacks.
- **Input Buffering**: Buffer player jump and attack inputs for 100-150ms before landing for responsive gameplay.
- **Game Phases**: Keep global states (Menu, Playing, Paused, GameOver) decoupled from in-game entity states.
