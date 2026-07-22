"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { THEME_STORAGE_KEY, themeTokens, type ThemeMode } from "@/lib/theme";

interface ThemeStoreState {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStoreState>()(
  persist(
    (set) => ({
      mode: "dark",
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === "dark" ? "light" : "dark",
        })),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: THEME_STORAGE_KEY,
      partialize: (state) => ({ mode: state.mode }),
    }
  )
);

export const getThemeTokens = (mode: ThemeMode) => themeTokens[mode];
