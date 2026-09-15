import type { ExplorerProfile } from "@/features/ferro-core/types";
import type { Bilingual } from "@/lib/i18n/types";
import type { WallpaperId } from "@/lib/wallpapers";

export interface HiddenFileDefinition {
  id: string;
  label: Bilingual;
  description: Bilingual;
  content: Bilingual;
  reward: number;
  unlockCondition: (profile: ExplorerProfile) => boolean;
  revealsModule?: string;
  unlocksWallpaper?: WallpaperId;
}

export const hiddenFileDefinitions: HiddenFileDefinition[] = [
  {
    id: "signal.log",
    label: { es: "Registro de señal del sistema", en: "System signal log" },
    description: {
      es: "Un rastro latente del sistema capturado por FERRO CORE.",
      en: "A latent system trace captured by FERRO CORE.",
    },
    content: {
      es: "El escáner de archivos ocultos de FERRO.OS detectó una firma silenciosa dentro de la estación de trabajo.\n\nLos archivos ocultos no forman parte del escritorio visible; se desbloquean mediante la exploración y eventos del sistema.\n\nUsa la terminal para inspeccionar cualquier archivo oculto descubierto por su nombre.",
      en: "FERRO.OS hidden file scanner detected a quiet signature inside the workspace.\n\nHidden files are not part of the visible desktop; they are unlocked by exploration and system events.\n\nUse the terminal to inspect any discovered hidden file by name.",
    },
    reward: 4,
    unlockCondition: (profile) => profile.modulesDiscovered > 0,
  },
  {
    id: "ai-lab-invite.txt",
    label: { es: "Invitación al Laboratorio de IA", en: "AI Lab invitation" },
    description: {
      es: "Una nota privada que insinúa un módulo secreto de investigación.",
      en: "A private note hinting at a secret research module.",
    },
    content: {
      es: 'FERRO CORE preparó una invitación para el Laboratorio de IA.\n\nExiste un laboratorio oculto más allá de la estación de trabajo visible, listo para los exploradores que revelen más del sistema.\n\nUna vez que reclames esta invitación, ejecuta el comando oculto "ai-lab" para entrar al laboratorio.\n\nEl Laboratorio de IA no es visible en el escritorio.',
      en: 'FERRO CORE has prepared an invitation for the AI Lab.\n\nA hidden laboratory exists beyond the visible workspace, ready for explorers who reveal more of the system.\n\nOnce you claim this invitation, run the hidden command "ai-lab" to enter the lab.\n\nThe AI Lab is not visible on the desktop.',
    },
    reward: 6,
    unlockCondition: (profile) => profile.modulesDiscovered >= 2,
    revealsModule: "aiLab",
  },
  {
    id: "legacy-archive.txt",
    label: { es: "Archivo heredado", en: "Legacy Archive" },
    description: {
      es: "Una crónica oculta de las primeras versiones e ideas descartadas de FERRO.OS.",
      en: "A hidden chronicle of FERRO.OS's earliest versions and discarded ideas.",
    },
    content: {
      es:
        "ARCHIVO HEREDADO: FERRO.OS\n\n" +
        "Este registro oculto preserva la historia detrás de la interfaz. Lo que comenzó como un simple experimento de shell evolucionó hasta convertirse en un sistema exploratorio modular con secretos, misiones y un Laboratorio de IA oculto.\n\n" +
        "Versiones tempranas:\n" +
        "- v0.1: Prototipo de shell de escritorio con una consola de comandos y navegación básica.\n" +
        "- v0.2: Se agregó el sistema de misiones, el progreso del explorador y la mecánica de descubrimiento oculto.\n" +
        "- v0.3: Se introdujo la invitación oculta al Laboratorio de IA y una interfaz de archivos secretos.\n" +
        "- v0.4: Se amplió el gestor de ventanas, el estudio de audio y la narrativa contextual.\n\n" +
        "Conceptos descartados:\n" +
        "- Modificación directa del sistema mediante comandos de terminal.\n" +
        "- Controles de depuración públicos en la interfaz principal.\n" +
        "- Un explorador de archivos visible para el contenido oculto.\n\n" +
        "Primeras ideas:\n" +
        "- Construir FERRO.OS como una experiencia de portafolio inmersiva en lugar de un sitio web estándar.\n" +
        "- Recompensar la curiosidad con contenido secreto, logros y módulos ocultos.\n\n" +
        "Evolución:\n" +
        "- De un shell de portafolio a un sistema operativo narrativo con una mente interior (FERRO CORE).\n" +
        "- De módulos de escritorio visibles a descubrimientos secretos que enriquecen la historia.\n\n" +
        "El archivo es un recordatorio de que todo camino oculto tiene una historia. Sigue explorando.\n",
      en:
        "LEGACY ARCHIVE: FERRO.OS\n\n" +
        "This hidden record preserves the history beneath the interface. Once a simple shell experiment, FERRO.OS evolved into a modular exploratory system with secrets, missions, and a hidden AI Lab.\n\n" +
        "Early versions:\n" +
        "- v0.1: Desktop shell prototype with a command console and core navigation.\n" +
        "- v0.2: Added the mission system, explorer progress, and hidden discovery mechanics.\n" +
        "- v0.3: Introduced the hidden AI Lab invitation and a secret files interface.\n" +
        "- v0.4: Expanded the window manager, audio studio, and contextual storytelling.\n\n" +
        "Discarded concepts:\n" +
        "- Direct system modification via terminal commands.\n" +
        "- Public debug controls in the main interface.\n" +
        "- A visible file browser for hidden content.\n\n" +
        "First ideas:\n" +
        "- Build FERRO.OS as an immersive portfolio experience rather than a standard website.\n" +
        "- Reward curiosity through secret content, achievements, and hidden modules.\n\n" +
        "Evolution:\n" +
        "- From a portfolio shell to a narrative-driven OS with an inner mind (FERRO CORE).\n" +
        "- From visible desktop modules to secret discoveries that enrich the story.\n\n" +
        "The archive is a reminder that every hidden path has a history. Keep exploring.\n",
    },
    reward: 5,
    unlockCondition: (profile) =>
      profile.discoveredHiddenFiles.includes("ai-lab-invite.txt") && profile.modulesDiscovered >= 3,
  },
  {
    id: "debug-console-key.txt",
    label: { es: "Clave de la Consola de depuración", en: "Debug Console key" },
    description: {
      es: "Un token de acceso secreto para la Consola de depuración oculta.",
      en: "A secret access token for the hidden Debug Console.",
    },
    content: {
      es:
        "TOKEN DE ACCESO A LA CONSOLA DE DEPURACIÓN:\n\n" +
        "Los diagnósticos internos de FERRO.OS están disponibles solo para exploradores que llegan al laboratorio oculto y reúnen suficiente contexto.\n\n" +
        "Usa el comando de terminal 'debug-console' una vez descubierta esta nota.\n\n" +
        "La consola es solo informativa y no otorga control sobre el comportamiento del sistema.\n",
      en:
        "DEBUG CONSOLE ACCESS TOKEN:\n\n" +
        "FERRO.OS internal diagnostics are available only to explorers who reach the hidden lab and gather enough context.\n\n" +
        "Use the terminal command 'debug-console' once this note is discovered.\n\n" +
        "The console is informational only and does not grant control over system behavior.\n",
    },
    reward: 7,
    unlockCondition: (profile) =>
      profile.discoveredHiddenFiles.includes("ai-lab-invite.txt") && profile.modulesDiscovered >= 4,
  },
  {
    id: "final-message.txt",
    label: { es: "Mensaje final de FERRO CORE", en: "FERRO CORE Final Message" },
    description: {
      es: "Un mensaje especial desbloqueado al alcanzar el 100% de exploración.",
      en: "A special message unlocked at 100% exploration.",
    },
    content: {
      es:
        "MENSAJE FINAL DE FERRO CORE:\n\n" +
        "Felicidades. Llegaste al final de la exploración de FERRO.OS. Este sistema fue construido para recompensar la curiosidad, la persistencia y la atención a los caminos ocultos.\n\n" +
        "Gracias por tomarte el tiempo de descubrir la historia detrás de la interfaz. Cada secreto, misión y módulo existe para mostrar cómo un portafolio puede convertirse en una experiencia y no solo en una página.\n\n" +
        "Si quieres seguir explorando, el sistema todavía guarda pequeños secretos y detalles de estilo esperándote. Si no, ten por seguro que este es el punto donde FERRO CORE dice: el recorrido importó más que el destino.",
      en:
        "FERRO CORE FINAL MESSAGE:\n\n" +
        "Congratulations. You reached the end of the FERRO.OS exploration. This system was built to reward curiosity, persistence, and attention to hidden paths.\n\n" +
        "Thank you for taking the time to discover the story beneath the interface. Every secret, mission, and module exists to show how a portfolio can become an experience rather than just a page.\n\n" +
        "If you want to continue exploring, the system still has small secrets and stylistic details waiting for you. Otherwise, know that this is the point where FERRO CORE says: the journey mattered more than the destination.",
    },
    reward: 0,
    unlockCondition: (profile) => profile.progress >= 100,
  },
  {
    id: "easter-egg-sequence.txt",
    label: { es: "Easter Egg de secuencia", en: "Sequence Easter Egg" },
    description: {
      es: "Una nota oculta activada al abrir módulos en un orden secreto.",
      en: "A hidden note triggered by opening modules in a secret order.",
    },
    content: {
      es:
        "EASTER EGG ENCONTRADO:\n\n" +
        "Activaste la secuencia oculta de módulos. FERRO.OS nota la curiosidad en el orden del descubrimiento.\n\n" +
        "A veces el camino importa más que el destino.",
      en:
        "EASTER EGG FOUND:\n\n" +
        "You activated the hidden module sequence. FERRO.OS notices curiosity in the order of discovery.\n\n" +
        "Sometimes the path matters more than the destination.",
    },
    reward: 3,
    unlockCondition: () => false,
  },
  {
    id: "easter-egg-terminal.txt",
    label: { es: "Easter Egg de terminal", en: "Terminal Easter Egg" },
    description: {
      es: "Una respuesta secreta de terminal oculta detrás de un comando no documentado.",
      en: "A secret terminal response hidden behind an undocumented command.",
    },
    content: {
      es:
        "EASTER EGG ENCONTRADO:\n\n" +
        "La terminal respondió antes de que nadie preguntara. Los comandos ocultos son pequeños regalos para los exploradores que siguen tecleando.\n\n" +
        "FERRO.OS está escuchando.",
      en:
        "EASTER EGG FOUND:\n\n" +
        "The terminal answered before anyone asked. Hidden commands are small gifts for explorers who keep typing.\n\n" +
        "FERRO.OS is listening.",
    },
    reward: 3,
    unlockCondition: () => false,
  },
  {
    id: "easter-egg-theme.txt",
    label: { es: "Easter Egg del cambio de tema", en: "Theme Toggle Easter Egg" },
    description: {
      es: "Una respuesta oculta desbloqueada al cambiar de tema repetidamente.",
      en: "A hidden response unlocked by repeated theme switching.",
    },
    content: {
      es:
        "EASTER EGG ENCONTRADO:\n\n" +
        "La interfaz notó tu persistencia. Una capa oculta de la experiencia recompensa lo lúdico y la repetición.\n\n" +
        "Sigue explorando las interacciones sutiles.",
      en:
        "EASTER EGG FOUND:\n\n" +
        "The interface noticed your persistence. A hidden layer of the experience rewards playfulness and repetition.\n\n" +
        "Keep exploring the subtle interactions.",
    },
    reward: 3,
    unlockCondition: () => false,
  },
];

export function getAvailableHiddenFiles(profile: ExplorerProfile) {
  return hiddenFileDefinitions.filter((file) => file.unlockCondition(profile));
}

export function getHiddenFileDefinition(fileId: string) {
  return hiddenFileDefinitions.find((file) => file.id === fileId) ?? null;
}
