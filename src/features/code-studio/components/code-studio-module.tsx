"use client";

import { motion } from "framer-motion";
import { Panel, panelVariants } from "@/components/ui/panel";
import { cn } from "@/lib/cn";
import { useT } from "@/hooks/use-lang";
import type { Bilingual } from "@/lib/i18n/types";

interface StudioStat {
  label: Bilingual;
  value: Bilingual;
}

interface StudioSection {
  title: Bilingual;
  body: Bilingual;
  tags: Bilingual[];
}

const moduleKicker: Bilingual = { es: "Laboratorio de desarrollo", en: "Developer laboratory" };
const moduleTitle: Bilingual = { es: "Estudio de código", en: "Code Studio" };
const moduleBadge: Bilingual = { es: "Estación inmersiva", en: "Immersive workspace" };
const studioMetricsLabel: Bilingual = { es: "Métricas del estudio", en: "Studio metrics" };
const operatingContextLabel: Bilingual = { es: "Contexto operativo", en: "Operating context" };
const operatingContextBody: Bilingual = {
  es: "Este laboratorio presenta la mentalidad de ingeniería detrás de FERRO.OS: sistemas elegantes, interfaces expresivas y una combinación deliberada de disciplina técnica y dirección creativa.",
  en: "This laboratory presents the engineering mindset behind FERRO.OS: elegant systems, expressive interfaces and a deliberate blend of technical discipline and creative direction.",
};

const stats: StudioStat[] = [
  {
    label: { es: "Stack", en: "Stack" },
    value: { es: "React • Next • Node", en: "React • Next • Node" },
  },
  {
    label: { es: "Enfoque", en: "Focus" },
    value: { es: "Sistemas inmersivos", en: "Immersive systems" },
  },
  {
    label: { es: "Método", en: "Approach" },
    value: { es: "Mínimo y preciso", en: "Minimal and precise" },
  },
  {
    label: { es: "Modo", en: "Mode" },
    value: { es: "Producto ante todo", en: "Product-first" },
  },
];

const sections: StudioSection[] = [
  {
    title: { es: "Stack tecnológico", en: "Technology stack" },
    body: {
      es: "El entorno de desarrollo está construido en torno a herramientas frontend modernas, una arquitectura modular y un fuerte énfasis en la entrega elegante de producto.",
      en: "The development environment is shaped around modern frontend tooling, modular architecture and a strong emphasis on elegant product delivery.",
    },
    tags: [
      { es: "TypeScript", en: "TypeScript" },
      { es: "Tailwind", en: "Tailwind" },
      { es: "Framer Motion", en: "Framer Motion" },
      { es: "Zustand", en: "Zustand" },
    ],
  },
  {
    title: { es: "Filosofía de desarrollo", en: "Development philosophy" },
    body: {
      es: "Cada sistema está diseñado para sentirse intencional, rápido y coherente, tratando la experiencia de usuario como una superficie de producto de primer nivel.",
      en: "Every system is designed to feel intentional, fast and coherent, with the user experience treated as a first-class product surface.",
    },
    tags: [
      { es: "Arquitectura limpia", en: "Clean architecture" },
      { es: "UI reutilizable", en: "Reusable UI" },
      { es: "Interacción inmersiva", en: "Immersive interaction" },
    ],
  },
  {
    title: { es: "Enfoque de arquitectura", en: "Architecture approach" },
    body: {
      es: "La estación de trabajo está compuesta por sistemas en capas que permanecen modulares, extensibles y fáciles de evolucionar sin romper la experiencia.",
      en: "The workspace is composed as layered systems that remain modular, extensible and easy to evolve without breaking the experience.",
    },
    tags: [
      { es: "Motor de ventanas", en: "Window engine" },
      { es: "Módulos de funciones", en: "Feature modules" },
      { es: "Interfaces compartidas", en: "Shared interfaces" },
    ],
  },
];

export function CodeStudioModule() {
  const t = useT();

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{t(moduleKicker)}</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{t(moduleTitle)}</h2>
        </div>
        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
          {t(moduleBadge)}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Panel tone="surface" size="md">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{t(studioMetricsLabel)}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label.en}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.2 }}
                className={cn(panelVariants({ tone: "subtle", size: "sm" }))}
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{t(stat.label)}</p>
                <p className="mt-2 text-sm font-medium text-white">{t(stat.value)}</p>
              </motion.div>
            ))}
          </div>
        </Panel>

        <div className="rounded-3xl border border-primary/20 bg-primary/10 p-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-primary">{t(operatingContextLabel)}</p>
          <p className="mt-3 text-sm leading-8 text-secondary">
            {t(operatingContextBody)}
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {sections.map((section, index) => (
          <motion.article
            key={section.title.en}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
            className="rounded-[22px] border border-white/10 bg-[#121212]/80 p-4"
          >
            <h3 className="text-base font-semibold text-white">{t(section.title)}</h3>
            <p className="mt-3 text-sm leading-7 text-secondary">{t(section.body)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {section.tags.map((tag) => (
                <span key={tag.en} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-secondary">
                  {t(tag)}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
