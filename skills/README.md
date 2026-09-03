# 🧠 Сборник Скилов для ИИ-Агентов и Разработчиков (84 Skills)
### Совместимо с: **Google Antigravity**, **OpenAI Codex**, **Claude Code**, **Cursor**, **Windsurf**

Данный каталог содержит модульные инструкции («скилы» / runbooks) для автономных ИИ-агентов и разработчиков. Каждый скил оформлен в стандарте Markdown с метаданными и содержит архитектурные принципы, шаблоны кода и чеклисты верификации.

---

## 📑 Каталог скилов по категориям

### 🎨 1. Frontend, UI/UX & Web Design (11)
* [`web-design-system`](./web-design-system/SKILL.md) — Стандарты современного веб-дизайна, Glassmorphism, темные темы и микро-взаимодействия.
* [`react-19-mastery`](./react-19-mastery/SKILL.md) — React 19: Server Actions, useActionState, useOptimistic, чистые эффекты.
* [`tailwind-css-v4`](./tailwind-css-v4/SKILL.md) — Tailwind CSS v4 CSS-first движок, @theme, контейнерные запросы.
* [`framer-motion-animations`](./framer-motion-animations/SKILL.md) — Плавная физическая анимация, переходы страниц, жесты.
* [`canvas-webgl-graphics`](./canvas-webgl-graphics/SKILL.md) — 2D Canvas рендеринг, 60fps циклы, WebGL шейдеры, пулинг объектов.
* [`threejs-3d-scenes`](./threejs-3d-scenes/SKILL.md) — Three.js 3D сцены, освещение, загрузка GLTF/GLB моделей.
* [`vue-nuxt-architecture`](./vue-nuxt-architecture/SKILL.md) — Vue 3 Composition API, Nuxt 3 SSR, Pinia хранилища.
* [`svelte-runes-ecosystem`](./svelte-runes-ecosystem/SKILL.md) — Svelte 5 руны ($state, $derived, $effect), SvelteKit.
* [`accessibility-wcag`](./accessibility-wcag/SKILL.md) — Доступность WCAG 2.2 AA, ARIA роли, навигация с клавиатуры.
* [`pwa-offline-first`](./pwa-offline-first/SKILL.md) — Progressive Web Apps, сервис-воркеры, CacheStorage, IndexedDB.
* [`micro-frontends`](./micro-frontends/SKILL.md) — Модульная федерация, изоляция компонентов, event bus.

### ⚙️ 2. Backend, APIs & Архитектура (11)
* [`clean-code-architecture`](./clean-code-architecture/SKILL.md) — Архитектурные принципы SOLID, чистый код, строгая типизация.
* [`nodejs-backend-architecture`](./nodejs-backend-architecture/SKILL.md) — Высоконагруженный Node.js, потоки, кластеризация, Event Loop.
* [`nest-js-enterprise`](./nest-js-enterprise/SKILL.md) — NestJS корпоративная архитектура, DI, Guards, Interceptors.
* [`python-fastapi-expert`](./python-fastapi-expert/SKILL.md) — Асинхронный FastAPI, валидация Pydantic v2, OpenAPI.
* [`django-production-standard`](./django-production-standard/SKILL.md) — Django & DRF в продакшене, оптимизация ORM, Celery.
* [`go-microservices`](./go-microservices/SKILL.md) — Микросервисы на Go, горутины, каналы, контексты, gRPC.
* [`rust-systems-programming`](./rust-systems-programming/SKILL.md) — Системное программирование на Rust, Tokio, Axum, владение памятью.
* [`graphql-api-design`](./graphql-api-design/SKILL.md) — GraphQL схемы, DataLoader от N+1, Apollo Server.
* [`rest-api-best-practices`](./rest-api-best-practices/SKILL.md) — Стандарты REST API, идемпотентность, RFC 7807.
* [`websocket-realtime-engine`](./websocket-realtime-engine/SKILL.md) — Realtime WebSocket, Socket.io, pub/sub комнаты, heartbeat.
* [`grpc-protocol-buffers`](./grpc-protocol-buffers/SKILL.md) — gRPC и Protobuf бинарная сериализация, HTTP/2 стриминг.

### 🖥️ 3. Десктоп и Нативные приложения (9)
* [`windows-desktop-native`](./windows-desktop-native/SKILL.md) — Создание нативных Windows `.exe` через csc.exe, ярлыки, App Mode.
* [`electron-desktop-architect`](./electron-desktop-architect/SKILL.md) — Архитектура Electron: изоляция контекста, IPC, меню.
* [`csharp-dotnet-desktop`](./csharp-dotnet-desktop/SKILL.md) — C# .NET 8 desktop: WPF, WinUI 3, single-file publish.
* [`tauri-crossplatform`](./tauri-crossplatform/SKILL.md) — Кроссплатформенный десктоп на Tauri 2.0 и Rust.
* [`windows-installer-wix`](./windows-installer-wix/SKILL.md) — Инсталляторы Inno Setup, NSIS, WiX, MSI, подпись кода.
* [`cross-platform-cli-design`](./cross-platform-cli-design/SKILL.md) — Разработка CLI утилит, парсинг флагов, TTY форматирование.
* [`macos-desktop-integration`](./macos-desktop-integration/SKILL.md) — Интеграция macOS: Swift, строка меню, нотаризация Apple.
* [`linux-desktop-packaging`](./linux-desktop-packaging/SKILL.md) — Пакеты Linux: AppImage, Flatpak, Snap, .desktop файлы.
* [`native-webview-bindings`](./native-webview-bindings/SKILL.md) — Встраивание Edge WebView2 и WebKitGTK.

### 🗄️ 4. Базы данных и Хранилища (8)
* [`postgresql-advanced-dba`](./postgresql-advanced-dba/SKILL.md) — Индексация Postgres (B-Tree, GIN), EXPLAIN ANALYZE, партиционирование.
* [`sqlite-embedded-mastery`](./sqlite-embedded-mastery/SKILL.md) — SQLite WAL-режим, оптимизация PRAGMA, FTS5 полнотекстовый поиск.
* [`mysql-performance-tuning`](./mysql-performance-tuning/SKILL.md) — Тюнинг InnoDB buffer pool, анализ медленных запросов.
* [`redis-caching-queues`](./redis-caching-queues/SKILL.md) — Паттерны кэширования Cache-Aside, очереди BullMQ, TTL.
* [`mongodb-nosql-patterns`](./mongodb-nosql-patterns/SKILL.md) — Агрегационные пайплайны MongoDB, моделирование документов.
* [`prisma-orm-patterns`](./prisma-orm-patterns/SKILL.md) — Prisma ORM: миграции, связи, пулинг соединений.
* [`drizzle-orm-typescript`](./drizzle-orm-typescript/SKILL.md) — Drizzle ORM: SQL-like типобезопасный построитель запросов.
* [`elasticsearch-search-engine`](./elasticsearch-search-engine/SKILL.md) — Поисковые индексы, анализаторы n-gram, нечёткий поиск.

### 🚀 5. DevOps, Cloud & Инфраструктура (10)
* [`docker-containerization`](./docker-containerization/SKILL.md) — Многоэтапные сборки Docker, оптимизация слоёв, non-root юзеры.
* [`docker-compose-orchestration`](./docker-compose-orchestration/SKILL.md) — Оркестрация локального стека, healthcheck, volumes.
* [`kubernetes-k8s-deployments`](./kubernetes-k8s-deployments/SKILL.md) — K8s деплои, Pods, Services, Ingress, probes, rolling updates.
* [`github-actions-ci-cd`](./github-actions-ci-cd/SKILL.md) — Автоматизация CI/CD пайплайнов, кэширование, релизы.
* [`gitlab-ci-pipelines`](./gitlab-ci-pipelines/SKILL.md) — GitLab CI стадии, артефакты, правила веток.
* [`nginx-reverse-proxy`](./nginx-reverse-proxy/SKILL.md) — NGINX реверс-прокси, SSL/TLS, gzip, заголовки безопасности.
* [`terraform-infrastructure-as-code`](./terraform-infrastructure-as-code/SKILL.md) — Terraform IaC модули, remote state с блокировками.
* [`aws-cloud-architecture`](./aws-cloud-architecture/SKILL.md) — Архитектура AWS: S3, Lambda, CloudFront, ECS, IAM.
* [`cloudflare-workers-edge`](./cloudflare-workers-edge/SKILL.md) — Edge вычисления на Cloudflare Workers, KV, D1 база.
* [`monitoring-prometheus-grafana`](./monitoring-prometheus-grafana/SKILL.md) — Мониторинг Prometheus, дашборды Grafana, 4 золотых сигнала.

### 🛡️ 6. Безопасность и Криптография (7)
* [`owasp-top-10-defense`](./owasp-top-10-defense/SKILL.md) — Защита от XSS, SQL-инъекций, CSRF, SSRF, IDOR.
* [`jwt-oauth2-authentication`](./jwt-oauth2-authentication/SKILL.md) — Авторизация JWT, ротация refresh токенов, OAuth2 PKCE.
* [`data-encryption-cryptography`](./data-encryption-cryptography/SKILL.md) — AES-256-GCM шифрование, хеширование Argon2id/bcrypt.
* [`api-security-hardening`](./api-security-hardening/SKILL.md) — Заголовки Helmet, строгий CORS, Rate Limiting.
* [`secrets-management-vault`](./secrets-management-vault/SKILL.md) — Управление секретами, HashiCorp Vault, ротация ключей.
* [`penetration-testing-basics`](./penetration-testing-basics/SKILL.md) — Аудит уязвимостей, фаззинг параметров, проверка эскалации прав.
* [`dependency-vulnerability-audit`](./dependency-vulnerability-audit/SKILL.md) — Аудит безопасности зависимостей (npm audit, Snyk, SBOM).

### 🎮 7. Геймдев, Физика и Звук (8)
* [`game-loop-math-physics`](./game-loop-math-physics/SKILL.md) — Математика игровых циклов: fixed timestep, AABB коллизии, векторы.
* [`procedural-generation-algorithms`](./procedural-generation-algorithms/SKILL.md) — Процедурная генерация: шум Перлина/Симплекс, клеточные автоматы.
* [`state-machine-game-logic`](./state-machine-game-logic/SKILL.md) — Конечные автоматы состояний (FSM) персонажей, буферизация ввода.
* [`audio-synthesis-webaudio`](./audio-synthesis-webaudio/SKILL.md) — Процедурный синтез звука через Web Audio API (ADSR, осцилляторы).
* [`idle-clicker-game-economy`](./idle-clicker-game-economy/SKILL.md) — Баланс кликеров: экспоненциальный рост затрат, престиж.
* [`sprite-animation-rendering`](./sprite-animation-rendering/SKILL.md) — Спрайтовые атласы, покадровая анимация, параллакс слои.
* [`godot-game-engine`](./godot-game-engine/SKILL.md) — Разработка на Godot 4: GDScript, сцены, сигналы, физика.
* [`unity-csharp-architecture`](./unity-csharp-architecture/SKILL.md) — Архитектура Unity: ScriptableObjects, пулинг объектов, профайлинг.

### 🧪 8. Тестирование и Контроль качества (8)
* [`test-driven-development`](./test-driven-development/SKILL.md) — TDD методология, линтинг oxlint, сборка без предупреждений.
* [`playwright-e2e-testing`](./playwright-e2e-testing/SKILL.md) — E2E тестирование в браузерах: Page Object Models, trace viewer.
* [`cypress-automation`](./cypress-automation/SKILL.md) — Автоматизация Cypress: перехват cy.intercept, компонентные тесты.
* [`vitest-unit-testing`](./vitest-unit-testing/SKILL.md) — Скоростные модульные тесты Vitest, моки, снепшоты.
* [`jest-mocking-mastery`](./jest-mocking-mastery/SKILL.md) — Глубокое мокирование Jest, таймеры, асинхронные тесты.
* [`load-testing-k6`](./load-testing-k6/SKILL.md) — Нагрузочное тестирование k6, виртуальные пользователи, SLA.
* [`mutation-testing-stryker`](./mutation-testing-stryker/SKILL.md) — Мутационное тестирование со Stryker: оценка покрытия тестов.
* [`static-analysis-linters`](./static-analysis-linters/SKILL.md) — Статический анализ кода: Oxlint, ESLint flat config, Prettier.

### 📐 9. Алгоритмы и Структуры данных (6)
* [`graph-algorithms-pathfinding`](./graph-algorithms-pathfinding/SKILL.md) — Графы и поиск путей: Дейкстра, A*, BFS/DFS.
* [`dynamic-programming-patterns`](./dynamic-programming-patterns/SKILL.md) — Динамическое программирование: мемоизация, табуляция, рюкзак.
* [`sorting-searching-trees`](./sorting-searching-trees/SKILL.md) — Деревья поиска, префиксные деревья (Trie), кучи.
* [`string-processing-regex`](./string-processing-regex/SKILL.md) — Алгоритмы Кнута-Морриса-Пратта, расстояние Левенштейна, ReDoS.
* [`spatial-data-structures`](./spatial-data-structures/SKILL.md) — Пространственные деревья (Quadtree, Octree, Spatial Hashing).
* [`bitwise-hacks-optimization`](./bitwise-hacks-optimization/SKILL.md) — Битовые маски, быстрые математические хаки, флаги.

### 🤖 10. AI, Машинное обучение и LLM (6)
* [`llm-prompt-engineering`](./llm-prompt-engineering/SKILL.md) — Промпт-инжиниринг: системные роли, few-shot, структурированный JSON.
* [`rag-vector-search`](./rag-vector-search/SKILL.md) — RAG: чанкинг, эмбеддинги, векторный поиск, реранкинг.
* [`langchain-langgraph-flows`](./langchain-langgraph-flows/SKILL.md) — Мультиагентные графы LangGraph, вызов инструментов, циклы.
* [`model-context-protocol-mcp`](./model-context-protocol-mcp/SKILL.md) — Разработка MCP-серверов: Stdio и SSE транспорты, схемы.
* [`local-ai-ollama-models`](./local-ai-ollama-models/SKILL.md) — Локальные нейросети через Ollama (Llama 3, Mistral, Qwen).
* [`computer-vision-opencv`](./computer-vision-opencv/SKILL.md) — Компьютерное зрение OpenCV: фильтрация, контуры, Canny.

---

## 🛠️ Как использовать в Codex / Claude / Cursor
Любой ИИ-ассистент может напрямую прочитать файл нужного скила по пути:
```
skills/<имя-скила>/SKILL.md
```
или руководство по подключению в [`CODEX.md`](../CODEX.md).
