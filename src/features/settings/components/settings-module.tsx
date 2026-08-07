"use client";

import { useAudio } from "@/features/audio-engine";
import { getAllWallpaperDefinitions } from "@/lib/wallpapers";
import { useWallpaperStore } from "@/store/wallpaper-store";

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function SettingsModule() {
  const { enabled, masterVolume, effectsVolume, ambientVolume, playSound, setEnabled, setMasterVolume, setEffectsVolume, setAmbientVolume } = useAudio();
  const currentWallpaper = useWallpaperStore((state) => state.current);
  const unlockedWallpapers = useWallpaperStore((state) => state.unlocked);
  const setWallpaper = useWallpaperStore((state) => state.setWallpaper);
  const wallpapers = getAllWallpaperDefinitions();

  return (
    <div className="flex h-full flex-col gap-6 overflow-auto px-4 py-4">
      <div className="rounded-3xl border border-white/10 bg-[#121212]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.24)]">
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted">Settings</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Audio Controls</h2>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Manage the audio experience for the workspace: enable or disable sound, tune volumes, and preview category samples.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-[#101010]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
          <label className="flex items-center gap-3 text-sm font-medium text-white">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) => setEnabled(event.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-black text-primary accent-primary"
            />
            Enable audio
          </label>
          <p className="mt-3 text-sm leading-6 text-secondary">
            Toggle audio across the entire environment. Your preference is saved automatically.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#101010]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
          <p className="text-sm font-medium text-white">Master volume</p>
          <div className="mt-4 flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(masterVolume * 100)}
              onChange={(event) => setMasterVolume(Number(event.target.value) / 100)}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
            />
            <span className="text-sm font-semibold text-white">{formatPercent(masterVolume)}</span>
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-[#101010]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
          <p className="text-sm font-medium text-white">Effects volume</p>
          <div className="mt-4 flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(effectsVolume * 100)}
              onChange={(event) => setEffectsVolume(Number(event.target.value) / 100)}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
            />
            <span className="text-sm font-semibold text-white">{formatPercent(effectsVolume)}</span>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#101010]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
          <p className="text-sm font-medium text-white">Ambient volume</p>
          <div className="mt-4 flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(ambientVolume * 100)}
              onChange={(event) => setAmbientVolume(Number(event.target.value) / 100)}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
            />
            <span className="text-sm font-semibold text-white">{formatPercent(ambientVolume)}</span>
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-3xl border border-white/10 bg-[#101010]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
          <p className="text-sm font-medium text-white">UI preview</p>
          <button
            type="button"
            onClick={() => playSound("ui", "click")}
            className="mt-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-primary/40 hover:bg-white/10"
          >
            Play click
          </button>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#101010]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
          <p className="text-sm font-medium text-white">Terminal preview</p>
          <button
            type="button"
            onClick={() => playSound("terminal", "type")}
            className="mt-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-primary/40 hover:bg-white/10"
          >
            Play type
          </button>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#101010]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
          <p className="text-sm font-medium text-white">Ambient preview</p>
          <button
            type="button"
            onClick={() => playSound("ambient", "drift")}
            className="mt-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-primary/40 hover:bg-white/10"
          >
            Play drift
          </button>
        </section>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#101010]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
        <p className="text-sm font-medium text-white">Hidden wallpapers</p>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Unlock secret wallpapers through exploration. Selected wallpapers remain available once discovered.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {wallpapers.map((wallpaper) => {
            const unlocked = unlockedWallpapers.includes(wallpaper.id);
            const selected = currentWallpaper === wallpaper.id;
            return (
              <article
                key={wallpaper.id}
                className={`rounded-3xl border p-4 transition ${
                  selected
                    ? "border-primary/40 bg-primary/10"
                    : unlocked
                    ? "border-white/10 bg-white/5"
                    : "border-white/10 bg-white/5 opacity-60"
                }`}
              >
                <div
                  className="h-24 rounded-2xl border border-white/10"
                  style={{ background: wallpaper.preview }}
                />
                <p className="mt-3 text-sm font-semibold text-white">{wallpaper.name}</p>
                <p className="mt-1 text-sm leading-6 text-secondary">{wallpaper.description}</p>
                <button
                  type="button"
                  disabled={!unlocked || selected}
                  onClick={() => setWallpaper(wallpaper.id)}
                  className={`mt-4 inline-flex h-9 w-full items-center justify-center rounded-full border px-3 text-sm font-medium transition ${
                    selected
                      ? "border-primary/50 bg-primary/20 text-primary"
                      : unlocked
                      ? "border-white/10 bg-white/10 text-white hover:border-primary/40 hover:bg-primary/10"
                      : "cursor-not-allowed border-white/10 bg-white/5 text-secondary"
                  }`}
                >
                  {selected ? "Selected" : unlocked ? "Select" : "Locked"}
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-[#101010]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)]">
        <p className="text-sm font-medium text-white">Audio state</p>
        <p className="mt-2 text-sm leading-6 text-secondary">
          Audio settings persist between sessions and update immediately as you adjust the sliders.
        </p>
      </div>
    </div>
  );
}
