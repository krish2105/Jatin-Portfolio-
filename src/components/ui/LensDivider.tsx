"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const HEIGHT = 1000;
/** How far the line can bow toward the cursor, in viewBox units. */
const MAX_BEND = 26;
/** Beyond this many pixels the cursor stops pulling. */
const REACH = 320;

/**
 * The hairline between SYSTEMS and MODELS, bent toward the cursor like a lens.
 *
 * It is an SVG path rather than a border so the bend never touches layout —
 * only the `d` attribute changes. On touch it stays perfectly straight: a lens
 * that follows a pointer means nothing without one, and faking it would be
 * worse than leaving it out.
 */
export function LensDivider({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const container = useRef<SVGSVGElement>(null);

  const bend = useMotionValue(0);
  const focus = useMotionValue(HEIGHT / 2);

  const springBend = useSpring(bend, { stiffness: 180, damping: 26, mass: 0.6 });
  const springFocus = useSpring(focus, { stiffness: 140, damping: 24 });

  // Two quadratic curves meeting at the cursor's height: the line leaves
  // straight at both ends and bows out where the pointer is.
  const path = useMotionTemplate`M 40 0 Q 40 ${springFocus} ${springBend} ${springFocus} Q 40 ${springFocus} 40 ${HEIGHT}`;

  useEffect(() => {
    if (reduce || !finePointer) return;

    const onMove = (event: MouseEvent) => {
      const element = container.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (rect.height === 0) return;

      const centreX = rect.left + rect.width / 2;
      const dx = event.clientX - centreX;
      const withinY =
        event.clientY > rect.top - 80 && event.clientY < rect.bottom + 80;

      if (!withinY || Math.abs(dx) > REACH) {
        bend.set(40);
        return;
      }

      const strength = 1 - Math.abs(dx) / REACH;
      // Bow toward the cursor, never away from it.
      bend.set(40 + Math.sign(dx) * MAX_BEND * strength * strength);
      focus.set(((event.clientY - rect.top) / rect.height) * HEIGHT);
    };

    const onLeave = () => bend.set(40);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, finePointer, bend, focus]);

  return (
    <svg
      ref={container}
      aria-hidden
      viewBox={`0 0 80 ${HEIGHT}`}
      preserveAspectRatio="none"
      className={cn("h-full w-20 overflow-visible", className)}
    >
      <motion.path
        d={reduce || !finePointer ? `M 40 0 L 40 ${HEIGHT}` : path}
        fill="none"
        stroke="var(--edge)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
