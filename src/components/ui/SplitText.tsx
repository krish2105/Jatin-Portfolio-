"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Mask reveal, split by word. The wrapper keeps the whole string as its
 * accessible name and every animated span is hidden from assistive tech, so
 * screen readers get one clean sentence rather than a pile of fragments.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span className={cn("inline", className)} aria-label={text} role="text">
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            aria-hidden
            className="inline-block"
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once, margin: "-8% 0px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + index * stagger,
            }}
          >
            {word}
            {index < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
