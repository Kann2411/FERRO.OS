"use client";

import { useEffect } from "react";
import { useWindowContext } from "@/features/window-system/context/window-context";
import { windowRegistry } from "@/features/window-system/registry";

export function useWindowManager() {
  const { windows, initialized, openWindow, focusWindow } = useWindowContext();

  useEffect(() => {
    if (!initialized) {
      return;
    }

    if (windows.length > 0) {
      return;
    }

    const firstDefinition = windowRegistry.desktop;
    if (firstDefinition) {
      openWindow(firstDefinition);
      focusWindow(firstDefinition.id);
    }
  }, [focusWindow, initialized, openWindow, windows]);

  return { openWindow };
}
