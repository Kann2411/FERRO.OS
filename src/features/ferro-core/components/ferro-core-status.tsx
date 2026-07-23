"use client";

import { motion } from "framer-motion";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";

export function FerroCoreStatus() {
  const { explorerProfile } = useFerroCore();
  const progress = Math.round(explorerProfile.progress);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-3xl border border-white/10 bg-surface/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-muted">Explorer</p>
          <p className="mt-1 text-lg font-semibold text-white">{explorerProfile.name}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase text-muted">
          Level 0
        </span>
      </div>

      <div className="mt-6 rounded-3xl bg-white/5 p-1">
        <div className="h-3 rounded-3xl bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-secondary">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Progress</p>
          <p className="mt-1 text-white">{progress}%</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Discovered</p>
          <p className="mt-1 text-white">{explorerProfile.modulesDiscovered}</p>
        </div>
      </div>
    </motion.section>
  );
}
