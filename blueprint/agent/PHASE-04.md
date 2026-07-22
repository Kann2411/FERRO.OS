---
PHASE 04
FERRO CORE
Version: 1.0
Status: Pending
---

# Objetivo

Dar vida a FERRO.OS.

En esta fase el visitante deja de interactuar únicamente con una interfaz y comienza a explorar un sistema que responde a sus acciones.

FERRO CORE será la inteligencia central del sistema operativo.

No es un chatbot.

No es un asistente tradicional.

Es el núcleo de FERRO.OS.

Su misión es guiar, enseñar, desbloquear contenido y acompañar al visitante durante toda la exploración.

---

# Antes de comenzar

Lee únicamente:

- blueprint/01-CORE-LORE.md
- blueprint/03-EXPLORATION-SYSTEM.md
- blueprint/05-DESIGN-SYSTEM.md
- blueprint/09-ROADMAP.md
- blueprint/13-DEVELOPMENT-RULES.md

No leas otros documentos.

---

# Restricciones

No modificar:

Desktop

Dock

Window Engine

Design Tokens

Arquitectura existente

No crear backend.

No agregar IA real.

No usar APIs externas.

Todo debe funcionar localmente.

---

# Milestone 4.1

## FERRO CORE

Crear el módulo central.

Debe existir:

FERRO CORE

Logo

Identidad visual

Estado interno

Contexto

Provider

El sistema debe poder conocer el progreso del visitante.

---

# Milestone 4.2

## Welcome Sequence

Cuando el visitante abre FERRO.OS por primera vez debe aparecer una experiencia de bienvenida.

Debe incluir:

Animación cinematográfica.

Presentación del sistema.

Presentación de FERRO CORE.

Mensaje de bienvenida.

Botón para comenzar la exploración.

La secuencia solo debe mostrarse la primera vez.

---

# Milestone 4.3

## Explorer Profile

Crear el perfil del explorador.

Debe guardar:

Nombre temporal (Explorer)

Porcentaje explorado

Módulos descubiertos

Achievements

Tiempo explorando

Primera visita

Última visita

Todo debe persistir localmente.

---

# Milestone 4.4

## Mission System

Crear el sistema de misiones.

Ejemplos:

Explora el Desktop.

Abre tu primer módulo.

Descubre Projects.

Visita Studio.

Encuentra el Terminal.

Las misiones deben actualizarse automáticamente.

---

# Milestone 4.5

## Dialogue Engine

FERRO CORE debe poder mostrar mensajes.

Tipos:

Información

Consejos

Lore

Bienvenida

Advertencias

Logros

No es un chat.

Son mensajes contextuales.

---

# Milestone 4.6

## Notifications

Crear el sistema de notificaciones.

Debe permitir:

Success

Info

Achievement

Mission

Warning

Las notificaciones deben aparecer y desaparecer suavemente.

---

# Milestone 4.7

## Save Progress

Guardar automáticamente:

Misiones

Progreso

Achievements

Primera visita

Última visita

Estado de exploración

Utilizar LocalStorage.

---

# Milestone 4.8

## Explorer HUD

Conectar FERRO CORE con el panel lateral.

Actualizar automáticamente:

Progress

Mission

Modules

Achievements

Explorer Level

Tiempo explorado

---

# Definition of Done

✓ FERRO CORE existe.

✓ Welcome Sequence funcional.

✓ Explorer Profile funcionando.

✓ Sistema de misiones funcionando.

✓ Notificaciones funcionando.

✓ Progreso persistente.

✓ Código documentado.

✓ Arquitectura respetada.

✓ Sin bugs visuales.

---

# Prompt para el Agente

Implementa únicamente la Phase 04 del Roadmap.

Antes de escribir código:

Lee únicamente:

- blueprint/01-CORE-LORE.md
- blueprint/03-EXPLORATION-SYSTEM.md
- blueprint/05-DESIGN-SYSTEM.md
- blueprint/09-ROADMAP.md
- blueprint/13-DEVELOPMENT-RULES.md

Respeta completamente la arquitectura del proyecto.

No modifiques el Desktop ni el Window Engine.

No implementes backend.

No agregues inteligencia artificial.

Implementa únicamente los milestones de esta fase.

Al finalizar:

- explica qué hiciste
- lista todos los archivos creados
- lista los archivos modificados
- explica cómo funciona FERRO CORE
- indica qué falta para completar la fase

No avances a la siguiente fase.