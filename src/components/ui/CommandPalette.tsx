"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ClipboardCopy,
  Download,
  Mail,
  Moon,
  Search,
  Sun,
  UserCog,
} from "lucide-react";

import { contact, navItems, profile } from "@/data/portfolio";
import { buildHiringSummary } from "@/lib/hiringSummary";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useTheme } from "@/hooks/useTheme";
import { useViewMode } from "@/hooks/useViewMode";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { toggle: toggleTheme, theme } = useTheme();
  const { toggle: toggleView, mode } = useViewMode();

  const close = useCallback(() => setOpen(false), []);

  /* Reset happens where the palette is opened, not in an effect reacting to
     it — the state and the trigger belong together. */
  const openPalette = useCallback(() => {
    setQuery("");
    setCursor(0);
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  useFocusTrap(open, panelRef, close);

  /* ⌘K / Ctrl+K anywhere, and "/" when not already typing. */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) close();
        else openPalette();
      } else if (event.key === "/" && !typing && !open) {
        event.preventDefault();
        openPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, openPalette]);

  const copy = useCallback(async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setFlash(message);
    } catch {
      setFlash("Clipboard blocked by the browser");
    }
    window.setTimeout(() => setFlash(null), 2200);
  }, []);

  const commands: Command[] = useMemo(() => {
    const go = (href: string) => () => {
      setOpen(false);
      document
        .querySelector(href)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return [
      ...navItems.map((item) => ({
        id: `go-${item.href}`,
        label: `Go to ${item.label}`,
        hint: item.number,
        icon: <ArrowRight aria-hidden size={15} strokeWidth={1.7} />,
        run: go(item.href),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: contact.email,
        icon: <Mail aria-hidden size={15} strokeWidth={1.7} />,
        run: () => copy(contact.email, "Email copied"),
      },
      {
        id: "copy-summary",
        label: "Copy hiring summary",
        hint: "Plain text, ATS-ready",
        icon: <ClipboardCopy aria-hidden size={15} strokeWidth={1.7} />,
        run: () => copy(buildHiringSummary(), "Hiring summary copied"),
      },
      {
        id: "resume",
        label: "Download resume",
        icon: <Download aria-hidden size={15} strokeWidth={1.7} />,
        run: () => {
          setOpen(false);
          window.location.href = contact.resume;
        },
      },
      {
        id: "view",
        label: `Switch to ${mode === "recruiter" ? "technical" : "recruiter"} view`,
        icon: <UserCog aria-hidden size={15} strokeWidth={1.7} />,
        run: () => {
          toggleView();
          setOpen(false);
        },
      },
      {
        id: "theme",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
        icon:
          theme === "dark" ? (
            <Sun aria-hidden size={15} strokeWidth={1.7} />
          ) : (
            <Moon aria-hidden size={15} strokeWidth={1.7} />
          ),
        run: () => {
          toggleTheme();
          setOpen(false);
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn profile",
        icon: <ArrowRight aria-hidden size={15} strokeWidth={1.7} />,
        run: () => {
          setOpen(false);
          window.open(profile.linkedin, "_blank", "noopener,noreferrer");
        },
      },
    ];
  }, [copy, mode, theme, toggleTheme, toggleView]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.hint ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  const safeCursor = Math.min(cursor, Math.max(0, results.length - 1));

  if (!open) {
    return (
      <p aria-live="polite" className="sr-only">
        {flash ?? ""}
      </p>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[180] flex items-start justify-center bg-ground/85 p-4 pt-[12vh]"
      onClick={close}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="panel w-full max-w-xl overflow-hidden outline-none"
      >
        <div className="flex items-center gap-3 border-b border-edge px-4">
          <Search aria-hidden size={16} strokeWidth={1.7} className="text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setCursor((c) => (c + 1) % Math.max(1, results.length));
              } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setCursor((c) => (c - 1 + results.length) % Math.max(1, results.length));
              } else if (event.key === "Enter") {
                event.preventDefault();
                results[safeCursor]?.run();
              }
            }}
            placeholder="Jump to a section, copy the hiring summary…"
            aria-label="Search commands"
            className="min-h-[56px] w-full bg-transparent text-base text-text outline-none placeholder:text-muted"
          />
          <kbd className="u-mono hidden shrink-0 rounded border border-edge px-1.5 py-0.5 text-2xs text-muted sm:block">
            ESC
          </kbd>
        </div>

        <ul className="max-h-[52vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-sm text-muted">Nothing matches that.</li>
          )}
          {results.map((command, index) => (
            <li key={command.id}>
              <button
                type="button"
                onMouseEnter={() => setCursor(index)}
                onClick={command.run}
                className={cn(
                  "flex min-h-[48px] w-full items-center gap-3 px-4 text-left text-sm transition-colors",
                  index === safeCursor
                    ? "bg-accent/[0.09] text-text"
                    : "text-muted hover:text-text",
                )}
              >
                <span className="text-accent-ink">{command.icon}</span>
                <span className="flex-1">{command.label}</span>
                {command.hint && (
                  <span className="u-mono hidden text-2xs text-muted sm:block">
                    {command.hint}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p aria-live="polite" className="sr-only">
        {flash ?? ""}
      </p>
    </div>
  );
}
