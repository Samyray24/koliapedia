---
name: react-19-mastery
description: >-
  Specialized guidelines for React 19 architecture: Server Actions, useActionState, useOptimistic, new hooks, and avoiding legacy state anti-patterns.
---

# React 19 Mastery Skill

## Core Principles
- **Use Actions over Manual Loading State**: Leverage `useActionState` to manage pending, data, and error states automatically.
- **Optimistic UI Updates**: Apply `useOptimistic` for instant interface response before server synchronization.
- **Compiler Compatibility**: Never mutate or read refs during render; derive state purely during render.
- **Form Handling**: Utilize native form actions and `useFormStatus` without external form boilerplate.

## Checklist
1. Strict mode compliance without double-invocation bugs.
2. Direct state derivation instead of synchronous `setState` in `useEffect`.
3. Proper cleanup on all subscriptions and timers.
