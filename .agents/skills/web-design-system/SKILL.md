---
name: web-design-system
description: >-
  Comprehensive guide and standard for modern web design, UI/UX engineering, design systems,
  responsive layouts, dark mode palettes, micro-interactions, and visual aesthetics.
  Use when designing or upgrading user interfaces, component libraries, typography, and interactive web elements.
---

# Modern Web Design & UI/UX Engineering Skill

This skill guides the creation and refinement of world-class, modern user interfaces with an emphasis on visual polish, intuitive usability, and cohesive design systems.

---

## 1. Visual Hierarchy & Typography
- **Font Pairings**: Combine a high-personality display font for titles (`Rubik`, `Syne`, `Cal Sans`) with an ultra-readable sans-serif for body copy (`Plus Jakarta Sans`, `Inter`, `Geist`).
- **Scale**: Use strict typographic scale (`text-xs` (12px), `text-sm` (14px), `text-base` (16px), `text-lg` (18px), `text-2xl` (24px), `text-4xl` (36px)).
- **Contrast & Legibility**: Maintain minimum 4.5:1 contrast ratio. For secondary text on dark backgrounds, use `text-slate-400` or `text-zinc-400`, never overly dim grays.

---

## 2. Color Architecture & Dark Mode Aesthetics
- **Surface Elevation**: In dark themes, avoid flat pitch black (`#000`). Use layered elevations:
  - Base canvas: `#0b0f19` or `slate-950`
  - Cards & containers: `slate-900/80` or `zinc-900/80` with backdrop blur
  - Elevated modals: `slate-900/95` with soft border glow (`border-slate-800` or accent borders)
- **Vibrant Accent Accents**:
  - Primary actions: Energetic gradients (e.g. `from-rose-500 to-amber-500` or `from-cyan-500 to-blue-600`)
  - Subdued accents: Pill badges with 15-20% background opacity and matching 30% border (`bg-cyan-500/20 text-cyan-300 border border-cyan-500/30`)

---

## 3. Micro-Interactions & Feedback Loops
- **Hover & Focus**: Every interactive control must provide visual feedback within 100ms.
  - Scale transforms: `hover:scale-102 active:scale-95 transition-all duration-150`
  - Shimmer / ambient highlights on card borders.
- **Audio Feedback**: Subtle Web Audio API pops and clicks on key user triggers to make applications feel tactile.
- **Celebration Triggers**: Confetti or particle bursts on accomplishments, level completions, and successful operations.

---

## 4. Responsive & Mobile-First Best Practices
- **Touch Targets**: Minimum 44x44px hit areas on touchscreens.
- **Dual Navigation**:
  - Desktop: Sticky top navbar with hotkeys and quick action launchers.
  - Mobile: Floating bottom navigation bar (`fixed bottom-0 left-0 right-0 z-40`) with icon + badge labels.
- **Desktop Extras**: Dedicated fullscreen controls, marquee news tickers, mouse follow glows, and global shortcut modals (`Ctrl+K`).
