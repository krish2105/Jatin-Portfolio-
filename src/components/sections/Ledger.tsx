import { education, experience } from "@/data/portfolio";
import type { ExperienceEntry, ExperienceRole } from "@/types/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Experience as a statement of account. Mono throughout, hairline rules,
 * dates right-aligned and exact. Zero decoration — the restraint is the point.
 */
export function Ledger() {
  return (
    <Section id="ledger" number="04" label="Ledger">
      <div className="mt-12 md:mt-16">
        <div className="u-mono hidden grid-cols-12 gap-6 border-b border-edge pb-3 text-2xs uppercase tracking-[0.24em] text-muted lg:grid">
          <span className="col-span-8">Engagement</span>
          <span className="col-span-4 text-right">Period</span>
        </div>

        <ol>
          {experience.map((entry) => (
            <LedgerEntry key={entry.id} entry={entry} />
          ))}
          <Reveal as="li" className="border-b border-edge py-8 md:py-10">
            <div className="grid gap-3 lg:grid-cols-12 lg:gap-6">
              <div className="lg:col-span-8">
                <h3 className="font-display text-xl md:text-2xl">
                  {education.institution}
                </h3>
                <p className="u-mono mt-2 text-2xs uppercase tracking-[0.2em] text-muted">
                  {education.qualification}
                </p>
                <p className="mt-4 text-sm text-muted">
                  Specialisation: {education.specialisation}
                </p>
              </div>
              <div className="u-mono text-xs text-muted lg:col-span-4 lg:text-right">
                <p>{education.period}</p>
                <p className="mt-2 text-text">{education.result}</p>
              </div>
            </div>
          </Reveal>
        </ol>
      </div>
    </Section>
  );
}

function LedgerEntry({ entry }: { entry: ExperienceEntry }) {
  const isCurrent = entry.roles.some((role) => role.isCurrent);
  const span =
    entry.roles.length > 1
      ? `${entry.roles[entry.roles.length - 1].period.split(" – ")[0]} – ${
          entry.roles[0].period.split(" – ")[1]
        }`
      : entry.roles[0].period;

  return (
    <Reveal as="li" className="border-b border-edge py-8 md:py-10">
      <div className="grid gap-3 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-8">
          <h3 className="flex flex-wrap items-center gap-3 font-display text-xl md:text-2xl">
            {entry.company}
            {isCurrent && (
              <span className="u-mono inline-flex items-center gap-1.5 rounded-pill border border-accent/40 px-2.5 py-1 text-2xs uppercase tracking-[0.2em] text-accent-ink">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                Current
              </span>
            )}
          </h3>
          <p className="u-mono mt-2 text-2xs uppercase tracking-[0.2em] text-muted">
            {[entry.location, entry.mode, entry.duration]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <p className="u-mono text-xs text-muted lg:col-span-4 lg:text-right">
          {span}
        </p>
      </div>

      <div className="mt-7 space-y-7">
        {entry.roles.map((role) => (
          <LedgerRole key={role.sortKey} role={role} multi={entry.roles.length > 1} />
        ))}
      </div>

      {entry.skills && (
        <p className="u-mono mt-7 text-2xs uppercase tracking-[0.18em] text-muted">
          <span className="text-accent-ink">Skills</span>{" "}
          {entry.skills.join(" · ")}
        </p>
      )}
    </Reveal>
  );
}

function LedgerRole({
  role,
  multi,
}: {
  role: ExperienceRole;
  multi: boolean;
}) {
  return (
    <div className={multi ? "border-l border-edge pl-5 md:pl-7" : undefined}>
      <div className="grid gap-1 lg:grid-cols-12 lg:gap-6">
        <p className="text-sm text-text lg:col-span-8">
          {role.title}
          <span className="u-mono text-muted"> · {role.employment}</span>
        </p>
        <p className="u-mono text-xs text-muted lg:col-span-4 lg:text-right">
          {role.period}
        </p>
      </div>
      <ul className="mt-3 space-y-2.5">
        {role.bullets.map((bullet) => (
          <li
            key={bullet}
            className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-muted"
          >
            <span
              aria-hidden
              className="mt-[0.55em] h-px w-3 shrink-0 bg-edge"
            />
            <span className="max-w-[76ch]">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
