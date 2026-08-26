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
   * Sweeps a circle of the incoming background colour out from the toggle,
   * swaps the theme underneath once it covers the viewport, then drops the
   * overlay.
   *
   * This deliberately does NOT use the View Transitions API. That snapshots
   * the whole viewport twice to animate what is only ever a colour change,
   * and this page has a multi-megapixel WebGL canvas in it — on a large
   * display that is a great deal of GPU memory moved for one toggle. One
   * composited div does the same job for almost nothing.
   *
   * Swaps instantly under reduced motion, and if anything throws the theme
   * still applies — the animation is never allowed to be load-bearing.
   */
  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = readTheme() === "dark" ? "light" : "dark";

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || typeof document.body.animate !== "function") {
        apply(next);
        return;
      }

      const x = origin?.x ?? window.innerWidth - 48;
      const y = origin?.y ?? 48;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      // The incoming ground colour, read from the stylesheet rather than
      // hard-coded, so the wipe can never drift from the palette.
      const probe = document.createElement("div");
      probe.setAttribute("data-theme", next);
      probe.style.cssText = "position:fixed;visibility:hidden";
      document.body.appendChild(probe);
      const incoming =
        getComputedStyle(probe).getPropertyValue("--ground").trim() || "#070a0f";
      probe.remove();

      const overlay = document.createElement("div");
      overlay.className = "theme-wipe";
      overlay.style.background = incoming;
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      document.body.appendChild(overlay);

      const animation = overlay.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
      );

      const finish = () => {
        apply(next);
        overlay.remove();
      };
      animation.addEventListener("finish", finish, { once: true });
      animation.addEventListener("cancel", finish, { once: true });
      // Belt and braces: if the animation never fires (a backgrounded tab
      // throttles rAF), the theme must still change.
      window.setTimeout(() => {
        if (overlay.isConnected) finish();
      }, 900);
    },
    [apply],
  );

  return { theme, toggle };
}
