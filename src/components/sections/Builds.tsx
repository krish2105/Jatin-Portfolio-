"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { builds } from "@/data/portfolio";
import type { BuildProject } from "@/types/portfolio";
import { Section } from "@/components/ui/Section";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";

export function Builds() {
  const [open, setOpen] = useState<BuildProject | null>(null);

  return (
    <>
      <Section id="builds" number="05" label="Builds">
        {/* Mobile: a native scroll-snap swipe gallery — no gesture library.
            Desktop: a three-up track. Phase 4 pins it to the scroll. */}
        <ul
          data-builds-track
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:mt-16 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
        >
          {builds.map((project) => (
            <li
              key={project.id}
              className="w-[82vw] shrink-0 snap-start sm:w-[62vw] md:w-auto"
            >
              <BuildCard project={project} onOpen={() => setOpen(project)} />
            </li>
          ))}
        </ul>
      </Section>

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
