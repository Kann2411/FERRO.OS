"use client";

import { motion } from "framer-motion";
import { useWindowContext } from "@/features/window-system/context/window-context";
import { resolveWindowDefinition } from "@/features/window-system/utils/open-module";
import { useAudio } from "@/features/audio-engine";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { createMotionProps } from "@/features/animation-engine";
import { useHighContrast } from "@/hooks/use-high-contrast";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLang, useUi } from "@/hooks/use-lang";
import { launcherItems } from "@/components/workspace/launcher-items";

export function Dock() {
  const { openWindow, focusWindow, bringToFront } = useWindowContext();
  const { playSound } = useAudio();
  const { explorerProfile } = useFerroCore();
  const isUnexplored = (windowId: string) =>
    explorerProfile.unlockedModules.includes(windowId) && !explorerProfile.discoveredModules.includes(windowId);
  const prefersHighContrast = useHighContrast();
  const prefersReducedMotion = useReducedMotion();
  const lang = useLang();
  const tUi = useUi();

  const unlockedApps = launcherItems
    .filter((item) => explorerProfile.unlockedModules.includes(item.windowId))
    .map((item) => {
      const definition = resolveWindowDefinition(item.windowId, lang);
      return definition ? { windowId: item.windowId, label: definition.title, icon: definition.icon } : null;
    })
    .filter((app): app is NonNullable<typeof app> => app !== null);

  const handleOpen = (windowId: string) => {
    const definition = resolveWindowDefinition(windowId, lang);
    if (!definition) {
      return;
    }

    openWindow(definition);
    focusWindow(definition.id);
    bringToFront(definition.id);
  };

  return (
    <>
      {/* Desktop dock - hidden on mobile */}
      <div className={`hidden items-center gap-3 rounded-full border bg-surface/70 px-3 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:flex ${prefersHighContrast ? "border-white" : "border-white/10"}`} role="toolbar" aria-label={tUi("applicationDock")}>
        {unlockedApps.map((app) => (
          <motion.button
            key={app.windowId}
            type="button"
            aria-label={`${lang === "es" ? "Abrir" : "Open"} ${app.label}`}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={createMotionProps("window", { reducedMotion: prefersReducedMotion }).transition}
            onPointerEnter={() => playSound("ui", "hover")}
            onClick={() => handleOpen(app.windowId)}
            className={`relative flex h-12 w-12 items-center justify-center rounded-full border bg-black/20 text-lg text-secondary shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition hover:border-primary/40 hover:text-primary ${prefersHighContrast ? "border-white" : "border-white/10"}`}
          >
            <span aria-hidden="true">{app.icon}</span>
            {isUnexplored(app.windowId) && (
              <span
                className={`absolute top-0.5 right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[7px] text-white ${prefersReducedMotion ? "" : "animate-pulse"}`}
                aria-label={tUi("newlyUnlocked")}
              >
                ✦
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Mobile dock - shown only on mobile */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-surface/90 px-2 py-2 backdrop-blur-xl sm:hidden ${prefersHighContrast ? "border-white" : "border-white/10"}`} role="toolbar" aria-label={tUi("mobileApplicationDock")}>
        {unlockedApps.map((app) => (
          <motion.button
            key={app.windowId}
            type="button"
            aria-label={`${lang === "es" ? "Abrir" : "Open"} ${app.label}`}
            whileTap={{ scale: 0.95 }}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={createMotionProps("window", { reducedMotion: prefersReducedMotion }).transition}
            onClick={() => handleOpen(app.windowId)}
            className={`relative flex h-12 w-12 items-center justify-center rounded-xl border bg-black/20 text-lg text-secondary shadow-[0_10px_24px_rgba(0,0,0,0.2)] transition hover:border-primary/40 hover:text-primary ${prefersHighContrast ? "border-white" : "border-white/10"}`}
          >
            <span aria-hidden="true">{app.icon}</span>
            {isUnexplored(app.windowId) && (
              <span
                className={`absolute top-0.5 right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[7px] text-white ${prefersReducedMotion ? "" : "animate-pulse"}`}
                aria-label={tUi("newlyUnlocked")}
              >
                ✦
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </>
  );
}
