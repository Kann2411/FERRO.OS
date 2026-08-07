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

export function executeCommand(input: string, context: TerminalCommandContext): string {
  const { name, args } = parseCommand(input);
  if (!name) {
    return "No command entered.";
  }

  const command = getCommandDefinition(name);
  if (!command) {
    return `Command not recognized: ${name}. Type 'help' for available commands.`;
  }

  return command.handler(args, context);
}

export function registerBuiltInCommands() {
  const builtIns: TerminalCommandDefinition[] = [
    {
      name: "help",
      description: "List available commands",
      handler: (_args, _context) => "Available commands:\nhelp, clear, about, status, projects, skills, resume, music, studio, explorer, hidden-files, read, ai-lab, version",
    },
    {
      name: "clear",
      description: "Clear the terminal buffer",
      handler: (_args, _context) => "[terminal cleared]",
    },
    {
      name: "about",
      description: "Describe FERRO.OS Terminal",
      handler: (_args, _context) => "FERRO.OS Terminal\nA cinematic command layer for navigating the portfolio experience. Built to feel like a native system companion rather than a conventional shell.",
    },
    {
      name: "status",
      description: "Show system status",
      handler: (_args, context) => `System status:\n- Interface online\n- Exploration engine active\n- Window manager responsive\n- Terminal ready for commands\n- Progress: ${Math.round(context.explorerProfile.progress)}%`,
    },
    {
      name: "projects",
      description: "Open the projects overview",
      handler: (_args, context) => {
        context.openWindow("projects");
        return "Projects module recognized. The terminal has requested the projects window and updated the explorer state.";
      },
    },
    {
      name: "skills",
      description: "Show skills overview",
      handler: (_args, context) => {
        context.openWindow("skills");
        return "Skills command accepted. The system maps engineering craft, design systems, audio tooling, and creative development across the interface.";
      },
    },
    {
      name: "resume",
      description: "Show resume overview",
      handler: (_args, context) => {
        context.openWindow("resume");
        return "Resume command accepted. The system exposes the professional trajectory, experience, and milestones behind the FERRO.OS identity.";
      },
    },
    {
      name: "music",
      description: "Reference the music experience",
      handler: (_args, context) => {
        context.openWindow("studio");
        return "Music modules are available through Studio and Audio Player. Together they shape the sonic layer of the experience.";
      },
    },
    {
      name: "studio",
      description: "Reference the studio environment",
      handler: (_args, context) => {
        context.openWindow("studio");
        return "Studio command accepted. The music production environment is online and ready to receive creative input.";
      },
    },
    {
      name: "explorer",
      description: "Show explorer status",
      handler: (_args, context) => `Explorer status:\n- Progress: ${Math.round(context.explorerProfile.progress)}%\n- Modules discovered: ${context.explorerProfile.modulesDiscovered}\n- Hidden files uncovered: ${context.explorerProfile.discoveredHiddenFiles.length}\n- Achievements: ${context.explorerProfile.achievements.length}\n- Active mission: ${context.activeMission?.title ?? "None"}`,
    },
    {
      name: "hidden-files",
      description: "List hidden files available for discovery",
      handler: (_args, context) => {
        const hiddenFiles = context.explorerProfile.discoveredHiddenFiles;
        return hiddenFiles.length > 0
          ? `Hidden files discovered:\n${hiddenFiles.join("\n")}`
          : "No hidden files discovered yet. Keep exploring the system and inspect available secrets with commands like 'read'.";
      },
    },
    {
      name: "read",
      description: "Read a hidden file",
      handler: (args, context) => {
        if (args.length === 0) {
          return "Usage: read <hidden-file-name>";
        }

        const fileId = args[0];
        const fileDefinition = getHiddenFileDefinition(fileId);

        if (!fileDefinition) {
          return `Hidden file not found: ${fileId}.`;
        }

        const isUnlocked = context.explorerProfile.discoveredHiddenFiles.includes(fileId);
        const satisfiesCondition = fileDefinition.unlockCondition(context.explorerProfile);

        if (!satisfiesCondition) {
          return `Hidden file ${fileId} is not yet available. Continue exploring the workspace.`;
        }

        if (!isUnlocked) {
          const registered = context.registerHiddenDiscovery(fileId);
          return registered
            ? `Hidden file ${fileId} has been revealed.\n\n${fileDefinition.content}`
            : `Hidden file ${fileId} has already been discovered.`;
        }

        return fileDefinition.content;
      },
    },
    {
      name: "ai-lab",
      description: "Open the hidden AI Lab module",
      handler: (_args, context) => {
        if (!context.explorerProfile.discoveredHiddenFiles.includes("ai-lab-invite.txt")) {
          return "The AI Lab remains hidden. Find the hidden invitation and read it first.";
        }

        const opened = context.openWindow("aiLab");

        if (opened) {
          context.completeMission("unlock-ai-lab");
          return "AI Lab unlocking... The hidden laboratory is now opening.";
        }

        return "Unable to open the AI Lab. The hidden module is not available.";
      },
    },
    {
      name: "neon",
      description: "A secret terminal Easter Egg command",
      handler: (_args, context) => {
        const fileId = "easter-egg-terminal.txt";
        const fileDefinition = getHiddenFileDefinition(fileId);

        if (!fileDefinition) {
          return "Command not recognized.";
        }

        if (context.explorerProfile.discoveredHiddenFiles.includes(fileId)) {
          return fileDefinition.content;
        }

        const registered = context.registerHiddenDiscovery(fileId);
        return registered
          ? `Hidden file ${fileId} has been revealed.\n\n${fileDefinition.content}`
          : "Nothing interesting happened.";
      },
    },
    {
      name: "debug-console",
      description: "Open the hidden Debug Console",
      handler: (_args, context) => {
        if (!context.explorerProfile.discoveredHiddenFiles.includes("debug-console-key.txt")) {
          return "The Debug Console remains inaccessible. Find the hidden access key and read it first.";
        }

        const opened = context.openWindow("debugConsole");

        return opened
          ? "Opening Debug Console... Internal status is now visible."
          : "Unable to open the Debug Console. The hidden module is not available.";
      },
    },
    {
      name: "version",
      description: "Show terminal version",
      handler: (_args, _context) => "FERRO.OS Terminal v0.4\nBuilt for exploration, interfaces, and immersive storytelling.",
    }
  ];

  builtIns.forEach((definition) => registerTerminalCommand(definition));
}

export function getCommandDefinition(name: string) {
  return getCommandDefinitions().find((definition) => definition.name === name);
}

export function getCommandDefinitions() {
  return getTerminalCommands();
}
