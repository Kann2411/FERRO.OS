"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { createPopoverMotion } from "@/features/animation-engine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useUi } from "@/hooks/use-lang";
import { Button } from "@/components/ui/button";

function Emblem() {
  return (
    <div
      className="mx-auto flex size-24 items-center justify-center rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,#3d3733,#141210_72%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_40px_rgba(0,0,0,0.55)]"
      aria-hidden="true"
    >
      <span className="bg-linear-to-b from-[#dcb994] via-[#9a5f3b] to-[#4b2a1a] bg-clip-text text-6xl leading-none font-black text-transparent drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
        F
      </span>
    </div>
  );
}

export function RecognizedModal() {
  const { recognizedOpen, setRecognizedOpen, missions, completedMissions, explorerProfile } = useFerroCore();
  const prefersReducedMotion = useReducedMotion();
  const tUi = useUi();

  useEffect(() => {
    if (!recognizedOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setRecognizedOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [recognizedOpen, setRecognizedOpen]);

  if (!recognizedOpen) {
    return null;
  }

  const stats = [
    { label: tUi("recognizedMissionsLabel"), value: `${completedMissions.length}/${missions.length}` },
    { label: tUi("recognizedAchievementsLabel"), value: `${explorerProfile.achievements.length}` },
  ];

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center bg-background/85 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={tUi("recognizedDialogLabel")}
    >
      <motion.div
        {...createPopoverMotion("window", { reducedMotion: prefersReducedMotion })}
        className="w-full max-w-md rounded-3xl border border-border bg-surface/95 p-6 text-center shadow-window sm:p-8"
      >
        <Emblem />

        <p className="mt-5 font-mono text-xs uppercase tracking-[0.3em] text-muted">{tUi("recognizedKicker")}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">{tUi("recognizedHeadline")}</h2>
        <p className="mt-3 text-sm leading-6 text-secondary">{tUi("recognizedBody")}</p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-surface-2 px-3 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">{stat.label}</p>
              <p className="mt-1 font-mono text-lg text-white tabular-nums">{stat.value}</p>
            </div>
          ))}
        </div>

        <Button size="lg" className="mt-6 w-full rounded-2xl" onClick={() => setRecognizedOpen(false)} autoFocus>
          {tUi("recognizedContinue")}
        </Button>
      </motion.div>
    </div>
  );
}
