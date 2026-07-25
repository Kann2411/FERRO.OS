"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";

export function WelcomeSequence() {
  const { explorerProfile, initialized, coreName, logo, completeWelcome, recordVisit, advanceProgress } = useFerroCore();

  if (!initialized || explorerProfile.welcomeCompleted) {
    return null;
  }

  const handleBegin = () => {
    recordVisit();
    advanceProgress(10);
    completeWelcome();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-60 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(217,4,41,0.22),transparent_54%),rgba(2,2,2,0.92)] px-4 py-8 backdrop-blur-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Welcome to FERRO.OS"
      >
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative w-full max-w-3xl overflow-hidden rounded-[36px] border border-white/10 bg-[#111111]/95 p-8 shadow-[0_40px_140px_rgba(0,0,0,0.55)] sm:p-10"
        >
          <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.04),transparent_38%,rgba(217,4,41,0.14))]" />

          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-3xl text-primary" aria-hidden="true">
                {logo}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.38em] text-muted">Welcome</p>
                <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">{coreName} awakened</h1>
              </div>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-primary">Cinematic introduction</p>
                <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                  The system is ready to remember you.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-secondary">
                  FERRO CORE opens as the quiet intelligence behind the experience. It observes your curiosity,
                  learns from every interaction, and begins shaping a unique path through the operating system.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleBegin}
                    className="rounded-full border border-primary/40 bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary/90"
                    aria-label="Begin exploring FERRO.OS"
                  >
                    Begin exploration
                  </button>
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-secondary" aria-label="This is your first visit, local memory is enabled">
                    First visit • local memory enabled
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[#0b0b0b]/80 p-6" aria-label="System state information">
                <p className="text-xs uppercase tracking-[0.32em] text-muted">System state</p>
                <div className="mt-5 space-y-4 text-sm text-secondary">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>Explorer</span>
                    <span className="text-white">{explorerProfile.name}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>Progress</span>
                    <span className="text-white">{explorerProfile.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>Modules</span>
                    <span className="text-white">{explorerProfile.modulesDiscovered}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
