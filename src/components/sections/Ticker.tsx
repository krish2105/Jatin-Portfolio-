"use client";

import { motion, useReducedMotion } from "motion/react";
import { ticker } from "@/data/portfolio";

/**
 * Seamless marquee: the list is rendered twice and the track travels exactly
 * -50%, so the second copy lands where the first began. The duplicate is
 * hidden from assistive tech. Static under reduced motion.
 */
export function Ticker() {
  const reduce = useReducedMotion();

  return (
    <section
      id="ticker"
      aria-label="Tools and disciplines"
      className="relative border-t border-edge py-6 md:py-8"
    >
      <div className="mask-edges overflow-hidden">
        <motion.ul
          className="flex w-max items-center gap-10 whitespace-nowrap will-change-transform md:gap-14"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduce
              ? undefined
              : { duration: 42, ease: "linear", repeat: Infinity }
          }
        >
          {ticker.map((item) => (
            <TickerItem key={item} label={item} />
          ))}
          {ticker.map((item) => (
            <TickerItem key={`dup-${item}`} label={item} duplicate />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function TickerItem({
  label,
  duplicate = false,
}: {
  label: string;
  duplicate?: boolean;
}) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="u-mono flex items-center gap-10 text-xs uppercase tracking-[0.22em] text-muted md:gap-14"
    >
      {label}
      <span aria-hidden className="h-1 w-1 rounded-full bg-accent/50" />
    </li>
  );
}
