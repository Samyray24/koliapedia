---
name: terraform-infrastructure-as-code
description: >-
  Terraform IaC standards: HCL formatting, remote state with S3/DynamoDB locks, modular design, and plans.
---

# Terraform Infrastructure as Code Skill

## Core Principles
- **Remote State Locking**: Store state in remote buckets with state locking enabled.
- **Modular Design**: Group reusable resources into versioned modules with strict input/output variables.
- **Plan Verification**: Always review `terraform plan` before applying changes in production.
