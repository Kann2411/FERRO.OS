"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/hooks/use-theme";
import { useUi } from "@/hooks/use-lang";
import { Panel } from "@/components/ui/panel";

export function ThemeSection() {
  const { mode } = useTheme();
  const tUi = useUi();

  return (
    <Panel tone="surface" size="lg" elevated>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("themeSectionKicker")}</p>
          <h2 className="mt-3 text-lg font-semibold text-white">{tUi("themeSectionTitle")}</h2>
          <p className="mt-2 text-sm leading-6 text-secondary">
            {mode === "dark" ? tUi("themeDarkActive") : tUi("themeLightActive")}
          </p>
        </div>
        <ThemeToggle />
      </div>
    </Panel>
  );
}
