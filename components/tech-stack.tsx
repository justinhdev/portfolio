"use client";

import { useEffect, useRef, useState } from "react";

const tagClassName =
  "rounded-sm border border-border bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground";

const moreClassName =
  "shrink-0 rounded-sm border border-primary/25 bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-opacity group-hover:opacity-0 group-focus-within:opacity-0";

type TechStackProps = {
  items: readonly string[];
};

export function TechStack({ items }: TechStackProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure) {
      return;
    }

    const calculateVisibleCount = () => {
      const availableWidth = container.clientWidth;
      const measuredItems = Array.from(
        measure.querySelectorAll<HTMLElement>("[data-stack-item]"),
      );
      const measuredMore = measure.querySelector<HTMLElement>("[data-more]");
      const gap = 8;

      if (!availableWidth || measuredItems.length === 0 || !measuredMore) {
        return;
      }

      let nextVisibleCount = items.length;

      for (let count = items.length; count >= 0; count -= 1) {
        const hiddenCount = items.length - count;
        measuredMore.textContent = `+${hiddenCount} more`;

        const moreWidth = hiddenCount > 0 ? measuredMore.offsetWidth + gap : 0;
        const itemWidth = measuredItems
          .slice(0, count)
          .reduce((total, item, index) => {
            return total + item.offsetWidth + (index > 0 ? gap : 0);
          }, 0);

        if (itemWidth + moreWidth <= availableWidth) {
          nextVisibleCount = count;
          break;
        }
      }

      setVisibleCount(nextVisibleCount);
    };

    calculateVisibleCount();

    const resizeObserver = new ResizeObserver(calculateVisibleCount);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [items]);

  const visibleItems = items.slice(0, visibleCount);
  const hiddenItems = items.slice(visibleCount);

  return (
    <span className="relative mt-4 block">
      <span ref={containerRef} className="flex w-full items-start gap-2">
        <span className="flex min-w-0 flex-1 flex-wrap gap-2 overflow-hidden">
          {visibleItems.map((item) => (
            <span key={item} className={tagClassName}>
              {item}
            </span>
          ))}
        </span>
        {hiddenItems.length > 0 ? (
          <span className={moreClassName}>+{hiddenItems.length} more</span>
        ) : null}
      </span>

      {hiddenItems.length > 0 ? (
        <span className="grid max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity,margin-top] duration-300 group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100 group-focus-within:mt-3 group-focus-within:max-h-40 group-focus-within:opacity-100">
          <span className="flex flex-wrap gap-2">
            {hiddenItems.map((item) => (
              <span key={item} className={tagClassName}>
                {item}
              </span>
            ))}
          </span>
        </span>
      ) : null}

      <span
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 flex h-0 gap-2 overflow-hidden whitespace-nowrap"
      >
        {items.map((item) => (
          <span key={item} data-stack-item className={tagClassName}>
            {item}
          </span>
        ))}
        <span data-more className={moreClassName}>
          +{items.length} more
        </span>
      </span>
    </span>
  );
}
