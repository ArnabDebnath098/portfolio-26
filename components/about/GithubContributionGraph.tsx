"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Contribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ApiResponse = {
  total: Record<string, number>;
  contributions: Contribution[];
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildWeeks(contributions: Contribution[]): Contribution[][] {
  if (contributions.length === 0) return [];
  const weeks: Contribution[][] = [];
  const first = new Date(contributions[0].date + "T00:00:00Z");
  const firstDow = first.getUTCDay();

  let currentWeek: Contribution[] = [];
  for (let i = 0; i < firstDow; i++) {
    currentWeek.push({ date: "", count: 0, level: 0 });
  }

  for (const c of contributions) {
    currentWeek.push(c);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: "", count: 0, level: 0 });
    }
    weeks.push(currentWeek);
  }
  return weeks;
}

function monthLabels(weeks: Contribution[][]): { label: string; colStart: number }[] {
  const labels: { label: string; colStart: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const firstReal = week.find((d) => d.date);
    if (!firstReal) return;
    const m = new Date(firstReal.date + "T00:00:00Z").getUTCMonth();
    if (m !== lastMonth) {
      labels.push({ label: MONTH_NAMES[m], colStart: i + 1 });
      lastMonth = m;
    }
  });
  return labels;
}

export function GithubContributionGraph({ username }: { username: string }) {
  const [data, setData] = useState<Contribution[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json() as Promise<ApiResponse>;
      })
      .then((json) => {
        if (!cancelled) setData(json.contributions);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  if (error) {
    return (
      <div
        data-id="github-graph-error"
        className="h-full w-full min-w-[380px] flex items-center justify-center text-xs text-[var(--color-text-muted)] px-6 py-10 rounded-lg border border-[var(--color-border-default)]"
      >
        Couldn&apos;t load contributions.
      </div>
    );
  }

  const weeks = data ? buildWeeks(data) : [];
  const labels = data ? monthLabels(weeks) : [];
  const weekCount = Math.max(weeks.length, 53);

  return (
    <div
      data-id="github-graph"
      className="w-full flex flex-col gap-2"
    >
      <div
        data-id="github-graph-grid-wrap"
        className="grid gap-x-2 gap-y-1 grid-cols-[auto_1fr]"
        aria-label={`GitHub contributions for ${username} over the last year`}
      >
        {/* Row 1: empty corner + month labels */}
        <div data-id="github-graph-corner" />
        <div
          data-id="github-graph-months"
          className="grid text-[9px] leading-none text-[var(--color-text-muted)] gap-[3px] grid-cols-[repeat(var(--gh-weeks),minmax(0,1fr))]"
          style={{ "--gh-weeks": weekCount } as React.CSSProperties}
        >
          {labels.map((l, idx) => (
            <span
              key={`${l.label}-${idx}`}
              data-id={`github-graph-month-${idx}`}
              className="col-span-1 whitespace-nowrap overflow-visible"
              style={{ gridColumnStart: l.colStart } as React.CSSProperties}
            >
              {l.label}
            </span>
          ))}
        </div>

        {/* Row 2: day-of-week labels + cells — both use grid-rows-7 with identical gap */}
        <div
          data-id="github-graph-dow"
          className="grid grid-rows-7 gap-[3px] text-[9px] leading-none text-[var(--color-text-muted)]"
        >
          <span data-id="github-graph-dow-0" className="flex items-center" />
          <span data-id="github-graph-dow-1" className="flex items-center">Mon</span>
          <span data-id="github-graph-dow-2" className="flex items-center" />
          <span data-id="github-graph-dow-3" className="flex items-center">Wed</span>
          <span data-id="github-graph-dow-4" className="flex items-center" />
          <span data-id="github-graph-dow-5" className="flex items-center">Fri</span>
          <span data-id="github-graph-dow-6" className="flex items-center" />
        </div>
        <div
          data-id="github-graph-cells"
          className="grid gap-[3px] grid-cols-[repeat(var(--gh-weeks),minmax(0,1fr))] min-w-0"
          style={{ "--gh-weeks": weekCount } as React.CSSProperties}
        >
          {(weeks.length > 0 ? weeks : Array.from({ length: 53 }, () => [])).map((week, wi) => (
            <div
              key={wi}
              data-id={`github-graph-week-${wi}`}
              className="grid grid-rows-7 gap-[3px]"
            >
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week[di];
                return (
                  <div
                    key={di}
                    data-id={`github-graph-cell-${wi}-${di}`}
                    title={day?.date ? `${day.count} contributions on ${day.date}` : ""}
                    className={cn(
                      "aspect-square w-full rounded-[2px]",
                      !day?.date && "bg-[var(--gh-lvl-0)] opacity-40",
                      day?.date && levelClass(day.level)
                    )}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div
        data-id="github-graph-legend"
        className="flex items-center justify-end gap-1.5 text-[9px] text-[var(--color-text-muted)]"
      >
        <span data-id="github-graph-legend-less">Less</span>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <span
            key={lvl}
            data-id={`github-graph-legend-${lvl}`}
            className={cn("w-2 h-2 rounded-[2px]", levelClass(lvl as 0 | 1 | 2 | 3 | 4))}
          />
        ))}
        <span data-id="github-graph-legend-more">More</span>
      </div>
    </div>
  );
}

function levelClass(level: 0 | 1 | 2 | 3 | 4): string {
  switch (level) {
    case 0:
      return "bg-[var(--gh-lvl-0)]";
    case 1:
      return "bg-[var(--gh-lvl-1)]";
    case 2:
      return "bg-[var(--gh-lvl-2)]";
    case 3:
      return "bg-[var(--gh-lvl-3)]";
    case 4:
      return "bg-[var(--gh-lvl-4)]";
  }
}
