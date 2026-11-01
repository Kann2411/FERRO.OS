"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang } from "@/lib/i18n/types";

export const LANG_STORAGE_KEY = "ferro-os-lang";

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: "es",
      setLang: (lang) => set({ lang }),
      toggleLang: () => set((state) => ({ lang: state.lang === "es" ? "en" : "es" })),
    }),
    {
      name: LANG_STORAGE_KEY,
      skipHydration: true,
      partialize: (state) => ({ lang: state.lang }),
    }
  )
);
