export type ThemeMode = "dark" | "light";

export const THEME_STORAGE_KEY = "ferro-os-theme";

export const themeTokens = {
  dark: {
    background: "#090909",
    surface: "#141414",
    surfaceStrong: "#1f1f1f",
    primary: "#d90429",
    textPrimary: "#f8f8f8",
    textSecondary: "#b5b5b5",
    muted: "#6f6f6f",
    success: "#00c853",
    warning: "#ffb300",
    error: "#ff1744",
    border: "rgba(255, 255, 255, 0.1)",
    borderStrong: "rgba(255, 255, 255, 0.18)",
    surface2: "#1e1e1e",
    surface3: "#2a2a2a",
    subtle: "#8a8a8a",
    accentForeground: "#ffffff",
    signal: "#00c853",
  },
  light: {
    background: "#f5f5f5",
    surface: "#ffffff",
    surfaceStrong: "#ececec",
    primary: "#d90429",
    textPrimary: "#0f0f0f",
    textSecondary: "#4b4b4b",
    muted: "#818181",
    success: "#00a84f",
    warning: "#c57b00",
    error: "#d91b3f",
    border: "rgba(26, 22, 20, 0.1)",
    borderStrong: "rgba(26, 22, 20, 0.18)",
    surface2: "#ebe3d6",
    surface3: "#ddd4c6",
    subtle: "#6d645c",
    accentForeground: "#fff7f4",
    signal: "#2b7a68",
  },
} as const;
