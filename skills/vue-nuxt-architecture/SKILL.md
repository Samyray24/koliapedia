---
name: vue-nuxt-architecture
description: >-
  Vue 3 Composition API and Nuxt 3 fullstack SSR standard, Pinia store design, and auto-imported composables.
---

# Vue 3 & Nuxt 3 Architecture Skill

## Core Principles
- **Composition API with <script setup>**: Keep script blocks concise with typed `defineProps` and `defineEmits`.
- **Pinia State**: Keep stores modular with setup store syntax (`defineStore('id', () => { ... })`).
- **Nuxt 3 SSR & Hydration**: Guard browser-only APIs using `import.meta.client` or `<ClientOnly>`.
- **Composables**: Name reusable stateful logic with `use...` and return reactive refs.
