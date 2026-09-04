import type { Metadata } from "next";
import { Manrope, Space_Mono, Unbounded } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
});

export const metadata: Metadata = {
  title: "Tech Hodu® — Websites that make brands impossible to ignore",
  description: "Strategy, UI/UX, WordPress and high-performance development for ambitious brands. Tech Hodu is your creative growth partner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceMono.variable} ${unbounded.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
