"use client";

import { useWindowContext } from "@/features/window-system/context/window-context";
import { resolveWindowDefinition } from "@/features/window-system/utils/open-module";
import { useHighContrast } from "@/hooks/use-high-contrast";

const apps = [
  { icon: "⌘", windowId: "projects", label: "Projects" },
  { icon: "♫", windowId: "studio", label: "Studio" },
  { icon: "◫", windowId: "resume", label: "Resume" },
  { icon: "◌", windowId: "skills", label: "Skills" },
  { icon: "⧉", windowId: "timeline", label: "Timeline" },
];

export function Dock() {
  const { openWindow, focusWindow, bringToFront } = useWindowContext();
  const prefersHighContrast = useHighContrast();

  const handleOpen = (windowId: string) => {
    const definition = resolveWindowDefinition(windowId);
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
      <div className={`hidden items-center gap-3 rounded-full border bg-surface/70 px-3 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:flex ${prefersHighContrast ? "border-white" : "border-white/10"}`} role="toolbar" aria-label="Application dock">
        {apps.map((app) => (
          <button
            key={app.windowId}
            type="button"
            aria-label={`Open ${app.label}`}
            onClick={() => handleOpen(app.windowId)}
            className={`flex h-12 w-12 items-center justify-center rounded-full border bg-black/20 text-lg text-secondary transition hover:-translate-y-1 hover:border-primary/40 hover:text-primary ${prefersHighContrast ? "border-white" : "border-white/10"}`}
          >
            <span aria-hidden="true">{app.icon}</span>
          </button>
        ))}
      </div>

      {/* Mobile dock - shown only on mobile */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-surface/90 px-2 py-2 backdrop-blur-xl sm:hidden ${prefersHighContrast ? "border-white" : "border-white/10"}`} role="toolbar" aria-label="Mobile application dock">
        {apps.map((app) => (
          <button
            key={app.windowId}
            type="button"
            aria-label={`Open ${app.label}`}
            onClick={() => handleOpen(app.windowId)}
            className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-black/20 text-lg text-secondary transition hover:border-primary/40 hover:text-primary active:scale-95 ${prefersHighContrast ? "border-white" : "border-white/10"}`}
          >
            <span aria-hidden="true">{app.icon}</span>
          </button>
        ))}
      </div>
    </>
  );
}
