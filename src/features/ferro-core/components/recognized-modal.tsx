"use client";

import { motion } from "framer-motion";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { createPopoverMotion } from "@/features/animation-engine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useUi } from "@/hooks/use-lang";
import { cn } from "@/lib/cn";

function formatExplorationTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

export function RecognizedModal() {
  const { recognizedOpen, setRecognizedOpen, setMapOpen, missions, completedMissions, explorerProfile } = useFerroCore();
  const prefersReducedMotion = useReducedMotion();
  const tUi = useUi();

  if (!recognizedOpen) {
    return null;
  }

  const missionCount = completedMissions.length;
  const totalMissions = missions.length;
  const achievementsCount = explorerProfile.achievements.length;
  const timeExplored = formatExplorationTime(explorerProfile.explorationSeconds);

  const stats = [
    { label: tUi("recognizedMissionsLabel"), value: `${missionCount}/${totalMissions}` },
    { label: tUi("recognizedAchievementsLabel"), value: `${achievementsCount}` },
    { label: tUi("recognizedModulesLabel"), value: `${explorerProfile.modulesDiscovered}` },
    { label: tUi("recognizedTimeLabel"), value: timeExplored },
  ];

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center bg-background/85 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={tUi("recognizedDialogLabel")}
    >
      <motion.div
        {...createPopoverMotion("window", { reducedMotion: prefersReducedMotion })}
        className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-primary/30 bg-[#0b0b0f]/95 p-8 text-center shadow-[0_40px_140px_rgba(217,4,41,0.28)] backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(217,4,41,0.2),transparent_55%)]" />

        <div className="relative">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-3xl text-primary">
            <span className={cn(!prefersReducedMotion && "signal-dot")} aria-hidden="true">◎</span>
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.38em] text-primary">{tUi("recognizedKicker")}</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{tUi("recognizedHeadline")}</h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-secondary">{tUi("recognizedBody")}</p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
                <p className="text-[10px] uppercase tracking-[0.24em] text-muted">{stat.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setRecognizedOpen(false)}
              className="rounded-full border border-primary/40 bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              {tUi("returnToWorkspace")}
            </button>
            <button
              type="button"
              onClick={() => {
                setRecognizedOpen(false);
                setMapOpen(true);
              }}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-secondary transition hover:border-primary/40 hover:text-white"
            >
              {tUi("viewSignalMapAgain")}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
