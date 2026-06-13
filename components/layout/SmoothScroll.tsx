"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const isCaseStudyDetail = /^\/work\/[^/]+$/.test(pathname);
    if (isCaseStudyDetail) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Lazy-loaded media (e.g. the /lab grid) grows the page after Lenis has
    // measured it, leaving the bottom unreachable. Recompute the scroll limit
    // whenever the document height changes.
    const resizeObserver = new ResizeObserver(() => lenis.resize());
    resizeObserver.observe(document.body);

    // Expose on window so the case study modal can pause/resume
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    /* Pause the RAF loop when tab is hidden — no wasted CPU in background */
    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(raf);
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
