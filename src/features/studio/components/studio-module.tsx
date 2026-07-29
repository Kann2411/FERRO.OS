"use client";

import { motion } from "framer-motion";

interface StudioSectionData {
  title: string;
  description: string;
  tags: string[];
}

const sections: StudioSectionData[] = [
  {
    title: "Producción Musical",
    description: "Un entorno pensado para componer, editar y dar forma a ideas con precisión, profundidad y una identidad sonora clara.",
    tags: ["Composición", "Edición", "Diseño sonoro", "Narrativa musical"],
  },
  {
    title: "DJ",
    description: "Una capa de performance y selección musical orientada a la energía del set, el groove y la experiencia inmersiva.",
    tags: ["Mixing", "Transitions", "Performance", "Live sets"],
  },
  {
    title: "Equipos",
    description: "Una visión del estudio como espacio profesional, con herramientas y hardware seleccionados para un flujo de trabajo elegante.",
    tags: ["Monitores", "Interfaces", "Controladores", "Micrófonos"],
  },
  {
    title: "Software utilizado",
    description: "Un stack moderno orientado a la producción, el diseño visual y la creación de experiencias multiplataforma.",
    tags: ["DAW", "Plugins", "Herramientas creativas", "Workflow digital"],
  },
];

export function StudioModule() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">Music studio</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Studio Core</h2>
        </div>
        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
          Production environment
        </div>
      </div>

      <div className="rounded-3xl border border-primary/20 bg-primary/10 p-4 text-sm leading-8 text-secondary">
        <p className="text-[10px] uppercase tracking-[0.28em] text-primary">Studio atmosphere</p>
        <p className="mt-2 text-white">
          Una experiencia inspirada en un estudio profesional: elegante, precisa y orientada a la creación.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map((section, index) => (
          <motion.article
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.22 }}
            className="rounded-[22px] border border-white/10 bg-[#121212]/80 p-4"
          >
            <h3 className="text-base font-semibold text-white">{section.title}</h3>
            <p className="mt-3 text-sm leading-7 text-secondary">{section.description}</p>
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
