import { Metadata } from "next";
import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "Product Designer II at JUSPAY. CS background. Painting obsession.",
};

const timeline = [
  {
    year: "2023–Now",
    role: "Product Designer II",
    company: "JUSPAY",
    detail: "Designing payment flows at the intersection of trust and speed. Working on checkout UX, embedded finance, and new-to-bank onboarding at scale.",
  },
  {
    year: "2022",
    role: "Product Designer",
    company: "AirAsia",
    detail: "Designed for the digital lifestyle ecosystem — travel, food, and fintech all under one product umbrella.",
  },
  {
    year: "2018–2022",
    role: "B.Tech, Computer Science",
    company: "IET, AKTU",
    detail: "Built the foundation in systems thinking. Learned to read code before I learned to read user research.",
  },
];

export default function AboutPage() {
  return (
    <div data-id="about-page" className="min-h-screen pt-28 pb-32">
      <div data-id="about-container" className="max-w-5xl mx-auto px-6 flex flex-col gap-16">

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

        <div data-id="about-content-grid" className="max-w-2xl">

          {/* Bio */}
          <div data-id="about-bio" className="space-y-6 text-base text-[var(--color-text-secondary)] leading-relaxed">
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
                <Link data-id="about-cta-work" href="/work" className={buttonVariants({ variant: "primary", size: "md" })}>
                  See my work
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  data-id="about-cta-linkedin"
                  href="https://www.linkedin.com/in/arnabdebnath07/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "secondary", size: "md" })}
                >
                  LinkedIn
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
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
                  <div data-id={`about-timeline-content-${item.year.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`} className="space-y-1">
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
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

      </div>
    </div>
  );
}
