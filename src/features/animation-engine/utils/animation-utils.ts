import { animationPresets } from "@/features/animation-engine/utils/presets";

interface TransitionOptions {
  reducedMotion?: boolean;
  delay?: number;
  durationMultiplier?: number;
}

type AnimationPresetName = keyof typeof animationPresets;

export function createTransition(preset: AnimationPresetName = "entrance", options: TransitionOptions = {}) {
  const config = animationPresets[preset];
  const duration = options.reducedMotion ? 0 : config.duration * (options.durationMultiplier ?? 1);

  return {
    duration,
    ease: config.ease,
    delay: options.delay ?? 0,
  };
}

export function createMotionProps(preset: AnimationPresetName = "entrance", options: TransitionOptions = {}) {
  const config = animationPresets[preset];

  return {
    initial: { opacity: 0, y: config.offset },
    animate: { opacity: 1, y: 0 },
    transition: createTransition(preset, options),
  };
}

export function createEntranceMotion(options: TransitionOptions = {}) {
  return createMotionProps("entrance", options);
}

export function createPopoverMotion(preset: AnimationPresetName = "window", options: TransitionOptions = {}) {
  const config = animationPresets[preset];
  const reducedMotion = options.reducedMotion;

  return {
    initial: { opacity: 0, scale: reducedMotion ? 1 : 0.98, y: config.offset * 0.6 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: createTransition(preset, options),
  };
}
