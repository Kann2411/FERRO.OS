"use client";

import { motion } from "framer-motion";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";

function formatExplorationTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

export function StatusPanel() {
  const { explorerProfile, missions, completedMissions } = useFerroCore();
  const progress = Math.round(explorerProfile.progress);
  const missionCount = completedMissions.length;
  const totalMissions = missions.length;
  const timeExplored = formatExplorationTime(explorerProfile.explorationSeconds);

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-full border border-white/10 bg-surface/70 px-3 py-2 text-sm text-secondary backdrop-blur-xl"
      role="status"
      aria-label={`Explorer progress: ${progress}%, ${missionCount} of ${totalMissions} missions completed, time explored: ${timeExplored}`}
    >
      <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-success" aria-hidden="true" />
      <span aria-hidden="true">{progress}% • {missionCount}/{totalMissions} missions • {timeExplored}</span>
    </motion.div>
  );
}
