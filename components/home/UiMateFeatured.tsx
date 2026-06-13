"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";
import { SECTION_CONTAINER, SECTION_RHYTHM } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { PressButton } from "@/components/ui/PressButton";

export function UiMateFeatured() {
  return (
    <section data-id="uimate-section" className={cn(SECTION_RHYTHM, SECTION_CONTAINER)}>
      <SectionHeader
        id="uimate"
        index="01"
        eyebrow="Currently Building"
        title="Building the thing I wished existed."
        subtitle="Founder-mode on uiMate — designing, coding, and shipping it in public. Proof I live in the same constraints I design for."
        className="mb-10"
      />

      <Reveal data-id="uimate-featured-reveal" delay={0.1}>
        <a
          data-id="uimate-featured-link"
          href="https://uimate.in"
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
        <div
          data-id="uimate-featured-card"
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "border border-[var(--color-border-default)]",
            "bg-[var(--color-bg-base)]",
            "flex flex-col sm:flex-row"
          )}
        >
          {/* Left 70% — Content */}
          <div data-id="uimate-featured-left" className="flex-[7] flex flex-col justify-between p-8 sm:p-10 lg:p-12 gap-12 sm:gap-16">
            {/* Brand */}
            <div data-id="uimate-featured-brand" className="flex items-center gap-2 text-[var(--color-text-primary)]">
              <svg data-id="uimate-featured-logo" width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden>
                <path fillRule="evenodd" clipRule="evenodd" d="M16 0C24.8366 0 32.0003 7.16341 32.0003 16C32.0003 24.8366 24.8366 32 16 32C7.16349 31.9999 3.14011e-05 24.8365 0 16C0 7.16345 7.16347 7.32606e-05 16 0ZM12.2608 8.40729C10.8759 8.41547 9.60457 9.17517 8.94115 10.3909L6.85652 14.2103C6.22856 15.3611 6.23701 16.7542 6.87852 17.8975L9.00777 21.6921C9.6855 22.8999 10.9657 23.6446 12.3507 23.6364L19.7395 23.5927C21.1244 23.5845 22.3957 22.8248 23.0592 21.6091L25.1438 17.7897C25.7717 16.6389 25.7633 15.2458 25.1218 14.1025L22.9925 10.3079C22.3148 9.10005 21.0346 8.35542 19.6496 8.3636L12.2608 8.40729Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.8418 9.77262C15.8626 9.70268 15.927 9.65441 16.0002 9.65441C16.0733 9.65441 16.1377 9.70268 16.1585 9.77262C16.1585 9.77262 16.4484 10.7443 16.7591 11.7866C17.2542 13.447 18.5531 14.7459 20.2136 15.241C21.2558 15.5517 22.2275 15.8416 22.2275 15.8416C22.2975 15.8624 22.3457 15.9269 22.3457 16C22.3457 16.0731 22.2975 16.1376 22.2275 16.1584C22.2275 16.1584 21.2558 16.4483 20.2136 16.759C18.5531 17.2541 17.2542 18.553 16.7591 20.2134C16.4484 21.2557 16.1585 22.2274 16.1585 22.2274C16.1377 22.2973 16.0733 22.3456 16.0002 22.3456C15.927 22.3456 15.8626 22.2973 15.8418 22.2274C15.8418 22.2274 15.5519 21.2557 15.2412 20.2134C14.7461 18.553 13.4472 17.2541 11.7867 16.759C10.7445 16.4483 9.77277 16.1584 9.77277 16.1584C9.70283 16.1376 9.65456 16.0731 9.65456 16C9.65456 15.9269 9.70283 15.8624 9.77277 15.8416C9.77277 15.8416 10.7445 15.5517 11.7867 15.241C13.4472 14.7459 14.7461 13.447 15.2412 11.7866C15.5519 10.7443 15.8418 9.77262 15.8418 9.77262Z" fill="currentColor"/>
              </svg>
              <h2
                data-id="uimate-featured-title"
                className="text-lg font-bold tracking-[-0.02em]"
              >
                uiMate
              </h2>
            </div>

            {/* Bottom — Kicker + Headline + Button */}
            <div data-id="uimate-featured-bottom" className="flex flex-col gap-4">
              <p
                data-id="uimate-featured-kicker"
                className="text-[10px] font-medium tracking-[0.14em] uppercase text-[var(--color-text-muted)]"
              >
                Founding
              </p>
              <p
                data-id="uimate-featured-headline"
                className="text-2xl sm:text-3xl lg:text-[2.25rem] font-display text-[var(--color-text-primary)] leading-[1.15] tracking-[-0.02em]"
              >
                The career growth<br />platform for designers
              </p>
              <p
                data-id="uimate-featured-subtext"
                className="text-sm text-[var(--color-text-secondary)] leading-relaxed"
              >
                Most platforms let you post work. uiMate actually helps you improve — with AI-powered critiques on your designs, personalised daily challenges, curated resources and tweets from the design world, career trajectory tracking, and a community that gives real feedback, not just likes.
              </p>
              <div data-id="uimate-featured-cta-wrap" className="pt-2">
                <PressButton
                  data-id="uimate-featured-cta"
                  variant="primary"
                  className="self-start"
                >
                  Visit uimate.in
                </PressButton>
              </div>
            </div>
          </div>

          {/* Right 30% — uiMate preview */}
          <div
            data-id="uimate-featured-right"
            className="flex-[3] relative min-h-[180px] sm:min-h-0 overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-id="uimate-featured-preview"
              src="/uimate.svg"
              alt="uiMate preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        </a>
      </Reveal>
    </section>
  );
}
