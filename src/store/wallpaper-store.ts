"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultWallpaperId, type WallpaperId } from "@/lib/wallpapers";

interface WallpaperStoreState {
  current: WallpaperId;
  unlocked: WallpaperId[];
  setWallpaper: (id: WallpaperId) => void;
  unlockWallpaper: (id: WallpaperId) => void;
}

export const WALLPAPER_STORAGE_KEY = "ferro-os-wallpaper";

export const useWallpaperStore = create<WallpaperStoreState>()(
  persist(
    (set, get) => ({
      current: defaultWallpaperId,
      unlocked: [defaultWallpaperId],
      setWallpaper: (id) => {
        const unlocked = get().unlocked;
        if (!unlocked.includes(id)) {
          return;
        }
        set({ current: id });
      },
      unlockWallpaper: (id) =>
        set((state) =>
          state.unlocked.includes(id)
            ? state
            : { unlocked: [...state.unlocked, id] }
        ),
    }),
    {
      name: WALLPAPER_STORAGE_KEY,
      partialize: (state) => ({ current: state.current, unlocked: state.unlocked }),
    }
  )
);
