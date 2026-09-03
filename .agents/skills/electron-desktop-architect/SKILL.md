---
name: electron-desktop-architect
description: >-
  Electron desktop application design: process isolation, contextBridge, secure IPC, native menus, and auto-updater.
---

# Electron Desktop Architect Skill

## Core Principles
- **Zero Node in Renderer**: Always set `nodeIntegration: false` and `contextIsolation: true`.
- **Typed IPC**: Expose narrow, validated functions via `contextBridge.exposeInMainWorld`.
- **Performance**: Delay background window creation and throttle background frame rates.
