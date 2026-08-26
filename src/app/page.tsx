import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { hero, profile } from "@/data/portfolio";

/* PHASE 1 — token, font and theme proof sheet. Replaced in Phase 2 by the
   real section composition. */

const tokens = [
  { name: "ground", note: "Page background" },
  { name: "surface", note: "Cards, bento tiles, modals" },
  { name: "edge", note: "Hairlines, borders, dividers" },
  { name: "text", note: "Body copy" },
  { name: "muted", note: "Captions, labels, metadata" },
  { name: "accent", note: "Links, active states, 3D emission" },
  { name: "signature", note: "Hero lattice edges — one place only" },
] as const;

const scale = [
  { token: "--text-display", label: "display" },
  { token: "--text-4xl", label: "4xl" },
  { token: "--text-3xl", label: "3xl" },
  { token: "--text-2xl", label: "2xl" },
  { token: "--text-xl", label: "xl" },
  { token: "--text-base", label: "base" },
  { token: "--text-sm", label: "sm" },
] as const;

export default function Page() {
  return (
    <main className="min-h-dvh gutter py-16">
      <header className="mx-auto flex max-w-5xl items-start justify-between gap-6 border-b border-edge pb-6">
        <div>
          <p className="u-mono text-2xs uppercase tracking-[0.28em] text-muted">
            Phase 01 · Foundation
          </p>
          <h1
            className="mt-3 leading-[0.95]"
            style={{ fontSize: "var(--text-3xl)", fontVariationSettings: '"wdth" 88, "wght" 600' }}
          >
            {profile.name}
          </h1>
          <p className="mt-2 max-w-prose text-sm text-muted">{hero.sub}</p>
        </div>
        <ThemeToggle />
      </header>

      <section className="mx-auto mt-14 max-w-5xl">
        <h2 className="u-mono text-2xs uppercase tracking-[0.28em] text-muted">
          Tokens
        </h2>
        <ul className="mt-5 grid grid-cols-1 gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4">
          {tokens.map((t) => (
            <li key={t.name} className="bg-surface p-4">
              <div
                className="h-14 w-full border border-edge"
                style={{ background: `var(--${t.name})` }}
              />
              <p className="u-mono mt-3 text-xs">{t.name}</p>
              <p className="mt-1 text-xs leading-snug text-muted">{t.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-14 max-w-5xl">
        <h2 className="u-mono text-2xs uppercase tracking-[0.28em] text-muted">
          Type — Bricolage Grotesque / Geist Sans / Geist Mono
        </h2>
        <div className="mt-5 divide-y divide-edge border-y border-edge">
          {scale.map((s) => (
            <div
              key={s.token}
              className="flex items-baseline gap-6 overflow-hidden py-3"
            >
              <span className="u-mono w-20 shrink-0 text-2xs text-muted">
                {s.label}
              </span>
              <span
                className="truncate font-display leading-[0.95]"
                style={{ fontSize: `var(${s.token})` }}
              >
                Systems ⟷ Models
              </span>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-prose">
          Geist Sans body copy. {hero.sub}{" "}
          <a
            className="text-accent-ink underline decoration-from-font underline-offset-4"
            href={profile.linkedin}
          >
            An inline link
          </a>{" "}
          uses <span className="u-mono text-xs">accent-ink</span> so it clears
          4.5:1 in both themes.
        </p>
        <p className="u-mono mt-4 text-sm text-muted">
          9.37 CGPA · May 2026 – Present · 10,000+ · 30 fps
        </p>
      </section>
    </main>
  );
}
