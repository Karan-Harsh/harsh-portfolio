"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Carousel({
  children,
  itemWidthClass = "min-w-[22rem]",
}: {
  children: React.ReactNode[] | React.ReactNode;
  itemWidthClass?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-2"
      >
        {Array.isArray(children)
          ? children.map((child, idx) => (
              <div key={idx} className={`snap-start ${itemWidthClass}`}>{child}</div>
            ))
          : (
            <div className={`snap-start ${itemWidthClass}`}>{children}</div>
          )}
      </div>
      {/* Edge gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
      {/* Controls */}
      <div className="absolute -top-12 right-0 flex items-center gap-2">
        <Button variant="outline" size="icon" aria-label="Previous" onClick={() => scrollBy(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" aria-label="Next" onClick={() => scrollBy(1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
