import type { Metadata } from "next";
import { Outfit, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { FerroCoreProvider } from "@/features/ferro-core";
import { AudioProvider } from "@/features/audio-engine";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-display-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "FERRO.OS",
  description: "A cinematic operating system experience for the future of the portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <AudioProvider>
            <FerroCoreProvider>{children}</FerroCoreProvider>
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
