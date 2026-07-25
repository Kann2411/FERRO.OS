import { windowRegistry } from "@/features/window-system/registry";
import type { WindowDefinition } from "@/features/window-system/types";

export function resolveWindowDefinition(windowId: string): WindowDefinition | null {
  return windowRegistry[windowId] ?? null;
}
