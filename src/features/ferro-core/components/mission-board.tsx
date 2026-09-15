"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createMotionProps, createTransition } from "@/features/animation-engine";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useT, useUi } from "@/hooks/use-lang";
import { panelVariants } from "@/components/ui/panel";
import { cn } from "@/lib/cn";

export function MissionBoard() {
  const { missions, completedMissions, explorerProfile, setMapOpen } = useFerroCore();
  const prefersReducedMotion = useReducedMotion();
  const t = useT();
  const tUi = useUi();
  const missionCount = completedMissions.length;
  const totalMissions = missions.length;

  return (
    <motion.section
      {...createMotionProps("panel", { reducedMotion: prefersReducedMotion })}
      className={cn(panelVariants({ tone: "surface", size: "md", elevated: true }))}
      aria-label={`${tUi("missionSystem")}: ${missionCount}/${totalMissions}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("missionSystem")}</p>
          <p className="mt-1 text-lg font-semibold text-white">{tUi("activeObjectives")}</p>
        </div>
        <div className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary" aria-hidden="true">
          {missionCount}/{totalMissions}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setMapOpen(true)}
        className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-secondary transition hover:border-primary/40 hover:text-white"
      >
        <span aria-hidden="true">⌖</span>
        {tUi("openSignalMap")}
      </button>

      <div className="mt-4 space-y-3" role="list" aria-label={tUi("missions")}>
        <AnimatePresence initial={false}>
          {missions.map((mission) => {
            const done = completedMissions.includes(mission.id);
            const isLocked = Boolean(mission.prerequisite && !explorerProfile.missionProgress[mission.prerequisite]);
            const status = done ? tUi("missionStatusDone") : isLocked ? tUi("missionStatusLocked") : tUi("missionStatusReady");
            return (
              <motion.div
                key={mission.id}
                layout
                whileHover={{ y: -2, scale: 1.01 }}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={createTransition("window", { reducedMotion: prefersReducedMotion })}
                className={`rounded-2xl border px-3 py-3 ${done ? "border-primary/30 bg-primary/10" : isLocked ? "border-white/10 bg-white/5 opacity-70" : "border-primary/20 bg-primary/5"}`}
                role="listitem"
                aria-label={`${t(mission.title)}: ${status}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">{t(mission.title)}</p>
                    <p className="mt-1 text-sm leading-6 text-secondary">{t(mission.description)}</p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] ${done ? "bg-primary/20 text-primary" : isLocked ? "bg-white/10 text-secondary" : "bg-primary/20 text-primary"}`} aria-hidden="true">
                    {status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
