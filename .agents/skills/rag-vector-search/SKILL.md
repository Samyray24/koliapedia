---
name: rag-vector-search
description: >-
  Retrieval-Augmented Generation (RAG): chunking strategies, text embeddings, vector databases, and re-ranking.
---

# Retrieval-Augmented Generation (RAG) Skill

## Core Principles
- **Chunking with Overlap**: Chunk documents into 300-500 token segments with 50-token semantic overlap.
- **Hybrid Retrieval**: Combine dense vector similarity (cosine) with sparse BM25 keyword search.
- **Re-Ranking**: Re-score top 20 retrieved candidates using a cross-encoder model before feeding to LLM context.
