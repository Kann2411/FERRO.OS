"use client";

import { motion } from "framer-motion";

interface StudioStat {
  label: string;
  value: string;
}

interface StudioSection {
  title: string;
  body: string;
  tags: string[];
}

const stats: StudioStat[] = [
  { label: "Stack", value: "React • Next • Node" },
  { label: "Focus", value: "Immersive systems" },
  { label: "Approach", value: "Minimal and precise" },
  { label: "Mode", value: "Product-first" },
];

const sections: StudioSection[] = [
  {
    title: "Technology stack",
    body: "The development environment is shaped around modern frontend tooling, modular architecture and a strong emphasis on elegant product delivery.",
    tags: ["TypeScript", "Tailwind", "Framer Motion", "Zustand"],
  },
  {
    title: "Development philosophy",
    body: "Every system is designed to feel intentional, fast and coherent, with the user experience treated as a first-class product surface.",
    tags: ["Clean architecture", "Reusable UI", "Immersive interaction"],
  },
  {
    title: "Architecture approach",
    body: "The workspace is composed as layered systems that remain modular, extensible and easy to evolve without breaking the experience.",
    tags: ["Window engine", "Feature modules", "Shared interfaces"],
  },
];

export function CodeStudioModule() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">Developer laboratory</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Code Studio</h2>
        </div>
        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
          Immersive workspace
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl border border-white/10 bg-[#121212]/80 p-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Studio metrics</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.2 }}
                className="rounded-[18px] border border-white/10 bg-white/5 p-3"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{stat.label}</p>
                <p className="mt-2 text-sm font-medium text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-primary/20 bg-primary/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-primary">Operating context</p>
          <p className="mt-3 text-sm leading-8 text-secondary">
            This laboratory presents the engineering mindset behind FERRO.OS: elegant systems, expressive interfaces and a deliberate blend of technical discipline and creative direction.
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {sections.map((section, index) => (
          <motion.article
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
            className="rounded-[22px] border border-white/10 bg-[#121212]/80 p-4"
          >
            <h3 className="text-base font-semibold text-white">{section.title}</h3>
            <p className="mt-3 text-sm leading-7 text-secondary">{section.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {section.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
