export type AudioCategory =
  | "system"
  | "ui"
  | "notifications"
  | "terminal"
  | "ferro-core"
  | "exploration"
  | "ambient"
  | "music"
  | "achievements";

export type AudioAssetManifest = Record<AudioCategory, string[]>;
