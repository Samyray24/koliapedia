---
name: csharp-dotnet-desktop
description: >-
  C# and .NET 8 desktop software: WPF, WinUI 3, Windows Forms, MVVM architecture, and single-file executable publishing.
---

# C# & .NET 8 Desktop Skill

## Core Principles
- **MVVM Separation**: Keep view models independent of UI frameworks using CommunityToolkit.Mvvm.
- **Single File Publishing**: Configure `PublishSingleFile=true` and `SelfContained` for zero-dependency distribution.
- **Asynchronous UI**: Never block the UI thread; execute background work via `Task.Run` and await.
