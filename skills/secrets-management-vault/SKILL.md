---
name: secrets-management-vault
description: >-
  Secrets management: HashiCorp Vault, cloud secret managers, environment isolation, and automated key rotation.
---

# Secrets Management & Vault Skill

## Core Principles
- **Zero Secrets in Code**: Never commit passwords, API keys, or private certificates into version control.
- **Automated Rotation**: Configure 90-day automatic key and database credential rotation.
- **Ephemeral Credentials**: Use IAM roles and STS tokens instead of static access keys whenever possible.
