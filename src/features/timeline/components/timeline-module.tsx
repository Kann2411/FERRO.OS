"use client";

import { motion } from "framer-motion";
import { useT, useUi } from "@/hooks/use-lang";
import type { Bilingual } from "@/lib/i18n/types";

interface TimelineItem {
  version: string;
  title: Bilingual;
  description: Bilingual;
  type: "Foundation" | "Growth" | "Evolution" | "Current";
}

const timelineItems: TimelineItem[] = [
  {
    version: "0.1",
    title: { es: "Primeros pasos en programación", en: "First steps in code" },
    description: {
      es: "Los primeros proyectos y experimentos sentaron las bases de un oficio a largo plazo en el desarrollo de software.",
      en: "The first projects and experiments laid the foundation for a long-term craft in software development.",
    },
    type: "Foundation",
  },
  {
    version: "0.5",
    title: { es: "Primer trabajo con clientes", en: "First client work" },
    description: {
      es: "Los primeros proyectos profesionales marcaron el ritmo de construir para usuarios reales y limitaciones reales.",
      en: "Early professional projects introduced the rhythm of building for real users and real constraints.",
    },
    type: "Growth",
  },
  {
    version: "1.2",
    title: { es: "Desarrollo de producto full-stack", en: "Full-stack product development" },
    description: {
      es: "El trabajo evolucionó hacia sistemas completos, interfaces y pensamiento de producto con una base técnica más sólida.",
      en: "The work evolved toward complete systems, interfaces and product thinking with a stronger technical core.",
    },
    type: "Evolution",
  },
  {
    version: "2.0",
    title: { es: "Comienza la producción musical", en: "Music production begins" },
    description: {
      es: "Las identidades creativa y técnica comenzaron a converger en un enfoque experiencial y sonoro del trabajo digital.",
      en: "Creative and technical identities started converging around an experiential and sonic approach to digital work.",
    },
    type: "Evolution",
  },
  {
    version: "3.0",
    title: { es: "Se crea FERRO.OS", en: "FERRO.OS created" },
    description: {
      es: "El capítulo actual reúne ingeniería, narrativa, diseño y sonido en una experiencia de sistema operativo inmersiva.",
      en: "The current chapter brings together engineering, storytelling, design and sound into one immersive operating system experience.",
    },
    type: "Current",
  },
];

const typeStyles: Record<TimelineItem["type"], string> = {
  Foundation: "border-white/10 bg-white/5 text-secondary",
  Growth: "border-primary/20 bg-primary/10 text-primary",
  Evolution: "border-white/10 bg-[#151515] text-secondary",
  Current: "border-primary/30 bg-primary/10 text-primary",
};

const typeLabels: Record<TimelineItem["type"], Bilingual> = {
  Foundation: { es: "Fundación", en: "Foundation" },
  Growth: { es: "Crecimiento", en: "Growth" },
  Evolution: { es: "Evolución", en: "Evolution" },
  Current: { es: "Actual", en: "Current" },
};

export function TimelineModule() {
  const t = useT();
  const tUi = useUi();

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("professionalEvolution")}</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{tUi("operatingSystemTimeline")}</h2>
        </div>
        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
          {tUi("verticalJourney")}
        </div>
      </div>

      <div className="relative space-y-4">
        <div className="absolute left-4 top-0 h-full w-px bg-white/10" />

        {timelineItems.map((item, index) => (
          <motion.div
            key={item.version}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.25 }}
            className="relative pl-10"
          >
            <div className="absolute left-2.5 top-4 h-3 w-3 rounded-full border border-primary/40 bg-primary" />
            <div className={`rounded-[22px] border p-4 ${typeStyles[item.type]}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{tUi("versionLabel")} {item.version}</p>
                  <h3 className="mt-1 text-base font-semibold text-white">{t(item.title)}</h3>
                </div>
                <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-secondary">
                  {t(typeLabels[item.type])}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-secondary">{t(item.description)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
