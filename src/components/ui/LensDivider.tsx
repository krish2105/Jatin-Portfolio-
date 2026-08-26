"use client";

import { cn } from "@/lib/utils";

/**
 * The hairline between SYSTEMS and MODELS. Drawn as an SVG path rather than a
 * border so Phase 4 can bend it toward the cursor like a lens without
 * touching layout. Static and perfectly straight until then.
 */
export function LensDivider({
  className,
  path = "M 1 0 L 1 1000",
}: {
  className?: string;
  path?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 2 1000"
      preserveAspectRatio="none"
      className={cn("h-full w-[2px]", className)}
    >
      <path
        d={path}
        fill="none"
        stroke="var(--edge)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
