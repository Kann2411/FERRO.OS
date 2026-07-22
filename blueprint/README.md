---
Document: README
Project: FERRO.OS
Version: 1.0.0
Status: Active
Last Updated: 2026-07-22
Author: Kristian Kamilo Ferrin
---

# FERRO.OS Blueprint

> "Before writing code, understand the system."

---

# Purpose

The Blueprint is the complete design specification of FERRO.OS.

It contains every decision regarding:

- Vision
- Architecture
- User Experience
- Design System
- Exploration Mechanics
- Modules
- Frontend
- AI Development Rules
- Coding Standards
- Roadmap

This documentation is the single source of truth for the entire project.

If something is not documented here, it should not be implemented.

---

# Reading Order

Every developer (human or AI) should read the Blueprint in this order:

```
00-VISION.md
```

Understand what FERRO.OS is.

↓

```
01-CORE-LORE.md
```

Understand the story.

↓

```
02-ARCHITECTURE.md
```

Understand the architecture.

↓

```
03-EXPLORATION-SYSTEM.md
```

Understand the experience.

↓

```
04-MODULES.md
```

Understand the modules.

↓

```
05-DESIGN-SYSTEM.md
```

Understand the visual language.

↓

```
06-GAMEPLAY.md
```

Understand the interaction model.

↓

```
07-BACKEND.md
```

Understand backend responsibilities.

↓

```
08-FRONTEND.md
```

Understand frontend architecture.

↓

```
09-ROADMAP.md
```

Understand milestones.

↓

```
10-AI-DEVELOPMENT.md
```

Understand how AI must collaborate.

↓

```
11-CODING-STANDARDS.md
```

Understand coding rules.

↓

```
12-AI-CONTEXT.md
```

Understand project context before writing code.

---

# Repository Structure

```
FERRO.OS
│
├── blueprint/
│
├── app/
│
├── components/
│
├── modules/
│
├── shared/
│
├── hooks/
│
├── services/
│
├── stores/
│
├── types/
│
├── utils/
│
├── assets/
│
├── public/
│
└── package.json
```

The backend is intentionally **NOT** part of this repository.

FERRO.API is an independent project.

---

# Technology Stack

Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- Framer Motion
- Zustand
- React Query
- pnpm

Backend

Independent repository:

FERRO.API

---

# Development Workflow

Every feature follows the same lifecycle:

```
Blueprint
↓

Planning

↓

Architecture

↓

Implementation

↓

Refactor

↓

Polish

↓

Commit

↓

Next Milestone
```

No feature skips this process.

---

# Milestone Workflow

Development must strictly follow the roadmap.

Current order:

✅ Blueprint

⬜ Project Foundation

⬜ Desktop Engine

⬜ Window Engine

⬜ FERRO CORE

⬜ Developer Modules

⬜ Music Modules

⬜ Exploration Engine

⬜ Terminal

⬜ Backend Integration

⬜ Audio Engine

⬜ Animation Engine

⬜ Hidden Content

⬜ Optimization

⬜ Launch

No milestone should begin before the previous one is complete.

---

# AI Instructions

Any AI agent working on FERRO.OS must:

- Read the Blueprint before generating code.
- Respect the project architecture.
- Never invent new patterns.
- Never modify the architecture without approval.
- Implement only one milestone at a time.
- Prioritize maintainability over speed.
- Keep components reusable.
- Avoid unnecessary complexity.
- Document significant architectural decisions.

The Blueprint always has higher priority than assumptions.

---

# Core Philosophy

FERRO.OS is not a website.

It is not a dashboard.

It is not an operating system clone.

FERRO.OS is an interactive portfolio disguised as a futuristic operating system.

Visitors are not users.

They are explorers.

Every interaction should feel intentional.

Every animation should have meaning.

Every module should tell a story.

Technology is the medium.

Experience is the product.

---

# Project Status

Current Version

```
v1.0.0
```

Blueprint

```
100% Complete
```

Development

```
Phase 1
Project Foundation
```

Status

```
Ready for Development
```

---

# Final Principle

> "The Blueprint defines the vision.
>
> The code exists to faithfully bring that vision to life."