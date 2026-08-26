/**
 * Types for every piece of content on the site.
 * All copy lives in `src/data/portfolio.ts` — nothing downstream hard-codes text.
 */

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface HeroContent {
  eyebrow: string;
  display: string;
  /** Cycled through with a mask-reveal, one at a time */
  rotating: readonly string[];
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

/** One of the three panels in the Two Stacks section. */
export interface StackPanel {
  id: "systems" | "models" | "seam";
  label: string;
  body: string;
}

export interface ExperienceRole {
  title: string;
  /** Full-time · Internship · Apprenticeship */
  employment: string;
  /** Display string, e.g. "May 2026 – Present" */
  period: string;
  /** ISO-ish sort key, newest first */
  sortKey: string;
  bullets: readonly string[];
  isCurrent?: boolean;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  location: string;
  /** On-site · Hybrid · Remote */
  mode?: string;
  /** e.g. "1 yr 5 mos" */
  duration?: string;
  roles: readonly ExperienceRole[];
  skills?: readonly string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  qualification: string;
  specialisation: string;
  period: string;
  result: string;
}

export interface BuildProject {
  id: string;
  /** Two-digit index used as a mono eyebrow */
  index: string;
  title: string;
  tag: string;
  context: string;
  dates: string;
  problem: string;
  approach: string;
  built: string;
  result: string;
  stack: readonly string[];
  /** Public repository, when one exists. Omitted where none does. */
  repo?: string;
}

export type RecordTileSize = "large" | "wide" | "small";

export interface RecordTile {
  id: string;
  /** The figure or short token that leads the tile */
  value: string;
  label: string;
  size: RecordTileSize;
}

export interface SkillGroup {
  id: string;
  label: string;
  items: readonly string[];
}

export interface NowContent {
  body: string;
  open: string;
}

export interface ContactContent {
  heading: string;
  sub: string;
  email: string;
  resume: string;
}

export interface NavItem {
  /** Section number shown as a mono eyebrow, e.g. "03" */
  number: string;
  label: string;
  href: string;
}
