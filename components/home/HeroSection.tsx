"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

/* ── Static coords for rangoli pattern ── */
const DOT12 = [
  { cx: "48", cy: "8" }, { cx: "68", cy: "13.359" }, { cx: "82.641", cy: "28" },
  { cx: "88", cy: "48" }, { cx: "82.641", cy: "68" }, { cx: "68", cy: "82.641" },
  { cx: "48", cy: "88" }, { cx: "28", cy: "82.641" }, { cx: "13.359", cy: "68" },
  { cx: "8", cy: "48" }, { cx: "13.359", cy: "28" }, { cx: "28", cy: "13.359" },
];

const HEX6 = [
  { cx: "61", cy: "48" }, { cx: "54.5", cy: "59.258" }, { cx: "41.5", cy: "59.258" },
  { cx: "35", cy: "48" }, { cx: "41.5", cy: "36.742" }, { cx: "54.5", cy: "36.742" },
];

const TIPS = [
  { cx: "77", cy: "48" }, { cx: "62.5", cy: "73.115" }, { cx: "33.5", cy: "73.115" },
  { cx: "19", cy: "48" }, { cx: "33.5", cy: "22.885" }, { cx: "62.5", cy: "22.885" },
];

function HeroBackground() {
  const c = "var(--color-ornament)";

  return (
    <svg
      aria-hidden
      suppressHydrationWarning
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="bg-lattice" x="0" y="0" width="96" height="96" patternUnits="userSpaceOnUse">
          <line x1="0" y1="48" x2="96" y2="48" stroke={c} strokeWidth="0.2" />
          <line x1="48" y1="0" x2="48" y2="96" stroke={c} strokeWidth="0.2" />
          <line x1="0" y1="0" x2="96" y2="96" stroke={c} strokeWidth="0.15" />
          <line x1="96" y1="0" x2="0" y2="96" stroke={c} strokeWidth="0.15" />
        </pattern>
        <pattern id="rangoli" x="0" y="0" width="96" height="96" patternUnits="userSpaceOnUse">
          <circle cx="48" cy="48" r="40" fill="none" stroke={c} strokeWidth="0.6" />
          <circle cx="48" cy="48" r="35" fill="none" stroke={c} strokeWidth="0.25" />
          {DOT12.map((pt, i) => (
            <circle key={i} cx={pt.cx} cy={pt.cy} r="1.1" fill={c} />
          ))}
          {HEX6.map((pt, i) => (
            <circle key={i} cx={pt.cx} cy={pt.cy} r="13" fill="none" stroke={c} strokeWidth="0.45" />
          ))}
          <circle cx="48" cy="48" r="13" fill="none" stroke={c} strokeWidth="0.45" />
          <circle cx="48" cy="48" r="6" fill="none" stroke={c} strokeWidth="0.5" />
          <circle cx="48" cy="48" r="3" fill="none" stroke={c} strokeWidth="0.3" />
          <circle cx="48" cy="48" r="1.4" fill={c} />
          {TIPS.map((pt, i) => (
            <circle key={i} cx={pt.cx} cy={pt.cy} r="1.2" fill="none" stroke={c} strokeWidth="0.4" />
          ))}
        </pattern>
        <radialGradient id="bg-fade" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="70%" stopColor="white" stopOpacity="0.7" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="bg-mask">
          <rect width="100%" height="100%" fill="url(#bg-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-lattice)" opacity="0.07" mask="url(#bg-mask)" />
      <rect width="100%" height="100%" fill="url(#rangoli)" opacity="0.10" mask="url(#bg-mask)" />
    </svg>
  );
}

function OrnamentalRule() {
  return (
    <div data-id="hero-ornamental-rule" aria-hidden className="flex items-center gap-3 max-w-md mx-auto w-full">
      <div data-id="hero-rule-left" className="flex-1 h-px bg-[var(--color-ornament)] opacity-30" />
      <svg data-id="hero-rule-diamond" width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[var(--color-ornament)] opacity-55">
        <polygon points="10,1 19,10 10,19 1,10" stroke="currentColor" strokeWidth="1" fill="none" />
        <polygon points="10,5 15,10 10,15 5,10" stroke="currentColor" strokeWidth="0.75" fill="none" />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
      </svg>
      <div data-id="hero-rule-right" className="flex-1 h-px bg-[var(--color-ornament)] opacity-30" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section data-id="hero" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-14">
      <HeroBackground />

      <div data-id="hero-content" className="relative w-full max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center gap-6">

        <motion.div
          data-id="hero-label-row"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <span data-id="hero-availability" className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase text-[var(--color-text-muted)]">
            <span data-id="hero-ping" className="relative flex h-1.5 w-1.5">
              <span data-id="hero-ping-ring" className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span data-id="hero-ping-dot" className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
            </span>
            Available · Bengaluru
          </span>
          <span data-id="hero-star" className="text-[var(--color-ornament)] opacity-60 text-xs">✦</span>
          <span data-id="hero-year" className="font-datatype text-xs text-[var(--color-text-muted)] tracking-wider">2026</span>
        </motion.div>

        <div data-id="hero-headline" className="space-y-0">
          {[
            { text: "The gap between", color: "text-[var(--color-text-primary)]", delay: 0.3 },
            { text: "a designer", color: "text-[var(--color-text-secondary)]", delay: 0.42, accent: true },
            { text: "and an engineer", color: "text-[var(--color-text-secondary)]", delay: 0.54 },
            { text: "is where I work.", color: "text-[var(--color-text-primary)]", delay: 0.66 },
          ].map(({ text, color, delay, accent }, i) => (
            <div key={text} data-id={`hero-headline-line-${i}`} className="overflow-hidden pb-1 pt-0.5">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "text-[clamp(40px,6vw,72px)] font-normal font-display",
                  "leading-[1.15] tracking-[-0.02em]",
                  color,
                  accent && "flex items-baseline justify-center gap-4"
                )}
              >
                {text}
                {accent && (
                  <span data-id="hero-accent-dash" className="inline-block w-10 h-[0.12em] bg-[var(--color-accent)] shrink-0" />
                )}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          data-id="hero-rule"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <OrnamentalRule />
        </motion.div>

        <motion.p
          data-id="hero-subline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-base sm:text-lg max-w-xl text-[var(--color-text-secondary)] leading-relaxed"
        >
          Product Designer II at{" "}
          <span data-id="hero-company" className="text-[var(--color-text-primary)] font-semibold">JUSPAY</span>.{" "}
          CS background. Designing payment flows used by millions —
          and occasionally shipping the prototype myself.
        </motion.p>

        <motion.div
          data-id="hero-cta-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link data-id="hero-cta-work" href="/work" className={buttonVariants({ variant: "primary", size: "lg" })}>
            View my work
            <svg data-id="hero-cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link data-id="hero-cta-about" href="/about" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            About me
          </Link>
        </motion.div>

      </div>

      <motion.div
        data-id="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span data-id="hero-scroll-label" className="text-[10px] text-[var(--color-text-muted)] tracking-[0.14em] uppercase font-medium">Work</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg data-id="hero-scroll-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-text-muted)]">
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>

    </section>
  );
}
