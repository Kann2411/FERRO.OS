import { windowRegistry } from "@/features/window-system/registry";
import type { WindowDefinition } from "@/features/window-system/types";
import { windowTitles } from "@/lib/i18n/ui";
import type { Lang } from "@/lib/i18n/types";

export function resolveWindowDefinition(windowId: string, lang: Lang = "es"): WindowDefinition | null {
  const definition = windowRegistry[windowId];
  if (!definition) {
    return null;
  }

  const translatedTitle = windowTitles[windowId]?.[lang];
  return translatedTitle ? { ...definition, title: translatedTitle } : definition;
}
