"use client";

import { useThemeStore } from "@/store/theme-store";

export function useTheme() {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const setMode = useThemeStore((state) => state.setMode);

  return { mode, toggleMode, setMode };
}
