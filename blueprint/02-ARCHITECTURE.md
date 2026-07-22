# 02 — FERRO.OS Architecture

> "A great operating system is invisible.
> It simply makes everything feel connected."

---

# Philosophy

FERRO.OS is built as a modular operating system.

Although the user sees a single desktop, internally every feature is an independent module.

This architecture allows the project to grow forever without becoming difficult to maintain.

Everything should feel like installing new applications into an operating system.

---

# Repository Structure

FERRO.OS/
│
├── blueprint/
│
├── src/
│
├── public/
│
├── modules/
│
├── shared/
│
├── assets/
│
├── package.json
└── README.md

---

# Folder Responsibilities

## blueprint/

Contains the complete documentation.

Nothing inside blueprint runs.

Everything here explains how FERRO.OS works.

It is the project's "Bible."

---

## src/

Contains the application entry point.

Here we initialize:

- React
- NextJS
- Providers
- Router
- Audio Engine
- Exploration Engine
- Window Manager

Think of this folder as the operating system kernel.

---

## modules/

Every feature is an independent module.

Nothing inside a module should depend directly on another module.

Modules communicate through shared services.

Example:

modules/

Desktop/
Explorer/
Terminal/
Studio/
Projects/
Settings/
Profile/
Music/
AI/
Achievements/
System/
Dock/
Notifications/

Each module owns:

- components
- hooks
- services
- state
- animations
- sounds
- assets (if needed)

Every module should be installable or removable without breaking the rest of the OS.

---

## shared/

Contains everything reusable.

Example:

components/

Button

Window

Modal

Tooltip

DockIcon

WindowHeader

Card

TerminalText

hooks/

useAudio()

useWindow()

useExplorer()

useAchievement()

utils/

helpers

animations

constants

types

config

No business logic should live here.

Only reusable code.

---

## assets/

Global resources.

images/

icons/

sounds/

fonts/

wallpapers/

logo/

Shaders

Particles

Cursor

---

## public/

Static files.

favicon

robots

manifest

images

---

# Internal Architecture

FERRO.OS is divided into independent systems.

Core Systems

↓

Desktop Engine

↓

Window Manager

↓

Exploration Engine

↓

Achievement Engine

↓

Music Engine

↓

Audio Engine

↓

Animation Engine

↓

UI Components

Everything is layered.

Nothing should skip layers.

---

# Window System

Every application opens inside a Window.

Window

↓

Header

↓

Body

↓

Footer

Every window supports:

✓ Drag

✓ Resize

✓ Minimize

✓ Maximize

✓ Close

✓ Z-index

✓ Snap

✓ Focus

✓ Opening animation

✓ Closing animation

This is the heart of the operating system.

---

# Desktop

The Desktop is not a page.

The Desktop is the operating system itself.

Everything exists inside Desktop.

Desktop controls:

Wallpaper

Dock

Notifications

Clock

Explorer Progress

Mouse Effects

Particles

Ambient Sound

Opened Windows

Shortcuts

Hidden Objects

Secret Events

---

# Module Structure

Every module follows exactly the same structure.

Example:

modules/

Projects/

components/

hooks/

services/

store/

types/

utils/

assets/

pages/

index.ts

No exceptions.

Consistency is more important than cleverness.

---

# State Management

Local State

↓

Zustand

Global State

↓

Only for:

Desktop

Windows

Achievements

Progress

Settings

Audio

Never store UI state globally if it only belongs to one module.

---

# Routing

FERRO.OS behaves like an operating system.

The Desktop is always mounted.

Modules open as floating windows.

Routes only exist for:

/

/desktop

/loading

/about

Everything else lives inside the Desktop.

---

# Audio Architecture

Music is a first-class citizen.

The Audio Engine manages:

Ambient music

Hover sounds

Window sounds

Keyboard sounds

Achievement sounds

Studio playback

Synth effects

Future DAW features

Every sound should reinforce immersion.

---

# Animation System

Animations should feel premium.

Never flashy.

Inspired by:

Apple VisionOS

macOS

Linear

Framer

Nothing should "jump."

Everything should glide.

---

# Exploration Engine

The Exploration Engine is the soul of FERRO.OS.

It tracks:

Visited modules

Hidden interactions

Secret clicks

Keyboard shortcuts

Achievements

Progress

Unlockables

Curiosity

The user never receives instructions.

They discover.

---

# Scalability Rules

Before creating new code, ask:

Can this be a reusable component?

Can this become a module?

Can this become a service?

If the answer is yes...

Do not duplicate code.

---

# Golden Rules

✔ Every module is independent.

✔ Every animation has a purpose.

✔ Every sound tells a story.

✔ Every interaction rewards curiosity.

✔ Everything contributes to exploration.

✔ Documentation is always updated before major implementations.

---

# Architecture Goal

FERRO.OS should feel less like a portfolio...

and more like a real digital operating system.

Not a website.

A world.