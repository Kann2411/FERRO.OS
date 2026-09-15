"use client";

import { useAudio } from "@/features/audio-engine";
import { useUi } from "@/hooks/use-lang";
import { Panel, panelVariants } from "@/components/ui/panel";
import { cn } from "@/lib/cn";

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function AudioSection() {
  const { enabled, masterVolume, effectsVolume, ambientVolume, playSound, setEnabled, setMasterVolume, setEffectsVolume, setAmbientVolume } = useAudio();
  const tUi = useUi();

  return (
    <>
      <Panel tone="surface" size="lg" elevated>
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted">{tUi("settings")}</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{tUi("settingsAudioTitle")}</h2>
        <p className="mt-2 text-sm leading-6 text-secondary">{tUi("settingsAudioDescription")}</p>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className={cn(panelVariants({ tone: "surface", size: "lg", elevated: true }))}>
          <label className="flex items-center gap-3 text-sm font-medium text-white">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(event) => setEnabled(event.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-black text-primary accent-primary"
            />
            {tUi("enableAudio")}
          </label>
          <p className="mt-3 text-sm leading-6 text-secondary">{tUi("enableAudioDescription")}</p>
        </section>

        <section className={cn(panelVariants({ tone: "surface", size: "lg", elevated: true }))}>
          <p className="text-sm font-medium text-white">{tUi("masterVolume")}</p>
          <div className="mt-4 flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(masterVolume * 100)}
              onChange={(event) => setMasterVolume(Number(event.target.value) / 100)}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
            />
            <span className="text-sm font-semibold text-white">{formatPercent(masterVolume)}</span>
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className={cn(panelVariants({ tone: "surface", size: "lg", elevated: true }))}>
          <p className="text-sm font-medium text-white">{tUi("effectsVolume")}</p>
          <div className="mt-4 flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(effectsVolume * 100)}
              onChange={(event) => setEffectsVolume(Number(event.target.value) / 100)}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
            />
            <span className="text-sm font-semibold text-white">{formatPercent(effectsVolume)}</span>
          </div>
        </section>

        <section className={cn(panelVariants({ tone: "surface", size: "lg", elevated: true }))}>
          <p className="text-sm font-medium text-white">{tUi("ambientVolume")}</p>
          <div className="mt-4 flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(ambientVolume * 100)}
              onChange={(event) => setAmbientVolume(Number(event.target.value) / 100)}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-primary"
            />
            <span className="text-sm font-semibold text-white">{formatPercent(ambientVolume)}</span>
          </div>
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className={cn(panelVariants({ tone: "surface", size: "lg", elevated: true }))}>
          <p className="text-sm font-medium text-white">{tUi("uiPreview")}</p>
          <button
            type="button"
            onClick={() => playSound("ui", "click")}
            className="mt-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-primary/40 hover:bg-white/10"
          >
            {tUi("playClick")}
          </button>
        </section>

        <section className={cn(panelVariants({ tone: "surface", size: "lg", elevated: true }))}>
          <p className="text-sm font-medium text-white">{tUi("terminalPreview")}</p>
          <button
            type="button"
            onClick={() => playSound("terminal", "type")}
            className="mt-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-primary/40 hover:bg-white/10"
          >
            {tUi("playType")}
          </button>
        </section>

        <section className={cn(panelVariants({ tone: "surface", size: "lg", elevated: true }))}>
          <p className="text-sm font-medium text-white">{tUi("ambientPreview")}</p>
          <button
            type="button"
            onClick={() => playSound("ambient", "drift")}
            className="mt-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-primary/40 hover:bg-white/10"
          >
            {tUi("playDrift")}
          </button>
        </section>
      </div>

      <Panel tone="surface" size="lg" elevated>
        <p className="text-sm font-medium text-white">{tUi("audioState")}</p>
        <p className="mt-2 text-sm leading-6 text-secondary">{tUi("audioStateDescription")}</p>
      </Panel>
    </>
  );
}
