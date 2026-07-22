---
PHASE 03
Window Engine
---

# Objetivo

Construir el Window Manager de FERRO.OS.

Esta fase convierte el Desktop estático en un verdadero sistema operativo.

---

# Antes de comenzar

Lee únicamente estos documentos:

- 02-ARCHITECTURE.md
- 05-DESIGN-SYSTEM.md
- 09-ROADMAP.md
- 13-DEVELOPMENT-RULES.md

No leas el resto del Blueprint.

---

# Restricciones

No modificar:

Desktop

Dock

Explorer HUD

Design Tokens

Layout principal

No crear módulos nuevos.

No instalar librerías innecesarias.

No escribir código muerto.

---

# Milestone 3.1

Sistema Window

Debe existir:

WindowProvider

WindowContext

Window Types

Window Registry

Estado global de ventanas

---

# Milestone 3.2

Abrir ventanas

Debe poder:

Abrir

Cerrar

Enfocar

Traer al frente

---

# Milestone 3.3

Drag

Las ventanas deben:

Moverse

Mantener posición

No salir completamente de pantalla

---

# Milestone 3.4

Animaciones

Abrir

Cerrar

Focus

Hover

---

# Milestone 3.5

Persistencia

Guardar posición

Guardar tamaño futuro

Recordar ventanas abiertas

---

# Definition of Done

✓ WindowProvider funcionando

✓ Ventanas arrastrables

✓ Z Index correcto

✓ Sin bugs visuales

✓ Código documentado

✓ Arquitectura respetada

---

# Prompt para el agente

Implementa únicamente la Phase 03 del Roadmap.

Antes de escribir código:

Lee:

- blueprint/02-ARCHITECTURE.md
- blueprint/05-DESIGN-SYSTEM.md
- blueprint/09-ROADMAP.md
- blueprint/13-DEVELOPMENT-RULES.md

No leas otros documentos.

Respeta completamente la arquitectura del proyecto.

No modifiques el Desktop existente.

Implementa únicamente los milestones de esta fase.

Cuando termines:

- explica qué hiciste
- qué archivos creaste
- qué archivos modificaste
- qué falta para completar la fase

No avances a la siguiente fase.