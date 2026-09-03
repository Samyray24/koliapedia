---
name: gitlab-ci-pipelines
description: >-
  GitLab CI/CD pipeline design: stages, artifacts, caching, Docker-in-Docker, and environment variables.
---

# GitLab CI Pipelines Skill

## Core Principles
- **Stage Ordering**: Separate pipelines cleanly: `lint` -> `test` -> `build` -> `deploy`.
- **Artifact Passing**: Pass compiled artifacts forward across stages with explicit expiration times.
- **Rules Over Only**: Use modern `rules:` blocks with branch and variable conditions.
