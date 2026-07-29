export type TerminalCommandHandler = (args: string[]) => string;

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
