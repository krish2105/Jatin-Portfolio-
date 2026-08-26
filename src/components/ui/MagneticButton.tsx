"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/** How much of the cursor's offset the button follows. */
const PULL = 0.32;
/** The label trails slightly behind the button — the detail that sells it. */
const LABEL_PULL = 0.14;

/* Props are declared explicitly rather than spread from
   AnchorHTMLAttributes: React's DOM event handlers and Motion's collide on
   onAnimationStart, and widening the type to satisfy both would hide real
   mistakes. */
interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  download?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function MagneticButton({
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);

  const spring = { stiffness: 220, damping: 18, mass: 0.5 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const slx = useSpring(lx, spring);
  const sly = useSpring(ly, spring);

  const magnetic = !reduce && finePointer;

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(dx * PULL);
    y.set(dy * PULL);
    lx.set(dx * LABEL_PULL);
    ly.set(dy * LABEL_PULL);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    lx.set(0);
    ly.set(0);
  };

  return (
    <motion.a
      ref={ref}
      {...props}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={magnetic ? { x: sx, y: sy } : undefined}
      className={cn(
        "group relative inline-flex min-h-[56px] items-center justify-center gap-3",
        "rounded-card bg-accent-solid px-8 text-base font-medium text-accent-on",
        "transition-opacity hover:opacity-90",
        className,
      )}
    >
      <motion.span
        style={magnetic ? { x: slx, y: sly } : undefined}
        className="inline-flex items-center gap-3"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
