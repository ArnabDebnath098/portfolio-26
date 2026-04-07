"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/animations/FadeUp";
import { BotanicMark } from "@/components/illustrations/IndianOrnaments";

const passions = [
  {
    emoji: "🎨",
    title: "Painting",
    description: "Fine arts trained. I still paint when I need to think without words — acrylics, ink, sometimes just charcoal on brown paper.",
    accent: "var(--color-accent)",
    span: "sm:col-span-2",
  },
  {
    emoji: "🎮",
    title: "Gaming",
    description: "Story-driven games are my design school after hours. Every menu, every onboarding, every micro-interaction — I notice them all.",
    accent: "var(--color-indigo)",
    span: "",
  },
  {
    emoji: "✈️",
    title: "Travelling",
    description: "New cities reset my creative palette. I collect wayfinding systems and street typography the way others collect magnets.",
    accent: "var(--color-ornament)",
    span: "",
  },
  {
    emoji: "💻",
    title: "Coding",
    description: "Not just prototypes — I ship real things. This portfolio, coded from scratch. If a design can't survive implementation, it wasn't done.",
    accent: "var(--color-accent)",
    span: "sm:col-span-2",
  },
  {
    emoji: "🧩",
    title: "Problem Solving",
    description: "I chase the 'aha' moment. Whether it's a payment flow edge case or a puzzle game — the satisfaction of a clean solution is the same.",
    accent: "var(--color-indigo)",
    span: "",
  },
  {
    emoji: "🔨",
    title: "Building",
    description: "Side projects, tools, experiments. I'm founding uiMate — a career growth platform for designers. If it doesn't exist yet, maybe I should make it.",
    accent: "var(--color-ornament)",
    span: "",
  },
];

export function BeyondPixels() {
  return (
    <div data-id="beyond-pixels-section" className="pt-8 flex flex-col gap-10">
      <FadeUp>
        <div data-id="beyond-pixels-header" className="flex flex-col gap-2">
          <div data-id="beyond-pixels-label-row" className="flex items-center gap-3">
            <BotanicMark size={20} color="var(--color-ornament)" opacity={0.7} />
            <p data-id="beyond-pixels-label" className="text-[10px] font-medium tracking-[0.14em] uppercase text-[var(--color-ornament)]">
              Beyond the Pixels
            </p>
          </div>
          <h2 data-id="beyond-pixels-heading" className="text-2xl font-bold tracking-[-0.03em] text-[var(--color-text-primary)]">
            What fuels the work
          </h2>
          <p data-id="beyond-pixels-subline" className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-lg">
            Design doesn&apos;t happen in a vacuum. These are the things that shape how I see, think, and create.
          </p>
        </div>
      </FadeUp>

      <div data-id="beyond-pixels-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {passions.map((item, i) => (
          <motion.div
            key={item.title}
            data-id={`beyond-pixels-card-${item.title.toLowerCase().replace(/\s/g, "-")}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "group relative overflow-hidden rounded-2xl p-6",
              "border border-[var(--color-border-default)]",
              "bg-[var(--color-bg-base)]",
              "hover:border-[var(--color-border-strong)]",
              "transition-colors duration-300",
              item.span
            )}
          >
            {/* Subtle gradient glow on hover */}
            <div
              data-id={`beyond-pixels-glow-${item.title.toLowerCase().replace(/\s/g, "-")}`}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${item.accent} 8%, transparent), transparent 70%)` } as React.CSSProperties}
            />

            <div data-id={`beyond-pixels-card-inner-${i}`} className="relative z-10 flex flex-col gap-3">
              <div data-id={`beyond-pixels-card-top-${i}`} className="flex items-center gap-3">
                <span data-id={`beyond-pixels-emoji-${i}`} className="text-2xl leading-none">{item.emoji}</span>
                <h3
                  data-id={`beyond-pixels-title-${i}`}
                  className="text-base font-semibold text-[var(--color-text-primary)] tracking-[-0.01em]"
                >
                  {item.title}
                </h3>
              </div>
              <p
                data-id={`beyond-pixels-desc-${i}`}
                className="text-sm text-[var(--color-text-secondary)] leading-relaxed"
              >
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Closing thought */}
      <FadeUp delay={0.3}>
        <div data-id="beyond-pixels-closing" className="flex items-center gap-4 pt-4">
          <div data-id="beyond-pixels-closing-line" className="h-px flex-1 bg-[var(--color-border-default)]" />
          <p data-id="beyond-pixels-closing-text" className="text-xs text-[var(--color-text-muted)] italic">
            The gap between a designer and an engineer is where I do my best work.
          </p>
          <div data-id="beyond-pixels-closing-line-2" className="h-px flex-1 bg-[var(--color-border-default)]" />
        </div>
      </FadeUp>
    </div>
  );
}
