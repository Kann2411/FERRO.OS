"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAudio } from "@/features/audio-engine";
import type { CoreMessage, CoreNotification, ExplorerProfile, FerroCoreContextValue } from "@/features/ferro-core/types";
import { clearExplorerProfileSnapshot, loadExplorerProfileSnapshot, migrateExplorerProfileSnapshot, saveExplorerProfileSnapshot } from "@/features/ferro-core/utils/explorer-profile-storage";
import { getDiscoveryProgressReward, updateProgress } from "@/features/ferro-core/utils/explorer-progress";
import { clearDiscoveryRegistry, getDiscoveryRecords, registerDiscoveryRecord } from "@/features/ferro-core/utils/discovery-registry";
import { generateUUID } from "@/lib/uuid";
import { evaluateAchievements } from "@/features/ferro-core/utils/achievement-system";
import { getActiveMission, missionDefinitions } from "@/features/ferro-core/utils/mission-system";
import { addHistoryEntry, clearHistoryEntries, getHistoryEntries } from "@/features/ferro-core/utils/history-log";

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
  const sessionProfile = loadExplorerProfileSnapshot(defaultProfile);
  if (sessionProfile !== defaultProfile) {
    return sessionProfile;
  }

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

    return migrateExplorerProfileSnapshot(parsed, defaultProfile);
  } catch {
    return defaultProfile;
  }
};

const initialMissions = missionDefinitions;

const FerroCoreContext = createContext<FerroCoreContextValue | undefined>(undefined);

export function FerroCoreProvider({ children }: { children: ReactNode }) {
  const { playSound } = useAudio();
  const [explorerProfile, setExplorerProfile] = useState<ExplorerProfile>(defaultProfile);
  const [initialized, setInitialized] = useState(false);
  const [missions] = useState(initialMissions);
  const activeMission = getActiveMission(explorerProfile.missionProgress);
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [notifications, setNotifications] = useState<CoreNotification[]>([]);
  const [discoveries, setDiscoveries] = useState(getDiscoveryRecords);
  const [history, setHistory] = useState(getHistoryEntries);

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

    const nextAchievements = evaluateAchievements({
      progress: explorerProfile.progress,
      modulesDiscovered: explorerProfile.modulesDiscovered,
      discoveredModules: explorerProfile.discoveredModules,
      completedMissions: Object.values(explorerProfile.missionProgress).filter(Boolean).length,
    });

    const achievementNames = nextAchievements.map((achievement) => achievement.title);

    setExplorerProfile((current) => {
      const missing = achievementNames.filter((name) => !current.achievements.includes(name));
      if (missing.length === 0) {
        return current;
      }

      const nextAchievements = [...current.achievements, ...missing];

      if (missing.length > 0) {
        setHistory((currentHistory) => {
          const next = addHistoryEntry({
            id: generateUUID(),
            type: "achievement",
            label: missing[0],
            detail: "Achievement unlocked",
            timestamp: new Date().toISOString(),
          });
          return next;
        });
      }

      return {
        ...current,
        achievements: nextAchievements,
      };
    });
  }, [initialized, explorerProfile.progress, explorerProfile.modulesDiscovered, explorerProfile.discoveredModules, explorerProfile.missionProgress]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    try {
      const snapshot = {
        ...explorerProfile,
        lastSavedAt: new Date().toISOString(),
      };

      saveExplorerProfileSnapshot(snapshot);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    } catch {
      // ignore storage write errors
    }
  }, [initialized, explorerProfile]);

  const setExplorerName = (name: string) => {
    setExplorerProfile((current) => ({ ...current, name }));
  };

  const advanceProgress = (amount: number) => {
    setExplorerProfile((current) => {
      const nextProgress = updateProgress(current.progress, amount);

      if (amount > 0) {
        setHistory(() =>
          addHistoryEntry({
            id: generateUUID(),
            type: "progress",
            label: "Progress update",
            detail: `Exploration advanced by ${amount}%`,
            timestamp: new Date().toISOString(),
          })
        );
      }

      return {
        ...current,
        progress: nextProgress,
      };
    });
  };

  const registerDiscovery = (moduleId?: string) => {
    setExplorerProfile((current) => {
      if (moduleId && current.discoveredModules.includes(moduleId)) {
        return current;
      }

      const nextDiscoveredModules = moduleId
        ? [...current.discoveredModules, moduleId]
        : current.discoveredModules;

      const reward = getDiscoveryProgressReward(moduleId);
      const discoveryLabel = moduleId ? `${moduleId} discovered` : "New system discovery";
      const registered = registerDiscoveryRecord(undefined, discoveryLabel, "ferro-core");

      if (registered) {
        setDiscoveries(getDiscoveryRecords());
        setHistory((current) => {
          const next = addHistoryEntry({
            id: generateUUID(),
            type: "module",
            label: moduleId ?? "System event",
            detail: "Module discovered",
            timestamp: new Date().toISOString(),
          });
          return next;
        });
      }

      return {
        ...current,
        discoveredModules: nextDiscoveredModules,
        modulesDiscovered: nextDiscoveredModules.length,
        progress: updateProgress(current.progress, reward),
      };
    });
  };

  const awardAchievement = (achievement: string) => {
    playSound("achievements", "unlock");

    setExplorerProfile((current) => {
      if (current.achievements.includes(achievement)) {
        return current;
      }

      setHistory(() =>
        addHistoryEntry({
          id: generateUUID(),
          type: "achievement",
          label: achievement,
          detail: "Achievement unlocked",
          timestamp: new Date().toISOString(),
        })
      );

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

      const missionTitle = missionDefinitions.find((mission) => mission.id === missionId)?.title ?? "Mission";

      setHistory(() =>
        addHistoryEntry({
          id: generateUUID(),
          type: "mission",
          label: missionTitle,
          detail: "Mission completed",
          timestamp: new Date().toISOString(),
        })
      );

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

  const resetFlow = () => {
    setExplorerProfile({
      ...defaultProfile,
      firstVisit: null,
      lastVisit: null,
      visitCount: 0,
    });
    setMessages([]);
    setNotifications([]);
    setDiscoveries([]);
    setHistory([]);
    clearDiscoveryRegistry();
    clearHistoryEntries();

    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage cleanup errors
    }

    clearExplorerProfileSnapshot();
  };

  const pushMessage = (message: CoreMessage) => {
    playSound("notifications", "message");

    setMessages((current) => [
      {
        ...message,
        id: message.id || generateUUID(),
      },
      ...current,
    ].slice(0, 4));
  };

  const pushNotification = (notification: CoreNotification) => {
    playSound("notifications", "receive");

    setNotifications((current) => [
      {
        ...notification,
        id: notification.id || generateUUID(),
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
      discoveries,
      history,
      activeMission,
      setExplorerName,
      advanceProgress,
      registerDiscovery,
      awardAchievement,
      recordVisit,
      completeWelcome,
      completeMission,
      unlockMission,
      resetFlow,
      pushMessage,
      pushNotification,
      dismissNotification,
    }),
    [explorerProfile, initialized, missions, messages, notifications, discoveries, history, activeMission]
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
