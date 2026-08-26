"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/* The theme lives on <html data-theme>, written before first paint by the
   inline no-flash script. That makes it external state, so it is read through
   useSyncExternalStore rather than mirrored into React state in an effect. */

const readTheme = (): Theme =>
  (document.documentElement.getAttribute("data-theme") as Theme | null) ??
  "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as const);

  const apply = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* private mode — the theme still applies for this session */
    }
  }, []);

  /**
   * Expands a circular wipe from the triggering element via the View
   * Transitions API. Falls back to an instant swap where unsupported, and
   * always swaps instantly under reduced motion.
   */
  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = readTheme() === "dark" ? "light" : "dark";

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      type DocWithVT = Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      };
      const doc = document as DocWithVT;

      if (reduced || typeof doc.startViewTransition !== "function") {
        apply(next);
        return;
      }

      const x = origin?.x ?? window.innerWidth - 48;
      const y = origin?.y ?? 48;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      const transition = doc.startViewTransition(() => apply(next));

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 620,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {
          /* transition aborted — the theme has already been applied */
        });
    },
    [apply],
  );

  return { theme, toggle };
}
