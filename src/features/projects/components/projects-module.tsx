"use client";

import { motion } from "framer-motion";

interface ProjectCardData {
  title: string;
  summary: string;
  stack: string[];
  status: string;
  impact: string;
}

const projects: ProjectCardData[] = [
  {
    title: "FERRO.OS",
    summary: "A cinematic operating system experience that blends portfolio, exploration and immersive product storytelling.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    status: "Active",
    impact: "Immersive product experience",
  },
  {
    title: "Audio Intelligence Studio",
    summary: "A modular interface for composing, exploring and presenting sound-driven digital experiences.",
    stack: ["React", "Zustand", "Motion UI", "Design Systems"],
    status: "Exploration",
    impact: "Creative workflow interface",
  },
  {
    title: "Developer Systems",
    summary: "A reusable toolkit for visual systems, window composition and modular product surfaces.",
    stack: ["TypeScript", "Component Architecture", "Design Tokens"],
    status: "Foundation",
    impact: "Reusable operating system layer",
  },
];

export function ProjectsModule() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">Developer portfolio</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Selected systems</h2>
        </div>
        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
          {projects.length} active
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-6 text-center text-sm text-secondary">
          No projects are available yet. This state is ready to support future API-driven content.
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
              className="rounded-[22px] border border-white/10 bg-[#121212]/80 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.22)]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-white">{project.title}</h3>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-primary">
                  {project.status}
                </span>
              </div>

              <p className="mt-3 text-sm leading-7 text-secondary">{project.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-secondary">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-secondary">
                <span className="text-[10px] uppercase tracking-[0.28em] text-muted">Impact</span>
                <p className="mt-2 text-white">{project.impact}</p>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm text-secondary">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Future-ready</p>
        <p className="mt-2 leading-7">
          The structure is prepared to consume project data from an API in later phases without changing the module surface.
        </p>
      </div>
    </div>
  );
}
