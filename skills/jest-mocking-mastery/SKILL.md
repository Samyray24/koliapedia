---
name: jest-mocking-mastery
description: >-
  Jest testing framework: async promises, timer mocking (jest.useFakeTimers), module mocking, and custom matchers.
---

# Jest Mocking Mastery Skill

## Core Principles
- **Fake Timers**: Use `jest.useFakeTimers()` and `jest.advanceTimersByTime()` to test animations and debounced inputs.
- **Module Mocking**: Declare `jest.mock()` before imports to intercept third-party library calls cleanly.
- **Snapshot Hygiene**: Review snapshot diffs manually; avoid blind `-u` updating of broken tests.
