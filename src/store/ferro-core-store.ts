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
import { missionDefinitions, RECOGNITION_MISSION_ID } from "@/features/ferro-core/utils/mission-system";
import { evaluateAchievements, getAchievementDefinition } from "@/features/ferro-core/utils/achievement-system";
import { getDiscoveryProgressReward, updateProgress } from "@/features/ferro-core/utils/explorer-progress";
import { getHiddenFileDefinition } from "@/features/hidden-files/utils/hidden-files";
import { useWallpaperStore } from "@/store/wallpaper-store";
import { generateUUID } from "@/lib/uuid";
import type { AudioCategory } from "@/features/audio-engine/types";
import type { Bilingual } from "@/lib/i18n/types";

export const FERRO_CORE_STORAGE_KEY = "ferro-os-explorer-profile";
const LEGACY_PROFILE_KEY = "ferro.os.ferro-core";

function bi(es: string, en: string): Bilingual {
  return { es, en };
}

const defaultProfile: ExplorerProfile = {
  name: "Explorer",
  progress: 0,
  modulesDiscovered: 0,
  discoveredModules: [],
  unlockedModules: ["projects", "resume", "skills", "terminal", "signal"],
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

function isChainReadyToSeal(missionProgress: Record<string, boolean>) {
  return missionDefinitions
    .filter((mission) => mission.id !== RECOGNITION_MISSION_ID)
    .every((mission) => missionProgress[mission.id]);
}

/**
 * Brings a saved profile in line with the current mission chain: drops progress for missions
 * that no longer exist (they would inflate the completed count) and keeps the always-available
 * modules unlocked (profiles saved before a module existed don't list it).
 */
function normalizeProfile(profile: ExplorerProfile): ExplorerProfile {
  const knownMissionIds = new Set(missionDefinitions.map((mission) => mission.id));

  return {
    ...profile,
    missionProgress: Object.fromEntries(
      Object.entries(profile.missionProgress ?? {}).filter(([id]) => knownMissionIds.has(id))
    ),
    unlockedModules: Array.from(new Set([...defaultProfile.unlockedModules, ...(profile.unlockedModules ?? [])])),
  };
}

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
  mapOpen: boolean;
  setMapOpen: (open: boolean) => void;
  recognizedOpen: boolean;
  setRecognizedOpen: (open: boolean) => void;
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

        const missingIds = unlockedAchievements
          .map((achievement) => achievement.id)
          .filter((id) => !profile.achievements.includes(id));

        if (missingIds.length > 0) {
          const firstDefinition = getAchievementDefinition(missingIds[0]);
          set((current) => ({
            explorerProfile: {
              ...current.explorerProfile,
              achievements: [...current.explorerProfile.achievements, ...missingIds],
            },
            history: addEntry(current.history, {
              id: generateUUID(),
              type: "achievement",
              label: firstDefinition?.title ?? bi(missingIds[0], missingIds[0]),
              detail: bi("Logro desbloqueado", "Achievement unlocked"),
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
              title: bi("Mensaje final desbloqueado", "Final message unlocked"),
              body: bi(
                "FERRO CORE preparó un mensaje de cierre al alcanzar el 100% de exploración.",
                "FERRO CORE has prepared a closing message for reaching 100% exploration."
              ),
            });
            get().pushMessage({
              id: "final-message",
              type: "info",
              title: bi("Mensaje final de FERRO CORE", "FERRO CORE final message"),
              body: bi(
                "Se agregó una nota de cierre especial a tus archivos ocultos.",
                "A special closing note has been added to your hidden files."
              ),
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
        mapOpen: false,
        recognizedOpen: false,
        onSound: null,

        setMapOpen: (open) => set({ mapOpen: open }),
        setRecognizedOpen: (open) => set({ recognizedOpen: open }),
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
                      title: bi("FERRO CORE en línea", "FERRO CORE online"),
                      body: bi(
                        "El sistema comenzó a recordar tus primeros pasos.",
                        "The system has begun to remember your first steps."
                      ),
                    },
                  ],
            notifications:
              current.notifications.length > 0
                ? current.notifications
                : [
                    {
                      id: "welcome-notification",
                      type: "info",
                      title: bi("Sistema inicializado", "System initialized"),
                      body: bi(
                        "FERRO CORE ahora está observando tu exploración.",
                        "FERRO CORE is now observing your exploration."
                      ),
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
                label: bi("Actualización de progreso", "Progress update"),
                detail: bi(
                  `La exploración avanzó un ${amount}%`,
                  `Exploration advanced by ${amount}%`
                ),
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
              label: bi(moduleId ?? "Evento del sistema", moduleId ?? "System event"),
              detail: bi("Módulo descubierto", "Module discovered"),
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
          const historyLabel = fileDefinition?.label ?? bi(fileId, fileId);

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
              label: historyLabel,
              detail: bi("Archivo oculto descubierto", "Hidden file discovered"),
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

        awardAchievement: (achievementId) => {
          if (get().explorerProfile.achievements.includes(achievementId)) {
            return;
          }

          playSound("achievements", "unlock");

          const definition = getAchievementDefinition(achievementId);
          const label = definition?.title ?? bi(achievementId, achievementId);

          set((state) => ({
            history: addEntry(state.history, {
              id: generateUUID(),
              type: "achievement",
              label,
              detail: bi("Logro desbloqueado", "Achievement unlocked"),
              timestamp: new Date().toISOString(),
            }),
          }));

          set((state) => {
            if (state.explorerProfile.achievements.includes(achievementId)) {
              return state;
            }
            return {
              explorerProfile: {
                ...state.explorerProfile,
                achievements: [...state.explorerProfile.achievements, achievementId],
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

          // The last mission can't be completed directly — it seals itself once every other one is done.
          if (missionId === RECOGNITION_MISSION_ID && !isChainReadyToSeal(current.missionProgress)) {
            return;
          }

          set((state) => ({
            history: addEntry(state.history, {
              id: generateUUID(),
              type: "mission",
              label: missionDef.title,
              detail: bi("Misión completada", "Mission completed"),
              timestamp: new Date().toISOString(),
            }),
          }));

          const shouldUnlockModule =
            missionDef.unlocksModule && !current.unlockedModules.includes(missionDef.unlocksModule);

          if (shouldUnlockModule && missionDef.unlocksModule) {
            const unlockedModuleId = missionDef.unlocksModule;
            set((state) => ({
              history: addEntry(state.history, {
                id: generateUUID(),
                type: "module",
                label: bi(unlockedModuleId, unlockedModuleId),
                detail: bi("Módulo desbloqueado", "Module unlocked"),
                timestamp: new Date().toISOString(),
              }),
              notifications: [
                {
                  id: `unlock-${unlockedModuleId}`,
                  type: "success" as const,
                  title: bi("Módulo desbloqueado", "Module unlocked"),
                  body: bi(`${unlockedModuleId} ya está disponible.`, `${unlockedModuleId} is now accessible.`),
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

          if (missionId === RECOGNITION_MISSION_ID) {
            get().awardAchievement("signal-recognized");
            set({ recognizedOpen: true });
            return;
          }

          get().pushNotification({
            id: `mission-${missionId}`,
            type: "mission",
            title: bi("Misión completada", "Mission completed"),
            body: missionDef.title,
          });

          if (isChainReadyToSeal(get().explorerProfile.missionProgress)) {
            queueMicrotask(() => get().completeMission(RECOGNITION_MISSION_ID));
          }
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
            mapOpen: false,
            recognizedOpen: false,
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
          return {
            ...current,
            ...persistedState,
            explorerProfile: normalizeProfile({ ...defaultProfile, ...persistedState.explorerProfile }),
          };
        }

        const legacyProfile = readLegacyProfile();
        return legacyProfile
          ? { ...current, explorerProfile: normalizeProfile({ ...current.explorerProfile, ...legacyProfile }) }
          : current;
      },
    }
  )
);

