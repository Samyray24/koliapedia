---
name: kubernetes-k8s-deployments
description: >-
  Kubernetes cloud deployments: Pods, Deployments, Services, Ingress, Helm charts, and rolling updates.
---

# Kubernetes (K8s) Deployments Skill

## Core Principles
- **Resource Limits**: Set explicit CPU/memory `requests` and `limits` on every container.
- **Probes**: Implement distinct `livenessProbe` and `readinessProbe` endpoints.
- **Zero-Downtime Rollouts**: Configure rolling update strategies with `maxSurge` and `maxUnavailable`.
