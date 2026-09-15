"use client";

import { useEffect } from "react";
import { useAccessibilityStore } from "@/store/accessibility-store";

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useAccessibilityStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}
