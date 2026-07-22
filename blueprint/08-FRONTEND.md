---
Document: 08-FRONTEND
Project: FERRO.OS
Version: 1.0.0
Status: Active
Last Updated: 2026-07-22
Author: Kristian Kamilo Ferrin
---

# 08 - FRONTEND

> "The frontend is not a website.
> It is the operating system."

---

# Philosophy

FERRO.OS is built as a desktop operating system running inside the browser.

Users should never feel they are navigating pages.

Instead...

They explore a digital world.

Everything behaves like software.

Nothing behaves like a traditional website.

---

# Technology Stack

Framework

Next.js (App Router)

Language

TypeScript

Styling

TailwindCSS

Animations

Framer Motion

State Management

Zustand

Data Fetching

TanStack Query

Icons

Material Symbols Rounded

Audio

Howler.js

3D / GPU

Three.js (Future)

Effects

React Use

Build Tool

Turbopack

Package Manager

pnpm

---

# Folder Structure

```
src/

│

├── app/
│   ├── desktop/
│   ├── modules/
│   ├── api/
│   ├── globals.css
│   └── layout.tsx
│

├── components/
│
├── modules/
│
├── engine/
│
├── hooks/
│
├── stores/
│
├── services/
│
├── lib/
│
├── utils/
│
├── assets/
│
├── types/
│
└── constants/
```

---

# Components

Components are divided into categories.

```
components/

Desktop/

Dock/

Window/

Buttons/

Cards/

Panels/

Explorer/

Notifications/

Dialogs/

Forms/

Terminal/

Studio/

Projects/

Shared/
```

Every component must be reusable.

---

# Modules

Each module is isolated.

```
modules/

desktop/

projects/

resume/

skills/

timeline/

music/

studio/

terminal/

settings/

explorer/

ai-lab/
```

Modules never depend directly on each other.

Communication happens through shared stores.

---

# Engine

FERRO.OS is powered by independent engines.

```
engine/

desktop-engine/

window-engine/

exploration-engine/

audio-engine/

notification-engine/

achievement-engine/

animation-engine/

theme-engine/
```

Every engine has a single responsibility.

---

# Desktop Engine

Responsible for:

Wallpaper

Desktop Icons

Dock

Clock

Ambient effects

Particles

Mouse glow

Wallpaper state

Explorer HUD

---

# Window Engine

Responsible for

Opening windows

Closing windows

Dragging

Focus

Z-index

Minimize

Restore

Fullscreen (future)

Window persistence

---

# Exploration Engine

Tracks

Visited modules

Secrets

Progress

Achievements

Unlocks

Current mission

Hidden discoveries

Communicates with FERRO CORE.

---

# Audio Engine

Controls

Ambient music

Button sounds

Window sounds

Achievements

Terminal typing

Music previews

Visualizer

Everything audio-related lives here.

---

# Notification Engine

Responsible for

System notifications

Achievements

Warnings

Mission updates

Unlock messages

Stack management

Animations

---

# Animation Engine

Centralizes

Transitions

Motion presets

Spring physics

Hover effects

Window animations

Dock animations

Particle animations

Future cinematic effects

---

# Global State

Managed with Zustand.

Stores

System Store

Explorer Store

Desktop Store

Dock Store

Window Store

Audio Store

Notification Store

Mission Store

Theme Store

---

# API Communication

Frontend never talks directly to the database.

Always through services.

```
services/

projects.service.ts

music.service.ts

resume.service.ts

explorer.service.ts

skills.service.ts

terminal.service.ts
```

Components never perform fetch requests directly.

---

# Routing

Although Next.js uses routes...

FERRO.OS behaves like one application.

Main routes

```
/

admin/

api/
```

Everything else is handled internally.

---

# Lazy Loading

Modules load only when needed.

Desktop loads instantly.

Projects load when opened.

Music loads when requested.

AI Lab loads only after unlocking.

This keeps performance high.

---

# Assets

```
assets/

wallpapers/

sounds/

icons/

images/

music/

videos/

fonts/
```

Assets are organized by category.

---

# Styling Rules

No inline styles.

Tailwind utilities only.

Complex styles belong to component classes.

Design tokens are centralized.

---

# Theme System

Current Theme

Dark

Future Themes

Red

Blue

White

Cyberpunk

Developer Mode

Everything configurable.

---

# Performance Goals

First Paint

< 1 second

Desktop Interactive

< 2 seconds

Module Opening

< 200ms

Animations

60 FPS

Memory Efficient

---

# Responsive Design

Desktop

Native experience.

Tablet

Optimized windows.

Mobile

Mobile operating system mode.

The experience changes.

Not simply resized.

---

# Accessibility

Keyboard navigation.

Reduced motion.

Screen reader support.

Focus indicators.

High contrast mode.

---

# Error Handling

Broken modules never crash FERRO.OS.

Fallback windows appear.

FERRO CORE explains what happened.

Example

"Projects module temporarily unavailable."

---

# Development Rules

Every module is independent.

No duplicated code.

Hooks contain logic.

Components contain presentation.

Stores contain state.

Services communicate with the API.

Engines coordinate behavior.

---

# Future Technologies

Three.js

Electron

PWA

Offline Mode

WebGPU

Voice Commands

Multi-language

AI Assistant

Cloud Synchronization

Plugin Marketplace

---

# Final Principle

The frontend is responsible for making visitors forget they are inside a browser.

Everything should feel alive.

Everything should feel premium.

Everything should feel like FERRO.OS.