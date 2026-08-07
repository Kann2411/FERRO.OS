"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAudio } from "@/features/audio-engine";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useWindowContext } from "@/features/window-system/context/window-context";
import { resolveWindowDefinition } from "@/features/window-system/utils/open-module";
import { executeCommand, getCommandDefinitions, registerBuiltInCommands, type TerminalCommandContext } from "@/features/terminal/utils/command-engine";
import { generateUUID } from "@/lib/uuid";

type TerminalEntry = {
  id: string;
  kind: "system" | "input";
  text: string;
};

export function TerminalModule() {
  const { explorerProfile, activeMission, completeMission, advanceProgress, registerDiscovery, registerHiddenDiscovery } = useFerroCore();
  const { openWindow, focusWindow, bringToFront } = useWindowContext();
  const { playSound } = useAudio();
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: "boot-1",
      kind: "system",
      text: "FERRO.OS Terminal v0.1",
    },
    {
      id: "boot-2",
      kind: "system",
      text: "Session initialized. Type 'help' to inspect the available commands.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [commandNames, setCommandNames] = useState<string[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerBuiltInCommands();
    setCommandNames(getCommandDefinitions().map((command) => command.name));
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [entries]);

  const prompt = useMemo(() => "guest@ferro:~$", []);
  const commandList = commandNames;
  const commandContext = useMemo<TerminalCommandContext>(() => ({
    explorerProfile,
    activeMission,
    openWindow: (windowId: string) => {
      const definition = resolveWindowDefinition(windowId);
      if (!definition) {
        return false;
      }

      if (!explorerProfile.discoveredModules.includes(windowId)) {
        completeMission("open-first-module");
        registerDiscovery(windowId);
        advanceProgress(2);
      }

      openWindow(definition);
      focusWindow(definition.id);
      bringToFront(definition.id);
      return true;
    },
    registerHiddenDiscovery,
    completeMission,
  }), [activeMission, advanceProgress, bringToFront, completeMission, explorerProfile, focusWindow, openWindow, registerDiscovery, registerHiddenDiscovery]);

  useEffect(() => {
    if (!inputValue.trim()) {
      setSuggestion(null);
      return;
    }

    const currentToken = inputValue.trim().split(/\s+/)[0];
    const nextSuggestion = commandList.find((command) => command.startsWith(currentToken));
    setSuggestion(nextSuggestion ?? null);
  }, [commandList, inputValue]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const command = inputValue.trim();
    if (!command) {
      playSound("terminal", "error");
      return;
    }

    playSound("terminal", "execute");
    const response = executeCommand(command, commandContext);

    setHistory((current) => {
      const nextHistory = current.length > 0 && current[current.length - 1] === command ? current : [...current, command];
      return nextHistory;
    });
    setHistoryIndex(null);

    setEntries((current) => {
      const nextEntries = [
        ...current,
        { id: generateUUID(), kind: "input" as const, text: `${prompt} ${command}` },
        { id: generateUUID(), kind: "system" as const, text: response },
      ];

      if (command.toLowerCase() === "clear") {
        playSound("terminal", "clear");
        return [
          {
            id: "boot-1",
            kind: "system" as const,
            text: "FERRO.OS Terminal v0.1",
          },
          {
            id: "boot-2",
            kind: "system" as const,
            text: "Session initialized. Type 'help' to inspect the available commands.",
          },
        ];
      }

      return nextEntries;
    });

    if (response.startsWith("Command not recognized:")) {
      playSound("terminal", "error");
    }

    setInputValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      playSound("terminal", "type");
    }

    if (event.key === "Tab") {
      event.preventDefault();
      if (!suggestion) {
        return;
      }

      const [firstToken] = inputValue.trim().split(/\s+/);
      const nextValue = firstToken ? suggestion : suggestion;
      setInputValue(nextValue);
      setSuggestion(null);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHistoryIndex((current) => {
        if (history.length === 0) {
          return null;
        }

        if (current === null) {
          return history.length - 1;
        }

        return Math.max(0, current - 1);
      });
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHistoryIndex((current) => {
        if (history.length === 0 || current === null) {
          return null;
        }

        return Math.min(history.length - 1, current + 1);
      });
    }
  };

  useEffect(() => {
    if (historyIndex === null) {
      setInputValue("");
      return;
    }

    setInputValue(history[historyIndex] ?? "");
  }, [history, historyIndex]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#060606]/80 text-sm text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-3 py-2">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-muted">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span>Terminal Session</span>
        </div>
        <span className="text-[11px] uppercase tracking-[0.28em] text-secondary">live</span>
      </div>

      <div ref={outputRef} className="flex-1 space-y-2 overflow-y-auto px-4 py-4 font-mono">
        {entries.map((entry) => (
          <div key={entry.id} className={entry.kind === "input" ? "text-white" : "text-secondary"}>
            {entry.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-white/10 bg-black/20 px-3 py-3">
        <label htmlFor="terminal-input" className="sr-only">
          Terminal input
        </label>
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#111111]/80 px-3 py-2">
          <span className="text-primary">{prompt}</span>
          <div className="flex flex-1 flex-col">
            <input
              id="terminal-input"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck={false}
              placeholder="Type a command"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-muted"
              autoFocus
            />
            {suggestion ? (
              <span className="mt-1 text-xs text-secondary">Suggestion: {suggestion}</span>
            ) : null}
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-primary/80" style={{ animation: "blink 1s step-end infinite" }} />
        </div>
      </form>
    </div>
  );
}
