---
name: static-analysis-linters
description: >-
  Static analysis and code hygiene: Oxlint, ESLint flat config, Prettier formatting, and automated pre-commit hooks.
---

# Static Analysis & Linter Automation Skill

## Core Principles
- **Zero Warnings Policy**: Treat all linter warnings as blocking errors in CI.
- **Fast Lint First**: Run ultra-fast Rust-based linters (`oxlint`) before running heavier typecheck pipelines.
- **Pre-Commit Hooks**: Run lint-staged on staged files to guarantee that unformatted or broken code cannot be committed.
