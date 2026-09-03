---
name: test-driven-development
description: >-
  Standard and procedures for testing, linting, build verification, and regression prevention in modern web and desktop apps.
  Use when validating features, verifying zero-defect builds, running linters (oxlint, eslint), or writing test suites.
---

# Test-Driven Development & Quality Assurance Skill

This skill enforces strict verification pipelines: zero warnings, zero errors, fast feedback, and continuous stability.

---

## 1. Automated Verification Pipeline
Every feature addition or refactor must pass through this 3-tier validation:
1. **Linter Gate**:
   - Run ultra-fast linter (e.g. `oxlint`): Must report **0 errors, 0 warnings**.
   - Ensure zero unused variables, unused imports, or incorrect hooks.
2. **Type-Check & Bundler Gate**:
   - Run `tsc -b && vite build`: Verify production bundle generates without type errors.
   - Inspect build size and ensure chunks are within reasonable boundaries.
3. **Runtime & HMR Health**:
   - Verify dev server logs have no uncaught runtime exceptions or broken HMR reloads.

---

## 2. Interactive QA Checklist
- **Keyboard Navigation**: Verify all keyboard shortcuts (numbers, navigation keys, Escape, Enter) function properly.
- **Audio Synthesis**: Test that Web Audio API sounds work on first click without audio context lockup.
- **Storage Persistence**: Confirm `localStorage` keys save and restore state properly across reloads.
- **Responsiveness**: Verify layout at 375px (mobile portrait), 768px (tablet), and 1440px+ (desktop widescreen).
