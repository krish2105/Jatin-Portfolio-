"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const INTERVAL_MS = 2600;

/**
 * Cycles the hero's role words. The transition is a mask reveal — the old
 * word rides up out of a clipped box while the next rides in beneath it —
 * rather than a crossfade, which reads as much softer than this page wants.
 *
 * The full list is exposed to assistive tech once, statically, so a screen
 * reader is not told the same line three times as it cycles.
 */
export function RotatingLine({ items }: { items: readonly string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % items.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, items.length]);

  return (
    <p className="u-mono flex items-center gap-2 text-sm">
      <span aria-hidden className="text-muted">
        [
      </span>

      <span className="sr-only">{items.join(", ")}</span>

      {reduce ? (
        <span className="text-accent-ink">{items[0]}</span>
      ) : (
        <span
          aria-hidden
          className="relative block h-[1.5em] overflow-hidden"
          style={{ minWidth: "17ch" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={items[index]}
              className="absolute inset-x-0 top-0 block whitespace-nowrap text-accent-ink"
              initial={{ y: "115%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-115%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {items[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      )}

      <span aria-hidden className="text-muted">
        ]
      </span>
    </p>
  );
}
