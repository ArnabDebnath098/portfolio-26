"use client";

import { useState, useEffect, useCallback, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { CaseStudyModal } from "@/components/work/CaseStudyModal";
import { ProjectCard } from "@/components/work/ProjectCard";
import type { Project } from "@/data/projects";

interface WorkPageClientProps {
  sorted: Project[];
  caseStudyContent: Record<string, ReactNode>;
}

export function WorkPageClient({ sorted, caseStudyContent }: WorkPageClientProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const searchParams = useSearchParams();

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
      className="min-h-screen [--work-header-top:80px]"
    >
      {/* Header — scrolls with the page */}
      <div
        data-id="work-sticky-header"
        className="pt-24 pb-6"
      >
        <div data-id="work-header-container" className="max-w-[1104px] mx-auto px-6">
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

      {/* Normal scrolling list of cards */}
      <div
        data-id="work-list"
        className="max-w-[1104px] mx-auto px-6 flex flex-col gap-16 pt-8 pb-24"
      >
        {sorted.map((project, i) => (
          <div key={project.slug} data-id={`work-card-${project.slug}`}>
            <ProjectCard
              project={project}
              hasContent={!!caseStudyContent[project.slug]}
              onOpen={() => setActiveSlug(project.slug)}
              eager={i < 2}
            />
          </div>
        ))}
      </div>

      <CaseStudyModal open={activeSlug !== null} onClose={handleClose}>
        {activeSlug && caseStudyContent[activeSlug]}
      </CaseStudyModal>
    </div>
  );
}
