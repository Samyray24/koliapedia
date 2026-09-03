---
name: nextjs-app-router
description: >-
  Next.js 15 App Router architecture: React Server Components (RSC), Streaming, Route Handlers, and Server Actions.
---

# Next.js App Router Architecture Skill

## Core Principles
- **Server Components by Default**: Fetch data directly in async React Server Components; mark client boundary with `'use client'` only for hooks/events.
- **Streaming with Suspense**: Wrap slow queries with Suspense boundaries and skeleton fallbacks for instant perceived loading.
- **Server Actions**: Mutate server state securely via `'use server'` with revalidation using `revalidatePath` and `revalidateTag`.
