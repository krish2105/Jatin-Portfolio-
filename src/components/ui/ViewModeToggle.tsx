"use client";

import { useViewMode } from "@/hooks/useViewMode";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "recruiter", label: "Recruiter" },
  { value: "technical", label: "Technical" },
] as const;

/**
 * Two readers arrive at this page with different questions. Recruiters want
 * delivery and outcome; engineers want approach and stack. This reorders the
 * answer rather than hiding half of it — both readers see everything, just in
 * the order that serves them.
 */
export function ViewModeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useViewMode();

  return (
    <div
      role="group"
      aria-label="Reading mode"
      className={cn(
        "inline-flex items-center rounded-pill border border-edge p-0.5",
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const isActive = mode === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setMode(option.value)}
            aria-pressed={isActive}
            className={cn(
              "u-mono flex min-h-[44px] items-center rounded-pill px-4 text-2xs uppercase tracking-[0.16em] transition-colors",
              isActive
                ? "bg-accent-solid text-accent-on"
                : "text-muted hover:text-text",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
