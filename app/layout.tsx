import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Hamza Sajid | Lead Software Engineer",
  description:
    "Lead Software Engineer with 4+ years of experience architecting and shipping 9 production systems across healthcare, insurtech, fintech, and real-time communication.",
  keywords: [
    "Software Engineer",
    "Lead Engineer",
    "Full Stack",
    "Node.js",
    "React",
    "Next.js",
    "Django",
    "Pakistan",
  ],
  openGraph: {
    title: "Muhammad Hamza Sajid | Lead Software Engineer",
    description:
      "Architecting systems that scale. Leading teams that ship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
