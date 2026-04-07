"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { BotanicMark } from "@/components/illustrations/IndianOrnaments";

function ProjectCard({ project }: { project: Project }) {
  return (
    <StaggerItem>
      <Link data-id={`project-card-link-${project.slug}`} href={`/work?open=${project.slug}`} className="group block h-full">
        <div
          data-id={`project-card-${project.slug}`}
          className="h-full border border-[var(--color-border-default)] rounded-2xl overflow-hidden bg-[var(--color-bg-base)] hover:border-[var(--color-ornament)] transition-colors duration-300"
        >
          {/* Thumbnail */}
          <div data-id={`project-card-thumb-${project.slug}`} className="p-4 pb-0">
            <div
              data-id={`project-card-thumb-inner-${project.slug}`}
              className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg-subtle)] transition-transform duration-500 group-hover:scale-[1.02]"
            >
              {project.thumbnail && (
                <Image
                  data-id={`project-card-thumb-img-${project.slug}`}
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              )}
              <div data-id={`project-card-thumb-tags-${project.slug}`} className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    data-id={`project-card-tag-${project.slug}-${tag.toLowerCase().replace(/\s/g, "-")}`}
                    className="px-2.5 py-1 text-[10px] font-medium tracking-wide rounded-full bg-[var(--color-bg-base)]/90 backdrop-blur-sm text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div data-id={`project-card-content-${project.slug}`} className="p-6 space-y-3">
            {/* Ornamental divider */}
            <div data-id={`project-card-divider-${project.slug}`} className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <circle cx="6" cy="6" r="4" stroke="var(--color-ornament)" strokeWidth="0.6" />
                <circle cx="6" cy="6" r="1.5" fill="var(--color-ornament)" opacity="0.5" />
              </svg>
              <div data-id={`project-card-divider-line-${project.slug}`} className="flex-1 h-px bg-[var(--color-ornament)] opacity-15" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <circle cx="6" cy="6" r="4" stroke="var(--color-ornament)" strokeWidth="0.6" />
                <circle cx="6" cy="6" r="1.5" fill="var(--color-ornament)" opacity="0.5" />
              </svg>
            </div>

            <h3
              data-id={`project-card-title-${project.slug}`}
              className="text-lg md:text-xl font-display text-[var(--color-text-primary)] leading-snug group-hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              {project.title}
            </h3>

            <p data-id={`project-card-subtitle-${project.slug}`} className="text-[11px] font-medium tracking-wide uppercase text-[var(--color-ornament)]">
              {project.company} · {project.year}
            </p>

            <p data-id={`project-card-outcome-${project.slug}`} className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
              {project.outcome}
            </p>

            <div data-id={`project-card-flourish-${project.slug}`} aria-hidden className="flex justify-center pt-2 opacity-25">
              <svg width="48" height="8" viewBox="0 0 48 8" fill="none">
                <path d="M0 4 Q6 0 12 4 Q18 8 24 4 Q30 0 36 4 Q42 8 48 4" stroke="var(--color-ornament)" strokeWidth="0.8" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </StaggerItem>
  );
}

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section data-id="project-grid" className="max-w-5xl mx-auto px-6 pt-16 pb-32 flex flex-col gap-10">
      {/* Section header */}
      <motion.div
        data-id="project-grid-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
          <div data-id="project-grid-header-content" className="flex flex-col gap-2">
            <div data-id="project-grid-label-row" className="flex items-center gap-3">
              <BotanicMark size={20} color="var(--color-ornament)" opacity={0.7} />
              <p data-id="project-grid-label" className="text-[10px] font-medium tracking-[0.14em] uppercase text-[var(--color-ornament)]">Selected Work</p>
            </div>
            <h2 data-id="project-grid-heading" className={cn(
              "text-3xl font-display tracking-[-0.02em]",
              "text-[var(--color-text-primary)]"
            )}>
              Case Studies
            </h2>
          </div>
      </motion.div>

      {/* Grid — first 4 only */}
      <StaggerChildren
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        delay={0.1}
        stagger={0.1}
      >
        {projects.slice(0, 4).map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </StaggerChildren>

      {/* View more */}
      {projects.length > 4 && (
        <motion.div
          data-id="project-grid-view-more"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <Link
            data-id="project-grid-view-more-link"
            href="/work"
            className={cn(
              "inline-flex items-center gap-2 px-6 py-2.5",
              "text-sm font-medium tracking-wide",
              "border border-[var(--color-border-default)]",
              "rounded-full",
              "text-[var(--color-text-secondary)]",
              "hover:border-[var(--color-border-strong)]",
              "hover:text-[var(--color-text-primary)]",
              "transition-colors duration-200"
            )}
          >
            View all work
            <svg data-id="project-grid-view-more-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      )}
    </section>
  );
}
