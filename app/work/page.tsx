import { Suspense } from "react";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { projects } from "@/data/projects";
import { getCaseStudy, parseCaseStudySections } from "@/lib/mdx";
import { storyMdxComponents } from "@/components/case-study/slideMdxComponents";
import { CaseStudyPresentation } from "@/components/case-study/CaseStudyPresentation";
import { WorkPageClient } from "@/components/work/WorkPageClient";

function thumbnailExists(thumbnail: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", thumbnail));
}

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies in fintech, consumer, accessibility, and platform design.",
};

/** Slugs that have full case study content available */
const MODAL_SLUGS = ["cracking-the-code-of-offers"];

export default async function WorkPage() {
  const sorted = [...projects]
    .sort((a, b) => a.order - b.order)
    .map((p) => ({ ...p, hasThumb: thumbnailExists(p.thumbnail) }));

  // Pre-render case study content for modal display
  const caseStudyContent: Record<string, React.ReactNode> = {};

  for (const slug of MODAL_SLUGS) {
    const cs = getCaseStudy(slug);
    if (!cs) continue;

    const { frontmatter, content } = cs;
    const sectionDataArray = parseCaseStudySections(content);

    const sectionNodes = sectionDataArray.map((section, i) => (
      <MDXRemote
        key={i}
        source={section.content}
        components={storyMdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    ));

    const sectionHeadings = sectionDataArray.map((s) => s.heading);

    caseStudyContent[slug] = (
      <CaseStudyPresentation
        frontmatter={frontmatter}
        sections={sectionNodes}
        sectionHeadings={sectionHeadings}
        slug={slug}
      />
    );
  }

  return (
    <Suspense>
      <WorkPageClient
        sorted={sorted}
        caseStudyContent={caseStudyContent}
      />
    </Suspense>
  );
}
