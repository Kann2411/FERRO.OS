export interface ExplorerProfile {
  name: string;
  progress: number;
  modulesDiscovered: number;
  achievements: string[];
  firstVisit: string | null;
  lastVisit: string | null;
  visitCount: number;
}

export interface FerroCoreContextValue {
  coreName: string;
  logo: string;
  tagline: string;
  explorerProfile: ExplorerProfile;
  initialized: boolean;
  setExplorerName: (name: string) => void;
  advanceProgress: (amount: number) => void;
  registerDiscovery: () => void;
  awardAchievement: (achievement: string) => void;
  recordVisit: () => void;
}
