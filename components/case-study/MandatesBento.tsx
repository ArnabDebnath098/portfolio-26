"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type BentoCell = {
  id: string;
  label: string;
  description: string;
  image: string;
  span: string; // grid area
};

const bentoCells: BentoCell[] = [
  {
    id: "desktop-checkout",
    label: "Desktop Checkout",
    description: "Full BASBA mandate flow — payment methods, QR scan, UPI ID selection",
    image: "/images/case-studies/mandates/desktop-checkout.png",
    span: "col-span-2 row-span-2",
  },
  {
    id: "mobile-mandate-setup",
    label: "Mandate Setup",
    description: "One-time UPI mandate with bank selection and app options",
    image: "/images/case-studies/mandates/mobile-mandate-setup.png",
    span: "col-span-1 row-span-2",
  },
  {
    id: "mobile-confirmation",
    label: "Payment Confirmation",
    description: "PhonePe approval with mandate details — amount, date, frequency",
    image: "/images/case-studies/mandates/mobile-confirmation.png",
    span: "col-span-1 row-span-2",
  },
  {
    id: "qr-section",
    label: "QR Code Flow",
    description: "Scan-to-pay with multi-app support",
    image: "/images/case-studies/mandates/qr-code.png",
    span: "col-span-1 row-span-1",
  },
  {
    id: "payment-sidebar",
    label: "Payment Methods",
    description: "BASBA, Cards, Netbanking, Pay in Parts",
    image: "/images/case-studies/mandates/payment-sidebar.png",
    span: "col-span-1 row-span-1",
  },
];

function BentoCard({ cell, index }: { cell: BentoCell; index: number }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = !imgError;

  return (
    <motion.div
      data-id={`bento-cell-${cell.id}`}
      className={cn(
        cell.span,
        "group relative overflow-hidden rounded-2xl",
        "border border-[var(--color-border-default)]",
        "bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg-subtle)]",
        "transition-all duration-500",
        "hover:border-[var(--color-accent)] hover:shadow-lg"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Image */}
      <div data-id={`bento-cell-image-${cell.id}`} className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
        {hasImage ? (
          <Image
            data-id={`bento-cell-img-${cell.id}`}
            src={cell.image}
            alt={cell.label}
            fill
            className="object-contain p-4"
            sizes="(max-width: 640px) 100vw, 50vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            data-id={`bento-cell-placeholder-${cell.id}`}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6"
          >
            <div data-id={`bento-cell-placeholder-icon-${cell.id}`} className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
            <span data-id={`bento-cell-placeholder-label-${cell.id}`} className="text-xs font-medium text-[var(--color-text-muted)] text-center">
              {cell.label}
            </span>
          </div>
        )}
      </div>

      {/* Hover overlay */}
      <div
        data-id={`bento-cell-overlay-${cell.id}`}
        className={cn(
          "absolute inset-0 flex flex-col justify-end p-5",
          "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300"
        )}
      >
        <p data-id={`bento-cell-overlay-label-${cell.id}`} className="text-sm font-semibold text-white">
          {cell.label}
        </p>
        <p data-id={`bento-cell-overlay-desc-${cell.id}`} className="text-xs text-white/70 mt-1 leading-relaxed">
          {cell.description}
        </p>
      </div>
    </motion.div>
  );
}

export function MandatesBento() {
  return (
    <section data-id="mandates-bento" className="max-w-[1200px] mx-auto px-6 py-16">
      <motion.div
        data-id="mandates-bento-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p data-id="mandates-bento-label" className="text-[10px] font-medium tracking-[0.14em] uppercase text-[var(--color-ornament)] mb-2">
          Design Showcase
        </p>
        <h2 data-id="mandates-bento-heading" className="text-2xl sm:text-3xl font-display text-[var(--color-text-primary)] leading-tight">
          Mandate Payment Screens
        </h2>
        <p data-id="mandates-bento-subline" className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-lg leading-relaxed">
          Desktop and mobile flows for BASBA using UPI — from payment method selection to mandate confirmation.
        </p>
      </motion.div>

      <div
        data-id="mandates-bento-grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] gap-4"
      >
        {bentoCells.map((cell, i) => (
          <BentoCard key={cell.id} cell={cell} index={i} />
        ))}
      </div>
    </section>
  );
}
