import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getCaseStudy, getAllCaseSlugs, parseCaseStudySections } from "@/lib/mdx";
import { storyMdxComponents } from "@/components/case-study/slideMdxComponents";
import { CaseStudyPresentation } from "@/components/case-study/CaseStudyPresentation";

export async function generateStaticParams() {
  return getAllCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return { title: "Not found" };
  return {
    title: cs.frontmatter.title,
    description: cs.frontmatter.outcome,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs || slug !== "cracking-the-code-of-offers") notFound();

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

  return (
    <CaseStudyPresentation
      frontmatter={frontmatter}
      sections={sectionNodes}
      sectionHeadings={sectionHeadings}
      slug={slug}
    />
  );
}
