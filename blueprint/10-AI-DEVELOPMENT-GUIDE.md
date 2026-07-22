---
Document: 10-AI-DEVELOPMENT-GUIDE
Project: FERRO.OS
Version: 1.0.0
Status: Active
Last Updated: 2026-07-22
Author: Kristian Kamilo Ferrin
---

# 10 - AI DEVELOPMENT GUIDE

> "Every line of code should make FERRO.OS feel more alive."

---

# Purpose

This document defines how every AI agent must work on FERRO.OS.

It is not optional.

Every contribution must follow these rules.

Architecture always comes before implementation.

---

# Core Philosophy

FERRO.OS is not a portfolio.

FERRO.OS is not a dashboard.

FERRO.OS is not a landing page.

FERRO.OS is a fictional operating system.

Every decision must reinforce this illusion.

If a feature feels like a website...

Do not build it.

If it feels like software...

Build it.

---

# Development Workflow

Every task follows the same process.

Step 1

Understand the Blueprint.

↓

Step 2

Understand the architecture.

↓

Step 3

Propose improvements.

↓

Step 4

Wait for approval.

↓

Step 5

Implement.

↓

Step 6

Refactor.

↓

Step 7

Document.

No shortcuts.

---

# Before Writing Code

Every AI must answer:

What problem am I solving?

Does this already exist?

Can this be reused?

Does this respect the architecture?

Will this make FERRO.OS feel more alive?

Only then write code.

---

# Architecture Rules

Never create random folders.

Never duplicate logic.

Never bypass stores.

Never fetch inside components.

Never create giant files.

Never mix business logic with UI.

Always respect module boundaries.

---

# Folder Rules

Components

Only presentation.

Hooks

Only reusable logic.

Stores

Global state only.

Services

API communication only.

Engines

System behavior only.

Modules

Feature implementation only.

Utils

Pure functions only.

Constants

Static values only.

---

# Component Rules

Components must be:

Small

Reusable

Composable

Typed

Accessible

Documented

One responsibility only.

---

# Naming Convention

Components

PascalCase

```
Window.tsx
Dock.tsx
ExplorerHUD.tsx
```

Hooks

camelCase

```
useExplorer.ts

useWindow.ts
```

Stores

camelCase

```
explorer.store.ts

window.store.ts
```

Services

camelCase

```
projects.service.ts

resume.service.ts
```

Types

PascalCase

```
Project.ts

Achievement.ts
```

---

# State Management

Local state

React State

Shared state

Zustand

Server state

TanStack Query

Never mix responsibilities.

---

# Styling Rules

Tailwind only.

No inline styles.

No magic numbers.

No duplicated classes.

Reusable UI patterns.

Animations must be reusable.

---

# Animation Rules

Animations should never exist only for decoration.

Every animation must communicate something.

Examples

Window opening

Hover

Unlock

Notification

Progress

Discovery

Mission Complete

Everything has meaning.

---

# Window Rules

Every module opens inside a window.

Windows remember state.

Windows animate.

Windows never reload.

Desktop never disappears.

---

# Audio Rules

No loud sounds.

No autoplay music.

Everything subtle.

Audio supports immersion.

Never distracts.

---

# Performance Rules

Prefer lazy loading.

Avoid unnecessary renders.

Memoize expensive calculations.

Optimize images.

Keep bundle small.

Desktop must stay smooth.

---

# Accessibility

Keyboard navigation.

Visible focus.

Reduced motion.

ARIA labels.

Color contrast.

Accessibility is mandatory.

---

# Error Handling

Never expose raw errors.

Show beautiful fallback windows.

FERRO CORE explains failures.

Example

"Module temporarily unavailable."

---

# Git Workflow

Every feature

Own branch.

Small commits.

Clear messages.

Examples

```
feat(desktop): add ambient particles

fix(window): preserve window position

refactor(engine): simplify explorer logic

docs(blueprint): update roadmap
```

---

# Documentation Rules

Every important feature must update:

Blueprint

README

Architecture

API (if needed)

Code comments only when necessary.

Code should explain itself.

---

# AI Behavior

The AI is encouraged to:

Suggest improvements.

Detect inconsistencies.

Optimize architecture.

Reduce duplication.

Improve performance.

Question bad decisions.

The AI is NOT allowed to:

Invent architecture.

Ignore the Blueprint.

Break module boundaries.

Replace approved designs.

Change visual identity without approval.

---

# Decision Hierarchy

When conflicts appear:

Blueprint

↓

Architecture

↓

Design System

↓

Developer Instructions

↓

Implementation

Never invert this order.

---

# Code Quality Checklist

Before finishing a task:

✓ Architecture respected.

✓ Components reusable.

✓ No duplicated logic.

✓ Responsive.

✓ Accessible.

✓ Typed.

✓ Documented.

✓ Optimized.

✓ Tested (when applicable).

---

# Definition of Complete

A task is complete only if:

The feature works.

The code is clean.

The architecture is respected.

The Blueprint remains consistent.

The Explorer experience improves.

---

# Final Principle

FERRO.OS is built one intentional decision at a time.

Every commit should make the operating system feel more real.

Quality is never accidental.

It is designed.