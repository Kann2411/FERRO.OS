# FERRO.OS — Memory del Agente

> Archivo de memoria del proyecto. Cada tarea completada debe marcarse aquí.
> Objetivo: no perder contexto entre sesiones ni agentes.

## Estado general

- **Fase actual:** Implementación — módulo Curriculum (Ventana Resume) en curso.
- **Dirección:** Convertir los fixes visuales ya aplicados en código real de layout/componentes, una tarea a la vez.

## Fixes

- Fixes visuales completados (#1–#10): tokens, keyframes, nivel, posiciones ventanas, animación (revertida), lógica exploración, off-screen, reabrir off-screen.

## Tareas de implementación

- [ ] **Task #3 — Módulo Curriculum (Ventana Resume): cambiar contenido** (en progreso).
  - Último cambio: ventana Resume `initialHeight` 340 → 700 (contenido ~400px no cabía; ahora se ve completa al abrir).
- [ ] **Task #4 — Terminal**: UI, comandos y animaciones.

## Contexto clave (no perder)

- El proyecto es un portfolio en forma de OS ("FERRO.OS") con módulos de features.
- **Next.js con breaking changes:** leer `node_modules/next/dist/docs/` antes de escribir código.
- Demo de referencia: `D:\Kann\Desktop\Documentos\Proyectos\Demo_F_OS` (Vite + Nitro, puerto 8080).
- El usuario comunica en español; responder en español.
- El usuario hace push de fases; el clon local puede quedar detrás — hacer `git pull` antes de push.
- El entorno no tiene dependencias instaladas (no correr lint/typecheck/build).
- **Límite de memoria:** `memory.md` debe mantenerse en máximo ~100 líneas.
