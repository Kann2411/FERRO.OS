# FERRO.OS — Memory del Agente

> Archivo de memoria del proyecto. Cada tarea completada debe marcarse aquí.
> Objetivo: no perder contexto entre sesiones ni agentes.

## Estado general

- **Fase actual:** Implementación (diseño visual corregido en fixes #1–#7, ya completados).
- **Dirección:** Convertir los fixes visuales ya aplicados en código real de layout/componentes, una tarea a la vez.

## Fixes completados

- [x] **Fix #1 — Migración de colores hardcoded → tokens semánticos** (commit `9f29c9f`, merge `6702ab7`, push a `origin/main`)
  - Añadidos tokens semánticos (`--border`, `--border-strong`, `--surface-2/3`, `--subtle`, `--accent-foreground`, `--signal`) en `src/app/globals.css`, `src/lib/theme.ts`, `src/providers/theme-provider.tsx`.
  - Migrados ~200 usos de hardcoded (`bg-white/10`, `border-white/10`, `bg-[#121212]`, `bg-black/20`, `text-white`, gradients) por tokens semánticos.
  - Verificado: 0 matches de colores hardcoded en `src/`.
  - Merge resuelto con el remoto (18 commits de fases del usuario) tomando su versión como base y re-aplicando la migración.

- [x] **Fix #2 — `@keyframes blink` faltante** (commit `a1516d8`)
  - Añadido `@keyframes blink` (opacity 1↔0, 1s step-end) en `src/app/globals.css`.
  - Referencia usada por el caret del terminal (`src/features/terminal/components/terminal-module.tsx`).

- [x] **Fix #3 — Keyframes y tokens de animación faltantes** (commit `41aefdf`)
  - Añadidos `@keyframes` + utilidades: `boot-caret`, `toast-in`, `window-in`, `dock-pop` (+ `.boot-caret`, `.toast-in`, `.window-in`, `.dock-bounce`).
  - Añadidos tokens `--shadow-border`, `--shadow-border-hover`, `--ring` en `@theme`.

- [x] **Fix #4 — Nivel "Level 0" hardcodeado** (commit `64f9861`)
  - Sustituido por nivel calculado: `Math.max(1, Math.min(9, Math.floor(progress / 25) + 1))`, mismo patrón que `explorer-profile-card.tsx`.

- [x] **Fix #5 — Posiciones iniciales de ventanas solapadas** (commit `cd4096f`)
  - Reescritas `defaultPosition` en `src/features/window-system/registry/index.ts` para eliminar solapamientos.

- [x] **Fix #6 — Estado/ananimación de apertura de ventanas** (commit `8af56ea`)
  - `openWindow` ahora crea ventanas nuevas con `state: "opening"` (antes forzaba `"active"` aunque el default ya era `"opening"`).
  - `WindowShell` respeta `window.state === "opening"` para la animación inicial (`opacity/scale/y`), con fallback a sin animación si `prefersReducedMotion`.

- [x] **Fix #7 — Bugs de lógica de exploración** (commit `08b4a19`)
  - `completeMission` ahora valida el prerequisite de la cadena de misiones (no se puede saltar misiones).
  - Terminal: `talk-to-system` solo se completa con comandos reconocidos (no con comandos desconocidos/vacíos).
  - Escritorio: la misión `explore-desktop` ya no se completa por hover; se dispara al abrir ventanas (via `useMissionTriggers`).

## Fixes pendientes

- (Ninguno — fase de fixes visuales completada; siguiente fase: implementación del diseño).

## Tareas de implementación (fase actual)

- [x] **Task #1 — Layout general de la pantalla** (commit `78846e2`)
  - Shell reestructurado: raíz `h-dvh overflow-hidden` a pantalla completa, wrapper `h-full min-h-0 flex-col`, `main` como contenedor flexible (`lg:flex-row` con icons + panel explorador, columna en móvil).
  - Dock movido fuera del flujo de `main` y renderizado tras el `WindowManager`; variante desktop ahora `fixed bottom-0 left-0 right-0 z-30` (sm:flex) y móvil `fixed bottom-0 z-50 sm:hidden` (ya no muerto por wrapper oculto).
  - Boot screen (`fixed inset-0 z-80`), wallpaper ambiental (`absolute inset-0`) y status bar (header + StatusPanel) ya integrados en el shell.

- [x] **Task #2 — Ventana Projects** (commit `1180c1c`)
  - Solo cambios de layout/visual: grid de cards `sm:grid-cols-2 lg:grid-cols-3`, cards con `h-full` (alturas igualadas) y zoom de imagen al hover (`group-hover:scale-105`, 500ms).
  - Contenido sin tocar (8 proyectos, copy, datos intactos).

- [x] **Dock — solo botón Signal** (commit `b2be98e`)
  - Barra del dock (#1) ahora muestra solo el botón de Signal (`unlockedApps.filter((app) => app.windowId === "signal")`). No se eliminó la barra, solo el botón.

- [x] **Dock — tamaño ajustado** (commit `801ffb7`)
  - Barra del dock desktop: `left-0 right-0` → `left-1/2 -translate-x-1/2 w-fit` (se ajusta al tamaño del botón contenido, centrado).

- [x] **Dock — barra eliminada, solo botón Signal** (commit `b64fa94`)
  - Contenedor de la barra removido; solo queda el botón flotante redondo de Signal (wrapper invisible con `fixed bottom-0 left-1/2 z-30 hidden -translate-x-1/2 sm:flex`).

- [x] **Dock — botón elevado** (commit `4de60bb`)
  - Botón flotante de Signal: `bottom-0` → `bottom-4` (queda dentro de la pantalla, un poco más arriba del borde inferior).

- [x] **Fix #8 — Ventanas: off-screen al abrir / locura al abrir varias** (commit `9f555aa`)
  - `openWindow` ahora aplica `getViewportSafePosition` al abrir (clamp a viewport → no se salen de pantalla).
  - Revertido el Fix #6: `openWindow` vuelve a crear con `state: "active"` y `WindowShell` vuelve al `initial` estático (sin ramas por `window.state === "opening"`), restaurando el comportamiento anterior de apertura.

- [x] **Fix #9 — Módulos Curriculum (Resume) y Habilidades (Skills) no abren al hacer click** (resuelto vía Fix #8)
  - Causa probable: posiciones default off-screen (`resume` y `skills` con `y` altos: 1380/1740) → ventana abierta pero fuera de pantalla.
  - Resuelto con el clamp `getViewportSafePosition` en `openWindow` (Fix #8, commit `9f555aa`).

- [x] **Fix #10 — Reabrir ventana existente conservaba posición off-screen** (commit `3a3984e`)
  - `openWindow` ahora clampa la posición también cuando la ventana ya existe (enfoca + clamp), no solo al crearla.

- [ ] **Task #3 — Ventana Resume / Skills / Timeline / etc.** (una o varias por tandas).
- [ ] **Task #4 — Terminal**: UI, comandos y animaciones.
- [ ] **Task #5 — Signal / Audio Player / Studio / Discography / AI Lab / Debug Console**.
- [ ] **Task #6 — Polish final**: responsive, accesibilidad, copy en/es.

## Contexto clave (no perder)

- El proyecto es un portfolio en forma de OS ("FERRO.OS") con módulos de features.
- **Next.js con breaking changes:** leer `node_modules/next/dist/docs/` antes de escribir código.
- Demo de referencia: `D:\Kann\Desktop\Documentos\Proyectos\Demo_F_OS` (Vite + Nitro, puerto 8080).
- El usuario comunica en español; responder en español.
- El usuario hace push de fases; el clon local puede quedar detrás — hacer `git pull` antes de push.
- El entorno no tiene dependencias instaladas (no correr lint/typecheck/build).
