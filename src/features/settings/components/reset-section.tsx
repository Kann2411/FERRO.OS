"use client";

import { useAudio } from "@/features/audio-engine";
import { useFerroCore } from "@/features/ferro-core/context/ferro-core-context";
import { useWindowContext } from "@/features/window-system/context/window-context";
import { useUi } from "@/hooks/use-lang";
import { Panel } from "@/components/ui/panel";

export function ResetSection() {
  const { resetFlow } = useFerroCore();
  const { resetWindowState } = useWindowContext();
  const { playSound } = useAudio();
  const tUi = useUi();

  const handleReset = () => {
    playSound("ui", "click");

    const confirmed = window.confirm(tUi("resetFlowConfirm"));
    if (!confirmed) {
      return;
    }

    resetFlow();
    resetWindowState();
    window.location.reload();
  };

  return (
    <Panel tone="surface" size="lg" elevated className="border-rose-400/20">
      <p className="text-[10px] uppercase tracking-[0.32em] text-rose-300/80">{tUi("resetSectionKicker")}</p>
      <h2 className="mt-3 text-lg font-semibold text-white">{tUi("resetFlow")}</h2>
      <p className="mt-2 text-sm leading-6 text-secondary">{tUi("resetFlowDescription")}</p>
      <button
        type="button"
        onClick={handleReset}
        className="mt-4 inline-flex h-9 items-center justify-center rounded-full border border-rose-400/30 bg-rose-500/10 px-4 text-sm font-medium text-rose-200 transition hover:border-rose-300/50 hover:bg-rose-500/20"
      >
        {tUi("resetFlow")}
      </button>
    </Panel>
  );
}
