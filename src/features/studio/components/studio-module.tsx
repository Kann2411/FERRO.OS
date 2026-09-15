"use client";

import { motion } from "framer-motion";
import { useT } from "@/hooks/use-lang";
import type { Bilingual } from "@/lib/i18n/types";

interface StudioSectionData {
  title: Bilingual;
  description: Bilingual;
  tags: Bilingual[];
}

const moduleKicker: Bilingual = { es: "Estudio musical", en: "Music studio" };
const moduleTitle: Bilingual = { es: "Estudio Core", en: "Studio Core" };
const moduleBadge: Bilingual = { es: "Entorno de producción", en: "Production environment" };
const atmosphereLabel: Bilingual = { es: "Atmósfera del estudio", en: "Studio atmosphere" };
const atmosphereBody: Bilingual = {
  es: "Una experiencia inspirada en un estudio profesional: elegante, precisa y orientada a la creación.",
  en: "An experience inspired by a professional studio: elegant, precise and oriented toward creation.",
};

const sections: StudioSectionData[] = [
  {
    title: { es: "Producción Musical", en: "Music Production" },
    description: {
      es: "Un entorno pensado para componer, editar y dar forma a ideas con precisión, profundidad y una identidad sonora clara.",
      en: "An environment designed to compose, edit and shape ideas with precision, depth and a clear sonic identity.",
    },
    tags: [
      { es: "Composición", en: "Composition" },
      { es: "Edición", en: "Editing" },
      { es: "Diseño sonoro", en: "Sound design" },
      { es: "Narrativa musical", en: "Musical storytelling" },
    ],
  },
  {
    title: { es: "DJ", en: "DJ" },
    description: {
      es: "Una capa de performance y selección musical orientada a la energía del set, el groove y la experiencia inmersiva.",
      en: "A performance and track-selection layer focused on the energy of the set, the groove and the immersive experience.",
    },
    tags: [
      { es: "Mezcla", en: "Mixing" },
      { es: "Transiciones", en: "Transitions" },
      { es: "Performance", en: "Performance" },
      { es: "Sets en vivo", en: "Live sets" },
    ],
  },
  {
    title: { es: "Equipos", en: "Equipment" },
    description: {
      es: "Una visión del estudio como espacio profesional, con herramientas y hardware seleccionados para un flujo de trabajo elegante.",
      en: "A vision of the studio as a professional space, with tools and hardware selected for an elegant workflow.",
    },
    tags: [
      { es: "Monitores", en: "Monitors" },
      { es: "Interfaces", en: "Interfaces" },
      { es: "Controladores", en: "Controllers" },
      { es: "Micrófonos", en: "Microphones" },
    ],
  },
  {
    title: { es: "Software utilizado", en: "Software Used" },
    description: {
      es: "Un stack moderno orientado a la producción, el diseño visual y la creación de experiencias multiplataforma.",
      en: "A modern stack focused on production, visual design and the creation of cross-platform experiences.",
    },
    tags: [
      { es: "DAW", en: "DAW" },
      { es: "Plugins", en: "Plugins" },
      { es: "Herramientas creativas", en: "Creative tools" },
      { es: "Workflow digital", en: "Digital workflow" },
    ],
  },
];

export function StudioModule() {
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

      <div className="rounded-3xl border border-primary/20 bg-primary/10 p-4 text-sm leading-8 text-secondary">
        <p className="text-[10px] uppercase tracking-[0.28em] text-primary">{t(atmosphereLabel)}</p>
        <p className="mt-2 text-white">
          {t(atmosphereBody)}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map((section, index) => (
          <motion.article
            key={section.title.en}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.22 }}
            className="rounded-[22px] border border-white/10 bg-[#121212]/80 p-4"
          >
            <h3 className="text-base font-semibold text-white">{t(section.title)}</h3>
            <p className="mt-3 text-sm leading-7 text-secondary">{t(section.description)}</p>
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
