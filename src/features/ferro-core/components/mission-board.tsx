"use client";

import { motion } from "framer-motion";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";

export function MissionBoard() {
  const { missions, completedMissions, explorerProfile } = useFerroCore();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-[24px] border border-white/10 bg-[#101010]/90 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">Mission system</p>
          <p className="mt-1 text-lg font-semibold text-white">Active objectives</p>
        </div>
        <div className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
          {completedMissions.length}/{missions.length}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {missions.map((mission) => {
          const done = completedMissions.includes(mission.id);
          const isLocked = Boolean(mission.prerequisite && !explorerProfile.missionProgress[mission.prerequisite]);
          return (
            <div
              key={mission.id}
              className={`rounded-2xl border px-3 py-3 ${done ? "border-primary/30 bg-primary/10" : isLocked ? "border-white/10 bg-white/5 opacity-70" : "border-primary/20 bg-primary/5"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white">{mission.title}</p>
                  <p className="mt-1 text-sm leading-6 text-secondary">{mission.description}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] ${done ? "bg-primary/20 text-primary" : isLocked ? "bg-white/10 text-secondary" : "bg-primary/20 text-primary"}`}>
                  {done ? "Done" : isLocked ? "Locked" : "Ready"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
