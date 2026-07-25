"use client";

import { motion } from "framer-motion";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";

function formatExplorationTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
}

export function ExplorerProfileCard() {
  const { explorerProfile, missions, completedMissions } = useFerroCore();
  const progress = Math.round(explorerProfile.progress);
  const level = Math.max(1, Math.min(9, Math.floor(progress / 25) + 1));
  const currentMission = missions.find((mission) => !completedMissions.includes(mission.id));
  const achievementsCount = explorerProfile.achievements.length;
  const missionCount = completedMissions.length;
  const totalMissions = missions.length;
  const timeExplored = formatExplorationTime(explorerProfile.explorationSeconds);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border border-white/10 bg-[#101010]/90 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl"
      role="region"
      aria-label={`Explorer profile: ${explorerProfile.name}, Level ${level}, ${progress}% progress`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">Explorer HUD</p>
          <p className="mt-1 text-lg font-semibold text-white">{explorerProfile.name}</p>
        </div>
        <div className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary" aria-label={`Level ${level}`}>
          Level {level}
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white/5 p-1" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Exploration progress: ${progress}%`}>
        <div className="h-2 rounded-2xl bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-secondary">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Progress</p>
          <p className="mt-2 text-white">{progress}%</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Mission</p>
          <p className="mt-2 text-white">{missionCount}/{totalMissions}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Modules</p>
          <p className="mt-2 text-white">{explorerProfile.modulesDiscovered}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Achievements</p>
          <p className="mt-2 text-white">{achievementsCount}</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-secondary" aria-label="Current mission and exploration time">
        <div className="flex items-center justify-between gap-3">
          <span>Active signal</span>
          <span className="text-white">{currentMission?.title ?? "All systems aligned"}</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span>Time explored</span>
          <span className="text-white">{timeExplored}</span>
        </div>
      </div>
    </motion.div>
  );
}
