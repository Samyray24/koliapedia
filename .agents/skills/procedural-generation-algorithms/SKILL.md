---
name: procedural-generation-algorithms
description: >-
  Procedural generation algorithms: Perlin and Simplex noise, cellular automata cave systems, and random seed generators.
---

# Procedural Content Generation Skill

## Core Principles
- **Seeded Randomness**: Use PRNG algorithms (xorshift128+, PCG) so levels are completely reproducible from a seed.
- **Coherent Noise**: Blend octave layers of Simplex noise for smooth terrain and difficulty curves.
- **Cellular Automata**: Apply 4-5 simulation steps for organic cave and dungeon generation.
