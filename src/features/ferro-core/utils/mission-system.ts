export interface MissionDefinition {
  id: string;
  title: string;
  description: string;
  reward: number;
  prerequisite: string | null;
  unlocksModule?: string;
}

export const missionDefinitions: MissionDefinition[] = [
  {
    id: "explore-desktop",
    title: "Explore the desktop",
    description: "Survey the workspace and understand the environment.",
    reward: 5,
    prerequisite: null,
    unlocksModule: "terminal",
  },
  {
    id: "open-first-module",
    title: "Open your first module",
    description: "Launch a module from the desktop to begin the journey.",
    reward: 8,
    prerequisite: "explore-desktop",
    unlocksModule: "studio",
  },
  {
    id: "discover-projects",
    title: "Discover Projects",
    description: "Open the Projects module and inspect its contents.",
    reward: 7,
    prerequisite: "open-first-module",
    unlocksModule: "timeline",
  },
  {
    id: "visit-studio",
    title: "Visit Studio",
    description: "Open the Studio module and inspect its atmosphere.",
    reward: 7,
    prerequisite: "discover-projects",
    unlocksModule: "code-studio",
  },
  {
    id: "discover-skills",
    title: "Discover Skills",
    description: "Open the Skills module and inspect the experience layer.",
    reward: 6,
    prerequisite: "visit-studio",
    unlocksModule: "discography",
  },
  {
    id: "read-resume",
    title: "Read the Resume",
    description: "Open the Resume module to learn the explorer's path.",
    reward: 6,
    prerequisite: "discover-skills",
    unlocksModule: "equipment",
  },
  {
    id: "explore-timeline",
    title: "Explore Timeline",
    description: "Trace the version history of the explorer's evolution.",
    reward: 5,
    prerequisite: "read-resume",
    unlocksModule: "audio-player",
  },
  {
    id: "listen-discography",
    title: "Listen to Discography",
    description: "Browse the music releases in the Discography module.",
    reward: 7,
    prerequisite: "explore-timeline",
    unlocksModule: "settings",
  },
  {
    id: "visit-ai-lab",
    title: "Visit AI Lab",
    description: "Access the hidden AI Lab through the Terminal.",
    reward: 10,
    prerequisite: "listen-discography",
    unlocksModule: "aiLab",
  },
  {
    id: "master-explorer",
    title: "Master Explorer",
    description: "Complete all available missions and reach 75% exploration.",
    reward: 15,
    prerequisite: "visit-ai-lab",
  },
  {
    id: "full-exploration",
    title: "Full Exploration",
    description: "Unlock every module and reach 100% exploration.",
    reward: 20,
    prerequisite: "master-explorer",
  },
];

export function getActiveMission(missionProgress: Record<string, boolean>) {
  return missionDefinitions.find((mission) => !missionProgress[mission.id]) ?? null;
}

export function getMissionProgressValue(missionProgress: Record<string, boolean>) {
  return missionDefinitions.filter((mission) => missionProgress[mission.id]).length;
}