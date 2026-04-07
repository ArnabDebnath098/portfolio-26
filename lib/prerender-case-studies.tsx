import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getCaseStudy, parseCaseStudySections } from "@/lib/mdx";
import { storyMdxComponents } from "@/components/case-study/slideMdxComponents";
import { CaseStudyPresentation } from "@/components/case-study/CaseStudyPresentation";

/** Slugs that have full case study content available */
export const MODAL_SLUGS = ["cracking-the-code-of-offers", "streamlining-checkout", "mandates"];

/** Pre-render case study MDX content on the server */
export async function prerenderCaseStudies(): Promise<Record<string, React.ReactNode>> {
  const content: Record<string, React.ReactNode> = {};

  for (const slug of MODAL_SLUGS) {
    const cs = getCaseStudy(slug);
    if (!cs) continue;

    const { frontmatter, content: rawContent } = cs;
    const sectionDataArray = parseCaseStudySections(rawContent);

    const sectionNodes = sectionDataArray.map((section, i) => (
      <MDXRemote
        key={i}
        source={section.content}
        components={storyMdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    ));

    const sectionHeadings = sectionDataArray.map((s) => s.heading);

    content[slug] = (
      <CaseStudyPresentation
        frontmatter={frontmatter}
        sections={sectionNodes}
        sectionHeadings={sectionHeadings}
        slug={slug}
      />
    );
  }

  return content;
}
