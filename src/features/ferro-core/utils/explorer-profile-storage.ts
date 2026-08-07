import type { ExplorerProfile } from "@/features/ferro-core/types";

const STORAGE_KEY = "ferro.os.ferro-core-session";

function getSessionStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function migrateExplorerProfileSnapshot(
  parsed: Partial<ExplorerProfile>,
  defaultProfile: ExplorerProfile
): ExplorerProfile {
  return {
    ...defaultProfile,
    ...parsed,
    progress: typeof parsed.progress === "number" ? parsed.progress : defaultProfile.progress,
    modulesDiscovered:
      typeof parsed.modulesDiscovered === "number" ? parsed.modulesDiscovered : defaultProfile.modulesDiscovered,
    discoveredModules: Array.isArray(parsed.discoveredModules) ? parsed.discoveredModules : defaultProfile.discoveredModules,
    discoveredHiddenFiles: Array.isArray(parsed.discoveredHiddenFiles) ? parsed.discoveredHiddenFiles : defaultProfile.discoveredHiddenFiles,
    achievements: Array.isArray(parsed.achievements) ? parsed.achievements : defaultProfile.achievements,
    firstVisit: typeof parsed.firstVisit === "string" ? parsed.firstVisit : defaultProfile.firstVisit,
    lastVisit: typeof parsed.lastVisit === "string" ? parsed.lastVisit : defaultProfile.lastVisit,
    visitCount: typeof parsed.visitCount === "number" ? parsed.visitCount : defaultProfile.visitCount,
    welcomeCompleted: typeof parsed.welcomeCompleted === "boolean" ? parsed.welcomeCompleted : defaultProfile.welcomeCompleted,
    missionProgress: typeof parsed.missionProgress === "object" && parsed.missionProgress !== null ? parsed.missionProgress : defaultProfile.missionProgress,
    explorationSeconds:
      typeof parsed.explorationSeconds === "number" ? parsed.explorationSeconds : defaultProfile.explorationSeconds,
    lastSavedAt: typeof parsed.lastSavedAt === "string" ? parsed.lastSavedAt : defaultProfile.lastSavedAt,
  };
}

export function loadExplorerProfileSnapshot(defaultProfile: ExplorerProfile): ExplorerProfile {
  const storage = getSessionStorage();
  if (!storage) {
    return defaultProfile;
  }

  try {
    const raw = storage.getItem(STORAGE_KEY);
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
}

export function saveExplorerProfileSnapshot(profile: ExplorerProfile) {
  const storage = getSessionStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore session storage write errors
  }
}

export function clearExplorerProfileSnapshot() {
  const storage = getSessionStorage();
  if (!storage) {
    return;
  }

  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // ignore session storage removal errors
  }
}
