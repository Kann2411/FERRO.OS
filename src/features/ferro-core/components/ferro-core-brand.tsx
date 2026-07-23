"use client";

import { motion } from "framer-motion";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";

export function FerroCoreBrand() {
  const { logo, coreName, tagline } = useFerroCore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-[32px] border border-white/10 bg-[#101010]/95 p-6 shadow-[0_40px_120px_rgba(217,4,41,0.24)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 text-primary">
        <span className="text-3xl">{logo}</span>
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-muted">Core</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{coreName}</h1>
        </div>
      </div>

      <p className="mt-4 max-w-xl text-sm leading-7 text-secondary">{tagline}</p>
    </motion.div>
  );
}
