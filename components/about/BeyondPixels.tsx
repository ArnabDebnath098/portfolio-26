"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/animations/FadeUp";
import { BotanicMark } from "@/components/illustrations/IndianOrnaments";
import { GithubContributionGraph } from "@/components/about/GithubContributionGraph";

const passions = [
  {
    emoji: "🔨",
    title: "Building",
    description: "Side projects, tools, experiments. I'm founding uiMate — a career growth platform for designers. If it doesn't exist yet, maybe I should make it.",
    accent: "var(--color-ornament)",
    githubGraph: true,
    extendedDescription: "Recently I've been coding a lot more — not just prototypes, but actual production contributions. It started as a way to better understand interactions and animations, and turned into a habit. Understanding implementation constraints firsthand makes my design decisions sharper.",
  },
  {
    emoji: "🎨",
    title: "Painting",
    description: "Fine arts trained. I still paint when I need to think without words — acrylics, ink, sometimes just charcoal on brown paper.",
    accent: "var(--color-accent)",
    images: [
      "/images/painting/painting-1.png",
      "/images/painting/painting-2.png",
      "/images/painting/painting-3.png",
      "/images/painting/painting-4.png",
    ],
  },
  {
    emoji: "🎮",
    title: "Gaming",
    description: "Story-driven games are my design school after hours. Every menu, every onboarding, every micro-interaction — I notice them all.",
    accent: "var(--color-indigo)",
  },
  {
    emoji: "✈️",
    title: "Travelling",
    description: "New cities reset my creative palette. I collect wayfinding systems and street typography the way others collect magnets.",
    accent: "var(--color-ornament)",
    bento: true,
    images: [
      // Row 1: landscape(2) + portrait(1) = 3
      "/images/travel/landscape-1.png",
      "/images/travel/potrait-1.png",
      // Row 2: portrait(1) + square(1) + portrait(1) = 3
      "/images/travel/potrait-2.png",
      "/images/travel/sqaure-1.png",
      "/images/travel/potrait-3.png",
      // Row 3: portrait(1) + landscape(2) = 3
      "/images/travel/potrait-4.png",
      "/images/travel/landscape-2.png",
    ],
  },
];

function getImageType(src: string): "landscape" | "portrait" | "square" {
  if (src.includes("landscape")) return "landscape";
  if (src.includes("potrait") || src.includes("portrait")) return "portrait";
  return "square";
}

function TravelBento({ images }: { images: string[] }) {
  return (
    <div data-id="beyond-pixels-travel-bento" className="grid grid-cols-3 gap-2 items-start">
      {images.map((src, idx) => {
        const type = getImageType(src);
        return (
          <div
            key={idx}
            data-id={`beyond-pixels-travel-bento-${idx}`}
            className={cn(
              "overflow-hidden rounded-md",
              type === "landscape" ? "col-span-2" : "col-span-1"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Travel ${idx + 1}`} className="w-full h-auto" />
          </div>
        );
      })}
    </div>
  );
}

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

      <div data-id="beyond-pixels-list" className="flex flex-col gap-4">
        {passions.map((item, i) => (
          <motion.div
            key={item.title}
            data-id={`beyond-pixels-card-${item.title.toLowerCase().replace(/\s/g, "-")}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "group relative overflow-hidden rounded-lg p-6",
              "border border-[var(--color-border-default)]",
              "bg-[var(--color-bg-base)]",
              "hover:border-[var(--color-border-strong)]",
              "transition-colors duration-300"
            )}
          >
            {/* Subtle gradient glow on hover */}
            <div
              data-id={`beyond-pixels-glow-${item.title.toLowerCase().replace(/\s/g, "-")}`}
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, ${item.accent} 8%, transparent), transparent 70%)` } as React.CSSProperties}
            />

            <div
              data-id={`beyond-pixels-card-inner-${i}`}
              className="relative z-10 flex flex-col gap-3"
            >
              {/* Building — live GitHub contributions */}
              {item.githubGraph && (
                <div data-id={`beyond-pixels-card-graph-wrap-${i}`} className="w-full">
                  <GithubContributionGraph username="ArnabDebnath098" />
                </div>
              )}

              {/* Painting — equal columns, natural aspect ratio */}
              {item.images && !item.bento && (
                <div
                  data-id={`beyond-pixels-card-images-${i}`}
                  className="grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${item.images.length}, minmax(0, 1fr))` } as React.CSSProperties}
                >
                  {item.images.map((src, idx) => (
                    <div key={idx} data-id={`beyond-pixels-img-${item.title.toLowerCase()}-${idx}`} className="overflow-hidden rounded-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${item.title} ${idx + 1}`}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Travelling — bento grid */}
              {item.bento && item.images && <TravelBento images={item.images} />}

              <div data-id={`beyond-pixels-card-text-${i}`} className="flex flex-col gap-2">
                <div data-id={`beyond-pixels-card-top-${i}`} className="flex items-center">
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
                {item.extendedDescription && (
                  <p
                    data-id={`beyond-pixels-ext-desc-${i}`}
                    className="text-sm text-[var(--color-text-muted)] leading-relaxed"
                  >
                    {item.extendedDescription}
                  </p>
                )}
              </div>
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
