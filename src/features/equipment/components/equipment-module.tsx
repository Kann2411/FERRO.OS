"use client";

import { motion } from "framer-motion";
import { MusicModuleShell } from "@/features/music/components/music-module-shell";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface EquipmentItem {
  name: string;
  category: string;
  description: string;
  icon: string;
}

const equipmentByCategory: Record<string, EquipmentItem[]> = {
  DAW: [
    {
      name: "Ableton Live",
      category: "DAW",
      description: "Herramienta principal para composición, arrangement y performance en tiempo real.",
      icon: "◼",
    },
  ],
  Plugins: [
    {
      name: "Serum",
      category: "Plugins",
      description: "Sintetizador polifónico para texturas, pads y leads con una identidad sonora clara.",
      icon: "◧",
    },
    {
      name: "FabFilter Pro-Q",
      category: "Plugins",
      description: "Procesado de equalización y control tonal con detalle profesional.",
      icon: "◫",
    },
  ],
  Monitores: [
    {
      name: "Yamaha HS8",
      category: "Monitores",
      description: "Monitores de referencia para una escucha precisa y detallada del mix.",
      icon: "◉",
    },
  ],
  Interfaces: [
    {
      name: "Universal Audio Volt",
      category: "Interfaces",
      description: "Interfaz de audio compacta para capturar y monitorear con claridad.",
      icon: "◎",
    },
  ],
  Controladores: [
    {
      name: "Push 2",
      category: "Controladores",
      description: "Controlador táctil para crear y manipular ideas rápidamente dentro del flujo creativo.",
      icon: "◌",
    },
  ],
  Micrófonos: [
    {
      name: "Shure SM58",
      category: "Micrófonos",
      description: "Micrófono versátil para voz, performance y grabaciones de estudio.",
      icon: "◍",
    },
  ],
  Hardware: [
    {
      name: "Studio Rack",
      category: "Hardware",
      description: "Sistema modular que organiza el flujo de señal y mantiene el espacio de trabajo ordenado.",
      icon: "◈",
    },
  ],
};

export function EquipmentModule() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MusicModuleShell eyebrow="Studio gear" title="Equipment" badge="Catalog">
      <div className="grid gap-4">
        {Object.entries(equipmentByCategory).map(([category, items], index) => (
          <motion.section
            key={category}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : index * 0.04, duration: prefersReducedMotion ? 0 : 0.2 }}
            className="rounded-3xl border border-white/10 bg-[#121212]/80 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-white">{category}</h3>
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted">{items.length} item{items.length > 1 ? "s" : ""}</span>
            </div>

            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {items.map((item) => (
                <article key={item.name} className="rounded-[18px] border border-white/10 bg-white/5 p-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-xl text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-muted">{item.category}</p>
                      <p className="mt-2 text-sm leading-7 text-secondary">{item.description}</p>
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
