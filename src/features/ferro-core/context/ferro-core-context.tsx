"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { ExplorerProfile, FerroCoreContextValue } from "@/features/ferro-core/types";

const STORAGE_KEY = "ferro.os.ferro-core";

const defaultProfile: ExplorerProfile = {
  name: "Explorer",
  progress: 0,
  modulesDiscovered: 0,
  achievements: [],
  firstVisit: null,
  lastVisit: null,
  visitCount: 0,
};

const loadSavedProfile = (): ExplorerProfile => {
  if (typeof window === "undefined") {
    return defaultProfile;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultProfile;
    }

    const parsed = JSON.parse(raw) as Partial<ExplorerProfile> | null;
    if (!parsed) {
      return defaultProfile;
    }

    return {
      ...defaultProfile,
      ...parsed,
    };
  } catch {
    return defaultProfile;
  }
};

const FerroCoreContext = createContext<FerroCoreContextValue | undefined>(undefined);

export function FerroCoreProvider({ children }: { children: ReactNode }) {
  const [explorerProfile, setExplorerProfile] = useState<ExplorerProfile>(defaultProfile);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedProfile = loadSavedProfile();
    setExplorerProfile(savedProfile);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(explorerProfile));
    } catch {
      // ignore localStorage write errors
    }
  }, [initialized, explorerProfile]);

  const setExplorerName = (name: string) => {
    setExplorerProfile((current) => ({ ...current, name }));
  };

  const advanceProgress = (amount: number) => {
    setExplorerProfile((current) => ({
      ...current,
      progress: Math.min(100, Math.max(0, current.progress + amount)),
    }));
  };

  const registerDiscovery = () => {
    setExplorerProfile((current) => ({
      ...current,
      modulesDiscovered: current.modulesDiscovered + 1,
    }));
  };

  const awardAchievement = (achievement: string) => {
    setExplorerProfile((current) => {
      if (current.achievements.includes(achievement)) {
        return current;
      }
      return {
        ...current,
        achievements: [...current.achievements, achievement],
      };
    });
  };

  const recordVisit = () => {
    const now = new Date().toISOString();
    setExplorerProfile((current) => ({
      ...current,
      firstVisit: current.firstVisit ?? now,
      lastVisit: now,
      visitCount: current.visitCount + 1,
    }));
  };

  const value = useMemo<FerroCoreContextValue>(
    () => ({
      coreName: "FERRO CORE",
      logo: "╫",
      tagline: "The operating system's inner mind.",
      explorerProfile,
      initialized,
      setExplorerName,
      advanceProgress,
      registerDiscovery,
      awardAchievement,
      recordVisit,
    }),
    [explorerProfile, initialized]
  );

  return <FerroCoreContext.Provider value={value}>{children}</FerroCoreContext.Provider>;
}

export function useFerroCore() {
  const context = useContext(FerroCoreContext);
  if (!context) {
    throw new Error("useFerroCore must be used within FerroCoreProvider");
  }
  return context;
}
