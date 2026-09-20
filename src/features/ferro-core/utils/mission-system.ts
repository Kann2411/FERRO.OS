import type { MissionDefinition } from "@/features/ferro-core/types";

/** Sealed automatically once every other mission in the chain is complete. */
export const RECOGNITION_MISSION_ID = "recognize-signal";

/**
 * Opening the window of a module completes its mission, no matter how it was opened
 * (desktop icon, dock, terminal, shortcut) — see `useMissionTriggers`.
 */
export const windowMissions: Record<string, string> = {
  projects: "discover-projects",
  resume: "read-resume",
  timeline: "explore-timeline",
  skills: "discover-skills",
};

/**
 * The signal chain, in the order it is walked. The signal map (signal-map.tsx) lays out
 * one node per mission id, so adding or renaming a mission here means updating that too.
 * Modules that are not part of the chain yet (studio, discography, ...) only appear as
 * `unlocksModule` so their desktop icons keep surfacing.
 */
export const missionDefinitions: MissionDefinition[] = [
  {
    id: "boot-system",
    title: { es: "Arrancar el sistema", en: "Boot the system" },
    description: {
      es: "Completa la secuencia de arranque de FERRO.OS.",
      en: "Finish the FERRO.OS boot sequence.",
    },
    reward: 5,
    prerequisite: null,
  },
  {
    id: "explore-desktop",
    title: { es: "Explorar el escritorio", en: "Explore the desktop" },
    description: {
      es: "Recorre la estación de trabajo y familiarízate con el entorno.",
      en: "Survey the workspace and understand the environment.",
    },
    reward: 6,
    prerequisite: "boot-system",
  },
  {
    id: "open-first-module",
    title: { es: "Abrir el primer módulo", en: "Open your first module" },
    description: {
      es: "Lanza un módulo desde el escritorio o el dock para comenzar el recorrido.",
      en: "Launch a module from the desktop or the dock to begin the journey.",
    },
    reward: 8,
    prerequisite: "explore-desktop",
    unlocksModule: "studio",
  },
  {
    id: "discover-projects",
    title: { es: "Abrir módulo de Proyectos", en: "Open the Projects module" },
    description: {
      es: "Abre el módulo de Proyectos y recorre el archivo.",
      en: "Open the Projects module and browse the archive.",
    },
    reward: 8,
    prerequisite: "open-first-module",
    unlocksModule: "timeline",
  },
  {
    id: "inspect-project",
    title: { es: "Inspeccionar un proyecto", en: "Inspect a project" },
    description: {
      es: "Abre la ficha de cualquier proyecto para ver su interior.",
      en: "Open any project's file card to see inside it.",
    },
    reward: 10,
    prerequisite: "discover-projects",
    unlocksModule: "code-studio",
  },
  {
    id: "read-resume",
    title: { es: "Leer currículum", en: "Read the resume" },
    description: {
      es: "Abre el módulo de Currículum para conocer el camino del explorador.",
      en: "Open the Resume module to learn the explorer's path.",
    },
    reward: 8,
    prerequisite: "inspect-project",
    unlocksModule: "equipment",
  },
  {
    id: "explore-timeline",
    title: { es: "Ver la línea del tiempo", en: "View the timeline" },
    description: {
      es: "Abre la Línea de tiempo y recorre la evolución del explorador.",
      en: "Open the Timeline and trace the explorer's evolution.",
    },
    reward: 8,
    prerequisite: "read-resume",
    unlocksModule: "audioPlayer",
  },
  {
    id: "discover-skills",
    title: { es: "Calibrar skills", en: "Calibrate skills" },
    description: {
      es: "Abre el módulo de Habilidades e inspecciona la capa de experiencia.",
      en: "Open the Skills module and inspect the experience layer.",
    },
    reward: 8,
    prerequisite: "explore-timeline",
    unlocksModule: "discography",
  },
  {
    id: "talk-to-system",
    title: { es: "Hablarle al sistema", en: "Speak to the system" },
    description: {
      es: "Abre la Terminal y ejecuta un comando. Prueba con help.",
      en: "Open the Terminal and run a command. Try help.",
    },
    reward: 10,
    prerequisite: "discover-skills",
  },
  {
    id: "leave-signal",
    title: { es: "Dejar una señal", en: "Leave a signal" },
    description: {
      es: "Abre Señal desde el dock y envía un mensaje, o copia el correo.",
      en: "Open Signal from the dock and send a message, or copy the address.",
    },
    reward: 12,
    prerequisite: "talk-to-system",
  },
  {
    id: RECOGNITION_MISSION_ID,
    title: { es: "Reconocer la señal", en: "Recognize the signal" },
    description: {
      es: "Completa el resto de misiones para sellar la cadena.",
      en: "Finish the remaining missions to seal the chain.",
    },
    reward: 17,
    prerequisite: "leave-signal",
  },
];

export function getActiveMission(missionProgress: Record<string, boolean>) {
  return missionDefinitions.find((mission) => !missionProgress[mission.id]) ?? null;
}

/**
 * Exploration progress (0-100) is earned only by completing the missions of the signal chain —
 * their rewards add up to exactly 100, so the last one seals it at 100%.
 */
export function getMissionsProgress(missionProgress: Record<string, boolean>) {
  const total = missionDefinitions.reduce(
    (sum, mission) => sum + (missionProgress[mission.id] ? mission.reward : 0),
    0
  );
  return Math.min(100, total);
}

export function getMissionProgressValue(missionProgress: Record<string, boolean>) {
  return missionDefinitions.filter((mission) => missionProgress[mission.id]).length;
}
