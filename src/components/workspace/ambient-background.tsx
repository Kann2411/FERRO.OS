"use client";

import { motion } from "framer-motion";

export function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(217,4,41,0.16),_transparent_34%),linear-gradient(135deg,_rgba(20,20,20,0.95),_rgba(9,9,9,0.98))]">
      <motion.div
        className="absolute left-[-10%] top-[-15%] h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] h-80 w-80 rounded-full bg-white/10 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  );
}
