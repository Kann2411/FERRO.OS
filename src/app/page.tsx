"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WelcomeSequence } from "@/features/ferro-core";
import { DesktopShell } from "@/modules/workspace";
import { BootScreen } from "@/components/workspace/boot-screen";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";

export default function Home() {
  const { initialized, explorerProfile } = useFerroCore();
  const [bootComplete, setBootComplete] = useState(false);

  // Assume a first-time visitor until the persisted profile has rehydrated (matches the
  // server-rendered markup, avoiding a hydration mismatch) — a returning visitor then cuts
  // the boot screen short as soon as we know. Reduced motion does NOT skip the boot screen
  // outright (it's informational, not decorative) — BootScreen itself renders instantly
  // instead of animating when reduced motion is on.
  const skipBoot = initialized && explorerProfile.welcomeCompleted;
  const showBoot = !skipBoot && !bootComplete;

  return (
    <>
      <AnimatePresence>
        {showBoot && <BootScreen onComplete={() => setBootComplete(true)} />}
      </AnimatePresence>
      {!showBoot && <WelcomeSequence />}
      <DesktopShell />
    </>
  );
}
