import type { Bilingual } from "@/lib/i18n/types";

export interface AchievementDefinition {
  id: string;
  title: Bilingual;
  description: Bilingual;
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
    title: { es: "Primer arranque", en: "First Boot" },
    description: { es: "Abre el sistema por primera vez.", en: "Open the system for the first time." },
    icon: "✦",
    condition: ({ progress }) => progress >= 1,
  },
  {
    id: "curious-mind",
    title: { es: "Mente curiosa", en: "Curious Mind" },
    description: { es: "Descubre al menos cinco módulos.", en: "Discover at least five modules." },
    icon: "◌",
    condition: ({ modulesDiscovered }) => modulesDiscovered >= 5,
  },
  {
    id: "system-operator",
    title: { es: "Operador del sistema", en: "System Operator" },
    description: { es: "Alcanza el 50% de progreso de exploración.", en: "Reach 50% exploration progress." },
    icon: "⚙",
    condition: ({ progress }) => progress >= 50,
  },
  {
    id: "producer",
    title: { es: "Productor", en: "Producer" },
    description: { es: "Descubre los módulos musicales creativos.", en: "Discover the creative music modules." },
    icon: "♫",
    condition: ({ discoveredModules }) =>
      ["studio", "discography", "audioPlayer", "equipment"].some((moduleId) => discoveredModules.includes(moduleId)),
  },
  {
    id: "full-stack",
    title: { es: "Full Stack", en: "Full Stack" },
    description: { es: "Descubre los módulos de desarrollo.", en: "Discover the developer modules." },
    icon: "⌘",
    condition: ({ discoveredModules }) =>
      ["projects", "resume", "skills", "timeline", "code-studio"].some((moduleId) => discoveredModules.includes(moduleId)),
  },
  {
    id: "system-master",
    title: { es: "Maestro del sistema", en: "System Master" },
    description: { es: "Alcanza el 100% de progreso de exploración.", en: "Reach 100% exploration progress." },
    icon: "◎",
    condition: ({ progress }) => progress >= 100,
  },
  {
    id: "signal-map-opened",
    title: { es: "Cartógrafo de señal", en: "Signal Cartographer" },
    description: { es: "Abre el mapa de señal por primera vez.", en: "Open the signal map for the first time." },
    icon: "⌖",
    condition: () => false,
  },
  {
    id: "projects-discovered",
    title: { es: "Proyectos descubiertos", en: "Projects Discovered" },
    description: { es: "Encuentra la señal de Proyectos.", en: "Discover the Projects signal." },
    icon: "⌘",
    condition: () => false,
  },
];

export function evaluateAchievements(context: AchievementContext) {
  return achievementDefinitions.filter((achievement) => achievement.condition(context));
}

export function getAchievementDefinition(id: string) {
  return achievementDefinitions.find((achievement) => achievement.id === id) ?? null;
}
