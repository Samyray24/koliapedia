# 🤖 Инструкция для ИИ-Ассистента (OpenAI Codex / Antigravity / Claude Code)

Добро пожаловать в репозиторий проекта **Коляпедия (Koliapedia)**!

В этом репозитории содержится полный арсенал из **100 специализированных скилов (Skills)** и набор из **30 серверов MCP (Model Context Protocol)**. Используй их при анализе, модификации и разработке проекта.

---

## 📚 1. Доступные Скилы (`skills/` — 100 стандартов)
Перед выполнением любой задачи прочитай соответствующий скил из каталога `skills/<имя-скила>/SKILL.md`:

* **Веб-дизайн и Современный Frontend**:
  * [`skills/web-design-system/SKILL.md`](./skills/web-design-system/SKILL.md) — стандарты вёрстки, Dark Mode, анимации.
  * [`skills/react-19-mastery/SKILL.md`](./skills/react-19-mastery/SKILL.md) — правила хуков React 19, Server Actions.
  * [`skills/nextjs-app-router/SKILL.md`](./skills/nextjs-app-router/SKILL.md) — Next.js 15 App Router и RSC.
  * [`skills/tailwind-css-v4/SKILL.md`](./skills/tailwind-css-v4/SKILL.md) — CSS-first движок Tailwind v4.
  * [`skills/framer-motion-animations/SKILL.md`](./skills/framer-motion-animations/SKILL.md) — переходы и жесты.
* **Нативный Десктоп Windows**:
  * [`skills/windows-desktop-native/SKILL.md`](./skills/windows-desktop-native/SKILL.md) — компиляция `.exe` без зависимостей через `csc.exe`.
  * [`skills/electron-desktop-architect/SKILL.md`](./skills/electron-desktop-architect/SKILL.md) — изоляция процессов в Electron.
  * [`skills/csharp-dotnet-desktop/SKILL.md`](./skills/csharp-dotnet-desktop/SKILL.md) — WPF, WinUI 3, single-file publish.
* **Тестирование и Контроль Качества**:
  * [`skills/test-driven-development/SKILL.md`](./skills/test-driven-development/SKILL.md) — 0 ошибок и 0 предупреждений.
  * [`skills/playwright-e2e-testing/SKILL.md`](./skills/playwright-e2e-testing/SKILL.md) — авто-тесты браузера.
* **Архитектура и Бэкенд**:
  * [`skills/clean-code-architecture/SKILL.md`](./skills/clean-code-architecture/SKILL.md) — модульность, SOLID, строгий TypeScript.
  * [`skills/bun-runtime-bundler/SKILL.md`](./skills/bun-runtime-bundler/SKILL.md) — скоростной рантайм Bun.
  * [`skills/go-microservices/SKILL.md`](./skills/go-microservices/SKILL.md) — микросервисы на Go.
  * Полный список всех 100 скилов доступен в [`skills/README.md`](./skills/README.md).

---

## 🌐 2. Серверы Инструментов MCP (`mcp/` — 30 серверов)
Конфигурация серверов Model Context Protocol находится в файле [`mcp/mcp_servers.json`](./mcp/mcp_servers.json):
* `fetch`, `puppeteer`, `github`, `filesystem`, `sqlite`, `postgres`, `mysql`, `redis`, `docker`, `kubernetes`, `git`, `terminal`, `slack`, `brave-search`, `google-maps`, `memory`, `sequential-thinking`, `everything`, `gitlab`, `aws`, `cloudflare`, `jira`, `confluence`, `notion`, `elasticsearch`, `sentry`, `npm`, `weather`, `openapi`, `time`.
* Подробное описание каждого сервера: [`mcp/README.md`](./mcp/README.md).

---

## 🛠️ 3. Основные команды проекта
* `npm run dev` — запуск локального веб-сервера (Vite) на порту `7777`.
* `npm run build` — проверка типов TypeScript (`tsc -b`) и компиляция продакшн-бандла.
* `npm run lint` — моментальный статический анализ через `oxlint` (требуется **0 warnings, 0 errors**).
* `.\Коляпедия.exe` — запуск нативного оконного приложения Windows.
