"use client";

import { AnimatePresence } from "framer-motion";
import { useWindowContext } from "@/features/window-system/context/window-context";
import { WindowShell } from "@/features/window-system/components/window-shell";

export function WindowManager() {
  const { windows, closeWindow, focusWindow, bringToFront } = useWindowContext();

  return (
    <div className="pointer-events-none absolute inset-0">
      <AnimatePresence>
        {windows.map((window) => (
          <WindowShell
            key={window.id}
            window={window}
            onClose={closeWindow}
            onFocus={focusWindow}
            onBringToFront={bringToFront}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
