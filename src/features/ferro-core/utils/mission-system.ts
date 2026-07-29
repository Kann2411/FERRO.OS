export interface MissionDefinition {
  id: string;
  title: string;
  description: string;
  reward: number;
  prerequisite: string | null;
  targetModule?: string;
}

export const missionDefinitions: MissionDefinition[] = [
  {
    id: "explore-desktop",
    title: "Explore the desktop",
    description: "Survey the workspace and understand the environment.",
    reward: 5,
    prerequisite: null,
    targetModule: "desktop",
  },
  {
    id: "open-first-module",
    title: "Open your first module",
    description: "Launch a module from the desktop to begin the journey.",
    reward: 8,
    prerequisite: "explore-desktop",
  },
  {
    id: "discover-projects",
    title: "Discover Projects",
    description: "Open the Projects module and inspect its contents.",
    reward: 7,
    prerequisite: "open-first-module",
    targetModule: "projects",
  },
  {
    id: "visit-studio",
    title: "Visit Studio",
    description: "Open the Studio module and inspect its atmosphere.",
    reward: 7,
    prerequisite: "discover-projects",
    targetModule: "studio",
  },
  {
    id: "discover-skills",
    title: "Discover Skills",
    description: "Open the Skills module and inspect the experience layer.",
    reward: 6,
    prerequisite: "visit-studio",
    targetModule: "skills",
  },
];

export function getActiveMission(missionProgress: Record<string, boolean>) {
  return missionDefinitions.find((mission) => !missionProgress[mission.id]) ?? null;
}

export function getMissionProgressValue(missionProgress: Record<string, boolean>) {
  return missionDefinitions.filter((mission) => missionProgress[mission.id]).length;
}
