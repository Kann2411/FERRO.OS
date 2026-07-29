import { getTerminalCommands, registerTerminalCommand, type TerminalCommandDefinition } from "@/features/terminal/utils/command-registry";

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

export function executeCommand(input: string): string {
  const { name, args } = parseCommand(input);
  if (!name) {
    return "No command entered.";
  }

  const command = getCommandDefinition(name);
  if (!command) {
    return `Command not recognized: ${name}. Type 'help' for available commands.`;
  }

  return command.handler(args);
}

export function registerBuiltInCommands() {
  const builtIns: TerminalCommandDefinition[] = [
    {
      name: "help",
      description: "List available commands",
      handler: () => "Available commands: help, clear, about, status, projects, skills, resume, music, studio, explorer, version",
    },
    {
      name: "clear",
      description: "Clear the terminal buffer",
      handler: () => "[terminal cleared]",
    },
    {
      name: "about",
      description: "Describe FERRO.OS Terminal",
      handler: () => "FERRO.OS Terminal is a cinematic command interface for exploring the portfolio experience.",
    },
    {
      name: "status",
      description: "Show system status",
      handler: () => "System status: interface online, exploration engine active, terminal ready.",
    },
    {
      name: "projects",
      description: "Open the projects overview",
      handler: () => "Projects module recognized. Use the desktop to open it directly.",
    },
    {
      name: "skills",
      description: "Show skills overview",
      handler: () => "Skills command accepted. The system will surface the skills panel next.",
    },
    {
      name: "resume",
      description: "Show resume overview",
      handler: () => "Resume command accepted. The experience is ready for deeper inspection.",
    },
    {
      name: "music",
      description: "Reference the music experience",
      handler: () => "Music modules are available from the Studio and Audio Player applications.",
    },
    {
      name: "studio",
      description: "Reference the studio environment",
      handler: () => "Studio command accepted. The music production environment is online.",
    },
    {
      name: "explorer",
      description: "Show explorer status",
      handler: () => "Explorer status: progress is tracked by each discovery and mission you complete.",
    },
    {
      name: "version",
      description: "Show terminal version",
      handler: () => "FERRO.OS Terminal v0.2",
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
