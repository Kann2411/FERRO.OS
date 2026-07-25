export interface ExplorerProfile {
  name: string;
  progress: number;
  modulesDiscovered: number;
  discoveredModules: string[];
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
  title: string;
  description: string;
  reward: number;
  prerequisite: string | null;
}

export interface CoreMessage {
  id: string;
  type: "info" | "tip" | "lore" | "welcome" | "warning" | "achievement";
  title: string;
  body: string;
}

export interface CoreNotification {
  id: string;
  type: "success" | "info" | "achievement" | "mission" | "warning";
  title: string;
  body: string;
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
  setExplorerName: (name: string) => void;
  advanceProgress: (amount: number) => void;
  registerDiscovery: (moduleId?: string) => void;
  awardAchievement: (achievement: string) => void;
  recordVisit: () => void;
  completeWelcome: () => void;
  completeMission: (missionId: string) => void;
  unlockMission: (missionId: string) => void;
  pushMessage: (message: CoreMessage) => void;
  pushNotification: (notification: CoreNotification) => void;
  dismissNotification: (id: string) => void;
}
