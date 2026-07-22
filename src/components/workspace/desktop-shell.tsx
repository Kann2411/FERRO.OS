"use client";

"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Dock } from "@/components/workspace/dock";
import { DesktopIcons } from "@/components/workspace/desktop-icons";
import { StatusPanel } from "@/components/workspace/status-panel";
import { AmbientBackground } from "@/components/workspace/ambient-background";
import { WindowManager } from "@/features/window-system/components/window-manager";
import { WindowProvider } from "@/features/window-system/context/window-context";
import { useWindowManager } from "@/features/window-system/hooks/use-window-manager";

function WorkspaceContent() {
  useWindowManager();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <AmbientBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-white/10 bg-black/20 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-secondary">
              FERRO.OS / workspace
            </span>
          </div>
          <div className="flex items-center gap-3">
            <StatusPanel />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex h-full flex-col justify-between gap-6">
            <DesktopIcons />
            <div className="flex items-end justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-white/10 bg-surface/70 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Mission</p>
                <p className="mt-2 max-w-md text-sm leading-7 text-secondary">
                  Explore the desktop, unlock the hidden signals, and begin shaping the operating system.
                </p>
              </motion.div>
              <Dock />
            </div>
          </div>
        </main>
      </div>

      <WindowManager />
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
