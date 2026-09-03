---
name: django-production-standard
description: >-
  Django and Django REST Framework production standards: ORM optimization, select_related, secure settings, and celery tasks.
---

# Django Production Standard Skill

## Core Principles
- **N+1 Prevention**: Always use `select_related` and `prefetch_related` in QuerySets.
- **Background Jobs**: Offload emails, webhooks, and heavy tasks to Celery with Redis/RabbitMQ.
- **Security Hardening**: Enforce SSL redirect, secure cookies, and strict ALLOWED_HOSTS.
