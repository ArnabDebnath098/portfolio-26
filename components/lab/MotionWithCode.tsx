"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const videos = [
  { id: "agents",     src: "/images/lab/agents.mp4"     },
  { id: "folder",     src: "/images/lab/folder.mp4"     },
  { id: "bottomnav",  src: "/images/lab/bottomnav.mp4"  },
  { id: "desktopnav", src: "/images/lab/desktopnav.mp4" },
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
      className="w-full h-auto block"
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

  return (
    <div data-id="motion-with-code-section" className="flex flex-col gap-6">
      <div data-id="motion-with-code-header" className="flex items-center justify-between">
        <div data-id="motion-with-code-title-row" className="flex items-center gap-3">
          <span data-id="motion-with-code-rule" className="rule-red" />
          <h2 data-id="motion-with-code-heading" className="text-2xl font-bold tracking-[-0.03em] text-[var(--color-text-primary)]">
            Motion with Code
          </h2>
        </div>

        <div data-id="motion-with-code-arrows" className="flex items-center gap-2">
          <button
            data-id="motion-with-code-prev"
            onClick={() => scroll("prev")}
            disabled={!canPrev}
            aria-label="Previous"
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200",
              "border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]",
              canPrev
                ? "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] cursor-pointer"
                : "text-[var(--color-text-muted)] opacity-30 cursor-default"
            )}
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
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200",
              "border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]",
              canNext
                ? "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] cursor-pointer"
                : "text-[var(--color-text-muted)] opacity-30 cursor-default"
            )}
          >
            <svg data-id="motion-next-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        data-id="motion-with-code-track"
        className="flex items-start gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {videos.map((video, i) => (
          <motion.div
            key={video.id}
            data-id={`motion-card-${video.id}`}
            className="shrink-0 snap-start rounded-[20px] overflow-hidden border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)] w-[min(420px,80vw)]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <LazyVideo src={video.src} id={video.id} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
