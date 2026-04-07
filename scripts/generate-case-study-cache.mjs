/**
 * Pre-builds case study content into a static TS module
 * so API routes don't need fs at runtime.
 *
 * Run: node scripts/generate-case-study-cache.mjs
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content/case-studies");
const outFile = path.join(process.cwd(), "lib/case-study-cache.ts");

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

const summaries = [];
const full = {};

for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), "utf-8");
  const { data, content } = matter(raw);
  const slug = f.replace(/\.mdx$/, "");
  const truncated = content.split(/\s+/).slice(0, 500).join(" ");

  summaries.push(
    `## ${data.title}\n**Company:** ${data.company} | **Year:** ${data.year} | **Role:** ${data.role}\n**Tags:** ${data.tags?.join(", ")}\n**Outcome:** ${data.outcome}\n\n${truncated}`
  );

  full[slug] = {
    title: data.title,
    company: data.company,
    year: data.year,
    role: data.role,
    duration: data.duration,
    tags: data.tags || [],
    outcome: data.outcome,
    content,
  };
}

const output = `// AUTO-GENERATED — do not edit. Run: node scripts/generate-case-study-cache.mjs

export const caseStudySummaries = ${JSON.stringify(summaries.join("\n\n---\n\n"))};

export const caseStudyFull: Record<string, {
  title: string;
  company: string;
  year: string;
  role: string;
  duration: string;
  tags: string[];
  outcome: string;
  content: string;
}> = ${JSON.stringify(full, null, 2)};
`;

fs.writeFileSync(outFile, output, "utf-8");
console.log(`✓ Generated ${outFile} with ${files.length} case studies`);
