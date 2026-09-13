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

- [ ] Eliminar la duplicidad de `MissionDefinition`: dejar **un solo** tipo en `src/features/ferro-core/types.ts`, con el campo `unlocksModule` (el que sí se usa en runtime), y borrar la interfaz duplicada de `mission-system.ts`.
- [ ] Convertir `missions` a un **array ordenado** (como el demo), donde el orden del array define la cadena (`prerequisite` pasa a ser implícito por índice, o se mantiene explícito pero debe coincidir 1:1 con el índice — elegir uno y purgar el otro).
- [ ] Normalizar **todos** los IDs de módulo a kebab-case en: `mission-system.ts`, `explorer-progress.ts`, `achievement-system.ts`, `windowRegistry`, `desktop-icons.tsx`, `dock.tsx`, `command-engine.ts`. Buscar y unificar: `audioPlayer→audio-player`, `aiLab→ai-lab`, `debugConsole→debug-console`.
- [ ] Corregir el bug de `code-studio`: agregar su entrada faltante a `windowRegistry` (ver también Milestone 3).
- [ ] Corregir el ID de misión fantasma: `command-engine.ts` debe llamar `completeMission("visit-ai-lab")`, no `"unlock-ai-lab"`.
- [ ] Reescribir `completeMission` siguiendo el patrón del demo:
  - [ ] Idempotente (`if already completed, return`).
  - [ ] Aplica `missionDef.reward` real (eliminar el `+5` hardcodeado que ignora el campo `reward`).
  - [ ] Valida que el `missionId` exista en `missionDefinitions` antes de escribir estado (evita entradas huérfanas).
  - [ ] Genera notificación (toast) como efecto del completar.
  - [ ] Si existe una misión de "cierre de cadena" (equivalente a `lock` del demo), auto-completarla vía `queueMicrotask` cuando todas las previas estén hechas, y disparar el modal final (Milestone 7).
- [ ] Portar los helpers puros `progressOf(completed)` y `activeMission(completed)` — deben ser las únicas fuentes de "cuál es el % de progreso" y "cuál es la misión activa" (nada de recalcular esto en cada componente).
- [ ] Migrar `FerroCoreContext` (misiones, logros, progreso, notificaciones) a un store Zustand con `persist` y `partialize`, siguiendo el mismo patrón que ya usan `theme-store.ts`/`wallpaper-store.ts` en este proyecto — eliminando el manejo manual de `localStorage`/`sessionStorage` duplicado en el propio contexto. **Alcance acotado a `ferro-core`**: esto no implica tocar `WindowContext` (Milestone 3 lo deja intacto).
- [ ] Migrar `discovery-registry.ts` y `history-log.ts` de singletons mutables a estado dentro del mismo store de misiones (o slices separados), eliminando las variables globales de módulo (son inseguras en SSR/hot-reload).
- [ ] Actualizar `blueprint/agent/PHASE12.md`: el front-matter dice `Status: Pending` pero los milestones 12.1–12.7 ya están implementados según el historial de git — corregir el estado para que el blueprint deje de estar desincronizado del código.

**Criterio de cierre:** un solo lugar (`missionDefinitions` + store) define el flujo de misiones; ningún componente mantiene su propia copia de "qué misión sigue" o "cuánto progreso hay".

---

## Milestone 3 — Fix puntual de módulos rotos (sin tocar la arquitectura del window system)

**El window system funciona y no se rediseña.** Este milestone es deliberadamente pequeño: corrige solo los defectos concretos que impiden que lo ya construido funcione bien, sin introducir un patrón nuevo.

- [ ] Agregar la entrada faltante de `code-studio` a `windowRegistry` (`src/features/window-system/registry/index.ts`) con la convención kebab-case — verificar en el navegador que el ícono ahora sí abre la ventana. Esto es un bug fix de una línea/entrada, no un rediseño del registry.
- [ ] Unificar `allItems` (`desktop-icons.tsx`) y `allApps` (`dock.tsx`): hoy son dos arrays hardcodeados casi idénticos que ya están desincronizados (causa raíz del bug de `code-studio`). Extraer un único array fuente (puede vivir en el propio `windowRegistry` o en un archivo de configuración compartido junto a él) y que ambos componentes lo consuman filtrando por `unlockedModules` — sin cambiar cómo `desktop-icons`/`dock` renderizan ni cómo abren ventanas.
- [ ] Normalizar los IDs camelCase→kebab-case en estos mismos archivos (`audioPlayer→audio-player`, `aiLab→ai-lab`, `debugConsole→debug-console`), consistente con la decisión 3 de la sección 0.
- [ ] Revisar `use-window-manager.ts` (hook wrapper vacío que hoy no aporta nada): si no tiene un propósito claro, eliminarlo y usar `useWindowContext()` directo — es limpieza menor, no arquitectura.
- [ ] El if/else de render en `window-shell.tsx` **se deja como está**. No es un milestone para refactorizarlo; si en el futuro se vuelve un problema real de mantenibilidad se evalúa aparte, fuera de esta migración.

**Criterio de cierre:** abrir cualquier módulo desbloqueado desde dock o desktop funciona sin excepciones silenciosas (incluido Code Studio); las listas de apps de dock y desktop nunca vuelven a desincronizarse porque comparten una única fuente.

---

## Milestone 4 — Flujo de misiones: UI (HUD, notificaciones, badges)

Con el modelo de datos ya saneado (Milestone 2), portar la capa visual del demo:

- [ ] **HUD lateral** (equivalente a `Hud.tsx`): panel colapsable solo desktop, con barra de "fuerza de señal" (gradiente accent→signal), grid de stats (progreso/misión activa/módulos/logros), lista completa de la cadena de misiones con 3 estados visuales (completada=verde, actual=rojo destacado, pendiente=gris). Adaptar al `mission-board.tsx` existente o reemplazarlo.
- [ ] **Versión mobile compacta del HUD** (solo misión actual + %).
- [ ] **Notificaciones/toasts** (`Notifications.tsx` del demo): cola de máx. 4, auto-dismiss ~4200ms, iconos distintos para logro vs misión, animación `.toast-in`. Verificar si ya existe un sistema de notificaciones en FERRO.OS y decidir si se reemplaza o se adapta.
- [ ] **Badges de "sin explorar"** en dock/desktop-icons: punto rojo sobre el ícono de módulos cuya misión asociada aún no se completó.
- [ ] **Píldora de progreso en la barra superior** (equivalente a `MenuBar`): `● {pct}% · {done}/{total}`, click abre el mapa de señal (Milestone 5).
- [ ] Resolver el doble gating de boot/welcome (`page.tsx` + `welcome-sequence.tsx` chequean lo mismo por separado) — dejar un único gate basado en el store.
- [ ] `BootScreen`: no debe reproducirse en cada carga si el usuario ya lo completó (salvo `resetFlow`), y debe saltarse directo si `reduceMotion` está activo (falta hoy).

**Criterio de cierre:** completar acciones normales de exploración (abrir apps, leer el resume, usar la terminal) actualiza visiblemente el HUD/badges/notificaciones sin refrescar la página.

---

## Milestone 5 — Mapa de señal (Signal Map)

- [ ] Portar `SignalMap.tsx` tal cual: SVG `viewBox="0 0 100 100"`, nodos con coordenadas fijas 1:1 con los IDs de `missions`, path de fondo tenue conectando todos los nodos en orden, segmentos "encendidos" en verde solo cuando ambos extremos de un tramo están completados.
- [ ] Definir las coordenadas de nodos para la cadena de misiones **real** de FERRO.OS (no copiar las del demo, que corresponden a otras misiones) — mapear 1:1 con los IDs kebab-case unificados en Milestone 2.
- [ ] Estados visuales de nodo: completado (verde sólido), actual (rojo pulsante, clase `.signal-dot`), pendiente (gris).
- [ ] Modal overlay con el mismo patrón que el resto (backdrop + `stopPropagation`, animación `.window-in`), no una `WindowFrame` del sistema de ventanas.
- [ ] Puntos de entrada: botón brújula flotante, botón en barra superior, píldora de progreso, botón "Abrir mapa" en el HUD, y apertura automática al completar la cadena completa.
- [ ] Efecto meta: abrir el mapa por primera vez cuenta como su propia misión/logro (igual que en el demo) — decidir si aplica al flujo de FERRO.OS.

**Criterio de cierre:** el mapa refleja en tiempo real el estado de `completedMissions` sin duplicar esa lógica (usa los mismos helpers `progressOf`/`activeMission` de Milestone 2).

---

## Milestone 6 — i18n y selector de idioma

- [ ] Decidir el mecanismo: **no** usar routing por idioma (`/es`, `/en`) para mantener paridad simple con el demo — usar el mismo patrón de store global (`lang: "es" | "en"`) + objetos `{ es, en }` para contenido de dominio.
- [ ] Crear `src/lib/i18n/` (o ubicación equivalente a `content.ts`/`types.ts` del demo) con:
  - [ ] Tipo `Lang = "es" | "en"`.
  - [ ] Diccionario de **strings de UI cortos** centralizado (`ui.ts`, `{ clave: { es, en } }`) — **mejora sobre el demo**, que los tenía en ternarios dispersos por cada componente.
  - [ ] Hook `useT()` que devuelve una función `t(pair)` para contenido de dominio, y `useUi()`/`tUi(key)` para strings de interfaz.
- [ ] Traducir **todo el contenido existente de FERRO.OS** (títulos/descripciones de misiones, módulos, proyectos, terminal, logros, textos de settings, etc.) a la estructura bilingüe `{ es, en }`, con **español como idioma por defecto** (`lang: "es"` inicial en el store, y `<html lang="es">` server-rendered por defecto en `layout.tsx`).
- [ ] Efecto sobre `<html lang>`: actualizar `document.documentElement.lang` al cambiar de idioma (client-side), igual que el demo.
- [ ] **Botón de cambio de idioma**: el demo solo lo pone dentro de Settings — el usuario pidió explícitamente "el cambio de idioma con un botón", así que además de tenerlo en Settings, agregar un botón visible de acceso rápido (barra superior o dock) que alterne ES↔EN con un solo click (mostrando el idioma actual, ej. "ES"/"EN").
- [ ] Revisar accesibilidad: `aria-label` del botón de idioma debe también estar traducido.

**Criterio de cierre:** cambiar el idioma desde el botón rápido o desde Settings traduce instantáneamente toda la UI visible, sin recargar la página, y persiste entre sesiones.

---

## Milestone 7 — Settings completo

Reestructurar `src/features/settings/` para que deje de ser un único componente monolítico y siga el patrón de carpetas del resto de features (`components/`, `context|store/`, `types.ts`):

- [ ] **Idioma**: dos botones (Español/English) con variante activa, igual patrón visual que el demo.
- [ ] **Tema**: mantener el toggle día/noche ya existente, integrarlo visualmente al nuevo panel de Settings.
- [ ] **Wallpaper**: lista de wallpapers desbloqueados (ya existe `wallpaper-store.ts` — conectar aquí en vez de tenerlo aparte).
- [ ] **Audio**: mantener lo ya implementado (enable/disable, volúmenes master/effects/ambient).
- [ ] **Accesibilidad**: exponer aquí los hooks ya existentes pero no conectados a UI (`useReducedMotion`, `useHighContrast`) como toggles reales — hoy existen pero Settings no los expone.
- [ ] **"Reiniciar flujo de exploración"**: botón que limpia todo el progreso (misiones, logros, notificaciones, apps visitadas, ventanas) y vuelve a mostrar el boot — mover aquí el botón que hoy vive suelto en `desktop-shell.tsx`.
- [ ] Verificar tamaño/posición de la ventana de Settings en el registry (Milestone 3).

**Criterio de cierre:** Settings es un feature autocontenido, sin lógica de audio/wallpaper/reset dispersa en `desktop-shell.tsx` o en otros componentes.

---

## Milestone 8 — Cierre narrativo, pulido y QA final

- [ ] **Modal "señal reconocida"** (equivalente a `Recognized.tsx`): se muestra al completar toda la cadena de misiones, resumen final (conteo de misiones/logros), botón para volver al workspace.
- [ ] **(Opcional, valorar con el usuario)** Spotlight / buscador Cmd+K: overlay de búsqueda rápida sobre apps y proyectos, atajo `/` y `Cmd/Ctrl+K`.
- [ ] Actualizar `blueprint/05-DESIGN-SYSTEM.md` para reflejar: tipografía real (Outfit + IBM Plex Mono), tokens nuevos (surface-2/3, signal, muted/subtle), y la decisión consciente de mantener tema claro/oscuro (documentar el porqué de la divergencia respecto al blueprint original "solo oscuro").
- [ ] Actualizar `blueprint/04-MODULES.md` / `06-GAMEPLAY.md` si los umbrales de desbloqueo cambian al unificar con la cadena de misiones tipo demo.
- [ ] QA manual completo del flujo: boot → explorar cada módulo → completar cada misión → abrir mapa de señal → completar cadena → modal final — en español y en inglés, en desktop y mobile.
- [ ] Verificar `prefers-reduced-motion` y el toggle manual de "menos movimiento" en todas las animaciones nuevas (grain, stars, signal-pulse, boot-caret, toasts, window-in).
- [ ] Revisar consistencia de nomenclatura de archivos de fase en `blueprint/agent/` (`PHASE-03.md`...`PHASE-11.md` vs `PHASE12.md`) y unificar el patrón.

**Criterio de cierre:** experiencia completa jugable de punta a punta, en paridad visual con el demo, en español por defecto, sin los bugs identificados en la auditoría inicial.

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
| Persistencia perfil | `src/features/ferro-core/utils/explorer-profile-storage.ts` |
| Singletons a migrar | `discovery-registry.ts`, `history-log.ts` |
| Registro de ventanas (agregar `code-studio`) | `src/features/window-system/registry/index.ts` |
| Render de ventana (if/else — **se mantiene, no tocar**) | `src/features/window-system/components/window-shell.tsx` |
| Contexto de ventanas (**se mantiene, no tocar**) | `src/features/window-system/context/window-context.tsx` |
| Resolver ventana | `src/features/window-system/utils/open-module.ts` |
| Iconos escritorio / dock (listas duplicadas a unificar) | `src/components/workspace/desktop-icons.tsx`, `dock.tsx` |
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
