"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAudio } from "@/features/audio-engine";
import type { WindowContextValue, WindowDefinition, WindowInstance } from "@/features/window-system/types";

const STORAGE_KEY = "ferro.os.window-state";

const loadSavedWindowState = () => {
  if (typeof window === "undefined") {
    return { windows: [] as WindowInstance[], activeWindowId: null as string | null };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { windows: [] as WindowInstance[], activeWindowId: null as string | null };
    }

    const parsed = JSON.parse(raw) as { windows?: WindowInstance[]; activeWindowId?: string | null };
    if (!parsed || !Array.isArray(parsed.windows)) {
      return { windows: [] as WindowInstance[], activeWindowId: null as string | null };
    }

    const activeWindowId = parsed.activeWindowId ?? null;
    const windows = parsed.windows.map((window) => ({
      ...window,
      focused: window.id === activeWindowId,
    }));

    return {
      windows,
      activeWindowId,
    };
  } catch {
    return { windows: [] as WindowInstance[], activeWindowId: null as string | null };
  }
};

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
  isMinimized: false,
  isMaximized: false,
  previousBounds: null,
});

export function WindowProvider({ children }: { children: ReactNode }) {
  const { playSound } = useAudio();
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedState = loadSavedWindowState();
    setWindows(savedState.windows);
    setActiveWindowId(savedState.activeWindowId);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    try {
      const payload = JSON.stringify({ windows, activeWindowId });
      window.localStorage.setItem(STORAGE_KEY, payload);
    } catch {
      // ignore write failures
    }
  }, [initialized, windows, activeWindowId]);

  const openWindow = useCallback((definition: WindowDefinition) => {
    playSound("ui", "open");

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
  }, [playSound]);

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

  const resetWindowState = useCallback(() => {
    setWindows([]);
    setActiveWindowId(null);

    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage cleanup errors
    }
  }, []);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((currentWindows) =>
      currentWindows.map((window) => (window.id === id ? { ...window, x: position.x, y: position.y } : window))
    );
  }, []);

  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows((currentWindows) =>
      currentWindows.map((window) => (window.id === id ? { ...window, width: size.width, height: size.height } : window))
    );
  }, []);

  const toggleWindowMinimize = useCallback((id: string) => {
    setWindows((currentWindows) =>
      currentWindows.map((window) => {
        if (window.id !== id) {
          return window;
        }

        if (window.isMinimized) {
          const previousBounds = window.previousBounds ?? { x: window.x, y: window.y, width: window.width, height: window.height };
          return {
            ...window,
            state: "active",
            isMinimized: false,
            isMaximized: false,
            previousBounds: null,
            x: previousBounds.x,
            y: previousBounds.y,
            width: previousBounds.width,
            height: previousBounds.height,
            focused: true,
          };
        }

        const nextBounds = {
          x: window.x,
          y: window.y,
          width: window.width,
          height: window.height,
        };

        return {
          ...window,
          state: "minimized",
          isMinimized: true,
          isMaximized: false,
          previousBounds: nextBounds,
          height: 44,
          focused: false,
        };
      })
    );
  }, []);

  const toggleWindowMaximize = useCallback((id: string) => {
    setWindows((currentWindows) =>
      currentWindows.map((window) => {
        if (window.id !== id) {
          return window;
        }

        if (window.isMaximized) {
          const previousBounds = window.previousBounds ?? { x: window.x, y: window.y, width: window.width, height: window.height };
          return {
            ...window,
            state: "active",
            isMaximized: false,
            isMinimized: false,
            previousBounds: null,
            x: previousBounds.x,
            y: previousBounds.y,
            width: previousBounds.width,
            height: previousBounds.height,
            focused: true,
          };
        }

        const nextBounds = {
          x: window.x,
          y: window.y,
          width: window.width,
          height: window.height,
        };

        const viewportWidth = typeof globalThis.window !== "undefined" ? globalThis.window.innerWidth : 1280;
        const viewportHeight = typeof globalThis.window !== "undefined" ? globalThis.window.innerHeight : 900;

        return {
          ...window,
          state: "maximized",
          isMaximized: true,
          isMinimized: false,
          previousBounds: nextBounds,
          x: 24,
          y: 24,
          width: Math.max(320, viewportWidth - 48),
          height: Math.max(280, viewportHeight - 80),
          focused: true,
        };
      })
    );
  }, []);

  const value = useMemo<WindowContextValue>(
    () => ({
      windows,
      activeWindowId,
      initialized,
      openWindow,
      closeWindow,
      focusWindow,
      bringToFront,
      resetWindowState,
      updateWindowPosition,
      updateWindowSize,
      toggleWindowMinimize,
      toggleWindowMaximize,
    }),
    [activeWindowId, bringToFront, closeWindow, focusWindow, initialized, openWindow, toggleWindowMaximize, toggleWindowMinimize, updateWindowPosition, windows]
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
