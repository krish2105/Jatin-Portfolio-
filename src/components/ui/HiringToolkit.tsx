"use client";

import { useMemo, useState } from "react";
import { ClipboardCheck, ClipboardCopy } from "lucide-react";

import { buildHiringSummary } from "@/lib/hiringSummary";
import { matchJobDescription } from "@/lib/jdMatcher";
import { cn } from "@/lib/utils";

/**
 * Two things a hiring team actually wants and never gets from a portfolio:
 * something they can paste into their own system, and an honest read on
 * whether this person fits the role they are filling.
 *
 * Both are computed from `portfolio.ts` by plain string matching. No model is
 * involved anywhere, which is the point — this can under-report a match, but
 * it can never invent one.
 */
export function HiringToolkit() {
  const [copied, setCopied] = useState(false);
  const [jd, setJd] = useState("");

  const result = useMemo(
    () => (jd.trim().length > 40 ? matchJobDescription(jd) : null),
    [jd],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildHiringSummary());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="panel washed relative mt-16 p-6 md:mt-20 md:p-9">
      <h3 className="u-mono flex items-center gap-3 text-2xs">
        <span aria-hidden className="h-px w-8 bg-edge" />
        <span className="uppercase tracking-[0.3em] text-muted">
          For hiring teams
        </span>
      </h3>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="text-lg leading-relaxed text-text">
            A plain-text summary you can paste straight into an ATS or forward
            to a colleague.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Built from the same data this page renders, so it makes exactly the
            claims the site makes — nothing more.
          </p>

          <button
            type="button"
            onClick={copy}
            className="mt-6 inline-flex min-h-[48px] items-center gap-2.5 rounded-card border border-edge px-5 text-sm text-text transition-colors hover:border-accent hover:text-accent-ink"
          >
            {copied ? (
              <ClipboardCheck aria-hidden size={16} strokeWidth={1.8} className="text-accent-ink" />
            ) : (
              <ClipboardCopy aria-hidden size={16} strokeWidth={1.7} />
            )}
            {copied ? "Copied to clipboard" : "Copy hiring summary"}
          </button>
          <p aria-live="polite" className="sr-only">
            {copied ? "Hiring summary copied to clipboard." : ""}
          </p>
        </div>

        <div className="lg:col-span-7">
          <label
            htmlFor="jd-input"
            className="u-mono text-2xs uppercase tracking-[0.24em] text-muted"
          >
            Paste a job description
          </label>
          <textarea
            id="jd-input"
            rows={6}
            value={jd}
            onChange={(event) => setJd(event.target.value)}
            placeholder="Paste the requirements section and this will show which of them are actually covered."
            aria-describedby="jd-help"
            className="mt-2 w-full rounded-card border border-edge bg-ground px-4 py-3 text-sm text-text placeholder:text-muted focus-visible:border-accent"
          />
          <p id="jd-help" className="mt-2 text-xs leading-relaxed text-muted">
            Runs entirely in your browser by keyword overlap. Nothing is
            uploaded, and no language model is involved — so the score can
            under-report a fit, but it cannot fabricate one.
          </p>

          {result && (
            <div className="mt-6 border-t border-edge pt-6" aria-live="polite">
              {/* The headline is the count, not the percentage. A percentage
                  of a capability surface reads as a fit score, and a
                  NetSuite-only role legitimately touches a fraction of a
                  surface that also spans computer vision — which would look
                  like a bad match when every requirement was in fact met. */}
              <div className="flex flex-wrap items-baseline gap-3">
                <span
                  className="font-display text-4xl leading-none"
                  style={{ fontVariationSettings: '"wght" 600, "wdth" 88' }}
                >
                  {result.matched.length}
                </span>
                <span className="u-mono text-2xs uppercase tracking-[0.2em] text-muted">
                  {result.matched.length === 1 ? "capability matched" : "capabilities matched"}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted">
                This role touches{" "}
                <span className="u-mono text-text">{result.score}%</span> of
                Jatin&rsquo;s stated capability surface. That is a description
                of overlap, not a fit score — a pure ERP role will always leave
                the machine-learning half untouched.
              </p>

              <div
                className="mt-4 h-1.5 w-full overflow-hidden rounded-pill bg-edge"
                role="img"
                aria-label={`Keyword coverage ${result.score} percent`}
              >
                <div
                  className="h-full rounded-pill bg-accent-solid transition-[width] duration-500"
                  style={{ width: `${Math.max(2, result.score)}%` }}
                />
              </div>

              {result.matched.length > 0 && (
                <>
                  <p className="u-mono mt-6 text-2xs uppercase tracking-[0.24em] text-accent-ink">
                    Matched
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {result.matched.slice(0, 18).map((term) => (
                      <li
                        key={term.term}
                        className={cn(
                          "u-mono rounded-pill border px-2.5 py-1 text-2xs uppercase tracking-[0.1em]",
                          term.weight === 2
                            ? "border-accent/45 text-text"
                            : "border-edge text-muted",
                        )}
                      >
                        {term.term}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {result.bestBuild && (
                <p className="mt-6 text-sm leading-relaxed text-muted">
                  <span className="u-mono text-2xs uppercase tracking-[0.24em] text-muted">
                    Closest project{" "}
                  </span>
                  <span className="text-text">{result.bestBuild.title}</span>
                </p>
              )}

              {result.matched.length === 0 && (
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  No overlap found. That is a real answer — this role probably
                  sits outside what Jatin has actually done.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
