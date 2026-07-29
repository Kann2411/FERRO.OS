"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MusicVisualizerProps {
  isPlaying: boolean;
}

function buildInitialLevels(count: number) {
  return Array.from({ length: count }, (_, index) => 24 + (index % 5) * 8);
}

export function MusicVisualizer({ isPlaying }: MusicVisualizerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [levels, setLevels] = useState<number[]>(() => buildInitialLevels(28));

  useEffect(() => {
    if (prefersReducedMotion || !isPlaying) {
      setLevels(buildInitialLevels(28));
      return;
    }

    const interval = window.setInterval(() => {
      const time = Date.now() / 220;
      setLevels((previous) =>
        previous.map((value, index) => {
          const wave = Math.sin(time + index * 0.3) * 26 + Math.cos(time * 1.2 + index * 0.2) * 18;
          const target = Math.max(12, 36 + wave + (index % 4) * 6);
          return prefersReducedMotion ? target : Math.round(value * 0.72 + target * 0.28);
        }),
      );
    }, 90);

    return () => window.clearInterval(interval);
  }, [isPlaying, prefersReducedMotion]);

  const waveformPoints = useMemo(() => {
    return levels
      .map((level, index) => {
        const x = (index / (levels.length - 1)) * 100;
        const y = 50 - level / 2.4;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }, [levels]);

  return (
    <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Visualizer</p>
          <p className="mt-1 text-sm text-secondary">Bars, waveform and spectrum in motion.</p>
        </div>
        <div className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-primary">
          {isPlaying ? "Live" : "Standby"}
        </div>
      </div>

      <div className="mt-4 rounded-[20px] border border-white/10 bg-gradient-to-br from-primary/10 via-white/5 to-transparent p-4">
        <div className="flex h-28 items-end justify-between gap-1">
          {levels.map((level, index) => (
            <motion.div
              key={`${index}-${level}`}
              animate={{ height: `${Math.max(12, level)}px` }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.14, ease: "easeOut" }}
              className="w-full max-w-[8px] rounded-full bg-gradient-to-t from-primary via-white/80 to-primary/50"
            />
          ))}
        </div>

        <svg viewBox="0 0 100 60" className="mt-4 h-20 w-full">
          <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" strokeDasharray="2 2" />
          <polyline
            fill="none"
            stroke="rgba(248,113,113,0.9)"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={waveformPoints}
          />
        </svg>
      </div>
    </div>
  );
}
