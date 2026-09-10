"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WelcomeSequence } from "@/features/ferro-core";
import { DesktopShell } from "@/modules/workspace";
import { BootScreen } from "@/components/workspace/boot-screen";

export default function Home() {
  const [showBoot, setShowBoot] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showBoot && (
          <BootScreen
            onComplete={() => {
              setShowBoot(false);
              setShowWelcome(true);
            }}
          />
        )}
      </AnimatePresence>
      {showWelcome && <WelcomeSequence />}
      <DesktopShell />
    </>
  );
}
