"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MandalaStamp } from "@/components/illustrations/MandalaStamp";
import { DiamondVineTile, QuatrefoilBloom, VineRow } from "@/components/illustrations/IndianOrnaments";

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

/* ── Decorative kolam corner SVG ── */
function KolamCorner({ className }: { className?: string }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="4" cy="4" r="1.5" fill="var(--color-ornament)" opacity="0.4" />
      <path
        d="M4 4 Q32 4 32 32 Q32 4 60 4"
        stroke="var(--color-ornament)"
        strokeWidth="0.75"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M4 4 Q4 32 32 32 Q4 32 4 60"
        stroke="var(--color-ornament)"
        strokeWidth="0.75"
        fill="none"
        opacity="0.3"
      />
      <circle cx="32" cy="32" r="2" fill="var(--color-ornament)" opacity="0.25" />
    </svg>
  );
}

/* ── Section divider ── */
function SectionRule() {
  return (
    <div aria-hidden className="flex items-center justify-center py-2">
      <VineRow width={320} color="var(--color-ornament)" opacity={0.3} />
    </div>
  );
}

/* ── Component ── */

export function Achievements() {
  return (
    <section
      data-id="achievements"
      className="relative py-24 overflow-hidden"
    >
      {/* Kolam corners */}
      <KolamCorner className="absolute top-6 left-6 opacity-40" />
      <KolamCorner className="absolute top-6 right-6 opacity-40 -scale-x-100" />
      <KolamCorner className="absolute bottom-6 left-6 opacity-40 -scale-y-100" />
      <KolamCorner className="absolute bottom-6 right-6 opacity-40 scale-[-1]" />

      <div data-id="achievements-container" className="relative max-w-[1200px] mx-auto px-6 space-y-20">

        {/* ── Section Header ── */}
        <motion.div
          data-id="achievements-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center">
            <DiamondVineTile size={96} color="var(--color-ornament)" opacity={0.55} />
          </div>
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ornament)]">
            ✦ Impact & Recognition ✦
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-[var(--color-text-primary)] leading-tight">
            Marks left along the way
          </h2>
          <p className="max-w-xl mx-auto text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Numbers tell one story. The awards, the shipped products, and the teams I&apos;ve been part of tell another.
          </p>
        </motion.div>

        {/* ── Impact Numbers Grid ── */}
        <div data-id="achievements-impact-grid" className="grid grid-cols-2 lg:grid-cols-4 border border-[var(--color-border-default)] divide-x divide-y lg:divide-y-0 divide-[var(--color-border-default)] rounded-2xl overflow-hidden">
          {impacts.map((item, i) => (
            <motion.div
              key={item.label}
              data-id={`achievements-impact-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-8 space-y-3 bg-[var(--color-bg-base)] group"
            >
              <div aria-hidden className="absolute top-3 right-3 opacity-15">
                <QuatrefoilBloom size={20} color="var(--color-ornament)" />
              </div>
              <p
                className={`text-4xl md:text-5xl font-display leading-none tracking-tight ${
                  item.accent
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-text-primary)]"
                }`}
              >
                {item.value}
              </p>
              <p className="text-xs font-semibold tracking-wide uppercase text-[var(--color-ornament)]">
                {item.label}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <SectionRule />

        {/* ── Milestones with Images ── */}
        <div data-id="achievements-milestones" className="space-y-6">
          <motion.p
            data-id="achievements-milestones-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ornament)] text-center"
          >
            ✦ Milestones ✦
          </motion.p>

          <div data-id="achievements-milestones-grid" className="grid md:grid-cols-2 gap-6">
            {milestones.map((item, i) => (
              <motion.div
                key={item.title}
                data-id={`achievements-milestone-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative rounded-2xl overflow-hidden bg-[var(--color-bg-base)] transition-colors duration-300"
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
                  <div data-id={`achievements-milestone-ornament-${i}`} className="flex items-center gap-2">
                    <svg data-id={`achievements-milestone-ornament-left-${i}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <circle cx="6" cy="6" r="4" stroke="var(--color-ornament)" strokeWidth="0.6" />
                      <circle cx="6" cy="6" r="1.5" fill="var(--color-ornament)" opacity="0.5" />
                    </svg>
                    <div data-id={`achievements-milestone-ornament-line-${i}`} className="flex-1 h-px bg-[var(--color-ornament)] opacity-15" />
                    <svg data-id={`achievements-milestone-ornament-right-${i}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <circle cx="6" cy="6" r="4" stroke="var(--color-ornament)" strokeWidth="0.6" />
                      <circle cx="6" cy="6" r="1.5" fill="var(--color-ornament)" opacity="0.5" />
                    </svg>
                  </div>

                  <p data-id={`achievements-milestone-title-${i}`} className="text-lg md:text-xl font-questrial font-bold text-[var(--color-text-primary)] leading-snug">
                    {item.title}
                  </p>

                  <p data-id={`achievements-milestone-venue-${i}`} className="text-[11px] font-medium tracking-wide uppercase text-[var(--color-ornament)]">
                    {item.venue}
                  </p>

                  <p data-id={`achievements-milestone-desc-${i}`} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.description}
                  </p>

                  <div data-id={`achievements-milestone-flourish-${i}`} aria-hidden className="flex justify-center opacity-25">
                    <svg width="48" height="8" viewBox="0 0 48 8" fill="none">
                      <path d="M0 4 Q6 0 12 4 Q18 8 24 4 Q30 0 36 4 Q42 8 48 4" stroke="var(--color-ornament)" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
