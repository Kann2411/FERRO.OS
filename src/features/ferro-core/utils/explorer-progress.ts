const discoveryRewards: Record<string, number> = {
  desktop: 1,
  projects: 8,
  resume: 5,
  skills: 6,
  timeline: 5,
  studio: 10,
  discography: 8,
  audioPlayer: 7,
  equipment: 6,
  "code-studio": 6,
  terminal: 5,
  explorer: 4,
  settings: 4,
  aiLab: 12,
  default: 3,
};

export function getDiscoveryProgressReward(moduleId?: string) {
  if (!moduleId) {
    return discoveryRewards.default;
  }

  return discoveryRewards[moduleId] ?? discoveryRewards.default;
}

export function updateProgress(currentProgress: number, amount: number) {
  return Math.min(100, Math.max(currentProgress, currentProgress + Math.max(0, amount)));
}
