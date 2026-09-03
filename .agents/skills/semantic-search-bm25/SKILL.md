---
name: semantic-search-bm25
description: >-
  Hybrid search architecture: combining BM25 keyword matching with dense vector embeddings and Reciprocal Rank Fusion (RRF).
---

# Hybrid Semantic Search & BM25 Skill

## Core Principles
- **Reciprocal Rank Fusion (RRF)**: Normalize and merge ranking scores from vector cosine distance and BM25 text relevance.
- **Chunk Boundary Preservation**: Respect sentence and paragraph boundaries during document tokenization.
- **Filtering Before Search**: Apply hard metadata filters before computing vector similarity to drastically improve latency.
