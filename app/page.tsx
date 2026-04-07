import fs from "fs";
import path from "path";
import { HeroSection } from "@/components/home/HeroSection";
import { UiMateFeatured } from "@/components/home/UiMateFeatured";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { Testimonials } from "@/components/home/Testimonials";
import { Achievements } from "@/components/home/Achievements";
import { JaliDivider } from "@/components/illustrations/JaliDivider";
import { WipBanner } from "@/components/home/WipBanner";
import { projects } from "@/data/projects";
import { prerenderCaseStudies } from "@/lib/prerender-case-studies";

export default async function Home() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order)
    .map((p) => ({
      ...p,
      thumbnail: fs.existsSync(path.join(process.cwd(), "public", p.thumbnail))
        ? p.thumbnail
        : "",
    }));

  const caseStudyContent = await prerenderCaseStudies();

  return (
    <>
      <WipBanner />
      <HeroSection />
      <UiMateFeatured />
      <ProjectGrid projects={featured} caseStudyContent={caseStudyContent} />
      <JaliDivider data-id="jali-divider-projects-testimonials" className="max-w-5xl mx-auto px-6" />
      <Testimonials />
      <JaliDivider data-id="jali-divider-testimonials-achievements" className="max-w-5xl mx-auto px-6" />
      <Achievements />
    </>
  );
}
