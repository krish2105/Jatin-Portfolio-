"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

import { builds } from "@/data/portfolio";
import type { BuildProject } from "@/types/portfolio";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";
import { TiltCard } from "@/components/ui/TiltCard";

export function Builds() {
  const [open, setOpen] = useState<BuildProject | null>(null);

  const frame = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  /* The DOM is identical at every width — only the travel distance differs,
     and it is zero below lg. That keeps the mobile swipe gallery a plain
     CSS scroll-snap container and avoids a hydration-time structure swap. */
  useEffect(() => {
    // Below lg the measurement is simply not consumed (see `travel`), so
    // there is nothing to reset here.
    if (!isDesktop) return;

    /* Measure the track against its clipping viewport, NOT against itself.
       On desktop the track is `w-max`, so its own scrollWidth and clientWidth
       are identical and the travel distance came out as zero — the third card
       was simply clipped and unreachable. */
    const measure = () => {
      const inner = track.current;
      const outer = viewport.current;
      if (!inner || !outer) return;
      setDistance(Math.max(0, inner.scrollWidth - outer.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (track.current) observer.observe(track.current);
    if (viewport.current) observer.observe(viewport.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start start", "end end"],
  });
  const travel = isDesktop ? distance : 0;
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <>
      <section
        id="builds"
        aria-labelledby="builds-heading"
        className="relative scroll-mt-24 border-t border-edge"
      >
        {/* Tall only on desktop: that extra height is the scroll budget the
            pinned track spends travelling sideways. */}
        <div ref={frame} className="lg:h-[220vh]">
          <div className="lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-center">
            <div className="mx-auto w-full max-w-[1440px] px-gutter py-section lg:py-0">
              <h2
                id="builds-heading"
                className="u-mono flex items-center gap-3 text-2xs"
              >
                <span className="text-accent-ink">05</span>
                <span aria-hidden className="h-px w-8 bg-edge" />
                <span className="uppercase tracking-[0.3em] text-muted">
                  Builds
                </span>
              </h2>

              <div
                ref={viewport}
                className="mt-12 md:mt-14 lg:overflow-hidden"
              >
                <motion.ul
                  ref={track}
                  style={travel > 0 ? { x } : undefined}
                  className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:w-max lg:snap-none lg:gap-8 lg:overflow-visible lg:pb-0"
                >
                  {builds.map((project) => (
                    <li
                      key={project.id}
                      className="w-[82vw] shrink-0 snap-start sm:w-[62vw] lg:w-[min(40vw,540px)]"
                    >
                      <TiltCard className="h-full">
                        <BuildCard
                          project={project}
                          onOpen={() => setOpen(project)}
                        />
                      </TiltCard>
                    </li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CaseStudyModal project={open} onClose={() => setOpen(null)} />
    </>
  );
}

function BuildCard({
  project,
  onOpen,
}: {
  project: BuildProject;
  onOpen: () => void;
}) {
  return (
    <article className="group flex h-full flex-col border border-edge bg-surface p-6 transition-colors hover:border-accent/50 md:p-7">
      <p className="u-mono flex items-center gap-3 text-2xs uppercase tracking-[0.24em] text-muted">
        <span className="text-accent-ink">{project.index}</span>
        <span aria-hidden className="h-px w-6 bg-edge" />
        {project.dates}
      </p>

      <h3 className="mt-6 font-display text-xl leading-[1.1] md:text-2xl">
        {project.title}
      </h3>

      <p className="u-mono mt-3 text-2xs uppercase tracking-[0.18em] text-accent-ink">
        {project.tag}
      </p>

      <p className="mt-5 flex-1 text-sm leading-relaxed text-muted">
        {project.problem}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="u-mono rounded-pill border border-edge px-2.5 py-1 text-2xs uppercase tracking-[0.1em] text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onOpen}
        className="mt-7 inline-flex min-h-[44px] items-center gap-2 self-start text-sm text-text transition-colors hover:text-accent-ink"
      >
        Read the case study
        <ArrowUpRight
          aria-hidden
          size={15}
          strokeWidth={1.8}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        <span className="sr-only"> — {project.title}</span>
      </button>
    </article>
  );
}
