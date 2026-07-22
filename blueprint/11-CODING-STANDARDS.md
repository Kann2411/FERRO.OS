---
Document: 11-CODING-STANDARDS
Project: FERRO.OS
Version: 1.0.0
Status: Active
Last Updated: 2026-07-22
Author: Kristian Kamilo Ferrin
---

# 11 - CODING STANDARDS

> "Clean code creates believable worlds."

---

# Purpose

This document defines the coding standards for FERRO.OS.

Every line of code written for this project must follow these rules.

Consistency is more important than personal preference.

---

# General Principles

Code must be:

Readable

Simple

Reusable

Typed

Scalable

Predictable

Maintainable

Self-explanatory

Avoid clever code.

Prefer obvious code.

---

# Architecture First

Architecture is always more important than implementation.

Never write code before understanding:

- the Blueprint
- the module
- the Explorer System
- the Design System

If a feature breaks the architecture...

The architecture wins.

---

# Language

Everything inside the codebase is written in English.

Examples

Folders

```
modules/
components/
services/
hooks/
```

Variables

```
currentMission
playerLevel
explorationProgress
```

Functions

```
openWindow()

unlockAchievement()

completeMission()
```

Types

```
Project

Mission

Achievement
```

Documentation may be bilingual if necessary.

---

# TypeScript Rules

Never use:

```
any
```

Prefer

```
unknown
```

or proper interfaces.

Everything must be typed.

---

# Interfaces

Use interfaces for objects.

```
interface Project {
    id: string;
    title: string;
    description: string;
}
```

Never use anonymous object types repeatedly.

---

# Components

Every component has one responsibility.

Bad

```
Desktop.tsx

700 lines
```

Good

```
Desktop.tsx

Dock.tsx

Window.tsx

Wallpaper.tsx

ExplorerHUD.tsx

AmbientParticles.tsx
```

---

# Folder Structure

Each feature follows the same structure.

```
feature/

components/

hooks/

services/

stores/

types/

constants/

utils/
```

No exceptions.

---

# React Rules

Prefer Functional Components.

Never use Class Components.

Prefer composition over inheritance.

Keep components small.

---

# Hooks

Hooks only contain reusable logic.

Never return JSX.

Good

```
useExplorer()

useDesktop()

useDock()

useAchievements()
```

---

# State Management

React State

↓

Component State

Zustand

↓

Global State

TanStack Query

↓

Server State

Never mix them.

---

# Services

Services communicate with APIs.

Nothing else.

Good

```
projects.service.ts

resume.service.ts

music.service.ts
```

Never manipulate UI inside services.

---

# Stores

Stores manage application state.

Stores never fetch data directly.

Stores never render UI.

---

# Utils

Utils are pure functions.

No side effects.

Example

```
formatTime()

calculateXP()

generateWindowPosition()
```

---

# Constants

Magic numbers are forbidden.

Bad

```
width = 642
```

Good

```
DESKTOP_PADDING

WINDOW_MIN_WIDTH

DOCK_HEIGHT
```

---

# Styling

TailwindCSS only.

Never write huge class lists repeatedly.

Extract reusable UI components.

Example

Instead of repeating

```
rounded-xl
border
backdrop-blur-xl
shadow-lg
```

Create

```
GlassPanel
```

---

# Icons

Material Symbols only.

No random icon libraries.

Icons follow module identity.

Example

Studio

🎵

Projects

📁

Terminal

>

Resume

📄

AI

🤖

---

# Animations

Animations communicate state.

Never animate without purpose.

Allowed

Hover

Open

Close

Unlock

Mission Complete

Notification

Progress

Window Focus

Forbidden

Random bouncing

Infinite spinning

Distracting effects

---

# Colors

Never hardcode colors.

Always use the Design System.

Bad

```
text-red-500
```

Good

```
text-primary

bg-surface-container

border-outline
```

---

# Responsive Design

Desktop First.

Tablet Second.

Mobile Last.

FERRO.OS is primarily a desktop experience.

---

# Accessibility

Every interactive element needs:

Keyboard support

Focus state

ARIA labels

Readable contrast

Reduced motion support

Accessibility is required.

---

# Performance

Lazy load modules.

Memoize expensive calculations.

Avoid unnecessary re-renders.

Optimize assets.

Split bundles.

Target:

60 FPS

---

# Backend Communication

Never fetch directly inside components.

Flow

```
Component

↓

Hook

↓

Service

↓

API
```

Always.

---

# Error Handling

Never expose raw backend errors.

Use friendly system messages.

Example

Instead of

```
500 Internal Server Error
```

Display

```
System Module Failed

Retry Connection
```

---

# Logging

Development

```
console.log()
```

Allowed.

Production

Forbidden.

Use logger utilities.

---

# Comments

Only explain WHY.

Never explain WHAT.

Bad

```ts
// Increase level
level++;
```

Good

```ts
// Level increases here because achievements are cumulative
level++;
```

---

# Git Commits

Use Conventional Commits.

Examples

```
feat(desktop): create desktop environment

feat(studio): add audio engine

fix(window): preserve focus order

refactor(explorer): simplify XP calculation

docs(blueprint): update architecture

style(dock): improve hover animation
```

---

# Branches

Never work directly on main.

Example

```
feature/desktop

feature/studio

feature/explorer

feature/backend-auth
```

---

# Pull Requests

Every PR must answer

What changed?

Why?

Screenshots?

Architecture affected?

Documentation updated?

---

# Testing

Critical logic must be tested.

Explorer Engine

Achievements

XP System

Mission Engine

Authentication

API

Window Manager

---

# Documentation

Every new feature updates:

Blueprint

Architecture

Roadmap

README (if needed)

Documentation is part of development.

---

# Code Review Checklist

Before merging:

✓ Typed

✓ Reusable

✓ Responsive

✓ Accessible

✓ No duplicated code

✓ Architecture respected

✓ Performance considered

✓ Documentation updated

✓ Naming conventions respected

✓ Feature tested

---

# Final Principle

Every line of code should make FERRO.OS easier to maintain than it was before.

Code is not written only for machines.

It is written for future developers.

Including yourself.