export interface ExplorerProfile {
  name: string;
  progress: number;
  modulesDiscovered: number;
  achievements: string[];
  firstVisit: string | null;
  lastVisit: string | null;
  visitCount: number;
  welcomeCompleted: boolean;
  missionProgress: Record<string, boolean>;
}

export interface MissionDefinition {
  id: string;
  title: string;
  description: string;
  reward: number;
}

export interface CoreMessage {
  id: string;
  type: "info" | "tip" | "lore" | "welcome" | "warning" | "achievement";
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
  setExplorerName: (name: string) => void;
  advanceProgress: (amount: number) => void;
  registerDiscovery: () => void;
  awardAchievement: (achievement: string) => void;
  recordVisit: () => void;
  completeWelcome: () => void;
  completeMission: (missionId: string) => void;
  unlockMission: (missionId: string) => void;
  pushMessage: (message: CoreMessage) => void;
}
