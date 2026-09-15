"use client";

import { motion } from "framer-motion";
import { MusicModuleShell } from "@/features/music/components/music-module-shell";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLang, useT } from "@/hooks/use-lang";
import { panelVariants } from "@/components/ui/panel";
import { cn } from "@/lib/cn";
import type { Bilingual } from "@/lib/i18n/types";

type CategoryKey = "daw" | "plugins" | "monitors" | "interfaces" | "controllers" | "microphones" | "hardware";

const categoryLabels: Record<CategoryKey, Bilingual> = {
  daw: { es: "DAW", en: "DAW" },
  plugins: { es: "Plugins", en: "Plugins" },
  monitors: { es: "Monitores", en: "Monitors" },
  interfaces: { es: "Interfaces", en: "Interfaces" },
  controllers: { es: "Controladores", en: "Controllers" },
  microphones: { es: "Micrófonos", en: "Microphones" },
  hardware: { es: "Hardware", en: "Hardware" },
};

interface EquipmentItem {
  name: string;
  category: CategoryKey;
  description: Bilingual;
  icon: string;
}

const equipmentByCategory: Record<CategoryKey, EquipmentItem[]> = {
  daw: [
    {
      name: "Ableton Live",
      category: "daw",
      description: {
        es: "Herramienta principal para composición, arrangement y performance en tiempo real.",
        en: "Primary tool for composition, arrangement, and real-time performance.",
      },
      icon: "◼",
    },
  ],
  plugins: [
    {
      name: "Serum",
      category: "plugins",
      description: {
        es: "Sintetizador polifónico para texturas, pads y leads con una identidad sonora clara.",
        en: "Polyphonic synthesizer for textures, pads, and leads with a distinct sonic identity.",
      },
      icon: "◧",
    },
    {
      name: "FabFilter Pro-Q",
      category: "plugins",
      description: {
        es: "Procesado de ecualización y control tonal con detalle profesional.",
        en: "Equalization processing and tonal control with professional-grade detail.",
      },
      icon: "◫",
    },
  ],
  monitors: [
    {
      name: "Yamaha HS8",
      category: "monitors",
      description: {
        es: "Monitores de referencia para una escucha precisa y detallada del mix.",
        en: "Reference monitors for precise, detailed mix listening.",
      },
      icon: "◉",
    },
  ],
  interfaces: [
    {
      name: "Universal Audio Volt",
      category: "interfaces",
      description: {
        es: "Interfaz de audio compacta para capturar y monitorear con claridad.",
        en: "Compact audio interface for clear capture and monitoring.",
      },
      icon: "◎",
    },
  ],
  controllers: [
    {
      name: "Push 2",
      category: "controllers",
      description: {
        es: "Controlador táctil para crear y manipular ideas rápidamente dentro del flujo creativo.",
        en: "Tactile controller for quickly creating and shaping ideas within the creative flow.",
      },
      icon: "◌",
    },
  ],
  microphones: [
    {
      name: "Shure SM58",
      category: "microphones",
      description: {
        es: "Micrófono versátil para voz, performance y grabaciones de estudio.",
        en: "Versatile microphone for vocals, live performance, and studio recording.",
      },
      icon: "◍",
    },
  ],
  hardware: [
    {
      name: "Studio Rack",
      category: "hardware",
      description: {
        es: "Sistema modular que organiza el flujo de señal y mantiene el espacio de trabajo ordenado.",
        en: "Modular system that organizes signal flow and keeps the workspace tidy.",
      },
      icon: "◈",
    },
  ],
};

export function EquipmentModule() {
  const prefersReducedMotion = useReducedMotion();
  const lang = useLang();
  const t = useT();
  const es = lang === "es";

  return (
    <MusicModuleShell
      eyebrow={es ? "Equipo de estudio" : "Studio gear"}
      title={es ? "Equipo" : "Equipment"}
      badge={es ? "Catálogo" : "Catalog"}
    >
      <div className="grid gap-4">
        {(Object.entries(equipmentByCategory) as [CategoryKey, EquipmentItem[]][]).map(([category, items], index) => (
          <motion.section
            key={category}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : index * 0.04, duration: prefersReducedMotion ? 0 : 0.2 }}
            className={cn(panelVariants({ tone: "surface", size: "md" }))}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-white">{t(categoryLabels[category])}</h3>
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted">
                {items.length} {es ? (items.length === 1 ? "elemento" : "elementos") : `item${items.length > 1 ? "s" : ""}`}
              </span>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {items.map((item) => (
                <article key={item.name} className={cn(panelVariants({ tone: "subtle", size: "sm" }))}>
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-xl text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-muted">{t(categoryLabels[item.category])}</p>
                      <p className="mt-2 text-sm leading-7 text-secondary">{t(item.description)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </MusicModuleShell>
  );
}
