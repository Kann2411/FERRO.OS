---
Phase: 07
Name: Exploration Engine
Status: Pending
Priority: Critical
Estimated Milestones: 7
Dependencies:
  - Phase 03 (Window Engine)
  - Phase 04 (FERRO CORE)
  - Phase 05 (Developer Modules)
  - Phase 06 (Music Modules)
---

# PHASE 07 — Exploration Engine

## Objetivo

Construir el sistema de exploración de FERRO.OS.

Esta fase transforma el recorrido del visitante en una experiencia interactiva.

Cada acción realizada dentro del sistema contribuirá al progreso del explorador.

El usuario descubrirá módulos, desbloqueará logros y avanzará hasta completar el 100% de exploración.

El objetivo es incentivar la curiosidad y aumentar el tiempo de permanencia dentro del sistema.

---

# Milestones

## Milestone 7.1 — Explorer Profile

### Objetivo

Crear el perfil del explorador.

### Requisitos

Implementar un perfil temporal que almacene:

- Nombre del explorador (si existe).
- Fecha de inicio.
- Tiempo de exploración.
- Progreso general.
- Módulos descubiertos.
- Logros obtenidos.

No utilizar backend.

Toda la información deberá mantenerse únicamente durante la sesión.

### Definition of Done

- El perfil se crea automáticamente.
- La información permanece durante toda la sesión.
- La estructura es escalable para futuras integraciones.

---

## Milestone 7.2 — Exploration Progress

### Objetivo

Implementar el porcentaje de exploración.

### Requisitos

Cada módulo descubierto deberá aumentar el progreso.

El porcentaje deberá mostrarse en:

- Desktop.
- FERRO CORE.
- Panel de Estado.

El progreso nunca debe disminuir.

### Definition of Done

- El porcentaje se actualiza correctamente.
- Todos los componentes permanecen sincronizados.

---

## Milestone 7.3 — Discovery System

### Objetivo

Detectar automáticamente el descubrimiento de contenido.

### Requisitos

Registrar cuando el visitante:

- Abre un módulo por primera vez.
- Descubre una ventana nueva.
- Accede a una sección oculta.
- Completa una misión.

Cada descubrimiento deberá registrarse una sola vez.

### Definition of Done

- No existen registros duplicados.
- El sistema es reutilizable.

---

## Milestone 7.4 — Achievements

### Objetivo

Implementar el sistema de logros.

### Requisitos

Crear la estructura para logros.

Cada logro deberá contener:

- id
- nombre
- descripción
- icono
- estado
- fecha de desbloqueo

No implementar todavía logros secretos.

### Definition of Done

- Los logros pueden desbloquearse.
- El sistema es fácilmente extensible.

---

## Milestone 7.5 — Current Mission

### Objetivo

Guiar al visitante durante la exploración.

### Requisitos

Mostrar una misión activa.

Al completar una misión deberá aparecer automáticamente la siguiente.

Las misiones deberán ser simples.

Ejemplos:

- Abrir Projects.
- Visitar Studio.
- Leer Resume.
- Descubrir Skills.

### Definition of Done

- Existe una única misión activa.
- La siguiente misión aparece automáticamente.

---

## Milestone 7.6 — Explorer History

### Objetivo

Registrar la actividad del visitante.

### Requisitos

Crear un historial que almacene:

- módulos abiertos
- logros obtenidos
- progreso
- eventos importantes

Orden cronológico.

Solo durante la sesión.

### Definition of Done

- Historial correctamente ordenado.
- Fácil de ampliar en futuras versiones.

---

## Milestone 7.7 — Integración

### Objetivo

Integrar todo el Exploration Engine.

### Requisitos

Conectar:

- Explorer Profile
- Progress
- Discovery
- Achievements
- Missions
- History

Todos los componentes deberán compartir un único estado global.

### Definition of Done

Todo el sistema de exploración funciona de manera integrada.

---

# Restricciones

NO implementar backend.

NO guardar información permanente.

NO crear autenticación.

NO sincronizar datos entre dispositivos.

NO modificar fases anteriores.

NO agregar nuevas mecánicas.

Solo construir el sistema definido en esta fase.

---

# Resultado Esperado

Al finalizar la Phase 07 el visitante tendrá la sensación de estar explorando un verdadero sistema operativo.

Cada interacción aportará progreso.

El sistema responderá constantemente a las acciones del explorador.

---

# Prompt para el Agente

## Contexto

Lee únicamente la documentación necesaria antes de comenzar:

- blueprint/03-EXPLORATION-SYSTEM.md
- blueprint/04-MODULES.md
- blueprint/05-DESIGN-SYSTEM.md
- blueprint/13-WINDOW-ENGINE.md

No modifiques la documentación.

No cambies la arquitectura del proyecto.

Trabaja milestone por milestone.

Después de finalizar cada milestone espera nuevas instrucciones.

Mantén una arquitectura limpia, reutilizable y escalable.

Respeta los Coding Standards del proyecto.