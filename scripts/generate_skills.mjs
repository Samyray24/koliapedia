import fs from 'fs';
import path from 'path';

const skills = [
  // --- FRONTEND & WEB DESIGN (1-10) ---
  {
    name: 'react-19-mastery',
    category: 'Frontend',
    description: 'Specialized guidelines for React 19 architecture: Server Actions, useActionState, useOptimistic, new hooks, and avoiding legacy state anti-patterns.',
    content: `# React 19 Mastery Skill

## Core Principles
- **Use Actions over Manual Loading State**: Leverage \`useActionState\` to manage pending, data, and error states automatically.
- **Optimistic UI Updates**: Apply \`useOptimistic\` for instant interface response before server synchronization.
- **Compiler Compatibility**: Never mutate or read refs during render; derive state purely during render.
- **Form Handling**: Utilize native form actions and \`useFormStatus\` without external form boilerplate.

## Checklist
1. Strict mode compliance without double-invocation bugs.
2. Direct state derivation instead of synchronous \`setState\` in \`useEffect\`.
3. Proper cleanup on all subscriptions and timers.`
  },
  {
    name: 'vue-nuxt-architecture',
    category: 'Frontend',
    description: 'Vue 3 Composition API and Nuxt 3 fullstack SSR standard, Pinia store design, and auto-imported composables.',
    content: `# Vue 3 & Nuxt 3 Architecture Skill

## Core Principles
- **Composition API with <script setup>**: Keep script blocks concise with typed \`defineProps\` and \`defineEmits\`.
- **Pinia State**: Keep stores modular with setup store syntax (\`defineStore('id', () => { ... })\`).
- **Nuxt 3 SSR & Hydration**: Guard browser-only APIs using \`import.meta.client\` or \`<ClientOnly>\`.
- **Composables**: Name reusable stateful logic with \`use...\` and return reactive refs.`
  },
  {
    name: 'svelte-runes-ecosystem',
    category: 'Frontend',
    description: 'Svelte 5 runes architecture ($state, $derived, $effect), SvelteKit routing, and modern reactive component standards.',
    content: `# Svelte 5 Runes Ecosystem Skill

## Core Principles
- **Runes First**: Replace legacy \`let\` and \`$:\` with modern Svelte 5 runes: \`$state()\`, \`$derived()\`, and \`$effect()\`.
- **Granular Reactivity**: Keep mutations localized to individual state objects.
- **SvelteKit Loaders**: Implement \`+page.server.ts\` for secure server-side data fetching and form actions.`
  },
  {
    name: 'tailwind-css-v4',
    category: 'Frontend',
    description: 'Tailwind CSS v4 zero-config CSS-first engine, container queries, custom themes, and modern design tokens.',
    content: `# Tailwind CSS v4 Standard Skill

## Core Principles
- **CSS-First Configuration**: Configure themes via standard \`@theme\` directives in CSS rather than legacy JavaScript config files.
- **Modern Color Palettes**: Utilize OKLCH color spaces for uniform lightness and vibrant gradients.
- **Container Queries**: Use \`@container\` and \`@sm\`, \`@md\` utilities for reusable adaptive widgets independent of viewport width.`
  },
  {
    name: 'framer-motion-animations',
    category: 'Frontend',
    description: 'Fluid physics-based animations, layout transitions, exit presence, and gesture controls using Framer Motion.',
    content: `# Framer Motion & Interactive Animations Skill

## Core Principles
- **Spring Physics**: Favor spring damping and stiffness over linear duration for organic, responsive feel.
- **AnimatePresence**: Ensure unique keys on exiting elements for smooth unmount transitions.
- **Layout Animations**: Use \`layout\` and \`layoutId\` for seamless morphing between views.`
  },
  {
    name: 'canvas-webgl-graphics',
    category: 'Frontend',
    description: 'High-performance 2D Canvas rendering, 60fps game loops, WebGL shaders, particle systems, and memory pooling.',
    content: `# Canvas & WebGL High-Performance Graphics Skill

## Core Principles
- **Object Pooling**: Pre-allocate particle and entity arrays to prevent garbage collection hiccups during render loops.
- **Delta Time Synchronization**: Calculate physics using delta time (\`dt\`) rather than fixed frame rates.
- **Offscreen Canvas**: Pre-render static sprite sheets and complex backgrounds to offscreen canvases.`
  },
  {
    name: 'threejs-3d-scenes',
    category: 'Frontend',
    description: 'Three.js 3D web environments, lighting, GLTF asset loading, shader materials, and camera controls.',
    content: `# Three.js 3D Web Experiences Skill

## Core Principles
- **Asset Optimization**: Compress GLTF/GLB models using Draco and KTX2 texture compression.
- **Render Loop Discipline**: Disable continuous rendering when scene is idle to save mobile battery.
- **Disposal**: Manually call \`.dispose()\` on geometries and textures upon unmount.`
  },
  {
    name: 'accessibility-wcag',
    category: 'Frontend',
    description: 'Web accessibility standards (WCAG 2.2 AA), ARIA roles, focus management, screen reader optimization, and keyboard trapping.',
    content: `# Web Accessibility & WCAG Compliance Skill

## Core Principles
- **Semantic HTML**: Use native buttons, dialogs, and links before creating custom ARIA replacements.
- **Focus Management**: Trap focus within open modals and restore focus to trigger element on close.
- **Contrast**: Ensure text passes 4.5:1 ratio (3:1 for large text). Support \`prefers-reduced-motion\`.`
  },
  {
    name: 'micro-frontends',
    category: 'Frontend',
    description: 'Micro-frontend architecture using Webpack Module Federation, Vite federation, iframe isolation, and event bus communication.',
    content: `# Micro-Frontends Architecture Skill

## Core Principles
- **Independent Deployability**: Each micro-app must build and deploy without rebuilding the shell.
- **Shared Dependencies**: Deduplicate core frameworks (React, Vue) via singleton federation configurations.
- **Event Bus Contract**: Use strictly typed CustomEvent contracts for inter-app communication.`
  },
  {
    name: 'pwa-offline-first',
    category: 'Frontend',
    description: 'Progressive Web App standards, Service Worker caching strategies, CacheStorage, IndexedDB, and install banners.',
    content: `# Progressive Web Apps (PWA) Offline-First Skill

## Core Principles
- **Caching Strategies**: Stale-While-Revalidate for dynamic content, Cache-First for static assets.
- **Manifest Perfection**: Supply 192px and 512px maskable icons, standalone display mode, and theme colors.
- **Background Sync**: Queue offline mutations in IndexedDB and replay when connectivity is restored.`
  },

  // --- BACKEND & APIS (11-20) ---
  {
    name: 'nodejs-backend-architecture',
    category: 'Backend',
    description: 'Node.js enterprise backend standard: asynchronous streams, clustering, event loop health, and structured logging.',
    content: `# Node.js Backend Architecture Skill

## Core Principles
- **Event Loop Health**: Never execute CPU-heavy sync computations on the main loop; use worker threads.
- **Stream Processing**: Pipe large files and payloads with streams to avoid memory exhaustion.
- **Graceful Shutdown**: Intercept SIGTERM and SIGINT to close database connections and finish pending requests.`
  },
  {
    name: 'nest-js-enterprise',
    category: 'Backend',
    description: 'NestJS enterprise architecture: modular dependency injection, guards, interceptors, pipes, and microservices.',
    content: `# NestJS Enterprise Architecture Skill

## Core Principles
- **Modular Boundaries**: Encapsulate controllers and providers in dedicated domain modules.
- **Validation Pipes**: Enforce validation with class-validator and class-transformer globally.
- **Exception Filters**: Normalize API error envelopes across all endpoints.`
  },
  {
    name: 'python-fastapi-expert',
    category: 'Backend',
    description: 'Python FastAPI async API development, Pydantic v2 validation, OpenAPI documentation, and dependency injection.',
    content: `# Python FastAPI Expert Skill

## Core Principles
- **Async Endpoints**: Use \`async def\` for I/O operations and synchronous \`def\` for CPU-bound tasks managed by threadpool.
- **Pydantic v2 Models**: Enforce strict data models with field validations and type annotations.
- **Dependency Injection**: Utilize \`Depends()\` for database sessions, auth, and service clients.`
  },
  {
    name: 'django-production-standard',
    category: 'Backend',
    description: 'Django and Django REST Framework production standards: ORM optimization, select_related, secure settings, and celery tasks.',
    content: `# Django Production Standard Skill

## Core Principles
- **N+1 Prevention**: Always use \`select_related\` and \`prefetch_related\` in QuerySets.
- **Background Jobs**: Offload emails, webhooks, and heavy tasks to Celery with Redis/RabbitMQ.
- **Security Hardening**: Enforce SSL redirect, secure cookies, and strict ALLOWED_HOSTS.`
  },
  {
    name: 'go-microservices',
    category: 'Backend',
    description: 'Go microservice development: goroutines, channels, context cancellation, gRPC, and structured logging.',
    content: `# Go Microservices Skill

## Core Principles
- **Context Everywhere**: Pass \`context.Context\` to all network and database calls for timeout/cancellation.
- **Explicit Error Handling**: Check and wrap errors with context; never swallow errors silently.
- **Concurrency Safety**: Protect shared memory with mutexes or coordinate via typed channels.`
  },
  {
    name: 'rust-systems-programming',
    category: 'Backend',
    description: 'Rust systems and backend programming: ownership rules, Tokio async runtime, Axum web framework, and zero-cost abstractions.',
    content: `# Rust Systems Programming Skill

## Core Principles
- **Borrow Checker Mastery**: Design data structures around explicit ownership and lifetimes.
- **Tokio & Axum**: Build resilient async services with non-blocking I/O and typed extractors.
- **Error Handling**: Use \`Result<T, E>\` with \`thiserror\` and \`anyhow\` for clean error propagation.`
  },
  {
    name: 'graphql-api-design',
    category: 'Backend',
    description: 'GraphQL API architecture: Apollo Server, schema stitching, DataLoader N+1 prevention, and subscriptions.',
    content: `# GraphQL API Design Skill

## Core Principles
- **DataLoader Pattern**: Batch and cache database reads to resolve the GraphQL N+1 problem.
- **Schema-First Design**: Define clear scalar types, interfaces, and strict non-null fields.
- **Cost Analysis**: Protect endpoints against denial-of-service via query depth and complexity limits.`
  },
  {
    name: 'rest-api-best-practices',
    category: 'Backend',
    description: 'RESTful API standard: HTTP status codes, idempotency keys, RFC 7807 problem details, and semantic versioning.',
    content: `# REST API Best Practices Skill

## Core Principles
- **Semantic Status Codes**: Use 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 409 Conflict.
- **Idempotency**: Support \`Idempotency-Key\` headers for critical POST requests (payments, creations).
- **Standard Errors**: Structure errors with RFC 7807 (type, title, status, detail, instance).`
  },
  {
    name: 'websocket-realtime-engine',
    category: 'Backend',
    description: 'WebSocket realtime architecture: Socket.io, ws protocol, pub/sub rooms, heartbeat ping/pong, and reconnection.',
    content: `# WebSocket Realtime Engine Skill

## Core Principles
- **Heartbeat Monitoring**: Implement ping/pong frames every 30s to terminate dead connections immediately.
- **Room Pub/Sub**: Distribute events horizontally across nodes using Redis adapter.
- **State Reconciliation**: Replay missed events via sequence numbers upon client reconnection.`
  },
  {
    name: 'grpc-protocol-buffers',
    category: 'Backend',
    description: 'gRPC and Protocol Buffers communication: binary serialization, HTTP/2 streaming, proto3 schemas, and code generation.',
    content: `# gRPC & Protocol Buffers Skill

## Core Principles
- **Backward Compatibility**: Never change existing proto field numbers; use reserved fields for deprecations.
- **Streaming Patterns**: Leverage client, server, and bidirectional streaming for high-throughput pipelines.
- **Interceptors**: Implement authentication, tracing, and metric collection as gRPC interceptors.`
  },

  // --- DESKTOP & NATIVE (21-28) ---
  {
    name: 'electron-desktop-architect',
    category: 'Desktop',
    description: 'Electron desktop application design: process isolation, contextBridge, secure IPC, native menus, and auto-updater.',
    content: `# Electron Desktop Architect Skill

## Core Principles
- **Zero Node in Renderer**: Always set \`nodeIntegration: false\` and \`contextIsolation: true\`.
- **Typed IPC**: Expose narrow, validated functions via \`contextBridge.exposeInMainWorld\`.
- **Performance**: Delay background window creation and throttle background frame rates.`
  },
  {
    name: 'tauri-crossplatform',
    category: 'Desktop',
    description: 'Tauri 2.0 desktop development: Rust backend, system tray, native file dialogs, and minimal binary size.',
    content: `# Tauri Cross-Platform Desktop Skill

## Core Principles
- **Rust Backend Handlers**: Expose secure commands via \`#[tauri::command]\` with typed serialization.
- **Scope Restriction**: Confine file system access strictly to designated application data directories.
- **Minimal Footprint**: Leverage OS native WebViews to produce sub-10MB desktop binaries.`
  },
  {
    name: 'csharp-dotnet-desktop',
    category: 'Desktop',
    description: 'C# and .NET 8 desktop software: WPF, WinUI 3, Windows Forms, MVVM architecture, and single-file executable publishing.',
    content: `# C# & .NET 8 Desktop Skill

## Core Principles
- **MVVM Separation**: Keep view models independent of UI frameworks using CommunityToolkit.Mvvm.
- **Single File Publishing**: Configure \`PublishSingleFile=true\` and \`SelfContained\` for zero-dependency distribution.
- **Asynchronous UI**: Never block the UI thread; execute background work via \`Task.Run\` and await.`
  },
  {
    name: 'windows-installer-wix',
    category: 'Desktop',
    description: 'Windows packaging and installers: Inno Setup, NSIS, WiX toolset, MSI/EXE packaging, and code signing.',
    content: `# Windows Installer & Packaging Skill

## Core Principles
- **Clean Uninstallation**: Ensure registry entries, shortcuts, and app data are completely purged on uninstall.
- **UAC Elevation**: Request administrator privileges only during installation, running the app itself under standard user tokens.
- **Code Signing**: Sign binaries with Authenticode certificates to bypass Windows SmartScreen warnings.`
  },
  {
    name: 'cross-platform-cli-design',
    category: 'Desktop',
    description: 'CLI tool development: argument parsing, interactive terminal prompts, progress bars, and stdout formatting.',
    content: `# Cross-Platform CLI Tooling Skill

## Core Principles
- **POSIX Flags & Help**: Provide \`--help\` and \`--version\` on all commands.
- **Machine vs Human Output**: Check \`process.stdout.isTTY\` to output pretty tables for humans and raw JSON for scripts.
- **Exit Codes**: Return 0 on success, non-zero on failure with clear stderr diagnostics.`
  },
  {
    name: 'macos-desktop-integration',
    category: 'Desktop',
    description: 'macOS app integration: Swift, Cocoa menu bar extras, Apple notarization, dark mode, and entitlements.',
    content: `# macOS Desktop Integration Skill

## Core Principles
- **App Sandbox**: Declare necessary entitlements (network, files) in the entitlements plist.
- **Apple Notarization**: Sign with Developer ID Application certificate and submit to Apple notary service.
- **Menu Bar Lifestyle**: Design status item menu bar apps with clean popovers.`
  },
  {
    name: 'linux-desktop-packaging',
    category: 'Desktop',
    description: 'Linux desktop packaging: AppImage, Flatpak, Snap, desktop entries, and systemd services.',
    content: `# Linux Desktop Packaging Skill

## Core Principles
- **Universal Binaries**: Use AppImage for self-contained, portable Linux execution.
- **Desktop Entry**: Place valid \`.desktop\` files in \`/usr/share/applications\` with proper Categories and Icon.
- **Permissions**: Follow XDG base directory specification (\`~/.config\`, \`~/.local/share\`).`
  },
  {
    name: 'native-webview-bindings',
    category: 'Desktop',
    description: 'Lightweight desktop webview embedding: Microsoft Edge WebView2, WebKitGTK, and native C/C++ bridges.',
    content: `# Native WebView Bindings Skill

## Core Principles
- **UserData Folder**: Set isolated user data directories to prevent profile collisions with regular browsers.
- **App Mode Execution**: Run browser runtimes with \`--app=\` flags for window-chrome-free interfaces.
- **Script Injection**: Use native \`ExecuteScriptAsync\` for bidirectional host-to-page communication.`
  },

  // --- DATABASES & STORAGE (29-36) ---
  {
    name: 'postgresql-advanced-dba',
    category: 'Databases',
    description: 'PostgreSQL database administration: B-Tree, GIN, GiST indexing, EXPLAIN ANALYZE, vacuuming, and partitioning.',
    content: `# PostgreSQL Advanced DBA Skill

## Core Principles
- **Index Precision**: Use partial and composite indexes matching exact WHERE and ORDER BY clauses.
- **Query Plan Auditing**: Inspect \`EXPLAIN (ANALYZE, BUFFERS)\` to eradicate sequential scans on large tables.
- **Connection Pooling**: Always place PgBouncer in front of Postgres to cap connection overhead.`
  },
  {
    name: 'mysql-performance-tuning',
    category: 'Databases',
    description: 'MySQL and MariaDB performance optimization: InnoDB buffer pool, slow query analysis, and indexing strategies.',
    content: `# MySQL Performance Tuning Skill

## Core Principles
- **InnoDB Buffer Pool**: Allocate 70-80% of available server RAM to \`innodb_buffer_pool_size\`.
- **Covering Indexes**: Structure indexes so queries read entirely from the index tree without table lookups.
- **Transactions**: Keep transaction durations short to minimize row locking and deadlock frequency.`
  },
  {
    name: 'sqlite-embedded-mastery',
    category: 'Databases',
    description: 'SQLite embedded database mastery: WAL mode, PRAGMA optimizations, full-text search (FTS5), and concurrency.',
    content: `# SQLite Embedded Mastery Skill

## Core Principles
- **WAL Mode**: Always execute \`PRAGMA journal_mode = WAL;\` for concurrent readers alongside writers.
- **Performance Pragmas**: Configure \`PRAGMA synchronous = NORMAL;\` and \`PRAGMA cache_size = -64000;\`.
- **Transactions**: Wrap batch insertions inside explicit \`BEGIN TRANSACTION\` blocks.`
  },
  {
    name: 'mongodb-nosql-patterns',
    category: 'Databases',
    description: 'MongoDB document database design: aggregation pipelines, embedded vs reference data modeling, and sharding.',
    content: `# MongoDB & NoSQL Patterns Skill

## Core Principles
- **Model for Access**: Embed data that is queried together; reference data that grows unbounded.
- **Aggregation Pipelines**: Place \`$match\` and \`$project\` stages as early as possible to reduce pipeline memory.
- **Index Support**: Ensure compound indexes cover sorting and filtering criteria.`
  },
  {
    name: 'redis-caching-queues',
    category: 'Databases',
    description: 'Redis in-memory caching and messaging: cache-aside, write-through, TTL expiration, BullMQ, and pub/sub.',
    content: `# Redis Caching & Queue Engineering Skill

## Core Principles
- **Cache-Aside Pattern**: Read from cache first; on miss, query database, store in Redis with TTL, and return.
- **TTL Mandatory**: Always specify TTL on cache keys to prevent memory saturation.
- **Atomic Operations**: Use Lua scripts or Redis transactions (\`MULTI\`/\`EXEC\`) for concurrent state changes.`
  },
  {
    name: 'prisma-orm-patterns',
    category: 'Databases',
    description: 'Prisma ORM schema modeling: relation design, migration workflows, connection pooling, and typed extensions.',
    content: `# Prisma ORM Patterns Skill

## Core Principles
- **Relation Discipline**: Declare explicit onDelete actions (Cascade, SetNull, Restrict) on all foreign keys.
- **Query Selection**: Use \`select\` to fetch only needed fields, avoiding over-fetching on large schemas.
- **Accelerate & Pulse**: Use connection pooling proxies when connecting from serverless lambdas.`
  },
  {
    name: 'drizzle-orm-typescript',
    category: 'Databases',
    description: 'Drizzle ORM type-safe SQL queries, relational schemas, Drizzle Kit migrations, and zero-overhead performance.',
    content: `# Drizzle ORM Skill

## Core Principles
- **SQL-Like Syntax**: Write queries that map 1:1 to underlying SQL without runtime overhead.
- **Relational Queries**: Use \`db.query.users.findMany({ with: { posts: true } })\` for structured joins.
- **Schema Single Source of Truth**: Keep schema definitions unified in TypeScript with strict Zod inference.`
  },
  {
    name: 'elasticsearch-search-engine',
    category: 'Databases',
    description: 'Elasticsearch and OpenSearch: mapping design, custom analyzers, fuzzy search, relevance scoring, and vector search.',
    content: `# Elasticsearch Search Engine Skill

## Core Principles
- **Analyzer Tuning**: Configure n-gram and edge n-gram tokenizers for instant autocomplete search.
- **Mapping Types**: Use \`keyword\` for exact filter values and \`text\` for full-text search.
- **Bulk Indexing**: Ingest documents via the Bulk API in batches of 1,000-5,000 documents.`
  },

  // --- DEVOPS, CLOUD & INFRASTRUCTURE (37-46) ---
  {
    name: 'docker-containerization',
    category: 'DevOps',
    description: 'Docker container engineering: multi-stage builds, alpine/distroless bases, image optimization, and non-root users.',
    content: `# Docker Containerization Standard Skill

## Core Principles
- **Multi-Stage Builds**: Build in heavyweight SDK images; copy compiled assets into minimal runtime images.
- **Non-Root Execution**: Always declare \`USER node\` or create an unprivileged user before the entrypoint.
- **Layer Caching**: Copy \`package.json\` and install dependencies before copying the rest of the source code.`
  },
  {
    name: 'docker-compose-orchestration',
    category: 'DevOps',
    description: 'Docker Compose orchestration: multi-service local stacks, named volumes, health checks, and network isolation.',
    content: `# Docker Compose Orchestration Skill

## Core Principles
- **Health Checks**: Define \`healthcheck\` blocks so dependent services only launch when upstream DBs are healthy.
- **Volume Persistence**: Map persistent data to named volumes rather than arbitrary host directories.
- **Environment Isolation**: Load configurations from \`.env\` files without committing credentials.`
  },
  {
    name: 'kubernetes-k8s-deployments',
    category: 'DevOps',
    description: 'Kubernetes cloud deployments: Pods, Deployments, Services, Ingress, Helm charts, and rolling updates.',
    content: `# Kubernetes (K8s) Deployments Skill

## Core Principles
- **Resource Limits**: Set explicit CPU/memory \`requests\` and \`limits\` on every container.
- **Probes**: Implement distinct \`livenessProbe\` and \`readinessProbe\` endpoints.
- **Zero-Downtime Rollouts**: Configure rolling update strategies with \`maxSurge\` and \`maxUnavailable\`.`
  },
  {
    name: 'github-actions-ci-cd',
    category: 'DevOps',
    description: 'GitHub Actions automation: matrix testing, caching strategies, automated semantic releases, and environments.',
    content: `# GitHub Actions CI/CD Mastery Skill

## Core Principles
- **Action Pinning**: Pin third-party actions to full commit SHAs for supply-chain security.
- **Dependency Caching**: Cache \`~/.npm\` or \`~/.cargo\` using \`actions/cache\` to slash pipeline durations.
- **Artifact Upload**: Preserve build outputs and binaries with \`actions/upload-artifact\`.`
  },
  {
    name: 'gitlab-ci-pipelines',
    category: 'DevOps',
    description: 'GitLab CI/CD pipeline design: stages, artifacts, caching, Docker-in-Docker, and environment variables.',
    content: `# GitLab CI Pipelines Skill

## Core Principles
- **Stage Ordering**: Separate pipelines cleanly: \`lint\` -> \`test\` -> \`build\` -> \`deploy\`.
- **Artifact Passing**: Pass compiled artifacts forward across stages with explicit expiration times.
- **Rules Over Only**: Use modern \`rules:\` blocks with branch and variable conditions.`
  },
  {
    name: 'nginx-reverse-proxy',
    category: 'DevOps',
    description: 'NGINX web server configuration: reverse proxy, SSL/TLS certificates, rate limiting, gzip/brotli, and cache headers.',
    content: `# NGINX Reverse Proxy & Web Server Skill

## Core Principles
- **Proxy Headers**: Pass \`Host\`, \`X-Real-IP\`, and \`X-Forwarded-For\` on all proxied locations.
- **Compression**: Enable Gzip or Brotli for text, JSON, CSS, and JS MIME types.
- **Security Headers**: Inject HSTS, X-Content-Type-Options, and Referrer-Policy.`
  },
  {
    name: 'terraform-infrastructure-as-code',
    category: 'DevOps',
    description: 'Terraform IaC standards: HCL formatting, remote state with S3/DynamoDB locks, modular design, and plans.',
    content: `# Terraform Infrastructure as Code Skill

## Core Principles
- **Remote State Locking**: Store state in remote buckets with state locking enabled.
- **Modular Design**: Group reusable resources into versioned modules with strict input/output variables.
- **Plan Verification**: Always review \`terraform plan\` before applying changes in production.`
  },
  {
    name: 'aws-cloud-architecture',
    category: 'DevOps',
    description: 'Amazon Web Services cloud design: S3, Lambda serverless, CloudFront CDN, ECS Fargate, and IAM least privilege.',
    content: `# AWS Cloud Architecture Skill

## Core Principles
- **Least Privilege IAM**: Restrict IAM policies to the minimal required actions and resource ARNs.
- **Edge Distribution**: Place CloudFront CDN in front of S3 buckets and API endpoints.
- **Serverless Scaling**: Design Lambda functions with lightweight packages for fast cold starts.`
  },
  {
    name: 'cloudflare-workers-edge',
    category: 'DevOps',
    description: 'Cloudflare Workers and Pages: edge compute, KV storage, D1 SQL databases, and cache-control rules.',
    content: `# Cloudflare Workers & Edge Compute Skill

## Core Principles
- **Sub-10ms Cold Starts**: Leverage V8 isolates on the edge for instantaneous response worldwide.
- **KV Storage**: Use Cloudflare KV for high-read, low-write caching and configurations.
- **Wrangler Deployments**: Manage configurations declaratively in \`wrangler.jsonc\` or \`wrangler.toml\`.`
  },
  {
    name: 'monitoring-prometheus-grafana',
    category: 'DevOps',
    description: 'Observability and monitoring: Prometheus metrics scraping, Grafana dashboards, Alertmanager, and OpenTelemetry.',
    content: `# Prometheus & Grafana Monitoring Skill

## Core Principles
- **The 4 Golden Signals**: Monitor Latency, Traffic, Errors, and Saturation.
- **Metric Cardinality**: Keep label values bounded; never use user IDs or UUIDs as metric labels.
- **Alert Rules**: Trigger alerts on user-impacting symptoms rather than internal implementation details.`
  },

  // --- SECURITY & CRYPTOGRAPHY (47-53) ---
  {
    name: 'owasp-top-10-defense',
    category: 'Security',
    description: 'Web application security defense: mitigating XSS, SQL injection, CSRF, SSRF, IDOR, and broken access controls.',
    content: `# OWASP Top 10 Web Defense Skill

## Core Principles
- **Parameterized Queries**: Never concatenate user input into SQL or NoSQL queries.
- **Content Security Policy (CSP)**: Disallow inline scripts and restrict script sources.
- **Authorization Verification**: Check object ownership (prevent IDOR) on every single request.`
  },
  {
    name: 'jwt-oauth2-authentication',
    category: 'Security',
    description: 'Authentication engineering: JWT signing, refresh token rotation, OAuth2 PKCE flow, and session revocation.',
    content: `# JWT & OAuth2 Authentication Skill

## Core Principles
- **Token Lifespan**: Short-lived access tokens (5-15 mins) paired with rotating refresh tokens stored in HttpOnly cookies.
- **Algorithm Whitelist**: Explicitly enforce signing algorithm (e.g. \`RS256\` or \`EdDSA\`); reject \`none\`.
- **PKCE Flow**: Mandate Proof Key for Code Exchange for all public and single-page applications.`
  },
  {
    name: 'data-encryption-cryptography',
    category: 'Security',
    description: 'Applied cryptography: AES-256-GCM authenticated encryption, password hashing with Argon2id/bcrypt, and key storage.',
    content: `# Data Encryption & Cryptography Skill

## Core Principles
- **Password Hashing**: Use Argon2id or bcrypt with appropriate work factor; never use SHA/MD5.
- **Authenticated Encryption**: Use AES-256-GCM or ChaCha20-Poly1305 to ensure confidentiality and integrity.
- **Secure Randomness**: Generate tokens and nonces using \`crypto.randomBytes\`, never \`Math.random()\`.`
  },
  {
    name: 'api-security-hardening',
    category: 'Security',
    description: 'API security hardening: Helmet HTTP headers, CORS configurations, rate limiting, and request sanitization.',
    content: `# API Security Hardening Skill

## Core Principles
- **Strict CORS**: Explicitly enumerate allowed origins; never reflect wildcards with credentials enabled.
- **Rate Limiting**: Enforce IP-based and user-based token bucket rate limits on sensitive endpoints.
- **Payload Limits**: Cap maximum JSON request body sizes to 100KB-1MB to prevent memory exhaustion.`
  },
  {
    name: 'penetration-testing-basics',
    category: 'Security',
    description: 'Vulnerability assessment and ethical testing: OWASP ZAP, Burp Suite, directory traversal, and header inspection.',
    content: `# Penetration Testing & Vulnerability Audit Skill

## Core Principles
- **Reconnaissance**: Inspect HTTP response headers for version leakage and missing security headers.
- **Fuzzing**: Test boundary conditions and malformed payloads against all input fields.
- **Permission Escalation**: Verify that unprivileged accounts cannot access administrative routes.`
  },
  {
    name: 'secrets-management-vault',
    category: 'Security',
    description: 'Secrets management: HashiCorp Vault, cloud secret managers, environment isolation, and automated key rotation.',
    content: `# Secrets Management & Vault Skill

## Core Principles
- **Zero Secrets in Code**: Never commit passwords, API keys, or private certificates into version control.
- **Automated Rotation**: Configure 90-day automatic key and database credential rotation.
- **Ephemeral Credentials**: Use IAM roles and STS tokens instead of static access keys whenever possible.`
  },
  {
    name: 'dependency-vulnerability-audit',
    category: 'Security',
    description: 'Software supply chain security: npm audit, Snyk, Dependabot, lockfile integrity, and SBOM generation.',
    content: `# Dependency Security & Supply Chain Audit Skill

## Core Principles
- **Continuous Auditing**: Run automated package vulnerability scanners in CI pipelines.
- **Lockfile Enforcement**: Always install using \`npm ci\` or \`pnpm install --frozen-lockfile\`.
- **Minimal Dependencies**: Review package weight and maintainer reputation before introducing new packages.`
  },

  // --- GAME DEVELOPMENT & PHYSICS (54-61) ---
  {
    name: 'game-loop-math-physics',
    category: 'GameDev',
    description: 'Game engine fundamentals: fixed timestep updates, Euler/Verlet integration, AABB collision detection, and 2D vectors.',
    content: `# Game Loop & Physics Mathematics Skill

## Core Principles
- **Fixed Timestep**: Separate variable render frame rate from fixed physics updates (e.g. 60Hz accumulator loop).
- **AABB Collision**: Implement fast axis-aligned bounding box checks before calculating expensive pixel-perfect collisions.
- **Vector Operations**: Use standardized Vector2 math (normalize, dot product, magnitude, lerp).`
  },
  {
    name: 'procedural-generation-algorithms',
    category: 'GameDev',
    description: 'Procedural generation algorithms: Perlin and Simplex noise, cellular automata cave systems, and random seed generators.',
    content: `# Procedural Content Generation Skill

## Core Principles
- **Seeded Randomness**: Use PRNG algorithms (xorshift128+, PCG) so levels are completely reproducible from a seed.
- **Coherent Noise**: Blend octave layers of Simplex noise for smooth terrain and difficulty curves.
- **Cellular Automata**: Apply 4-5 simulation steps for organic cave and dungeon generation.`
  },
  {
    name: 'state-machine-game-logic',
    category: 'GameDev',
    description: 'Game state management: finite state machines (FSM), behavior trees, input buffering, and transition guards.',
    content: `# Game State Machines & AI Logic Skill

## Core Principles
- **Finite State Machines**: Model character states (Idle, Run, Jump, Fall, Attack) with strict entry/exit callbacks.
- **Input Buffering**: Buffer player jump and attack inputs for 100-150ms before landing for responsive gameplay.
- **Game Phases**: Keep global states (Menu, Playing, Paused, GameOver) decoupled from in-game entity states.`
  },
  {
    name: 'audio-synthesis-webaudio',
    category: 'GameDev',
    description: 'Web Audio API sound synthesis: oscillators, ADSR envelopes, noise generators, biquad filters, and zero-file SFX.',
    content: `# Web Audio API Sound Synthesis Skill

## Core Principles
- **Zero MP3 Dependency**: Generate retro 8-bit sound effects procedurally via oscillators (sine, square, sawtooth).
- **ADSR Envelopes**: Control volume dynamically with Attack, Decay, Sustain, and Release curves.
- **User Gesture Resume**: Ensure AudioContext suspended state is resumed on the first user click/tap.`
  },
  {
    name: 'idle-clicker-game-economy',
    category: 'GameDev',
    description: 'Incremental and idle clicker game mathematics: exponential cost formulas, prestige multipliers, and offline progression.',
    content: `# Idle & Clicker Game Economy Skill

## Core Principles
- **Cost Scaling**: Calculate upgrade cost with \`baseCost * (multiplier ^ count)\` where multiplier is typically 1.15 - 1.35.
- **Offline Earnings**: Cap offline progression rewards to 8-24 hours with soft decay.
- **Prestige Multipliers**: Provide a reset mechanism that grants permanent percentage boosts to sustain long-term engagement.`
  },
  {
    name: 'sprite-animation-rendering',
    category: 'GameDev',
    description: '2D sprite animation: texture atlases, frame interpolation, particle emitters, and multi-layer parallax scrolling.',
    content: `# Sprite Animation & Parallax Rendering Skill

## Core Principles
- **Texture Atlases**: Combine individual animation frames into a single spritesheet to minimize draw calls.
- **Parallax Layers**: Move background layers at proportional fractions of the player velocity (0.2x, 0.5x, 1.0x).
- **Frame Timing**: Calculate current frame index using accumulated elapsed time rather than frame counts.`
  },
  {
    name: 'godot-game-engine',
    category: 'GameDev',
    description: 'Godot 4 game engine development: GDScript, scene trees, node architecture, signals, and physics bodies.',
    content: `# Godot 4 Game Engine Skill

## Core Principles
- **Scene Tree Hierarchy**: Favor composition of reusable scenes over deep inheritance hierarchies.
- **Signal Decoupling**: Connect signals upward to parent controllers; invoke methods downward.
- **Physics Tick**: Implement character movement inside \`_physics_process(delta)\` using \`move_and_slide()\`.`
  },
  {
    name: 'unity-csharp-architecture',
    category: 'GameDev',
    description: 'Unity and C# game programming: ScriptableObjects, Component design patterns, object pooling, and performance profiling.',
    content: `# Unity & C# Architecture Skill

## Core Principles
- **ScriptableObjects**: Store game configurations, weapon stats, and shared event channels in ScriptableObjects.
- **Avoid GC in Update**: Never allocate new objects, strings, or LINQ queries inside \`Update()\`.
- **Object Pooling**: Pre-instantiate bullets, particles, and enemies to eliminate runtime instantiate/destroy spikes.`
  },

  // --- TESTING & QUALITY ASSURANCE (62-68) ---
  {
    name: 'playwright-e2e-testing',
    category: 'Testing',
    description: 'Playwright end-to-end browser testing: Page Object Models, cross-browser automation, trace viewer, and mobile emulation.',
    content: `# Playwright E2E Testing Skill

## Core Principles
- **User-Facing Locators**: Locate elements by role (\`getByRole\`), label (\`getByLabel\`), or text (\`getByText\`), avoiding fragile CSS selectors.
- **Auto-Waiting**: Rely on built-in auto-waiting instead of arbitrary \`sleep\` or hardcoded delays.
- **Trace Viewer**: Enable trace recording on first retry to inspect DOM snapshots, console logs, and network calls.`
  },
  {
    name: 'cypress-automation',
    category: 'Testing',
    description: 'Cypress web automation: component testing, network request interception (cy.intercept), and fixture management.',
    content: `# Cypress Web Automation Skill

## Core Principles
- **Network Interception**: Stub external third-party APIs using \`cy.intercept()\` for fast, deterministic test suites.
- **Custom Commands**: Encapsulate repetitive flows (authentication, seeding) in reusable Cypress commands.
- **Data Test Attributes**: Use \`data-testid\` attributes for stable, refactor-proof element targeting.`
  },
  {
    name: 'vitest-unit-testing',
    category: 'Testing',
    description: 'Vitest ultra-fast unit testing: Vite integration, mocking, snapshot testing, test coverage, and benchmark suites.',
    content: `# Vitest Unit Testing Skill

## Core Principles
- **Vite Configuration Sharing**: Leverage identical Vite plugins and resolve aliases in test runs without dual configs.
- **Strict Spies**: Clear and restore mocks after each test using \`vi.clearAllMocks()\`.
- **Fast Execution**: Organize tests into independent, parallelizable suites with zero cross-test state leakage.`
  },
  {
    name: 'jest-mocking-mastery',
    category: 'Testing',
    description: 'Jest testing framework: async promises, timer mocking (jest.useFakeTimers), module mocking, and custom matchers.',
    content: `# Jest Mocking Mastery Skill

## Core Principles
- **Fake Timers**: Use \`jest.useFakeTimers()\` and \`jest.advanceTimersByTime()\` to test animations and debounced inputs.
- **Module Mocking**: Declare \`jest.mock()\` before imports to intercept third-party library calls cleanly.
- **Snapshot Hygiene**: Review snapshot diffs manually; avoid blind \`-u\` updating of broken tests.`
  },
  {
    name: 'load-testing-k6',
    category: 'Testing',
    description: 'Performance and load testing with k6: virtual users, ramp-up stages, latency SLA thresholds, and metric collection.',
    content: `# k6 Load Testing & Stress Verification Skill

## Core Principles
- **Ramp-Up Stages**: Configure realistic traffic profiles: ramp-up, steady state load, spike test, and ramp-down.
- **Thresholds as Pass/Fail**: Enforce SLAs via thresholds (e.g. \`http_req_duration: ['p(95)<200']\`).
- **Realistic Delays**: Introduce random sleep intervals between virtual user actions to simulate authentic traffic.`
  },
  {
    name: 'mutation-testing-stryker',
    category: 'Testing',
    description: 'Mutation testing using Stryker: assessing test suite quality by injecting faults into source code and verifying test catches.',
    content: `# Mutation Testing & Test Quality Skill

## Core Principles
- **Mutant Survival**: Ensure every synthetic code mutation (flipped booleans, changed arithmetic) causes at least one test to fail.
- **High-Value Scenarios**: Prioritize mutation testing on core financial, business logic, and security authorization functions.`
  },
  {
    name: 'static-analysis-linters',
    category: 'Testing',
    description: 'Static analysis and code hygiene: Oxlint, ESLint flat config, Prettier formatting, and automated pre-commit hooks.',
    content: `# Static Analysis & Linter Automation Skill

## Core Principles
- **Zero Warnings Policy**: Treat all linter warnings as blocking errors in CI.
- **Fast Lint First**: Run ultra-fast Rust-based linters (\`oxlint\`) before running heavier typecheck pipelines.
- **Pre-Commit Hooks**: Run lint-staged on staged files to guarantee that unformatted or broken code cannot be committed.`
  },

  // --- ALGORITHMS & DATA STRUCTURES (69-74) ---
  {
    name: 'graph-algorithms-pathfinding',
    category: 'Algorithms',
    description: 'Graph algorithms and pathfinding: Dijkstra algorithm, A* heuristic pathfinding, BFS/DFS, and topological sorting.',
    content: `# Graph Algorithms & Pathfinding Skill

## Core Principles
- **A* Pathfinding**: Use Manhattan distance heuristic for 4-directional grids; Euclidean or Octile for 8-directional.
- **Priority Queues**: Back Dijkstra and A* open sets with binary heaps for O(log V) retrieval.
- **Cycle Detection**: Use Tarjan or Kahn algorithm for dependency resolution and topological ordering.`
  },
  {
    name: 'dynamic-programming-patterns',
    category: 'Algorithms',
    description: 'Dynamic programming mastery: memoization, bottom-up tabulation, knapsack problems, and state space optimization.',
    content: `# Dynamic Programming Patterns Skill

## Core Principles
- **Top-Down vs Bottom-Up**: Prototype with memoized recursion; optimize with iterative array tabulation.
- **Space Optimization**: Reduce memory from O(N*M) to O(M) whenever current state depends only on previous row.`
  },
  {
    name: 'sorting-searching-trees',
    category: 'Algorithms',
    description: 'Data structures: balanced binary search trees, Tries, Heaps, B-Trees, and binary search variations.',
    content: `# Data Structures: Trees, Heaps & Search Skill

## Core Principles
- **Trie for Prefix Search**: Implement Trie structures for autocomplete and dictionary word validation.
- **Binary Search Invariants**: Formulate \`low <= high\` loops with clean middle computation (\`low + (high - low) / 2\`).`
  },
  {
    name: 'string-processing-regex',
    category: 'Algorithms',
    description: 'String processing: Knuth-Morris-Pratt (KMP), Levenshtein distance, regex performance, and catastrophic backtracking avoidance.',
    content: `# String Processing & Regex Optimization Skill

## Core Principles
- **Catastrophic Backtracking**: Eliminate nested quantifiers (\`(a+)+\`) that trigger exponential regex evaluation.
- **Fuzzy Search**: Apply Levenshtein distance or Damerau-Levenshtein for typo-tolerant string matching.`
  },
  {
    name: 'spatial-data-structures',
    category: 'Algorithms',
    description: 'Spatial partitioning: Quadtrees, Octrees, Spatial Hashing, and R-Trees for collision and area queries.',
    content: `# Spatial Partitioning & Fast Geometry Queries Skill

## Core Principles
- **Quadtrees**: Subdivide 2D space recursively to reduce collision checks from O(N^2) to O(N log N).
- **Spatial Hashing**: Map entity coordinates to grid bucket hash keys for constant-time neighbor lookups.`
  },
  {
    name: 'bitwise-hacks-optimization',
    category: 'Algorithms',
    description: 'Bitwise optimization: bitmasks, flags, power-of-two checks, fast bit counting, and compact state representation.',
    content: `# Bitwise Manipulation & Performance Hacks Skill

## Core Principles
- **Bitmask State**: Pack up to 32/64 boolean flags into a single integer.
- **Power of Two**: Check if \`N\` is power of two via \`(N > 0) && ((N & (N - 1)) === 0)\`.
- **Toggle Flags**: Toggle bit at position \`i\` using \`x ^= (1 << i)\`.`
  },

  // --- AI, ML & LLM INTEGRATION (75-80) ---
  {
    name: 'llm-prompt-engineering',
    category: 'AI_ML',
    description: 'Prompt engineering techniques: system instructions, few-shot exemplars, chain-of-thought, and structured JSON output.',
    content: `# LLM Prompt Engineering & System Design Skill

## Core Principles
- **Role and Intent**: Define precise persona, boundaries, and expected output schema in system prompts.
- **Few-Shot Prompting**: Provide 2-3 concrete input/output exemplars to lock in the target formatting.
- **Structured Schema**: Force JSON output and validate against Zod/Pydantic schemas.`
  },
  {
    name: 'rag-vector-search',
    category: 'AI_ML',
    description: 'Retrieval-Augmented Generation (RAG): chunking strategies, text embeddings, vector databases, and re-ranking.',
    content: `# Retrieval-Augmented Generation (RAG) Skill

## Core Principles
- **Chunking with Overlap**: Chunk documents into 300-500 token segments with 50-token semantic overlap.
- **Hybrid Retrieval**: Combine dense vector similarity (cosine) with sparse BM25 keyword search.
- **Re-Ranking**: Re-score top 20 retrieved candidates using a cross-encoder model before feeding to LLM context.`
  },
  {
    name: 'langchain-langgraph-flows',
    category: 'AI_ML',
    description: 'Multi-agent systems and LangGraph: cyclical agent flows, tool calling, state checkpoints, and human-in-the-loop.',
    content: `# LangGraph & Multi-Agent Orchestration Skill

## Core Principles
- **Cyclical Graph Architecture**: Model reasoning as explicit state nodes connected by conditional edges.
- **Tool Calling**: Define tools with strict JSON schemas and validate inputs before execution.
- **State Checkpointing**: Persist graph state between turns to allow rollbacks and human approvals.`
  },
  {
    name: 'model-context-protocol-mcp',
    category: 'AI_ML',
    description: 'Model Context Protocol (MCP) server development: Stdio and SSE transports, tool definitions, and resource exposing.',
    content: `# Model Context Protocol (MCP) Engineering Skill

## Core Principles
- **Standardized Transports**: Implement Stdio transport for local tools and SSE for cloud endpoints.
- **Tool Schema**: Define comprehensive JSON Schema properties with descriptive summaries for each parameter.
- **Error Propagation**: Return meaningful error messages within the tool response object.`
  },
  {
    name: 'local-ai-ollama-models',
    category: 'AI_ML',
    description: 'Local AI inference with Ollama: running open models (Llama 3, Mistral, Qwen), GPU acceleration, and offline AI API.',
    content: `# Local AI & Ollama Integration Skill

## Core Principles
- **Hardware Sizing**: Quantize models to 4-bit (Q4_K_M) to run high-capability LLMs within consumer VRAM.
- **OpenAI Compatibility**: Connect via standard OpenAI-compatible endpoints (\`http://localhost:11434/v1\`).
- **Streaming Tokens**: Handle server-sent events for responsive user interfaces.`
  },
  {
    name: 'computer-vision-opencv',
    category: 'AI_ML',
    description: 'Computer vision fundamentals: OpenCV, image filtering, edge detection, contour analysis, and object tracking.',
    content: `# Computer Vision & OpenCV Skill

## Core Principles
- **Preprocessing Pipeline**: Convert to grayscale -> Gaussian blur -> Canny edge detection.
- **Contour Filtering**: Filter contours by area and aspect ratio to discard camera noise.
- **Color Space Conversion**: Transform BGR to HSV for robust color thresholding independent of lighting.`
  },
];

console.log('Total skills to generate: ' + skills.length);

const targets = [
  path.resolve('c:/Users/Никитос/Documents/Koliapedia/.agents/skills'),
  path.resolve('C:/Users/Никитос/.gemini/config/skills')
];

for (const targetDir of targets) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const s of skills) {
    const skillDir = path.join(targetDir, s.name);
    if (!fs.existsSync(skillDir)) {
      fs.mkdirSync(skillDir, { recursive: true });
    }

    const skillMdPath = path.join(skillDir, 'SKILL.md');
    const frontmatter = `---
name: ${s.name}
description: >-
  ${s.description}
---

${s.content}
`;
    fs.writeFileSync(skillMdPath, frontmatter, 'utf8');
  }
}

console.log('Successfully generated all 80 skills in both global and workspace directories!');
