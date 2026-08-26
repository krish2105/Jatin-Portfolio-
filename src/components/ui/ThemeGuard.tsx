"use client";

import { useEffect } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/**
 * Re-asserts the theme attribute after hydration.
 *
 * The pre-paint inline script sets `data-theme` before React exists. If React
 * ever rebuilds the document — a hydration mismatch anywhere in the tree is
 * enough — that attribute goes with it, and the page silently falls back to
 * the default theme with a blank toggle. This costs one attribute write and
 * makes that failure impossible.
 */
export function ThemeGuard() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-theme")) return;

    let theme: Theme = "dark";
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        theme = stored;
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        theme = "light";
      }
    } catch {
      /* private mode — dark is the default anyway */
    }
    root.setAttribute("data-theme", theme);
  }, []);

  return null;
}
