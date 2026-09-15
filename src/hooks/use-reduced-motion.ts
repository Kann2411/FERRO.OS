"use client";

import { useSyncExternalStore } from "react";
import { useAccessibilityStore } from "@/store/accessibility-store";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function useReducedMotion() {
  const systemPreference = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const preference = useAccessibilityStore((state) => state.reducedMotion);

  if (preference === "on") return true;
  if (preference === "off") return false;
  return systemPreference;
}
