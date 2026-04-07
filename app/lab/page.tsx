export const dynamic = "force-static";

import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { FadeUp } from "@/components/animations/FadeUp";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { explorations } from "@/data/explorations";
import { MasonryGrid } from "@/components/lab/MasonryGrid";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments, prototypes, and AI workflow explorations.",
};

export default function LabPage() {
  const hasImages = explorations.map((exp) =>
    fs.existsSync(path.join(process.cwd(), "public", exp.image))
  );

  return (
    <div data-id="lab-page" className="min-h-screen pt-28 pb-32">
      <div data-id="lab-container" className="max-w-6xl mx-auto px-6 flex flex-col gap-16">

        {/* Header */}
        <FadeUp className="flex flex-col gap-3">
          <div data-id="lab-header-label-row" className="flex items-center gap-3">
            <span data-id="lab-header-rule" className="rule-red" />
            <p data-id="lab-header-label" className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.14em]">
              Lab
            </p>
          </div>
          <h1 data-id="lab-heading" className="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-[var(--color-text-primary)] leading-[1.05]">
            Experiments
          </h1>
          <p data-id="lab-subline" className="text-base text-[var(--color-text-secondary)] max-w-lg leading-relaxed">
            Quick builds, process essays, and AI workflow explorations. Things that don&apos;t fit into a case study but shaped how I work.
          </p>
        </FadeUp>

        {/* UI Explorations — Pinterest masonry */}
        <div data-id="lab-explorations-section" className="flex flex-col gap-6">
          <FadeUp>
            <div data-id="lab-explorations-header" className="flex items-center gap-3">
              <span data-id="lab-explorations-rule" className="rule-red" />
              <h2 data-id="lab-explorations-heading" className="text-2xl font-bold tracking-[-0.03em] text-[var(--color-text-primary)]">
                UI Explorations
              </h2>
            </div>
          </FadeUp>
          <MasonryGrid items={explorations} hasImages={hasImages} />
        </div>

        {/* GitHub nudge */}
        <FadeUp delay={0.2}>
          <div data-id="lab-github-nudge" className={cn(
            "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
            "p-5",
            "border border-[var(--color-border-default)]",
            "bg-[var(--color-bg-surface)]"
          )}>
            <div data-id="lab-github-text" className="flex flex-col gap-0.5">
              <p data-id="lab-github-heading" className="text-sm font-semibold text-[var(--color-text-primary)]">
                Want to see the code behind this site?
              </p>
              <p data-id="lab-github-sub" className="text-xs text-[var(--color-text-muted)]">
                Built with Next.js 15, Tailwind v4, Motion, and Lenis
              </p>
            </div>
            <a
              data-id="lab-github-link"
              href="https://github.com/ArnabDebnath098"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "secondary", size: "sm", className: "shrink-0" })}
            >
              GitHub →
            </a>
          </div>
        </FadeUp>

      </div>
    </div>
  );
}
