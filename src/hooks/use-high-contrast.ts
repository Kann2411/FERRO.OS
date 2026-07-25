"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-contrast: high)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(prefers-contrast: high)").matches;
}

function getServerSnapshot() {
  return false;
}

export function useHighContrast() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
