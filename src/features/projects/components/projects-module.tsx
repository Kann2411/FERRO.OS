"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { EmptyState } from "@/components/ui/empty-state";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useWindowContext } from "@/features/window-system/context/window-context";
import { getViewportSafePosition } from "@/features/window-system/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useT, useUi } from "@/hooks/use-lang";
import type { Bilingual } from "@/lib/i18n/types";

// This module only ever renders inside the "projects" window (see window-shell.tsx's routing).
const PROJECTS_WINDOW_ID = "projects";
// Generous but not maximized — enough room for the inspect view's image and copy to sit without scrolling.
const INSPECT_WINDOW_SIZE = { width: 760, height: 620 };

interface ProjectCardData {
  title: string;
  image: string;
  /** Mobile app screenshots are portrait — shown uncropped instead of being cover-cropped into a 16:9 box. */
  imageOrientation?: "landscape" | "portrait";
  role: Bilingual;
  /** Short one-liner shown on the compact card; the full summary is reserved for the inspect view. */
  tagline: Bilingual;
  summary: Bilingual;
  stack: string[];
  status: Bilingual;
  impact: Bilingual;
}

/**
 * Real project history, ordered with FERRO.OS and the three most significant projects first
 * (per the explorer's own ranking), followed by earlier work and freelance restaurant sites.
 * Images are real screenshots where supplied; the rest fall back to /public/images/ejemplo*.jpg
 * placeholders until their own screenshots are supplied.
 */
const projects: ProjectCardData[] = [
  {
    title: "FERRO.OS",
    image: "/images/OG.jpg",
    role: { es: "Full stack (proyecto personal)", en: "Full stack (personal project)" },
    tagline: {
      es: "Sistema operativo de portafolio, hecho para escalar con nuevos módulos.",
      en: "A portfolio operating system, built to scale with new modules.",
    },
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
    image: "/images/royal-games-casino.png",
    role: { es: "Full stack", en: "Full stack" },
    tagline: {
      es: "Casino online con backend en tiempo real y pagos integrados.",
      en: "An online casino with a real-time backend and integrated payments.",
    },
    summary: {
      es: "Plataforma de casino online. Diseñé la interfaz de usuario con React y desarrollé todo el backend con NestJS, incluyendo autenticación con JWT, WebSockets para juego en tiempo real y pagos con MercadoPago y PayPal.",
      en: "An online casino platform. I designed the user interface with React and built the entire backend with NestJS, including JWT authentication, WebSockets for real-time gameplay, and MercadoPago and PayPal payments.",
    },
    stack: ["NestJS", "TypeORM", "PostgreSQL", "WebSockets", "JWT", "MercadoPago", "PayPal", "React", "Redux", "Three.js"],
    status: { es: "Producción", en: "Production" },
    impact: {
      es: "Arquitectura backend escalable para pagos y juego en tiempo real",
      en: "Scalable backend architecture for payments and real-time gameplay",
    },
  },
  {
    title: "FitZone",
    image: "/images/fitzone.png",
    role: { es: "Backend, en equipo", en: "Backend, in a team" },
    tagline: {
      es: "Gestión de membresías y pagos para un gimnasio, en equipo.",
      en: "Membership and payment management for a gym, built with a team.",
    },
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
    image: "/images/jcov-ktm.png",
    role: { es: "Full stack (solo)", en: "Full stack (solo)" },
    tagline: {
      es: "Landing page para un productor musical, con identidad propia.",
      en: "A landing page for a music producer, with its own identity.",
    },
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
    image: "/images/habitforge.png",
    imageOrientation: "portrait",
    role: { es: "Full stack (solo)", en: "Full stack (solo)" },
    tagline: {
      es: "App móvil offline-first para forjar buenos hábitos.",
      en: "An offline-first mobile app for building good habits.",
    },
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
    image: "/images/las-veganas.png",
    role: { es: "Full stack (freelance)", en: "Full stack (freelance)" },
    tagline: {
      es: "Sitio web cálido para un restaurante 100% vegano.",
      en: "A warm website for a 100% vegan restaurant.",
    },
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
    image: "/images/biftek.png",
    role: { es: "Full stack (freelance)", en: "Full stack (freelance)" },
    tagline: {
      es: "Sitio de marca oscuro y directo para una parrilla.",
      en: "A dark, direct brand site for a steakhouse.",
    },
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
    image: "/images/macchiato-caffe.png",
    role: { es: "Full stack (freelance)", en: "Full stack (freelance)" },
    tagline: {
      es: "Menú e identidad para una cafetería-pastelería europea.",
      en: "Menu and identity for a European café and patisserie.",
    },
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
  const { windows, updateWindowSize, updateWindowPosition } = useWindowContext();
  const prefersReducedMotion = useReducedMotion();
  const t = useT();
  const tUi = useUi();
  const [inspected, setInspected] = useState<ProjectCardData | null>(null);
  // The window size to restore when going back to the list, captured right before growing it.
  const listWindowSizeRef = useRef<{ width: number; height: number } | null>(null);

  const handleInspect = (project: ProjectCardData) => {
    setInspected(project);
    completeMission("inspect-project");

    const current = windows.find((window) => window.id === PROJECTS_WINDOW_ID);
    if (!current || current.isMaximized) {
      return;
    }

    const viewportWidth = typeof globalThis.window !== "undefined" ? globalThis.window.innerWidth : 1280;
    const viewportHeight = typeof globalThis.window !== "undefined" ? globalThis.window.innerHeight : 900;
    const nextWidth = Math.min(Math.max(current.width, INSPECT_WINDOW_SIZE.width), Math.max(320, viewportWidth - 48));
    const nextHeight = Math.min(Math.max(current.height, INSPECT_WINDOW_SIZE.height), Math.max(280, viewportHeight - 80));
    if (nextWidth === current.width && nextHeight === current.height) {
      return;
    }

    listWindowSizeRef.current = { width: current.width, height: current.height };
    updateWindowSize(PROJECTS_WINDOW_ID, { width: nextWidth, height: nextHeight });
    updateWindowPosition(PROJECTS_WINDOW_ID, getViewportSafePosition(current.x, current.y, nextWidth, nextHeight));
  };

  const handleBack = () => {
    setInspected(null);

    if (listWindowSizeRef.current) {
      updateWindowSize(PROJECTS_WINDOW_ID, listWindowSizeRef.current);
      listWindowSizeRef.current = null;
    }
  };

  if (inspected) {
    return (
      <motion.div
        key={inspected.title}
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
        className="flex h-full flex-col overflow-hidden"
      >
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex shrink-0 items-center gap-1.5 self-start text-xs font-medium text-secondary transition hover:text-white"
        >
          <span aria-hidden="true">←</span> {tUi("backToProjects")}
        </button>

        <div className="relative mt-3 min-h-0 w-full flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <Image
            src={inspected.image}
            alt={inspected.title}
            fill
            sizes="(min-width: 1024px) 760px, 100vw"
            className={inspected.imageOrientation === "portrait" ? "object-contain" : "object-cover"}
            priority
          />
          {/* Fades the image into the window's own background instead of cutting it off sharply. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#0d0d0d] to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="mt-4 flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted">
          <span>{t(inspected.status)}</span>
          <span aria-hidden="true">·</span>
          <span>{t(inspected.role)}</span>
        </div>

        <h2 className="mt-2 shrink-0 text-2xl font-semibold text-white">{inspected.title}</h2>
        <p className="mt-1 shrink-0 text-sm text-secondary">{t(inspected.tagline)}</p>
        <p className="mt-3 shrink-0 text-sm leading-6 text-white/90">{t(inspected.summary)}</p>

        <div className="mt-4 flex shrink-0 flex-wrap gap-2">
          {inspected.stack.map((tech) => (
            <span key={tech} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-secondary">
              {tech}
            </span>
          ))}
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
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((project, index) => (
            <motion.button
              key={project.title}
              type="button"
              onClick={() => handleInspect(project)}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.05, duration: prefersReducedMotion ? 0 : 0.25 }}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121212]/80 text-left shadow-[0_20px_70px_rgba(0,0,0,0.22)] transition hover:border-primary/40"
              aria-label={`${tUi("inspectProject")}: ${project.title}`}
            >
              <div className={`relative w-full min-h-28 aspect-video ${project.imageOrientation === "portrait" ? "bg-black/40" : ""}`}>
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className={project.imageOrientation === "portrait" ? "object-contain" : "object-cover"}
                  priority={index === 0}
                />
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted">{t(project.status)}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-secondary">{t(project.tagline)}</p>
              </div>
            </motion.button>
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
