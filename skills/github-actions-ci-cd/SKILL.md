---
name: github-actions-ci-cd
description: >-
  GitHub Actions automation: matrix testing, caching strategies, automated semantic releases, and environments.
---

# GitHub Actions CI/CD Mastery Skill

## Core Principles
- **Action Pinning**: Pin third-party actions to full commit SHAs for supply-chain security.
- **Dependency Caching**: Cache `~/.npm` or `~/.cargo` using `actions/cache` to slash pipeline durations.
- **Artifact Upload**: Preserve build outputs and binaries with `actions/upload-artifact`.
