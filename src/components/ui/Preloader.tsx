"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { profile } from "@/data/portfolio";

/** Total time on screen, including the lift. The brief caps this at 1.4s. */
export const PRELOADER_MS = 1400;
const DRAW_MS = 1050;

/**
 * The name draws itself in stroke, with a mono percentage counting up in the
 * corner. Skipped entirely under reduced motion — there is no "reduced"
 * version of a splash screen worth keeping.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const progress = useMotionValue(0);
  const percent = useTransform(progress, (value) =>
    String(Math.round(value)).padStart(3, "0"),
  );

  useEffect(() => {
    // Under reduced motion the component renders null regardless, so there is
    // nothing to schedule and no state to settle.
    if (reduce) return;

    const controls = animate(progress, 100, {
      duration: DRAW_MS / 1000,
      ease: [0.16, 1, 0.3, 1],
    });
    const timer = window.setTimeout(() => setDone(true), PRELOADER_MS);

    // Nothing behind the overlay should scroll while it is up.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      controls.stop();
      window.clearTimeout(timer);
      document.body.style.overflow = previous;
    };
  }, [reduce, progress]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] grid place-items-center bg-ground px-gutter"
          exit={{ y: "-101%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <svg
            viewBox="0 0 900 130"
            className="w-full max-w-[min(88vw,900px)]"
            role="img"
            aria-label={profile.name}
          >
            <text
              x="450"
              y="95"
              textAnchor="middle"
              className="preloader-name"
              fill="none"
              stroke="var(--text)"
              strokeWidth={1.1}
            >
              {profile.name.toUpperCase()}
            </text>
          </svg>

          <motion.p className="u-mono absolute bottom-8 right-gutter text-2xs tracking-[0.2em] text-muted">
            <motion.span>{percent}</motion.span>
            <span> %</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
