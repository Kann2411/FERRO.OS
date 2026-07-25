"use client";

import { motion } from "framer-motion";

interface SkillGroup {
  category: string;
  level: string;
  experience: string;
  technologies: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    level: "Advanced",
    experience: "8+ years crafting immersive interfaces and product experiences.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    category: "Backend",
    level: "Advanced",
    experience: "Strong experience building APIs, services and modular systems.",
    technologies: ["Node.js", "Express", "REST APIs", "GraphQL", "Serverless"],
  },
  {
    category: "Databases",
    level: "Intermediate",
    experience: "Comfortable designing reliable data models and persistence layers.",
    technologies: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    category: "Cloud",
    level: "Intermediate",
    experience: "Experience deploying and scaling modern product infrastructure.",
    technologies: ["Vercel", "AWS", "Docker", "CI/CD"],
  },
  {
    category: "DevOps",
    level: "Intermediate",
    experience: "Focused on automation, delivery quality and efficient workflows.",
    technologies: ["GitHub Actions", "Linux", "Monitoring", "Infrastructure as Code"],
  },
  {
    category: "IA",
    level: "Exploratory",
    experience: "Exploring AI-assisted product development and smart interfaces.",
    technologies: ["LLM workflows", "Prompt design", "Automation", "RAG concepts"],
  },
  {
    category: "Tools",
    level: "Advanced",
    experience: "Comfortable across design, development and product delivery tools.",
    technologies: ["VS Code", "Figma", "Git", "Notion", "Docker"],
  },
];

export function SkillsModule() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">Technology stack</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Core capabilities</h2>
        </div>
        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
          {skillGroups.length} categories
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {skillGroups.map((group, index) => (
          <motion.article
            key={group.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.25 }}
            className="rounded-[22px] border border-white/10 bg-[#121212]/80 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-white">{group.category}</h3>
                <p className="mt-2 text-sm text-secondary">{group.experience}</p>
              </div>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-primary">
                {group.level}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {group.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-secondary">
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-secondary">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Flexible data model</p>
        <p className="mt-2">
          This module is prepared to evolve into a richer API-driven skills matrix without changing the presentation layer.
        </p>
      </div>
    </div>
  );
}
