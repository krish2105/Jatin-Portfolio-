"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INTERVAL_MS = 2600;

/**
 * Cycles the hero's role words. The transition is a mask reveal — the old
 * word rides up out of a clipped box while the next rides in beneath it —
 * rather than a crossfade, which reads far softer than this page wants.
 *
 * The box is sized by rendering the longest item invisibly in normal flow.
 * The previous version reserved a width in `ch`, which is the advance of "0"
 * and not the advance of a letter even in a monospaced face — the box came
 * out exactly as wide as the text with zero margin, and "ERP implementations"
 * clipped. Measuring the real string in the real font cannot drift.
 *
 * The full list is exposed to assistive technology once, statically, so a
 * screen reader is not told the same line three times as it cycles.
 */
export function RotatingLine({ items }: { items: readonly string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  const longest = useMemo(
    () => items.reduce((a, b) => (b.length > a.length ? b : a), items[0] ?? ""),
    [items],
  );

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % items.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce, items.length]);

  return (
    <p className="u-mono flex items-baseline gap-2 text-sm">
      <span aria-hidden className="text-muted">
        [
      </span>

      <span className="sr-only">{items.join(", ")}</span>

      {reduce ? (
        <span className="text-accent-ink">{items[0]}</span>
      ) : (
        <span aria-hidden className="relative inline-block overflow-hidden py-[0.12em]">
          {/* Sizer — establishes the box in the real font, never painted. */}
          <span className="invisible block whitespace-nowrap">{longest}</span>

          {/* No `mode="wait"`. With it, the outgoing word finished leaving
              before the incoming one started, so the brackets sat visibly
              empty for the length of the transition on every cycle. Letting
              them overlap is also what a mask reveal actually is: one word
              rides up as the next rides in. Both are absolutely positioned,
              so they occupy the same slot. */}
          <AnimatePresence initial={false}>
            <motion.span
              key={items[index]}
              className="absolute inset-0 flex items-center whitespace-nowrap text-accent-ink"
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
