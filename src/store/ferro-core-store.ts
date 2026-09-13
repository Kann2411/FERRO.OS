"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CoreMessage,
  CoreNotification,
  DiscoveryRecord,
  ExplorerHistoryEntry,
  ExplorerProfile,
  MissionDefinition,
} from "@/features/ferro-core/types";
import { missionDefinitions } from "@/features/ferro-core/utils/mission-system";
import { evaluateAchievements } from "@/features/ferro-core/utils/achievement-system";
import { getDiscoveryProgressReward, updateProgress } from "@/features/ferro-core/utils/explorer-progress";
import { getHiddenFileDefinition } from "@/features/hidden-files/utils/hidden-files";
import { useWallpaperStore } from "@/store/wallpaper-store";
import { generateUUID } from "@/lib/uuid";
import type { AudioCategory } from "@/features/audio-engine/types";

export const FERRO_CORE_STORAGE_KEY = "ferro-os-explorer-profile";
const LEGACY_PROFILE_KEY = "ferro.os.ferro-core";

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

function readLegacyProfile(): Partial<ExplorerProfile> | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(LEGACY_PROFILE_KEY);
    return raw ? (JSON.parse(raw) as Partial<ExplorerProfile>) : null;
  } catch {
    return null;
  }
}

function addEntry<T extends { id: string }>(list: T[], entry: T, limit?: number) {
  const next = [...list, entry].sort((a, b) =>
    "timestamp" in a && "timestamp" in b
      ? String((a as unknown as { timestamp: string }).timestamp).localeCompare(
          String((b as unknown as { timestamp: string }).timestamp)
        )
      : 0
  );
  return typeof limit === "number" ? next.slice(-limit) : next;
}

interface FerroCoreState {
  explorerProfile: ExplorerProfile;
  initialized: boolean;
  missions: MissionDefinition[];
  messages: CoreMessage[];
  notifications: CoreNotification[];
  discoveries: DiscoveryRecord[];
  history: ExplorerHistoryEntry[];
  onSound: ((category: AudioCategory, name: string) => void) | null;
  setSoundBridge: (playSound: (category: AudioCategory, name: string) => void) => void;
  initializeSession: () => void;
  tick: () => void;
  setExplorerName: (name: string) => void;
  advanceProgress: (amount: number) => void;
  registerDiscovery: (moduleId?: string) => void;
  registerHiddenDiscovery: (fileId: string) => boolean;
  awardAchievement: (achievement: string) => void;
  recordVisit: () => void;
  completeWelcome: () => void;
  completeMission: (missionId: string) => void;
  unlockMission: (missionId: string) => void;
  unlockModule: (moduleId: string) => void;
  resetFlow: () => void;
  pushMessage: (message: CoreMessage) => void;
  pushNotification: (notification: CoreNotification) => void;
  dismissNotification: (id: string) => void;
}

export const useFerroCoreStore = create<FerroCoreState>()(
  persist(
    (set, get) => {
      function playSound(category: AudioCategory, name: string) {
        get().onSound?.(category, name);
      }

      function checkDerivedEffects() {
        const state = get();
        const profile = state.explorerProfile;

        const unlockedAchievements = evaluateAchievements({
          progress: profile.progress,
          modulesDiscovered: profile.modulesDiscovered,
          discoveredModules: profile.discoveredModules,
          completedMissions: Object.values(profile.missionProgress).filter(Boolean).length,
        });

        const missingTitles = unlockedAchievements
          .map((achievement) => achievement.title)
          .filter((title) => !profile.achievements.includes(title));

        if (missingTitles.length > 0) {
          set((current) => ({
            explorerProfile: {
              ...current.explorerProfile,
              achievements: [...current.explorerProfile.achievements, ...missingTitles],
            },
            history: addEntry(current.history, {
              id: generateUUID(),
              type: "achievement",
              label: missingTitles[0],
              detail: "Achievement unlocked",
              timestamp: new Date().toISOString(),
            }),
          }));
        }

        if (profile.progress >= 100 && !profile.discoveredHiddenFiles.includes("final-message.txt")) {
          const unlocked = get().registerHiddenDiscovery("final-message.txt");
          if (unlocked) {
            get().pushNotification({
              id: "final-message-unlocked",
              type: "success",
              title: "Final message unlocked",
              body: "FERRO CORE has prepared a closing message for reaching 100% exploration.",
            });
            get().pushMessage({
              id: "final-message",
              type: "info",
              title: "FERRO CORE final message",
              body: "A special closing note has been added to your hidden files.",
            });
          }
        }
      }

      return {
        explorerProfile: defaultProfile,
        initialized: false,
        missions: missionDefinitions,
        messages: [],
        notifications: [],
        discoveries: [],
        history: [],
        onSound: null,

        setSoundBridge: (bridge) => set({ onSound: bridge }),

        initializeSession: () => {
          if (get().initialized) {
            return;
          }

          const now = new Date().toISOString();
          set((current) => ({
            explorerProfile: {
              ...current.explorerProfile,
              firstVisit: current.explorerProfile.firstVisit ?? now,
              lastVisit: now,
              visitCount: current.explorerProfile.firstVisit
                ? current.explorerProfile.visitCount + 1
                : 1,
            },
            initialized: true,
            messages:
              current.messages.length > 0
                ? current.messages
                : [
                    {
                      id: "welcome-core",
                      type: "welcome",
                      title: "FERRO CORE online",
                      body: "The system has begun to remember your first steps.",
                    },
                  ],
            notifications:
              current.notifications.length > 0
                ? current.notifications
                : [
                    {
                      id: "welcome-notification",
                      type: "info",
                      title: "System initialized",
                      body: "FERRO CORE is now observing your exploration.",
                    },
                  ],
          }));
        },

        tick: () => {
          set((current) => ({
            explorerProfile: {
              ...current.explorerProfile,
              explorationSeconds: current.explorerProfile.explorationSeconds + 1,
            },
          }));
        },

        setExplorerName: (name) => {
          set((current) => ({ explorerProfile: { ...current.explorerProfile, name } }));
        },

        advanceProgress: (amount) => {
          if (amount > 0) {
            set((current) => ({
              history: addEntry(current.history, {
                id: generateUUID(),
                type: "progress",
                label: "Progress update",
                detail: `Exploration advanced by ${amount}%`,
                timestamp: new Date().toISOString(),
              }),
            }));
          }

          set((current) => ({
            explorerProfile: {
              ...current.explorerProfile,
              progress: updateProgress(current.explorerProfile.progress, amount),
            },
          }));

          checkDerivedEffects();
        },

        registerDiscovery: (moduleId) => {
          const current = get().explorerProfile;
          if (moduleId && current.discoveredModules.includes(moduleId)) {
            return;
          }

          const reward = getDiscoveryProgressReward(moduleId);
          const discoveryLabel = moduleId ? `${moduleId} discovered` : "New system discovery";

          set((state) => ({
            discoveries: addEntry(state.discoveries, {
              id: generateUUID(),
              label: discoveryLabel,
              source: "ferro-core",
              timestamp: new Date().toISOString(),
            }),
            history: addEntry(state.history, {
              id: generateUUID(),
              type: "module",
              label: moduleId ?? "System event",
              detail: "Module discovered",
              timestamp: new Date().toISOString(),
            }),
          }));

          set((state) => {
            if (moduleId && state.explorerProfile.discoveredModules.includes(moduleId)) {
              return state;
            }

            const nextDiscoveredModules = moduleId
              ? [...state.explorerProfile.discoveredModules, moduleId]
              : state.explorerProfile.discoveredModules;

            return {
              explorerProfile: {
                ...state.explorerProfile,
                discoveredModules: nextDiscoveredModules,
                modulesDiscovered: nextDiscoveredModules.length,
                progress: updateProgress(state.explorerProfile.progress, reward),
              },
            };
          });

          checkDerivedEffects();
        },

        registerHiddenDiscovery: (fileId) => {
          if (get().explorerProfile.discoveredHiddenFiles.includes(fileId)) {
            return false;
          }

          const fileDefinition = getHiddenFileDefinition(fileId);
          const reward = fileDefinition?.reward ?? 3;
          const discoveryLabel = `${fileId} uncovered`;

          set((state) => ({
            discoveries: addEntry(state.discoveries, {
              id: generateUUID(),
              label: discoveryLabel,
              source: "hidden-files",
              timestamp: new Date().toISOString(),
            }),
            history: addEntry(state.history, {
              id: generateUUID(),
              type: "event",
              label: discoveryLabel,
              detail: "Hidden file discovered",
              timestamp: new Date().toISOString(),
            }),
          }));

          if (fileDefinition?.unlocksWallpaper) {
            useWallpaperStore.getState().unlockWallpaper(fileDefinition.unlocksWallpaper);
          }

          set((state) => {
            if (state.explorerProfile.discoveredHiddenFiles.includes(fileId)) {
              return state;
            }

            return {
              explorerProfile: {
                ...state.explorerProfile,
                discoveredHiddenFiles: [...state.explorerProfile.discoveredHiddenFiles, fileId],
                progress: updateProgress(state.explorerProfile.progress, reward),
              },
            };
          });

          checkDerivedEffects();

          return true;
        },

        awardAchievement: (achievement) => {
          if (get().explorerProfile.achievements.includes(achievement)) {
            return;
          }

          playSound("achievements", "unlock");

          set((state) => ({
            history: addEntry(state.history, {
              id: generateUUID(),
              type: "achievement",
              label: achievement,
              detail: "Achievement unlocked",
              timestamp: new Date().toISOString(),
            }),
          }));

          set((state) => {
            if (state.explorerProfile.achievements.includes(achievement)) {
              return state;
            }
            return {
              explorerProfile: {
                ...state.explorerProfile,
                achievements: [...state.explorerProfile.achievements, achievement],
              },
            };
          });
        },

        recordVisit: () => {
          const now = new Date().toISOString();
          set((current) => ({
            explorerProfile: {
              ...current.explorerProfile,
              firstVisit: current.explorerProfile.firstVisit ?? now,
              lastVisit: now,
              visitCount: current.explorerProfile.visitCount + 1,
            },
          }));
        },

        completeWelcome: () => {
          set((current) => ({
            explorerProfile: { ...current.explorerProfile, welcomeCompleted: true },
          }));
        },

        completeMission: (missionId) => {
          const current = get().explorerProfile;
          if (current.missionProgress[missionId]) {
            return;
          }

          const missionDef = missionDefinitions.find((mission) => mission.id === missionId);
          if (!missionDef) {
            return;
          }

          set((state) => ({
            history: addEntry(state.history, {
              id: generateUUID(),
              type: "mission",
              label: missionDef.title,
              detail: "Mission completed",
              timestamp: new Date().toISOString(),
            }),
          }));

          const shouldUnlockModule =
            missionDef.unlocksModule && !current.unlockedModules.includes(missionDef.unlocksModule);

          if (shouldUnlockModule && missionDef.unlocksModule) {
            set((state) => ({
              history: addEntry(state.history, {
                id: generateUUID(),
                type: "module",
                label: missionDef.unlocksModule as string,
                detail: "Module unlocked",
                timestamp: new Date().toISOString(),
              }),
              notifications: [
                {
                  id: `unlock-${missionDef.unlocksModule}`,
                  type: "success" as const,
                  title: "Module unlocked",
                  body: `${missionDef.unlocksModule} is now accessible.`,
                },
                ...state.notifications,
              ].slice(0, 3),
            }));
          }

          set((state) => {
            if (state.explorerProfile.missionProgress[missionId]) {
              return state;
            }

            const nextMissionProgress = { ...state.explorerProfile.missionProgress, [missionId]: true };
            const nextUnlockedModules =
              missionDef.unlocksModule && !state.explorerProfile.unlockedModules.includes(missionDef.unlocksModule)
                ? [...state.explorerProfile.unlockedModules, missionDef.unlocksModule]
                : state.explorerProfile.unlockedModules;

            return {
              explorerProfile: {
                ...state.explorerProfile,
                missionProgress: nextMissionProgress,
                unlockedModules: nextUnlockedModules,
                progress: Math.min(100, state.explorerProfile.progress + missionDef.reward),
              },
            };
          });

          checkDerivedEffects();
        },

        unlockMission: (missionId) => {
          set((current) => ({
            explorerProfile: {
              ...current.explorerProfile,
              missionProgress: {
                ...current.explorerProfile.missionProgress,
                [missionId]: current.explorerProfile.missionProgress[missionId] ?? false,
              },
            },
          }));
        },

        unlockModule: (moduleId) => {
          set((current) => {
            if (current.explorerProfile.unlockedModules.includes(moduleId)) {
              return current;
            }
            return {
              explorerProfile: {
                ...current.explorerProfile,
                unlockedModules: [...current.explorerProfile.unlockedModules, moduleId],
              },
            };
          });
        },

        resetFlow: () => {
          set({
            explorerProfile: { ...defaultProfile, firstVisit: null, lastVisit: null, visitCount: 0 },
            initialized: false,
            messages: [],
            notifications: [],
            discoveries: [],
            history: [],
          });

          if (typeof window !== "undefined") {
            try {
              window.localStorage.removeItem(LEGACY_PROFILE_KEY);
            } catch {
              // ignore storage cleanup errors
            }
          }
        },

        pushMessage: (message) => {
          playSound("notifications", "message");
          set((current) => ({
            messages: [{ ...message, id: message.id || generateUUID() }, ...current.messages].slice(0, 4),
          }));
        },

        pushNotification: (notification) => {
          playSound("notifications", "receive");
          set((current) => ({
            notifications: [
              { ...notification, id: notification.id || generateUUID() },
              ...current.notifications,
            ].slice(0, 3),
          }));
        },

        dismissNotification: (id) => {
          set((current) => ({
            notifications: current.notifications.filter((notification) => notification.id !== id),
          }));
        },
      };
    },
    {
      name: FERRO_CORE_STORAGE_KEY,
      skipHydration: true,
      partialize: (state) => ({
        explorerProfile: state.explorerProfile,
        messages: state.messages,
        notifications: state.notifications,
        discoveries: state.discoveries,
        history: state.history,
      }),
      merge: (persisted, current) => {
        const persistedState = persisted as Partial<FerroCoreState> | undefined;
        if (persistedState?.explorerProfile) {
          return { ...current, ...persistedState };
        }

        const legacyProfile = readLegacyProfile();
        return legacyProfile
          ? { ...current, explorerProfile: { ...current.explorerProfile, ...legacyProfile } }
          : current;
      },
    }
  )
);

