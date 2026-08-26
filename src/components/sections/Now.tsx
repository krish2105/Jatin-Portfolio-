import { now, profile, skillGroups } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const learning = skillGroups.find((group) => group.id === "learning")!;
const languages = skillGroups.find((group) => group.id === "languages")!;

export function Now() {
  return (
    <Section id="now" number="08" label="Now">
      <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="max-w-[54ch] text-xl leading-relaxed text-text md:text-2xl md:leading-relaxed">
            {now.body}
          </p>
          <p className="mt-8 max-w-[56ch] leading-relaxed text-muted">
            {now.open}
          </p>
        </Reveal>

        <Reveal delay={0.12} as="div" className="self-start lg:col-span-4 lg:col-start-9">
        <dl className="grid gap-8">
          <div>
            <dt className="u-mono text-2xs uppercase tracking-[0.28em] text-muted">
              Based in
            </dt>
            <dd className="mt-2 text-text">{profile.location}</dd>
          </div>
          <div>
            <dt className="u-mono text-2xs uppercase tracking-[0.28em] text-muted">
              Role
            </dt>
            <dd className="mt-2 text-text">{profile.role}</dd>
          </div>
          <div>
            <dt className="u-mono text-2xs uppercase tracking-[0.28em] text-muted">
              {learning.label}
            </dt>
            <dd className="mt-3">
              <ul className="space-y-2 text-sm text-muted">
                {learning.items.map((item) => (
                  <li key={item} className="grid grid-cols-[auto_1fr] gap-3">
                    <span
                      aria-hidden
                      className="mt-[0.55em] h-px w-3 shrink-0 bg-edge"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="u-mono text-2xs uppercase tracking-[0.28em] text-muted">
              {languages.label}
            </dt>
            <dd className="u-mono mt-2 text-sm text-muted">
              {languages.items.join(" · ")}
            </dd>
          </div>
        </dl>
        </Reveal>
      </div>
    </Section>
  );
}
