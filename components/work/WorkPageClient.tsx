"use client";

import { useState, useEffect, useCallback, useRef, ReactNode, CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { CaseStudyModal } from "@/components/work/CaseStudyModal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface WorkPageClientProps {
  sorted: Project[];
  caseStudyContent: Record<string, ReactNode>;
}

interface StackedCardProps {
  project: Project;
  index: number;
  total: number;
  hasContent: boolean;
  onOpen: () => void;
  parentProgress: MotionValue<number>;
}

function StackedCard({
  project,
  index,
  total,
  hasContent,
  onOpen,
  parentProgress,
}: StackedCardProps) {
  const isLast = index === total - 1;

  /*
   * Each card occupies a [i/total, (i+1)/total] slice of the parent's scroll progress.
   * Within its slice, the next card slides up from below. We want the previous card to
   * fade to 0 as the next has covered ~30% — that's the last 30% of the slice.
   */
  const segment = 1 / total;
  const fadeStart = (index + 0.7) * segment;
  const fadeEnd = (index + 1) * segment;

  const opacity = useTransform(
    parentProgress,
    isLast ? [0, 1] : [fadeStart, fadeEnd],
    isLast ? [1, 1] : [1, 0]
  );

  return (
    <motion.div
      data-id={`work-card-sticky-${project.slug}`}
      className={cn(
        "sticky top-[var(--work-card-top)] [opacity:var(--card-opacity)] will-change-[opacity]",
        !isLast && "mb-[70vh]"
      )}
      style={{ "--card-opacity": opacity } as CSSProperties}
    >
      <ProjectCard
        project={project}
        hasContent={hasContent}
        onOpen={onOpen}
        eager={index < 2}
      />
    </motion.div>
  );
}

export function WorkPageClient({ sorted, caseStudyContent }: WorkPageClientProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const stackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const openSlug = searchParams.get("open");
    if (openSlug && caseStudyContent[openSlug]) {
      setActiveSlug(openSlug);
    }
  }, [searchParams, caseStudyContent]);

  const handleClose = useCallback(() => setActiveSlug(null), []);

  return (
    <div
      data-id="work-page"
      className="min-h-screen [--work-header-top:80px] [--work-card-top:260px]"
    >
      {/* Sticky header — title + description pinned at top */}
      <div
        data-id="work-sticky-header"
        className="sticky top-[var(--work-header-top)] z-30 pt-8 pb-6 bg-[var(--color-bg-base)]/95 backdrop-blur-md"
      >
        <div data-id="work-header-container" className="max-w-6xl mx-auto px-6">
          <div data-id="work-header" className="max-w-xl flex flex-col gap-3">
            <div data-id="work-header-label-row" className="flex items-center gap-3">
              <span data-id="work-header-rule" className="rule-red" />
              <p data-id="work-header-label" className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.14em]">
                Selected Work
              </p>
            </div>
            <h1 data-id="work-heading" className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-[var(--color-text-primary)] leading-[1.05]">
              Case studies
            </h1>
            <p data-id="work-subline" className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              8 projects across fintech, AI, developer tools, and consumer apps — each one a story of constraints, decisions, and what shipped.
            </p>
          </div>
        </div>
      </div>

      {/* Stacked cards — all sticky in same parent so they truly stack and stay pinned */}
      <div
        ref={stackRef}
        data-id="work-stack"
        className="max-w-6xl mx-auto px-6 pb-[40vh]"
      >
        {sorted.map((project, i) => (
          <StackedCard
            key={project.slug}
            project={project}
            index={i}
            total={sorted.length}
            hasContent={!!caseStudyContent[project.slug]}
            onOpen={() => setActiveSlug(project.slug)}
            parentProgress={scrollYProgress}
          />
        ))}
      </div>

      <CaseStudyModal open={activeSlug !== null} onClose={handleClose}>
        {activeSlug && caseStudyContent[activeSlug]}
      </CaseStudyModal>
    </div>
  );
}
