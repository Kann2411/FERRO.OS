export type Lang = "es" | "en";

export type Bilingual<T = string> = Record<Lang, T>;
