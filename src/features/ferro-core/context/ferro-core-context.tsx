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
import { getHiddenFileDefinition } from "@/features/hidden-files/utils/hidden-files";
import { useWallpaperStore } from "@/store/wallpaper-store";

const STORAGE_KEY = "ferro.os.ferro-core";

const defaultProfile: ExplorerProfile = {
  name: "Explorer",
  progress: 0,
  modulesDiscovered: 0,
  discoveredModules: [],
  unlockedModules: ["projects", "resume", "skills", "terminal"],
  discoveredHiddenFiles: [],
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
  const unlockWallpaper = useWallpaperStore((state) => state.unlockWallpaper);
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

    const missing = nextAchievements
      .map((achievement) => achievement.title)
      .filter((name) => !explorerProfile.achievements.includes(name));

    if (missing.length === 0) {
      return;
    }

    setHistory(() =>
      addHistoryEntry({
        id: generateUUID(),
        type: "achievement",
        label: missing[0],
        detail: "Achievement unlocked",
        timestamp: new Date().toISOString(),
      })
    );

    setExplorerProfile((current) => {
      const stillMissing = missing.filter((name) => !current.achievements.includes(name));
      if (stillMissing.length === 0) {
        return current;
      }

      return {
        ...current,
        achievements: [...current.achievements, ...stillMissing],
      };
    });
  }, [initialized, explorerProfile.progress, explorerProfile.modulesDiscovered, explorerProfile.discoveredModules, explorerProfile.missionProgress, explorerProfile.achievements]);

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

    setExplorerProfile((current) => ({
      ...current,
      progress: updateProgress(current.progress, amount),
    }));
  };

  const registerDiscovery = (moduleId?: string) => {
    if (moduleId && explorerProfile.discoveredModules.includes(moduleId)) {
      return;
    }

    const reward = getDiscoveryProgressReward(moduleId);
    const discoveryLabel = moduleId ? `${moduleId} discovered` : "New system discovery";
    const registered = registerDiscoveryRecord(undefined, discoveryLabel, "ferro-core");

    if (registered) {
      setDiscoveries(getDiscoveryRecords());
      setHistory(() =>
        addHistoryEntry({
          id: generateUUID(),
          type: "module",
          label: moduleId ?? "System event",
          detail: "Module discovered",
          timestamp: new Date().toISOString(),
        })
      );
    }

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
        progress: updateProgress(current.progress, reward),
      };
    });
  };

  const registerHiddenDiscovery = (fileId: string) => {
    if (explorerProfile.discoveredHiddenFiles.includes(fileId)) {
      return false;
    }

    const fileDefinition = getHiddenFileDefinition(fileId);
    const reward = fileDefinition?.reward ?? 3;
    const discoveryLabel = `${fileId} uncovered`;
    const registered = registerDiscoveryRecord(undefined, discoveryLabel, "hidden-files");

    if (registered) {
      setDiscoveries(getDiscoveryRecords());
      setHistory(() =>
        addHistoryEntry({
          id: generateUUID(),
          type: "event",
          label: discoveryLabel,
          detail: "Hidden file discovered",
          timestamp: new Date().toISOString(),
        })
      );
    }

    if (fileDefinition?.unlocksWallpaper) {
      unlockWallpaper(fileDefinition.unlocksWallpaper);
    }

    setExplorerProfile((current) => {
      if (current.discoveredHiddenFiles.includes(fileId)) {
        return current;
      }

      return {
        ...current,
        discoveredHiddenFiles: [...current.discoveredHiddenFiles, fileId],
        progress: updateProgress(current.progress, reward),
      };
    });

    return registered;
  };

  const awardAchievement = (achievement: string) => {
    if (explorerProfile.achievements.includes(achievement)) {
      return;
    }

    playSound("achievements", "unlock");

    setHistory(() =>
      addHistoryEntry({
        id: generateUUID(),
        type: "achievement",
        label: achievement,
        detail: "Achievement unlocked",
        timestamp: new Date().toISOString(),
      })
    );

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
    if (explorerProfile.missionProgress[missionId]) {
      return;
    }

    const missionDef = missionDefinitions.find((mission) => mission.id === missionId);
    const missionTitle = missionDef?.title ?? "Mission";

    setHistory(() =>
      addHistoryEntry({
        id: generateUUID(),
        type: "mission",
        label: missionTitle,
        detail: "Mission completed",
        timestamp: new Date().toISOString(),
      })
    );

    const shouldUnlockModule =
      missionDef?.unlocksModule && !explorerProfile.unlockedModules.includes(missionDef.unlocksModule);

    if (shouldUnlockModule && missionDef?.unlocksModule) {
      setHistory(() =>
        addHistoryEntry({
          id: generateUUID(),
          type: "module",
          label: missionDef.unlocksModule as string,
          detail: "Module unlocked",
          timestamp: new Date().toISOString(),
        })
      );
      setNotifications((current) => [
        {
          id: `unlock-${missionDef.unlocksModule}`,
          type: "success" as const,
          title: "Module unlocked",
          body: `${missionDef.unlocksModule} is now accessible.`,
        },
        ...current,
      ].slice(0, 3));
    }

    setExplorerProfile((current) => {
      if (current.missionProgress[missionId]) {
        return current;
      }

      const nextMissionProgress = {
        ...current.missionProgress,
        [missionId]: true,
      };

      const nextUnlockedModules =
        missionDef?.unlocksModule && !current.unlockedModules.includes(missionDef.unlocksModule)
          ? [...current.unlockedModules, missionDef.unlocksModule]
          : current.unlockedModules;

      return {
        ...current,
        missionProgress: nextMissionProgress,
        unlockedModules: nextUnlockedModules,
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

  const unlockModule = (moduleId: string) => {
    setExplorerProfile((current) => {
      if (current.unlockedModules.includes(moduleId)) {
        return current;
      }
      return {
        ...current,
        unlockedModules: [...current.unlockedModules, moduleId],
      };
    });
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

  useEffect(() => {
    if (!initialized || explorerProfile.progress < 100) {
      return;
    }

    if (explorerProfile.discoveredHiddenFiles.includes("final-message.txt")) {
      return;
    }

    const unlocked = registerHiddenDiscovery("final-message.txt");
    if (unlocked) {
      pushNotification({
        id: "final-message-unlocked",
        type: "success",
        title: "Final message unlocked",
        body: "FERRO CORE has prepared a closing message for reaching 100% exploration.",
      });
      pushMessage({
        id: "final-message",
        type: "info",
        title: "FERRO CORE final message",
        body: "A special closing note has been added to your hidden files.",
      } as CoreMessage);
    }
  }, [initialized, explorerProfile.progress, explorerProfile.discoveredHiddenFiles, registerHiddenDiscovery, pushNotification, pushMessage]);

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
      registerHiddenDiscovery,
      awardAchievement,
      recordVisit,
      completeWelcome,
      completeMission,
      unlockMission,
      unlockModule,
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
