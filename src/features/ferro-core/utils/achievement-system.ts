export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (context: AchievementContext) => boolean;
}

export interface AchievementContext {
  progress: number;
  modulesDiscovered: number;
  discoveredModules: string[];
  completedMissions: number;
}

export const achievementDefinitions: AchievementDefinition[] = [
  {
    id: "first-boot",
    title: "First Boot",
    description: "Open the system for the first time.",
    icon: "✦",
    condition: ({ progress }) => progress >= 1,
  },
  {
    id: "curious-mind",
    title: "Curious Mind",
    description: "Discover at least five modules.",
    icon: "◌",
    condition: ({ modulesDiscovered }) => modulesDiscovered >= 5,
  },
  {
    id: "system-operator",
    title: "System Operator",
    description: "Reach 50% exploration progress.",
    icon: "⚙",
    condition: ({ progress }) => progress >= 50,
  },
  {
    id: "producer",
    title: "Producer",
    description: "Discover the creative music modules.",
    icon: "♫",
    condition: ({ discoveredModules }) => ["studio", "discography", "audioPlayer", "equipment"].some((moduleId) => discoveredModules.includes(moduleId)),
  },
  {
    id: "full-stack",
    title: "Full Stack",
    description: "Discover the developer modules.",
    icon: "⌘",
    condition: ({ discoveredModules }) => ["projects", "resume", "skills", "timeline", "code-studio"].some((moduleId) => discoveredModules.includes(moduleId)),
  },
  {
    id: "system-master",
    title: "System Master",
    description: "Reach 100% exploration progress.",
    icon: "◎",
    condition: ({ progress }) => progress >= 100,
  },
];

export function evaluateAchievements(context: AchievementContext) {
  return achievementDefinitions.filter((achievement) => achievement.condition(context));
}
