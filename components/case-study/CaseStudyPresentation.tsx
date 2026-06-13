"use client";

import { useRef, useState, useEffect, ReactNode, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CaseStudyFrontmatter } from "@/lib/mdx";
import { getSlideImages, type SlideImage } from "@/data/case-study-images";

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */
interface CaseStudyPresentationProps {
  frontmatter: CaseStudyFrontmatter;
  sections: ReactNode[];
  sectionHeadings: (string | null)[];
  slug: string;
}

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

/** A stable editorial "project code" — e.g. AGE·25. */
function projectCode(slug: string, year?: string) {
  const base = slug.replace(/[^a-z0-9]/gi, "").slice(0, 3).toUpperCase().padEnd(3, "X");
  const yy = (year ?? "").replace(/\D/g, "").slice(-2) || "00";
  return `${base}·${yy}`;
}

/* ───────────────────────────────────────────────────────
   Custom cubic-bezier smooth scroll (Newton-Raphson solve)
─────────────────────────────────────────────────────── */
function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  const solveX = (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const x2 = sampleX(t) - x;
      if (Math.abs(x2) < 1e-5) return t;
      const d = sampleDX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= x2 / d;
    }
    return t;
  };
  return (x: number) => sampleY(solveX(Math.min(1, Math.max(0, x))));
}

// A deliberate ease-in-out for section jumps — slow lead-in, long glide-out.
const SCROLL_EASE = cubicBezier(0.62, 0.0, 0.18, 1);

function smoothScrollTo(
  getCurrent: () => number,
  setCurrent: (v: number) => void,
  target: number,
  duration = 1000
) {
  const start = getCurrent();
  const delta = target - start;
  if (Math.abs(delta) < 1) return;
  let startTs = 0;
  const frame = (ts: number) => {
    if (!startTs) startTs = ts;
    const p = Math.min(1, (ts - startTs) / duration);
    setCurrent(start + delta * SCROLL_EASE(p));
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* ═══════════════════════════════════════════════════════
   FLOATING NAV — mobile only
═══════════════════════════════════════════════════════ */
function FloatingNav({
  headings,
  activeIndex,
  total,
  onSectionClick,
}: {
  headings: (string | null)[];
  activeIndex: number;
  total: number;
  onSectionClick: (index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (index: number) => {
      onSectionClick(index);
      setOpen(false);
    },
    [onSectionClick]
  );

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const activeLabel = headings[activeIndex] || `Section ${activeIndex + 1}`;

  return (
    <div ref={navRef} data-id="case-study-floating-nav" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        data-id="case-study-floating-nav-pill"
        layout
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        className={cn(
          "flex w-[230px] flex-col overflow-hidden",
          "bg-[var(--color-bg-elevated)]/95 backdrop-blur-md",
          "border border-[var(--color-border-default)] shadow-lg",
          open ? "rounded-[4px]" : "rounded-full"
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open && (
            <motion.div
              data-id="case-study-floating-nav-list-wrap"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
            >
              <p
                data-id="case-study-floating-nav-list-title"
                className="px-4 pb-2 pt-3 font-datatype text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]"
              >
                Index
              </p>
              <ul data-id="case-study-floating-nav-list" className="flex max-h-[60vh] flex-col overflow-y-auto px-2 pb-2">
                {headings.map((heading, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <li key={i} data-id={`case-study-floating-nav-item-${i}`}>
                      <button
                        data-id={`case-study-floating-nav-btn-${i}`}
                        onClick={() => handleSelect(i)}
                        className={cn(
                          "flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors duration-150",
                          isActive ? "bg-[var(--color-accent-subtle)]" : "hover:bg-[var(--color-bg-surface)]"
                        )}
                      >
                        <span
                          data-id={`case-study-floating-nav-num-${i}`}
                          className={cn(
                            "shrink-0 font-datatype text-[10px] tabular-nums",
                            isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)] opacity-60"
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          data-id={`case-study-floating-nav-label-${i}`}
                          className={cn(
                            "truncate font-questrial text-[13px] leading-snug",
                            isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"
                          )}
                        >
                          {heading || `Section ${i + 1}`}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          data-id="case-study-floating-nav-current"
          layout
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center gap-2 whitespace-nowrap px-4 py-2.5 transition-colors hover:bg-[var(--color-bg-surface)]/40"
        >
          <span data-id="case-study-floating-nav-counter" className="shrink-0 font-datatype text-[10px] tabular-nums text-[var(--color-accent)]">
            {String(activeIndex + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
          <motion.span
            data-id="case-study-floating-nav-heading"
            key={activeLabel}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 truncate font-questrial text-xs text-[var(--color-text-primary)]"
          >
            {activeLabel}
          </motion.span>
          <motion.svg
            data-id="case-study-floating-nav-chevron"
            width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="shrink-0 text-[var(--color-text-muted)]"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <path d="M18 15l-6-6-6 6" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   INTRO — editorial lead (carries the metadata header)
═══════════════════════════════════════════════════════ */
function IntroBlock({ frontmatter, slug }: { frontmatter: CaseStudyFrontmatter; slug: string }) {
  return (
    <header data-id="case-study-intro" className="pb-4">
      {/* Meta header — client/role/code */}
      <div data-id="case-study-intro-meta" className="mb-10 flex items-center gap-3">
        <div data-id="case-study-intro-meta-text" className="flex flex-col leading-tight">
          <span className="font-questrial text-sm font-bold text-[var(--color-text-primary)]">{frontmatter.company}</span>
          <span className="font-datatype text-[11px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
            {[frontmatter.role, frontmatter.year, projectCode(slug, frontmatter.year)].filter(Boolean).join(" · ")}
          </span>
        </div>
      </div>

      {frontmatter.tags?.length > 0 && (
        <motion.div
          data-id="case-study-intro-tags"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-datatype text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]"
        >
          {frontmatter.tags.map((t, i) => (
            <span key={t} data-id={`case-study-intro-tag-${i}`} className="flex items-center gap-3">
              {t}
              {i < frontmatter.tags.length - 1 && <span aria-hidden className="opacity-40">/</span>}
            </span>
          ))}
        </motion.div>
      )}

      <motion.h1
        data-id="case-study-intro-title"
        initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: REVEAL_EASE }}
        className="cs-display max-w-[16ch] text-[clamp(36px,5.4vw,68px)] leading-[1.02] tracking-[-0.03em] text-[var(--color-text-primary)]"
      >
        {frontmatter.title}
      </motion.h1>

      <motion.p
        data-id="case-study-intro-outcome"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: REVEAL_EASE }}
        className="mt-10 max-w-[52ch] font-questrial text-[clamp(17px,1.6vw,21px)] leading-[1.65] text-[var(--color-text-secondary)]"
      >
        {frontmatter.outcome}
      </motion.p>

      <div data-id="case-study-intro-rule" aria-hidden className="mt-16 h-px w-full bg-[var(--color-border-subtle)]" />
    </header>
  );
}

/* ═══════════════════════════════════════════════════════
   STORY SECTION — oversized number + editorial block
═══════════════════════════════════════════════════════ */
function StorySection({
  index,
  heading,
  images,
  children,
  sectionRef,
}: {
  index: number;
  heading: string | null;
  images: SlideImage[];
  children: ReactNode;
  sectionRef: (el: HTMLElement | null) => void;
}) {
  const hasImages = images.length > 0;
  const stepNum = String(index + 1).padStart(2, "0");

  return (
    <motion.section
      ref={sectionRef}
      data-id={`case-study-section-${index}`}
      className="relative py-20 sm:py-24 lg:py-28"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -22% 0px" }}
      transition={{ duration: 0.75, ease: REVEAL_EASE }}
    >
      {/* Oversized ghost number */}
      <span
        data-id={`case-study-section-ghost-${index}`}
        aria-hidden
        className="cs-display pointer-events-none absolute -top-2 right-0 select-none text-[clamp(72px,12vw,150px)] leading-none tracking-[-0.04em] text-[color-mix(in_srgb,var(--color-text-primary)_5%,transparent)]"
      >
        {stepNum}
      </span>

      {/* Eyebrow */}
      <p
        data-id={`case-study-section-eyebrow-${index}`}
        className="relative mb-5 font-datatype text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]"
      >
        Section {stepNum}
      </p>

      {heading && (
        <h2
          data-id={`case-study-section-heading-${index}`}
          className="cs-heading relative mb-8 max-w-[20ch] text-[clamp(26px,3.4vw,46px)] leading-[1.06] tracking-[-0.025em] text-[var(--color-text-primary)]"
        >
          {heading}
        </h2>
      )}

      <div
        data-id={`case-study-section-text-${index}`}
        className="relative flex max-w-[62ch] flex-col gap-6 font-questrial text-[clamp(16px,1.5vw,19px)] leading-[1.8] text-[var(--color-text-secondary)]"
      >
        {children}
      </div>

      {hasImages && (
        <div data-id={`case-study-section-images-${index}`} className="mt-14 flex flex-col gap-8">
          {images.map((img, i) => (
            <motion.figure
              key={i}
              data-id={`case-study-section-image-${index}-${i}`}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: REVEAL_EASE }}
              className="flex flex-col gap-2.5"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={1200}
                height={900}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1000px"
                quality={90}
                className={cn(
                  "rounded-[2px] bg-[var(--color-bg-surface)]",
                  img.fullWidth ? "block h-auto w-full" : "w-full object-contain"
                )}
                loading="lazy"
              />
              {img.alt && (
                <figcaption
                  data-id={`case-study-section-caption-${index}-${i}`}
                  className="font-datatype text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]"
                >
                  {img.alt}
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      )}
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════ */
export function CaseStudyPresentation({
  frontmatter,
  sections,
  sectionHeadings,
  slug,
}: CaseStudyPresentationProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  // Resolve the scroll container once (modal scroll area, else window).
  const getScrollEl = useCallback((): Element | null => {
    return contentRef.current?.closest("[data-id='casestudy-modal-content']") ?? null;
  }, []);

  // Active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const scrollRoot = getScrollEl();
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(i)),
        { root: scrollRoot || null, rootMargin: "-22% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections.length, getScrollEl]);

  // Reading-progress bar (writes a transform directly — no re-render per scroll)
  useEffect(() => {
    const scrollRoot = getScrollEl();
    const target: Element | Window = scrollRoot ?? window;
    const update = () => {
      const bar = progressRef.current;
      if (!bar) return;
      let ratio = 0;
      if (scrollRoot) {
        const max = scrollRoot.scrollHeight - scrollRoot.clientHeight;
        ratio = max > 0 ? scrollRoot.scrollTop / max : 0;
      } else {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        ratio = max > 0 ? window.scrollY / max : 0;
      }
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    };
    update();
    target.addEventListener("scroll", update, { passive: true });
    return () => target.removeEventListener("scroll", update);
  }, [getScrollEl]);

  const scrollToSection = useCallback(
    (index: number) => {
      const el = sectionRefs.current[index];
      if (!el) return;
      const scrollRoot = getScrollEl() as HTMLElement | null;
      const OFFSET = 64;
      if (scrollRoot) {
        const target = scrollRoot.scrollTop + (el.getBoundingClientRect().top - scrollRoot.getBoundingClientRect().top) - OFFSET;
        smoothScrollTo(() => scrollRoot.scrollTop, (v) => (scrollRoot.scrollTop = v), target);
      } else {
        const target = window.scrollY + el.getBoundingClientRect().top - OFFSET;
        smoothScrollTo(() => window.scrollY, (v) => window.scrollTo(0, v), target);
      }
    },
    [getScrollEl]
  );

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div data-id="case-study-presentation" className="min-h-full">
      {/* Reading progress bar */}
      <div data-id="case-study-progress-track" className="sticky top-0 z-30 h-[2px] w-full bg-transparent">
        <div
          ref={progressRef}
          data-id="case-study-progress-fill"
          className="h-full w-full origin-left scale-x-0 bg-[var(--color-accent)]"
        />
      </div>

      <div
        ref={contentRef}
        data-id="case-study-main"
        className="mx-auto w-full max-w-[760px] px-6 pb-40 pt-16 lg:px-8 lg:pt-24"
      >
        <div data-id="case-study-content" className="min-w-0">
          <IntroBlock frontmatter={frontmatter} slug={slug} />

          <div data-id="case-study-sections" className="flex flex-col">
            {sections.map((sectionContent, i) => (
              <StorySection
                key={i}
                index={i}
                heading={sectionHeadings[i]}
                images={getSlideImages(slug, sectionHeadings[i])}
                sectionRef={setSectionRef(i)}
              >
                {sectionContent}
              </StorySection>
            ))}
          </div>
        </div>
      </div>

      <FloatingNav
        headings={sectionHeadings}
        activeIndex={activeSection}
        total={sectionHeadings.length}
        onSectionClick={scrollToSection}
      />
    </div>
  );
}
