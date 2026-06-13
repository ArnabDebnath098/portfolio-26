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
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { IntroAnimation } from "@/components/animations/IntroAnimation";
import { CaseStudyChat } from "@/components/chat/CaseStudyChat";
import { LikeButton } from "@/components/ui/LikeButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://arnabdebnath.in"),
  title: {
    default: "Arnab Debnath — Product Designer for Hire | Fintech, SaaS & UX",
    template: "%s · Arnab Debnath — Product Designer",
  },
  description:
    "Senior Product Designer (JUSPAY) available for hire and freelance. 4+ years designing fintech, payments, SaaS, and AI-first products. Based in Bengaluru, working remote with teams worldwide. Hire me for UX, design systems, mobile, web, and end-to-end product design.",
  keywords: [
    // Core role
    "product designer",
    "senior product designer",
    "UX designer",
    "UI designer",
    "UX/UI designer",
    "interaction designer",
    "product design lead",
    // Hiring intent
    "hire product designer",
    "hire UX designer",
    "freelance product designer",
    "freelance UX designer",
    "product designer for hire",
    "product designer available",
    "contract product designer",
    "remote product designer",
    "product design consultant",
    "design consultant",
    // Verticals
    "fintech product designer",
    "fintech UX designer",
    "payments designer",
    "checkout UX designer",
    "SaaS product designer",
    "B2B product designer",
    "mobile app designer",
    "AI product designer",
    "AI UX designer",
    "design systems designer",
    "design system specialist",
    // Location
    "product designer Bengaluru",
    "product designer Bangalore",
    "product designer India",
    "freelance designer Bengaluru",
    "freelance designer India",
    "remote designer India",
    // Brand context
    "JUSPAY designer",
    "Arnab Debnath",
    "Arnab Debnath portfolio",
  ],
  authors: [{ name: "Arnab Debnath", url: "https://arnabdebnath.in" }],
  creator: "Arnab Debnath",
  publisher: "Arnab Debnath",
  applicationName: "Arnab Debnath — Portfolio",
  category: "Design",
  alternates: {
    canonical: "https://arnabdebnath.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://arnabdebnath.in",
    siteName: "Arnab Debnath — Product Designer",
    title: "Arnab Debnath — Product Designer for Hire | Fintech, SaaS & UX",
    description:
      "Senior Product Designer (JUSPAY) available for hire and freelance. 4+ years across fintech, payments, SaaS, AI, and design systems. Bengaluru · Remote.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@arnab_design",
    creator: "@arnab_design",
    title: "Arnab Debnath — Product Designer for Hire | Fintech, SaaS & UX",
    description:
      "Senior Product Designer (JUSPAY) available for hire and freelance. Fintech · Payments · SaaS · AI · Design Systems. Bengaluru · Remote.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arnab Debnath",
  alternateName: "Arnab",
  url: "https://arnabdebnath.in",
  image: "https://arnabdebnath.in/images/arnab.jpg",
  jobTitle: "Senior Product Designer",
  description:
    "Senior Product Designer with 4+ years across fintech, payments, SaaS, AI, and design systems. Available for hire and freelance.",
  worksFor: {
    "@type": "Organization",
    name: "JUSPAY",
    url: "https://juspay.in",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Institute of Engineering and Technology, AKTU",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Product Design",
    "UX Design",
    "UI Design",
    "Interaction Design",
    "Fintech Design",
    "Payments UX",
    "Checkout UX",
    "SaaS Design",
    "Design Systems",
    "AI Product Design",
    "Mobile App Design",
    "Web Design",
    "Prototyping",
    "Figma",
    "React",
    "Next.js",
    "TypeScript",
  ],
  sameAs: [
    "https://www.linkedin.com/in/arnabdebnath07/",
    "https://dribbble.com/arnab_design",
    "https://twitter.com/arnab_design",
    "https://medium.com/@Arnab_Debnath",
  ],
  seeks: {
    "@type": "Demand",
    name: "Freelance and full-time product design opportunities",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Arnab Debnath — Product Designer",
  url: "https://arnabdebnath.in",
  inLanguage: "en-IN",
  author: {
    "@type": "Person",
    name: "Arnab Debnath",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <div data-id="noise-overlay" aria-hidden="true" className="noise-overlay" />
        <Providers>
          <IntroAnimation />
          <SmoothScroll />
          <Navbar />
          <ScrollProgress />
          <main data-id="root-main" className="flex-1">{children}</main>
          <Footer />
          <CaseStudyChat />
          <LikeButton />
        </Providers>
      </body>
    </html>
  );
}
