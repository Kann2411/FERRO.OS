import type { FerroCoreContextValue } from "@/features/ferro-core/types";

export interface TerminalCommandContext {
  openWindow: (windowId: string) => boolean;
  explorerProfile: FerroCoreContextValue["explorerProfile"];
  activeMission: FerroCoreContextValue["activeMission"];
  completeMission: (missionId: string) => void;
  registerHiddenDiscovery: (fileId: string) => boolean;
}

export type TerminalCommandHandler = (args: string[], context: TerminalCommandContext) => string;

export interface TerminalCommandDefinition {
  name: string;
  description: string;
  handler: TerminalCommandHandler;
}

export const terminalCommands: TerminalCommandDefinition[] = [];

export function registerTerminalCommand(definition: TerminalCommandDefinition) {
  if (terminalCommands.some((command) => command.name === definition.name)) {
    return;
  }

  terminalCommands.push(definition);
}

export function getTerminalCommands() {
  return [...terminalCommands];
}
