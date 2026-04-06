export type Service = {
  id: string;
  title: string;
  duration: string;
  forWho: string;
  deliverables: string[];
  pricing: string;
  cta: string;
};

export const services: Service[] = [
  {
    id: "design-sprint",
    title: "Design Sprint",
    duration: "1–2 weeks",
    forWho: "Teams that need to validate a direction fast",
    deliverables: [
      "Problem framing & research synthesis",
      "Concept exploration (3+ directions)",
      "Testable high-fidelity prototype",
      "Presentation deck with rationale",
    ],
    pricing: "Starting at ₹80,000",
    cta: "Let's talk",
  },
  {
    id: "full-product-design",
    title: "Full Product Design",
    duration: "4–8 weeks",
    forWho: "0→1 products or significant redesigns",
    deliverables: [
      "User research & synthesis",
      "Full UX/UI across all flows",
      "Design system & component library",
      "Dev-ready Figma handoff",
    ],
    pricing: "Starting at ₹2,40,000",
    cta: "Let's talk",
  },
  {
    id: "design-partner",
    title: "Design Partner",
    duration: "Ongoing · min. 3 months",
    forWho: "Startups that need a senior design brain on call",
    deliverables: [
      "Weekly async design reviews",
      "2× 1:1 syncs per month",
      "Figma critique & direction",
      "On-demand design support",
    ],
    pricing: "Starting at ₹60,000/mo",
    cta: "Let's talk",
  },
];
