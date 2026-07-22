"use client";

import { useEffect } from "react";
import { useWindowContext } from "@/features/window-system/context/window-context";
import { windowRegistry } from "@/features/window-system/registry";

export function useWindowManager() {
  const { openWindow, focusWindow } = useWindowContext();

  useEffect(() => {
    const firstDefinition = windowRegistry.desktop;
    if (firstDefinition) {
      openWindow(firstDefinition);
      focusWindow(firstDefinition.id);
    }
  }, [focusWindow, openWindow]);

  return { openWindow };
}
