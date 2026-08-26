"use client";

import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { contact, hero, profile, siteMeta } from "@/data/portfolio";
import { HeroLattice } from "@/components/three/HeroLattice";
import { PrimaryCta } from "@/components/ui/PrimaryCta";
import { RotatingLine } from "@/components/ui/RotatingLine";
import { PRELOADER_MS } from "@/components/ui/Preloader";

const EASE = [0.16, 1, 0.3, 1] as const;
/* The entrance is choreographed to begin as the preloader lifts, so the two
   read as one continuous move rather than two separate events. */
const START = PRELOADER_MS / 1000 + 0.1;

export function Hero() {
  const reduce = useReducedMotion();

  // Every animated value here is transform or opacity only.
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ease: EASE, delay: START + delay },
        };

  const maskLine = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "108%" },
          animate: { y: "0%" },
          transition: { duration: 0.95, ease: EASE, delay: START + delay },
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden pb-20 pt-24 md:pb-24 md:pt-28"
    >
      {/* The signature element. R3F point cloud where the device can carry
          it, the SVG lattice everywhere else. */}
      <HeroLattice className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(165vw,1150px)] -translate-x-1/2 -translate-y-1/2 opacity-80 md:w-[min(105vw,1250px)] md:-translate-x-[34%] md:-translate-y-[52%]" />

      <div className="mx-auto w-full max-w-[1440px] px-gutter">
        <motion.p
          {...rise(0)}
          className="u-mono text-2xs uppercase tracking-[0.28em] text-muted"
        >
          {hero.eyebrow}
        </motion.p>

        <h1
          id="hero-name"
          className="mt-6 font-display uppercase leading-[0.84]"
          style={{
            fontSize: "var(--text-display)",
            fontVariationSettings: '"wght" 700, "wdth" 82, "opsz" 96',
          }}
        >
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span {...maskLine(0.08)} className="block">
              Jatin
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span {...maskLine(0.16)} className="block">
              Acharya
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={reduce ? undefined : { scaleX: 0 }}
          animate={reduce ? undefined : { scaleX: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: START + 0.32 }}
          style={{ transformOrigin: "left" }}
          className="mt-8 h-px w-full bg-edge md:mt-10"
        />

        <div className="grid gap-10 pt-8 lg:grid-cols-12 lg:gap-12">
          <div className="self-start lg:col-span-7 xl:col-span-6">
            <motion.div {...rise(0.42)}>
              <RotatingLine items={hero.rotating} />
            </motion.div>

            <motion.p
              {...rise(0.5)}
              className="mt-5 max-w-[52ch] text-lg leading-relaxed text-text"
            >
              {hero.sub}
            </motion.p>

            <motion.div
              {...rise(0.6)}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <PrimaryCta href="#builds">{hero.ctaPrimary}</PrimaryCta>
              <a
                href={contact.resume}
                download
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-card border border-edge px-6 text-sm text-text transition-colors hover:border-accent hover:text-accent-ink"
              >
                {hero.ctaSecondary}
                <Download aria-hidden size={16} strokeWidth={1.6} />
              </a>
            </motion.div>
          </div>

          <motion.figure
            {...rise(0.52)}
            className="self-end lg:col-span-4 lg:col-start-9 lg:justify-self-end"
          >
            <div className="w-fit border border-edge bg-surface p-2">
              <Image
                src="/portrait.webp"
                alt={siteMeta.portraitAlt}
                width={928}
                height={1152}
                priority
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 44vw, 340px"
                className="h-auto w-[220px] sm:w-[250px] lg:w-[290px]"
              />
            </div>
            <figcaption className="u-mono mt-3 text-2xs uppercase tracking-[0.24em] text-muted">
              {profile.location}
            </figcaption>
          </motion.figure>
        </div>
      </div>

      <motion.a
        {...rise(0.9)}
        href="#stacks"
        className="absolute inset-x-0 bottom-6 mx-auto flex min-h-[44px] w-fit items-center gap-3 text-muted transition-colors hover:text-accent-ink"
      >
        <ArrowDown aria-hidden size={14} strokeWidth={1.6} />
        <span className="u-mono text-2xs uppercase tracking-[0.28em]">
          Scroll
        </span>
      </motion.a>
    </section>
  );
}
