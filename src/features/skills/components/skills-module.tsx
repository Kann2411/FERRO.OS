"use client";

import { motion } from "framer-motion";
import { useT, useUi } from "@/hooks/use-lang";
import type { Bilingual } from "@/lib/i18n/types";

interface SkillGroup {
  category: Bilingual;
  level: Bilingual;
  experience: Bilingual;
  technologies: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: { es: "Frontend", en: "Frontend" },
    level: { es: "Avanzado", en: "Advanced" },
    experience: {
      es: "Más de 8 años creando interfaces inmersivas y experiencias de producto.",
      en: "8+ years crafting immersive interfaces and product experiences.",
    },
    technologies: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    category: { es: "Backend", en: "Backend" },
    level: { es: "Avanzado", en: "Advanced" },
    experience: {
      es: "Amplia experiencia construyendo APIs, servicios y sistemas modulares.",
      en: "Strong experience building APIs, services and modular systems.",
    },
    technologies: ["Node.js", "Express", "REST APIs", "GraphQL", "Serverless"],
  },
  {
    category: { es: "Bases de datos", en: "Databases" },
    level: { es: "Intermedio", en: "Intermediate" },
    experience: {
      es: "Cómodo diseñando modelos de datos confiables y capas de persistencia.",
      en: "Comfortable designing reliable data models and persistence layers.",
    },
    technologies: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    category: { es: "Nube", en: "Cloud" },
    level: { es: "Intermedio", en: "Intermediate" },
    experience: {
      es: "Experiencia desplegando y escalando infraestructura de producto moderna.",
      en: "Experience deploying and scaling modern product infrastructure.",
    },
    technologies: ["Vercel", "AWS", "Docker", "CI/CD"],
  },
  {
    category: { es: "DevOps", en: "DevOps" },
    level: { es: "Intermedio", en: "Intermediate" },
    experience: {
      es: "Enfocado en automatización, calidad de entrega y flujos de trabajo eficientes.",
      en: "Focused on automation, delivery quality and efficient workflows.",
    },
    technologies: ["GitHub Actions", "Linux", "Monitoring", "Infrastructure as Code"],
  },
  {
    category: { es: "IA", en: "AI" },
    level: { es: "Exploratorio", en: "Exploratory" },
    experience: {
      es: "Explorando el desarrollo de producto asistido por IA e interfaces inteligentes.",
      en: "Exploring AI-assisted product development and smart interfaces.",
    },
    technologies: ["LLM workflows", "Prompt design", "Automation", "RAG concepts"],
  },
  {
    category: { es: "Herramientas", en: "Tools" },
    level: { es: "Avanzado", en: "Advanced" },
    experience: {
      es: "Cómodo con herramientas de diseño, desarrollo y entrega de producto.",
      en: "Comfortable across design, development and product delivery tools.",
    },
    technologies: ["VS Code", "Figma", "Git", "Notion", "Docker"],
  },
];

export function SkillsModule() {
  const t = useT();
  const tUi = useUi();

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("technologyStackKicker")}</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{tUi("coreCapabilities")}</h2>
        </div>
        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
          {skillGroups.length} {tUi("categoriesLabel")}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {skillGroups.map((group, index) => (
          <motion.article
            key={t(group.category)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.25 }}
            className="rounded-[22px] border border-white/10 bg-[#121212]/80 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-white">{t(group.category)}</h3>
                <p className="mt-2 text-sm text-secondary">{t(group.experience)}</p>
              </div>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-primary">
                {t(group.level)}
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
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{tUi("flexibleDataModel")}</p>
        <p className="mt-2">
          {tUi("flexibleDataModelMessage")}
        </p>
      </div>
    </div>
  );
}
