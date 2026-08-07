"use client";

import { motion } from "framer-motion";
import { createTransition } from "@/features/animation-engine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const experiments = [
  {
    title: "Neural prompt synthesis",
    description: "A proposal for responsive writing prompts that adapt to input intent without breaking immersive flow.",
  },
  {
    title: "Adaptive interface nesting",
    description: "A system for blending hidden modules into the workspace through context-sensitive reveal mechanics.",
  },
  {
    title: "Discovery telemetry",
    description: "A background engine that tracks user curiosity and surfaces narrative clues over time.",
  },
];

export function AiLabModule() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex h-full flex-col gap-5 overflow-auto">
      <div className="rounded-[28px] border border-white/10 bg-[#0b0b0f]/90 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted">Hidden module</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">AI Lab</h2>
        <p className="mt-3 text-sm leading-7 text-secondary">
          A private research environment for FERRO CORE experiments, prototypes and future system ideas. This lab is hidden from the main desktop until unlocked through exploration.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {experiments.map((experiment, index) => (
          <motion.article
            key={experiment.title}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={createTransition("panel", { reducedMotion: prefersReducedMotion, durationMultiplier: 0.9, delay: index * 0.05 })}
            className="rounded-[22px] border border-white/10 bg-[#111111]/90 p-5"
          >
            <p className="text-sm font-semibold text-white">{experiment.title}</p>
            <p className="mt-3 text-sm leading-7 text-secondary">{experiment.description}</p>
          </motion.article>
        ))}
      </div>

      <div className="rounded-[22px] border border-primary/30 bg-primary/10 p-5 text-sm text-secondary">
        <p className="text-xs uppercase tracking-[0.32em] text-primary">AI Laboratory Notes</p>
        <p className="mt-3 leading-7">
          The AI Lab is a hidden space where FERRO CORE stores ideas that are not yet ready for the main desktop. It rewards curiosity without breaking the portfolio's visible structure.
        </p>
      </div>
    </div>
  );
}
