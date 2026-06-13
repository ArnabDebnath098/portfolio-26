"use client";

import { motion } from "motion/react";
import { MaskedHeadline } from "@/components/animations/MaskedHeadline";

/**
 * Lab opener — same anatomy as the home/about heroes: the indexed meta row
 * (01 / · Lab · count), a single masked-rise headline in the display serif with
 * one accented word, and a scannable subline. Editorial voice, sharp edges.
 */
export function LabHero({ count }: { count: number }) {
  return (
    <section data-id="lab-hero" className="flex flex-col gap-8">
      {/* Meta row — identical anatomy to the home SectionHeader */}
      <div data-id="lab-hero-meta" className="flex w-full items-center gap-3">
        <span data-id="lab-hero-index" className="font-datatype text-xs tabular-nums text-[var(--color-text-muted)]">
          01
        </span>
        <span data-id="lab-hero-index-sep" aria-hidden className="text-[var(--color-text-muted)]">
          /
        </span>
        <span data-id="lab-hero-eyebrow" className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Lab
        </span>
        <span data-id="lab-hero-meta-spacer" className="flex-1" />
        <span data-id="lab-hero-meta-count" className="hidden font-datatype text-xs tracking-wider text-[var(--color-text-muted)] sm:block">
          {String(count).padStart(2, "0")} experiments
        </span>
      </div>

      {/* Headline — masked word-rise, "prototypes" in accent serif */}
      <h1 data-id="lab-hero-heading" className="max-w-3xl font-display text-[clamp(34px,4.6vw,58px)] leading-[1.08] tracking-[-0.02em] text-[var(--color-text-primary)]">
        <MaskedHeadline data-id="lab-hero-headline" text="Half-built *prototypes* and honest dead ends." staggerChildren={0.05} />
      </h1>

      <motion.p
        data-id="lab-hero-subline"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)]"
      >
        Quick builds, motion studies, and AI workflow explorations — the stuff that shaped how I work, before any of it earns a case study.
      </motion.p>
    </section>
  );
}
