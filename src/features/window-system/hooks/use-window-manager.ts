"use client";

import { useWindowContext } from "@/features/window-system/context/window-context";

export function useWindowManager() {
  const { openWindow } = useWindowContext();

  return { openWindow };
}
