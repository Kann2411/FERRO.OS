"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLang, useUi } from "@/hooks/use-lang";
import { ui } from "@/lib/i18n/ui";

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const lang = useLang();
  const tUi = useUi();
  const biosLines = useMemo(
    () => [
      ui.bootLine1[lang],
      "",
      ui.bootLine2[lang],
      ui.bootLine3[lang],
      ui.bootLine4[lang],
      ui.bootLine5[lang],
      "",
      ui.bootLine6[lang],
    ],
    [lang]
  );
  const [phase, setPhase] = useState<"bios" | "logo" | "done">("bios");
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [logoProgress, setLogoProgress] = useState(0);

  useEffect(() => {
    if (phase !== "bios") return;

    // Runs the whole typewriter loop with its own local counters instead of driving it off
    // `currentLine`/`currentChar` state — those were also this effect's dependencies, so every
    // keystroke re-ran the effect and queued a second, overlapping chain of timers on top of
    // the first (no cleanup ever cancelled the previous one), racing the state forward and
    // making every line after the first appear to "jump" in all at once.
    let lineIndex = 0;
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    const typeNextChar = () => {
      if (lineIndex >= biosLines.length) {
        setPhase("logo");
        return;
      }

      const line = biosLines[lineIndex];
      if (charIndex < line.length) {
        charIndex += 1;
        setCurrentLine(lineIndex);
        setCurrentChar(charIndex);
        timer = setTimeout(typeNextChar, 28);
      } else {
        lineIndex += 1;
        charIndex = 0;
        setCurrentLine(lineIndex);
        setCurrentChar(0);
        timer = setTimeout(typeNextChar, line === "" ? 180 : 380);
      }
    };

    timer = setTimeout(typeNextChar, 500);

    return () => clearTimeout(timer);
  }, [phase, biosLines]);

  useEffect(() => {
    if (phase !== "logo") return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setPhase("done"), 500);
      }
      setLogoProgress(progress);
    }, 120);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") {
      onComplete();
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-80 flex items-center justify-center bg-black px-4 py-8"
      role="status"
      aria-label={tUi("bootingAria")}
    >
      {phase === "bios" && (
        <div className="font-mono text-sm text-primary/90 whitespace-pre max-w-xl">
          {[
            ...biosLines.slice(0, currentLine),
            ...(currentLine < biosLines.length ? [biosLines[currentLine].slice(0, currentChar)] : []),
          ].join("\n")}
          {currentLine < biosLines.length && <span className="animate-pulse">_</span>}
        </div>
      )}

      {(phase === "logo" || phase === "done") && (
        <div className="flex flex-col items-center gap-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-primary/40 bg-primary/10 text-5xl text-primary">
              ⚙
            </div>
          </motion.div>

          <div className="w-64 h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${logoProgress}%` }}
              transition={{ duration: 0.1 }}
              className="h-full rounded-full bg-primary relative"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </motion.div>
          </div>

          <p className="font-mono text-xs text-muted uppercase tracking-widest">
            FERRO.OS v1.0.0
          </p>
        </div>
      )}
    </motion.div>
  );
}
