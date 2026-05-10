"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { BotanicMark } from "@/components/illustrations/IndianOrnaments";
import { CaseStudyModal } from "@/components/work/CaseStudyModal";
import { PressButton } from "@/components/ui/PressButton";
import { ProjectCard } from "@/components/work/ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  caseStudyContent?: Record<string, ReactNode>;
}

export function ProjectGrid({ projects, caseStudyContent = {} }: ProjectGridProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <section data-id="project-grid" className="w-full sm:w-[90%] sm:max-w-[80vw] mx-auto px-4 sm:px-6 pt-16 pb-32 flex flex-col gap-10">
      {/* Section header */}
      <motion.div
        data-id="project-grid-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center gap-2"
      >
        <div data-id="project-grid-label-row" className="flex items-center justify-center gap-3">
          <BotanicMark size={20} color="var(--color-ornament)" opacity={0.7} />
          <p data-id="project-grid-label" className="text-[10px] font-medium tracking-[0.14em] uppercase text-[var(--color-ornament)]">Selected Work</p>
        </div>
        <h2 data-id="project-grid-heading" className={cn(
          "text-3xl font-display tracking-[-0.02em]",
          "text-[var(--color-text-primary)]"
        )}>
          Case Studies
        </h2>
      </motion.div>

      {/* Grid — first 4 only */}
      <StaggerChildren
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-20 items-start"
        delay={0.1}
        stagger={0.1}
      >
        {projects.slice(0, 4).map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            hasContent={!!caseStudyContent[project.slug]}
            onOpen={() => setActiveSlug(project.slug)}
            eager={i < 4}
          />
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
          <PressButton data-id="project-grid-view-more-link" variant="secondary" href="/work">
            View all work
          </PressButton>
        </motion.div>
      )}

      {/* Case study modal */}
      <CaseStudyModal
        open={activeSlug !== null}
        onClose={() => setActiveSlug(null)}
      >
        {activeSlug && caseStudyContent[activeSlug]}
      </CaseStudyModal>
    </section>
  );
}
