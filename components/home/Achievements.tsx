"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { SECTION_CONTAINER, SECTION_RHYTHM } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";

/* ── Data ── */

type Impact = {
  value: string;
  label: string;
  description: string;
  accent?: boolean;
};

type Milestone = {
  title: string;
  venue: string;
  description: string;
  image?: string;
};

const impacts: Impact[] = [
  {
    value: "200M+",
    label: "Transactions Designed",
    description:
      "Payment flows at JUSPAY — from checkout to settlement — serving millions of Indians daily.",
    accent: true,
  },
  {
    value: "4+",
    label: "Years Shipping",
    description:
      "Building real products across fintech, travel, and SaaS — from pixel to production.",
  },
  {
    value: "3",
    label: "Companies Shaped",
    description:
      "JUSPAY, AirAsia, Qualyval — each a masterclass in constraints, scale, and craft.",
  },
  {
    value: "∞",
    label: "Prototypes Built",
    description:
      "From Figma to production React, shipped without the handoff — because why wait?",
  },
];

const milestones: Milestone[] = [
  {
    title: "Designathon Champion — First Place",
    venue: "LottieFiles × The Hub, Bengaluru",
    description:
      "Crafted a multimodal transport app for Bengaluru and took first place, judged by Saptarshi Prakash, Anudeep Ayyagari, Shai, Anirudha Palaskar, and other industry leaders.",
    image: "/images/milestones/designathon.jpg",
  },
  {
    title: "Kyoorius Young Blood Awards — First List",
    venue: "Kyoorius Young Blood Awards, 2023",
    description:
      "Recognized in the First List for a UX design challenge to reimagine the ZEE5 OTT experience with AR and VR innovations.",
    image: "/images/milestones/kyooriusawards.webp",
  },
];

/* ── Component ── */

export function Achievements() {
  return (
    <section
      data-id="achievements"
      className={cn("relative overflow-hidden", SECTION_RHYTHM)}
    >
      <div data-id="achievements-container" className={cn(SECTION_CONTAINER, "space-y-20")}>

        {/* ── Section Header ── */}
        <SectionHeader
          id="achievements"
          index="04"
          eyebrow="Impact & Recognition"
          title="Marks left along the way."
          subtitle="Numbers tell one story; the awards, the shipped products, and the teams I've been part of tell another."
        />

        {/* ── Impact Numbers Grid ── */}
        <RevealGroup data-id="achievements-impact-grid" stagger={0.1} className="grid grid-cols-2 lg:grid-cols-4 border border-[var(--color-border-default)] divide-x divide-y lg:divide-y-0 divide-[var(--color-border-default)] overflow-hidden">
          {impacts.map((item, i) => (
            <RevealItem
              key={item.label}
              data-id={`achievements-impact-${i}`}
              className="relative p-8 space-y-3 bg-[var(--color-bg-base)] group"
            >
              <p
                className={`text-4xl md:text-5xl font-display leading-none tracking-tight ${
                  item.accent
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text-primary)]"
                }`}
              >
                {item.value}
              </p>
              <p className="text-xs font-semibold tracking-wide uppercase text-[var(--color-text-muted)]">
                {item.label}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {item.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* ── Milestones with Images ── */}
        <div data-id="achievements-milestones" className="space-y-6">
          <Reveal
            data-id="achievements-milestones-label"
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-text-muted)] text-center"
          >
            Milestones
          </Reveal>

          <RevealGroup data-id="achievements-milestones-grid" stagger={0.15} className="grid md:grid-cols-2 gap-6">
            {milestones.map((item, i) => (
              <RevealItem
                key={item.title}
                data-id={`achievements-milestone-${i}`}
                className="group relative overflow-hidden bg-[var(--color-bg-base)] transition-colors duration-300"
              >
                {/* Image — compact with inner padding and rounded corners */}
                {item.image && (
                  <div className="p-4 pb-0">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[var(--color-bg-elevated)]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Subtle vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl" />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div data-id={`achievements-milestone-content-${i}`} className="p-6 flex flex-col gap-3">
                  <p data-id={`achievements-milestone-title-${i}`} className="text-lg md:text-xl font-questrial font-bold text-[var(--color-text-primary)] leading-snug">
                    {item.title}
                  </p>

                  <p data-id={`achievements-milestone-venue-${i}`} className="text-[11px] font-medium tracking-wide uppercase text-[var(--color-text-muted)]">
                    {item.venue}
                  </p>

                  <p data-id={`achievements-milestone-desc-${i}`} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

      </div>
    </section>
  );
}
