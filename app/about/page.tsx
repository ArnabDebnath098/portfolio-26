import { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { BioScroll } from "@/components/about/BioScroll";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { BeyondPixels } from "@/components/about/BeyondPixels";
import { AboutCloser } from "@/components/about/AboutCloser";

export const metadata: Metadata = {
  title: "About",
  description: "Product Designer II at JUSPAY. CS background. Painting obsession.",
};

/**
 * Info — an editorial read, in the home page's voice: the shared indexed
 * SectionHeader anatomy (01 About · 02 Experience · 03 Beyond the Pixels),
 * a scroll-fill manifesto, a self-drawing timeline, and a marquee closer.
 */
export default function AboutPage() {
  return (
    <div data-id="about-page" className="min-h-screen pt-28">
      <div data-id="about-container" className="mx-auto flex max-w-[1104px] flex-col gap-24 px-6 sm:gap-32">
        <AboutHero />
        <BioScroll />
        <ExperienceTimeline />
        <BeyondPixels />
      </div>
      {/* Full-bleed marquee + closing statement */}
      <AboutCloser />
    </div>
  );
}
