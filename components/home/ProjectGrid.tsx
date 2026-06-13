"use client";

import { useState, ReactNode } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { SECTION_CONTAINER, SECTION_RHYTHM } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
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
    <section data-id="project-grid" className={cn(SECTION_RHYTHM, SECTION_CONTAINER, "flex flex-col gap-12")}>
      {/* Section header */}
      <SectionHeader
        id="project-grid"
        index="02"
        eyebrow="Selected Work"
        title="Case studies, from problem to shipped."
        subtitle="The messy middle made legible — the constraints, the calls I made, and what actually moved the metric."
      />

      {/* Grid — first 4 only */}
      <RevealGroup
        data-id="project-grid-grid"
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-20 items-start"
        delay={0.05}
        stagger={0.12}
      >
        {projects.slice(0, 4).map((project, i) => (
          <RevealItem key={project.slug} data-id={`project-grid-item-${i}`}>
            <ProjectCard
              project={project}
              hasContent={!!caseStudyContent[project.slug]}
              onOpen={() => setActiveSlug(project.slug)}
              eager={i < 4}
            />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* View more */}
      {projects.length > 4 && (
        <Reveal data-id="project-grid-view-more" className="flex justify-center" delay={0.1}>
          <PressButton data-id="project-grid-view-more-link" variant="secondary" href="/work">
            View all work
          </PressButton>
        </Reveal>
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
