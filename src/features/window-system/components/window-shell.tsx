"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useWindowContext } from "@/features/window-system/context/window-context";
import type { WindowInstance } from "@/features/window-system/types";
import { getViewportSafePosition } from "@/features/window-system/utils";

interface WindowShellProps {
  window: WindowInstance;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onBringToFront: (id: string) => void;
}

export function WindowShell({ window, onClose, onFocus, onBringToFront }: WindowShellProps) {
  const { updateWindowPosition } = useWindowContext();
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  const [position, setPosition] = useState({ x: window.x, y: window.y });

  useEffect(() => {
    setPosition({ x: window.x, y: window.y });
  }, [window.x, window.y]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onFocus(window.id);
    onBringToFront(window.id);

    const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
    setDragOffset({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragOffset) {
      return;
    }

    const nextX = event.clientX - dragOffset.x;
    const nextY = event.clientY - dragOffset.y;
    const safePosition = getViewportSafePosition(nextX, nextY, window.width, window.height);

    setPosition({ x: safePosition.x, y: safePosition.y });
    updateWindowPosition(window.id, safePosition);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragOffset(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`pointer-events-auto absolute z-10 overflow-hidden rounded-[18px] border bg-[#141414]/90 backdrop-blur-xl ${window.focused ? "border-primary/40" : "border-white/10"}`}
      style={{
        left: position.x,
        top: position.y,
        width: window.width,
        height: window.height,
        transform: "translate3d(0,0,0)",
        boxShadow: window.focused
          ? "0 0 15px rgba(248, 113, 113, 0.30), 0 0 120px rgba(248, 113, 113, 0.18), 0 24px 90px rgba(0,0,0,0.42)"
          : "0 0 25px rgba(248, 113, 113, 0.15), 0 24px 90px rgba(0,0,0,0.42)",
      }}
    >
      <div
        className="flex items-center justify-between border-b border-white/10 bg-black/20 px-3 py-2.5"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary">{window.icon}</span>
          <span className="text-sm font-medium text-white">{window.title}</span>
        </div>
        <button
          type="button"
          onPointerDown={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
          onClick={(event) => {
            event.stopPropagation();
            onClose(window.id);
          }}
          className="rounded-full border border-white/10 px-2 py-1 text-xs text-secondary transition hover:border-primary/40 hover:text-primary"
        >
          ✕
        </button>
      </div>

      <div className="h-[calc(100%-44px)] bg-[#0d0d0d]/70 p-4 text-sm text-secondary">
        <p className="text-sm leading-7">
          {window.title} module placeholder. The window engine is now ready for future modules.
        </p>
      </div>
    </motion.div>
  );
}
