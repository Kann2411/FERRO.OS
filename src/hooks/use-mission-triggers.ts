"use client";

import { useEffect } from "react";
import { launcherItems } from "@/components/workspace/launcher-items";
import { windowMissions } from "@/features/ferro-core/utils/mission-system";
import { useWindowContext } from "@/features/window-system/context/window-context";
import { useFerroCoreStore } from "@/store/ferro-core-store";

const launcherWindowIds = new Set(launcherItems.map((item) => item.windowId));

/**
 * Connects "a window is open" to the mission chain, whichever way it was opened (desktop icon,
 * dock, terminal, shortcut). Mount it once, inside the WindowProvider.
 */
export function useMissionTriggers() {
  const { windows } = useWindowContext();
  const ready = useFerroCoreStore((state) => state.initialized);
  const completeMission = useFerroCoreStore((state) => state.completeMission);
  const registerDiscovery = useFerroCoreStore((state) => state.registerDiscovery);

  // Only the set of open windows matters — not their positions, which change while dragging.
  const openIds = windows.map((window) => window.id).join("|");

  useEffect(() => {
    if (!ready || !openIds) {
      return;
    }

    const ids = openIds.split("|");

    // Settings is a control panel, not one of the modules the chain asks you to explore.
    if (ids.some((id) => id !== "settings")) {
      completeMission("explore-desktop");
      completeMission("open-first-module");
    }

    for (const id of ids) {
      const missionId = windowMissions[id];
      if (missionId) {
        completeMission(missionId);
      }

      if (launcherWindowIds.has(id)) {
        registerDiscovery(id);
      }
    }
  }, [ready, openIds, completeMission, registerDiscovery]);
}
