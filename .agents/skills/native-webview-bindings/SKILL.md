---
name: native-webview-bindings
description: >-
  Lightweight desktop webview embedding: Microsoft Edge WebView2, WebKitGTK, and native C/C++ bridges.
---

# Native WebView Bindings Skill

## Core Principles
- **UserData Folder**: Set isolated user data directories to prevent profile collisions with regular browsers.
- **App Mode Execution**: Run browser runtimes with `--app=` flags for window-chrome-free interfaces.
- **Script Injection**: Use native `ExecuteScriptAsync` for bidirectional host-to-page communication.
