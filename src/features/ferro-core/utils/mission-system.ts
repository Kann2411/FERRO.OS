import type { MissionDefinition } from "@/features/ferro-core/types";

export const missionDefinitions: MissionDefinition[] = [
  {
    id: "explore-desktop",
    title: { es: "Explora el escritorio", en: "Explore the desktop" },
    description: {
      es: "Recorre la estación de trabajo y familiarízate con el entorno.",
      en: "Survey the workspace and understand the environment.",
    },
    reward: 5,
    prerequisite: null,
  },
  {
    id: "open-first-module",
    title: { es: "Abre tu primer módulo", en: "Open your first module" },
    description: {
      es: "Lanza un módulo desde el escritorio para comenzar el recorrido.",
      en: "Launch a module from the desktop to begin the journey.",
    },
    reward: 8,
    prerequisite: "explore-desktop",
    unlocksModule: "studio",
  },
  {
    id: "discover-projects",
    title: { es: "Descubre Proyectos", en: "Discover Projects" },
    description: {
      es: "Abre el módulo de Proyectos e inspecciona su contenido.",
      en: "Open the Projects module and inspect its contents.",
    },
    reward: 7,
    prerequisite: "open-first-module",
    unlocksModule: "timeline",
  },
  {
    id: "visit-studio",
    title: { es: "Visita el Estudio", en: "Visit Studio" },
    description: {
      es: "Abre el módulo de Estudio e inspecciona su atmósfera.",
      en: "Open the Studio module and inspect its atmosphere.",
    },
    reward: 7,
    prerequisite: "discover-projects",
    unlocksModule: "code-studio",
  },
  {
    id: "discover-skills",
    title: { es: "Descubre Habilidades", en: "Discover Skills" },
    description: {
      es: "Abre el módulo de Habilidades e inspecciona la capa de experiencia.",
      en: "Open the Skills module and inspect the experience layer.",
    },
    reward: 6,
    prerequisite: "visit-studio",
    unlocksModule: "discography",
  },
  {
    id: "read-resume",
    title: { es: "Lee el Currículum", en: "Read the Resume" },
    description: {
      es: "Abre el módulo de Currículum para conocer el camino del explorador.",
      en: "Open the Resume module to learn the explorer's path.",
    },
    reward: 6,
    prerequisite: "discover-skills",
    unlocksModule: "equipment",
  },
  {
    id: "explore-timeline",
    title: { es: "Explora la Línea de tiempo", en: "Explore Timeline" },
    description: {
      es: "Recorre el historial de versiones de la evolución del explorador.",
      en: "Trace the version history of the explorer's evolution.",
    },
    reward: 5,
    prerequisite: "read-resume",
    unlocksModule: "audioPlayer",
  },
  {
    id: "listen-discography",
    title: { es: "Escucha la Discografía", en: "Listen to Discography" },
    description: {
      es: "Explora los lanzamientos musicales en el módulo de Discografía.",
      en: "Browse the music releases in the Discography module.",
    },
    reward: 7,
    prerequisite: "explore-timeline",
  },
  {
    id: "visit-ai-lab",
    title: { es: "Visita el Laboratorio de IA", en: "Visit AI Lab" },
    description: {
      es: "Accede al Laboratorio de IA oculto a través de la Terminal.",
      en: "Access the hidden AI Lab through the Terminal.",
    },
    reward: 10,
    prerequisite: "listen-discography",
    unlocksModule: "aiLab",
  },
  {
    id: "master-explorer",
    title: { es: "Explorador Maestro", en: "Master Explorer" },
    description: {
      es: "Completa todas las misiones disponibles y alcanza el 75% de exploración.",
      en: "Complete all available missions and reach 75% exploration.",
    },
    reward: 15,
    prerequisite: "visit-ai-lab",
  },
  {
    id: "full-exploration",
    title: { es: "Exploración completa", en: "Full Exploration" },
    description: {
      es: "Desbloquea cada módulo y alcanza el 100% de exploración.",
      en: "Unlock every module and reach 100% exploration.",
    },
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
