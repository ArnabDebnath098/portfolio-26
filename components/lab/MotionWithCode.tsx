"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/layout/SectionHeader";

const videos = [
  { id: "agents", src: "/images/lab/agents.mp4", label: "AI Agents" },
  { id: "folder", src: "/images/lab/folder.mp4", label: "Folder" },
  { id: "bottomnav", src: "/images/lab/bottomnav.mp4", label: "Bottom Nav" },
  { id: "desktopnav", src: "/images/lab/desktopnav.mp4", label: "Desktop Nav" },
];

function LazyVideo({ src, id }: { src: string; id: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loaded) {
            el.src = src;
            el.load();
            setLoaded(true);
          }
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src, loaded]);

  return (
    <video
      ref={ref}
      data-id={`motion-video-${id}`}
      preload="none"
      loop
      muted
      playsInline
      className="block h-auto w-full"
    />
  );
}

export function MotionWithCode() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const SCROLL_BY = 400;

  function updateArrows() {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  function scroll(dir: "prev" | "next") {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "next" ? SCROLL_BY : -SCROLL_BY, behavior: "smooth" });
  }

  const arrowClass = (enabled: boolean) =>
    cn(
      "flex h-9 w-9 items-center justify-center border transition-colors duration-200",
      "border-[var(--color-border-default)]",
      enabled
        ? "cursor-pointer text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-base)]"
        : "cursor-default text-[var(--color-text-muted)] opacity-30"
    );

  return (
    <section data-id="motion-with-code-section" className="flex flex-col gap-8">
      <SectionHeader
        id="lab-motion"
        index="02"
        eyebrow="Motion"
        title="Motion, built with code."
        subtitle="Interface motion prototyped in real components — animated in code, not faked in a mockup."
      />

      <div data-id="motion-with-code-body" className="flex flex-col gap-4">
        {/* Controls — square, sharp, hover-invert */}
        <div data-id="motion-with-code-controls" className="flex items-center justify-end gap-2">
          <button
            data-id="motion-with-code-prev"
            onClick={() => scroll("prev")}
            disabled={!canPrev}
            aria-label="Previous"
            className={arrowClass(canPrev)}
          >
            <svg data-id="motion-prev-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            data-id="motion-with-code-next"
            onClick={() => scroll("next")}
            disabled={!canNext}
            aria-label="Next"
            className={arrowClass(canNext)}
          >
            <svg data-id="motion-next-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div
          ref={trackRef}
          data-id="motion-with-code-track"
          className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none]"
        >
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              data-id={`motion-card-${video.id}`}
              className="group w-[min(420px,80vw)] shrink-0 snap-start border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)] transition-colors duration-300 hover:border-[var(--color-border-strong)]"
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div data-id={`motion-card-media-${video.id}`} className="overflow-hidden">
                <LazyVideo src={video.src} id={video.id} />
              </div>
              {/* Caption — sharp hairline divider, label + index */}
              <div
                data-id={`motion-card-caption-${video.id}`}
                className="flex items-center justify-between gap-3 border-t border-[var(--color-border-default)] px-4 py-3"
              >
                <span data-id={`motion-card-label-${video.id}`} className="text-xs uppercase tracking-[0.12em] text-[var(--color-text-primary)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                  {video.label}
                </span>
                <span data-id={`motion-card-index-${video.id}`} className="font-datatype text-[10px] tabular-nums text-[var(--color-text-muted)]">
                  ({String(i + 1).padStart(2, "0")})
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
