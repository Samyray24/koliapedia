# 🌐 Model Context Protocol (MCP) — Серверы Инструментов (30 Серверов)

Model Context Protocol (MCP) — открытый отраслевой стандарт для подключения внешних инструментов, API, баз данных и системных сервисов к автономным ИИ-моделям (**Google Antigravity**, **OpenAI Codex**, **Claude Desktop**, **Cursor**, **Windsurf**).

---

## 🛠️ Полная таблица 30 MCP-серверов

| # | Идентификатор | Официальный пакет | Назначение и функционал |
| :---: | :--- | :--- | :--- |
| 1 | **`fetch`** | `@modelcontextprotocol/server-fetch` | Загрузка веб-страниц, документации библиотек, OpenAPI и REST API без UI. |
| 2 | **`puppeteer`** | `@modelcontextprotocol/server-puppeteer` | Автоматизация Chromium: визуальное тестирование, скриншоты, клики. |
| 3 | **`github`** | `@modelcontextprotocol/server-github` | Управление репозиториями: коммиты, PR, релизы, issue, поиск по коду. |
| 4 | **`filesystem`** | `@modelcontextprotocol/server-filesystem` | Локальные файловые операции (чтение/запись) с ограничением каталогов. |
| 5 | **`sqlite`** | `@modelcontextprotocol/server-sqlite` | Интроспекция и выполнение SQL-запросов к базам данных SQLite. |
| 6 | **`postgres`** | `@modelcontextprotocol/server-postgres` | Клиент PostgreSQL: чтение схем, индексов, выполнение запросов. |
| 7 | **`mysql`** | `mysql-mcp-server` | Клиент реляционных баз данных MySQL и MariaDB. |
| 8 | **`redis`** | `mcp-server-redis` | Проверка in-memory кэша Redis, инспекция ключей, TTL, очередей. |
| 9 | **`docker`** | `docker-mcp-server` | Управление Docker контейнерами, сборка образов, чтение логов. |
| 10 | **`kubernetes`** | `kubernetes-mcp-server` | Мониторинг кластеров K8s: Pods, Deployments, Services, ConfigMaps. |
| 11 | **`git`** | `mcp-server-git` | Локальные Git операции: diff, история коммитов, слияния веток. |
| 12 | **`terminal`** | `mcp-server-terminal` | Выполнение команд системного терминала и запуск CLI скриптов. |
| 13 | **`slack`** | `@modelcontextprotocol/server-slack` | Отправка сообщений, алертов и уведомлений в каналы Slack. |
| 14 | **`brave-search`** | `@modelcontextprotocol/server-brave-search` | Поиск актуальных технических статей и свежих данных в интернете. |
| 15 | **`google-maps`** | `@modelcontextprotocol/server-google-maps` | Геокодирование, расчёт маршрутов и расстояний через Google Maps. |
| 16 | **`memory`** | `@modelcontextprotocol/server-memory` | Графовая память долговременного контекста для ИИ-ассистента. |
| 17 | **`sequential-thinking`** | `@modelcontextprotocol/server-sequential-thinking` | Модуль пошаговой верификации гипотез и аналитического рассуждения. |
| 18 | **`everything`** | `@modelcontextprotocol/server-everything` | Эталонный тестовый сервер MCP со всеми типами примитивов. |
| 19 | **`gitlab`** | `@modelcontextprotocol/server-gitlab` | Управление проектами GitLab: Merge Requests, CI/CD пайплайны. |
| 20 | **`aws`** | `aws-mcp-server` | Инспекция облачных сервисов AWS (S3 бакеты, CloudWatch, Lambda). |
| 21 | **`cloudflare`** | `cloudflare-mcp-server` | Управление Cloudflare Workers, DNS записями и KV-хранилищами. |
| 22 | **`jira`** | `jira-mcp-server` | Синхронизация с Atlassian Jira: задачи, спринты, дефекты. |
| 23 | **`confluence`** | `confluence-mcp-server` | Поиск и создание документации в корпоративном Confluence. |
| 24 | **`notion`** | `notion-mcp-server` | Чтение и модификация страниц, баз данных и заметок в Notion. |
| 25 | **`elasticsearch`** | `elasticsearch-mcp-server` | Запросы и векторный поиск по кластерам Elasticsearch. |
| 26 | **`sentry`** | `sentry-mcp-server` | Отслеживание критических ошибок продакшена и стек-трейсов в Sentry. |
| 27 | **`npm`** | `npm-mcp-server` | Инспекция реестра npm, проверка версий пакетов и безопасности. |
| 28 | **`weather`** | `weather-mcp-server` | Получение прогнозов погоды и гео-метеорологических данных. |
| 29 | **`openapi`** | `openapi-mcp-server` | Автоматическая генерация инструментов ИИ из файлов Swagger/OpenAPI. |
| 30 | **`time`** | `time-mcp-server` | Работа со временем, конвертация часовых поясов и таймстампов. |

---

## 🚀 Способы подключения

Конфигурационный файл доступен в [`mcp/mcp_servers.json`](./mcp_servers.json).
Для подключения нужного сервера в свой клиент скопируйте секцию интересующего вас сервера в рабочий файл конфигурации вашего ИИ-агента (например, в Claude Desktop или Cursor).
