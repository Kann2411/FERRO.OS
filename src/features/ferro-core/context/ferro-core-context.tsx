"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CoreMessage, CoreNotification, ExplorerProfile, FerroCoreContextValue } from "@/features/ferro-core/types";

const STORAGE_KEY = "ferro.os.ferro-core";

const defaultProfile: ExplorerProfile = {
  name: "Explorer",
  progress: 0,
  modulesDiscovered: 0,
  discoveredModules: [],
  achievements: [],
  firstVisit: null,
  lastVisit: null,
  visitCount: 0,
  welcomeCompleted: false,
  missionProgress: {},
  explorationSeconds: 0,
  lastSavedAt: null,
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

const initialMissions = [
  { id: "explore-desktop", title: "Explore the desktop", description: "Survey the workspace and understand the environment.", reward: 5, prerequisite: null },
  { id: "open-first-module", title: "Open your first module", description: "Launch a module from the desktop to begin the journey.", reward: 8, prerequisite: "explore-desktop" },
  { id: "discover-projects", title: "Discover Projects", description: "Open the Projects module and inspect its contents.", reward: 7, prerequisite: "open-first-module" },
];

const FerroCoreContext = createContext<FerroCoreContextValue | undefined>(undefined);

export function FerroCoreProvider({ children }: { children: ReactNode }) {
  const [explorerProfile, setExplorerProfile] = useState<ExplorerProfile>(defaultProfile);
  const [initialized, setInitialized] = useState(false);
  const [missions] = useState(initialMissions);
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [notifications, setNotifications] = useState<CoreNotification[]>([]);

  useEffect(() => {
    const savedProfile = loadSavedProfile();
    const now = new Date().toISOString();

    setExplorerProfile({
      ...savedProfile,
      firstVisit: savedProfile.firstVisit ?? now,
      lastVisit: now,
      visitCount: savedProfile.firstVisit ? savedProfile.visitCount + 1 : 1,
    });
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized || messages.length > 0) {
      return;
    }

    setMessages([
      {
        id: "welcome-core",
        type: "welcome",
        title: "FERRO CORE online",
        body: "The system has begun to remember your first steps.",
      },
    ]);

    setNotifications([
      {
        id: "welcome-notification",
        type: "info",
        title: "System initialized",
        body: "FERRO CORE is now observing your exploration.",
      },
    ]);
  }, [initialized, messages.length]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    const timer = window.setInterval(() => {
      setExplorerProfile((current) => ({
        ...current,
        explorationSeconds: current.explorationSeconds + 1,
      }));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [initialized]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    try {
      const snapshot = {
        ...explorerProfile,
        lastSavedAt: new Date().toISOString(),
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
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

  const registerDiscovery = (moduleId?: string) => {
    setExplorerProfile((current) => {
      if (moduleId && current.discoveredModules.includes(moduleId)) {
        return current;
      }

      const nextDiscoveredModules = moduleId
        ? [...current.discoveredModules, moduleId]
        : current.discoveredModules;

      return {
        ...current,
        discoveredModules: nextDiscoveredModules,
        modulesDiscovered: nextDiscoveredModules.length,
      };
    });
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

  const completeWelcome = () => {
    setExplorerProfile((current) => ({
      ...current,
      welcomeCompleted: true,
    }));
  };

  const completeMission = (missionId: string) => {
    setExplorerProfile((current) => {
      if (current.missionProgress[missionId]) {
        return current;
      }

      return {
        ...current,
        missionProgress: {
          ...current.missionProgress,
          [missionId]: true,
        },
        progress: Math.min(100, current.progress + 5),
      };
    });
  };

  const unlockMission = (missionId: string) => {
    setExplorerProfile((current) => ({
      ...current,
      missionProgress: {
        ...current.missionProgress,
        [missionId]: current.missionProgress[missionId] ?? false,
      },
    }));
  };

  const pushMessage = (message: CoreMessage) => {
    setMessages((current) => [
      {
        ...message,
        id: message.id || `${message.type}-${Date.now()}`,
      },
      ...current,
    ].slice(0, 4));
  };

  const pushNotification = (notification: CoreNotification) => {
    setNotifications((current) => [
      {
        ...notification,
        id: notification.id || `notification-${Date.now()}`,
      },
      ...current,
    ].slice(0, 3));
  };

  const dismissNotification = (id: string) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id));
  };

  const value = useMemo<FerroCoreContextValue>(
    () => ({
      coreName: "FERRO CORE",
      logo: "╫",
      tagline: "The operating system's inner mind.",
      explorerProfile,
      initialized,
      missions,
      completedMissions: missions.filter((mission) => explorerProfile.missionProgress[mission.id]).map((mission) => mission.id),
      messages,
      notifications,
      setExplorerName,
      advanceProgress,
      registerDiscovery,
      awardAchievement,
      recordVisit,
      completeWelcome,
      completeMission,
      unlockMission,
      pushMessage,
      pushNotification,
      dismissNotification,
    }),
    [explorerProfile, initialized, missions, messages, notifications]
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
