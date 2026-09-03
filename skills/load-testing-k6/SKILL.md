---
name: load-testing-k6
description: >-
  Performance and load testing with k6: virtual users, ramp-up stages, latency SLA thresholds, and metric collection.
---

# k6 Load Testing & Stress Verification Skill

## Core Principles
- **Ramp-Up Stages**: Configure realistic traffic profiles: ramp-up, steady state load, spike test, and ramp-down.
- **Thresholds as Pass/Fail**: Enforce SLAs via thresholds (e.g. `http_req_duration: ['p(95)<200']`).
- **Realistic Delays**: Introduce random sleep intervals between virtual user actions to simulate authentic traffic.
