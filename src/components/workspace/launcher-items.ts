import type { Bilingual } from "@/lib/i18n/types";

export interface LauncherItem {
  windowId: string;
  accent: string;
  description: Bilingual;
  /** Shown in the dock only, with no icon on the desktop grid. */
  dockOnly?: boolean;
}

/**
 * Single source for which modules appear in the desktop icon grid and the dock.
 * Label/icon are resolved from `windowRegistry` (via `resolveWindowDefinition`) so a
 * module can never show up here with a title/icon that disagrees with its window —
 * and a module missing from the registry fails visibly instead of silently opening nothing.
 */
export const launcherItems: LauncherItem[] = [
  {
    windowId: "projects",
    accent: "bg-primary/20 text-primary",
    description: { es: "Ver los proyectos del portafolio de Kristian", en: "View Kristian's portfolio projects" },
  },
  {
    windowId: "resume",
    accent: "bg-white/10 text-foreground",
    description: { es: "Currículum profesional y experiencia", en: "Professional resume and experience" },
  },
  {
    windowId: "skills",
    accent: "bg-white/10 text-foreground",
    description: { es: "Habilidades técnicas y competencias", en: "Technical skills and proficiencies" },
  },
  {
    windowId: "terminal",
    accent: "bg-primary/20 text-primary",
    description: { es: "Terminal interactiva para comandos del sistema", en: "Interactive terminal for system commands" },
  },
  {
    windowId: "signal",
    accent: "bg-primary/20 text-primary",
    description: { es: "Deja un mensaje o copia el correo de contacto", en: "Leave a message or copy the contact email" },
    dockOnly: true,
  },
  {
    windowId: "studio",
    accent: "bg-white/10 text-foreground",
    description: { es: "Entorno de producción musical", en: "Music production environment" },
  },
  {
    windowId: "discography",
    accent: "bg-white/10 text-foreground",
    description: { es: "Lanzamientos y catálogo del artista", en: "Artist releases and catalog" },
  },
  {
    windowId: "audioPlayer",
    accent: "bg-white/10 text-foreground",
    description: { es: "Controles y cola del reproductor de música", en: "Music player controls and queue" },
  },
  {
    windowId: "equipment",
    accent: "bg-white/10 text-foreground",
    description: { es: "Equipo de estudio y herramientas de producción", en: "Studio gear and production tools" },
  },
  {
    windowId: "timeline",
    accent: "bg-white/10 text-foreground",
    description: { es: "Línea de tiempo profesional e hitos", en: "Career timeline and milestones" },
  },
  {
    windowId: "code-studio",
    accent: "bg-white/10 text-foreground",
    description: { es: "Laboratorio y arquitectura de desarrollo", en: "Developer laboratory and architecture" },
  },
  {
    windowId: "aiLab",
    accent: "bg-primary/20 text-primary",
    description: { es: "Experimentos e investigación oculta de IA", en: "Hidden AI experiments and research" },
  },
];
