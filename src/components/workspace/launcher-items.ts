export interface LauncherItem {
  windowId: string;
  accent: string;
  description: string;
}

/**
 * Single source for which modules appear in the desktop icon grid and the dock.
 * Label/icon are resolved from `windowRegistry` (via `resolveWindowDefinition`) so a
 * module can never show up here with a title/icon that disagrees with its window —
 * and a module missing from the registry fails visibly instead of silently opening nothing.
 */
export const launcherItems: LauncherItem[] = [
  { windowId: "projects", accent: "bg-primary/20 text-primary", description: "View Kristian's portfolio projects" },
  { windowId: "resume", accent: "bg-white/10 text-foreground", description: "Professional resume and experience" },
  { windowId: "skills", accent: "bg-white/10 text-foreground", description: "Technical skills and proficiencies" },
  { windowId: "terminal", accent: "bg-primary/20 text-primary", description: "Interactive terminal for system commands" },
  { windowId: "studio", accent: "bg-white/10 text-foreground", description: "Music production environment" },
  { windowId: "discography", accent: "bg-white/10 text-foreground", description: "Artist releases and catalog" },
  { windowId: "audioPlayer", accent: "bg-white/10 text-foreground", description: "Music player controls and queue" },
  { windowId: "equipment", accent: "bg-white/10 text-foreground", description: "Studio gear and production tools" },
  { windowId: "timeline", accent: "bg-white/10 text-foreground", description: "Career timeline and milestones" },
  { windowId: "code-studio", accent: "bg-white/10 text-foreground", description: "Developer laboratory and architecture" },
  { windowId: "aiLab", accent: "bg-primary/20 text-primary", description: "Hidden AI experiments and research" },
];
