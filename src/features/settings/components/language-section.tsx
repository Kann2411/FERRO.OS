"use client";

import { useAudio } from "@/features/audio-engine";
import { useLang, useSetLang, useUi } from "@/hooks/use-lang";
import { Panel } from "@/components/ui/panel";

export function LanguageSection() {
  const { playSound } = useAudio();
  const lang = useLang();
  const setLang = useSetLang();
  const tUi = useUi();

  return (
    <Panel tone="surface" size="lg" elevated>
      <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("languageSectionTitle")}</p>
      <h2 className="mt-3 text-lg font-semibold text-white">{tUi("languageSectionTitle")}</h2>
      <p className="mt-2 text-sm leading-6 text-secondary">{tUi("languageSectionDescription")}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => {
            playSound("ui", "click");
            setLang("es");
          }}
          aria-pressed={lang === "es"}
          className={`inline-flex h-9 items-center justify-center rounded-full border px-4 text-sm font-medium transition ${
            lang === "es"
              ? "border-primary/50 bg-primary/20 text-primary"
              : "border-white/10 bg-white/5 text-secondary hover:border-primary/40 hover:text-white"
          }`}
        >
          {tUi("languageSpanish")}
        </button>
        <button
          type="button"
          onClick={() => {
            playSound("ui", "click");
            setLang("en");
          }}
          aria-pressed={lang === "en"}
          className={`inline-flex h-9 items-center justify-center rounded-full border px-4 text-sm font-medium transition ${
            lang === "en"
              ? "border-primary/50 bg-primary/20 text-primary"
              : "border-white/10 bg-white/5 text-secondary hover:border-primary/40 hover:text-white"
          }`}
        >
          {tUi("languageEnglish")}
        </button>
      </div>
    </Panel>
  );
}
