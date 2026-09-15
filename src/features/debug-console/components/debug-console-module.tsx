"use client";

import { motion } from "framer-motion";
import { createTransition } from "@/features/animation-engine";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLang, useT } from "@/hooks/use-lang";

export function DebugConsoleModule() {
  const { explorerProfile, activeMission } = useFerroCore();
  const prefersReducedMotion = useReducedMotion();
  const lang = useLang();
  const t = useT();
  const es = lang === "es";

  const entries = [
    { label: es ? "Explorador" : "Explorer", value: explorerProfile.name },
    { label: es ? "Progreso" : "Progress", value: `${Math.round(explorerProfile.progress)}%` },
    { label: es ? "Módulos descubiertos" : "Modules discovered", value: `${explorerProfile.modulesDiscovered}` },
    { label: es ? "Archivos ocultos descubiertos" : "Hidden files discovered", value: `${explorerProfile.discoveredHiddenFiles.length}` },
    { label: es ? "Misiones completadas" : "Completed missions", value: `${Object.values(explorerProfile.missionProgress).filter(Boolean).length}` },
    { label: es ? "Misión actual" : "Current mission", value: activeMission ? t(activeMission.title) : es ? "Ninguna" : "None" },
    { label: es ? "Tiempo de sesión" : "Session time", value: `${Math.floor(explorerProfile.explorationSeconds / 60)}m ${explorerProfile.explorationSeconds % 60}s` },
    { label: es ? "Primera visita" : "First visit", value: explorerProfile.firstVisit ?? (es ? "Desconocida" : "Unknown") },
    { label: es ? "Último guardado" : "Last saved", value: explorerProfile.lastSavedAt ?? (es ? "No disponible" : "Not available") },
  ];

  return (
    <div className="flex h-full flex-col gap-5 overflow-auto">
      <div className="rounded-[28px] border border-white/10 bg-[#0b0b0f]/90 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{es ? "Consola oculta" : "Hidden console"}</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{es ? "Consola de depuración" : "Debug Console"}</h2>
        <p className="mt-3 text-sm leading-7 text-secondary">
          {es
            ? "Una interfaz de diagnóstico de solo lectura que revela el estado interno de FERRO.OS y notas ocultas. Esta consola es intencionalmente solo informativa."
            : "A read-only diagnostics interface that reveals FERRO.OS internal status and hidden notes. This console is intentionally informational only."}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {entries.map((entry, index) => (
          <motion.article
            key={entry.label}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={createTransition("panel", { reducedMotion: prefersReducedMotion, durationMultiplier: 0.9, delay: index * 0.03 })}
            className="rounded-[22px] border border-white/10 bg-[#111111]/90 p-5"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-muted">{entry.label}</p>
            <p className="mt-2 text-lg font-medium text-white">{entry.value}</p>
          </motion.article>
        ))}
      </div>

      <div className="rounded-[22px] border border-primary/30 bg-primary/10 p-5 text-sm text-secondary">
        <p className="text-xs uppercase tracking-[0.32em] text-primary">{es ? "Notas de la consola" : "Console notes"}</p>
        <p className="mt-3 leading-7">
          {es
            ? "Esta consola de depuración expone metadatos del sistema, telemetría de exploración y contexto de mensajes ocultos. No permite cambios de estado ni control directo de FERRO.OS."
            : "This debug console surfaces system metadata, exploration telemetry, and hidden message context. It does not permit state changes or direct control of FERRO.OS."}
        </p>
      </div>
    </div>
  );
}
