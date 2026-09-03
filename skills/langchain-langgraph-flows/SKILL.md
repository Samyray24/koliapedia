---
name: langchain-langgraph-flows
description: >-
  Multi-agent systems and LangGraph: cyclical agent flows, tool calling, state checkpoints, and human-in-the-loop.
---

# LangGraph & Multi-Agent Orchestration Skill

## Core Principles
- **Cyclical Graph Architecture**: Model reasoning as explicit state nodes connected by conditional edges.
- **Tool Calling**: Define tools with strict JSON schemas and validate inputs before execution.
- **State Checkpointing**: Persist graph state between turns to allow rollbacks and human approvals.
