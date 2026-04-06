import type { Metadata } from "next";
import { Gloock } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { IntroAnimation } from "@/components/animations/IntroAnimation";
import { CaseStudyChat } from "@/components/chat/CaseStudyChat";

export const metadata: Metadata = {
  title: {
    default: "Arnab Debnath — Product Designer",
    template: "%s · Arnab Debnath",
  },
  description:
    "Product Designer II at JUSPAY. 4+ years designing fintech, travel, and platform products. CS background. Currently available for senior roles and freelance.",
  keywords: [
    "product designer",
    "UX designer",
    "fintech design",
    "JUSPAY",
    "Bengaluru designer",
    "AI-first design",
  ],
  authors: [{ name: "Arnab Debnath" }],
  creator: "Arnab Debnath",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://arnabdebnath.in",
    siteName: "Arnab Debnath",
    title: "Arnab Debnath — Product Designer",
    description:
      "Product Designer II at JUSPAY. Designing payment flows used by millions.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@arnab_design",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`relative h-full ${gloock.variable}`}
      suppressHydrationWarning
    >
      <body data-id="root-body" className="min-h-full flex flex-col bg-[var(--color-bg-base)] text-[var(--color-text-primary)]">
        <div data-id="noise-overlay" aria-hidden="true" className="noise-overlay" />
        <Providers>
          <IntroAnimation />
          <SmoothScroll />
          <Navbar />
          <main data-id="root-main" className="flex-1">{children}</main>
          <Footer />
          <CaseStudyChat />
        </Providers>
      </body>
    </html>
  );
}
