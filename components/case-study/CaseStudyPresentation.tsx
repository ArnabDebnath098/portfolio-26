"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion } from "motion/react";
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


/* ═══════════════════════════════════════════════════════
   SIDEBAR — sticky left, shows section nav
═══════════════════════════════════════════════════════ */
function Sidebar({
  headings,
  activeIndex,
  onSectionClick,
}: {
  headings: (string | null)[];
  activeIndex: number;
  onSectionClick: (index: number) => void;
}) {
  return (
    <aside
      data-id="case-study-sidebar"
      className={cn(
        "hidden lg:flex flex-col w-[240px] min-w-[240px]",
        "sticky top-0 h-dvh",
        "border-r border-[var(--color-border-default)]",
        "bg-[var(--color-bg-base)]"
      )}
    >
      <nav
        data-id="case-study-sidebar-nav"
        className="flex-1 overflow-y-auto px-3 py-4 scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
      >
        <ul data-id="case-study-sidebar-sections" className="flex flex-col gap-0.5">
          {headings.map((heading, i) => {
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;
            const label = heading || `Section ${i + 1}`;
            return (
              <li key={i} data-id={`case-study-sidebar-item-${i}`} className="relative">
                {/* Animated pill — slides to the active item */}
                {isActive && (
                  <motion.div
                    data-id="case-study-sidebar-active-pill"
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-lg bg-[var(--color-accent-subtle)]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <button
                  data-id={`case-study-sidebar-btn-${i}`}
                  onClick={() => onSectionClick(i)}
                  className={cn(
                    "relative w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left",
                    "cursor-pointer group",
                    !isActive && "hover:bg-[var(--color-bg-surface)]"
                  )}
                >
                  <span
                    data-id={`case-study-sidebar-step-num-${i}`}
                    className={cn(
                      "font-datatype text-[10px] tabular-nums mt-0.5 flex-shrink-0 w-5",
                      isActive
                        ? "text-[var(--color-accent)]"
                        : isPast
                          ? "text-[var(--color-text-muted)]"
                          : "text-[var(--color-text-muted)] opacity-50"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    data-id={`case-study-sidebar-step-label-${i}`}
                    className={cn(
                      "text-[13px] leading-snug transition-colors duration-200",
                      isActive
                        ? "text-[var(--color-accent)] font-medium"
                        : isPast
                          ? "text-[var(--color-text-secondary)]"
                          : "text-[var(--color-text-muted)]"
                    )}
                  >
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════
   MOBILE NAV — fixed bottom bar on small screens
═══════════════════════════════════════════════════════ */
function MobileNav({
  headings,
  activeIndex,
  total,
}: {
  headings: (string | null)[];
  activeIndex: number;
  total: number;
}) {
  return (
    <div
      data-id="case-study-mobile-nav"
      className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 z-40",
        "bg-[var(--color-bg-base)]/90 backdrop-blur-md",
        "border-t border-[var(--color-border-default)]",
        "px-4 py-3 flex items-center justify-between"
      )}
    >
      <span
        data-id="case-study-mobile-nav-heading"
        className="text-xs text-[var(--color-text-secondary)] truncate max-w-[60%]"
      >
        {headings[activeIndex] || `Section ${activeIndex + 1}`}
      </span>
      <span
        data-id="case-study-mobile-nav-counter"
        className="font-datatype text-[10px] text-[var(--color-text-muted)] tabular-nums"
      >
        {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO COVER — full viewport intro for the case study
═══════════════════════════════════════════════════════ */
function CoverSection({ frontmatter }: { frontmatter: CaseStudyFrontmatter }) {
  return (
    <section
      data-id="case-study-cover"
      className="min-h-dvh flex flex-col justify-center items-center text-center px-6 sm:px-12 py-20"
    >
      {/* Tags */}
      <motion.div
        data-id="case-study-cover-tags"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-6"
      >
        {frontmatter.tags.map((tag) => (
          <span
            key={tag}
            data-id={`case-study-cover-tag-${tag.toLowerCase().replace(/\s/g, "-")}`}
            className={cn(
              "px-2.5 py-0.5 text-[10px] font-medium tracking-wide uppercase",
              "bg-[var(--color-accent-subtle)]",
              "text-[var(--color-accent)]",
              "border border-[var(--color-accent-muted)]"
            )}
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Title */}
      <motion.h2
        data-id="case-study-cover-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display tracking-[-0.04em] text-[var(--color-text-primary)] leading-[1.08] mb-6 max-w-3xl"
      >
        {frontmatter.title}
      </motion.h2>

      {/* Outcome */}
      <motion.p
        data-id="case-study-cover-outcome"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-[1.8] max-w-2xl mx-auto mb-10"
      >
        {frontmatter.outcome}
      </motion.p>

      {/* Meta row */}
      <motion.div
        data-id="case-study-cover-meta"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex w-full max-w-[800px] justify-between gap-12 px-4"
      >
        {[
          { label: "Company", value: frontmatter.company },
          { label: "Year", value: frontmatter.year },
          { label: "Role", value: frontmatter.role },
          { label: "Duration", value: frontmatter.duration },
        ].map((item) => (
          <div
            data-id={`case-study-cover-meta-${item.label.toLowerCase()}`}
            key={item.label}
            className="flex flex-col gap-0.5"
          >
            <span
              data-id={`case-study-cover-meta-label-${item.label.toLowerCase()}`}
              className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.14em] font-medium"
            >
              {item.label}
            </span>
            <span
              data-id={`case-study-cover-meta-value-${item.label.toLowerCase()}`}
              className="text-sm font-semibold text-[var(--color-text-primary)]"
            >
              {item.value}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        data-id="case-study-cover-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-16 flex items-center gap-2"
      >
        <span
          data-id="case-study-cover-scroll-hint-text"
          className="text-[10px] text-[var(--color-text-muted)] tracking-[0.14em] uppercase font-medium"
        >
          Scroll to read
        </span>
        <motion.div
          data-id="case-study-cover-scroll-hint-arrow"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            data-id="case-study-cover-scroll-hint-icon"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[var(--color-text-muted)]"
          >
            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   STORY SECTION — single vertical section with
   step number, heading, content, and optional images
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
    <section
      ref={sectionRef}
      data-id={`case-study-section-${index}`}
      className="relative py-16 sm:py-20 lg:py-28"
    >
      {/* Step header — design-process style */}
      <div data-id={`case-study-section-top-${index}`} className="relative max-w-[720px] mb-8">
        {/* Ghost number */}
        <span
          data-id={`case-study-section-ghost-num-${index}`}
          className="absolute top-0 left-0 font-display select-none pointer-events-none z-0 text-[var(--color-accent)] ghost-step-number"
        >
          {stepNum}
        </span>

        <div data-id={`case-study-section-header-${index}`} className="relative z-10 flex flex-col gap-1 pt-4 sm:pt-6">
          <p
            data-id={`case-study-section-phase-label-${index}`}
            className="text-[9px] sm:text-[10px] tracking-[0.24em] uppercase font-semibold text-[var(--color-accent)]"
          >
            Section {stepNum}
          </p>
          {heading && (
            <h2
              data-id={`case-study-section-heading-${index}`}
              className="font-display text-[clamp(24px,3.5vw,44px)] tracking-[-0.025em] text-[var(--color-text-primary)] leading-[1.08]"
            >
              {heading}
            </h2>
          )}
        </div>
      </div>

      {/* Ornamental divider */}
      <div data-id={`case-study-section-rule-${index}`} className="flex items-center gap-3 mb-8 max-w-[720px]">
        <div data-id={`case-study-section-rule-left-${index}`} className="h-px flex-1 bg-[var(--color-accent)]/25" />
        <svg data-id={`case-study-section-rule-icon-${index}`} width="12" height="12" viewBox="0 0 14 14" aria-hidden>
          <polygon points="7,1 13,7 7,13 1,7" stroke="var(--color-accent)" strokeWidth="0.8" fill="none" opacity="0.7" />
          <circle cx="7" cy="7" r="2" fill="var(--color-accent)" opacity="0.6" />
        </svg>
        <div data-id={`case-study-section-rule-right-${index}`} className="h-px flex-1 bg-[var(--color-accent)]/25" />
      </div>

      {/* Content */}
      <div data-id={`case-study-section-body-${index}`} className="flex flex-col gap-8 w-full">
        <div
          data-id={`case-study-section-text-${index}`}
          className="flex flex-col gap-4 w-full text-base md:text-lg leading-[1.8] text-[var(--color-text-secondary)]"
        >
          {children}
        </div>

        {/* Images */}
        {hasImages && (
          <div data-id={`case-study-section-images-${index}`} className="flex flex-col gap-4">
            {images.map((img, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <motion.img
                key={i}
                data-id={`case-study-section-image-${index}-${i}`}
                src={img.src}
                alt={img.alt}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] object-contain"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>

      {/* Section divider */}
      <div
        data-id={`case-study-section-divider-${index}`}
        className="mt-16 sm:mt-20 lg:mt-28 flex items-center gap-3"
      >
        <div data-id={`case-study-section-divider-left-${index}`} className="flex-1 h-px bg-[var(--color-border-default)]" />
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <circle cx="6" cy="6" r="4" stroke="var(--color-ornament)" strokeWidth="0.6" />
          <circle cx="6" cy="6" r="1.5" fill="var(--color-ornament)" opacity="0.5" />
        </svg>
        <div data-id={`case-study-section-divider-right-${index}`} className="flex-1 h-px bg-[var(--color-border-default)]" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT — vertical scroll with sidebar
═══════════════════════════════════════════════════════ */
export function CaseStudyPresentation({
  frontmatter,
  sections,
  sectionHeadings,
  slug,
}: CaseStudyPresentationProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);

  // Track which section is in view via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(i);
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections.length]);

  function scrollToSection(index: number) {
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function setSectionRef(index: number) {
    return (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    };
  }

  return (
    <div data-id="case-study-presentation" className="flex min-h-screen">
      {/* Sidebar — desktop only */}
      <Sidebar
        headings={sectionHeadings}
        activeIndex={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Main content — vertical scroll */}
      <main
        ref={contentRef}
        data-id="case-study-main"
        className="flex-1 min-w-0"
      >
        {/* Cover */}
        <div data-id="case-study-cover-wrapper" className="max-w-[1000px] mx-auto">
          <CoverSection frontmatter={frontmatter} />
        </div>

        {/* Story sections */}
        <div
          data-id="case-study-sections"
          className="max-w-[1000px] mx-auto pb-32 lg:pb-20 flex flex-col gap-0"
        >
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
      </main>

      {/* Mobile bottom nav */}
      <MobileNav
        headings={sectionHeadings}
        activeIndex={activeSection}
        total={sectionHeadings.length}
      />
    </div>
  );
}
