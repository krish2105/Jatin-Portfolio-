import { profile } from "@/data/portfolio";
import { JaaliGlyph } from "./JaaliGlyph";
import { ThemeToggle } from "./ThemeToggle";
import { GitHubMark, LinkedInMark } from "./BrandIcons";

const SOCIALS = [
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInMark },
  { label: "GitHub", href: profile.github, Icon: GitHubMark },
];

export function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-gutter py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <JaaliGlyph className="text-accent-ink" />
          <div>
            <p className="u-mono text-2xs uppercase tracking-[0.28em] text-text">
              {profile.name}
            </p>
            <p className="u-mono mt-1.5 text-2xs text-muted">
              {profile.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-2">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${profile.name} on ${label}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-edge text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>

      <div className="border-t border-edge">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 px-gutter py-6 md:flex-row md:items-center md:justify-between">
          <p className="u-mono text-2xs text-muted">
            Built with Next.js, Tailwind and React Three Fiber.
          </p>
          <p className="u-mono text-2xs text-muted">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
