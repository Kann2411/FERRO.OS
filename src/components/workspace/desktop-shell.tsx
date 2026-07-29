"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Dock } from "@/components/workspace/dock";
import { DesktopIcons } from "@/components/workspace/desktop-icons";
import { StatusPanel } from "@/components/workspace/status-panel";
import { AmbientBackground } from "@/components/workspace/ambient-background";
import { CoreMessages, CoreNotifications, ExplorerProfileCard, MissionBoard } from "@/features/ferro-core";
import { WindowManager } from "@/features/window-system/components/window-manager";
import { useWindowContext, WindowProvider } from "@/features/window-system/context/window-context";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useWindowManager } from "@/features/window-system/hooks/use-window-manager";

function WorkspaceContent() {
  useWindowManager();
  const { resetFlow } = useFerroCore();
  const { resetWindowState } = useWindowContext();

  const handleReset = () => {
    const confirmed = window.confirm("Reset the entire workspace flow and return to zero?");
    if (!confirmed) {
      return;
    }

    resetFlow();
    resetWindowState();
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
              FERRO.OS / workspace
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-rose-400/30 bg-rose-500/10 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] text-rose-200 transition hover:border-rose-300/50 hover:bg-rose-500/20"
            >
              Reset flow
            </button>
            <StatusPanel />
            <ThemeToggle />
          </div>
        </header>

        <main id="main-content" role="main" className="flex-1 p-3 sm:p-6 lg:p-8">
          <div className="flex h-full flex-col justify-between gap-4 sm:gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <section aria-label="Desktop applications" className="w-full lg:w-auto">
                <DesktopIcons />
              </section>
              <aside aria-label="Explorer information" className="w-full space-y-3 sm:max-w-85">
                <ExplorerProfileCard />
                <MissionBoard />
                <CoreMessages />
              </aside>
            </div>
            <div className="hidden items-end justify-between gap-4 sm:flex">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-white/10 bg-surface/70 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl"
                role="status"
                aria-label="Current mission hint"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Mission</p>
                <p className="mt-2 max-w-md text-sm leading-7 text-secondary">
                  Explore the desktop, unlock the hidden signals, and begin shaping the operating system.
                </p>
              </motion.div>
              <nav aria-label="Application dock">
                <Dock />
              </nav>
            </div>
          </div>
        </main>
      </div>

      <WindowManager />
      <CoreNotifications />
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
