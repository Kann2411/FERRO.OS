"use client";

import { useState, useEffect } from "react";
import { WelcomeSequence } from "@/features/ferro-core";
import { DesktopShell } from "@/modules/workspace";
import { BootScreen } from "@/components/workspace/boot-screen";

export default function Home() {
  const [showBoot, setShowBoot] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!showBoot) return;
    const timer = setTimeout(() => {
      setShowBoot(false);
      setShowWelcome(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [showBoot]);

  return (
    <>
      {showBoot && <BootScreen onComplete={() => setShowBoot(false)} />}
      {showWelcome && <WelcomeSequence />}
      <DesktopShell />
    </>
  );
}
