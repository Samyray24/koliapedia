# 🤖 Инструкция для ИИ-Ассистента (OpenAI Codex / Antigravity / Claude Code)

Добро пожаловать в репозиторий проекта **Коляпедия (Koliapedia)**!

В этом репозитории содержится полный арсенал из **84 специализированных скилов (Skills)** и набор **серверов MCP (Model Context Protocol)**. Используй их при анализе, модификации и разработке проекта.

---

## 📚 1. Доступные Скилы (`skills/`)
Перед выполнением любой задачи прочитай соответствующий скил из каталога `skills/<имя-скила>/SKILL.md`:

* **Веб-дизайн и UI/UX**:
  * [`skills/web-design-system/SKILL.md`](./skills/web-design-system/SKILL.md) — стандарты вёрстки, Dark Mode, анимации.
  * [`skills/react-19-mastery/SKILL.md`](./skills/react-19-mastery/SKILL.md) — правила хуков React 19, Server Actions.
  * [`skills/tailwind-css-v4/SKILL.md`](./skills/tailwind-css-v4/SKILL.md) — CSS-first движок Tailwind v4.
  * [`skills/framer-motion-animations/SKILL.md`](./skills/framer-motion-animations/SKILL.md) — переходы и жесты.
* **Нативный Десктоп Windows**:
  * [`skills/windows-desktop-native/SKILL.md`](./skills/windows-desktop-native/SKILL.md) — компиляция `.exe` без зависимостей через `csc.exe`.
  * [`skills/electron-desktop-architect/SKILL.md`](./skills/electron-desktop-architect/SKILL.md) — изоляция процессов в Electron.
* **Тестирование и Контроль Качества**:
  * [`skills/test-driven-development/SKILL.md`](./skills/test-driven-development/SKILL.md) — 0 ошибок и 0 предупреждений.
  * [`skills/playwright-e2e-testing/SKILL.md`](./skills/playwright-e2e-testing/SKILL.md) — авто-тесты браузера.
* **Архитектура и Бэкенд**:
  * [`skills/clean-code-architecture/SKILL.md`](./skills/clean-code-architecture/SKILL.md) — модульность, SOLID, строгий TypeScript.
  * Полный список всех 84 скилов доступен в [`skills/README.md`](./skills/README.md).

---

## 🌐 2. Серверы Инструментов MCP (`mcp/`)
Конфигурация серверов Model Context Protocol находится в файле [`mcp/mcp_config.json`](./mcp/mcp_config.json):
* `fetch` — загрузка веб-страниц и документации.
* `puppeteer` — скриншоты, тестирование в браузере.
* `github` — работа с коммитами, PR и релизами.
* `filesystem` — локальный файловый доступ.
* `sqlite` — выполнение SQL-запросов.

---

## 🛠️ 3. Основные команды проекта
* `npm run dev` — запуск локального веб-сервера (Vite) на порту `5173`.
* `npm run build` — проверка типов TypeScript (`tsc -b`) и компиляция продакшн-бандла.
* `npm run lint` — моментальный статический анализ через `oxlint` (требуется **0 warnings, 0 errors**).
* `.\Коляпедия.exe` — запуск нативного оконного приложения Windows.
