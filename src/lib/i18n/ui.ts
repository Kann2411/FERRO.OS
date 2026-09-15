import type { Bilingual } from "@/lib/i18n/types";

/**
 * Centralized dictionary of short, reusable UI strings (chrome, labels, aria-labels).
 * Longer domain content (missions, achievements, module data) lives next to its
 * definitions and is translated via `useT()` instead of duplicated here.
 */
export const ui = {
  // Shell header
  brandLine: { es: "FERRO.OS / estación", en: "FERRO.OS / workspace" },
  settings: { es: "Ajustes", en: "Settings" },
  resetFlow: { es: "Reiniciar flujo", en: "Reset flow" },
  resetFlowConfirm: {
    es: "¿Reiniciar todo el flujo de exploración y volver a cero?",
    en: "Reset the entire workspace flow and return to zero?",
  },
  missionHintLabel: { es: "Misión", en: "Mission" },
  missionHintText: {
    es: "Explora el escritorio, desbloquea las señales ocultas y comienza a dar forma al sistema operativo.",
    en: "Explore the desktop, unlock the hidden signals, and begin shaping the operating system.",
  },
  desktopApplications: { es: "Aplicaciones del escritorio", en: "Desktop applications" },
  explorerInformation: { es: "Información del explorador", en: "Explorer information" },
  applicationDock: { es: "Dock de aplicaciones", en: "Application dock" },
  mobileApplicationDock: { es: "Dock de aplicaciones móvil", en: "Mobile application dock" },
  currentMissionHint: { es: "Pista de la misión actual", en: "Current mission hint" },
  openSignalMap: { es: "Abrir mapa de señal", en: "Open signal map" },
  newlyUnlocked: { es: "Recién desbloqueado", en: "Newly unlocked" },

  // Language toggle
  languageToggleLabel: { es: "Cambiar idioma", en: "Switch language" },
  languageSectionTitle: { es: "Idioma", en: "Language" },
  languageSectionDescription: {
    es: "Elige el idioma de toda la interfaz. Tu preferencia se guarda automáticamente.",
    en: "Choose the language for the whole interface. Your preference is saved automatically.",
  },
  languageSpanish: { es: "Español", en: "Spanish" },
  languageEnglish: { es: "Inglés", en: "English" },

  // Mission board
  missionSystem: { es: "Sistema de misiones", en: "Mission system" },
  activeObjectives: { es: "Objetivos activos", en: "Active objectives" },
  missions: { es: "Misiones", en: "Missions" },
  missionStatusDone: { es: "Completada", en: "Done" },
  missionStatusLocked: { es: "Bloqueada", en: "Locked" },
  missionStatusReady: { es: "Disponible", en: "Ready" },

  // Signal map
  signalMapKicker: { es: "Mapa de señal", en: "Signal map" },
  signalMapChainRecognized: { es: "Cadena reconocida", en: "Chain recognized" },
  signalMapFallbackTitle: { es: "Cadena de señal", en: "Signal chain" },
  signalMapAllDoneText: {
    es: "Se ha mapeado cada señal. La cadena de exploración está completa.",
    en: "Every signal has been mapped. The exploration chain is complete.",
  },
  signalMapFallbackText: {
    es: "Sigue explorando para extender la cadena de señal.",
    en: "Continue exploring to extend the signal chain.",
  },
  closeSignalMap: { es: "Cerrar mapa de señal", en: "Close signal map" },

  // Notifications & messages
  notificationsRegion: { es: "Notificaciones", en: "Notifications" },
  dismissNotification: { es: "Descartar notificación", en: "Dismiss notification" },
  ferroCoreMessages: { es: "Mensajes de FERRO CORE", en: "FERRO CORE messages" },
  ferroCoreKicker: { es: "FERRO CORE", en: "FERRO CORE" },
  coreKicker: { es: "Núcleo", en: "Core" },
  coreTagline: {
    es: "La mente interior del sistema operativo.",
    en: "The operating system's inner mind.",
  },

  // Explorer profile card
  explorerHud: { es: "HUD del explorador", en: "Explorer HUD" },
  signalRecognized: { es: "Señal reconocida", en: "Recognized signal" },
  signalBuilding: { es: "Señal en construcción", en: "Signal building" },
  modulesIndexed: { es: "módulos indexados", en: "modules indexed" },
  level: { es: "Nivel", en: "Level" },
  signalStrength: { es: "Intensidad de señal", en: "Signal strength" },
  progress: { es: "Progreso", en: "Progress" },
  mission: { es: "Misión", en: "Mission" },
  modules: { es: "Módulos", en: "Modules" },
  achievements: { es: "Logros", en: "Achievements" },
  activeSignal: { es: "Señal activa", en: "Active signal" },
  allSystemsAligned: { es: "Todos los sistemas alineados", en: "All systems aligned" },
  timeExplored: { es: "Tiempo explorado", en: "Time explored" },
  signalChain: { es: "Cadena de señal", en: "Signal chain" },
  noRecentActivity: {
    es: "Tus primeros descubrimientos aparecerán aquí a medida que el sistema aprende tu ritmo.",
    en: "Your first discoveries will appear here as the system learns your rhythm.",
  },
  explorer: { es: "Explorador", en: "Explorer" },
  discovered: { es: "Descubierto", en: "Discovered" },

  // Welcome sequence
  welcomeKicker: { es: "Bienvenida", en: "Welcome" },
  welcomeAwakened: { es: "despertó", en: "awakened" },
  cinematicIntro: { es: "Introducción cinemática", en: "Cinematic introduction" },
  welcomeHeadline: {
    es: "El sistema está listo para recordarte.",
    en: "The system is ready to remember you.",
  },
  welcomeBody: {
    es: "FERRO CORE se activa como la inteligencia silenciosa detrás de la experiencia. Observa tu curiosidad, aprende de cada interacción y comienza a moldear un camino único a través del sistema operativo.",
    en: "FERRO CORE opens as the quiet intelligence behind the experience. It observes your curiosity, learns from every interaction, and begins shaping a unique path through the operating system.",
  },
  beginExploration: { es: "Comenzar exploración", en: "Begin exploration" },
  firstVisitMemory: {
    es: "Primera visita • memoria local activada",
    en: "First visit • local memory enabled",
  },
  systemState: { es: "Estado del sistema", en: "System state" },
  welcomeDialogLabel: { es: "Bienvenido a FERRO.OS", en: "Welcome to FERRO.OS" },
  beginExploringAria: { es: "Comenzar a explorar FERRO.OS", en: "Begin exploring FERRO.OS" },
  systemStateInfoAria: { es: "Información del estado del sistema", en: "System state information" },

  // Boot screen
  bootLine1: { es: "FERRO SYSTEMS INC.", en: "FERRO SYSTEMS INC." },
  bootLine2: { es: "Inicializando kernel...", en: "Initializing kernel..." },
  bootLine3: { es: "Cargando módulos principales...", en: "Loading core modules..." },
  bootLine4: { es: "Montando estación de trabajo...", en: "Mounting workspace..." },
  bootLine5: { es: "Iniciando FERRO CORE...", en: "Starting FERRO CORE..." },
  bootLine6: { es: "Sistema listo.", en: "System ready." },
  bootingAria: { es: "Iniciando FERRO.OS", en: "Booting FERRO.OS" },

  // Settings module (audio + wallpapers, expanded fully in Milestone 7)
  settingsAudioTitle: { es: "Controles de audio", en: "Audio Controls" },
  settingsAudioDescription: {
    es: "Gestiona la experiencia de audio de la estación: activa o desactiva el sonido, ajusta los volúmenes y prueba muestras de cada categoría.",
    en: "Manage the audio experience for the workspace: enable or disable sound, tune volumes, and preview category samples.",
  },
  enableAudio: { es: "Activar audio", en: "Enable audio" },
  enableAudioDescription: {
    es: "Activa o desactiva el audio en todo el entorno. Tu preferencia se guarda automáticamente.",
    en: "Toggle audio across the entire environment. Your preference is saved automatically.",
  },
  masterVolume: { es: "Volumen general", en: "Master volume" },
  effectsVolume: { es: "Volumen de efectos", en: "Effects volume" },
  ambientVolume: { es: "Volumen ambiental", en: "Ambient volume" },
  uiPreview: { es: "Vista previa de interfaz", en: "UI preview" },
  playClick: { es: "Reproducir clic", en: "Play click" },
  terminalPreview: { es: "Vista previa de terminal", en: "Terminal preview" },
  playType: { es: "Reproducir tecleo", en: "Play type" },
  ambientPreview: { es: "Vista previa ambiental", en: "Ambient preview" },
  playDrift: { es: "Reproducir ambiente", en: "Play drift" },
  hiddenWallpapers: { es: "Fondos ocultos", en: "Hidden wallpapers" },
  hiddenWallpapersDescription: {
    es: "Desbloquea fondos secretos explorando el sistema. Los fondos seleccionados permanecen disponibles una vez descubiertos.",
    en: "Unlock secret wallpapers through exploration. Selected wallpapers remain available once discovered.",
  },
  wallpaperSelected: { es: "Seleccionado", en: "Selected" },
  wallpaperSelect: { es: "Seleccionar", en: "Select" },
  wallpaperLocked: { es: "Bloqueado", en: "Locked" },
  audioState: { es: "Estado del audio", en: "Audio state" },
  audioStateDescription: {
    es: "Los ajustes de audio persisten entre sesiones y se actualizan al instante al mover los controles.",
    en: "Audio settings persist between sessions and update immediately as you adjust the sliders.",
  },

  // Projects module
  developerPortfolio: { es: "Portafolio de desarrollo", en: "Developer portfolio" },
  selectedSystems: { es: "Sistemas seleccionados", en: "Selected systems" },
  active: { es: "activos", en: "active" },
  noProjectsYet: { es: "Aún no hay proyectos", en: "No projects yet" },
  noProjectsMessage: {
    es: "Los proyectos aparecerán aquí cuando se carguen los datos desde la API.",
    en: "Projects will appear here when data is loaded from the API.",
  },
  impact: { es: "Impacto", en: "Impact" },
  futureReady: { es: "Listo para el futuro", en: "Future-ready" },
  futureReadyMessage: {
    es: "La estructura está preparada para consumir datos de proyectos desde una API en fases posteriores sin cambiar la superficie del módulo.",
    en: "The structure is prepared to consume project data from an API in later phases without changing the module surface.",
  },

  // Resume module
  resumeProfileKicker: { es: "Perfil profesional", en: "Professional profile" },
  downloadPdf: { es: "Descargar PDF", en: "Download PDF" },
  summary: { es: "Resumen", en: "Summary" },
  experienceLabel: { es: "Experiencia", en: "Experience" },
  educationLabel: { es: "Educación", en: "Education" },
  certificationsLabel: { es: "Certificaciones", en: "Certifications" },
  languagesLabel: { es: "Idiomas", en: "Languages" },

  // Skills module
  technologyStackKicker: { es: "Pila tecnológica", en: "Technology stack" },
  coreCapabilities: { es: "Capacidades principales", en: "Core capabilities" },
  categoriesLabel: { es: "categorías", en: "categories" },
  flexibleDataModel: { es: "Modelo de datos flexible", en: "Flexible data model" },
  flexibleDataModelMessage: {
    es: "Este módulo está preparado para evolucionar hacia una matriz de habilidades más completa impulsada por API sin cambiar la capa de presentación.",
    en: "This module is prepared to evolve into a richer API-driven skills matrix without changing the presentation layer.",
  },

  // Timeline module
  professionalEvolution: { es: "Evolución profesional", en: "Professional evolution" },
  operatingSystemTimeline: { es: "Línea de tiempo del sistema operativo", en: "Operating system timeline" },
  verticalJourney: { es: "Recorrido vertical", en: "Vertical journey" },
  versionLabel: { es: "Versión", en: "Version" },

  // Settings — theme section
  themeSectionKicker: { es: "Apariencia", en: "Appearance" },
  themeSectionTitle: { es: "Tema", en: "Theme" },
  themeDarkActive: { es: "Modo oscuro activo", en: "Dark mode active" },
  themeLightActive: { es: "Modo claro activo", en: "Light mode active" },

  // Settings — accessibility section
  accessibilitySectionKicker: { es: "Accesibilidad", en: "Accessibility" },
  accessibilitySectionTitle: { es: "Preferencias de accesibilidad", en: "Accessibility preferences" },
  reducedMotionLabel: { es: "Reducir movimiento", en: "Reduced motion" },
  reducedMotionDescription: {
    es: "Minimiza animaciones y transiciones en toda la interfaz.",
    en: "Minimizes animations and transitions across the interface.",
  },
  highContrastLabel: { es: "Alto contraste", en: "High contrast" },
  highContrastDescription: {
    es: "Refuerza bordes y contornos para mejorar la legibilidad.",
    en: "Strengthens borders and outlines to improve legibility.",
  },
  prefSystem: { es: "Sistema", en: "System" },
  prefOn: { es: "Activado", en: "On" },
  prefOff: { es: "Desactivado", en: "Off" },

  // Settings — reset section
  resetSectionKicker: { es: "Zona de reinicio", en: "Reset zone" },
  resetFlowDescription: {
    es: "Borra todo el progreso (misiones, logros, notificaciones, módulos visitados y ventanas) y vuelve a mostrar la secuencia de arranque, como en la primera visita.",
    en: "Clears all progress (missions, achievements, notifications, visited modules, and windows) and shows the boot sequence again, like a first visit.",
  },

  // Recognized modal (final close-out)
  recognizedDialogLabel: { es: "Señal reconocida", en: "Signal recognized" },
  recognizedKicker: { es: "Cadena completa", en: "Chain complete" },
  recognizedHeadline: { es: "Señal reconocida", en: "Signal recognized" },
  recognizedBody: {
    es: "FERRO CORE registró cada señal de la cadena de exploración. El sistema completo ha sido recorrido, de principio a fin.",
    en: "FERRO CORE has logged every signal in the exploration chain. The full system has been traced, start to finish.",
  },
  recognizedMissionsLabel: { es: "Misiones completadas", en: "Missions completed" },
  recognizedAchievementsLabel: { es: "Logros desbloqueados", en: "Achievements unlocked" },
  recognizedModulesLabel: { es: "Módulos descubiertos", en: "Modules discovered" },
  recognizedTimeLabel: { es: "Tiempo total explorado", en: "Total time explored" },
  returnToWorkspace: { es: "Volver a la estación", en: "Return to workspace" },
  viewSignalMapAgain: { es: "Ver mapa de señal", en: "View signal map" },
} as const satisfies Record<string, Bilingual>;

export type UiKey = keyof typeof ui;

export const windowTitles: Record<string, Bilingual> = {
  desktop: { es: "Escritorio", en: "Desktop" },
  projects: { es: "Proyectos", en: "Projects" },
  studio: { es: "Estudio", en: "Studio" },
  discography: { es: "Discografía", en: "Discography" },
  audioPlayer: { es: "Reproductor de audio", en: "Audio Player" },
  equipment: { es: "Equipo", en: "Equipment" },
  resume: { es: "Currículum", en: "Resume" },
  skills: { es: "Habilidades", en: "Skills" },
  timeline: { es: "Línea de tiempo", en: "Timeline" },
  terminal: { es: "Terminal", en: "Terminal" },
  explorer: { es: "Explorador", en: "Explorer" },
  settings: { es: "Ajustes", en: "Settings" },
  aiLab: { es: "Laboratorio de IA", en: "AI Lab" },
  debugConsole: { es: "Consola de depuración", en: "Debug Console" },
  "code-studio": { es: "Estudio de código", en: "Code Studio" },
};
