"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { FolkFlowerSprig, TinyFleur } from "@/components/illustrations/IndianOrnaments";

const COUNT = testimonials.length;

function useCardWidth() {
  const [width, setWidth] = useState(720);
  useEffect(() => {
    function update() {
      setWidth(window.innerWidth < 640 ? Math.min(window.innerWidth - 64, 340) : 720);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return width;
}

// Build a virtual window of cards around the active index
function getVisibleCards(active: number) {
  const cards: { t: Testimonial; offset: number; key: string }[] = [];
  for (let offset = -3; offset <= 3; offset++) {
    const rawIndex = active + offset;
    const dataIndex = ((rawIndex % COUNT) + COUNT) % COUNT;
    cards.push({
      t: testimonials[dataIndex],
      offset,
      key: `${rawIndex}`,
    });
  }
  return cards;
}

function TestimonialCard({
  t,
  offset,
  cardWidth,
}: {
  t: Testimonial;
  offset: number;
  cardWidth: number;
}) {
  const absOffset = Math.abs(offset);
  const scale = offset === 0 ? 1 : absOffset === 1 ? 0.88 : 0.76;
  const gap = cardWidth < 400 ? cardWidth * 0.85 : 580;
  const translateX = offset * gap;
  const zIndex = 10 - absOffset;
  const opacity = absOffset <= 2 ? 1 - absOffset * 0.25 : 0;
  const blur = absOffset >= 2 ? 2 : 0;

  return (
    <motion.div
      data-id={`testimonial-card-${t.id}`}
      className="absolute top-0 left-1/2 z-[var(--card-z)]"
      initial={false}
      animate={{
        x: translateX - cardWidth / 2,
        scale,
        opacity,
        filter: `blur(${blur}px)`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ "--card-z": zIndex, "--card-w": `${cardWidth}px` } as React.CSSProperties}
    >
      <div
        data-id={`testimonial-card-inner-${t.id}`}
        className="w-[var(--card-w)] rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-5 sm:p-7 flex flex-col gap-4 sm:gap-5 shadow-sm h-[360px] sm:h-[400px] overflow-hidden"
      >
        {/* Folk flower accent */}
        <div data-id={`testimonial-flower-${t.id}`} aria-hidden className="-mb-1">
          <TinyFleur size={18} color="var(--color-ornament)" opacity={0.35} />
        </div>

        {/* Quote text */}
        <p data-id={`testimonial-quote-${t.id}`} className={`text-sm leading-relaxed text-[var(--color-text-secondary)] flex-1 flex items-center text-center ${offset === 0 ? "font-medium" : ""}`}>
          {t.quote}
        </p>

        {/* Ornamental divider */}
        <div data-id={`testimonial-divider-${t.id}`} aria-hidden className="flex items-center gap-2">
          <div data-id={`testimonial-divider-left-${t.id}`} className="flex-1 h-px bg-[var(--color-ornament)] opacity-15" />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4" stroke="var(--color-ornament)" strokeWidth="0.6" />
            <circle cx="6" cy="6" r="1.5" fill="var(--color-ornament)" opacity="0.5" />
          </svg>
          <div data-id={`testimonial-divider-right-${t.id}`} className="flex-1 h-px bg-[var(--color-ornament)] opacity-15" />
        </div>

        {/* Author */}
        <div data-id={`testimonial-author-${t.id}`} className="flex items-center gap-3">
          <div data-id={`testimonial-avatar-${t.id}`} className="w-9 h-9 rounded-full overflow-hidden shrink-0">
            <Image
              data-id={`testimonial-avatar-img-${t.id}`}
              src={t.avatar}
              alt={t.name}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <div data-id={`testimonial-author-info-${t.id}`} className="min-w-0">
            <p data-id={`testimonial-name-${t.id}`} className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
              {t.name}
            </p>
            <p data-id={`testimonial-role-${t.id}`} className="text-xs text-[var(--color-text-muted)] truncate">
              {t.role} · {t.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const cardWidth = useCardWidth();

  const goTo = useCallback((dir: -1 | 1) => {
    setActive((prev) => prev + dir);
  }, []);

  // Auto-advance every 6s, pause on hover or when off-screen
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.1 });
    io.observe(el);
    const id = setInterval(() => {
      if (!paused.current && visible) setActive((prev) => prev + 1);
    }, 6000);
    return () => { clearInterval(id); io.disconnect(); };
  }, []);

  const visibleCards = getVisibleCards(active);
  const activeDotIndex = ((active % COUNT) + COUNT) % COUNT;

  return (
    <section
      ref={sectionRef}
      data-id="testimonials"
      className="py-24 overflow-hidden"
      aria-label="Testimonials"
    >
      <div data-id="testimonials-header" className="w-[90%] max-w-[80vw] mx-auto px-6 mb-14">
        <motion.div
          data-id="testimonials-header-inner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3"
        >
          <div data-id="testimonials-label-row" className="flex items-center justify-center gap-3">
            <FolkFlowerSprig size={24} color="var(--color-ornament)" opacity={0.65} />
            <p data-id="testimonials-label" className="text-[10px] font-medium tracking-[0.18em] uppercase text-[var(--color-ornament)]">
              What people say
            </p>
          </div>
          <h2 data-id="testimonials-heading" className="text-3xl md:text-4xl font-display text-[var(--color-text-primary)] leading-tight">
            Voices that matter
          </h2>
          <p data-id="testimonials-subheading" className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xl">
            From colleagues, managers, and collaborators across JUSPAY, AirAsia, and beyond.
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div
        data-id="testimonials-carousel"
        className="relative max-w-7xl mx-auto px-6 overflow-hidden"
        onMouseEnter={() => { paused.current = true; }}
        onMouseLeave={() => { paused.current = false; }}
      >
        {/* Cards container */}
        <div
          data-id="testimonials-cards"
          className="relative h-[380px] sm:h-[440px] mx-auto max-w-[1400px] carousel-fade-mask"
        >
          {visibleCards.map(({ t, offset, key }) => (
            <TestimonialCard key={key} t={t} offset={offset} cardWidth={cardWidth} />
          ))}
        </div>

        {/* Navigation */}
        <div data-id="testimonials-nav" className="flex items-center justify-center gap-4 mt-8">
          <button
            data-id="testimonials-prev"
            onClick={() => goTo(-1)}
            className="w-10 h-10 rounded-full border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Dots */}
          <div data-id="testimonials-dots" className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                data-id={`testimonials-dot-${i}`}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeDotIndex
                    ? "bg-[var(--color-accent)] w-6"
                    : "bg-[var(--color-border-default)] hover:bg-[var(--color-text-muted)]"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            data-id="testimonials-next"
            onClick={() => goTo(1)}
            className="w-10 h-10 rounded-full border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
