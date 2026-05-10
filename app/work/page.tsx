import { Metadata } from "next";
import { projects } from "@/data/projects";
import { prerenderCaseStudies } from "@/lib/prerender-case-studies";
import { WorkPageClient } from "@/components/work/WorkPageClient";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies in fintech, consumer, accessibility, and platform design.",
};

export default async function WorkPage() {
  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const caseStudyContent = await prerenderCaseStudies();

  return (
    <WorkPageClient
      sorted={sorted}
      caseStudyContent={caseStudyContent}
    />
  );
}
