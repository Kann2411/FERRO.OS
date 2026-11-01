import type { AudioAssetManifest, AudioCategory } from "@/features/audio-engine/types";

export const audioManifest: AudioAssetManifest = {
  system: [],
  ui: ["hover", "click", "open", "close", "reset"],
  notifications: ["receive", "dismiss", "message"],
  terminal: ["type", "execute", "clear", "error"],
  "ferro-core": [],
  exploration: [],
  ambient: ["drift"],
  music: [],
  achievements: ["unlock"],
};

export function getAudioCategories(): AudioCategory[] {
  return Object.keys(audioManifest) as AudioCategory[];
}
