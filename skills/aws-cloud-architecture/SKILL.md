---
name: aws-cloud-architecture
description: >-
  Amazon Web Services cloud design: S3, Lambda serverless, CloudFront CDN, ECS Fargate, and IAM least privilege.
---

# AWS Cloud Architecture Skill

## Core Principles
- **Least Privilege IAM**: Restrict IAM policies to the minimal required actions and resource ARNs.
- **Edge Distribution**: Place CloudFront CDN in front of S3 buckets and API endpoints.
- **Serverless Scaling**: Design Lambda functions with lightweight packages for fast cold starts.
