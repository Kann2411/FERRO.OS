"use client";

import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useWindowContext } from "@/features/window-system/context/window-context";
import { resolveWindowDefinition } from "@/features/window-system/utils/open-module";
import { useHighContrast } from "@/hooks/use-high-contrast";

const items = [
  { label: "Projects", icon: "⌘", accent: "bg-primary/20 text-primary", windowId: "projects", description: "View Kristian's portfolio projects" },
  { label: "Studio", icon: "♫", accent: "bg-white/10 text-foreground", windowId: "studio", description: "Music production environment" },
  { label: "Resume", icon: "◫", accent: "bg-white/10 text-foreground", windowId: "resume", description: "Professional resume and experience" },
  { label: "Skills", icon: "◌", accent: "bg-white/10 text-foreground", windowId: "skills", description: "Technical skills and proficiencies" },
  { label: "Timeline", icon: "⧉", accent: "bg-white/10 text-foreground", windowId: "timeline", description: "Career timeline and milestones" },
];

export function DesktopIcons() {
  const { openWindow, focusWindow, bringToFront } = useWindowContext();
  const { explorerProfile, completeMission, advanceProgress, registerDiscovery, awardAchievement, pushMessage, pushNotification } = useFerroCore();
  const prefersHighContrast = useHighContrast();

  const handleOpen = (windowId: string) => {
    const definition = resolveWindowDefinition(windowId);
    if (!definition) {
      return;
    }

    const isFirstModuleOpen = !explorerProfile.discoveredModules.includes(windowId);

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
        <button
          key={item.label}
          type="button"
          role="listitem"
          onClick={() => handleOpen(item.windowId)}
          aria-label={`Open ${item.label}: ${item.description}`}
          className={`group flex min-h-[44px] min-w-[44px] flex-col items-center gap-2 rounded-2xl border bg-surface/40 p-3 text-center transition hover:border-primary/40 hover:bg-surface/70 active:scale-95 sm:p-4 ${prefersHighContrast ? "border-white" : "border-white/10"}`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl text-lg sm:h-12 sm:w-12 ${item.accent}`} aria-hidden="true">
            {item.icon}
          </div>
          <span className="text-xs font-medium text-secondary transition group-hover:text-foreground sm:text-sm">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
