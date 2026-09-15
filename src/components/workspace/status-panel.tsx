"use client";

import { motion } from "framer-motion";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useLang, useUi } from "@/hooks/use-lang";

function formatExplorationTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

export function StatusPanel() {
  const { explorerProfile, missions, completedMissions, setMapOpen } = useFerroCore();
  const lang = useLang();
  const tUi = useUi();
  const progress = Math.round(explorerProfile.progress);
  const missionCount = completedMissions.length;
  const totalMissions = missions.length;
  const timeExplored = formatExplorationTime(explorerProfile.explorationSeconds);
  const missionsWord = lang === "es" ? "misiones" : "missions";

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setMapOpen(true)}
      className="rounded-full border border-white/10 bg-surface/70 px-3 py-2 text-sm text-secondary backdrop-blur-xl transition hover:border-primary/40"
      aria-label={
        lang === "es"
          ? `${tUi("openSignalMap")} — Progreso del explorador: ${progress}%, ${missionCount} de ${totalMissions} misiones completadas, tiempo explorado: ${timeExplored}`
          : `${tUi("openSignalMap")} — Explorer progress: ${progress}%, ${missionCount} of ${totalMissions} missions completed, time explored: ${timeExplored}`
      }
    >
      <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-success" aria-hidden="true" />
      <span aria-hidden="true">{progress}% • {missionCount}/{totalMissions} {missionsWord} • {timeExplored}</span>
    </motion.button>
  );
}
