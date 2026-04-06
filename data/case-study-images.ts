export type SlideImage = {
  src: string;
  alt: string;
};

/**
 * Maps case study slug → slide heading keyword → image(s).
 * The presentation component matches slide headings against these keys (case-insensitive includes).
 * Multiple images per slide are shown stacked.
 */
export const caseStudyImages: Record<string, Record<string, SlideImage[]>> = {
  "cracking-the-code-of-offers": {
    "problem": [
      {
        src: "/images/case-studies/offers/current-issues.webp",
        alt: "Current issues with offer UX — scattered formats across EMI cards, UPI options, and issuer offer cards",
      },
    ],
    "offer card": [
      {
        src: "/images/case-studies/offers/offer-cards-variants.png",
        alt: "Auto-applied offer card vs coupon-based card — two distinct visual treatments",
      },
      {
        src: "/images/case-studies/offers/offer-card-pay.png",
        alt: "Auto-applied offer card with direct Pay button to reduce memorize-then-navigate loop",
      },
    ],
    "nudges": [
      {
        src: "/images/case-studies/offers/payment-nudges.png",
        alt: "Payment method grid with pill-text offer nudges and selection flows",
      },
    ],
    "evaluation": [
      {
        src: "/images/case-studies/offers/auto-applied-detail.png",
        alt: "Auto-applied offer detail view with expanded card and final payable amount",
      },
    ],
  },
};

/**
 * Look up images for a slide by matching heading against keys.
 */
export function getSlideImages(
  slug: string,
  heading: string | null
): SlideImage[] {
  if (!heading) return [];
  const map = caseStudyImages[slug];
  if (!map) return [];

  const headingLower = heading.toLowerCase();
  for (const [key, images] of Object.entries(map)) {
    if (headingLower.includes(key)) return images;
  }
  return [];
}
