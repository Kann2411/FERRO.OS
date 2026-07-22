"use client";

import { motion } from "framer-motion";

export function StatusPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-full border border-white/10 bg-surface/70 px-3 py-2 text-sm text-secondary backdrop-blur-xl"
    >
      <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-success" />
      03:14 • Explorer Sync
    </motion.div>
  );
}
