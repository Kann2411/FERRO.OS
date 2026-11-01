# Migración de estilos y flujo de misiones desde el demo FerroOS

> **Fuente de referencia (solo lectura, no se toca):** `D:\Kann\Desktop\Documentos\Proyectos\Demo_F_OS\ferroOS`
> **Proyecto destino:** este repo, `FERRO.OS` (Next.js)
> **Objetivo:** portar TODAS las funcionalidades y estilos del demo (misiones, mapa de señal, ajustes, idioma) e implementarlas **adaptadas a la arquitectura que ya tiene FERRO.OS**, no como una copia estructural del demo. Español por defecto, con selector de idioma ES/EN.

**Principio rector (importante, corrige el enfoque inicial de este documento):** FERRO.OS es un proyecto más grande y con arquitectura propia (Next.js, feature folders, convenciones ya asentadas). No vamos a reescribir ni reemplazar lo que ya funciona solo porque el demo lo resuelve distinto — por ejemplo, el **window system actual funciona y no se toca su arquitectura**. La regla es: si algo funciona, se extiende y se le suma el estilo/funcionalidad nueva ahí mismo; si algo está genuinamente roto (ver auditoría de misiones), se corrige puntualmente el defecto, sin aprovechar la corrección para migrar todo a un patrón nuevo. Nada de reescrituras grandes "porque el demo lo hace mejor" — el objetivo es un proyecto escalable y ordenado, no una refundación.

Este documento nace de dos auditorías completas (una del demo, otra del estado actual de FERRO.OS). Resume qué existe en cada lado, por qué el flujo de misiones actual está roto, y qué hay que hacer, en orden, para llegar al resultado final **usando las carpetas y patrones que FERRO.OS ya tiene** (`src/features/<feature>/{components,context,utils,types.ts}`), no la estructura del demo (`src/components/os/*`). Cada milestone es una unidad de trabajo que se puede abordar y cerrar de forma independiente.

**Regla del repo (AGENTS.md):** antes de tocar código, revisar `node_modules/next/dist/docs/` para las APIs de Next que se vayan a usar (fonts, metadata, client components, etc.) — esta versión de Next tiene breaking changes respecto al Next "de memoria".

---

## 0. Decisiones de arquitectura (zanjadas antes de empezar)

Estas decisiones resuelven las inconsistencias detectadas en la auditoría de FERRO.OS, **respetando lo que ya funciona**. Se toman ahora para que ningún milestone las reabra:

1. **El window system NO se toca arquitectónicamente.** `WindowContext` (Context+useState), el drag/resize, el if/else de render en `window-shell.tsx` y el mecanismo de persistencia propio se quedan como están porque funcionan. Solo se corrigen los **defectos puntuales y verificables**: la entrada faltante de `code-studio` y las listas duplicadas/desincronizadas de `desktop-icons.tsx`/`dock.tsx`. Nada de migrarlo a Zustand ni de rediseñar el registry como "id → componente" salvo que, al corregir el bug concreto, salga naturalmente más simple — no se persigue como objetivo en sí mismo.
2. **El estado de misiones/exploración (`FerroCoreContext`) sí se consolida**, porque ahí SÍ hay un problema real y verificado (tipos duplicados e incompatibles, 4 mecanismos de estado conviviendo para lo mismo, IDs fantasma, campo `reward` muerto). Se unifica en **un solo store**, siguiendo el mismo patrón liviano que YA usa este proyecto para estado similar (`theme-store.ts`, `wallpaper-store.ts`: Zustand + `persist` + `partialize`) — no porque el demo lo haga así, sino porque es la convención que FERRO.OS ya estableció para este tipo de estado autocontenido. Esto también resuelve los singletons mutables (`discovery-registry.ts`, `history-log.ts`) y la doble persistencia local/sessionStorage.
3. **Convención de IDs: kebab-case en todos lados** (`code-studio`, `audio-player`, `ai-lab`, `debug-console`). Esto es una corrección de bug (el mix camelCase/kebab-case ya rompe cosas hoy), no un cambio de arquitectura.
4. **Cadena de misiones = array ordenado + `prerequisite` implícito por índice**, tomando la idea del demo pero implementada dentro del store de misiones ya decidido en el punto 2 (`missions[]`, `activeMission()` = primera no completada, `progressOf()` derivado, nunca duplicado en state de componentes).
5. **Idioma por defecto: español (`es`)**, con toggle a inglés. Contenido de dominio como objetos `{ es, en }` (patrón del demo, es simple y no requiere librería). Strings de UI cortos se centralizan en un diccionario `ui.ts` con `{ es, en }` por clave — **mejora sobre el demo**, que los tenía dispersos en ternarios inline. Implementado como un store Zustand pequeño más (mismo patrón que theme/wallpaper), no como reescritura de routing.
6. **Tema**: se mantiene el toggle claro/oscuro que ya existe en FERRO.OS (vía `data-theme` en `<html>`), sin tocar su mecanismo actual.
7. **Tipografía del demo se adopta tal cual**: `Outfit` (sans) + `IBM Plex Mono` (mono), vía `next/font/google`, reemplazando Geist. Paleta de color: se mantiene la paleta FERRO actual (`#D90429` rojo, `#090909` negro) sumando los tokens de superficie/acento "signal" (verde) del demo para las misiones, si no chocan — a decidir visualmente en Milestone 1.
8. **Ubicación del código nuevo**: todo lo nuevo (mapa de señal, settings ampliado, i18n) vive dentro de la estructura de features existente (`src/features/<nombre>/{components,context|store,utils,types.ts}`), igual que `ferro-core`, `window-system`, etc. — no se replica la carpeta `src/components/os/` del demo.

---

## Milestone 1 — Fundación de diseño (tokens, tipografía, efectos, UI base)

**Por qué primero:** todo lo demás (misiones, mapa, settings) se apoya visualmente en estos tokens y componentes.

- [x] Migrar fuentes a `next/font/google`: `Outfit` (pesos 300–700, variable `--font-display-sans`) e `IBM Plex Mono` (400/500/600, `--font-display-mono`), mapeadas a `--font-sans`/`--font-mono` en `@theme inline`. Reemplazado Geist en `src/app/layout.tsx`. De paso se puso `<html lang="es">` por defecto (adelanto trivial de la decisión de idioma de M6, el contenido en sí se traduce recién en ese milestone).
- [x] Actualizado `src/app/globals.css`:
  - [x] Tokens de color nuevos añadidos: `--color-surface-2`, `--color-surface-3`, `--color-subtle`, `--color-signal`, `--color-signal-foreground`, `--color-border`, `--color-border-strong` (además de los ya existentes `--color-surface-strong`, `--color-muted`, etc.).
  - [x] Tokens de sombra (`--shadow-window`, `--shadow-dock`) y easing (`--ease-out-smooth`) añadidos en un bloque `@theme` estático.
  - [ ] **Diferido:** escala de radios (`--radius-xs..2xl`) — no se sobreescribió la escala `--radius-*` por defecto de Tailwind para no alterar visualmente los ~30 usos existentes de `rounded-lg/xl/2xl/3xl` fuera de este milestone. Se mantienen los radios ya usados en el código (`rounded-2xl`/`rounded-3xl`) como convención de facto.
  - [ ] **No aplica / ya resuelto distinto:** FERRO.OS no usa `data-theme` + bloque CSS para el tema claro — usa un mecanismo propio (`ThemeProvider` + Zustand `theme-store` inyectando custom properties vía `root.style.setProperty`, ver más abajo). Se respetó ese mecanismo en vez de introducir el patrón del demo.
- [x] Los nuevos tokens de color están disponibles en ambos modos: se extendió `src/lib/theme.ts` (`themeTokens.dark/light`) y `src/providers/theme-provider.tsx` para incluir `surface2/3`, `subtle`, `signal`, `signalForeground`, `border`, `borderStrong` — la duplicación estructural CSS-default/JS-override es inherente al mecanismo ya existente y no se tocó (ver Milestone 0, principio de no rediseñar lo que funciona); solo se evitó agregar una tercera fuente de valores.
- [x] Efectos atmosféricos añadidos a `globals.css`: `.grain` (textura de ruido SVG, `mix-blend-mode: overlay`), `.signal-dot`/`signal-pulse` (para HUD/mapa de señal en M4/M5), `.boot-caret` (para boot screen en M4), `.toast-in` y `.window-in` (para notificaciones/modales en M4/M5). El bloque global `prefers-reduced-motion` ya existente cubre automáticamente estas animaciones nuevas (fuerza `animation-duration: 0.01ms` sobre `*`).
  - [ ] **Omitido deliberadamente:** `.atmosphere` (radial-gradients) y `star-drift` del demo — FERRO.OS ya tiene un `AmbientBackground` propio (`src/components/workspace/ambient-background.tsx`) con partículas/gradientes vía Framer Motion, más elaborado que el del demo y ya reduced-motion-aware. Portar el del demo habría sido redundante y peor.
  - [ ] **Omitido:** `dock-pop` — ni el propio demo lo usa activamente (queda declarado pero sin consumidores); no se replica código muerto.
- [x] **Wallpaper:** no se portó el componente `Wallpaper` del demo — confirmado que `AmbientBackground` ya cubre esa función mejor. Sin cambios aquí (decisión de "no rehacer lo que ya funciona").
- [x] Instaladas `class-variance-authority`, `clsx`, `tailwind-merge`; creado `src/lib/cn.ts`.
- [x] Creados primitivos en `src/components/ui/`:
  - [x] `button.tsx` — variantes `default | secondary | ghost | outline | signal`, tamaños `default | sm | lg | icon | pill`.
  - [x] `badge.tsx` — tonos `muted | accent | signal`.
  - [x] `input.tsx` — `bg-surface-2` + focus ring.
  - [x] `panel.tsx` — variantes `tone: surface | raised | subtle | sunken`, `size: sm | md | lg`, `elevated`. Exporta también `panelVariants` (cva puro) para los casos donde el wrapper ya es un `motion.div`/`motion.section` y no puede reemplazarse por el componente `<Panel>`.
- [x] Reemplazadas las clases largas repetidas (`rounded-3xl border border-white/10 bg-[#101010]/90 ...` y variantes) por `Panel`/`panelVariants` en: `desktop-shell.tsx`, `audio-player-module.tsx`, `code-studio-module.tsx`, `equipment-module.tsx`, `core-messages.tsx`, `ferro-core-status.tsx`, `mission-board.tsx`, `resume-module.tsx`, `settings-module.tsx` (9 secciones), `explorer-profile-card.tsx` (4 stat chips). Verificado con `tsc --noEmit`, `pnpm lint` (sin errores nuevos) y `pnpm build` (compila y prerenderiza OK); confirmado en el HTML servido por `next dev` que las fuentes, `lang="es"` y las clases `bg-surface`/`shadow-window` llegan al DOM correctamente. **No se tocaron** `welcome-sequence.tsx` ni `projects-module.tsx` (variantes menores del patrón, 1-3 usos c/u, de menor impacto) ni los `<div>` de estado condicional (badges de logro/misión, wallpaper selector) que mezclan color semántico con la forma del panel — quedan para revisarse si aparecen de nuevo al tocar esos archivos en milestones futuros.

**Nota de verificación:** no fue posible tomar una captura visual real (sin navegador headless disponible en este entorno Windows); se validó por build + type-check + lint limpios y por inspección del HTML/CSS servidos por `next dev` (fuentes correctas, tokens compilados, sin errores de servidor). Recomendado que el usuario revise visualmente en `pnpm dev` cuando pueda.

**Criterio de cierre:** cualquier pantalla nueva puede construirse solo con los tokens/componentes de `src/components/ui/`, sin inventar clases inline nuevas. ✅ Cumplido para los primitivos base; la limpieza exhaustiva de *todas* las clases duplicadas restantes en el código (las omitidas arriba) queda abierta como mejora incremental, no bloqueante.

---

## Milestone 2 — Unificar el modelo de datos y estado de misiones

**Por qué:** es la causa raíz de "no sigue ningún patrón". Sin esto, portar el HUD/mapa de señal solo esparce el bug a más lugares.

- [x] Eliminada la duplicidad de `MissionDefinition`: queda **un solo** tipo en `src/features/ferro-core/types.ts` con el campo `unlocksModule` (el que sí se usa en runtime); `mission-system.ts` ahora importa ese tipo en vez de redeclararlo. También se movieron `DiscoveryRecord` y `ExplorerHistoryEntry` (antes definidos inline/en los utils eliminados) a `types.ts` como tipos nombrados.
- [x] **Corrección respecto al plan original sobre el casing de IDs:** al auditar el código real se confirmó que `audioPlayer`/`aiLab`/`debugConsole` (camelCase) SÍ son consistentes entre sí en los ~8 archivos que los usan (registry, desktop-icons, dock, achievement-system, explorer-progress, mission-system, hidden-files, command-engine, window-shell) — no hay una mezcla real que rompa nada ahí. El único problema real de "casing" es que `code-studio` (kebab-case) usado en desktop-icons/dock/mission-system/window-shell **no tiene entrada en `windowRegistry`** — eso es un hueco puntual, no una mezcla de convenciones. Se decidió **no renombrar** `audioPlayer`/`aiLab`/`debugConsole` (sería puro churn cosmético en ~8 archivos sin corregir ningún bug) y dejar el fix de `code-studio` para el Milestone 3, que es donde realmente se toca el registry.
- [x] Corregido el ID de misión fantasma: `command-engine.ts` ahora llama `completeMission("visit-ai-lab")` (antes `"unlock-ai-lab"`, un id que no existía en `missionDefinitions` y por tanto nunca contaba para el progreso).
- [x] `completeMission` reescrito en el nuevo store (ver abajo): valida que el `missionId` exista en `missionDefinitions` antes de escribir nada (evita entradas huérfanas), y aplica `missionDef.reward` real en vez del `+5` hardcodeado que ignoraba por completo ese campo.
- [ ] **Diferido:** no se introdujo una misión explícita de "cierre de cadena" tipo `lock` del demo ni `progressOf`/`activeMission` como helpers puros separados — FERRO.OS ya tenía `getActiveMission()`/`getMissionProgressValue()` en `mission-system.ts` cumpliendo ese rol (se mantienen tal cual, sin duplicarlos). La mecánica de "modal final al completar todo" se aborda en el Milestone 8 (cierre narrativo), no aquí.
- [x] **Consolidación de estado (el punto central de este milestone):** se creó `src/store/ferro-core-store.ts`, un store Zustand con `persist`, siguiendo el mismo patrón que `theme-store.ts`/`wallpaper-store.ts` ya usan en este proyecto. `src/features/ferro-core/context/ferro-core-context.tsx` pasó de ser el dueño del estado (Context + `useState`) a una envoltura delgada de ~65 líneas que solo expone `useFerroCore()` y `FerroCoreProvider` con **exactamente la misma forma pública** (`FerroCoreContextValue`) — los 15 archivos consumidores (`mission-board.tsx`, `explorer-profile-card.tsx`, `desktop-icons.tsx`, `terminal-module.tsx`, etc.) no necesitaron ningún cambio.
- [x] Eliminados `discovery-registry.ts` y `history-log.ts` (singletons mutables a nivel de módulo, inseguros en SSR/hot-reload) y `explorer-profile-storage.ts` (persistencia manual en sessionStorage duplicada) — su lógica vive ahora dentro del store único, con una sola persistencia vía `zustand/persist` en localStorage (clave `ferro-os-explorer-profile`, migrando de forma perezosa la clave legacy `ferro.os.ferro-core` si existe).
- [x] **Bug de hidratación SSR detectado y corregido durante la migración:** `persist` de Zustand rehidrata sincrónicamente desde `localStorage` al crear el store en cliente, lo que generaba mismatch de hidratación de React contra el HTML renderizado en servidor (siempre con el perfil por defecto). Solucionado con `skipHydration: true` + una llamada explícita a `useFerroCoreStore.persist.rehydrate()` dentro de un `useEffect` en `FerroCoreProvider` — replica el mismo patrón "cargar después del montaje" que ya usaba el código original, pero ahora sin la lógica de storage duplicada.
- [x] Puente de sonido: como los stores de Zustand no pueden llamar hooks de React (`useAudio()`), se agregó `setSoundBridge()` en el store, que `FerroCoreProvider` invoca una vez con la función `playSound` real — así `pushMessage`/`pushNotification`/`awardAchievement` conservan el mismo sonido que reproducían antes, sin acoplar el store a React Context.
- [x] Actualizado `blueprint/agent/PHASE12.md`: el front-matter decía `Status: Pending` pero los milestones 12.1–12.8 ya están implementados según el historial de git y la lectura del código — corregido a `Status: Completed`.
- [x] Verificado con `tsc --noEmit`, `pnpm build` (limpios) y una prueba manual con `pnpm dev` + curl: el HTML servido incluye correctamente las 11 misiones, el HUD y el conteo de progreso; se confirmó que el fix de hidratación elimina el error que aparecía antes de aplicar `skipHydration`.

**Criterio de cierre:** un solo lugar (`missionDefinitions` + `useFerroCoreStore`) define el flujo de misiones; ningún componente mantiene su propia copia de "qué misión sigue" o "cuánto progreso hay". ✅ Cumplido. El bug de `code-studio` queda intencionalmente para el Milestone 3 (es un fix de registry, no de modelo de datos).

---

## Milestone 3 — Fix puntual de módulos rotos (sin tocar la arquitectura del window system)

**El window system funciona y no se rediseña.** Este milestone es deliberadamente pequeño: corrige solo los defectos concretos que impiden que lo ya construido funcione bien, sin introducir un patrón nuevo.

- [x] Agregada la entrada faltante de `code-studio` a `windowRegistry` (`src/features/window-system/registry/index.ts`, icono `⌬`, 620×420). Confirmado con `pnpm build` + smoke test en `pnpm dev` que ya no queda huérfana.
- [x] Unificados `allItems` (`desktop-icons.tsx`) y `allApps` (`dock.tsx`) en una sola fuente nueva: `src/components/workspace/launcher-items.ts`. Además se fue un paso más allá de "copiar un array a un archivo compartido": el nuevo `launcherItems` solo declara `{ windowId, accent, description }` (los campos que de verdad son propios de cada componente de UI); **`label` e `icon` ahora se resuelven en tiempo de render desde `resolveWindowDefinition(windowId)`** (el propio `windowRegistry`), en vez de repetirse una tercera vez a mano. Esto hace que `windowRegistry` sea la única fuente de verdad para título/ícono, y que un módulo sin entrada en el registry directamente **no se renderice** (falla visible) en vez de renderizarse pero no abrir nada al hacer click (el bug original de `code-studio`).
- [ ] **No se normalizaron** `audioPlayer`/`aiLab`/`debugConsole` a kebab-case — ver nota en Milestone 2: es un cambio cosmético en ~8 archivos que no corrige ningún bug adicional; se dejó explícitamente fuera para no generar churn innecesario.
- [x] Eliminado `use-window-manager.ts`: era un hook que solo reenviaba `openWindow` de `useWindowContext()` sin agregar lógica, y se invocaba en `desktop-shell.tsx` descartando el valor de retorno (`useWindowManager();`) — confirmado que no aportaba nada. Se eliminó el archivo, su llamada en `desktop-shell.tsx`, y su re-export en `window-system/index.ts`.
- [x] El if/else de render en `window-shell.tsx` **se dejó como está**, sin tocar, tal como estaba decidido.

**Criterio de cierre:** abrir cualquier módulo desbloqueado desde dock o desktop funciona sin excepciones silenciosas (incluido Code Studio, ya con entrada real en el registry); las listas de apps de dock y desktop no pueden volver a desincronizarse entre sí (una sola fuente) ni respecto al registry (label/icon derivados, no copiados). Verificado con `tsc --noEmit`, `pnpm lint` (sin errores nuevos) y `pnpm build` limpios, más smoke test en `pnpm dev`.

---

## Milestone 4 — Flujo de misiones: UI (HUD, notificaciones, badges)

Con el modelo de datos ya saneado (Milestone 2), se auditó lo que YA existe en FERRO.OS antes de portar nada del demo — resultó que buena parte de este milestone ya estaba construido, solo con gaps puntuales:

- [x] **HUD lateral — ya existía, no se reconstruyó.** `ExplorerProfileCard` (barra de "fuerza de señal" con gradiente, grid de 4 stats, misión activa + tiempo explorado, historial reciente) + `MissionBoard` (lista completa de misiones con 3 estados visuales: completada/actual/bloqueada) ya cumplen exactamente el rol de `Hud.tsx` del demo. No se tocó su estructura — solo se beneficiaron de los tokens del Milestone 1 y del store saneado del Milestone 2.
- [x] **Versión mobile — ya existía, no hacía falta una "compacta" aparte.** El `aside` que contiene `ExplorerProfileCard`/`MissionBoard` ya es `w-full` en mobile y `sm:max-w-85` en desktop (responsive real, no oculto/colapsado). Construir una segunda variante "compacta" solo para mobile hubiera sido duplicar UI que ya funciona bien en pantallas chicas — se descartó esa tarea.
- [x] **Notificaciones/toasts — ya existía (`CoreNotifications`), se mejoró en vez de reemplazar.** Ya tenía cola con auto-dismiss (6000ms, el demo usa 4200ms — se deja el valor propio de FERRO.OS), `AnimatePresence`, botón de descarte. Lo que faltaba de verdad: **íconos distintos por tipo** (el demo diferencia logro/misión con Award/Radio) — se agregó un glifo unicode por tipo (`✓ ✦ ▸ ! ◌`), consistente con el resto de la app que no usa ninguna librería de íconos (no se instaló `lucide-react` ni similar solo por esto).
- [x] **Badge de "sin explorar"** — ya existía en `desktop-icons.tsx` (punto rojo pulsante en módulos desbloqueados-pero-no-descubiertos) pero **faltaba en `dock.tsx`**, la asimetría real que había que corregir. Agregado el mismo badge al dock (desktop y mobile).
- [ ] **Diferido a Milestone 5:** píldora de progreso clickeable que abra el mapa de señal — `StatusPanel` (equivalente a la píldora de `MenuBar`) ya muestra `{pct}% • {done}/{total} missions • {tiempo}`, pero no tiene sentido cablear el click hasta que el mapa exista.
- [x] **Bug real encontrado y corregido: doble gating de boot/welcome.** `page.tsx` mostraba el `BootScreen` completo en **cada carga de página**, sin memoria de visitas previas (`showBoot` arrancaba en `true` siempre) — contradice directamente el propio blueprint ("Returning visitors continue exactly where they left"). Se corrigió gateando en `explorerProfile.welcomeCompleted` (ya persistido) + `useReducedMotion()`, sin agregar un campo nuevo al perfil.
- [x] **Regresión propia detectada y corregida en el camino:** el primer intento de este fix (`if (!initialized) return null`) rompía el first paint — el servidor ya no podía saber si es visitante nuevo, así que el HTML SSR quedaba completamente vacío hasta que la rehidratación terminaba en el cliente (confirmado con curl: el body SSR era literalmente un comentario vacío). Corregido: el estado por defecto (servidor y primer render de cliente) sigue asumiendo "visitante nuevo" y muestra el boot igual que antes (evita el blank flash y coincide con el HTML del servidor), y en cuanto la rehidratación confirma que es un visitante recurrente o que `prefers-reduced-motion` está activo, el boot se corta de inmediato en vez de esperar a que termine solo. Verificado con curl que el SSR vuelve a incluir el contenido del boot y que no hay errores de hidratación en el log de `next dev`.

**Criterio de cierre:** completar acciones normales de exploración (abrir apps, leer el resume, usar la terminal) actualiza visiblemente el HUD/badges/notificaciones sin refrescar la página — ya era así antes de este milestone gracias al store reactivo del Milestone 2; lo que este milestone cerró fueron las asimetrías puntuales (badge del dock, íconos de notificación) y el bug de boot repetido. Verificado con `tsc --noEmit`, `pnpm lint` (sin errores nuevos) y `pnpm build` limpios.

---

## Milestone 5 — Mapa de señal (Signal Map)

- [x] Creado `src/features/ferro-core/components/signal-map.tsx`: SVG `viewBox="0 0 100 100"`, path de fondo tenue conectando los 11 nodos en orden, segmentos "encendidos" en verde (`text-signal`) solo cuando ambos extremos de un tramo están en `completedMissions`. No es un port literal 1:1 del JSX del demo — la estructura visual es equivalente, pero implementada con los componentes/patrones de FERRO.OS (`createPopoverMotion` de `animation-engine`, no la clase CSS cruda `.window-in`; ver nota más abajo).
- [x] Coordenadas de nodos definidas para la cadena **real** de FERRO.OS (`explore-desktop → open-first-module → discover-projects → visit-studio → discover-skills → read-resume → explore-timeline → listen-discography → visit-ai-lab → master-explorer → full-exploration`), no las del demo. Verificado programáticamente que los 11 ids del mapa coinciden 1:1 y en el mismo orden con `missionDefinitions` (evita que un id mal escrito deje un nodo "mudo").
- [x] Estados visuales de nodo: completado (verde sólido, `bg-signal`), actual (rojo pulsante, reutiliza la clase `.signal-dot` creada en el Milestone 1), pendiente (gris, `bg-subtle`).
- [x] Modal overlay con el mismo patrón que el resto de overlays de FERRO.OS (backdrop + `stopPropagation`) — **corrección sobre el plan original:** en vez de la clase CSS cruda `.window-in` del demo, se usa `createPopoverMotion("window", { reducedMotion })` de `@/features/animation-engine`, el helper que ya usan `CoreNotifications` y otros overlays existentes — mantiene reduced-motion consistente con el resto de la app en vez de introducir un segundo mecanismo de animación paralelo.
- [x] Puntos de entrada conectados, los 4 previstos:
  - Botón brújula flotante (`⌖`), fijo abajo-a-la-izquierda, solo desktop (`hidden sm:flex`) en `desktop-shell.tsx`.
  - `StatusPanel` (la píldora de progreso de la barra superior) ahora es un botón clickeable — se dejó preparado en el Milestone 4, se conectó aquí.
  - Botón "Open signal map" agregado al header de `MissionBoard` (el HUD).
  - Apertura automática: `completeMission` en el store dispara `setMapOpen(true)` cuando la misión completada es `full-exploration` (la última de la cadena) — no se necesitó un helper `progressOf`/`activeMission` nuevo porque `mission-system.ts` ya tenía `getActiveMission`/`getMissionProgressValue` cumpliendo ese rol desde antes del Milestone 2.
- [x] Efecto meta aplicado: abrir el mapa por primera vez otorga el logro ad hoc `"Signal map opened"` vía `awardAchievement()` — mismo mecanismo ya usado por otros logros puntuales del código existente (ej. "Projects discovered" en `desktop-icons.tsx`), no se tocó el sistema de logros basado en reglas (`achievementDefinitions`).
- [x] Estado del modal (`mapOpen`) agregado al store de misiones (`ferro-core-store.ts`) y expuesto vía `useFerroCore()` (`mapOpen`/`setMapOpen`), no persistido (se resetea al recargar, correcto para un modal) y limpiado explícitamente en `resetFlow()`.

**Criterio de cierre:** el mapa refleja en tiempo real el estado de `completedMissions`/`activeMission` sin duplicar esa lógica (usa `useFerroCore()` directo, cero estado derivado propio). Verificado con `tsc --noEmit`, `pnpm lint` (sin errores nuevos), `pnpm build` limpio, y una comprobación programática de que los ids de nodo coinciden exactamente con `missionDefinitions`.

---

## Milestone 6 — i18n y selector de idioma ✅

- [x] Mecanismo: **sin** routing por idioma — store Zustand dedicado (`src/store/lang-store.ts`, `lang: "es" | "en"`, `persist` con `skipHydration: true` + rehydrate manual en `src/providers/lang-provider.tsx`, mismo patrón anti-mismatch que `ferro-core-store.ts` de M2) + objetos `{ es, en }` para contenido de dominio.
- [x] `src/lib/i18n/` creado:
  - [x] `types.ts` — `Lang`, `Bilingual<T = string>`.
  - [x] `ui.ts` — diccionario centralizado de strings de UI cortos y reutilizables (`ui.settings`, `ui.missionSystem`, `ui.bootLine1`... ~90 claves) + `windowTitles` (títulos traducidos de cada ventana del registry).
  - [x] `src/hooks/use-lang.ts` — `useLang()`, `useT()` (`t(pair)` para contenido de dominio), `useUi()` (`tUi(key)` para el diccionario), `useSetLang()`, `useToggleLang()`.
- [x] Traducido **todo el contenido**: `MissionDefinition`/`AchievementDefinition` (title/description → `Bilingual`), `CoreMessage`/`CoreNotification`/`ExplorerHistoryEntry` (los textos que `ferro-core-store.ts` construye dinámicamente — desbloqueos, bienvenida, logros — ahora usan un helper `bi(es, en)`), `HiddenFileDefinition` (label/description/content, incluye las "lore notes" largas), `WallpaperDefinition` (name/description), todos los módulos de escritorio (proyectos, currículum, habilidades, línea de tiempo, discografía, equipo, reproductor de audio, música, estudio, code-studio, laboratorio de IA, consola de depuración), terminal (todos los comandos y sus salidas vía `TerminalCommandContext.lang`), y todo el chrome (shell, dock, iconos, mapa de señal, boot screen, welcome sequence, HUD del explorador, ajustes, ventanas). Español es el idioma por defecto (`lang: "es"` en el store, `<html lang="es">` en `layout.tsx`).
- [x] `document.documentElement.lang` se actualiza reactivamente en `LangProvider` (`useEffect` sobre `lang`).
- [x] Botón de cambio de idioma: acceso rápido en la barra superior de `desktop-shell.tsx` (pastilla "ES"/"EN" junto a Ajustes) + selector de dos botones (Español/English) dentro de `settings-module.tsx` — ambos escriben al mismo store, cambio instantáneo en toda la UI.
- [x] `aria-label` del botón de idioma traducido (`ui.languageToggleLabel`), igual que el resto de aria-labels de la app (dock, iconos, ventanas — incluido `window-shell.tsx`, tocado solo a nivel de texto en aria-labels, sin alterar su lógica de renderizado según la directiva de no restructurar el sistema de ventanas).

**Corrección sobre el plan original:** los logros ad hoc (`awardAchievement("Signal map opened")`, `"Projects discovered"`) usaban el **título en inglés como identidad** (clave de deduplicación en `explorerProfile.achievements: string[]`). Traducir el título habría roto esa deduplicación entre idiomas. Se promovieron a entradas reales de `achievementDefinitions` con `id` estable (`signal-map-opened`, `projects-discovered`, condición `() => false` ya que se otorgan manualmente) y `awardAchievement()` ahora recibe un `id`, no un título — la identidad persistida es estable sin importar el idioma activo.

**División del trabajo:** infraestructura, núcleo de misiones/logros/store, chrome (shell/dock/iconos/mapa/boot/welcome/HUD), terminal, ajustes, archivos ocultos, wallpapers y ventanas hechos directamente; los módulos de contenido más largos (currículum, habilidades, línea de tiempo, discografía, equipo, reproductor, música, estudio, code-studio, laboratorio de IA) se delegaron en 3 agentes en paralelo siguiendo `projects-module.tsx` como referencia, para evitar conflictos se les pidió preferir objetos `Bilingual` locales o el patrón `const es = lang === "es"` en vez de tocar el `ui.ts` compartido salvo que la clave fuera genuinamente reutilizable.

**Criterio de cierre:** verificado — `tsc --noEmit` limpio, `pnpm lint` sin regresiones (11 problemas, todos preexistentes en archivos no tocados: `desktop-icons.tsx`, `audio-context.tsx`, `audio-player-module.tsx`, `music-visualizer.tsx`, `terminal-module.tsx`, `window-context.tsx`, `uuid.ts`), `pnpm build` limpio, y smoke test con `pnpm dev`: SSR devuelve `<html lang="es">` con todo el contenido en español por defecto, sin errores de hidratación, y el botón rápido "ES" se renderiza correctamente en el servidor.

---

## Milestone 7 — Settings completo ✅

Reestructurado `src/features/settings/components/` en 6 secciones autocontenidas compuestas por un shell (`settings-module.tsx`), en vez de un único componente monolítico. No se creó `context/`/`store/` propio del feature porque Settings no posee estado propio — solo lee/escribe en los stores que ya existen (`lang-store`, `theme-store`, `wallpaper-store`, `audio-context`, `ferro-core-store`, y el nuevo `accessibility-store`), consistente con "no diseñar para necesidades hipotéticas".

- [x] **Idioma** (`language-section.tsx`): dos botones (Español/English) con variante activa — movido tal cual desde el M6, sin cambios de comportamiento.
- [x] **Tema** (`theme-section.tsx`): envuelve el `ThemeToggle` ya existente en un panel con label/descripción del modo activo, sin tocar `theme-store.ts` ni `use-theme.ts`.
- [x] **Wallpaper** (`wallpaper-section.tsx`): conectado directo a `wallpaper-store.ts` (ya existía, solo se movió de archivo).
- [x] **Audio** (`audio-section.tsx`): enable/disable + volúmenes master/effects/ambient + previews — movido tal cual.
- [x] **Accesibilidad** (`accessibility-section.tsx`) — **gap real resuelto, no solo movido**: `useReducedMotion()`/`useHighContrast()` (`src/hooks/`) leían *únicamente* `matchMedia` del SO, sin ningún override posible; no había nada que "conectar" a UI. Se creó `src/store/accessibility-store.ts` (patrón `skipHydration: true` + rehydrate manual en `AccessibilityProvider`, igual que `lang-store`/`ferro-core-store`, para evitar el mismatch de hidratación ya corregido dos veces antes en este proyecto) con preferencia de tres estados (`system`/`on`/`off`) para reduced-motion y high-contrast. Los dos hooks ahora superponen ese override sobre la detección del SO **sin cambiar su firma ni ningún call-site** de los ~20 componentes que ya los usan — la superficie pública es idéntica, solo cambió la implementación interna.
- [x] **"Reiniciar flujo de exploración"** (`reset-section.tsx`): movido desde `desktop-shell.tsx`. **Corrección de un bug real descubierto al mover el botón**: la implementación original (`resetFlow()` + `resetWindowState()` sin recarga) nunca hacía reaparecer el boot screen prometido — `resetFlow()` pone `initialized: false` en el store, pero nada volvía a invocar `initializeSession()` después del primer montaje, así que `initialized` quedaba en `false` para siempre y ni el boot ni la `WelcomeSequence` volvían a mostrarse. Se cambió a `resetFlow()` + `resetWindowState()` + `window.location.reload()`: ambos stores persistidos quedan limpios en `localStorage` antes de recargar, y la recarga entera reproduce exactamente el flujo de un visitante nuevo sin necesidad de sincronizar estado entre `page.tsx` y `desktop-shell.tsx`.
- [x] Ventana de Settings redimensionada en el registry: `460×320` → `640×560` (posición `{260,100}`) para acomodar las 6 secciones sin depender solo del scroll interno.

**Criterio de cierre:** Settings es un feature autocontenido — `desktop-shell.tsx` ya no contiene lógica de reset (verificado: solo conserva el toggle de idioma rápido, que es intencionalmente un acceso duplicado, no lógica de settings). Verificado con `tsc --noEmit` limpio, `pnpm lint` sin regresiones (11 problemas, todos preexistentes, igual que en M6), `pnpm build` limpio, y smoke test con `pnpm dev` sin errores de hidratación.

---

## Milestone 8 — Cierre narrativo, pulido y QA final ✅

- [x] **Modal "señal reconocida"** — `src/features/ferro-core/components/recognized-modal.tsx` (nuevo), overlay con el mismo patrón que `SignalMap`/`WelcomeSequence` (`createPopoverMotion`), resumen final (misiones, logros, módulos descubiertos, tiempo explorado) y dos botones (volver al workspace / ver mapa de señal). Se dispara al completar la misión `full-exploration` — se reemplazó el `set({ mapOpen: true })` de ese trigger (Milestone 5) por `set({ recognizedOpen: true })`, un estado nuevo (`recognizedOpen`/`setRecognizedOpen`) agregado a `ferro-core-store.ts`, `types.ts` y `ferro-core-context.tsx` con el mismo patrón que `mapOpen`, incluido el reset en `resetFlow()`. **Decisión documentada:** no se orquesta el cierre de ventanas/audio/wallpaper desde el store de misiones (lo que pedía la visión original en `06-GAMEPLAY.md`) porque eso cruzaría hacia territorio que el window system y el audio engine ya poseen — el overlay logra el mismo remate narrativo sin tocar esos subsistemas.
- [x] **Spotlight/Cmd+K: descartado.** Preguntado explícitamente al usuario — decidió no incluirlo en este milestone.
- [x] **`blueprint/05-DESIGN-SYSTEM.md` actualizado**: tipografía real (Outfit + IBM Plex Mono, con nota de implementación), tokens nuevos documentados (Surface 2/3, Signal, Muted/Subtle, Border/Border Strong), y sección nueva "Theme Modes" explicando por qué FERRO.OS soporta claro+oscuro pese a que el documento original nunca mencionó un modo claro.
- [x] **`blueprint/06-GAMEPLAY.md` actualizado**: la sección "Unlock System" (umbrales de % independientes) se reemplazó por la cadena real de misiones (`missionDefinitions`) con sus `unlocksModule`; "Secret Commands" se corrigió a la lista real de `command-engine.ts` (varios comandos del documento original — `whoami`, `unlock ai`, `future` — nunca existieron); "Final Experience" ahora documenta el `RecognizedModal` como implementación real y su alcance reducido frente a la visión original. `blueprint/04-MODULES.md` recibió una nota de implementación aclarando que el desbloqueo real es la cadena de misiones (no los porcentajes por módulo listados) y que "Secret Vault"/"Visualizer" nunca se construyeron como ventanas propias (cumplidos por el sistema de archivos ocultos y por `music-visualizer.tsx` respectivamente).
- [x] **QA manual — con una limitación honesta:** este entorno no tiene navegador interactivo disponible, así que la "QA manual" fue: (1) trazado de código de cada ruta del flujo (boot → misiones → mapa → modal final → terminal → hidden files) verificando que los triggers y condiciones encajan; (2) `tsc --noEmit`, `pnpm lint` y `pnpm build` limpios en cada paso; (3) smoke tests repetidos con `pnpm dev` + `curl`, revisando el HTML servido y el log del dev server en busca de errores de hidratación — confirmado limpio en español (`lang="es"` + contenido en español) en cada milestone. No se realizó una sesión de clicks real en un navegador ni en inglés ni en mobile — si querés, puedo guiarte por una pasada manual real o delegarla a un agente con navegador si está disponible.
- [x] **Auditoría de `prefers-reduced-motion` — gaps reales encontrados y corregidos:**
  - `useReducedMotion()`/`useHighContrast()` ahora combinan la preferencia del SO con el override manual agregado en el Milestone 7 (antes solo miraban `matchMedia`).
  - Tres badges "recién desbloqueado" (dock ×2, desktop-icons) no respetaban ninguna señal de reduced-motion — corregidos con clase condicional.
  - **Revertido tras feedback del usuario:** se había gateado también el cursor parpadeante y los glows del boot screen (y separado `skipBoot` de reduced-motion en `page.tsx`), pero el usuario pidió explícitamente conservar el efecto de tipeo y el cursor parpadeante siempre activos — "le da un toque más único". Se mantiene el fix de `skipBoot` (visitante que regresa ya no se mezcla con reduced-motion), pero el boot screen vuelve a animar el cursor/glows sin condición; la red de seguridad para accesibilidad real sigue siendo el bloque global `@media (prefers-reduced-motion: reduce)` de `globals.css`, que ya neutraliza estas animaciones para usuarios con esa preferencia del sistema operativo sin necesitar lógica condicional en el componente.
  - `.signal-dot` (CSS `signal-pulse`) en `signal-map.tsx` y el nuevo `recognized-modal.tsx` se aplicaba sin condición — corregido.
  - `.grain`, `.boot-caret`, `.toast-in`, `.window-in`: código CSS muerto desde el Milestone 1 (nunca referenciado por ningún componente — el boot screen usa `animate-pulse` de Tailwind, y notificaciones/ventanas usan `createPopoverMotion`/framer-motion). Eliminado de `globals.css` en vez de forzar su uso.
- [x] **Nomenclatura de `blueprint/agent/` unificada**: `PHASE12.md` → `PHASE-12.md` (con `git mv`, preservando historial), ahora consistente con `PHASE-03.md`...`PHASE-11.md`. Verificado que ningún otro documento lo referenciaba por el nombre viejo.

**Criterio de cierre:** experiencia jugable de punta a punta, en español por defecto, sin los bugs identificados en la auditoría inicial de este proyecto — cumplido y verificado con las herramientas disponibles en este entorno (tipos, lint, build, smoke test de hidratación); la verificación visual/interactiva real queda pendiente de una pasada del usuario en el navegador.

---

## Referencia rápida de archivos (para no tener que re-explorar)

### Demo (solo lectura)
| Área | Archivo |
|---|---|
| Tipos de dominio | `src/lib/os/types.ts` |
| Store global (Zustand) | `src/lib/os/store.ts` |
| Contenido/i18n inline | `src/lib/os/content.ts` |
| Estilos globales/tokens | `src/styles.css` |
| Shell raíz | `src/components/os/OsShell.tsx` |
| Boot | `src/components/os/BootSequence.tsx` |
| Menú superior | `src/components/os/MenuBar.tsx` |
| Dock / iconos escritorio | `src/components/os/Dock.tsx`, `DesktopIcons.tsx` |
| Wallpaper | `src/components/os/Wallpaper.tsx` |
| Ventanas | `src/components/os/WindowFrame.tsx`, `WindowManager.tsx` |
| HUD de progreso | `src/components/os/Hud.tsx` |
| Mapa de señal | `src/components/os/SignalMap.tsx` |
| Modal final | `src/components/os/Recognized.tsx` |
| Buscador | `src/components/os/Spotlight.tsx` |
| Notificaciones | `src/components/os/Notifications.tsx` |
| Apps | `src/components/os/apps/*.tsx` (incluye `SettingsApp.tsx`) |
| UI base | `src/components/ui/{button,badge,input}.tsx` |

### FERRO.OS (a modificar)
| Área | Archivo |
|---|---|
| Tipos de misión (duplicado a resolver) | `src/features/ferro-core/types.ts`, `src/features/ferro-core/utils/mission-system.ts` |
| Contexto de misiones/progreso | `src/features/ferro-core/context/ferro-core-context.tsx` |
| Progreso de exploración | `src/features/ferro-core/utils/explorer-progress.ts` |
| Logros | `src/features/ferro-core/utils/achievement-system.ts` |
| Store unificado de misiones/exploración (nuevo, M2) | `src/store/ferro-core-store.ts` |
| ~~Persistencia perfil~~ / ~~Singletons~~ | Eliminados en M2 (`explorer-profile-storage.ts`, `discovery-registry.ts`, `history-log.ts`) — lógica movida a `ferro-core-store.ts` |
| Registro de ventanas (✅ `code-studio` agregado en M3) | `src/features/window-system/registry/index.ts` |
| Render de ventana (if/else — **se mantiene, no tocar**) | `src/features/window-system/components/window-shell.tsx` |
| Contexto de ventanas (**se mantiene, no tocar**) | `src/features/window-system/context/window-context.tsx` |
| Resolver ventana | `src/features/window-system/utils/open-module.ts` |
| Fuente única de ítems del launcher (nuevo, M3) | `src/components/workspace/launcher-items.ts` |
| Iconos escritorio / dock (✅ unificados en M3, derivan label/icon del registry) | `src/components/workspace/desktop-icons.tsx`, `dock.tsx` |
| ~~Hook vacío~~ | Eliminado en M3 (`window-system/hooks/use-window-manager.ts`) |
| Terminal (ID de misión roto) | `src/features/terminal/utils/command-engine.ts` |
| Estilos globales | `src/app/globals.css` |
| Tokens JS duplicados | `src/lib/theme.ts` |
| Theme store | `src/features/*/theme-store.ts` (Zustand+persist, ya correcto) |
| Wallpaper store | `wallpaper-store.ts` (Zustand+persist, ya correcto) |
| Settings actual (monolítico) | `src/features/settings/components/settings-module.tsx` |
| Boot / welcome (doble gate) | `src/app/page.tsx`, `welcome-sequence.tsx`, `boot-screen.tsx` |
| Layout raíz (`lang="en"` fijo) | `src/app/layout.tsx` |

---

## Orden sugerido de trabajo

```
M1 (diseño) ─┐
             ├─> M2 (estado/misiones) ─> M3 (fix puntual window) ─> M4 (HUD/UI misiones) ─> M5 (mapa de señal)
             │                                                                                   │
             └─────────────────────────> M6 (i18n) ─> M7 (settings) <────────────────────────────┘
                                                          │
                                                          v
                                                    M8 (cierre + QA)
```

M1 puede avanzar en paralelo a M2 (son independientes). M3 es rápido (fix puntual, no rediseño) y puede resolverse en paralelo con M1/M2 apenas se identifiquen los IDs faltantes. M6 (i18n) conviene resolverlo antes o junto con M4/M5 porque el HUD y el mapa muestran texto traducible. M7 depende de M6 (necesita el toggle de idioma ya construido).
