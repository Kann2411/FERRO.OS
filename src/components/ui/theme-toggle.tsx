"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme();
  const { explorerProfile, registerHiddenDiscovery } = useFerroCore();
  const [toggleCount, setToggleCount] = useState(0);

  const handleToggle = () => {
    const nextCount = toggleCount + 1;
    setToggleCount(nextCount);
    toggleMode();

    if (nextCount >= 6 && !explorerProfile.discoveredHiddenFiles.includes("easter-egg-theme.txt")) {
      registerHiddenDiscovery("easter-egg-theme.txt");
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-full border border-white/10 bg-surface-strong px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/50"
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      aria-pressed={mode === "light"}
    >
      <span aria-hidden="true">{mode === "dark" ? "☀︎" : "☾"}</span>
    </button>
  );
}
