"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BotanicMark } from "@/components/illustrations/IndianOrnaments";

export function UiMateFeatured() {
  return (
    <section data-id="uimate-section" className="max-w-5xl mx-auto px-6 pt-16">
      <motion.div
        data-id="uimate-section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 mb-8"
      >
        <div data-id="uimate-label-row" className="flex items-center gap-3">
          <BotanicMark size={20} color="var(--color-ornament)" opacity={0.7} />
          <p data-id="uimate-label" className="text-[10px] font-medium tracking-[0.14em] uppercase text-[var(--color-ornament)]">
            Currently Building
          </p>
        </div>
      </motion.div>

      <motion.a
        data-id="uimate-featured-link"
        href="https://uimate.in"
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div
          data-id="uimate-featured-card"
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "border border-[var(--color-border-default)]",
            "bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg-subtle)]",
            "p-8 sm:p-10",
            "transition-colors duration-300"
          )}
        >
          {/* Badges */}
          <div data-id="uimate-featured-label-row" className="flex items-center gap-2 mb-6">
            <span
              data-id="uimate-featured-badge"
              className={cn(
                "px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-full",
                "bg-[var(--color-accent)] text-[var(--color-bg-base)]"
              )}
            >
              Founding
            </span>
            <span
              data-id="uimate-featured-live-badge"
              className={cn(
                "px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full",
                "border border-emerald-500/40 text-emerald-500"
              )}
            >
              Live
            </span>
          </div>

          <div data-id="uimate-featured-content" className="flex flex-col gap-4 max-w-2xl">
            <h2
              data-id="uimate-featured-title"
              className={cn(
                "text-3xl sm:text-4xl font-bold tracking-[-0.04em]",
                "text-[var(--color-text-primary)]"
              )}
            >
              UI Mate
            </h2>
            <p data-id="uimate-featured-description" className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Building from scratch &mdash; a design tool I&apos;m founding and shipping. Live at uimate.in.
            </p>
            <div data-id="uimate-featured-tags" className="flex flex-wrap gap-2 pt-1">
              {["Founder", "Product Design", "Full-Stack", "SaaS"].map((tag) => (
                <span
                  key={tag}
                  data-id={`uimate-featured-tag-${tag.toLowerCase().replace(/\s/g, "-")}`}
                  className={cn(
                    "px-2.5 py-0.5 text-[10px] font-medium tracking-wide",
                    "bg-[var(--color-bg-base)]",
                    "border border-[var(--color-border-default)]",
                    "text-[var(--color-text-muted)]"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div data-id="uimate-featured-cta" className="flex items-center gap-2 pt-2 text-sm font-medium text-[var(--color-accent)] group-hover:gap-3 transition-all duration-200">
              <span data-id="uimate-featured-cta-text">Visit uimate.in</span>
              <svg data-id="uimate-featured-cta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </div>
          </div>
        </div>
      </motion.a>
    </section>
  );
}
