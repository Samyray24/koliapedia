# 🌐 Model Context Protocol (MCP) — Серверы Инструментов

Model Context Protocol (MCP) — открытый стандарт для подключения внешних инструментов, API и сервисов к ИИ-моделям и ассистентам (**Antigravity**, **OpenAI Codex**, **Claude Desktop**, **Cursor**).

---

## 🛠️ Список включенных серверов

| Сервер | Пакет | Описание и назначение |
| :--- | :--- | :--- |
| **`fetch`** | `@modelcontextprotocol/server-fetch` | Скачивание веб-страниц, документации библиотек, JSON API без открытия браузера. |
| **`puppeteer`** | `@modelcontextprotocol/server-puppeteer` | Автоматизация браузера Chromium: скриншоты вёрстки, клики, тестирование веб-приложений. |
| **`github`** | `@modelcontextprotocol/server-github` | Управление репозиториями: создание веток, коммитов, pull request, загрузка `.exe` в GitHub Releases. |
| **`filesystem`** | `@modelcontextprotocol/server-filesystem` | Безопасная работа с файловой системой рабочей области. |
| **`sqlite`** | `@modelcontextprotocol/server-sqlite` | Прямое чтение и выполнение запросов к локальным базам SQLite. |

---

## 🚀 Как подключить серверы

### 1. В Google Antigravity
Файл конфигурации уже скопирован в глобальный каталог:
```
~/.gemini/config/mcp_config.json
```
Все серверы активируются автоматически при запуске агента.

### 2. В Claude Desktop
Откройте меню **Settings > Developer > Edit Config** (`claude_desktop_config.json`) и вставьте содержимое [`mcp_config.json`](./mcp_config.json):
```json
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

### 3. В Cursor / Windsurf
Перейдите в **Settings > Features > MCP Servers** и укажите путь к `mcp/mcp_config.json` или добавьте команды через `npx`.

### 4. В OpenAI Codex / Custom Agent
Для автономных агентов инструменты вызываются через `npx` с протоколом JSON-RPC по Stdio (стандартному вводу-выводу).
