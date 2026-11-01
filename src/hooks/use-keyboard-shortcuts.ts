"use client";

import { useEffect } from "react";
import { useWindowContext } from "@/features/window-system/context/window-context";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
}

export function useKeyboardShortcuts() {
  const { activeWindowId, closeWindow, toggleWindowMinimize, toggleWindowMaximize } = useWindowContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!activeWindowId || isTypingTarget(event.target)) {
        return;
      }

      const modifier = event.metaKey || event.ctrlKey;
      const key = event.key.toLowerCase();

      if (modifier && key === "w") {
        event.preventDefault();
        closeWindow(activeWindowId);
        return;
      }

      if (modifier && key === "m") {
        event.preventDefault();
        toggleWindowMinimize(activeWindowId);
        return;
      }

      if (modifier && event.shiftKey && key === "f") {
        event.preventDefault();
        toggleWindowMaximize(activeWindowId);
        return;
      }

      if (event.key === "Escape") {
        closeWindow(activeWindowId);
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, [activeWindowId, closeWindow, toggleWindowMinimize, toggleWindowMaximize]);
}
