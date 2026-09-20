"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useAudio } from "@/features/audio-engine";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useWindowContext } from "@/features/window-system/context/window-context";
import { resolveWindowDefinition } from "@/features/window-system/utils/open-module";
import { createMotionProps } from "@/features/animation-engine";
import { useHighContrast } from "@/hooks/use-high-contrast";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLang, useT, useUi } from "@/hooks/use-lang";
import { launcherItems } from "@/components/workspace/launcher-items";

export function DesktopIcons() {
  const { openWindow, focusWindow, bringToFront } = useWindowContext();
  const { playSound } = useAudio();
  const { explorerProfile, completeMission, registerDiscovery, registerHiddenDiscovery, awardAchievement, pushMessage, pushNotification } = useFerroCore();
  const [recentOpens, setRecentOpens] = useState<string[]>([]);
  const prefersHighContrast = useHighContrast();
  const prefersReducedMotion = useReducedMotion();
  const lang = useLang();
  const t = useT();
  const tUi = useUi();

  const unlockedItems = launcherItems
    .filter((item) => !item.dockOnly && explorerProfile.unlockedModules.includes(item.windowId))
    .map((item) => {
      const definition = resolveWindowDefinition(item.windowId, lang);
      return definition ? { ...item, label: definition.title, icon: definition.icon, description: t(item.description) } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const handleOpen = (windowId: string) => {
    const definition = resolveWindowDefinition(windowId, lang);
    if (!definition) {
      return;
    }

    const isFirstModuleOpen = !explorerProfile.discoveredModules.includes(windowId);
    const nextSequence = [...recentOpens.slice(-2), windowId];
    setRecentOpens(nextSequence);

    if (
      nextSequence.length === 3 &&
      nextSequence[0] === "projects" &&
      nextSequence[1] === "skills" &&
      nextSequence[2] === "resume" &&
      !explorerProfile.discoveredHiddenFiles.includes("easter-egg-sequence.txt")
    ) {
      registerHiddenDiscovery("easter-egg-sequence.txt");
      pushNotification({
        id: "easter-egg-sequence",
        type: "info",
        title: { es: "Secuencia secreta encontrada", en: "Secret sequence found" },
        body: {
          es: "FERRO.OS respondió a una cadena oculta de módulos abiertos.",
          en: "FERRO.OS responded to a hidden chain of module openings.",
        },
      });
    }

    if (isFirstModuleOpen) {
      registerDiscovery(windowId);

      if (windowId === "projects") {
        awardAchievement("projects-discovered");
        pushMessage({
          id: "projects-discovered",
          type: "achievement",
          title: { es: "Proyectos desbloqueados", en: "Projects unlocked" },
          body: {
            es: "FERRO CORE mapeó la primera frontera visible.",
            en: "FERRO CORE has mapped the first visible frontier.",
          },
        });
        pushNotification({
          id: "projects-notification",
          type: "achievement",
          title: { es: "Logro desbloqueado", en: "Achievement unlocked" },
          body: { es: "Descubriste la señal de Proyectos.", en: "You discovered the Projects signal." },
        });
      }

      pushNotification({
        id: `module-opened-${windowId}`,
        type: "info",
        title: { es: "Módulo abierto", en: "Module opened" },
        body: { es: `${definition.title} ya está activo.`, en: `${definition.title} is now active.` },
      });
    }

    openWindow(definition);
    focusWindow(definition.id);
    bringToFront(definition.id);
  };

  return (
    <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label={tUi("desktopApplications")}>
      {unlockedItems.map((item, index) => (
        <motion.button
          key={item.windowId}
          type="button"
          role="listitem"
          whileHover={{ y: -3, scale: 1.03, rotate: -1 }}
          whileTap={{ scale: 0.96 }}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={createMotionProps("entrance", { reducedMotion: prefersReducedMotion }).transition}
          onPointerEnter={() => {
            playSound("ui", "hover");
            completeMission("explore-desktop");
          }}
          onClick={() => handleOpen(item.windowId)}
          aria-label={`${lang === "es" ? "Abrir" : "Open"} ${item.label}: ${item.description}`}
          className={`group relative flex min-h-11 min-w-11 flex-col items-center gap-2 rounded-2xl border bg-surface/40 p-3 text-center shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition hover:border-primary/40 hover:bg-surface/70 sm:p-4 ${prefersHighContrast ? "border-white" : "border-white/10"}`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl text-lg shadow-inner shadow-black/20 sm:h-12 sm:w-12 ${item.accent}`} aria-hidden="true">
            {item.icon}
          </div>
          <span className="text-xs font-medium text-secondary transition group-hover:text-foreground sm:text-sm">
            {item.label}
          </span>
          {explorerProfile.unlockedModules.includes(item.windowId) && explorerProfile.discoveredModules.includes(item.windowId) === false && (
            <span
              className={`absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] text-white ${prefersReducedMotion ? "" : "animate-pulse"}`}
              aria-label={tUi("newlyUnlocked")}
            >
              ✦
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
