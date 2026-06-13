"use client";

import { MaskedHeadline } from "@/components/animations/MaskedHeadline";
import { FadeUp } from "@/components/animations/FadeUp";
import { PressButton } from "@/components/ui/PressButton";

const STRIP = ["Checkout", "Design Systems", "AI Surfaces", "Painting", "Prototypes"];

function MarqueeTrack({ copy }: { copy: "a" | "b" }) {
  return (
    <div data-id={`about-marquee-track-${copy}`} aria-hidden={copy === "b"} className="flex shrink-0 items-center">
      {STRIP.map((w, i) => (
        <span key={i} data-id={`about-marquee-item-${copy}-${i}`} className="flex items-center">
          <span
            data-id={`about-marquee-word-${copy}-${i}`}
            className="text-ghost-stroke whitespace-nowrap px-8 font-display text-[clamp(56px,7vw,96px)] leading-none tracking-[-0.02em]"
          >
            {w}
          </span>
          <span data-id={`about-marquee-dot-${copy}-${i}`} aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]" />
        </span>
      ))}
    </div>
  );
}

/**
 * Page closer — an outlined marquee of the things I touch, then one last
 * masked line and the two doors out (contact / work).
 */
export function AboutCloser() {
  return (
    <section data-id="about-closer" className="flex flex-col">
      {/* Marquee — doubled track, seamless via the shared .animate-marquee */}
      <div data-id="about-marquee" className="mt-28 flex w-full overflow-hidden border-y border-[var(--color-border-subtle)] py-7">
        <div data-id="about-marquee-belt" className="animate-marquee flex w-max">
          <MarqueeTrack copy="a" />
          <MarqueeTrack copy="b" />
        </div>
      </div>

      {/* Closing statement */}
      <div data-id="about-closer-inner" className="mx-auto flex w-full max-w-[1104px] flex-col items-start gap-8 px-6 pb-32 pt-24">
        <h2 data-id="about-closer-heading" className="max-w-[16ch] font-display text-[clamp(36px,5vw,68px)] leading-[1.06] tracking-[-0.03em] text-[var(--color-text-primary)]">
          <MaskedHeadline data-id="about-closer-headline" inView text="Got a *moment* worth designing?" staggerChildren={0.06} />
        </h2>
        <FadeUp data-id="about-closer-cta-reveal" delay={0.15}>
          <div data-id="about-closer-cta-row" className="flex flex-wrap gap-3">
            <PressButton data-id="about-closer-contact" variant="primary" href="/contact">
              Let&apos;s talk
            </PressButton>
            <PressButton data-id="about-closer-work" variant="secondary" href="/work">
              See my work
            </PressButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
