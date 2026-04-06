import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { projects } from "@/data/projects";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { cn } from "@/lib/utils";

function thumbnailExists(thumbnail: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", thumbnail));
}

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies in fintech, consumer, accessibility, and platform design.",
};

export default function WorkPage() {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

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
              10 projects across fintech, AI, travel, consumer apps, and accessibility — each one a story of constraints, decisions, and what shipped.
            </p>
          </div>
        </FadeUp>

        {/* Project list */}
        <StaggerChildren stagger={0.1}>
          {sorted.map((project, i) => (
            <StaggerItem key={project.slug}>
              <Link data-id={`work-project-link-${project.slug}`} href={`/work/${project.slug}`} className="group block">
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
                    {thumbnailExists(project.thumbnail) ? (
                      <Image
                        data-id={`work-project-thumb-img-${project.slug}`}
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 960px"
                        {...(i < 3 ? { priority: true } : {})}
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
                      <p data-id={`work-project-outcome-${project.slug}`} className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
                        {project.outcome}
                      </p>

                      {/* Tags */}
                      <div data-id={`work-project-tags-${project.slug}`} className="flex flex-wrap gap-2 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            data-id={`work-project-tag-${project.slug}-${tag.toLowerCase().replace(/\s/g, "-")}`}
                            className={cn(
                              "px-2.5 py-0.5 text-[10px] font-medium tracking-wide",
                              "bg-[var(--color-bg-elevated)]",
                              "border border-[var(--color-border-default)]",
                              "text-[var(--color-text-muted)]"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div data-id={`work-project-arrow-${project.slug}`} className={cn(
                      "hidden sm:flex items-center justify-center",
                      "w-10 h-10",
                      "border border-[var(--color-border-default)]",
                      "text-[var(--color-text-muted)]",
                      "group-hover:border-[var(--color-accent)]",
                      "group-hover:text-[var(--color-accent)]",
                      "group-hover:bg-[var(--color-accent-subtle)]",
                      "transition-all duration-300",
                      "group-hover:translate-x-1 group-hover:-translate-y-1"
                    )}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </div>
  );
}
