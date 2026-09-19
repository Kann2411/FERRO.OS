import { getHiddenFileDefinition } from "@/features/hidden-files/utils/hidden-files";
import { getTerminalCommands, registerTerminalCommand, type TerminalCommandContext, type TerminalCommandDefinition } from "@/features/terminal/utils/command-registry";

export type { TerminalCommandContext, TerminalCommandDefinition } from "@/features/terminal/utils/command-registry";

export interface ParsedCommand {
  name: string;
  args: string[];
}

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim();
  if (!trimmed) {
    return { name: "", args: [] };
  }

  const [name, ...args] = trimmed.split(/\s+/);
  return { name: name.toLowerCase(), args };
}

export const UNRECOGNIZED_COMMAND_PREFIXES = ["Comando no reconocido:", "Command not recognized:"];

export function executeCommand(input: string, context: TerminalCommandContext): string {
  const { name, args } = parseCommand(input);
  const es = context.lang === "es";

  if (!name) {
    return es ? "Ningún comando ingresado." : "No command entered.";
  }

  const command = getCommandDefinition(name);
  if (!command) {
    return es
      ? `Comando no reconocido: ${name}. Escribe 'help' para ver los comandos disponibles.`
      : `Command not recognized: ${name}. Type 'help' for available commands.`;
  }

  return command.handler(args, context);
}

export function registerBuiltInCommands() {
  const builtIns: TerminalCommandDefinition[] = [
    {
      name: "help",
      description: "List available commands",
      handler: (_args, context) =>
        context.lang === "es"
          ? "Comandos disponibles:\nhelp, clear, about, status, projects, skills, resume, music, studio, explorer, hidden-files, read, ai-lab, version"
          : "Available commands:\nhelp, clear, about, status, projects, skills, resume, music, studio, explorer, hidden-files, read, ai-lab, version",
    },
    {
      name: "clear",
      description: "Clear the terminal buffer",
      handler: (_args, context) => (context.lang === "es" ? "[terminal limpiada]" : "[terminal cleared]"),
    },
    {
      name: "about",
      description: "Describe FERRO.OS Terminal",
      handler: (_args, context) =>
        context.lang === "es"
          ? "Terminal de FERRO.OS\nUna capa de comandos cinemática para navegar la experiencia del portafolio. Construida para sentirse como un acompañante nativo del sistema en lugar de un shell convencional."
          : "FERRO.OS Terminal\nA cinematic command layer for navigating the portfolio experience. Built to feel like a native system companion rather than a conventional shell.",
    },
    {
      name: "status",
      description: "Show system status",
      handler: (_args, context) =>
        context.lang === "es"
          ? `Estado del sistema:\n- Interfaz en línea\n- Motor de exploración activo\n- Gestor de ventanas responsivo\n- Terminal lista para comandos\n- Progreso: ${Math.round(context.explorerProfile.progress)}%`
          : `System status:\n- Interface online\n- Exploration engine active\n- Window manager responsive\n- Terminal ready for commands\n- Progress: ${Math.round(context.explorerProfile.progress)}%`,
    },
    {
      name: "projects",
      description: "Open the projects overview",
      handler: (_args, context) => {
        context.openWindow("projects");
        return context.lang === "es"
          ? "Módulo de Proyectos reconocido. La terminal solicitó la ventana de proyectos y actualizó el estado del explorador."
          : "Projects module recognized. The terminal has requested the projects window and updated the explorer state.";
      },
    },
    {
      name: "skills",
      description: "Show skills overview",
      handler: (_args, context) => {
        context.openWindow("skills");
        return context.lang === "es"
          ? "Comando de habilidades aceptado. El sistema mapea la ingeniería, los sistemas de diseño, las herramientas de audio y el desarrollo creativo en toda la interfaz."
          : "Skills command accepted. The system maps engineering craft, design systems, audio tooling, and creative development across the interface.";
      },
    },
    {
      name: "resume",
      description: "Show resume overview",
      handler: (_args, context) => {
        context.openWindow("resume");
        return context.lang === "es"
          ? "Comando de currículum aceptado. El sistema expone la trayectoria profesional, la experiencia y los hitos detrás de la identidad de FERRO.OS."
          : "Resume command accepted. The system exposes the professional trajectory, experience, and milestones behind the FERRO.OS identity.";
      },
    },
    {
      name: "music",
      description: "Reference the music experience",
      handler: (_args, context) => {
        context.openWindow("studio");
        return context.lang === "es"
          ? "Los módulos musicales están disponibles a través de Estudio y Reproductor de audio. Juntos dan forma a la capa sonora de la experiencia."
          : "Music modules are available through Studio and Audio Player. Together they shape the sonic layer of the experience.";
      },
    },
    {
      name: "studio",
      description: "Reference the studio environment",
      handler: (_args, context) => {
        context.openWindow("studio");
        return context.lang === "es"
          ? "Comando de estudio aceptado. El entorno de producción musical está en línea y listo para recibir aportes creativos."
          : "Studio command accepted. The music production environment is online and ready to receive creative input.";
      },
    },
    {
      name: "explorer",
      description: "Show explorer status",
      handler: (_args, context) => {
        const es = context.lang === "es";
        const missionTitle = context.activeMission ? context.activeMission.title[context.lang] : es ? "Ninguna" : "None";
        return es
          ? `Estado del explorador:\n- Progreso: ${Math.round(context.explorerProfile.progress)}%\n- Módulos descubiertos: ${context.explorerProfile.modulesDiscovered}\n- Archivos ocultos descubiertos: ${context.explorerProfile.discoveredHiddenFiles.length}\n- Logros: ${context.explorerProfile.achievements.length}\n- Misión activa: ${missionTitle}`
          : `Explorer status:\n- Progress: ${Math.round(context.explorerProfile.progress)}%\n- Modules discovered: ${context.explorerProfile.modulesDiscovered}\n- Hidden files uncovered: ${context.explorerProfile.discoveredHiddenFiles.length}\n- Achievements: ${context.explorerProfile.achievements.length}\n- Active mission: ${missionTitle}`;
      },
    },
    {
      name: "hidden-files",
      description: "List hidden files available for discovery",
      handler: (_args, context) => {
        const hiddenFiles = context.explorerProfile.discoveredHiddenFiles;
        const es = context.lang === "es";
        if (hiddenFiles.length === 0) {
          return es
            ? "Todavía no se descubrieron archivos ocultos. Sigue explorando el sistema e inspecciona los secretos disponibles con comandos como 'read'."
            : "No hidden files discovered yet. Keep exploring the system and inspect available secrets with commands like 'read'.";
        }
        return es
          ? `Archivos ocultos descubiertos:\n${hiddenFiles.join("\n")}`
          : `Hidden files discovered:\n${hiddenFiles.join("\n")}`;
      },
    },
    {
      name: "read",
      description: "Read a hidden file",
      handler: (args, context) => {
        const es = context.lang === "es";
        if (args.length === 0) {
          return es ? "Uso: read <nombre-de-archivo-oculto>" : "Usage: read <hidden-file-name>";
        }

        const fileId = args[0];
        const fileDefinition = getHiddenFileDefinition(fileId);

        if (!fileDefinition) {
          return es ? `Archivo oculto no encontrado: ${fileId}.` : `Hidden file not found: ${fileId}.`;
        }

        const isUnlocked = context.explorerProfile.discoveredHiddenFiles.includes(fileId);
        const satisfiesCondition = fileDefinition.unlockCondition(context.explorerProfile);

        if (!satisfiesCondition) {
          return es
            ? `El archivo oculto ${fileId} aún no está disponible. Sigue explorando la estación de trabajo.`
            : `Hidden file ${fileId} is not yet available. Continue exploring the workspace.`;
        }

        if (!isUnlocked) {
          const registered = context.registerHiddenDiscovery(fileId);
          return registered
            ? es
              ? `El archivo oculto ${fileId} fue revelado.\n\n${fileDefinition.content[context.lang]}`
              : `Hidden file ${fileId} has been revealed.\n\n${fileDefinition.content[context.lang]}`
            : es
              ? `El archivo oculto ${fileId} ya había sido descubierto.`
              : `Hidden file ${fileId} has already been discovered.`;
        }

        return fileDefinition.content[context.lang];
      },
    },
    {
      name: "ai-lab",
      description: "Open the hidden AI Lab module",
      handler: (_args, context) => {
        const es = context.lang === "es";
        if (!context.explorerProfile.discoveredHiddenFiles.includes("ai-lab-invite.txt")) {
          return es
            ? "El Laboratorio de IA sigue oculto. Encuentra la invitación oculta y léela primero."
            : "The AI Lab remains hidden. Find the hidden invitation and read it first.";
        }

        const opened = context.openWindow("aiLab");

        if (opened) {
          context.unlockModule("aiLab");
          return es
            ? "Desbloqueando el Laboratorio de IA... El laboratorio oculto se está abriendo."
            : "AI Lab unlocking... The hidden laboratory is now opening.";
        }

        return es
          ? "No se pudo abrir el Laboratorio de IA. El módulo oculto no está disponible."
          : "Unable to open the AI Lab. The hidden module is not available.";
      },
    },
    {
      name: "neon",
      description: "A secret terminal Easter Egg command",
      handler: (_args, context) => {
        const es = context.lang === "es";
        const fileId = "easter-egg-terminal.txt";
        const fileDefinition = getHiddenFileDefinition(fileId);

        if (!fileDefinition) {
          return es ? "Comando no reconocido." : "Command not recognized.";
        }

        if (context.explorerProfile.discoveredHiddenFiles.includes(fileId)) {
          return fileDefinition.content[context.lang];
        }

        const registered = context.registerHiddenDiscovery(fileId);
        return registered
          ? es
            ? `El archivo oculto ${fileId} fue revelado.\n\n${fileDefinition.content[context.lang]}`
            : `Hidden file ${fileId} has been revealed.\n\n${fileDefinition.content[context.lang]}`
          : es
            ? "No pasó nada interesante."
            : "Nothing interesting happened.";
      },
    },
    {
      name: "debug-console",
      description: "Open the hidden Debug Console",
      handler: (_args, context) => {
        const es = context.lang === "es";
        if (!context.explorerProfile.discoveredHiddenFiles.includes("debug-console-key.txt")) {
          return es
            ? "La Consola de depuración sigue siendo inaccesible. Encuentra la clave de acceso oculta y léela primero."
            : "The Debug Console remains inaccessible. Find the hidden access key and read it first.";
        }

        const opened = context.openWindow("debugConsole");

        return opened
          ? es
            ? "Abriendo la Consola de depuración... El estado interno ahora es visible."
            : "Opening Debug Console... Internal status is now visible."
          : es
            ? "No se pudo abrir la Consola de depuración. El módulo oculto no está disponible."
            : "Unable to open the Debug Console. The hidden module is not available.";
      },
    },
    {
      name: "version",
      description: "Show terminal version",
      handler: (_args, context) =>
        context.lang === "es"
          ? "Terminal de FERRO.OS v0.4\nConstruida para la exploración, las interfaces y la narrativa inmersiva."
          : "FERRO.OS Terminal v0.4\nBuilt for exploration, interfaces, and immersive storytelling.",
    },
  ];

  builtIns.forEach((definition) => registerTerminalCommand(definition));
}

export function getCommandDefinition(name: string) {
  return getCommandDefinitions().find((definition) => definition.name === name);
}

export function getCommandDefinitions() {
  return getTerminalCommands();
}
