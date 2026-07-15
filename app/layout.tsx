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
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://earnoo.vercel.app/",
    siteName: "Erkinbekov Arnoo",
    title: "Erkinbekov Arnoo — Product Designer",
    description:
      "UX research, product design and expressive digital experiences.",
    images: [
      {
        url: "https://earnoo.vercel.app/og-preview-v2.png",
        width: 1200,
        height: 630,
        alt: "Erkinbekov Arnoo portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erkinbekov Arnoo — Product Designer",
    description:
      "UX research, product design and expressive digital experiences.",
    images: [
      "https://earnoo.vercel.app/og-preview-v2.png",
    ],
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
