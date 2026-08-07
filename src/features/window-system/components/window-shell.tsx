"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/features/audio-engine";
import { useWindowContext } from "@/features/window-system/context/window-context";
import { ProjectsModule } from "@/features/projects/components/projects-module";
import { ResumeModule } from "@/features/resume/components/resume-module";
import { SkillsModule } from "@/features/skills/components/skills-module";
import { TimelineModule } from "@/features/timeline/components/timeline-module";
import { CodeStudioModule } from "@/features/code-studio/components/code-studio-module";
import { AiLabModule } from "@/features/ai-lab/components/ai-lab-module";
import { DebugConsoleModule } from "@/features/debug-console/components/debug-console-module";
import { StudioModule } from "@/features/studio/components/studio-module";
import { DiscographyModule } from "@/features/discography/components/discography-module";
import { AudioPlayerModule } from "@/features/audio-player/components/audio-player-module";
import { EquipmentModule } from "@/features/equipment/components/equipment-module";
import { TerminalModule } from "@/features/terminal/components/terminal-module";
import { SettingsModule } from "@/features/settings/components/settings-module";
import type { WindowInstance } from "@/features/window-system/types";
import { getViewportSafePosition } from "@/features/window-system/utils";
import { createTransition } from "@/features/animation-engine";
import { SkeletonCard, SkeletonList } from "@/components/ui/skeleton";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface WindowShellProps {
  window: WindowInstance;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onBringToFront: (id: string) => void;
}

export function WindowShell({ window, onClose, onFocus, onBringToFront }: WindowShellProps) {
  const { updateWindowPosition, toggleWindowMinimize, toggleWindowMaximize } = useWindowContext();
  const { playSound } = useAudio();
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);
  const [position, setPosition] = useState({ x: window.x, y: window.y });
  const [isClosing, setIsClosing] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const motionTransition = createTransition("window", { reducedMotion: prefersReducedMotion });

  useEffect(() => {
    setPosition({ x: window.x, y: window.y });
    setIsContentReady(false);

    const frame = globalThis.setTimeout(() => {
      setIsContentReady(true);
    }, 140);

    return () => {
      globalThis.clearTimeout(frame);
    };
  }, [window.id, window.x, window.y]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        globalThis.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

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

  const handleClose = () => {
    if (isClosing) {
      return;
    }

    playSound("ui", "close");
    setIsClosing(true);

    if (prefersReducedMotion) {
      onClose(window.id);
      return;
    }

    if (closeTimerRef.current) {
      globalThis.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = globalThis.setTimeout(() => {
      onClose(window.id);
    }, Math.round((motionTransition.duration ?? 0) * 1000));
  };

  return (
    <motion.div
      layout
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 10 }}
      animate={
        isClosing
          ? { opacity: 0, scale: 0.94, y: 8 }
          : {
              opacity: 1,
              scale: window.focused ? 1 : 0.995,
              y: window.isMinimized ? 6 : 0,
              height: window.isMinimized ? 44 : window.height,
            }
      }
      transition={motionTransition}
      className={`pointer-events-auto absolute z-10 overflow-hidden rounded-[18px] border bg-[#141414]/90 backdrop-blur-xl ${window.focused ? "border-primary/40" : "border-white/10"}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${window.title} window`}
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
        role="toolbar"
        aria-label="Window controls"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary" aria-hidden="true">{window.icon}</span>
          <span className="text-sm font-medium text-white">{window.title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label={`Minimize ${window.title} window`}
            onPointerDown={(event) => {
              event.stopPropagation();
              event.preventDefault();
            }}
            onPointerEnter={() => playSound("ui", "hover")}
            onClick={(event) => {
              event.stopPropagation();
              toggleWindowMinimize(window.id);
            }}
            className="rounded-full border border-white/10 px-2 py-1 text-xs text-secondary transition hover:border-primary/40 hover:text-primary"
          >
            <span aria-hidden="true">—</span>
          </button>
          <button
            type="button"
            aria-label={window.isMaximized ? `Restore ${window.title} window` : `Maximize ${window.title} window`}
            onPointerDown={(event) => {
              event.stopPropagation();
              event.preventDefault();
            }}
            onPointerEnter={() => playSound("ui", "hover")}
            onClick={(event) => {
              event.stopPropagation();
              toggleWindowMaximize(window.id);
            }}
            className="rounded-full border border-white/10 px-2 py-1 text-xs text-secondary transition hover:border-primary/40 hover:text-primary"
          >
            <span aria-hidden="true">{window.isMaximized ? "▭" : "▢"}</span>
          </button>
          <button
            type="button"
            aria-label={`Close ${window.title} window`}
            onPointerDown={(event) => {
              event.stopPropagation();
              event.preventDefault();
            }}
            onPointerEnter={() => playSound("ui", "hover")}
            onClick={(event) => {
              event.stopPropagation();
              handleClose();
            }}
            className="rounded-full border border-white/10 px-2 py-1 text-xs text-secondary transition hover:border-primary/40 hover:text-primary"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
      </div>

      <div className="h-[calc(100%-44px)] bg-[#0d0d0d]/70 p-4 text-sm text-secondary" role="region" aria-label={`${window.title} content`}>
        {!isContentReady ? (
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={createTransition("entrance", { reducedMotion: prefersReducedMotion })}
            className="h-full"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-white/10" />
              <div className="h-4 w-16 rounded bg-white/10" />
            </div>
            <SkeletonCard className="mb-3" />
            <SkeletonList count={2} />
          </motion.div>
        ) : (
          <motion.div
            key={window.id}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={createTransition("window", { reducedMotion: prefersReducedMotion })}
            className="h-full"
          >
            {window.id === "projects" ? (
              <ProjectsModule />
            ) : window.id === "resume" ? (
              <ResumeModule />
            ) : window.id === "skills" ? (
              <SkillsModule />
            ) : window.id === "timeline" ? (
              <TimelineModule />
            ) : window.id === "studio" ? (
              <StudioModule />
            ) : window.id === "discography" ? (
              <DiscographyModule />
            ) : window.id === "audioPlayer" ? (
              <AudioPlayerModule />
            ) : window.id === "equipment" ? (
              <EquipmentModule />
            ) : window.id === "terminal" ? (
              <TerminalModule />
            ) : window.id === "settings" ? (
              <SettingsModule />
            ) : window.id === "aiLab" ? (
              <AiLabModule />
            ) : window.id === "debugConsole" ? (
              <DebugConsoleModule />
            ) : window.id === "code-studio" ? (
              <CodeStudioModule />
            ) : (
              <p className="text-sm leading-7">{window.title} module placeholder. The window engine is now ready for future modules.</p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
