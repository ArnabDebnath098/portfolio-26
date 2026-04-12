"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { CaseStudyModal } from "@/components/work/CaseStudyModal";
import type { Project } from "@/data/projects";

interface WorkPageClientProps {
  sorted: (Project & { hasThumb: boolean })[];
  /** Pre-rendered case study content keyed by slug */
  caseStudyContent: Record<string, ReactNode>;
}

const TAG_COLORS = [
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-600 dark:text-white",
  "bg-amber-100 text-amber-800 dark:bg-amber-400 dark:text-amber-950",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500 dark:text-white",
  "bg-rose-100 text-rose-700 dark:bg-rose-500 dark:text-white",
];

export function WorkPageClient({ sorted, caseStudyContent }: WorkPageClientProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const tagColor = (idx: number) => TAG_COLORS[idx % 4];


  // Auto-open modal from ?open=slug query param (client-side only)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const openSlug = params.get("open");
    if (openSlug && caseStudyContent[openSlug]) {
      setActiveSlug(openSlug);
    }
  }, [caseStudyContent]);

  return (
    <div data-id="work-page" className="min-h-screen pt-28 pb-32">
      <div data-id="work-container" className="max-w-5xl mx-auto px-6 flex flex-col gap-16">

        {/* Header */}
        <FadeUp>
          <div data-id="work-header" className="max-w-xl flex flex-col gap-3">
            <div data-id="work-header-label-row" className="flex items-center gap-3">
              <span data-id="work-header-rule" className="rule-red" />
              <p data-id="work-header-label" className="text-[10px] font-medium text-[var(--color-text-muted)] uppercase tracking-[0.14em]">
                Selected Work
              </p>
            </div>
            <h1 data-id="work-heading" className="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-[var(--color-text-primary)] leading-[1.05]">
              Case studies
            </h1>
            <p data-id="work-subline" className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              7 projects across fintech, AI, travel, and consumer apps — each one a story of constraints, decisions, and what shipped.
            </p>
          </div>
        </FadeUp>

        {/* Project list */}
        <StaggerChildren stagger={0.1}>
          {sorted.map((project, i) => (
            <StaggerItem key={project.slug}>
              <button
                data-id={`work-project-link-${project.slug}`}
                onClick={() => {
                  if (project.externalLink) {
                    window.open(project.externalLink, "_blank", "noopener,noreferrer");
                  } else if (caseStudyContent[project.slug]) {
                    setActiveSlug(project.slug);
                  }
                }}
                className={cn(
                  "group block w-full text-left",
                  (project.externalLink || caseStudyContent[project.slug]) ? "cursor-pointer" : "cursor-default"
                )}
              >
                <div data-id={`work-project-row-${project.slug}`} className={cn(
                  "flex flex-col gap-5",
                  "py-8 border-b border-[var(--color-border-default)]",
                  "hover:border-[var(--color-border-strong)]",
                  "transition-colors duration-200"
                )}>
                  {/* Thumbnail */}
                  <div
                    data-id={`work-project-thumb-${project.slug}`}
                    className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg-subtle)] transition-transform duration-500 group-hover:scale-[1.01]"
                  >
                    {project.hasThumb ? (
                      <Image
                        data-id={`work-project-thumb-img-${project.slug}`}
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 960px"
                        {...(i < 5 ? { preload: true } : {})}
                      />
                    ) : (
                      <div
                        data-id={`work-project-thumb-placeholder-${project.slug}`}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span data-id={`work-project-thumb-placeholder-text-${project.slug}`} className="text-xs font-medium tracking-wide uppercase text-[var(--color-text-muted)] opacity-40">
                          {project.company}
                        </span>
                      </div>
                    )}
                  </div>

                  <div data-id={`work-project-bottom-${project.slug}`} className="grid sm:grid-cols-[1fr_auto] gap-6 items-start">
                    <div data-id={`work-project-info-${project.slug}`} className="space-y-3">
                      {/* Meta */}
                      <div data-id={`work-project-meta-${project.slug}`} className="flex items-center gap-3">
                        <span data-id={`work-project-index-${project.slug}`} className="font-datatype text-xs text-[var(--color-text-muted)]">
                          0{i + 1}
                        </span>
                        <span data-id={`work-project-subtitle-${project.slug}`} className="text-xs text-[var(--color-text-muted)]">
                          {project.subtitle}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 data-id={`work-project-title-${project.slug}`} className={cn(
                        "text-xl sm:text-2xl font-semibold tracking-[-0.03em]",
                        "text-[var(--color-text-primary)]",
                        "group-hover:text-[var(--color-accent)]",
                        "transition-colors duration-200 leading-snug"
                      )}>
                        {project.title}
                      </h2>

                      {/* Description */}
                      <p data-id={`work-project-outcome-${project.slug}`} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {project.outcome}
                      </p>

                      {/* Tags */}
                      <div data-id={`work-project-tags-${project.slug}`} className="flex flex-wrap gap-2 pt-1">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={tag}
                            data-id={`work-project-tag-${project.slug}-${tag.toLowerCase().replace(/\s/g, "-")}`}
                            className={cn(
                              "px-2.5 py-0.5 text-[10px] font-semibold tracking-wide rounded-full",
                              tagColor(idx)
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow / Lock */}
                    <div data-id={`work-project-arrow-${project.slug}`} className={cn(
                      "hidden sm:flex items-center justify-center",
                      "w-10 h-10",
                      "border border-[var(--color-border-default)]",
                      "text-[var(--color-text-muted)]",
                      "transition-all duration-300",
                      project.locked
                        ? "cursor-not-allowed"
                        : [
                            "group-hover:border-[var(--color-accent)]",
                            "group-hover:text-[var(--color-accent)]",
                            "group-hover:bg-[var(--color-accent-subtle)]",
                            "group-hover:translate-x-1 group-hover:-translate-y-1",
                          ]
                    )}>
                      {project.locked ? (
                        <svg data-id={`work-project-lock-${project.slug}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      ) : (
                        <svg data-id={`work-project-arrow-icon-${project.slug}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17L17 7M7 7h10v10" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      {/* Case study modal */}
      <CaseStudyModal
        open={activeSlug !== null}
        onClose={() => setActiveSlug(null)}
      >
        {activeSlug && caseStudyContent[activeSlug]}
      </CaseStudyModal>
    </div>
  );
}
