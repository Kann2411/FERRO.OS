"use client";

import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleMode}
      className="rounded-full border border-white/10 bg-(--surface-strong) px-4 py-2 text-sm font-medium text-(--text-primary) transition hover:border-(--primary)/50"
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
    >
      {mode === "dark" ? "☀︎" : "☾"}
    </button>
  );
}
