"use client";

import { getAllWallpaperDefinitions } from "@/lib/wallpapers";
import { useWallpaperStore } from "@/store/wallpaper-store";
import { useT, useUi } from "@/hooks/use-lang";
import { Panel } from "@/components/ui/panel";

export function WallpaperSection() {
  const currentWallpaper = useWallpaperStore((state) => state.current);
  const unlockedWallpapers = useWallpaperStore((state) => state.unlocked);
  const setWallpaper = useWallpaperStore((state) => state.setWallpaper);
  const wallpapers = getAllWallpaperDefinitions();
  const t = useT();
  const tUi = useUi();

  return (
    <Panel tone="surface" size="lg" elevated>
      <p className="text-sm font-medium text-white">{tUi("hiddenWallpapers")}</p>
      <p className="mt-2 text-sm leading-6 text-secondary">{tUi("hiddenWallpapersDescription")}</p>

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
              <div className="h-24 rounded-2xl border border-white/10" style={{ background: wallpaper.preview }} />
              <p className="mt-3 text-sm font-semibold text-white">{t(wallpaper.name)}</p>
              <p className="mt-1 text-sm leading-6 text-secondary">{t(wallpaper.description)}</p>
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
                {selected ? tUi("wallpaperSelected") : unlocked ? tUi("wallpaperSelect") : tUi("wallpaperLocked")}
              </button>
            </article>
          );
        })}
      </div>
    </Panel>
  );
}
