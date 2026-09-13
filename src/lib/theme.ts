export type ThemeMode = "dark" | "light";

export const THEME_STORAGE_KEY = "ferro-os-theme";

export const themeTokens = {
  dark: {
    background: "#090909",
    surface: "#141414",
    surfaceStrong: "#1f1f1f",
    surface2: "#17171a",
    surface3: "#1f1f24",
    primary: "#d90429",
    textPrimary: "#f8f8f8",
    textSecondary: "#b5b5b5",
    muted: "#6f6f6f",
    subtle: "#4a4a4f",
    signal: "#3d9b84",
    signalForeground: "#e7faf4",
    border: "rgb(248 248 248 / 0.1)",
    borderStrong: "rgb(248 248 248 / 0.18)",
    success: "#00c853",
    warning: "#ffb300",
    error: "#ff1744",
  },
  light: {
    background: "#f5f5f5",
    surface: "#ffffff",
    surfaceStrong: "#ececec",
    surface2: "#f0f0f0",
    surface3: "#e4e4e4",
    primary: "#d90429",
    textPrimary: "#0f0f0f",
    textSecondary: "#4b4b4b",
    muted: "#818181",
    subtle: "#9c9c9c",
    signal: "#2b7a68",
    signalForeground: "#0d211c",
    border: "rgb(15 15 15 / 0.1)",
    borderStrong: "rgb(15 15 15 / 0.18)",
    success: "#00a84f",
    warning: "#c57b00",
    error: "#d91b3f",
  },
} as const;
