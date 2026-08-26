"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Phase 2 renders this as a plain anchor with the right hit area and states.
 * Phase 4 adds the cursor attraction, gated on a fine pointer.
 */
export const MagneticButton = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { className?: string }
>(function MagneticButton({ className, children, ...props }, ref) {
  return (
    <a
      ref={ref}
      {...props}
      className={cn(
        "group relative inline-flex min-h-[56px] items-center justify-center gap-3",
        "rounded-card bg-accent-solid px-8 text-base font-medium text-accent-on",
        "transition-opacity hover:opacity-90",
        className,
      )}
    >
      {children}
    </a>
  );
});
