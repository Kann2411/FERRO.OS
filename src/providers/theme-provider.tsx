"use client";

import { useEffect } from "react";
import { useThemeStore, getThemeTokens } from "@/store/theme-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useThemeStore((state) => state.mode);

  useEffect(() => {
    const root = document.documentElement;
    const tokens = getThemeTokens(mode);

    root.style.setProperty("--background", tokens.background);
    root.style.setProperty("--surface", tokens.surface);
    root.style.setProperty("--surface-strong", tokens.surfaceStrong);
    root.style.setProperty("--surface-2", tokens.surface2);
    root.style.setProperty("--surface-3", tokens.surface3);
    root.style.setProperty("--primary", tokens.primary);
    root.style.setProperty("--text-primary", tokens.textPrimary);
    root.style.setProperty("--text-secondary", tokens.textSecondary);
    root.style.setProperty("--muted", tokens.muted);
    root.style.setProperty("--subtle", tokens.subtle);
    root.style.setProperty("--signal", tokens.signal);
    root.style.setProperty("--signal-foreground", tokens.signalForeground);
    root.style.setProperty("--border", tokens.border);
    root.style.setProperty("--border-strong", tokens.borderStrong);
    root.style.setProperty("--success", tokens.success);
    root.style.setProperty("--warning", tokens.warning);
    root.style.setProperty("--error", tokens.error);
  }, [mode]);

  return <>{children}</>;
}
