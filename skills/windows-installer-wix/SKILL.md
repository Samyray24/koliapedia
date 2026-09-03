---
name: windows-installer-wix
description: >-
  Windows packaging and installers: Inno Setup, NSIS, WiX toolset, MSI/EXE packaging, and code signing.
---

# Windows Installer & Packaging Skill

## Core Principles
- **Clean Uninstallation**: Ensure registry entries, shortcuts, and app data are completely purged on uninstall.
- **UAC Elevation**: Request administrator privileges only during installation, running the app itself under standard user tokens.
- **Code Signing**: Sign binaries with Authenticode certificates to bypass Windows SmartScreen warnings.
