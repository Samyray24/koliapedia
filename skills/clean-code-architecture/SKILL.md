---
name: clean-code-architecture
description: >-
  Standard for modern software architecture, clean code principles, strict TypeScript typing,
  modular separation of concerns, zero legacy bloat, and maintainable codebase structure.
  Use when writing new modules, refactoring existing features, or architecting application flows.
---

# Clean Code & Modern Architecture Skill

This skill enforces high-quality software engineering practices, avoiding anti-patterns, spaghetti code, and technical debt.

---

## 1. Core Architectural Pillars
- **Zero Legacy & Modern Stack First**:
  - Always utilize modern language capabilities (ES2023+, React 19 hooks, Tailwind CSS v4, modern C# 8+).
  - Never retain deprecated configuration files, unused imports, or zombie code.
- **Strict Typing (TypeScript)**:
  - Enable `verbatimModuleSyntax` and `noUnusedLocals`.
  - Use `import type { ... }` for type-only imports.
  - Avoid `any`. Use strict discriminated unions, interfaces, and generic constraints.
- **Single Responsibility Principle**:
  - Components should only handle their own presentation or local state.
  - Business logic, sound engines, and mock/static data must be cleanly isolated into `src/utils/` and `src/data/`.

---

## 2. React 19 State & Effect Discipline
- **Derive During Render**:
  - Never call `setState()` synchronously inside `useEffect` during component initialization. Compute derived state directly during render or use pure initial state callbacks `useState(() => initValue())`.
- **Ref Hygiene**:
  - Never mutate or read React refs directly in render expressions. Refs are exclusively for side effects and animation loops.
- **Resource Cleanup**:
  - Every `setInterval`, `requestAnimationFrame`, and event listener in `useEffect` must return an explicit cleanup teardown.

---

## 3. Directory Layout Standard
```text
src/
├── components/     # UI presentation components
│   └── [feature]/  # Sub-components grouped by domain
├── data/           # Pure data sources and typings
├── hooks/          # Custom reusable React hooks
├── utils/          # Business logic, engines, helpers
├── App.tsx         # Top-level shell and routing
└── main.tsx        # Mount point
```
