"use client";

import { motion } from "framer-motion";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";

export function ExplorerProfileCard() {
  const { explorerProfile } = useFerroCore();
  const progress = Math.round(explorerProfile.progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded-3xl border border-white/10 bg-[#101010]/90 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">Explorer</p>
          <p className="mt-1 text-lg font-semibold text-white">{explorerProfile.name}</p>
        </div>
        <div className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
          Level 0
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white/5 p-1">
        <div className="h-2 rounded-2xl bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-secondary">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Progress</p>
          <p className="mt-2 text-white">{progress}%</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Modules</p>
          <p className="mt-2 text-white">{explorerProfile.modulesDiscovered}</p>
        </div>
      </div>
    </motion.div>
  );
}
