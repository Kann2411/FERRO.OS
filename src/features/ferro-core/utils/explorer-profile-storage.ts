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

    return {
      ...defaultProfile,
      ...parsed,
    };
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
