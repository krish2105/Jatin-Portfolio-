"use client";

import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { JaaliGlyph } from "./JaaliGlyph";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { ViewModeToggle } from "./ViewModeToggle";

const SECTION_IDS = navItems.map((item) => item.href.slice(1));

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      {/* The only backdrop-filter on the site. */}
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-edge bg-ground/72 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-gutter md:h-20">
          <a
            href="#top"
            className="-mx-2 flex min-h-[44px] min-w-[44px] shrink-0 items-center gap-3 px-2"
            aria-label={`${profile.name} — back to top`}
          >
            <JaaliGlyph className="text-accent-ink" />
            {/* Visible at every width. This link is the only place the name
                appears in the chrome, and a portfolio opened on a phone that
                shows nothing but an abstract glyph does not say whose it is. */}
            <span className="u-mono whitespace-nowrap text-2xs uppercase tracking-[0.2em] text-text sm:tracking-[0.28em]">
              {profile.name}
            </span>
          </a>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex min-h-[44px] items-center gap-2 rounded-full px-3 text-sm transition-colors",
                        isActive
                          ? "text-text"
                          : "text-muted hover:text-text",
                      )}
                    >
                      <span
                        className={cn(
                          "u-mono text-2xs transition-colors",
                          isActive ? "text-accent-ink" : "text-muted/70",
                        )}
                      >
                        {item.number}
                      </span>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ViewModeToggle className="hidden xl:inline-flex" />
            {/* Without a visible trigger the palette is undiscoverable — a
                keyboard shortcut nobody is told about helps nobody. */}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("vision-mesh:palette"))
              }
              aria-label="Open command palette"
              className="hidden min-h-[44px] items-center gap-2 rounded-pill border border-edge px-3.5 text-muted transition-colors hover:border-accent hover:text-accent-ink lg:inline-flex"
            >
              <Search aria-hidden size={14} strokeWidth={1.8} />
              <kbd className="u-mono text-2xs">⌘K</kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              className="grid h-11 w-11 place-items-center rounded-full border border-edge text-muted transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <Menu aria-hidden size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
