export const animationDurations = {
  instant: 0,
  fast: 0.16,
  standard: 0.2,
  smooth: 0.24,
  relaxed: 0.32,
  cinematic: 0.4,
  slow: 0.5,
} as const;

export const animationEasings = {
  standard: "easeOut",
  smooth: "easeOut",
  snappy: "easeOut",
  cinematic: "easeOut",
} as const;

export const animationSpeeds = {
  subtle: 1,
  medium: 1.05,
  prominent: 1.12,
} as const;

export const animationPresets = {
  entrance: {
    duration: animationDurations.smooth,
    ease: animationEasings.standard,
    speed: animationSpeeds.subtle,
    offset: 10,
  },
  panel: {
    duration: animationDurations.relaxed,
    ease: animationEasings.cinematic,
    speed: animationSpeeds.medium,
    offset: 14,
  },
  window: {
    duration: animationDurations.fast,
    ease: animationEasings.snappy,
    speed: animationSpeeds.prominent,
    offset: 8,
  },
  emphasis: {
    duration: animationDurations.cinematic,
    ease: animationEasings.cinematic,
    speed: animationSpeeds.medium,
    offset: 12,
  },
} as const;

export function getAnimationPreset(name: keyof typeof animationPresets) {
  return animationPresets[name];
}
