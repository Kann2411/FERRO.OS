"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const biosLines = [
  "FERRO SYSTEMS INC.",
  "",
  "Initializing kernel...",
  "Loading core modules...",
  "Mounting workspace...",
  "Starting FERRO CORE...",
  "",
  "System ready.",
];

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"bios" | "logo" | "done">("bios");
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [logoProgress, setLogoProgress] = useState(0);

  useEffect(() => {
    if (phase !== "bios") return;

    const typeNextChar = () => {
      if (currentLine < biosLines.length) {
        const line = biosLines[currentLine];
        if (currentChar < line.length) {
          setCurrentChar((c) => c + 1);
          setTimeout(typeNextChar, 15);
        } else {
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);
          setTimeout(typeNextChar, line === "" ? 100 : 300);
        }
      } else {
        setPhase("logo");
      }
    };

    setTimeout(typeNextChar, 500);
  }, [phase, currentLine, currentChar]);

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

  if (phase === "done") return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-80 flex items-center justify-center bg-black px-4 py-8"
      role="status"
      aria-label="Booting FERRO.OS"
    >
      {phase === "bios" && (
        <div className="font-mono text-sm text-primary/90 whitespace-pre max-w-xl">
          {biosLines.slice(0, currentLine).join("\n")}
          {currentLine < biosLines.length && (
            <>
              {biosLines[currentLine].slice(0, currentChar)}
              <span className="animate-pulse">_</span>
            </>
          )}
        </div>
      )}

      {phase === "logo" && (
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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
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