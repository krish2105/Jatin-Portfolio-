import { skillGroups, stacks } from "@/data/portfolio";
import { Section } from "@/components/ui/Section";
import { LensDivider } from "@/components/ui/LensDivider";
import { Reveal } from "@/components/ui/Reveal";

const systems = stacks.find((s) => s.id === "systems")!;
const models = stacks.find((s) => s.id === "models")!;
const seam = stacks.find((s) => s.id === "seam")!;

const systemsSkills = skillGroups.find((g) => g.id === "systems")!;
const modelsSkills = skillGroups.find((g) => g.id === "models")!;

/**
 * The thesis, made visual. Two columns of equal weight, one hairline between
 * them, and the argument for why the seam matters sitting directly on it.
 */
export function TwoStacks() {
  return (
    <Section id="stacks" number="03" label="Two Stacks">
      <div className="relative mt-12 md:mt-16">
        {/* Cursor-driven bend arrives in Phase 4. On touch it stays straight,
            because a lens that follows a pointer means nothing without one. */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <LensDivider />
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-0">
          <Reveal className="lg:pr-14 xl:pr-20">
            <StackPanelBlock
              label={systems.label}
              body={systems.body}
              skills={systemsSkills.items}
            />
          </Reveal>
          <div
            aria-hidden
            className="h-px w-full bg-edge lg:hidden"
          />
          <Reveal delay={0.12} className="lg:pl-14 xl:pl-20">
            <StackPanelBlock
              label={models.label}
              body={models.body}
              skills={modelsSkills.items}
            />
          </Reveal>
        </div>

        {/* The seam. Sits centred on the divider, where the two columns meet. */}
        <div className="relative mt-14 md:mt-20">
          <span
            aria-hidden
            className="absolute -top-14 left-1/2 hidden h-14 w-px -translate-x-1/2 bg-gradient-to-b from-edge to-accent/60 lg:block"
          />
          <Reveal delay={0.1} className="panel washed relative mx-auto max-w-[62ch] p-8 text-center md:p-12">
            <p className="u-mono flex items-center justify-center gap-3 text-2xs uppercase tracking-[0.3em] text-accent-ink">
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 border border-accent" />
              {seam.label}
            </p>
            <p className="mt-6 text-balance text-xl leading-snug text-text md:text-2xl">
              {seam.body}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function StackPanelBlock({
  label,
  body,
  skills,
}: {
  label: string;
  body: string;
  skills: readonly string[];
}) {
  return (
    <div>
      <h3 className="u-mono text-sm uppercase tracking-[0.32em] text-text">
        {label}
      </h3>
      <p className="mt-6 max-w-[54ch] leading-relaxed text-muted">{body}</p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="u-mono rounded-pill border border-edge px-3 py-1.5 text-2xs uppercase tracking-[0.12em] text-muted"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
