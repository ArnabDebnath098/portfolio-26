import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { LabHero } from "@/components/lab/LabHero";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { explorations } from "@/data/explorations";
import { MasonryGrid } from "@/components/lab/MasonryGrid";
import { MotionWithCode } from "@/components/lab/MotionWithCode";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments, prototypes, and AI workflow explorations.",
};

/**
 * Lab — the home/about editorial voice applied to a workbench: indexed sections
 * (01 Lab · 02 Motion · 03 UI Explorations), display-serif headlines, masked
 * reveals, and sharp-edged captioned cards. No rounded corners anywhere.
 */
export default function LabPage() {
  const hasImages = explorations.map((exp) =>
    fs.existsSync(path.join(process.cwd(), "public", exp.image))
  );

  return (
    <div data-id="lab-page" className="min-h-screen pt-28">
      <div data-id="lab-container" className="mx-auto flex max-w-[1104px] flex-col gap-24 px-6 sm:gap-32">
        <LabHero count={explorations.length} />

        <MotionWithCode />

        {/* UI Explorations — sharp masonry */}
        <section data-id="lab-explorations-section" className="flex flex-col gap-10">
          <SectionHeader
            id="lab-explorations"
            index="03"
            eyebrow="UI Explorations"
            title="Shots from the cutting room."
            subtitle="Loose interface studies — payments, fintech, and product surfaces explored outside the brief."
          />
          <MasonryGrid items={explorations} hasImages={hasImages} />
        </section>
      </div>
    </div>
  );
}
