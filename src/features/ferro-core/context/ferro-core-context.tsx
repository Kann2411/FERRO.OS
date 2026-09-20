"use client";

import { useEffect, type ReactNode } from "react";
import { useAudio } from "@/features/audio-engine";
import type { FerroCoreContextValue } from "@/features/ferro-core/types";
import { getActiveMission } from "@/features/ferro-core/utils/mission-system";
import { useFerroCoreStore } from "@/store/ferro-core-store";
import { useUi } from "@/hooks/use-lang";

export function FerroCoreProvider({ children }: { children: ReactNode }) {
  const { playSound } = useAudio();
  const setSoundBridge = useFerroCoreStore((state) => state.setSoundBridge);
  const initializeSession = useFerroCoreStore((state) => state.initializeSession);
  const tick = useFerroCoreStore((state) => state.tick);

  useEffect(() => {
    setSoundBridge(playSound);
  }, [playSound, setSoundBridge]);

  useEffect(() => {
    let cancelled = false;

    void useFerroCoreStore.persist.rehydrate()?.then(() => {
      if (!cancelled) {
        initializeSession();
      }
    });

    return () => {
      cancelled = true;
    };
  }, [initializeSession]);

  useEffect(() => {
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [tick]);

  return <>{children}</>;
}

export function useFerroCore(): FerroCoreContextValue {
  const state = useFerroCoreStore();
  const tUi = useUi();

  return {
    coreName: "FERRO CORE",
    logo: "╫",
    tagline: tUi("coreTagline"),
    explorerProfile: state.explorerProfile,
    initialized: state.initialized,
    missions: state.missions,
    completedMissions: state.missions
      .filter((mission) => state.explorerProfile.missionProgress[mission.id])
      .map((mission) => mission.id),
    messages: state.messages,
    notifications: state.notifications,
    discoveries: state.discoveries,
    history: state.history,
    activeMission: getActiveMission(state.explorerProfile.missionProgress),
    mapOpen: state.mapOpen,
    setMapOpen: state.setMapOpen,
    recognizedOpen: state.recognizedOpen,
    setRecognizedOpen: state.setRecognizedOpen,
    setExplorerName: state.setExplorerName,
    registerDiscovery: state.registerDiscovery,
    registerHiddenDiscovery: state.registerHiddenDiscovery,
    awardAchievement: state.awardAchievement,
    recordVisit: state.recordVisit,
    completeWelcome: state.completeWelcome,
    completeMission: state.completeMission,
    unlockMission: state.unlockMission,
    unlockModule: state.unlockModule,
    resetFlow: state.resetFlow,
    pushMessage: state.pushMessage,
    pushNotification: state.pushNotification,
    dismissNotification: state.dismissNotification,
  };
}
