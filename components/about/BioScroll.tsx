"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/animations/FadeUp";
import { PressButton } from "@/components/ui/PressButton";

// ─── Scroll-fill prose ─────────────────────────────────────────────────────────
// Each word starts ghosted and resolves to full ink as it crosses the reading
// band — the page literally reads itself in as you scroll.

function FillWord({
  progress,
  range,
  children,
  dataId,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
  dataId: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      data-id={dataId}
      className="inline-block opacity-[var(--w,1)]"
      style={{ "--w": opacity } as React.CSSProperties}
    >
      {children}&nbsp;
    </motion.span>
  );
}

function FillParagraph({ text, idx, className }: { text: string; idx: number; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  // The fill runs while the paragraph travels through the middle of the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "end 0.48"] });
  const words = text.split(" ");
  return (
    <p ref={ref} data-id={`about-bio-p${idx + 1}`} className={cn("flex flex-wrap", className)}>
      {words.map((w, i) => (
        <FillWord
          key={i}
          dataId={`about-bio-p${idx + 1}-w${i}`}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 1.6) / words.length)]}
        >
          {w}
        </FillWord>
      ))}
    </p>
  );
}

const BIO = [
  "At JUSPAY, that moment is checkout — when someone is deciding whether to trust a product with their money. I've spent the last few years making that moment shorter, clearer, and less scary for millions of users.",
  "I came to design through engineering and art. I studied Computer Science, which gave me a strong opinion about how systems should work. I painted, which gave me a strong opinion about how things should feel. Those two instincts don't always agree — the tension between them is where my best work comes from.",
  "I work closest to PMs and engineers. I read PRDs before wireframes. I flag edge cases before usability tests. I've shipped prototypes myself when words and mockups weren't enough to land the idea.",
  "Right now I'm exploring how AI changes the research-to-design loop. Not the tools — the thinking. What does it mean to synthesize 100 user interviews in an afternoon? What decisions can you make faster, and which ones still need slowness?",
];

/**
 * Bio as a reading experience: a sticky portrait keeps you company while the
 * manifesto resolves from ghost to ink, one word at a time, as you scroll.
 */
export function BioScroll() {
  return (
    <section data-id="about-bio-section" className="flex flex-col gap-12 lg:flex-row lg:gap-20">
      {/* Sticky portrait — grayscale until hovered */}
      <div data-id="about-bio-photo-col" className="shrink-0">
        <FadeUp data-id="about-bio-photo-reveal" className="lg:sticky lg:top-28">
          <div
            data-id="about-profile-photo"
            className="group relative h-48 w-48 overflow-hidden rounded-[24px] border border-[var(--color-border-default)] sm:h-56 sm:w-56"
          >
            <Image
              data-id="about-profile-img"
              src="/images/myprofileimage.png"
              alt="Arnab Debnath"
              fill
              sizes="(min-width: 640px) 224px, 192px"
              className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
              priority
            />
          </div>
          <p data-id="about-profile-caption" className="pt-3 font-datatype text-xs tracking-wider text-[var(--color-text-muted)]">
            Arnab Debnath — fig. 01
          </p>
        </FadeUp>
      </div>

      {/* Scroll-fill manifesto */}
      <div data-id="about-bio" className="flex max-w-2xl flex-col gap-8">
        {BIO.map((text, i) => (
          <FillParagraph
            key={i}
            idx={i}
            text={text}
            className="text-[clamp(19px,1.9vw,24px)] font-medium leading-[1.6] tracking-[-0.01em] text-[var(--color-text-primary)]"
          />
        ))}

        <FadeUp data-id="about-bio-outro-reveal">
          <p data-id="about-bio-outro" className="text-base leading-relaxed text-[var(--color-text-muted)]">
            Outside of work: painting (always), reading about systems design, and
            building things that probably won&apos;t ship.
          </p>
        </FadeUp>

        <FadeUp data-id="about-cta-reveal" delay={0.1}>
          <div data-id="about-cta-row" className="flex flex-wrap gap-3 pt-2">
            <PressButton data-id="about-cta-work" variant="primary" href="/work">
              See my work
            </PressButton>
            <PressButton
              data-id="about-cta-linkedin"
              variant="secondary"
              href="https://www.linkedin.com/in/arnabdebnath07/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </PressButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
