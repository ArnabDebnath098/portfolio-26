"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { PressButton } from "@/components/ui/PressButton";

export function HeroSection() {
  return (
    <section data-id="hero" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-14">
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
            { text: "a designer", color: "text-[var(--color-text-secondary)]", delay: 0.42, accent: true, rainbowWord: "designer", rainbowClass: "text-rainbow-flow" },
            { text: "and an engineer", color: "text-[var(--color-text-secondary)]", delay: 0.54, rainbowWord: "engineer", rainbowClass: "text-rainbow-flow-alt" },
            { text: "is where I work.", color: "text-[var(--color-text-primary)]", delay: 0.66 },
          ].map(({ text, color, delay, accent, rainbowWord, rainbowClass }, i) => {
            const beforeWord = rainbowWord ? text.slice(0, text.indexOf(rainbowWord)) : null;
            const afterWord  = rainbowWord ? text.slice(text.indexOf(rainbowWord) + rainbowWord.length) : null;
            return (
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
                {rainbowWord ? (
                  <>
                    {beforeWord}
                    <span data-id={`hero-headline-rainbow-${i}`} className={rainbowClass}>{rainbowWord}</span>
                    {afterWord}
                  </>
                ) : text}
                {accent && (
                  <span data-id="hero-accent-dash" className="inline-block w-10 h-[0.12em] bg-[var(--color-accent)] shrink-0" />
                )}
              </motion.div>
            </div>
            );
          })}
        </div>

        <motion.p
          data-id="hero-subline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-base sm:text-lg max-w-xl text-[var(--color-text-secondary)] leading-relaxed"
        >
          Product Designer II at{" "}
          <span data-id="hero-company" className="inline-flex items-center gap-1.5 align-middle text-[var(--color-text-primary)] font-semibold pl-1">
            <svg
              data-id="hero-company-logo"
              width="16"
              height="16"
              viewBox="0 0 545 546"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path data-id="hero-company-logo-path-left" fillRule="evenodd" clipRule="evenodd" d="M272.135 545.93C259.055 546.295 246.339 545.202 233.259 543.383C198.017 538.288 164.954 527.007 134.435 508.447C66.8564 467.689 23.6203 408.371 5.81741 330.494C1.82082 313.027 0.00419205 295.195 0.00419205 277.363C-0.359134 206.036 22.8937 143.443 70.1258 90.3122C111.182 44.4593 162.047 16.438 221.996 4.79285C238.709 1.51764 255.422 -0.301922 272.135 0.425902C272.135 27.7193 272.135 54.6486 272.135 81.942C271.409 82.3062 270.682 82.6699 269.955 83.3977C260.145 90.3122 250.336 97.5904 240.889 105.233C219.453 122.7 199.107 141.26 182.03 163.459C159.141 192.936 143.881 225.324 141.701 263.535C140.611 281.73 142.791 299.562 148.604 316.666C162.774 359.243 206.737 403.277 268.502 404.369C272.135 404.369 272.862 405.097 272.862 409.099C272.498 427.659 272.499 464.778 272.499 464.778C272.499 464.778 272.499 466.962 272.499 468.053C272.135 493.891 272.135 519.729 272.135 545.93Z" />
              <path data-id="hero-company-logo-path-right" fillRule="evenodd" clipRule="evenodd" d="M272.172 81.5718C272.172 81.5718 272.172 27.3491 272.172 0.0557309C287.069 -0.308181 301.602 1.14747 316.135 3.33094C343.384 7.69789 369.544 15.7039 394.25 28.4409C445.479 55.0062 485.808 92.8533 513.057 144.529C528.68 174.369 538.853 206.03 542.85 239.146C547.572 278.084 543.94 316.659 532.313 354.142C518.87 396.72 496.344 434.203 464.735 465.863C426.222 504.074 380.443 528.82 327.398 540.101C309.232 543.74 290.702 545.924 272.172 545.56C272.172 519.358 272.172 493.521 272.172 467.319C272.172 466.227 272.172 464.407 272.172 464.407C272.172 464.407 273.262 463.68 273.626 463.316C301.965 443.301 328.851 421.466 352.104 395.264C367.364 378.16 380.443 359.965 389.526 338.858C402.243 309.017 407.329 278.449 400.79 246.06C389.163 187.107 336.481 143.073 275.806 141.618C271.809 141.618 272.172 138.342 272.172 138.342V81.5718Z" />
            </svg>
            <span data-id="hero-company-name">JUSPAY</span>
          </span>.{" "}
          Building AI surfaces for payments, scaling the design system
          and new AI-first product initiatives.
        </motion.p>

        <motion.div
          data-id="hero-cta-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <PressButton data-id="hero-cta-work" variant="primary" href="/work">
            View my work
          </PressButton>
          <PressButton data-id="hero-cta-about" variant="secondary" href="/about">
            About me
          </PressButton>
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
