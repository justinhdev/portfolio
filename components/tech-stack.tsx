"use client";

import { useState } from "react";

const tagClassName =
  "rounded-sm border border-border bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground";

type TechStackProps = {
  items: readonly string[];
  initialVisibleCount?: number;
};

export function TechStack({ items, initialVisibleCount = 8 }: TechStackProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasHiddenItems = items.length > initialVisibleCount;
  const visibleItems = isExpanded ? items : items.slice(0, initialVisibleCount);
  const hiddenCount = items.length - visibleItems.length;

  return (
    <div className="mt-4">
      <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
        {visibleItems.map((item) => (
          <li key={item} className={tagClassName}>
            {item}
          </li>
        ))}
      </ul>

      {hasHiddenItems ? (
        <button
          type="button"
          aria-expanded={isExpanded}
          className="mt-3 rounded-sm text-sm font-medium text-primary underline-offset-4 transition-colors hover:text-primary/85 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
        >
          {isExpanded ? "Show fewer" : `Show ${hiddenCount} more`}
        </button>
      ) : null}
    </div>
  );
}
