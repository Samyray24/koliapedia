---
name: cross-platform-cli-design
description: >-
  CLI tool development: argument parsing, interactive terminal prompts, progress bars, and stdout formatting.
---

# Cross-Platform CLI Tooling Skill

## Core Principles
- **POSIX Flags & Help**: Provide `--help` and `--version` on all commands.
- **Machine vs Human Output**: Check `process.stdout.isTTY` to output pretty tables for humans and raw JSON for scripts.
- **Exit Codes**: Return 0 on success, non-zero on failure with clear stderr diagnostics.
