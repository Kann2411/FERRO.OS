"use client";

import { LanguageSection } from "@/features/settings/components/language-section";
import { ThemeSection } from "@/features/settings/components/theme-section";
import { WallpaperSection } from "@/features/settings/components/wallpaper-section";
import { AudioSection } from "@/features/settings/components/audio-section";
import { AccessibilitySection } from "@/features/settings/components/accessibility-section";
import { ResetSection } from "@/features/settings/components/reset-section";

export function SettingsModule() {
  return (
    <div className="flex h-full flex-col gap-6 overflow-auto px-4 py-4">
      <LanguageSection />
      <ThemeSection />
      <AudioSection />
      <WallpaperSection />
      <AccessibilitySection />
      <ResetSection />
    </div>
  );
}
