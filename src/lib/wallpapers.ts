import type { Bilingual } from "@/lib/i18n/types";

export type WallpaperId = "default" | "nebula" | "gridwork" | "archive";

export interface WallpaperDefinition {
  id: WallpaperId;
  name: Bilingual;
  description: Bilingual;
  background: string;
  preview: string;
}

export const defaultWallpaperId: WallpaperId = "default";

export const wallpaperDefinitions: WallpaperDefinition[] = [
  {
    id: "default",
    name: { es: "Predeterminado", en: "Default" },
    description: { es: "Fondo estándar de la estación FERRO.OS.", en: "Standard FERRO.OS workspace background." },
    background: "#090909",
    preview: "linear-gradient(135deg, rgba(255,255,255,0.05), transparent)",
  },
  {
    id: "nebula",
    name: { es: "Horizonte de nebulosa", en: "Nebula Horizon" },
    description: {
      es: "Un gradiente cósmico oculto que refleja la exploración y el descubrimiento del sistema.",
      en: "A hidden cosmic gradient that reflects exploration and system discovery.",
    },
    background:
      "radial-gradient(circle at 15% 20%, rgba(147, 51, 234, 0.24), transparent 18%)," +
      "radial-gradient(circle at 80% 10%, rgba(14, 165, 233, 0.22), transparent 22%)," +
      "linear-gradient(135deg, #07070a 0%, #0f0d1c 48%, #0a0b14 100%)",
    preview: "linear-gradient(135deg, #120d2e 0%, #0d1113 45%, #112235 100%)",
  },
  {
    id: "gridwork",
    name: { es: "Entramado", en: "Gridwork" },
    description: {
      es: "Una cuadrícula técnica secreta que evoca circuitos y sistemas ocultos.",
      en: "A secret technical grid that evokes circuitry and hidden systems.",
    },
    background:
      "linear-gradient(0deg, rgba(255,255,255,0.04) 1px, transparent 1px)," +
      "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)," +
      "linear-gradient(180deg, #070707 0%, #101018 60%, #0d0d18 100%)",
    preview: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 25%), rgba(14,23,34,0.85)",
  },
  {
    id: "archive",
    name: { es: "Archivo heredado", en: "Legacy Archive" },
    description: {
      es: "Un fondo sutil y cálido ligado a la historia del proyecto y a notas ocultas.",
      en: "A subtle, warm background tied to project history and hidden notes.",
    },
    background:
      "radial-gradient(circle at 20% 20%, rgba(255, 215, 178, 0.14), transparent 22%)," +
      "linear-gradient(180deg, #0d0d12 0%, #16131b 45%, #0d0d12 100%)",
    preview: "linear-gradient(135deg, rgba(255, 215, 178, 0.08), transparent 35%), rgba(10,12,18,0.95)",
  },
];

export function getWallpaperDefinition(id: WallpaperId) {
  return wallpaperDefinitions.find((wallpaper) => wallpaper.id === id) ?? wallpaperDefinitions[0];
}

export function getAllWallpaperDefinitions() {
  return [...wallpaperDefinitions];
}
