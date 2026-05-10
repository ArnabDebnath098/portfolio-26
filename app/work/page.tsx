import { Metadata } from "next";
import { Suspense } from "react";
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
    <Suspense fallback={null}>
      <WorkPageClient
        sorted={sorted}
        caseStudyContent={caseStudyContent}
      />
    </Suspense>
  );
}
