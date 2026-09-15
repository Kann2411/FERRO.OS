"use client";

import { motion } from "framer-motion";
import { EmptyState } from "@/components/ui/empty-state";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLang, useT } from "@/hooks/use-lang";
import type { Bilingual } from "@/lib/i18n/types";

interface ReleaseCardData {
  title: string;
  year: string;
  genre: string;
  status: Bilingual;
  description: Bilingual;
  cover: string;
}

const releases: ReleaseCardData[] = [
  {
    title: "Midnight Pulse",
    year: "2024",
    genre: "Deep House",
    status: { es: "Publicado", en: "Released" },
    description: {
      es: "Un lanzamiento cinemático construido a partir de texturas atmosféricas, ritmos pulsantes y tensión nocturna.",
      en: "A cinematic release built around atmospheric textures, pulse-driven rhythm and nocturnal tension.",
    },
    cover: "◉",
  },
  {
    title: "Neon Drift",
    year: "2022",
    genre: "Progressive House",
    status: { es: "Destacado", en: "Featured" },
    description: {
      es: "Un viaje inmersivo que equilibra el movimiento melódico con una energía de club pulida.",
      en: "An immersive journey balancing melodic movement and polished club energy.",
    },
    cover: "◌",
  },
  {
    title: "Velvet Circuit",
    year: "2020",
    genre: "Electronic / Ambient",
    status: { es: "Archivado", en: "Archived" },
    description: {
      es: "Una obra más introspectiva centrada en paisajes sonoros, emoción y un diseño minimalista.",
      en: "A more introspective body of work focused on soundscapes, emotion and minimal design.",
    },
    cover: "◎",
  },
];

export function DiscographyModule() {
  const prefersReducedMotion = useReducedMotion();
  const lang = useLang();
  const t = useT();
  const es = lang === "es";

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{es ? "Catálogo musical" : "Music catalog"}</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{es ? "Discografía" : "Discography"}</h2>
        </div>
        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
          {releases.length} {es ? "lanzamientos" : "releases"}
        </div>
      </div>

      {releases.length === 0 ? (
        <EmptyState
          icon="♫"
          title={es ? "Aún no hay lanzamientos" : "No releases yet"}
          message={
            es
              ? "La discografía completa aparecerá aquí cuando se conecten los datos de producción."
              : "A full discography will appear here when production data is connected."
          }
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {releases.map((release, index) => (
            <motion.article
              key={release.title}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: prefersReducedMotion ? 0 : 0.24 }}
              className="rounded-[22px] border border-white/10 bg-[#121212]/80 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.22)]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] border border-white/10 bg-linear-to-br from-primary/20 via-white/10 to-primary/10 text-2xl text-primary">
                  {release.cover}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-white">{release.title}</h3>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-primary">
                      {t(release.status)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-secondary">{t(release.description)}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.24em] text-muted">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{release.year}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">{release.genre}</span>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm text-secondary">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{es ? "Datos listos" : "Data ready"}</p>
        <p className="mt-2 leading-7">
          {es
            ? "El módulo ya sigue una estructura lista para consumir datos de lanzamientos desde una API más adelante sin cambiar la interfaz."
            : "The module already follows a structure ready to consume release data from an API later without changing the interface."}
        </p>
      </div>
    </div>
  );
}
