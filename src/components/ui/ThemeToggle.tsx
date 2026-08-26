"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

/**
 * Circular-wipe theme toggle. The wipe expands from the button itself via the
 * View Transitions API; where that is unsupported the swap is instant.
 *
 * Icon visibility is driven by CSS off `<html data-theme>`, not React state,
 * so the correct glyph is painted on the very first frame.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggle({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-edge",
        "text-muted transition-colors duration-200",
        "hover:border-accent hover:text-accent",
        className,
      )}
    >
      <span className="relative block h-[18px] w-[18px]">
        <Sun
          aria-hidden
          strokeWidth={1.5}
          className="absolute inset-0 hidden h-[18px] w-[18px] theme-dark:block"
        />
        <Moon
          aria-hidden
          strokeWidth={1.5}
          className="absolute inset-0 hidden h-[18px] w-[18px] theme-light:block"
        />
      </span>
    </button>
  );
}
