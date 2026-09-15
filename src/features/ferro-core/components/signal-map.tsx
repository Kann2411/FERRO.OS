"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { createPopoverMotion } from "@/features/animation-engine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useT, useUi } from "@/hooks/use-lang";
import { cn } from "@/lib/cn";

interface SignalNode {
  id: string;
  x: number;
  y: number;
}

/**
 * Node layout for FERRO.OS's real mission chain (see mission-system.ts) — not copied from
 * the demo, whose coordinates correspond to a different set of missions entirely.
 */
const SIGNAL_NODES: SignalNode[] = [
  { id: "explore-desktop", x: 8, y: 78 },
  { id: "open-first-module", x: 18, y: 58 },
  { id: "discover-projects", x: 30, y: 70 },
  { id: "visit-studio", x: 40, y: 44 },
  { id: "discover-skills", x: 50, y: 60 },
  { id: "read-resume", x: 58, y: 30 },
  { id: "explore-timeline", x: 68, y: 48 },
  { id: "listen-discography", x: 76, y: 24 },
  { id: "visit-ai-lab", x: 85, y: 42 },
  { id: "master-explorer", x: 92, y: 20 },
  { id: "full-exploration", x: 50, y: 92 },
];

export function SignalMap() {
  const { mapOpen, setMapOpen, missions, completedMissions, activeMission, awardAchievement } = useFerroCore();
  const prefersReducedMotion = useReducedMotion();
  const t = useT();
  const tUi = useUi();
  const hasAwarded = useRef(false);

  useEffect(() => {
    if (mapOpen && !hasAwarded.current) {
      hasAwarded.current = true;
      awardAchievement("signal-map-opened");
    }
  }, [mapOpen, awardAchievement]);

  if (!mapOpen) {
    return null;
  }

  const isDone = (id: string) => completedMissions.includes(id);
  const allDone = missions.length > 0 && missions.every((mission) => isDone(mission.id));
  const pathD = SIGNAL_NODES.map((node, index) => `${index === 0 ? "M" : "L"} ${node.x} ${node.y}`).join(" ");

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-background/80 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={tUi("signalMapKicker")}
      onClick={() => setMapOpen(false)}
    >
      <motion.div
        {...createPopoverMotion("window", { reducedMotion: prefersReducedMotion })}
        className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-surface/95 p-6 shadow-window sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("signalMapKicker")}</p>
            <h2 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
              {allDone ? tUi("signalMapChainRecognized") : (activeMission ? t(activeMission.title) : tUi("signalMapFallbackTitle"))}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-secondary">
              {allDone
                ? tUi("signalMapAllDoneText")
                : (activeMission ? t(activeMission.description) : tUi("signalMapFallbackText"))}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMapOpen(false)}
            aria-label={tUi("closeSignalMap")}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white/5 text-secondary transition hover:border-border-strong hover:text-white"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="relative mt-8 aspect-video w-full">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d={pathD} fill="none" className="text-border-strong" stroke="currentColor" strokeWidth="0.4" />
            {SIGNAL_NODES.slice(0, -1).map((node, index) => {
              const next = SIGNAL_NODES[index + 1];
              const lit = isDone(node.id) && isDone(next.id);
              return (
                <line
                  key={`${node.id}-${next.id}`}
                  x1={node.x}
                  y1={node.y}
                  x2={next.x}
                  y2={next.y}
                  className={lit ? "text-signal" : "text-transparent"}
                  stroke="currentColor"
                  strokeWidth="0.6"
                />
              );
            })}
          </svg>

          {SIGNAL_NODES.map((node) => {
            const done = isDone(node.id);
            const isActive = !done && activeMission?.id === node.id;
            const mission = missions.find((item) => item.id === node.id);

            return (
              <div
                key={node.id}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <span
                  className={cn(
                    "rounded-full",
                    done
                      ? "size-3 bg-signal"
                      : isActive
                        ? cn("size-3 bg-primary", !prefersReducedMotion && "signal-dot")
                        : "size-2.5 bg-subtle"
                  )}
                  aria-hidden="true"
                />
                <span className="hidden whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-muted sm:block">
                  {mission ? t(mission.title) : node.id}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
