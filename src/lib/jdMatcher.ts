import {
  builds,
  deliveryStages,
  netsuiteModules,
  skillGroups,
} from "@/data/portfolio";
import type { BuildProject } from "@/types/portfolio";

export interface MatchTerm {
  term: string;
  /** Where the term came from, shown so the score is auditable */
  source: string;
  /** Core capabilities count double */
  weight: number;
}

export interface JDMatchResult {
  /** Share of Jatin's stated capability this role touches. NOT a fit score:
   *  a NetSuite-only JD legitimately touches a fraction of a surface that
   *  also covers computer vision, and that is information, not a failure. */
  score: number;
  matched: MatchTerm[];
  missing: MatchTerm[];
  bestBuild: BuildProject | null;
  totalTerms: number;
}

/* The vocabulary is assembled from the same data the page renders, so the
   score can never reference a skill that is not claimed elsewhere. */
function buildVocabulary(): MatchTerm[] {
  const terms: MatchTerm[] = [];
  const seen = new Set<string>();

  const push = (term: string, source: string, weight: number) => {
    const key = term.toLowerCase();
    if (key.length < 2 || seen.has(key)) return;
    seen.add(key);
    terms.push({ term, source, weight });
  };

  // NetSuite delivery is the core of the offer, so it is weighted double.
  netsuiteModules.forEach((module) => {
    push(module.name, "NetSuite module", 2);
    module.records.forEach((record) => push(record, "NetSuite record", 1));
  });
  deliveryStages.forEach((stage) => push(stage.name, "Delivery stage", 2));

  skillGroups.forEach((group) => {
    const weight = group.id === "systems" ? 2 : 1;
    group.items.forEach((item) => push(item, group.label, weight));
  });

  builds.forEach((build) =>
    build.stack.forEach((tech) => push(tech, "Project stack", 1)),
  );

  return terms;
}

const VOCABULARY = buildVocabulary();

/** Normalises for comparison: lowercase, collapse punctuation to spaces. */
const normalise = (text: string) =>
  ` ${text.toLowerCase().replace(/[^a-z0-9+#./-]+/g, " ").replace(/\s+/g, " ")} `;

/**
 * Deterministic keyword-coverage score. No model is involved, so this cannot
 * invent a match — it can only report overlap between the job description and
 * terms that already appear on this site.
 *
 * A modest score is honest rather than a bug: most job descriptions mention
 * plenty this candidate genuinely does not do.
 */
export function matchJobDescription(jdText: string): JDMatchResult {
  const haystack = normalise(jdText);

  const matched: MatchTerm[] = [];
  const missing: MatchTerm[] = [];

  for (const entry of VOCABULARY) {
    const needle = normalise(entry.term).trim();
    if (needle && haystack.includes(` ${needle} `)) matched.push(entry);
    else missing.push(entry);
  }

  const matchedWeight = matched.reduce((sum, t) => sum + t.weight, 0);
  const totalWeight = VOCABULARY.reduce((sum, t) => sum + t.weight, 0);
  const score = totalWeight === 0 ? 0 : Math.round((matchedWeight / totalWeight) * 100);

  /* Which project overlaps this JD most. Requires at least two hits: a single
     shared word like "Python" is noise, and surfacing a computer-vision
     project as the "closest match" for a pure ERP role is worse than showing
     nothing at all. */
  let bestBuild: BuildProject | null = null;
  let bestHits = 1;
  for (const build of builds) {
    const hits = [...build.stack, build.tag].filter((term) =>
      haystack.includes(` ${normalise(term).trim()} `),
    ).length;
    if (hits > bestHits) {
      bestHits = hits;
      bestBuild = build;
    }
  }

  return {
    score,
    matched,
    missing: missing.filter((t) => t.weight === 2).slice(0, 8),
    bestBuild,
    totalTerms: VOCABULARY.length,
  };
}
