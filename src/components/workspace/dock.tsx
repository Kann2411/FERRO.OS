"use client";

const apps = ["◉", "◌", "◍", "◎"];

export function Dock() {
  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-surface/70 px-3 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl">
      {apps.map((app, index) => (
        <button
          key={app + index}
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/20 text-lg text-secondary transition hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
        >
          {app}
        </button>
      ))}
    </div>
  );
}
