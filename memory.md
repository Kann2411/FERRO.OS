# FERRO.OS — Memory del Agente

> Archivo de memoria del proyecto. Cada tarea completada debe marcarse aquí.
> Objetivo: no perder contexto entre sesiones ni agentes.

## Estado general

- **Fase actual:** Fixes visuales (antes de empezar la implementación).
- **Dirección:** Completar los fixes visuales paso a paso, con push y revisión, antes de codificar.

## Fixes completados

- [x] **Fix #1 — Migración de colores hardcoded → tokens semánticos** (commit `9f29c9f`, merge `6702ab7`, push a `origin/main`)
  - Añadidos tokens semánticos (`--border`, `--border-strong`, `--surface-2/3`, `--subtle`, `--accent-foreground`, `--signal`) en `src/app/globals.css`, `src/lib/theme.ts`, `src/providers/theme-provider.tsx`.
  - Migrados ~200 usos de hardcoded (`bg-white/10`, `border-white/10`, `bg-[#121212]`, `bg-black/20`, `text-white`, gradients) por tokens semánticos.
  - Verificado: 0 matches de colores hardcoded en `src/`.
  - Merge resuelto con el remoto (18 commits de fases del usuario) tomando su versión como base y re-aplicando la migración.

- [x] **Fix #2 — `@keyframes blink` faltante** (commit `a1516d8`)
  - Añadido `@keyframes blink` (opacity 1↔0, 1s step-end) en `src/app/globals.css`.
  - Referencia usada por el caret del terminal (`src/features/terminal/components/terminal-module.tsx`).

## Fixes pendientes

- [ ] **Fix #3 — Próximo fix visual pendiente.**

## Contexto clave (no perder)

- El proyecto es un portfolio en forma de OS ("FERRO.OS") con módulos de features.
- **Next.js con breaking changes:** leer `node_modules/next/dist/docs/` antes de escribir código.
- Demo de referencia: `D:\Kann\Desktop\Documentos\Proyectos\Demo_F_OS` (Vite + Nitro, puerto 8080).
- El usuario comunica en español; responder en español.
- El usuario hace push de fases; el clon local puede quedar detrás — hacer `git pull` antes de push.
- El entorno no tiene dependencias instaladas (no correr lint/typecheck/build).
