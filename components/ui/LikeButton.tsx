"use client";

import { useState, useEffect } from "react";
import { Heart } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "portfolio_liked";

export function LikeButton() {
  const [count, setCount] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    setMounted(true);
    const alreadyLiked = localStorage.getItem(STORAGE_KEY) === "true";
    setLiked(alreadyLiked);

    fetch("/api/likes")
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => setCount(0));

    if (!alreadyLiked) {
      const t = setTimeout(() => setIsShaking(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const handleLike = async () => {
    if (animating) return;

    setAnimating(true);
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => (c ?? 0) + (nextLiked ? 1 : -1));

    if (nextLiked) {
      localStorage.setItem(STORAGE_KEY, "true");
      setIsShaking(false);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    try {
      const res = await fetch("/api/likes", {
        method: nextLiked ? "POST" : "DELETE",
      });
      const data = await res.json();
      setCount(data.count);
    } catch {
      // optimistic update stays
    }

    setTimeout(() => setAnimating(false), 600);
  };

  if (!mounted) return null;

  return (
    <div
      data-id="like-button-wrapper"
      className="hidden md:flex fixed bottom-6 left-6 z-50"
    >
      <motion.button
        data-id="like-button"
        onClick={handleLike}
        whileTap={{ scale: 0.92 }}
        className={cn(
          "flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full",
          "border transition-all duration-200 cursor-pointer select-none",
          "shadow-lg hover:shadow-xl",
          liked
            ? "border-[var(--color-accent)]/60 bg-[var(--color-accent-subtle)]"
            : "border-[var(--color-border-default)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-accent)]/60"
        )}
        aria-label={liked ? "You liked this portfolio" : "Like this portfolio"}
      >
        <span
          data-id="like-button-icon"
          className={isShaking ? "animate-heart-shake" : ""}
        >
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore — weight prop valid in phosphor v2, TS typedef stale */}
          <Heart
            size={18}
            weight={liked ? "fill" : "regular"}
            className={liked ? "text-[var(--color-accent)]" : "text-[var(--color-accent)]/70"}
          />
        </span>

        <span
          data-id="like-button-count"
          className={cn(
            "text-xs font-medium tabular-nums min-w-[1ch]",
            liked
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-text-secondary)]"
          )}
        >
          {count === null ? "—" : count}
        </span>
      </motion.button>
    </div>
  );
}
