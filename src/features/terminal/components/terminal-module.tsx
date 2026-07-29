"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { executeCommand, registerBuiltInCommands } from "@/features/terminal/utils/command-engine";

type TerminalEntry = {
  id: string;
  kind: "system" | "input";
  text: string;
};

export function TerminalModule() {
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
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerBuiltInCommands();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [entries]);

  const prompt = useMemo(() => "guest@ferro:~$", []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const command = inputValue.trim();
    if (!command) {
      return;
    }

    const response = executeCommand(command);

    setEntries((current) => {
      const nextEntries = [
        ...current,
        { id: `input-${Date.now()}`, kind: "input" as const, text: `${prompt} ${command}` },
        { id: `response-${Date.now()}-1`, kind: "system" as const, text: response },
      ];

      if (command.toLowerCase() === "clear") {
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

    setInputValue("");
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[16px] border border-white/10 bg-[#060606]/80 text-sm text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
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
          <input
            id="terminal-input"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            placeholder="Type a command"
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-muted"
            autoFocus
          />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/80" style={{ animation: "blink 1s step-end infinite" }} />
        </div>
      </form>
    </div>
  );
}
