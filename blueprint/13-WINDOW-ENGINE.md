---
Document: 13-WINDOW-ENGINE
Project: FERRO.OS
Version: 1.0.0
Status: Active
Last Updated: 2026-07-22
Author: Kristian Kamilo Ferrin
---

# 13 - WINDOW ENGINE

> "A window is not just a container.
> It is a living workspace."

---

# Purpose

The Window Engine is responsible for managing every window inside FERRO.OS.

It is the foundation that makes the portfolio behave like a real operating system instead of a traditional website.

Every application, module and experience inside FERRO.OS will live inside a desktop window managed by this engine.

The Window Engine must be reusable, scalable and independent from every module.

---

# Philosophy

A window is **not** a React component.

A window is a system entity.

Each window has:

- Identity
- State
- Position
- Size
- Focus
- Layer
- Lifecycle
- History

The content inside the window is completely independent.

The Window Engine never knows what it is rendering.

It only manages windows.

---

# Responsibilities

The Window Engine is responsible for:

✓ Opening windows

✓ Closing windows

✓ Focusing windows

✓ Moving windows

✓ Managing z-index

✓ Remembering position

✓ Preventing duplicate windows

✓ Rendering window animations

✓ Keeping desktop order

The engine must never contain business logic from any module.

---

# Window Lifecycle

Every window follows the same lifecycle.

```
Closed

↓

Opening

↓

Active

↓

Focused

↓

Blurred

↓

Closing

↓

Destroyed
```

A window should never jump directly between unrelated states.

Every transition must be intentional.

---

# Architecture

```
Desktop

│

├── Wallpaper

├── Ambient Effects

├── Desktop Icons

├── Window Manager
│       │
│       ├── Window
│       ├── Window
│       ├── Window
│       └── Window
│
├── Notifications

├── Context Menus

└── Dock
```

Desktop never controls windows.

Desktop only renders the Window Manager.

---

# Window Manager

The Window Manager is the brain of the system.

Responsibilities:

- Register windows
- Destroy windows
- Focus windows
- Sort windows
- Restore windows
- Update window positions
- Maintain window stack

Only one Window Manager can exist.

---

# Window Composition

Every window follows the same structure.

```
DesktopWindow

├── Header
│
├── Controls
│
├── Body
│
└── Shadow
```

The body receives a module.

Example:

```
DesktopWindow

↓

Projects Module
```

or

```
DesktopWindow

↓

Music Studio Module
```

The window never knows which module it is rendering.

---

# Window State

Every window instance stores:

- id
- module
- title
- state
- x
- y
- width
- height
- zIndex
- focused
- draggable
- closable
- resizable
- minimized
- maximized
- metadata

The Window Engine owns this information.

Modules never modify it directly.

---

# Global Store

The engine owns a global store.

The store is the single source of truth.

Example:

```
windows[]

↓

WindowInstance

↓

WindowInstance

↓

WindowInstance
```

Every interaction updates the store.

The UI reacts automatically.

---

# Window Events

The engine is event-driven.

Core events:

OPEN_WINDOW

WINDOW_CREATED

WINDOW_FOCUSED

WINDOW_BLURRED

WINDOW_MOVED

WINDOW_UPDATED

WINDOW_CLOSED

WINDOW_DESTROYED

Future events can be added without changing the architecture.

---

# Focus System

Only one window can be focused.

When a window receives focus:

- It moves to the highest layer.
- It becomes active.
- Previous focused window becomes blurred.

The engine guarantees this rule.

---

# Z-Index Rules

Windows are ordered automatically.

Newest focused window is always rendered above the others.

No module should manually assign z-index values.

The Window Manager owns the stacking order.

---

# Window Position

Every window stores:

- X position
- Y position

Future versions will also remember:

- Previous size
- Previous workspace
- Previous monitor
- Previous session

---

# Layers

FERRO.OS renders UI in layers.

```
Layer 0
Wallpaper

↓

Layer 1
Ambient Background

↓

Layer 2
Desktop Icons

↓

Layer 3
Windows

↓

Layer 4
Dialogs

↓

Layer 5
Notifications

↓

Layer 6
Context Menus

↓

Layer 7
Cursor Effects

↓

Layer 8
System Overlay
```

No component should ignore this hierarchy.

---

# Animations

Opening

```
Opacity

0%

↓

100%
```

Scale

```
96%

↓

100%
```

Glow

```
Soft

↓

Normal
```

Closing

```
100%

↓

96%

↓

Fade Out
```

Animations should feel smooth, premium and physical.

Never exaggerated.

---

# Interaction Rules

Dragging starts only from the window header.

Dragging must never break the layout.

A window cannot leave the visible desktop area.

Focus always happens on click.

Closing always plays an animation.

No interaction should feel instantaneous.

Everything must feel intentional.

---

# Future Features

These features belong to future versions.

They must NOT be implemented during Phase 3.

- Resize
- Snap Layouts
- Fullscreen
- Minimize
- Maximize
- Split Screen
- Virtual Desktops
- Window Tabs
- Groups
- Multi Monitor
- Session Restore
- Window Pinning

---

# Definition of Done

The Window Engine is complete when:

✓ Windows can open.

✓ Windows can close.

✓ Windows can receive focus.

✓ Windows can move.

✓ Window order is managed automatically.

✓ Animations are smooth.

✓ Architecture is independent.

✓ Desktop does not contain window logic.

✓ Modules render inside windows without knowing the engine.

---

# Design Principles

The Window Engine must always be:

- Modular
- Predictable
- Event-driven
- Reusable
- Scalable
- Framework-agnostic in design
- Independent from business logic

---

# Final Principle

The Window Engine is the heart of interaction inside FERRO.OS.

If Desktop is the world,

FERRO CORE is the guide,

and Modules are the experiences,

then the Window Engine is the system that makes everything feel alive.