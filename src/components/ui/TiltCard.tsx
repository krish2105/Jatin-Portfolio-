"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const MAX_TILT = 6;

/**
 * CSS 3D tilt — no engine involved. Disabled on touch and under reduced
 * motion, where it degrades to a plain container with no wrapper transform.
 */
export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery("(pointer: fine)");
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const spring = { stiffness: 200, damping: 22, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(my, [0, 1], [MAX_TILT, -MAX_TILT]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(mx, [0, 1], [-MAX_TILT, MAX_TILT]),
    spring,
  );

  const enabled = !reduce && finePointer;

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={(event) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((event.clientX - rect.left) / rect.width);
        my.set((event.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("[transform-style:preserve-3d]", className)}
    >
      {children}
    </motion.div>
  );
}
