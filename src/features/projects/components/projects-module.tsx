"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/ui/empty-state";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useT, useUi } from "@/hooks/use-lang";
import type { Bilingual } from "@/lib/i18n/types";

interface ProjectCardData {
  title: string;
  image: string;
  role: Bilingual;
  summary: Bilingual;
  stack: string[];
  status: Bilingual;
  impact: Bilingual;
}

/**
 * Real project history, ordered with FERRO.OS and the three most significant projects first
 * (per the explorer's own ranking), followed by earlier work and freelance restaurant sites.
 * Images are placeholders from /public/images/ejemplo*.jpg until real screenshots are supplied.
 */
const projects: ProjectCardData[] = [
  {
    title: "FERRO.OS",
    image: "/images/OG.jpg",
    role: { es: "Full stack (proyecto personal)", en: "Full stack (personal project)" },
    summary: {
      es: "Sistema operativo de portafolio construido con Next.js: ventanas, misiones de exploración y una arquitectura de módulos pensada para escalar sin reescribirse.",
      en: "A portfolio operating system built with Next.js: windows, exploration missions and a module architecture designed to scale without being rewritten.",
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Framer Motion"],
    status: { es: "Activo", en: "Active" },
    impact: {
      es: "Arquitectura modular lista para crecer con nuevos módulos",
      en: "Modular architecture ready to grow with new modules",
    },
  },
  {
    title: "Royal Games Casino",
    image: "/images/ejemplo3.jpg",
    role: { es: "Arquitectura backend", en: "Backend architecture" },
    summary: {
      es: "Plataforma de casino online. Diseñé la arquitectura del backend en NestJS (autenticación con JWT, WebSockets para juego en tiempo real y pagos con MercadoPago y PayPal) junto al cliente en React.",
      en: "An online casino platform. I designed the NestJS backend architecture (JWT authentication, WebSockets for real-time gameplay, and MercadoPago and PayPal payments) alongside the React client.",
    },
    stack: ["NestJS", "TypeORM", "PostgreSQL", "WebSockets", "JWT", "MercadoPago", "PayPal", "React", "Redux", "Three.js"],
    status: { es: "Producción", en: "Production" },
    impact: {
      es: "Arquitectura backend escalable para pagos y juego en tiempo real",
      en: "Scalable backend architecture for payments and real-time gameplay",
    },
  },
  {
    title: "El Galpón de José",
    image: "/images/ejemplo1.jpg",
    role: { es: "Backend, en equipo", en: "Backend, in a team" },
    summary: {
      es: "Plataforma de gestión para un gimnasio: membresías y pagos con MercadoPago. Como backend del equipo, implementé autenticación con JWT, middlewares de seguridad, corrección de bugs y el despliegue de backend y frontend.",
      en: "A management platform for a gym: memberships and MercadoPago payments. As the team's backend developer, I implemented JWT authentication, security middlewares, bug fixes, and the deployment of both the backend and frontend.",
    },
    stack: ["NestJS", "TypeORM", "PostgreSQL", "JWT", "Passport", "MercadoPago"],
    status: { es: "Completado", en: "Completed" },
    impact: {
      es: "Seguridad, pagos y despliegue de una plataforma en producción",
      en: "Security, payments and deployment for a live platform",
    },
  },
  {
    title: "Jcov KTM",
    image: "/images/ejemplo4.jpg",
    role: { es: "Full stack (solo)", en: "Full stack (solo)" },
    summary: {
      es: "Sitio web para el productor musical Jcov KTM, con una identidad visual propia para presentar su música y trabajo.",
      en: "A website for music producer Jcov KTM, with its own visual identity to showcase his music and work.",
    },
    stack: ["React", "Vite", "Tailwind CSS"],
    status: { es: "Activo", en: "Active" },
    impact: {
      es: "Landing page de artista con identidad visual propia",
      en: "Artist landing page with its own visual identity",
    },
  },
  {
    title: "HabitForge",
    image: "/images/ejemplo1.jpg",
    role: { es: "Full stack (solo)", en: "Full stack (solo)" },
    summary: {
      es: "Aplicación móvil para Android, empaquetada con Capacitor, para forjar buenos hábitos: seguimiento diario y funcionamiento offline mediante un service worker.",
      en: "A mobile app for Android, packaged with Capacitor, for building good habits: daily tracking and offline support through a service worker.",
    },
    stack: ["HTML5", "CSS3", "JavaScript", "Capacitor", "PWA"],
    status: { es: "Activo", en: "Active" },
    impact: {
      es: "App móvil offline-first para la formación de hábitos",
      en: "Offline-first mobile app for habit building",
    },
  },
  {
    title: "Las Veganas",
    image: "/images/ejemplo2.jpg",
    role: { es: "Full stack (freelance)", en: "Full stack (freelance)" },
    summary: {
      es: "Sitio web para un restaurante vegano: menú, historia del local e información de contacto con un diseño cálido y responsive.",
      en: "A website for a vegan restaurant: menu, the venue's story and contact information, with a warm, responsive design.",
    },
    stack: ["HTML5", "CSS3", "JavaScript"],
    status: { es: "Completado", en: "Completed" },
    impact: {
      es: "Presencia web para un restaurante vegano",
      en: "Web presence for a vegan restaurant",
    },
  },
  {
    title: "BiFTEK",
    image: "/images/ejemplo4.jpg",
    role: { es: "Full stack (freelance)", en: "Full stack (freelance)" },
    summary: {
      es: "Sitio web para una parrilla, con navegación por secciones de menú y una estética oscura acorde a la marca.",
      en: "A website for a steakhouse, with section-based menu navigation and a dark aesthetic matching the brand.",
    },
    stack: ["React", "Vite", "React Router"],
    status: { es: "Completado", en: "Completed" },
    impact: {
      es: "Sitio de marca para un restaurante de carnes",
      en: "Brand site for a steakhouse",
    },
  },
  {
    title: "Macchiato Caffé",
    image: "/images/ejemplo2.jpg",
    role: { es: "Full stack (freelance)", en: "Full stack (freelance)" },
    summary: {
      es: "Sitio web para una cafetería y pastelería de estilo europeo: menú visual, ambientación editorial e identidad cálida. Uno de varios sitios de restaurantes hechos como freelance.",
      en: "A website for a European-style café and patisserie: a visual menu, editorial mood and a warm identity. One of several restaurant sites built as a freelancer.",
    },
    stack: ["HTML5", "CSS3", "JavaScript"],
    status: { es: "Completado", en: "Completed" },
    impact: {
      es: "Uno de varios sitios de restaurantes hechos como freelance",
      en: "One of several restaurant sites built as a freelancer",
    },
  },
];

export function ProjectsModule() {
  const { completeMission } = useFerroCore();
  const prefersReducedMotion = useReducedMotion();
  const t = useT();
  const tUi = useUi();
  const [inspected, setInspected] = useState<ProjectCardData | null>(null);

  const handleInspect = (project: ProjectCardData) => {
    setInspected(project);
    completeMission("inspect-project");
  };

  if (inspected) {
    return (
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
        className="flex h-full flex-col gap-4 overflow-auto"
      >
        <button
          type="button"
          onClick={() => setInspected(null)}
          className="self-start rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-secondary transition hover:border-primary/40 hover:text-white"
        >
          ← {tUi("backToProjects")}
        </button>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <Image
            src={inspected.image}
            alt={inspected.title}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("projectFileKicker")}</p>
          <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-white">{inspected.title}</h2>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-primary">
              {t(inspected.status)}
            </span>
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-muted">{t(inspected.role)}</p>
        </div>

        <p className="text-sm leading-7 text-secondary">{t(inspected.summary)}</p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-secondary">
          <span className="text-[10px] uppercase tracking-[0.28em] text-muted">{tUi("impact")}</span>
          <p className="mt-2 text-white">{t(inspected.impact)}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-secondary">
          <span className="text-[10px] uppercase tracking-[0.28em] text-muted">{tUi("projectStack")}</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {inspected.stack.map((tech) => (
              <span key={tech} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-secondary">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("developerPortfolio")}</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{tUi("selectedSystems")}</h2>
        </div>
        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-primary">
          {projects.length} {tUi("active")}
        </div>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon="◇"
          title={tUi("noProjectsYet")}
          message={tUi("noProjectsMessage")}
        />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: prefersReducedMotion ? 0 : 0.25 }}
              className="overflow-hidden rounded-[22px] border border-white/10 bg-[#121212]/80 shadow-[0_20px_70px_rgba(0,0,0,0.22)]"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1280px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-white">{project.title}</h3>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.28em] text-primary">
                    {t(project.status)}
                  </span>
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted">{t(project.role)}</p>

                <p className="mt-3 text-sm leading-7 text-secondary">{t(project.summary)}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-secondary">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-muted">{tUi("impact")}</span>
                  <p className="mt-2 text-white">{t(project.impact)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleInspect(project)}
                  className="mt-4 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-secondary transition hover:border-primary/40 hover:text-white"
                >
                  {tUi("inspectProject")} →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm text-secondary">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{tUi("futureReady")}</p>
        <p className="mt-2 leading-7">
          {tUi("futureReadyMessage")}
        </p>
      </div>
    </div>
  );
}
