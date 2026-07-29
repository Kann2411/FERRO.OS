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

function formatHistoryStamp(timestamp: string) {
  const date = new Date(timestamp);
  return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
}

function getHistoryAccent(type: string) {
  switch (type) {
    case "achievement":
      return "border-primary/30 bg-primary/10 text-primary";
    case "mission":
      return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
    case "progress":
      return "border-sky-400/30 bg-sky-400/10 text-sky-300";
    default:
      return "border-white/10 bg-white/5 text-secondary";
  }
}

export function ExplorerProfileCard() {
  const { explorerProfile, missions, completedMissions, history, activeMission } = useFerroCore();
  const progress = Math.round(explorerProfile.progress);
  const level = Math.max(1, Math.min(9, Math.floor(progress / 25) + 1));
  const currentMission = missions.find((mission) => !completedMissions.includes(mission.id));
  const achievementsCount = explorerProfile.achievements.length;
  const missionCount = completedMissions.length;
  const totalMissions = missions.length;
  const timeExplored = formatExplorationTime(explorerProfile.explorationSeconds);
  const recentActivity = history.slice(-3).reverse();
  const narrativeStatus = explorerProfile.achievements.length > 0 ? "Recognized signal" : "Signal building";
  const badgeTone = progress > 70 ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300" : "border-primary/40 bg-primary/10 text-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0b0b0f]/90 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl"
      role="region"
      aria-label={`Explorer profile: ${explorerProfile.name}, Level ${level}, ${progress}% progress`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(120,219,255,0.16),transparent_40%)]" />
      <div className="absolute right-4 top-4 h-16 w-16 rounded-full border border-white/10 bg-white/10 blur-2xl" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">Explorer HUD</p>
          <p className="mt-1 text-lg font-semibold text-white">{explorerProfile.name}</p>
          <p className="mt-1 text-sm text-secondary">{narrativeStatus} · {explorerProfile.modulesDiscovered} modules indexed</p>
        </div>
        <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.28em] ${badgeTone}`} aria-label={`Level ${level}`}>
          <span className="h-2 w-2 rounded-full bg-current" />
          Level {level}
        </div>
      </div>

      <div className="relative mt-4 rounded-2xl border border-white/10 bg-black/25 p-2">
        <div className="mb-2 flex items-center justify-between px-2 text-[10px] uppercase tracking-[0.28em] text-muted">
          <span>Signal strength</span>
          <span>{progress}%</span>
        </div>
        <div className="rounded-2xl bg-white/10 p-1" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`Exploration progress: ${progress}%`}>
          <motion.div
            className="h-2 rounded-2xl bg-gradient-to-r from-primary via-sky-400 to-emerald-400"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-2 gap-3 text-sm text-secondary">
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

      <div className="relative mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-secondary" aria-label="Current mission and exploration time">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Active signal</span>
          <span className="text-white">{activeMission?.title ?? currentMission?.title ?? "All systems aligned"}</span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Time explored</span>
          <span className="text-white">{timeExplored}</span>
        </div>
        <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Signal chain</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-primary">{narrativeStatus}</span>
          </div>
          <div className="mt-3 space-y-2">
            {recentActivity.length > 0 ? (
              recentActivity.map((entry) => (
                <div key={entry.id} className={`rounded-xl border p-2 ${getHistoryAccent(entry.type)}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium">{entry.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] opacity-70">{formatHistoryStamp(entry.timestamp)}</span>
                  </div>
                  <p className="mt-1 text-xs opacity-80">{entry.detail}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-secondary">Your first discoveries will appear here as the system learns your rhythm.</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
