"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import type { BuildProject } from "@/types/portfolio";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useViewMode } from "@/hooks/useViewMode";
import { GitHubMark } from "./BrandIcons";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/* Same four blocks for both readers — nothing is ever hidden. Recruiters get
   problem and outcome first; engineers get the approach and the build first. */
const RECRUITER_BLOCKS = [
  { key: "problem", label: "The problem" },
  { key: "result", label: "Result" },
  { key: "approach", label: "Approach" },
  { key: "built", label: "What I built" },
] as const;

const TECHNICAL_BLOCKS = [
  { key: "problem", label: "The problem" },
  { key: "approach", label: "Approach" },
  { key: "built", label: "What I built" },
  { key: "result", label: "Result" },
] as const;

/**
 * Accessible case study. Focus trapped, Escape closes, body scroll locked,
 * focus returned to the card that opened it.
 */
export function CaseStudyModal({
  project,
  onClose,
}: {
  project: BuildProject | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { mode } = useViewMode();
  const blocks = mode === "recruiter" ? RECRUITER_BLOCKS : TECHNICAL_BLOCKS;
  useFocusTrap(Boolean(project), panelRef, onClose);

  return (
    <AnimatePresence>
      {project && (
    <motion.div
      className="fixed inset-0 z-[160] flex items-start justify-center overflow-y-auto bg-ground/90 p-4 md:p-8"
      onClick={onClose}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        ref={panelRef}
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 14, scale: 0.99 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="panel relative my-auto w-full max-w-3xl p-6 outline-none md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-edge text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <X aria-hidden size={18} strokeWidth={1.5} />
        </button>

        <p className="u-mono flex flex-wrap items-center gap-3 text-2xs uppercase tracking-[0.24em] text-muted">
          <span className="text-accent-ink">{project.index}</span>
          <span aria-hidden className="h-px w-6 bg-edge" />
          {project.tag}
        </p>

        <h3
          id="case-study-title"
          className="mt-4 max-w-[85%] font-display text-2xl leading-[1.05] md:text-3xl"
        >
          {project.title}
        </h3>

        <p className="u-mono mt-3 text-2xs uppercase tracking-[0.2em] text-muted">
          {project.context} · {project.dates}
        </p>

        <dl className="mt-8 space-y-7">
          {blocks.map((block) => (
            <div key={block.key}>
              <dt className="u-mono text-2xs uppercase tracking-[0.28em] text-accent-ink">
                {block.label}
              </dt>
              <dd className="mt-2.5 max-w-[70ch] leading-relaxed text-muted">
                {project[block.key]}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-9 border-t border-edge pt-6">
          <p className="u-mono text-2xs uppercase tracking-[0.28em] text-muted">
            Stack
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="u-mono rounded-pill border border-edge px-3 py-1.5 text-2xs uppercase tracking-[0.12em] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-[44px] items-center gap-2.5 rounded-card border border-edge px-5 text-sm text-text transition-colors hover:border-accent hover:text-accent-ink"
          >
            <GitHubMark size={15} />
            View source
          </a>
        )}
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
