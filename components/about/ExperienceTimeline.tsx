"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { motion, useInView, useScroll } from "motion/react";
import { useRef } from "react";

const TIMELINE = [
  {
    role: "Product Designer II",
    company: "JUSPAY",
    year: "2022 — Present",
    detail:
      "Designing and scaling AI-driven products that blend intelligent automation with seamless user experiences. Worked across fintech and B2B SaaS — from checkout UX to embedded finance at scale.",
  },
  {
    role: "Product Design Intern",
    company: "AirAsia",
    year: "Oct 2021 — Jan 2022",
    detail:
      "Designed for the digital lifestyle ecosystem — travel, food, and fintech all under one product umbrella.",
  },
  {
    role: "Frontend Developer Intern",
    company: "Qualyval",
    year: "Dec 2020 — Jun 2021",
    detail:
      "Built frontend interfaces bridging design and development, sharpening the eye for implementation-aware design.",
  },
  {
    role: "Frontend Developer Intern",
    company: "Webrocode",
    year: "Oct 2019 — Jan 2020",
    detail:
      "First professional experience — learned to ship real code and collaborate in a team environment.",
  },
];

const slug = (s: string) => s.replace(/[^a-z0-9]/gi, "-").toLowerCase();

type Stop = (typeof TIMELINE)[number];

/**
 * One station on the spine. Slides in as it enters, then "arrives" the moment
 * it crosses the viewport mid-line: the node fills, the ghost ordinal warms,
 * and an accent rule draws under the company name. Hierarchy comes from size /
 * case / colour only — Questrial ships a single weight, so no weight classes.
 */
function TimelineStop({ item, i, total }: { item: Stop; i: number; total: number }) {
  const ref = useRef<HTMLElement>(null);
  const arrived = useInView(ref, { once: true, margin: "-50% 0px -50% 0px" });
  const isLast = i === total - 1;
  const ordinal = String(i + 1).padStart(2, "0");

  return (
    <motion.article
      ref={ref}
      data-id={`about-timeline-row-${slug(item.company)}`}
      tabIndex={0}
      className="group relative flex cursor-default gap-5 outline-none sm:gap-9"
      initial={{ opacity: 0, x: 26, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Rail — reserves the spine column and carries this stop's node */}
      <div
        data-id={`about-timeline-rail-${slug(item.company)}`}
        className={cn("relative w-3 shrink-0 pt-10 sm:pt-14", isLast ? "pb-2" : "pb-10 sm:pb-14")}
      >
        <span
          data-id={`about-timeline-node-${slug(item.company)}`}
          aria-hidden
          className={cn(
            "absolute left-1/2 top-10 z-10 h-3 w-3 -translate-x-1/2 translate-y-[4px] rounded-full border sm:top-14",
            "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            arrived
              ? "scale-110 border-[var(--color-accent)] bg-[var(--color-accent)]"
              : "scale-90 border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]"
          )}
        />
      </div>

      {/* Content */}
      <div
        data-id={`about-timeline-content-${slug(item.company)}`}
        className={cn("relative min-w-0 flex-1 pt-10 sm:pt-14", isLast ? "pb-2" : "pb-10 sm:pb-14")}
      >
        {/* Oversized ghost ordinal — type as graphic, warms on arrival */}
        <span
          data-id={`about-timeline-ordinal-${slug(item.company)}`}
          aria-hidden
          className={cn(
            "pointer-events-none absolute right-0 top-6 select-none font-questrial leading-none tracking-[-0.04em]",
            "text-[clamp(56px,9vw,120px)] transition-colors duration-500",
            arrived
              ? "text-[color-mix(in_srgb,var(--color-accent)_12%,transparent)]"
              : "text-[color-mix(in_srgb,var(--color-text-primary)_5%,transparent)]"
          )}
        >
          {ordinal}
        </span>

        {/* Year — the marker line, aligned with the node */}
        <p
          data-id={`about-timeline-year-${slug(item.company)}`}
          className="relative font-questrial text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]"
        >
          {item.year}
        </p>

        {/* Company — restrained headline in Questrial (force past the global
            h3→Gloock rule), letters mask-reveal on arrival, accent rule draws */}
        <h3
          data-id={`about-timeline-company-${slug(item.company)}`}
          className="relative mt-3 inline-block font-questrial! text-[clamp(20px,2vw,28px)] leading-[1.1] tracking-[-0.01em] text-[var(--color-text-primary)] transition-colors duration-500 group-hover:text-[var(--color-accent)] group-focus-within:text-[var(--color-accent)]"
        >
          <span data-id={`about-timeline-company-label-${slug(item.company)}`} className="sr-only">
            {item.company}
          </span>
          <span data-id={`about-timeline-company-letters-${slug(item.company)}`} aria-hidden className="inline-flex">
            {item.company.split("").map((ch, ci) => (
              <span
                key={ci}
                data-id={`about-timeline-company-clip-${slug(item.company)}-${ci}`}
                className="inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em]"
              >
                <motion.span
                  data-id={`about-timeline-company-char-${slug(item.company)}-${ci}`}
                  className="inline-block"
                  initial={{ y: "115%" }}
                  animate={arrived ? { y: 0 } : { y: "115%" }}
                  transition={{ duration: 0.6, delay: ci * 0.045, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              </span>
            ))}
          </span>
          <span
            data-id={`about-timeline-rule-${slug(item.company)}`}
            aria-hidden
            className={cn(
              "absolute -bottom-1 left-0 h-px w-full origin-left bg-[var(--color-accent)]",
              "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              arrived ? "scale-x-100" : "scale-x-0",
              "group-hover:scale-x-100 group-focus-within:scale-x-100"
            )}
          />
        </h3>

        {/* Role */}
        <p
          data-id={`about-timeline-role-${slug(item.company)}`}
          className="relative mt-4 font-questrial text-sm uppercase tracking-[0.1em] text-[var(--color-text-muted)]"
        >
          {item.role}
        </p>

        {/* Detail */}
        <p
          data-id={`about-timeline-detail-${slug(item.company)}`}
          className="relative mt-2.5 max-w-xl font-questrial text-sm leading-relaxed text-[var(--color-text-secondary)]"
        >
          {item.detail}
        </p>
      </div>
    </motion.article>
  );
}

/**
 * Experience as a self-drawing timeline: one continuous spine whose accent fill
 * descends with scroll, lighting each station as it crosses the viewport's
 * mid-line. No dividers, no second font — Questrial throughout, hierarchy from
 * scale and colour. Oversized ghost ordinals nod to the awwwards house style.
 */
export function ExperienceTimeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 70%", "end 40%"],
  });

  return (
    <section data-id="about-experience" className="flex flex-col gap-10">
      <SectionHeader
        id="about-experience"
        index="02"
        eyebrow="Experience"
        title="Where the reps came from."
        subtitle="Four stops, one throughline: designing closest to the code, where decisions become product."
      />

      <div ref={railRef} data-id="about-timeline-rows" className="relative">
        {/* Base spine — the unlit track */}
        <span
          data-id="about-timeline-spine-track"
          aria-hidden
          className="pointer-events-none absolute left-[6px] top-10 bottom-10 w-px -translate-x-1/2 bg-[var(--color-border-subtle)] sm:top-14 sm:bottom-14"
        />
        {/* Progress spine — accent fill scrubbed by scroll (motion value piped
            through a CSS var so we stay off the inline `style` prop) */}
        <motion.span
          data-id="about-timeline-spine-fill"
          aria-hidden
          style={{ "--spine-scale": scrollYProgress } as unknown as React.CSSProperties}
          className="pointer-events-none absolute left-[6px] top-10 bottom-10 w-px origin-top bg-[var(--color-accent)] [transform:translateX(-50%)_scaleY(var(--spine-scale))] sm:top-14 sm:bottom-14"
        />

        {TIMELINE.map((item, i) => (
          <TimelineStop key={item.company} item={item} i={i} total={TIMELINE.length} />
        ))}
      </div>
    </section>
  );
}
