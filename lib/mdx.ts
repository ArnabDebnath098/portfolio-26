import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/case-studies");

export type CaseStudyFrontmatter = {
  title: string;
  subtitle: string;
  company: string;
  year: string;
  tags: string[];
  thumbnail: string;
  outcome: string;
  role: string;
  duration: string;
  featured?: boolean;
  order?: number;
};

export type CaseStudy = {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
  content: string;
};

export function getAllCaseSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as CaseStudyFrontmatter,
    content,
  };
}

export type SlideData = {
  index: number;
  content: string;
  heading: string | null;
};

const MAX_SLIDE_WORDS = 180;

export function parseCaseStudySlides(content: string): SlideData[] {
  // 1. Split on --- delimiters (major sections)
  const sections = content
    .split(/\n---\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const slides: SlideData[] = [];

  for (const section of sections) {
    const wordCount = section.split(/\s+/).length;

    // If section is short enough, keep as one slide
    if (wordCount <= MAX_SLIDE_WORDS) {
      const match = section.match(/^##\s+(.+)$/m);
      slides.push({
        index: slides.length,
        content: section,
        heading: match ? match[1] : null,
      });
      continue;
    }

    // Split long sections on ### boundaries
    const h3Parts = section.split(/\n(?=###\s)/);

    if (h3Parts.length <= 1) {
      // No ### headings — split by paragraphs into chunks
      const match = section.match(/^##\s+(.+)$/m);
      const heading = match ? match[1] : null;
      const paragraphs = section.split(/\n\n/).filter(Boolean);
      let currentChunk: string[] = [];
      let currentWords = 0;

      for (const para of paragraphs) {
        const paraWords = para.split(/\s+/).length;
        if (currentWords + paraWords > MAX_SLIDE_WORDS && currentChunk.length > 0) {
          slides.push({
            index: slides.length,
            content: currentChunk.join("\n\n"),
            heading,
          });
          currentChunk = [para];
          currentWords = paraWords;
        } else {
          currentChunk.push(para);
          currentWords += paraWords;
        }
      }
      if (currentChunk.length > 0) {
        slides.push({
          index: slides.length,
          content: currentChunk.join("\n\n"),
          heading: slides.length > 0 && slides[slides.length - 1].heading === heading
            ? heading ? `${heading} (cont.)` : null
            : heading,
        });
      }
      continue;
    }

    // Has ### headings — first chunk is the ## intro, rest are ### sections
    const intro = h3Parts[0].trim();
    const introMatch = intro.match(/^##\s+(.+)$/m);
    const sectionHeading = introMatch ? introMatch[1] : null;

    if (intro) {
      slides.push({
        index: slides.length,
        content: intro,
        heading: sectionHeading,
      });
    }

    // Group ### subsections into slides, respecting word limit
    let currentChunk: string[] = [];
    let currentWords = 0;

    for (let i = 1; i < h3Parts.length; i++) {
      const part = h3Parts[i].trim();
      const partWords = part.split(/\s+/).length;

      if (currentWords + partWords > MAX_SLIDE_WORDS && currentChunk.length > 0) {
        slides.push({
          index: slides.length,
          content: currentChunk.join("\n\n"),
          heading: sectionHeading,
        });
        currentChunk = [part];
        currentWords = partWords;
      } else {
        currentChunk.push(part);
        currentWords += partWords;
      }
    }
    if (currentChunk.length > 0) {
      slides.push({
        index: slides.length,
        content: currentChunk.join("\n\n"),
        heading: sectionHeading,
      });
    }
  }

  // Re-index
  return slides.map((s, i) => ({ ...s, index: i }));
}

export type SectionData = {
  index: number;
  content: string;
  heading: string | null;
};

/**
 * Parse MDX content into full sections (split on `---`).
 * Each section keeps all its content intact — no word-limit chunking.
 * Used by the vertical scroll story layout.
 */
export function parseCaseStudySections(content: string): SectionData[] {
  const rawSections = content
    .split(/\n---\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return rawSections.map((section, i) => {
    const match = section.match(/^##\s+(.+)$/m);
    return {
      index: i,
      content: section,
      heading: match ? match[1] : null,
    };
  });
}

export function getAllCaseStudies(): CaseStudy[] {
  return getAllCaseSlugs()
    .map((slug) => getCaseStudy(slug))
    .filter((cs): cs is CaseStudy => cs !== null)
    .sort((a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99));
}
