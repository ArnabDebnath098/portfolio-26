export type Experiment = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  type: string;
  href: string;
};

export const experiments: Experiment[] = [
  {
    id: "ai-research-synthesis",
    title: "AI Research Synthesis Workflow",
    description:
      "How I use Claude to synthesize 40+ user interview transcripts in under 2 hours — including the prompt system I built to surface non-obvious patterns.",
    tags: ["AI Workflow", "Research", "Prompting"],
    status: "Live",
    type: "Process",
    href: "#",
  },
  {
    id: "payment-microinteractions",
    title: "Payment Microinteraction System",
    description:
      "A coded library of micro-interactions for payment states — loading, success, failure, and edge cases. Built in React + Motion.",
    tags: ["React", "Motion", "Fintech"],
    status: "Live",
    type: "Code",
    href: "#",
  },
  {
    id: "color-accessibility-checker",
    title: "Color Contrast Token Checker",
    description:
      "A small tool I built to validate design token pairs against WCAG AA/AAA. Came out of the DMRC accessibility project.",
    tags: ["Accessibility", "Tooling", "TypeScript"],
    status: "In progress",
    type: "Code",
    href: "#",
  },
  {
    id: "design-to-code-gap",
    title: "The Design-to-Code Gap",
    description:
      "A short essay on what designers get wrong when handing off to engineers — and how I use my CS background to bridge it.",
    tags: ["Process", "Writing", "Engineering"],
    status: "Live",
    type: "Writing",
    href: "https://medium.com/@Arnab_Debnath",
  },
];
