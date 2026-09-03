---
name: windows-desktop-native
description: >-
  Procedures for building, compiling, and packaging native Windows desktop applications (.exe),
  Electron runtimes, C#/.NET native wrappers, Windows App Mode shortcuts, and desktop integration.
  Use when creating, compiling, or optimizing software for Windows OS.
---

# Windows Desktop Native Development Skill

This skill provides the blueprint for building genuine Windows desktop software with zero external dependencies, clean binary generation, and rich desktop experience.

---

## 1. Native Windows Executable (.EXE) Compilation
- **Zero-Download C# Compiler (`csc.exe`)**:
  - Located on all standard Windows installations at:
    `C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe`
  - Compile flags for silent, clean window apps:
    `csc.exe /target:winexe /optimize+ /out:App.exe /reference:System.Windows.Forms.dll,System.Drawing.dll Program.cs`
  - `/target:winexe` ensures no black command prompt window flashes when launching.

---

## 2. Dedicated Windows Standalone App Window
- **App Mode Execution**:
  - Launching Chromium / Microsoft Edge with `--app=http://localhost:[port]` provides an isolated window frame with native min/max/close controls, no address bar, no tabs, and isolated local storage (`--user-data-dir`).
  - Native taskbar integration and custom window sizing (`--window-size=WIDTH,HEIGHT`).

---

## 3. Desktop Shortcuts & Shell Integration
- **Windows Script Host (WScript.Shell)**:
  - Generate desktop `.lnk` shortcuts directly via PowerShell / COM objects.
  - Set working directory, target path, and descriptions for seamless double-click launches.
