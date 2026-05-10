"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { StaggerItem } from "@/components/animations/StaggerChildren";
import { type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { IconlyLock } from "@/components/ui/IconlyIcons";

const CARD_HOVER_VARIANT = "card-hovered" as const;

function CardBody({ project, eager }: { project: Project; eager?: boolean }) {
  return (
    <div data-id={`project-card-${project.slug}`} className="flex flex-col pb-10">

      {/* Thumbnail */}
      <div
        data-id={`project-card-thumb-${project.slug}`}
        className="relative aspect-[16/10] max-h-[var(--card-thumb-max-h,none)] overflow-hidden rounded-xl bg-[var(--color-bg-subtle)]"
      >
        {project.thumbnail && (
          <motion.div
            data-id={`project-card-thumb-img-wrapper-${project.slug}`}
            className="absolute inset-0"
            variants={{ [CARD_HOVER_VARIANT]: { scale: 1.04 } }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              data-id={`project-card-thumb-img-${project.slug}`}
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={eager}
            />
          </motion.div>
        )}

        {/* Company badge — top left */}
        <span
          data-id={`project-card-company-label-${project.slug}`}
          className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] uppercase rounded-full bg-black/70 backdrop-blur-sm text-white"
        >
          {project.company}
        </span>

        {/* Lock badge — top right */}
        {project.locked && (
          <div
            data-id={`project-card-lock-badge-${project.slug}`}
            className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm"
          >
            <IconlyLock size={12} color="white" />
            <span
              data-id={`project-card-lock-label-${project.slug}`}
              className="text-[10px] font-bold tracking-widest uppercase text-white"
            >
              NDA
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div data-id={`project-card-content-${project.slug}`} className="flex flex-col gap-2 pt-4">
        <p
          data-id={`project-card-title-${project.slug}`}
          className="font-sans text-xl font-bold text-[var(--color-text-primary)] leading-snug"
        >
          {project.title}
        </p>
        <p data-id={`project-card-outcome-${project.slug}`} className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <p data-id={`project-card-meta-${project.slug}`} className="text-xs text-[var(--color-text-muted)] mt-1">
          {project.subtitle}
        </p>
      </div>

    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  hasContent: boolean;
  onOpen: () => void;
  eager?: boolean;
}

export function ProjectCard({ project, hasContent, onOpen, eager }: ProjectCardProps) {
  const body = <CardBody project={project} eager={eager} />;

  let inner: React.ReactNode;
  if (project.locked) {
    inner = body;
  } else if (project.externalLink) {
    inner = (
      <a
        data-id={`project-card-link-${project.slug}`}
        href={project.externalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {body}
      </a>
    );
  } else if (hasContent) {
    inner = (
      <button
        data-id={`project-card-link-${project.slug}`}
        onClick={onOpen}
        className="block h-full w-full text-left cursor-pointer"
      >
        {body}
      </button>
    );
  } else {
    inner = (
      <Link
        data-id={`project-card-link-${project.slug}`}
        href={`/work?open=${project.slug}`}
        className="block h-full"
      >
        {body}
      </Link>
    );
  }

  return (
    <StaggerItem>
      <motion.div
        data-id={`project-card-hover-${project.slug}`}
        className={cn("group h-full", project.locked && "cursor-default")}
        whileHover={project.locked ? undefined : CARD_HOVER_VARIANT}
      >
        {inner}
      </motion.div>
    </StaggerItem>
  );
}
