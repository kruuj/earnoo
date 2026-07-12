import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Erkinbekov Arnoo — Creative Developer",
    template: "%s — Erkinbekov Arnoo",
  },
  description:
    "Independent designer and developer shaping expressive digital experiences from Chicago.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
