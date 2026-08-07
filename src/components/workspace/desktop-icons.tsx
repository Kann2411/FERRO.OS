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

const items = [
  { label: "Projects", icon: "⌘", accent: "bg-primary/20 text-primary", windowId: "projects", description: "View Kristian's portfolio projects" },
  { label: "Studio", icon: "♫", accent: "bg-white/10 text-foreground", windowId: "studio", description: "Music production environment" },
  { label: "Discography", icon: "◈", accent: "bg-white/10 text-foreground", windowId: "discography", description: "Artist releases and catalog" },
  { label: "Audio Player", icon: "♪", accent: "bg-white/10 text-foreground", windowId: "audioPlayer", description: "Music player controls and queue" },
  { label: "Equipment", icon: "⚙", accent: "bg-white/10 text-foreground", windowId: "equipment", description: "Studio gear and production tools" },
  { label: "Resume", icon: "◫", accent: "bg-white/10 text-foreground", windowId: "resume", description: "Professional resume and experience" },
  { label: "Skills", icon: "◌", accent: "bg-white/10 text-foreground", windowId: "skills", description: "Technical skills and proficiencies" },
  { label: "Timeline", icon: "⧉", accent: "bg-white/10 text-foreground", windowId: "timeline", description: "Career timeline and milestones" },
  { label: "Terminal", icon: ">", accent: "bg-primary/20 text-primary", windowId: "terminal", description: "Interactive terminal for system commands" },
];

export function DesktopIcons() {
  const { openWindow, focusWindow, bringToFront } = useWindowContext();
  const { playSound } = useAudio();
  const { explorerProfile, completeMission, advanceProgress, registerDiscovery, registerHiddenDiscovery, awardAchievement, pushMessage, pushNotification } = useFerroCore();
  const [recentOpens, setRecentOpens] = useState<string[]>([]);
  const prefersHighContrast = useHighContrast();
  const prefersReducedMotion = useReducedMotion();

  const handleOpen = (windowId: string) => {
    const definition = resolveWindowDefinition(windowId);
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
        title: "Secret sequence found",
        body: "FERRO.OS responded to a hidden chain of module openings.",
      });
    }

    if (isFirstModuleOpen) {
      completeMission("explore-desktop");
      completeMission("open-first-module");
      advanceProgress(4);
      registerDiscovery(windowId);

      if (windowId === "projects") {
        completeMission("discover-projects");
        awardAchievement("Projects discovered");
        pushMessage({
          id: "projects-discovered",
          type: "achievement",
          title: "Projects unlocked",
          body: "FERRO CORE has mapped the first visible frontier.",
        });
        pushNotification({
          id: "projects-notification",
          type: "achievement",
          title: "Achievement unlocked",
          body: "You discovered the Projects signal.",
        });
      }

      pushNotification({
        id: `module-opened-${windowId}`,
        type: "info",
        title: "Module opened",
        body: `${definition.title} is now active.`,
      });
    }

    openWindow(definition);
    focusWindow(definition.id);
    bringToFront(definition.id);
  };

  return (
    <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Desktop applications">
      {items.map((item) => (
        <motion.button
          key={item.label}
          type="button"
          role="listitem"
          whileHover={{ y: -3, scale: 1.03, rotate: -1 }}
          whileTap={{ scale: 0.96 }}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={createMotionProps("entrance", { reducedMotion: prefersReducedMotion }).transition}
          onPointerEnter={() => playSound("ui", "hover")}
          onClick={() => handleOpen(item.windowId)}
          aria-label={`Open ${item.label}: ${item.description}`}
          className={`group flex min-h-11 min-w-11 flex-col items-center gap-2 rounded-2xl border bg-surface/40 p-3 text-center shadow-[0_12px_40px_rgba(0,0,0,0.16)] transition hover:border-primary/40 hover:bg-surface/70 sm:p-4 ${prefersHighContrast ? "border-white" : "border-white/10"}`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl text-lg shadow-inner shadow-black/20 sm:h-12 sm:w-12 ${item.accent}`} aria-hidden="true">
            {item.icon}
          </div>
          <span className="text-xs font-medium text-secondary transition group-hover:text-foreground sm:text-sm">
            {item.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
