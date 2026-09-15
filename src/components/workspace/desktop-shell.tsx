"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Dock } from "@/components/workspace/dock";
import { DesktopIcons } from "@/components/workspace/desktop-icons";
import { StatusPanel } from "@/components/workspace/status-panel";
import { AmbientBackground } from "@/components/workspace/ambient-background";
import { CoreMessages, CoreNotifications, ExplorerProfileCard, MissionBoard, RecognizedModal, SignalMap } from "@/features/ferro-core";
import { WindowManager } from "@/features/window-system/components/window-manager";
import { useWindowContext, WindowProvider } from "@/features/window-system/context/window-context";
import { resolveWindowDefinition } from "@/features/window-system/utils/open-module";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useAudio } from "@/features/audio-engine";
import { createMotionProps } from "@/features/animation-engine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { useLang, useToggleLang, useUi } from "@/hooks/use-lang";
import { panelVariants } from "@/components/ui/panel";
import { cn } from "@/lib/cn";

function WorkspaceContent() {
  useKeyboardShortcuts();
  const { setMapOpen } = useFerroCore();
  const { openWindow, focusWindow, bringToFront } = useWindowContext();
  const { playSound } = useAudio();
  const prefersReducedMotion = useReducedMotion();
  const lang = useLang();
  const toggleLang = useToggleLang();
  const tUi = useUi();

  const handleToggleLang = () => {
    playSound("ui", "click");
    toggleLang();
  };

  const handleOpenSettings = () => {
    const definition = resolveWindowDefinition("settings", lang);
    if (!definition) {
      return;
    }

    playSound("ui", "open");
    openWindow(definition);
    focusWindow(definition.id);
    bringToFront(definition.id);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <AmbientBackground />

      <div className="relative z-10 flex min-h-screen flex-col pb-20 sm:pb-0">
        <header role="banner" className="flex items-center justify-between border-b border-white/10 bg-black/20 px-3 py-2 backdrop-blur-xl sm:px-5 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-2 w-2 rounded-full bg-primary sm:h-2.5 sm:w-2.5" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-secondary sm:text-sm">
              {tUi("brandLine")}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onPointerEnter={() => playSound("ui", "hover")}
              onClick={handleToggleLang}
              aria-label={tUi("languageToggleLabel")}
              className="rounded-full border border-white/10 bg-surface/10 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition hover:border-primary/40 hover:bg-surface/20"
            >
              {lang === "es" ? "ES" : "EN"}
            </button>
            <button
              type="button"
              onPointerEnter={() => playSound("ui", "hover")}
              onClick={handleOpenSettings}
              className="rounded-full border border-white/10 bg-surface/10 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition hover:border-primary/40 hover:bg-surface/20"
            >
              {tUi("settings")}
            </button>
            <StatusPanel />
            <ThemeToggle />
          </div>
        </header>

        <main id="main-content" role="main" className="flex-1 p-3 sm:p-6 lg:p-8">
          <div className="flex h-full flex-col justify-between gap-4 sm:gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <section aria-label={tUi("desktopApplications")} className="w-full lg:w-auto">
                <DesktopIcons />
              </section>
              <aside aria-label={tUi("explorerInformation")} className="w-full space-y-3 sm:max-w-85">
                <ExplorerProfileCard />
                <MissionBoard />
                <CoreMessages />
              </aside>
            </div>
            <div className="hidden items-end justify-between gap-4 sm:flex">
              <motion.div
                {...createMotionProps("panel", { reducedMotion: prefersReducedMotion })}
                className={cn(panelVariants({ tone: "surface", size: "md", elevated: true }))}
                role="status"
                aria-label={tUi("currentMissionHint")}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-muted">{tUi("missionHintLabel")}</p>
                <p className="mt-2 max-w-md text-sm leading-7 text-secondary">
                  {tUi("missionHintText")}
                </p>
              </motion.div>
              <nav aria-label={tUi("applicationDock")}>
                <Dock />
              </nav>
            </div>
          </div>
        </main>
      </div>

      <button
        type="button"
        onClick={() => {
          playSound("ui", "open");
          setMapOpen(true);
        }}
        aria-label={tUi("openSignalMap")}
        className="fixed bottom-6 left-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-surface/80 text-lg text-secondary shadow-window backdrop-blur-xl transition hover:border-primary/40 hover:text-primary sm:flex"
      >
        <span aria-hidden="true">⌖</span>
      </button>

      <WindowManager />
      <CoreNotifications />
      <SignalMap />
      <RecognizedModal />
    </div>
  );
}

export function DesktopShell() {
  return (
    <WindowProvider>
      <WorkspaceContent />
    </WindowProvider>
  );
}
