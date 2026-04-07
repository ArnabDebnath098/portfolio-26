export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  year: string;
  tags: string[];
  thumbnail: string;
  outcome: string;
  description: string;
  featured: boolean;
  locked: boolean;
  order: number;
};

export const projects: Project[] = [
  {
    slug: "bengaluru-transit",
    title: "One City. One App. Seamless Transit in Bengaluru.",
    subtitle: "Transit UX · Personal Project · Dec 2023",
    company: "Personal Project",
    year: "2023",
    tags: ["Transit", "Urban Mobility", "Product Design"],
    thumbnail: "/images/case-studies/onecityoneapp.png",
    outcome:
      "From buses to metros, cabs to bikes — one app for all of Bengaluru's transit needs.",
    description:
      "From buses to metros, cabs to bikes—one app for all of Bengaluru's transit needs.",
    featured: true,
    locked: false,
    order: 7,
  },
  {
    slug: "cracking-the-code-of-offers",
    title: "Cracking the Code of Offers",
    subtitle: "Consumer Checkout UX · JUSPAY · Jan 2025",
    company: "JUSPAY",
    year: "2025",
    tags: ["Fintech", "Checkout UX", "System Design"],
    thumbnail: "/images/case-studies/Offers-casestudy.png",
    outcome:
      "Redesigning how offers and coupons surface, communicate, and convert — across 500+ merchants and 100M+ daily sessions.",
    description:
      "Designing for the bargain ninjas—users who'll leap through hoops to uncover the best deals. A case study on simplifying the hunt for discounts and making offers effortless to find, apply, and enjoy.",
    featured: true,
    locked: false,
    order: 1,
  },
  {
    slug: "unlocking-credit-access",
    title: "Unlocking Credit Access: EMI at Checkout",
    subtitle: "Embedded Finance · JUSPAY · Aug 2023",
    company: "JUSPAY",
    year: "2023",
    tags: ["Fintech", "Inclusion", "Product Strategy"],
    thumbnail: "/images/case-studies/emi-casestudy.png",
    outcome:
      "Making credit seamless for high-ticket purchases, bridging the gap for 300M+ Indian shoppers.",
    description:
      "Making credit seamless for high-ticket purchases, bridging the gap for 300M+ Indian shoppers, and transforming the shopping experience.",
    featured: true,
    locked: false,
    order: 4,
  },
  {
    slug: "streamlining-checkout",
    title: "Streamlining the Checkout Experience",
    subtitle: "Checkout UX · Personal Project · Apr 2024",
    company: "Personal Project",
    year: "2024",
    tags: ["E-commerce", "Conversion", "UX Strategy"],
    thumbnail: "/images/case-studies/checkout.png",
    outcome:
      "A deep dive into optimizing e-commerce checkout flow to reduce cart abandonment and improve conversion rates.",
    description:
      "A deep dive into optimizing e-commerce checkout flow to reduce cart abandonment and improve conversion rates.",
    featured: true,
    locked: false,
    order: 5,
  },
  {
    slug: "mandates",
    title: "Mandates: Designing Recurring Payments",
    subtitle: "Payment Infrastructure · JUSPAY · 2024",
    company: "JUSPAY",
    year: "2024",
    tags: ["Fintech", "Recurring Payments", "UPI"],
    thumbnail: "/images/case-studies/mandates.png",
    outcome:
      "Simplifying recurring payment setup and management — making mandates transparent, trustworthy, and easy to control.",
    description:
      "Designing the end-to-end mandate creation and management experience for UPI and card-based recurring payments across JUSPAY's merchant ecosystem.",
    featured: true,
    locked: false,
    order: 3,
  },
  {
    slug: "ai-investment-manager",
    title: "Wealth Lens: AI-Powered Investment Manager",
    subtitle: "Fintech · AI · Personal Project · 2025",
    company: "Personal Project",
    year: "2025",
    tags: ["Fintech", "AI", "Investment", "Product Design"],
    thumbnail: "/images/case-studies/investment.png",
    outcome:
      "Designing a unified asset management experience where users track portfolios, get AI-driven investment suggestions, and visualize growth over time.",
    description:
      "A personal finance tool that consolidates all investments — stocks, mutual funds, crypto, real estate — into one dashboard with AI-powered insights and actionable recommendations.",
    featured: true,
    locked: false,
    order: 2,
  },
  {
    slug: "collaborative-travel-planner",
    title: "Wandr: Collaborative Trip Planning for Groups",
    subtitle: "Travel UX · Personal Project · 2025",
    company: "Personal Project",
    year: "2025",
    tags: ["Travel", "Collaboration", "Product Design"],
    thumbnail: "/images/case-studies/itineraryplanning.png",
    outcome:
      "Designing a shared itinerary tool that lets groups collaboratively plan multi-city trips — adding stops, commenting on destinations, and coordinating transportation.",
    description:
      "Planning multi-city vacations with groups is chaotic. Wandr brings shared itineraries, real-time collaboration, and transport coordination into one seamless experience.",
    featured: true,
    locked: false,
    order: 7,
  },
];
