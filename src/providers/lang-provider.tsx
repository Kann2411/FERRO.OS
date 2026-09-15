"use client";

import { useEffect } from "react";
import { useLangStore } from "@/store/lang-store";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useLangStore((state) => state.lang);

  useEffect(() => {
    useLangStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <>{children}</>;
}
