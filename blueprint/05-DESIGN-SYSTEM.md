---
Document: 05-DESIGN-SYSTEM
Project: FERRO.OS
Version: 1.1.0
Status: Active
Last Updated: 2026-09-15
Author: Kristian Kamilo Ferrin
---

# 05 - DESIGN SYSTEM

> "Design is not decoration. Design is the operating system's language."

---

# Philosophy

FERRO.OS should feel like a luxury operating system built for developers, musicians and creators.

It should never resemble:

• Windows

• macOS

• Linux

• Ubuntu

• GNOME

• KDE

Instead, it must feel like something that belongs in a futuristic music production studio.

Imagine:

Blade Runner

+

Ableton Live

+

VSCode

+

Tesla UI

+

Nothing OS

+

Luxury audio hardware

Everything should communicate elegance, precision and technology.

---

# Core Principles

Every interface must follow these principles.

✓ Minimal

✓ Cinematic

✓ Premium

✓ Interactive

✓ Responsive

✓ Alive

✓ Elegant

✓ Fast

---

# Color Palette

## Primary

FERRO RED

#D90429

Used for:

Buttons

Important actions

Active windows

Explorer progress

Achievements

System highlights

---

## Background

MIDNIGHT BLACK

#090909

Main desktop.

---

## Surface

CARBON

#141414

Cards

Windows

Panels

Dock

---

## Secondary Surface

GRAPHITE

#1F1F1F

Containers

Dialogs

Settings

---

## Surface Tiers (implemented)

> **Implementation note (2026-09-15):** the shipped token set (`src/lib/theme.ts`,
> `src/app/globals.css`) is more granular than the single "Surface"/"Secondary Surface"
> pair above — panels needed a middle tier between flat surfaces and raised/elevated ones.

Surface 2

`#17171a` (dark) · used for slightly raised panels between Surface and Surface 3.

Surface 3

`#1f1f24` (dark) · used for the most elevated/raised panel tone (`panelVariants({ tone: "raised" })`).

Signal

`#3d9b84` (dark) · the "completed" color across the mission HUD and signal map — deliberately
not FERRO RED, so completed progress reads as distinct from the brand's "active/attention" red.

Muted / Subtle

Two additional text-and-fill tiers below Secondary Text, used for kickers, timestamps, and
inactive signal-map nodes.

Border / Border Strong

Two border-opacity tiers (`rgb(248 248 248 / 0.1)` and `/ 0.18`) replacing ad hoc `border-white/10`
literals with named tokens.

---

## Accent

PURE WHITE

#F8F8F8

Titles

Icons

Important information

---

## Text

Primary

#FFFFFF

Secondary

#B5B5B5

Disabled

#6F6F6F

---

## Success

#00C853

---

## Warning

#FFB300

---

## Error

#FF1744

---

# Theme Modes

> **Implementation note (2026-09-15):** this document was originally written entirely in
> terms of a single dark palette, with no light variant ever mentioned. FERRO.OS ships with
> both a dark mode (the palette above, and the default) and a light mode, toggled from the
> shell header and persisted (`src/store/theme-store.ts`, `src/lib/theme.ts`). This is a
> deliberate divergence, not an oversight: a portfolio is judged in whatever lighting and
> display conditions a recruiter or client happens to be in, and forcing dark-only would
> fight readability for some visitors instead of serving the "premium software" feeling this
> document asks for. Every token in the Color Palette above has a light-mode counterpart —
> same names, same roles, inverted luminance — so the rest of this design system (radii,
> shadows, blur, motion) applies unchanged in both modes.

---

# Typography

> **Implementation note (2026-09-15):** shipped with Outfit + IBM Plex Mono instead of the
> Inter pairing originally envisioned below — both are variable Google Fonts loaded via
> `next/font/google` in `src/app/layout.tsx` (`--font-display-sans`, `--font-display-mono`),
> chosen for the same "precise, technical, premium" feel this document calls for, with
> better variable-weight range for the display sizes used across the HUD and welcome sequence.

Primary Font

Outfit

Purpose

Entire interface.

---

Secondary Font

IBM Plex Mono

Purpose

Terminal

Code

Developer panels

Logs

---

Display Font

Outfit (600–700 weight)

Only used for

FERRO.OS

FERRO CORE

Major titles

---

# Icon System

Icons

Material Symbols Rounded

Rules

Always outlined.

Never colorful.

Only active icon becomes red.

---

# Borders

Standard Radius

16px

Floating Buttons

24px

Dock

28px

Cards

20px

Windows

18px

---

# Shadows

Everything floats.

Nothing is flat.

Windows

Soft shadow.

Dock

Large ambient shadow.

FERRO CORE

Strong red glow.

Notifications

Small elevation.

---

# Blur System

Glassmorphism is used everywhere.

Standard Blur

30px

Heavy Blur

50px

Popup Blur

60px

Transparency

40% to 70%.

---

# Window System

Every module opens inside floating windows.

Properties

Draggable

Resizable (future)

Animated

Blur background

Rounded

Shadow

Each window remembers:

Position

Size

State

Opened modules

---

# Animations

Animations should feel physical.

Duration

Fast

150ms

Normal

250ms

Slow

500ms

Never exceed

700ms

---

# Motion Language

Everything has weight.

Windows slide.

Dock reacts.

Buttons breathe.

Cards float.

Mouse produces light.

Nothing appears instantly.

Everything fades.

---

# Mouse Effects

Mouse Glow

Soft red radial light.

Tracks cursor.

Opacity changes on hover.

---

Hover States

Every interactive element responds.

Examples

Scale

Glow

Border

Elevation

Blur

---

Click Feedback

Small compression.

Sound.

Glow pulse.

---

# Particle System

Desktop contains ambient particles.

Properties

Slow.

Subtle.

Red.

White.

Transparent.

Never distracting.

---

# Ambient Audio

FERRO.OS is almost silent.

Only small interface sounds.

Examples

Window opens.

Module unlocks.

Achievement unlocked.

Dock click.

Notification.

Typing.

Everything inspired by premium hardware.

---

# Sound Design

Music Studio

Mechanical sounds.

Developer modules

Digital sounds.

Explorer

Soft synths.

Achievements

Retro game inspiration.

FERRO CORE

Deep cinematic voice.

---

# Dock

Center aligned.

Floating.

Glass.

Responsive.

Magnifies on hover.

Contains

Desktop

Projects

Music Studio

Resume

Skills

Settings

FERRO CORE

Explorer

AI Lab

---

# Notifications

Top Right.

Glass cards.

Auto dismiss.

Appear smoothly.

Never intrusive.

---

# Wallpaper

Wallpaper is alive.

Preferred style

Luxury recording studio.

Dark.

LED red lighting.

Multiple monitors.

Studio speakers.

Mechanical keyboards.

Code.

Synthesizers.

No humans.

Wallpaper slowly moves using parallax.

---

# Visual Effects

Supported effects

Bloom

Glow

Blur

Particles

Gradient lighting

Noise texture

Parallax

Glass reflections

Audio reactive effects

---

# Accessibility

Every interaction must support:

Keyboard navigation

Reduced motion mode

High contrast mode

Screen readers

Responsive scaling

---

# Responsive Design

FERRO.OS adapts like a real OS.

Desktop

Full experience.

Tablet

Floating windows reorganize.

Mobile

Modules become fullscreen.

Dock transforms into bottom navigation.

Nothing breaks.

---

# Design Rule

If a screen feels like a website...

It is wrong.

If a screen feels like software...

It is correct.

---

# Final Principle

Users should forget they are inside a browser.

For a few minutes...

They should believe FERRO.OS actually exists.