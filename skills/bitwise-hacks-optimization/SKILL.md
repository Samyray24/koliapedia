---
name: bitwise-hacks-optimization
description: >-
  Bitwise optimization: bitmasks, flags, power-of-two checks, fast bit counting, and compact state representation.
---

# Bitwise Manipulation & Performance Hacks Skill

## Core Principles
- **Bitmask State**: Pack up to 32/64 boolean flags into a single integer.
- **Power of Two**: Check if `N` is power of two via `(N > 0) && ((N & (N - 1)) === 0)`.
- **Toggle Flags**: Toggle bit at position `i` using `x ^= (1 << i)`.
