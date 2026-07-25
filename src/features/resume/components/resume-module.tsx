"use client";

import { motion } from "framer-motion";

interface ExperienceItem {
  role: string;
  period: string;
  description: string;
}

interface EducationItem {
  title: string;
  institution: string;
  period: string;
}

const profile = {
  name: "Kristian Kamilo Ferrin",
  title: "Full Stack Developer • Music Producer",
  summary:
    "Multidisciplinary builder focused on creating immersive digital products that connect engineering, visual systems and narrative experience.",
};

const experience: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    period: "Present",
    description: "Designing modular product experiences, interfaces and operating-system-like storytelling with modern frontend and backend practices.",
  },
  {
    role: "Creative Technology Builder",
    period: "Ongoing",
    description: "Bridging product design, interaction systems and audio-driven experiences into cohesive digital environments.",
  },
  {
    role: "Independent Product Developer",
    period: "Previous",
    description: "Creating polished interfaces, systems architecture and experience layers for projects that demand elegance and technical depth.",
  },
];

const education: EducationItem[] = [
  {
    title: "Software and Digital Product Development",
    institution: "Self-directed professional practice",
    period: "Ongoing",
  },
  {
    title: "Creative Systems and Audio Production",
    institution: "Independent exploration",
    period: "Ongoing",
  },
];

const certifications = ["UI Systems", "Frontend Architecture", "Creative Technology", "Product Experience Design"];
const languages = ["English", "Spanish"];

function buildResumePdf() {
  const lines = [
    "Kristian Kamilo Ferrin",
    "Full Stack Developer • Music Producer",
    "",
    "Summary",
    profile.summary,
    "",
    "Experience",
    ...experience.flatMap((item) => [item.role, item.period, item.description, ""]),
    "Education",
    ...education.flatMap((item) => [item.title, item.institution, item.period, ""]),
    "Certifications",
    ...certifications,
    "Languages",
    ...languages,
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
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.32em] text-muted">Professional profile</p>
          <h2 className="mt-1 text-xl font-semibold text-white">{profile.name}</h2>
          <p className="mt-2 text-sm text-secondary">{profile.title}</p>
        </div>
        <button
          type="button"
          onClick={buildResumePdf}
          className="rounded-full border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
        >
          Download PDF
        </button>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-[#121212]/80 p-4 text-sm leading-7 text-secondary">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Summary</p>
        <p className="mt-2 text-white">{profile.summary}</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[24px] border border-white/10 bg-[#121212]/80 p-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Experience</p>
          <div className="mt-4 space-y-3">
            {experience.map((item, index) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                className="rounded-[18px] border border-white/10 bg-white/5 p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white">{item.role}</h3>
                  <span className="text-[11px] uppercase tracking-[0.28em] text-primary">{item.period}</span>
                </div>
                <p className="mt-2 text-sm leading-7 text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-[#121212]/80 p-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Education</p>
            <div className="mt-3 space-y-3">
              {education.map((item) => (
                <div key={item.title} className="rounded-[18px] border border-white/10 bg-white/5 p-3">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-secondary">{item.institution}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-primary">{item.period}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#121212]/80 p-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Certifications</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {certifications.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-secondary">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#121212]/80 p-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Languages</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {languages.map((item) => (
                <span key={item} className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
