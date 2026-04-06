import { cn } from "@/lib/utils";
import { MandatesBento } from "@/components/case-study/MandatesBento";

export const storyMdxComponents = {
  MandatesBento,
  h2: () => null,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      data-id="story-mdx-h3"
      className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] mt-6 mb-1"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      data-id="story-mdx-p"
      className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-[1.85]"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul data-id="story-mdx-ul" className="flex flex-col gap-3 w-full" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      data-id="story-mdx-li"
      className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed list-disc list-outside"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      data-id="story-mdx-blockquote"
      className={cn(
        "border-l-[3px] border-[var(--color-accent)] pl-5 py-3 w-full",
        "text-sm sm:text-base italic text-[var(--color-text-secondary)]"
      )}
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div data-id="story-mdx-table-wrapper" className="w-full overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
      <table
        data-id="story-mdx-table"
        className="w-full text-sm border-collapse"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead data-id="story-mdx-thead" className="border-b border-[var(--color-border-default)] bg-[var(--color-bg-subtle)]" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody data-id="story-mdx-tbody" {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      data-id="story-mdx-tr"
      className="border-b border-[var(--color-border-default)] last:border-0"
      {...props}
    />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      data-id="story-mdx-th"
      className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      data-id="story-mdx-td"
      className="px-5 py-4 text-sm text-[var(--color-text-secondary)] leading-relaxed align-top"
      {...props}
    />
  ),
  // eslint-disable-next-line @next/next/no-img-element
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-id="story-mdx-img"
      className="w-full object-contain"
      loading="lazy"
      alt=""
      {...props}
    />
  ),
  hr: () => null,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong
      data-id="story-mdx-strong"
      className="font-semibold text-[var(--color-text-primary)]"
      {...props}
    />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em data-id="story-mdx-em" className="italic" {...props} />
  ),
};

/** @deprecated Use storyMdxComponents instead */
export const slideMdxComponents = storyMdxComponents;
