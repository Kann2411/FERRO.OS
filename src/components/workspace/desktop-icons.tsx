"use client";

const items = [
  { label: "Projects", icon: "⌘", accent: "bg-primary/20 text-primary" },
  { label: "Studio", icon: "♫", accent: "bg-white/10 text-foreground" },
  { label: "Resume", icon: "◫", accent: "bg-white/10 text-foreground" },
  { label: "Terminal", icon: ">", accent: "bg-white/10 text-foreground" },
];

export function DesktopIcons() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-surface/40 p-4 text-center transition hover:border-primary/40 hover:bg-surface/70"
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg ${item.accent}`}>
            {item.icon}
          </div>
          <span className="text-sm font-medium text-secondary transition group-hover:text-foreground">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
