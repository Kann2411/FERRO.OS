"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AccessibilityPreference = "system" | "on" | "off";

export const ACCESSIBILITY_STORAGE_KEY = "ferro-os-accessibility";

interface AccessibilityState {
  reducedMotion: AccessibilityPreference;
  highContrast: AccessibilityPreference;
  setReducedMotion: (value: AccessibilityPreference) => void;
  setHighContrast: (value: AccessibilityPreference) => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      reducedMotion: "system",
      highContrast: "system",
      setReducedMotion: (value) => set({ reducedMotion: value }),
      setHighContrast: (value) => set({ highContrast: value }),
    }),
    {
      name: ACCESSIBILITY_STORAGE_KEY,
      skipHydration: true,
      partialize: (state) => ({ reducedMotion: state.reducedMotion, highContrast: state.highContrast }),
    }
  )
);
