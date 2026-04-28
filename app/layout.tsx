import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Photo Gallery | Full-Stack SPA",
  description: "A modern, infinite-scroll photo gallery with hashtag filtering — built with Next.js and TypeScript.",
  keywords: ["Next.js", "TypeScript", "Gallery", "Pinterest Style", "Diversition Digital Solutions"],
  authors: [{ name: "Nuttapat Pothavichai" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
