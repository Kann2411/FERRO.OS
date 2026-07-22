"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { WindowContextValue, WindowDefinition, WindowInstance } from "@/features/window-system/types";

const WindowContext = createContext<WindowContextValue | undefined>(undefined);

const createWindowInstance = (definition: WindowDefinition, zIndex: number): WindowInstance => ({
  ...definition,
  state: "opening",
  x: definition.defaultPosition?.x ?? 160,
  y: definition.defaultPosition?.y ?? 120,
  width: definition.initialWidth,
  height: definition.initialHeight,
  zIndex,
  focused: false,
  draggable: true,
  closable: true,
});

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const openWindow = useCallback((definition: WindowDefinition) => {
    setWindows((currentWindows) => {
      if (currentWindows.some((window) => window.id === definition.id)) {
        return currentWindows.map((window) =>
          window.id === definition.id ? { ...window, focused: true, state: "active" } : window
        );
      }

      const nextZIndex = currentWindows.length + 1;
      const nextWindow = createWindowInstance(definition, nextZIndex);
      return [...currentWindows, { ...nextWindow, focused: true, state: "active" }];
    });

    setActiveWindowId(definition.id);
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((currentWindows) => currentWindows.filter((window) => window.id !== id));
    setActiveWindowId((currentValue) => (currentValue === id ? null : currentValue));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setActiveWindowId(id);
    setWindows((currentWindows) => {
      const maxZ = Math.max(0, ...currentWindows.map((window) => window.zIndex));
      return currentWindows.map((window) => ({
        ...window,
        focused: window.id === id,
        zIndex: window.id === id ? maxZ + 1 : window.zIndex,
        state: window.id === id ? "focused" : window.state,
      }));
    });
  }, []);

  const bringToFront = useCallback((id: string) => {
    setWindows((currentWindows) => {
      const maxZ = Math.max(0, ...currentWindows.map((window) => window.zIndex));
      return currentWindows.map((window) =>
        window.id === id
          ? { ...window, zIndex: maxZ + 1, focused: true, state: "focused" }
          : { ...window, focused: false }
      );
    });

    setActiveWindowId(id);
  }, []);

  const value = useMemo<WindowContextValue>(
    () => ({
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      focusWindow,
      bringToFront,
    }),
    [activeWindowId, bringToFront, closeWindow, focusWindow, openWindow, windows]
  );

  return <WindowContext.Provider value={value}>{children}</WindowContext.Provider>;
}

export function useWindowContext() {
  const context = useContext(WindowContext);

  if (!context) {
    throw new Error("useWindowContext must be used within a WindowProvider");
  }

  return context;
}
