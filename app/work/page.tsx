import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { projects } from "@/data/projects";
import { prerenderCaseStudies } from "@/lib/prerender-case-studies";
import { WorkPageClient } from "@/components/work/WorkPageClient";

function thumbnailExists(thumbnail: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", thumbnail));
}

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies in fintech, consumer, accessibility, and platform design.",
};

export default async function WorkPage() {
  const sorted = [...projects]
    .sort((a, b) => a.order - b.order)
    .map((p) => ({ ...p, hasThumb: thumbnailExists(p.thumbnail) }));

  const caseStudyContent = await prerenderCaseStudies();

  return (
    <WorkPageClient
      sorted={sorted}
      caseStudyContent={caseStudyContent}
    />
  );
}
