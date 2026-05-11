import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { cn } from "@/lib/utils";
import { PressButton } from "@/components/ui/PressButton";
import { BeyondPixels } from "@/components/about/BeyondPixels";

export const metadata: Metadata = {
  title: "About",
  description: "Product Designer II at JUSPAY. CS background. Painting obsession.",
};

const timeline = [
  {
    year: "2022–Present · 4+ yrs",
    role: "Product Designer II",
    company: "JUSPAY",
    logo: "/images/juspay-logo.png",
    detail: "Designing and scaling AI-driven products that blend intelligent automation with seamless user experiences. Worked across fintech and B2B SaaS — from checkout UX to embedded finance at scale.",
  },
  {
    year: "Oct 2021–Jan 2022",
    role: "Product Design Intern",
    company: "AirAsia",
    logo: "/images/airasia-logo.png",
    detail: "Designed for the digital lifestyle ecosystem — travel, food, and fintech all under one product umbrella.",
  },
  {
    year: "Dec 2020–Jun 2021",
    role: "Frontend Developer Intern",
    company: "Qualyval",
    detail: "Built frontend interfaces bridging design and development, sharpening the eye for implementation-aware design.",
  },
  {
    year: "Oct 2019–Jan 2020",
    role: "Frontend Developer Intern",
    company: "Webrocode",
    detail: "First professional experience — learned to ship real code and collaborate in a team environment.",
  },
];

export default function AboutPage() {
  return (
    <div data-id="about-page" className="min-h-screen pt-28 pb-32">
      <div data-id="about-container" className="max-w-[1200px] mx-auto px-6 flex flex-col gap-16">

        {/* Header */}
        <FadeUp className="flex flex-col gap-3">
          <div data-id="about-header-label-row" className="flex items-center gap-3">
            <span data-id="about-header-rule" className="rule-red" />
            <p data-id="about-header-label" className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.14em]">
              About
            </p>
          </div>
          <h1 data-id="about-heading" className="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-[var(--color-text-primary)] leading-[1.05] max-w-2xl">
            I design for the moment that matters.
          </h1>
        </FadeUp>

        {/* Profile image + Bio side by side on desktop */}
        <div data-id="about-content-grid" className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Profile photo */}
          <FadeUp delay={0.05} className="shrink-0">
            <div data-id="about-profile-photo" className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-[24px] overflow-hidden border border-[var(--color-border-default)]">
              <Image
                data-id="about-profile-img"
                src="/images/myprofileimage.png"
                alt="Arnab Debnath"
                fill
                sizes="(min-width: 640px) 224px, 192px"
                className="object-cover"
                priority
              />
            </div>
          </FadeUp>

          {/* Bio */}
          <div data-id="about-bio" className="space-y-6 text-base text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            <FadeUp delay={0.1}>
              <p data-id="about-bio-p1">
                At JUSPAY, that moment is checkout — when someone is deciding whether to trust a product with their money. I&apos;ve spent the last few years making that moment shorter, clearer, and less scary for millions of users.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p data-id="about-bio-p2">
                I came to design through engineering and art. I studied Computer Science, which gave me a strong opinion about how systems should work. I painted, which gave me a strong opinion about how things should feel. Those two instincts don&apos;t always agree — the tension between them is where my best work comes from.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p data-id="about-bio-p3">
                I work closest to PMs and engineers. I read PRDs before wireframes. I flag edge cases before usability tests. I&apos;ve shipped prototypes myself when words and mockups weren&apos;t enough to land the idea.
              </p>
            </FadeUp>

            <FadeUp delay={0.25}>
              <p data-id="about-bio-p4">
                Right now I&apos;m exploring how AI changes the research-to-design loop. Not the tools — the thinking. What does it mean to synthesize 100 user interviews in an afternoon? What decisions can you make faster, and which ones still need slowness?
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p data-id="about-bio-p5" className="text-[var(--color-text-muted)]">
                Outside of work: painting (always), reading about systems design, and building things that probably won&apos;t ship.
              </p>
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.35}>
              <div data-id="about-cta-row" className="flex flex-wrap gap-3 pt-4">
                <PressButton data-id="about-cta-work" variant="primary" href="/work">
                  See my work
                </PressButton>
                <PressButton
                  data-id="about-cta-linkedin"
                  variant="secondary"
                  href="https://www.linkedin.com/in/arnabdebnath07/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </PressButton>
              </div>
            </FadeUp>
          </div>

        </div>

        {/* Timeline */}
        <div data-id="about-timeline-section" className="pt-8 flex flex-col gap-10">
          <FadeUp>
            <div data-id="about-timeline-header" className="flex items-center gap-3">
              <span data-id="about-timeline-rule" className="rule-red" />
              <h2 data-id="about-timeline-heading" className="text-2xl font-bold tracking-[-0.03em] text-[var(--color-text-primary)]">
                Experience
              </h2>
            </div>
          </FadeUp>

          <StaggerChildren stagger={0.1}>
            {timeline.map((item) => (
              <StaggerItem key={item.year}>
                <div data-id={`about-timeline-item-${item.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`} className={cn(
                  "grid sm:grid-cols-[160px_1fr] gap-4 sm:gap-8",
                  "py-7 border-b border-[var(--color-border-default)]"
                )}>
                  <p data-id={`about-timeline-year-${item.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`} className="font-datatype text-sm text-[var(--color-text-muted)] pt-0.5 shrink-0">
                    {item.year}
                  </p>
                  <div data-id={`about-timeline-content-${item.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`} className="flex items-start gap-4">
                    <div data-id={`about-timeline-content-inner-${item.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`} className="space-y-1 flex-1">
                    <div data-id={`about-timeline-role-row-${item.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`} className="flex items-baseline gap-2">
                      <h3 data-id={`about-timeline-role-${item.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`} className="text-base font-semibold text-[var(--color-text-primary)]">
                        {item.role}
                      </h3>
                      <span data-id={`about-timeline-company-${item.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`} className="text-sm text-[var(--color-accent)]">· {item.company}</span>
                    </div>
                    <p data-id={`about-timeline-detail-${item.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {item.detail}
                    </p>
                    </div>
                    {"logo" in item && item.logo && (
                      <Image
                        data-id={`about-timeline-logo-${item.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
                        src={item.logo}
                        alt={item.company}
                        width={56}
                        height={56}
                        className="shrink-0 object-contain ml-auto"
                      />
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

        {/* Personality / Hobbies */}
        <BeyondPixels />

      </div>
    </div>
  );
}
