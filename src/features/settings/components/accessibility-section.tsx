"use client";

import { useAudio } from "@/features/audio-engine";
import { useAccessibilityStore, type AccessibilityPreference } from "@/store/accessibility-store";
import { useUi } from "@/hooks/use-lang";
import { panelVariants } from "@/components/ui/panel";
import { cn } from "@/lib/cn";

const PREFERENCES: AccessibilityPreference[] = ["system", "on", "off"];

interface PreferenceRowProps {
  label: string;
  description: string;
  value: AccessibilityPreference;
  onChange: (value: AccessibilityPreference) => void;
}

function PreferenceRow({ label, description, value, onChange }: PreferenceRowProps) {
  const { playSound } = useAudio();
  const tUi = useUi();
  const prefLabel: Record<AccessibilityPreference, string> = {
    system: tUi("prefSystem"),
    on: tUi("prefOn"),
    off: tUi("prefOff"),
  };

  return (
    <section className={cn(panelVariants({ tone: "surface", size: "lg", elevated: true }))}>
      <p className="text-sm font-medium text-white">{label}</p>
      <p className="mt-2 text-sm leading-6 text-secondary">{description}</p>
      <div className="mt-4 flex gap-2">
        {PREFERENCES.map((preference) => (
          <button
            key={preference}
            type="button"
            onClick={() => {
              playSound("ui", "click");
              onChange(preference);
            }}
            aria-pressed={value === preference}
            className={`inline-flex h-9 flex-1 items-center justify-center rounded-full border px-3 text-sm font-medium transition ${
              value === preference
                ? "border-primary/50 bg-primary/20 text-primary"
                : "border-white/10 bg-white/5 text-secondary hover:border-primary/40 hover:text-white"
            }`}
          >
            {prefLabel[preference]}
          </button>
        ))}
      </div>
    </section>
  );
}

export function AccessibilitySection() {
  const reducedMotion = useAccessibilityStore((state) => state.reducedMotion);
  const setReducedMotion = useAccessibilityStore((state) => state.setReducedMotion);
  const highContrast = useAccessibilityStore((state) => state.highContrast);
  const setHighContrast = useAccessibilityStore((state) => state.setHighContrast);
  const tUi = useUi();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("accessibilitySectionKicker")}</p>
      <div className="grid gap-4 lg:grid-cols-2">
        <PreferenceRow
          label={tUi("reducedMotionLabel")}
          description={tUi("reducedMotionDescription")}
          value={reducedMotion}
          onChange={setReducedMotion}
        />
        <PreferenceRow
          label={tUi("highContrastLabel")}
          description={tUi("highContrastDescription")}
          value={highContrast}
          onChange={setHighContrast}
        />
      </div>
    </div>
  );
}
