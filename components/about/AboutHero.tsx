"use client";

import { motion } from "motion/react";
import { MaskedHeadline } from "@/components/animations/MaskedHeadline";

/**
 * About opener — deliberately light: the home sections' indexed meta row
 * (hairline · 01 / · eyebrow), one masked headline at reading scale, and a
 * single scannable subline. The bio below is the main course.
 */
export function AboutHero() {
  return (
    <section data-id="about-hero" className="flex flex-col gap-8">
      {/* Meta row — identical anatomy to the home SectionHeader */}
      <div data-id="about-hero-meta" className="flex w-full items-center gap-3">
        <span data-id="about-hero-index" className="font-datatype text-xs tabular-nums text-[var(--color-text-muted)]">01</span>
        <span data-id="about-hero-index-sep" aria-hidden className="text-[var(--color-text-muted)]">/</span>
        <span data-id="about-hero-eyebrow" className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          About
        </span>
        <span data-id="about-hero-meta-spacer" className="flex-1" />
        <span data-id="about-hero-meta-loc" className="hidden font-datatype text-xs tracking-wider text-[var(--color-text-muted)] sm:block">
          Bengaluru · 2026
        </span>
      </div>

      {/* Headline — masked word-rise, "moment" in accent serif */}
      <h1 data-id="about-hero-heading" className="max-w-3xl font-display text-[clamp(34px,4.6vw,58px)] leading-[1.08] tracking-[-0.02em] text-[var(--color-text-primary)]">
        <MaskedHeadline data-id="about-hero-headline" text="I design for the *moment* that matters." staggerChildren={0.05} />
      </h1>

      <motion.p
        data-id="about-hero-subline"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)]"
      >
        Product Designer II at JUSPAY — engineer-adjacent, fine-arts trained.
      </motion.p>
    </section>
  );
}
