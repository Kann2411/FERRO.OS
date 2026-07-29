"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { MusicVisualizer } from "@/features/audio-player/components/music-visualizer";
import { MusicModuleShell } from "@/features/music/components/music-module-shell";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TrackData {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
  accent: string;
}

const tracks: TrackData[] = [
  {
    id: 1,
    title: "Night Shift",
    artist: "Kristian Vale",
    album: "Midnight Pulse",
    duration: 214,
    accent: "from-primary/30 via-white/10 to-primary/10",
  },
  {
    id: 2,
    title: "Neon Drift",
    artist: "Kristian Vale",
    album: "Neon Drift",
    duration: 196,
    accent: "from-cyan-500/20 via-white/10 to-cyan-400/10",
  },
  {
    id: 3,
    title: "Velvet Circuit",
    artist: "Kristian Vale",
    album: "Velvet Circuit",
    duration: 238,
    accent: "from-fuchsia-500/20 via-white/10 to-fuchsia-400/10",
  },
];

export function AudioPlayerModule() {
  const prefersReducedMotion = useReducedMotion();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    const saved = window.localStorage.getItem("ferro-audio-player-state");
    if (!saved) {
      return 0;
    }

    try {
      const parsed = JSON.parse(saved) as { currentTrackIndex?: number; isPlaying?: boolean; progress?: number; volume?: number };
      return parsed.currentTrackIndex ?? 0;
    } catch {
      return 0;
    }
  });
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const saved = window.localStorage.getItem("ferro-audio-player-state");
    if (!saved) {
      return true;
    }

    try {
      const parsed = JSON.parse(saved) as { currentTrackIndex?: number; isPlaying?: boolean; progress?: number; volume?: number };
      return parsed.isPlaying ?? true;
    } catch {
      return true;
    }
  });
  const [progress, setProgress] = useState(() => {
    if (typeof window === "undefined") {
      return 42;
    }

    const saved = window.localStorage.getItem("ferro-audio-player-state");
    if (!saved) {
      return 42;
    }

    try {
      const parsed = JSON.parse(saved) as { currentTrackIndex?: number; isPlaying?: boolean; progress?: number; volume?: number };
      return parsed.progress ?? 42;
    } catch {
      return 42;
    }
  });
  const [volume, setVolume] = useState(() => {
    if (typeof window === "undefined") {
      return 72;
    }

    const saved = window.localStorage.getItem("ferro-audio-player-state");
    if (!saved) {
      return 72;
    }

    try {
      const parsed = JSON.parse(saved) as { currentTrackIndex?: number; isPlaying?: boolean; progress?: number; volume?: number };
      return parsed.volume ?? 72;
    } catch {
      return 72;
    }
  });

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= currentTrack.duration) {
          setCurrentTrackIndex((index) => (index + 1) % tracks.length);
          return 0;
        }

        return prev + 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [currentTrack.duration, isPlaying]);

  useEffect(() => {
    setProgress(0);
  }, [currentTrackIndex]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      "ferro-audio-player-state",
      JSON.stringify({ currentTrackIndex, isPlaying, progress, volume }),
    );
  }, [currentTrackIndex, isPlaying, progress, volume]);

  const formattedTime = useMemo(() => {
    const formatValue = (value: number) => `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
    return {
      current: formatValue(progress),
      total: formatValue(currentTrack.duration),
    };
  }, [currentTrack.duration, progress]);

  const handlePrevious = () => {
    setCurrentTrackIndex((index) => (index - 1 + tracks.length) % tracks.length);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentTrackIndex((index) => (index + 1) % tracks.length);
    setProgress(0);
  };

  return (
    <MusicModuleShell eyebrow="Media player" title="Audio Player" badge={isPlaying ? "Playing" : "Paused"}>
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
        className="rounded-[24px] border border-white/10 bg-[#121212]/80 p-4"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-[22px] bg-gradient-to-br ${currentTrack.accent} text-3xl text-primary`}>
            ♫
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Now playing</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{currentTrack.title}</h3>
            <p className="mt-1 text-sm text-secondary">{currentTrack.artist} · {currentTrack.album}</p>
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-muted">
            <span>{formattedTime.current}</span>
            <span>{formattedTime.total}</span>
          </div>
          <input
            aria-label="Playback progress"
            type="range"
            min="0"
            max={currentTrack.duration}
            value={progress}
            onChange={(event) => setProgress(Number(event.target.value))}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous track"
              onClick={handlePrevious}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-secondary transition hover:border-primary/40 hover:text-primary"
            >
              ⏮
            </button>
            <button
              type="button"
              aria-label={isPlaying ? "Pause playback" : "Play playback"}
              onClick={() => setIsPlaying((prev) => !prev)}
              className="rounded-full border border-primary/30 bg-primary/15 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              aria-label="Next track"
              onClick={handleNext}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-secondary transition hover:border-primary/40 hover:text-primary"
            >
              ⏭
            </button>
          </div>

          <div className="flex min-w-[180px] items-center gap-2 text-sm text-secondary">
            <span aria-hidden="true">🔊</span>
            <input
              aria-label="Volume"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
            />
            <span>{volume}%</span>
          </div>
        </div>
      </motion.div>

      <MusicVisualizer isPlaying={isPlaying} />

      <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Queue</p>
        <div className="mt-3 space-y-2">
          {tracks.map((track, index) => (
            <button
              key={track.id}
              type="button"
              onClick={() => {
                setCurrentTrackIndex(index);
                setProgress(0);
              }}
              className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left text-sm transition ${index === currentTrackIndex ? "border-primary/30 bg-primary/10 text-white" : "border-white/10 bg-black/20 text-secondary hover:border-primary/30 hover:text-white"}`}
            >
              <span>{track.title}</span>
              <span>{track.artist}</span>
            </button>
          ))}
        </div>
      </div>
    </MusicModuleShell>
  );
}
