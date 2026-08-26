"use client";

import { ArrowUpRight } from "lucide-react";
import { setPinching } from "@/lib/heroSignals";

/**
 * The hero's primary CTA. Hovering or focusing it morphs the lattice into a
 * pinch gesture — a callback to the Virtual Mouse project. Focus is included
 * deliberately so keyboard users get the same moment.
 */
export function PrimaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onMouseEnter={() => setPinching(true)}
      onMouseLeave={() => setPinching(false)}
      onFocus={() => setPinching(true)}
      onBlur={() => setPinching(false)}
      className="inline-flex min-h-[48px] items-center gap-2.5 rounded-card bg-accent-solid px-6 text-sm font-medium text-accent-on transition-opacity hover:opacity-90"
    >
      {children}
      <ArrowUpRight aria-hidden size={16} strokeWidth={2} />
    </a>
  );
}
