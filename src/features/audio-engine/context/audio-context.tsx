"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AudioCategory } from "@/features/audio-engine/types";

export interface AudioState {
  enabled: boolean;
  masterVolume: number;
  effectsVolume: number;
  ambientVolume: number;
}

export interface AudioContextValue extends AudioState {
  playSound: (category: AudioCategory, name: string) => void;
  stopSound: (category: AudioCategory, name: string) => void;
  setEnabled: (enabled: boolean) => void;
  setMasterVolume: (volume: number) => void;
  setEffectsVolume: (volume: number) => void;
  setAmbientVolume: (volume: number) => void;
}

const defaultState: AudioState = {
  enabled: true,
  masterVolume: 0.75,
  effectsVolume: 0.8,
  ambientVolume: 0.4,
};

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(defaultState.enabled);
  const [masterVolume, setMasterVolume] = useState(defaultState.masterVolume);
  const [effectsVolume, setEffectsVolume] = useState(defaultState.effectsVolume);
  const [ambientVolume, setAmbientVolume] = useState(defaultState.ambientVolume);

  const [audioMap] = useState<Map<string, HTMLAudioElement>>(() => new Map());

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    try {
      const stored = window.localStorage.getItem("ferro-audio-settings");
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored) as Partial<AudioState>;
      if (typeof parsed.enabled === "boolean") {
        setEnabled(parsed.enabled);
      }
      if (typeof parsed.masterVolume === "number") {
        setMasterVolume(parsed.masterVolume);
      }
      if (typeof parsed.effectsVolume === "number") {
        setEffectsVolume(parsed.effectsVolume);
      }
      if (typeof parsed.ambientVolume === "number") {
        setAmbientVolume(parsed.ambientVolume);
      }
    } catch {
      // ignore invalid stored audio settings
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(
        "ferro-audio-settings",
        JSON.stringify({ enabled, masterVolume, effectsVolume, ambientVolume }),
      );
    } catch {
      // ignore write errors
    }
  }, [enabled, masterVolume, effectsVolume, ambientVolume]);

  const loadAudio = useCallback((category: AudioCategory, name: string): HTMLAudioElement | null => {
    const key = `${category}:${name}`;
    const existing = audioMap.get(key);
    if (existing) {
      return existing;
    }

    const src = `/audio/${category}/${name}.mp3`;
    const element = new Audio(src);
    element.preload = "auto";
    audioMap.set(key, element);
    return element;
  }, [audioMap]);

  const stopSound = useCallback(
    (category: AudioCategory, name: string) => {
      const audio = loadAudio(category, name);
      if (!audio) {
        return;
      }

      audio.pause();
      audio.currentTime = 0;
    },
    [loadAudio],
  );

  const playSound = useCallback(
    (category: AudioCategory, name: string) => {
      if (!enabled) {
        return;
      }

      const audio = loadAudio(category, name);
      if (!audio) {
        return;
      }

      audio.volume = masterVolume * (category === "ambient" ? ambientVolume : effectsVolume);
      audio.loop = category === "ambient";
      audio.currentTime = 0;
      audio.play().catch(() => {
        // ignore playback failures due user interaction requirements
      });
    },
    [ambientVolume, enabled, effectsVolume, loadAudio, masterVolume],
  );

  const value = useMemo<AudioContextValue>(
    () => ({ enabled, masterVolume, effectsVolume, ambientVolume, playSound, stopSound, setEnabled, setMasterVolume, setEffectsVolume, setAmbientVolume }),
    [ambientVolume, enabled, effectsVolume, masterVolume, playSound, stopSound],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }

  return context;
}
