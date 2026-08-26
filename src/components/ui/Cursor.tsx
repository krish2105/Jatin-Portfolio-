"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * A small ring that trails the pointer and opens up over anything
 * interactive. Fine pointers only — it is never rendered on touch, and the
 * native cursor is never hidden, so nothing is lost if this fails.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.4 });

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!finePointer || reduce) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);

      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button, [role='button'], summary")));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [finePointer, reduce, visible, x, y]);

  if (!finePointer || reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: active ? 1.9 : 1,
      }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed left-0 top-0 z-[200] -ml-3 -mt-3 h-6 w-6 rounded-full border border-accent"
    />
  );
}
