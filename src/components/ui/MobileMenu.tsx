"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { navItems, profile } from "@/data/portfolio";
import { JaaliGlyph } from "./JaaliGlyph";

/**
 * Full-screen navigation for narrow viewports. A real dialog: focus trapped,
 * Escape closes, body scroll locked, focus returned to the trigger.
 */
export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, panelRef, onClose);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      tabIndex={-1}
      className="fixed inset-0 z-[150] flex flex-col bg-ground outline-none lg:hidden"
    >
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-edge px-gutter">
        <span className="flex items-center gap-3 text-accent-ink">
          <JaaliGlyph />
          <span className="u-mono text-2xs uppercase tracking-[0.3em] text-muted">
            {profile.name}
          </span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="grid h-11 w-11 place-items-center rounded-full border border-edge text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <X aria-hidden size={18} strokeWidth={1.5} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-gutter py-8">
        <ul className="divide-y divide-edge">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onClose}
                className="flex min-h-[64px] items-baseline gap-5 py-5"
              >
                <span className="u-mono text-2xs text-accent-ink">
                  {item.number}
                </span>
                <span className="font-display text-2xl">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-edge px-gutter py-6">
        <a
          href={`mailto:${profile.email}`}
          className="u-mono block text-sm text-accent-ink"
        >
          {profile.email}
        </a>
        <p className="u-mono mt-2 text-2xs uppercase tracking-[0.2em] text-muted">
          {profile.location}
        </p>
      </div>
    </div>
  );
}
