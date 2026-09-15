"use client";

import { motion } from "framer-motion";
import { createTransition } from "@/features/animation-engine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useT } from "@/hooks/use-lang";
import type { Bilingual } from "@/lib/i18n/types";

interface Experiment {
  title: Bilingual;
  description: Bilingual;
}

const moduleKicker: Bilingual = { es: "Módulo oculto", en: "Hidden module" };
const moduleTitle: Bilingual = { es: "Laboratorio de IA", en: "AI Lab" };
const moduleIntro: Bilingual = {
  es: "Un entorno de investigación privado para los experimentos, prototipos e ideas futuras de FERRO CORE. Este laboratorio permanece oculto del escritorio principal hasta que se desbloquea mediante la exploración.",
  en: "A private research environment for FERRO CORE experiments, prototypes and future system ideas. This lab is hidden from the main desktop until unlocked through exploration.",
};
const notesTitle: Bilingual = { es: "Notas del laboratorio de IA", en: "AI Laboratory Notes" };
const notesBody: Bilingual = {
  es: "El Laboratorio de IA es un espacio oculto donde FERRO CORE guarda ideas que aún no están listas para el escritorio principal. Recompensa la curiosidad sin alterar la estructura visible del portafolio.",
  en: "The AI Lab is a hidden space where FERRO CORE stores ideas that are not yet ready for the main desktop. It rewards curiosity without breaking the portfolio's visible structure.",
};

const experiments: Experiment[] = [
  {
    title: { es: "Síntesis neuronal de prompts", en: "Neural prompt synthesis" },
    description: {
      es: "Una propuesta de prompts de escritura adaptativos que responden a la intención del usuario sin romper el flujo inmersivo.",
      en: "A proposal for responsive writing prompts that adapt to input intent without breaking immersive flow.",
    },
  },
  {
    title: { es: "Anidamiento adaptativo de interfaces", en: "Adaptive interface nesting" },
    description: {
      es: "Un sistema para integrar módulos ocultos en la estación de trabajo mediante mecánicas de revelación sensibles al contexto.",
      en: "A system for blending hidden modules into the workspace through context-sensitive reveal mechanics.",
    },
  },
  {
    title: { es: "Telemetría de descubrimiento", en: "Discovery telemetry" },
    description: {
      es: "Un motor en segundo plano que registra la curiosidad del usuario y revela pistas narrativas con el tiempo.",
      en: "A background engine that tracks user curiosity and surfaces narrative clues over time.",
    },
  },
];

export function AiLabModule() {
  const prefersReducedMotion = useReducedMotion();
  const t = useT();

  return (
    <div className="flex h-full flex-col gap-5 overflow-auto">
      <div className="rounded-[28px] border border-white/10 bg-[#0b0b0f]/90 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{t(moduleKicker)}</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{t(moduleTitle)}</h2>
        <p className="mt-3 text-sm leading-7 text-secondary">
          {t(moduleIntro)}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {experiments.map((experiment, index) => (
          <motion.article
            key={experiment.title.en}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={createTransition("panel", { reducedMotion: prefersReducedMotion, durationMultiplier: 0.9, delay: index * 0.05 })}
            className="rounded-[22px] border border-white/10 bg-[#111111]/90 p-5"
          >
            <p className="text-sm font-semibold text-white">{t(experiment.title)}</p>
            <p className="mt-3 text-sm leading-7 text-secondary">{t(experiment.description)}</p>
          </motion.article>
        ))}
      </div>

      <div className="rounded-[22px] border border-primary/30 bg-primary/10 p-5 text-sm text-secondary">
        <p className="text-xs uppercase tracking-[0.32em] text-primary">{t(notesTitle)}</p>
        <p className="mt-3 leading-7">
          {t(notesBody)}
        </p>
      </div>
    </div>
  );
}
