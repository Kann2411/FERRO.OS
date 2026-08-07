export type WindowState = "opening" | "active" | "focused" | "closing" | "closed" | "minimized" | "maximized";

export interface WindowDefinition {
  id: string;
  title: string;
  icon: string;
  initialWidth: number;
  initialHeight: number;
  defaultPosition?: { x: number; y: number };
}

export interface WindowInstance extends WindowDefinition {
  id: string;
  state: WindowState;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  focused: boolean;
  draggable: boolean;
  closable: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  previousBounds: { x: number; y: number; width: number; height: number } | null;
}

export interface WindowContextValue {
  windows: WindowInstance[];
  activeWindowId: string | null;
  initialized: boolean;
  openWindow: (definition: WindowDefinition) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  bringToFront: (id: string) => void;
  resetWindowState: () => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  toggleWindowMinimize: (id: string) => void;
  toggleWindowMaximize: (id: string) => void;
}
