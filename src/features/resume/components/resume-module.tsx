"use client";

import { motion } from "framer-motion";
import { Panel } from "@/components/ui/panel";
import { useLang, useT, useUi } from "@/hooks/use-lang";
import { ui } from "@/lib/i18n/ui";
import type { Bilingual, Lang } from "@/lib/i18n/types";

interface ExperienceItem {
  role: Bilingual;
  period: Bilingual;
  description: Bilingual;
}

interface EducationItem {
  title: Bilingual;
  institution: Bilingual;
  period: Bilingual;
}

const profile = {
  name: "Kristian Kamilo Ferrin",
  title: {
    es: "Desarrollador Full Stack • Productor Musical",
    en: "Full Stack Developer • Music Producer",
  } as Bilingual,
  summary: {
    es: "Constructor multidisciplinario enfocado en crear productos digitales inmersivos que conectan ingeniería, sistemas visuales y experiencia narrativa.",
    en: "Multidisciplinary builder focused on creating immersive digital products that connect engineering, visual systems and narrative experience.",
  } as Bilingual,
};

const experience: ExperienceItem[] = [
  {
    role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    period: { es: "Actualidad", en: "Present" },
    description: {
      es: "Diseño experiencias de producto modulares, interfaces y narrativas tipo sistema operativo con prácticas modernas de frontend y backend.",
      en: "Designing modular product experiences, interfaces and operating-system-like storytelling with modern frontend and backend practices.",
    },
  },
  {
    role: { es: "Constructor de Tecnología Creativa", en: "Creative Technology Builder" },
    period: { es: "En curso", en: "Ongoing" },
    description: {
      es: "Conectando diseño de producto, sistemas de interacción y experiencias basadas en audio en entornos digitales cohesivos.",
      en: "Bridging product design, interaction systems and audio-driven experiences into cohesive digital environments.",
    },
  },
  {
    role: { es: "Desarrollador de Producto Independiente", en: "Independent Product Developer" },
    period: { es: "Anterior", en: "Previous" },
    description: {
      es: "Creando interfaces pulidas, arquitectura de sistemas y capas de experiencia para proyectos que exigen elegancia y profundidad técnica.",
      en: "Creating polished interfaces, systems architecture and experience layers for projects that demand elegance and technical depth.",
    },
  },
];

const education: EducationItem[] = [
  {
    title: { es: "Desarrollo de Software y Producto Digital", en: "Software and Digital Product Development" },
    institution: { es: "Práctica profesional autodirigida", en: "Self-directed professional practice" },
    period: { es: "En curso", en: "Ongoing" },
  },
  {
    title: { es: "Sistemas Creativos y Producción de Audio", en: "Creative Systems and Audio Production" },
    institution: { es: "Exploración independiente", en: "Independent exploration" },
    period: { es: "En curso", en: "Ongoing" },
  },
];

const certifications: Bilingual[] = [
  { es: "Sistemas de Interfaz", en: "UI Systems" },
  { es: "Arquitectura Frontend", en: "Frontend Architecture" },
  { es: "Tecnología Creativa", en: "Creative Technology" },
  { es: "Diseño de Experiencia de Producto", en: "Product Experience Design" },
];

const languages: Bilingual[] = [ui.languageEnglish, ui.languageSpanish];

function buildResumePdf(lang: Lang) {
  const pick = <T,>(pair: Bilingual<T>): T => pair[lang];

  const lines = [
    "Kristian Kamilo Ferrin",
    pick(profile.title),
    "",
    pick(ui.summary),
    pick(profile.summary),
    "",
    pick(ui.experienceLabel),
    ...experience.flatMap((item) => [pick(item.role), pick(item.period), pick(item.description), ""]),
    pick(ui.educationLabel),
    ...education.flatMap((item) => [pick(item.title), pick(item.institution), pick(item.period), ""]),
    pick(ui.certificationsLabel),
    ...certifications.map((item) => pick(item)),
    pick(ui.languagesLabel),
    ...languages.map((item) => pick(item)),
  ];

  const content = lines.join("\n");
  const blob = new Blob([content], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "kristian-ferrin-resume.pdf";
  link.click();
  window.URL.revokeObjectURL(url);
}

export function ResumeModule() {
  const lang = useLang();
  const t = useT();
  const tUi = useUi();

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("resumeProfileKicker")}</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{profile.name}</h2>
          <p className="mt-2 text-sm text-secondary">{t(profile.title)}</p>
        </div>
        <button
          type="button"
          onClick={() => buildResumePdf(lang)}
          className="rounded-full border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
        >
          {tUi("downloadPdf")}
        </button>
      </div>

      <Panel tone="surface" size="md" className="text-sm leading-7 text-secondary">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{tUi("summary")}</p>
        <p className="mt-2 text-white">{t(profile.summary)}</p>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel tone="surface" size="md">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{tUi("experienceLabel")}</p>
          <div className="mt-4 space-y-3">
            {experience.map((item, index) => (
              <motion.div
                key={t(item.role)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                className="rounded-2xl border border-border bg-white/5 p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">{t(item.role)}</h3>
                  <span className="text-[11px] uppercase tracking-[0.28em] text-primary">{t(item.period)}</span>
                </div>
                <p className="mt-2 text-sm leading-7 text-secondary">{t(item.description)}</p>
              </motion.div>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel tone="surface" size="md">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{tUi("educationLabel")}</p>
            <div className="mt-3 space-y-3">
              {education.map((item) => (
                <div key={t(item.title)} className="rounded-2xl border border-border bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">{t(item.title)}</p>
                  <p className="mt-1 text-sm text-secondary">{t(item.institution)}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-primary">{t(item.period)}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel tone="surface" size="md">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{tUi("certificationsLabel")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {certifications.map((item) => (
                <span key={t(item)} className="rounded-full border border-border bg-white/5 px-2.5 py-1 text-[11px] text-secondary">
                  {t(item)}
                </span>
              ))}
            </div>
          </Panel>

          <Panel tone="surface" size="md">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted">{tUi("languagesLabel")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {languages.map((item) => (
                <span key={t(item)} className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
                  {t(item)}
                </span>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
