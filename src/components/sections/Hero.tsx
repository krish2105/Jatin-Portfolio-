import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";

import { contact, hero, profile, siteMeta } from "@/data/portfolio";
import { StaticLattice } from "@/components/three/StaticLattice";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden pb-20 pt-24 md:pb-24 md:pt-28"
    >
      {/* The signature element. Phase 3 replaces this with the R3F point cloud
          on capable devices; this SVG remains the fallback. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(165vw,1150px)] -translate-x-1/2 -translate-y-1/2 opacity-80 md:w-[min(105vw,1250px)] md:-translate-x-[58%] md:-translate-y-[52%]"
      >
        <StaticLattice />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-gutter">
        <p className="u-mono text-2xs uppercase tracking-[0.28em] text-muted">
          {hero.eyebrow}
        </p>

        <h1
          id="hero-name"
          className="mt-6 font-display uppercase leading-[0.84]"
          style={{
            fontSize: "var(--text-display)",
            fontVariationSettings: '"wght" 700, "wdth" 82, "opsz" 96',
          }}
        >
          <span className="block">Jatin</span>
          <span className="block">Acharya</span>
        </h1>

        <div className="mt-8 grid gap-10 border-t border-edge pt-8 md:mt-10 lg:grid-cols-12 lg:gap-12">
          <div className="self-start lg:col-span-7 xl:col-span-6">
            {/* Phase 4 cycles this with a mask reveal. */}
            <p className="u-mono text-sm text-accent-ink">
              <span aria-hidden className="text-muted">
                [{" "}
              </span>
              {hero.rotating[0]}
              <span aria-hidden className="text-muted">
                {" "}]
              </span>
            </p>

            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-text">
              {hero.sub}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#builds"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-card bg-accent-solid px-6 text-sm font-medium text-accent-on transition-opacity hover:opacity-90"
              >
                {hero.ctaPrimary}
                <ArrowUpRight aria-hidden size={16} strokeWidth={2} />
              </a>
              <a
                href={contact.resume}
                download
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-card border border-edge px-6 text-sm text-text transition-colors hover:border-accent hover:text-accent-ink"
              >
                {hero.ctaSecondary}
                <Download aria-hidden size={16} strokeWidth={1.6} />
              </a>
            </div>
          </div>

          <figure className="self-end lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <div className="border border-edge bg-surface p-2">
              <Image
                src="/portrait.webp"
                alt={siteMeta.portraitAlt}
                width={928}
                height={1152}
                priority
                sizes="(max-width: 640px) 68vw, (max-width: 1024px) 44vw, 340px"
                className="h-auto w-full max-w-[240px] sm:max-w-[260px] lg:max-w-[300px]"
              />
            </div>
            <figcaption className="u-mono mt-3 text-2xs uppercase tracking-[0.24em] text-muted">
              {profile.location}
            </figcaption>
          </figure>
        </div>
      </div>

      <a
        href="#stacks"
        className="absolute inset-x-0 bottom-6 mx-auto flex min-h-[44px] w-fit items-center gap-3 text-muted transition-colors hover:text-accent-ink"
      >
        <ArrowDown aria-hidden size={14} strokeWidth={1.6} />
        <span className="u-mono text-2xs uppercase tracking-[0.28em]">
          Scroll
        </span>
      </a>
    </section>
  );
}
