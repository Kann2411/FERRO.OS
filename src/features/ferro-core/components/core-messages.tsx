"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createMotionProps, createTransition } from "@/features/animation-engine";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { panelVariants } from "@/components/ui/panel";
import { cn } from "@/lib/cn";

const messageStyles: Record<string, string> = {
  info: "border-white/10 bg-white/5 text-secondary",
  tip: "border-primary/30 bg-primary/10 text-secondary",
  lore: "border-white/10 bg-[#121212] text-secondary",
  welcome: "border-primary/30 bg-primary/10 text-secondary",
  warning: "border-amber-400/30 bg-amber-400/10 text-secondary",
  achievement: "border-primary/30 bg-primary/10 text-secondary",
};

export function CoreMessages() {
  const { messages } = useFerroCore();
  const prefersReducedMotion = useReducedMotion();

  if (messages.length === 0) {
    return null;
  }

  return (
    <motion.section
      {...createMotionProps("panel", { reducedMotion: prefersReducedMotion })}
      className={cn(panelVariants({ tone: "surface", size: "md", elevated: true }))}
      aria-label="FERRO CORE messages"
    >
      <p className="text-[10px] uppercase tracking-[0.32em] text-muted">FERRO CORE</p>
      <div className="mt-3 space-y-2" role="log" aria-live="polite">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              layout
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={createTransition("window", { reducedMotion: prefersReducedMotion })}
              className={`rounded-2xl border px-3 py-3 ${messageStyles[message.type]}`}
              role="article"
              aria-label={`${message.type} message: ${message.title}`}
            >
              <p className="text-sm font-medium text-white">{message.title}</p>
              <p className="mt-1 text-sm leading-6 text-secondary">{message.body}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
