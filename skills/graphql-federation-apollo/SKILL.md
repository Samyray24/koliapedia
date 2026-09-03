---
name: graphql-federation-apollo
description: >-
  Distributed GraphQL federation: Apollo Federation v2, subgraph composition, router gateway, and entity resolvers.
---

# Apollo GraphQL Federation Skill

## Core Principles
- **Subgraph Separation**: Decompose monoliths into autonomous subgraphs owning their domain entities.
- **Key Directives**: Use `@key(fields: "id")` to allow federated entity extension across services.
- **Rover Composition**: Validate federated schema compatibility in CI using the Rover CLI.
