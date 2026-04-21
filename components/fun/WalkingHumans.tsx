"use client";

import { useEffect, useRef, useState } from "react";
import { generateHuman, type HumanSprite } from "@/lib/pixelHuman";
import { drawHuman } from "@/lib/pixelHumanRenderer";

const CANVAS_SIZE = 56;
const WALK_SPEED = 18; // px/sec
const FRAME_MS = 160;
const FRAME_COUNT = 4;

type Walker = {
  sprite: HumanSprite;
  x: number;
  vx: number;
  frame: number;
  frameAccum: number;
};

export function WalkingHumans() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const walkersRef = useRef<Walker[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setContainerWidth(el.clientWidth);
    });
    ro.observe(el);
    setContainerWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const leftCanvas = leftCanvasRef.current;
    const rightCanvas = rightCanvasRef.current;
    if (!leftCanvas || !rightCanvas) return;
    if (containerWidth <= CANVAS_SIZE) return;

    // Setup retina canvases
    const dpr = window.devicePixelRatio || 1;
    for (const c of [leftCanvas, rightCanvas]) {
      c.width = CANVAS_SIZE * dpr;
      c.height = CANVAS_SIZE * dpr;
      const ctx = c.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = false;
      }
    }

    // Generate walkers once
    if (walkersRef.current.length === 0) {
      const seedA = Math.floor(Math.random() * 1_000_000);
      const seedB = seedA + Math.floor(Math.random() * 500_000) + 1;
      walkersRef.current = [
        {
          sprite: generateHuman(seedA),
          x: containerWidth * 0.15,
          vx: WALK_SPEED,
          frame: 0,
          frameAccum: 0,
        },
        {
          sprite: generateHuman(seedB),
          x: containerWidth * 0.7,
          vx: -WALK_SPEED,
          frame: 0,
          frameAccum: 0,
        },
      ];
    }

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const leftCtx = leftCanvas.getContext("2d")!;
    const rightCtx = rightCanvas.getContext("2d")!;

    const tick = (now: number) => {
      const prev = lastTimeRef.current || now;
      const dt = Math.min(now - prev, 60);
      lastTimeRef.current = now;

      const maxX = containerWidth - CANVAS_SIZE;

      for (const w of walkersRef.current) {
        if (!reduced) {
          w.x += (w.vx * dt) / 1000;
          if (w.x < 0) {
            w.x = 0;
            w.vx = Math.abs(w.vx);
          } else if (w.x > maxX) {
            w.x = maxX;
            w.vx = -Math.abs(w.vx);
          }
          w.frameAccum += dt;
          if (w.frameAccum >= FRAME_MS) {
            w.frame = (w.frame + 1) % FRAME_COUNT;
            w.frameAccum = 0;
          }
        }
      }

      // Each walker faces its direction of travel. That naturally produces:
      //   - converging (walking toward each other) → they face each other
      //   - diverging (walking apart) → they face away from each other
      const a = walkersRef.current[0];
      const b = walkersRef.current[1];
      drawHuman(leftCtx, a.sprite, a.frame, a.vx < 0, CANVAS_SIZE, CANVAS_SIZE);
      drawHuman(rightCtx, b.sprite, b.frame, b.vx < 0, CANVAS_SIZE, CANVAS_SIZE);
      leftCanvas.style.setProperty("--walker-x", `${a.x}px`);
      rightCanvas.style.setProperty("--walker-x", `${b.x}px`);

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [containerWidth]);

  return (
    <div
      ref={wrapperRef}
      data-id="walking-humans"
      aria-hidden="true"
      className="w-full h-full flex items-end pointer-events-none"
    >
      <canvas
        ref={leftCanvasRef}
        data-id="walking-human-left"
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="absolute w-[56px] h-[56px] translate-x-[var(--walker-x)] [image-rendering:pixelated]"
        style={{ bottom: 0 }}
      />
      <canvas
        ref={rightCanvasRef}
        data-id="walking-human-right"
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="absolute w-[56px] h-[56px] translate-x-[var(--walker-x)] [image-rendering:pixelated]"
        style={{ bottom: 0 }}
      />
    </div>
  );
}
