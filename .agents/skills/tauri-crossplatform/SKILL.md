---
name: tauri-crossplatform
description: >-
  Tauri 2.0 desktop development: Rust backend, system tray, native file dialogs, and minimal binary size.
---

# Tauri Cross-Platform Desktop Skill

## Core Principles
- **Rust Backend Handlers**: Expose secure commands via `#[tauri::command]` with typed serialization.
- **Scope Restriction**: Confine file system access strictly to designated application data directories.
- **Minimal Footprint**: Leverage OS native WebViews to produce sub-10MB desktop binaries.
