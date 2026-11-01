import type { Bilingual } from "@/lib/i18n/types";

export interface ExplorerProfile {
  name: string;
  progress: number;
  modulesDiscovered: number;
  discoveredModules: string[];
  unlockedModules: string[];
  discoveredHiddenFiles: string[];
  achievements: string[];
  firstVisit: string | null;
  lastVisit: string | null;
  visitCount: number;
  welcomeCompleted: boolean;
  missionProgress: Record<string, boolean>;
  explorationSeconds: number;
  lastSavedAt: string | null;
}

export interface MissionDefinition {
  id: string;
  title: Bilingual;
  description: Bilingual;
  reward: number;
  prerequisite: string | null;
  unlocksModule?: string;
}

export interface CoreMessage {
  id: string;
  type: "info" | "tip" | "lore" | "welcome" | "warning" | "achievement";
  title: Bilingual;
  body: Bilingual;
}

export interface CoreNotification {
  id: string;
  type: "success" | "info" | "achievement" | "mission" | "warning";
  title: Bilingual;
  body: Bilingual;
}

export interface DiscoveryRecord {
  id: string;
  label: string;
  source: string;
  timestamp: string;
}

export interface ExplorerHistoryEntry {
  id: string;
  type: "module" | "achievement" | "progress" | "mission" | "event";
  label: Bilingual;
  detail: Bilingual;
  timestamp: string;
}

export interface FerroCoreContextValue {
  coreName: string;
  logo: string;
  tagline: string;
  explorerProfile: ExplorerProfile;
  initialized: boolean;
  missions: MissionDefinition[];
  completedMissions: string[];
  messages: CoreMessage[];
  notifications: CoreNotification[];
  discoveries: DiscoveryRecord[];
  history: ExplorerHistoryEntry[];
  activeMission: MissionDefinition | null;
  mapOpen: boolean;
  setMapOpen: (open: boolean) => void;
  recognizedOpen: boolean;
  setRecognizedOpen: (open: boolean) => void;
  setExplorerName: (name: string) => void;
  registerDiscovery: (moduleId?: string) => void;
  awardAchievement: (achievement: string) => void;
  recordVisit: () => void;
  completeWelcome: () => void;
  completeMission: (missionId: string) => void;
  unlockMission: (missionId: string) => void;
  unlockModule: (moduleId: string) => void;
  registerHiddenDiscovery: (fileId: string) => boolean;
  resetFlow: () => void;
  pushMessage: (message: CoreMessage) => void;
  pushNotification: (notification: CoreNotification) => void;
  dismissNotification: (id: string) => void;
}
