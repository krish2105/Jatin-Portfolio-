import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";

import { contact, hero, profile, siteMeta } from "@/data/portfolio";
import { HeroLattice } from "@/components/three/HeroLattice";
import { PrimaryCta } from "@/components/ui/PrimaryCta";
import { RotatingLine } from "@/components/ui/RotatingLine";
import { PRELOADER_MS } from "@/components/ui/Preloader";

/* The entrance begins as the preloader lifts, so the two read as one move.
   Delays are inline because they are data, not style. */
const START = PRELOADER_MS / 1000 + 0.1;
const at = (offset: number) => ({ animationDelay: `${(START + offset).toFixed(2)}s` });

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="relative isolate flex min-h-dvh flex-col justify-center overflow-hidden pb-20 pt-24 md:pb-24 md:pt-28"
    >
      <div aria-hidden className="atmo atmo-hero" />
      <HeroLattice className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(165vw,1150px)] -translate-x-1/2 -translate-y-1/2 opacity-80 md:w-[min(105vw,1250px)] md:-translate-x-[34%] md:-translate-y-[52%]" />

      <div className="mx-auto w-full max-w-[1440px] px-gutter">
        <p
          style={at(0)}
          className="hero-rise u-mono text-2xs uppercase tracking-[0.28em] text-muted"
        >
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
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="hero-mask" style={at(0.08)}>
              Jatin
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="hero-mask" style={at(0.16)}>
              Acharya
            </span>
          </span>
        </h1>

        <div
          style={at(0.32)}
          className="hero-rule mt-8 h-px w-full bg-edge md:mt-10"
        />

        <div className="grid gap-10 pt-8 lg:grid-cols-12 lg:gap-14">
          <div className="self-start lg:col-span-6">
            <div style={at(0.42)} className="hero-rise">
              <RotatingLine items={hero.rotating} />
            </div>

            <p
              style={at(0.5)}
              className="hero-rise mt-5 max-w-[50ch] text-lg leading-relaxed text-text"
            >
              {hero.sub}
            </p>

            <div
              style={at(0.6)}
              className="hero-rise mt-9 flex flex-wrap items-center gap-3"
            >
              <PrimaryCta href="#delivery">{hero.ctaPrimary}</PrimaryCta>
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

          <figure
            style={at(0.5)}
            className="hero-rise relative self-end lg:col-span-5 lg:col-start-8 lg:justify-self-end"
          >
            {/* An offset hairline behind the plate: gives the portrait a
                second edge so it reads as a mounted print rather than a
                floating rectangle. */}
            <span
              aria-hidden
              className="absolute -bottom-3 -right-3 hidden h-full w-full border border-accent/25 md:block"
            />
            <div className="panel relative w-fit p-2.5">
              <Image
                src="/portrait.webp"
                alt={siteMeta.portraitAlt}
                width={928}
                height={1152}
                priority
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 52vw, 400px"
                className="h-auto w-[min(74vw,300px)] sm:w-[330px] lg:w-[400px]"
              />
            </div>
            <figcaption className="u-mono relative mt-4 flex items-center gap-3 text-2xs uppercase tracking-[0.24em] text-muted">
              <span aria-hidden className="h-px w-6 bg-edge" />
              {profile.location}
            </figcaption>
          </figure>
        </div>
      </div>

      <a
        href="#stacks"
        style={at(0.9)}
        className="hero-rise absolute inset-x-0 bottom-6 mx-auto flex min-h-[44px] w-fit items-center gap-3 text-muted transition-colors hover:text-accent-ink"
      >
        <ArrowDown aria-hidden size={14} strokeWidth={1.6} />
        <span className="u-mono text-2xs uppercase tracking-[0.28em]">Scroll</span>
      </a>
    </section>
  );
}
