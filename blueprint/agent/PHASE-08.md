---
Phase: 08
Name: Terminal
Status: Pending
Priority: High
Estimated Milestones: 6
Dependencies:
  - Phase 03 (Window Engine)
  - Phase 04 (FERRO CORE)
  - Phase 07 (Exploration Engine)
---

# PHASE 08 — Terminal

## Objetivo

Construir la Terminal de FERRO.OS.

La Terminal permitirá al visitante interactuar con el sistema mediante comandos.

No pretende reemplazar una terminal real, sino convertirse en una herramienta de exploración que combine la experiencia de un sistema operativo con el portafolio interactivo.

Todos los comandos deberán integrarse con el Exploration Engine.

---

# Milestones

## Milestone 8.1 — Terminal Window

### Objetivo

Crear la ventana principal de la Terminal.

### Requisitos

- Crear la ventana Terminal.
- Simular una consola de sistema operativo.
- Área de salida.
- Campo de entrada.
- Cursor parpadeante.
- Scroll automático.

### Definition of Done

- La Terminal abre correctamente.
- La interfaz es consistente con FERRO.OS.
- El usuario puede escribir comandos.

---

## Milestone 8.2 — Command Engine

### Objetivo

Construir el motor de comandos.

### Requisitos

Implementar el procesamiento de comandos.

Debe:

- reconocer comandos
- separar argumentos
- responder correctamente
- manejar errores

Crear una arquitectura modular que permita agregar nuevos comandos sin modificar el motor principal.

### Definition of Done

- El motor procesa comandos correctamente.
- La arquitectura permite agregar nuevos comandos fácilmente.
- Los comandos permanecen desacoplados del motor principal.

---

## Milestone 8.3 — Built-in Commands

### Objetivo

Implementar los comandos principales.

### Requisitos

Implementar al menos los siguientes comandos:

- help
- clear
- about
- projects
- skills
- resume
- music
- studio
- explorer
- status
- version

Cada comando deberá mostrar información relacionada con FERRO.OS.

### Definition of Done

- Todos los comandos funcionan correctamente.
- Cada comando responde de forma consistente.
- Los mensajes siguen el estilo visual del sistema.

---

## Milestone 8.4 — Command History

### Objetivo

Implementar el historial de comandos.

### Requisitos

- Navegación mediante flechas.
- Historial durante la sesión.
- Evitar duplicados consecutivos.
- Mantener orden cronológico.

### Definition of Done

- El historial funciona correctamente.
- La navegación es intuitiva.
- No existen errores al recorrer el historial.

---

## Milestone 8.5 — Autocomplete

### Objetivo

Implementar autocompletado de comandos.

### Requisitos

- Mostrar sugerencias mientras el usuario escribe.
- Completar comandos mediante la tecla TAB.
- Mostrar coincidencias disponibles.
- No bloquear la escritura del usuario.

### Definition of Done

- El autocompletado funciona correctamente.
- Las sugerencias son precisas.
- La experiencia es fluida.

---

## Milestone 8.6 — Integración

### Objetivo

Integrar la Terminal con FERRO.OS.

### Requisitos

Los comandos deberán poder:

- abrir módulos
- consultar progreso
- consultar logros
- consultar estado del sistema

La Terminal deberá respetar el comportamiento definido por el Window Engine.

### Definition of Done

- La Terminal forma parte del sistema operativo.
- Se integra correctamente con el Exploration Engine.
- Todos los comandos funcionan dentro del ecosistema de FERRO.OS.

---

# Restricciones

NO ejecutar comandos reales del sistema operativo.

NO acceder al sistema de archivos.

NO ejecutar código JavaScript.

NO permitir comandos peligrosos.

NO crear un intérprete Bash.

NO implementar funcionalidades fuera del alcance de esta fase.

Solo construir la experiencia definida para FERRO.OS.

---

# Resultado Esperado

Al finalizar la Phase 08, el visitante podrá interactuar con FERRO.OS mediante comandos, descubriendo información y navegando por el sistema de una forma diferente.

La Terminal deberá sentirse como una herramienta nativa del sistema operativo.

---

# Prompt para el Agente

## Contexto

Antes de comenzar revisa únicamente la documentación necesaria:

- blueprint/03-EXPLORATION-SYSTEM.md
- blueprint/05-DESIGN-SYSTEM.md
- blueprint/13-WINDOW-ENGINE.md

No modifiques ninguna documentación.

No cambies la arquitectura del proyecto.

No implementes funcionalidades fuera del alcance de esta fase.

Trabaja milestone por milestone.

Después de completar cada milestone, espera nuevas instrucciones antes de continuar.

Mantén el código limpio, reutilizable y siguiendo los Coding Standards definidos en el proyecto.