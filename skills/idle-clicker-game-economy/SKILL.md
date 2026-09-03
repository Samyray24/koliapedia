---
name: idle-clicker-game-economy
description: >-
  Incremental and idle clicker game mathematics: exponential cost formulas, prestige multipliers, and offline progression.
---

# Idle & Clicker Game Economy Skill

## Core Principles
- **Cost Scaling**: Calculate upgrade cost with `baseCost * (multiplier ^ count)` where multiplier is typically 1.15 - 1.35.
- **Offline Earnings**: Cap offline progression rewards to 8-24 hours with soft decay.
- **Prestige Multipliers**: Provide a reset mechanism that grants permanent percentage boosts to sustain long-term engagement.
