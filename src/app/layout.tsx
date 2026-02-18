import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jedy Matt Tabasco | Software Engineer",
  description:
    "Portfolio of Jedy Matt Tabasco — Software Engineer from the Philippines building web and mobile applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          jetbrainsMono.variable,
          outfit.variable,
          "font-[family-name:var(--font-sans)] antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
