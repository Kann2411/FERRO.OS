"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { createTransition } from "@/features/animation-engine";
import { useAudio } from "@/features/audio-engine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getWallpaperDefinition } from "@/lib/wallpapers";
import { useWallpaperStore } from "@/store/wallpaper-store";

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();
  const { enabled, playSound, stopSound } = useAudio();
  const currentWallpaper = useWallpaperStore((state) => state.current);
  const wallpaper = getWallpaperDefinition(currentWallpaper);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    playSound("ambient", "drift");
    return () => stopSound("ambient", "drift");
  }, [enabled, playSound, stopSound]);

  const particles = [
    { left: 12, top: 22, delay: 0 },
    { left: 28, top: 16, delay: 0.7 },
    { left: 44, top: 32, delay: 1.1 },
    { left: 64, top: 18, delay: 1.4 },
    { left: 78, top: 28, delay: 1.9 },
    { left: 20, top: 72, delay: 0.4 },
    { left: 36, top: 80, delay: 1.3 },
    { left: 70, top: 74, delay: 1.7 },
    { left: 86, top: 66, delay: 2.2 },
    { left: 58, top: 60, delay: 0.9 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: wallpaper.background }} aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? { x: 0, y: 0 } : { x: [0, 4, -3, 0], y: [0, -3, 4, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? { opacity: 0.7 } : { opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle at 20% 20%, rgba(248,113,113,0.16), transparent 30%), radial-gradient(circle at 75% 15%, rgba(255,255,255,0.1), transparent 25%), radial-gradient(circle at 50% 85%, rgba(56,189,248,0.1), transparent 28%)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? { opacity: 0.3, x: 0, y: 0 } : { opacity: [0.25, 0.5, 0.25], x: [0, 12, -8, 0], y: [0, -8, 10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(115deg, rgba(248,113,113,0.12) 0%, rgba(56,189,248,0.06) 35%, transparent 55%, rgba(255,255,255,0.04) 85%, rgba(248,113,113,0.1) 100%)",
          filter: "blur(30px)",
          transform: "scale(1.08)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? { opacity: 0.2, x: 0, y: 0 } : { opacity: [0.18, 0.38, 0.18], x: [-10, 8, 0], y: [8, -6, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle at 60% 30%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 30% 70%, rgba(248,113,113,0.1), transparent 32%)",
          filter: "blur(24px)",
        }}
      />
      <motion.div
        className="absolute left-[-10%] top-[-15%] h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        animate={prefersReducedMotion ? { x: 0, y: 0, scale: 1 } : { x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.06, 1] }}
        transition={{ ...createTransition("emphasis", { reducedMotion: prefersReducedMotion }), duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] h-80 w-80 rounded-full bg-white/10 blur-3xl"
        animate={prefersReducedMotion ? { x: 0, y: 0, scale: 1 } : { x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.04, 1] }}
        transition={{ ...createTransition("emphasis", { reducedMotion: prefersReducedMotion }), duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[15%] top-[18%] h-32 w-32 rounded-full border border-primary/20 bg-primary/10 blur-2xl"
        animate={prefersReducedMotion ? { opacity: 0.35, scale: 1 } : { opacity: [0.3, 0.55, 0.3], scale: [1, 1.12, 1] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[18%] left-[8%] h-24 w-24 rounded-full border border-white/10 bg-white/10 blur-2xl"
        animate={prefersReducedMotion ? { opacity: 0.2, scale: 1 } : { opacity: [0.2, 0.4, 0.2], scale: [1, 1.08, 1] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? { opacity: 0.25 } : { opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.04) 35%, transparent 60%)",
          transform: "translateX(-25%)",
        }}
      />
      {particles.map((particle, index) => (
        <motion.div
          key={particle.left + particle.top}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.6)]"
          style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
          animate={prefersReducedMotion ? { opacity: 0.5, scale: 0.8 } : { x: [0, 24, -12, 0], y: [0, -16, 12, 0], opacity: [0.2, 0.9, 0.35, 0.2], scale: [0.7, 1.15, 0.75, 0.7] }}
          transition={{ duration: 10 + index * 0.8, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size[60px_60px]" />
    </div>
  );
}
