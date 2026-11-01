"use client";

import { useLangStore } from "@/store/lang-store";
import { ui, type UiKey } from "@/lib/i18n/ui";
import type { Bilingual, Lang } from "@/lib/i18n/types";

export function useLang(): Lang {
  return useLangStore((state) => state.lang);
}

export function useToggleLang() {
  return useLangStore((state) => state.toggleLang);
}

export function useSetLang() {
  return useLangStore((state) => state.setLang);
}

/** Resolves domain-content bilingual pairs, e.g. `t(mission.title)`. */
export function useT() {
  const lang = useLang();
  return function t<T>(pair: Bilingual<T>): T {
    return pair[lang];
  };
}

/** Resolves short UI chrome strings from the shared dictionary, e.g. `tUi("settings")`. */
export function useUi() {
  const lang = useLang();
  return function tUi(key: UiKey): string {
    return ui[key][lang];
  };
}
