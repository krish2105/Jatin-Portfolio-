import { cn } from "@/lib/utils";

/**
 * The page is an argument built in order, so every section wears its index.
 * The numbered mono rule IS the heading — set in Geist Mono, hairline-tied,
 * the way a statement of account labels its columns.
 */
export function Section({
  id,
  number,
  label,
  children,
  className,
  inner,
  bleed = false,
}: {
  id: string;
  number: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  inner?: string;
  /** Full-bleed sections manage their own horizontal padding. */
  bleed?: boolean;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("relative scroll-mt-24 border-t border-edge", className)}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1440px] py-section",
          !bleed && "px-gutter",
          inner,
        )}
      >
        <h2
          id={headingId}
          className={cn(
            "u-mono flex items-center gap-3 text-2xs",
            bleed && "px-gutter",
          )}
        >
          <span className="text-accent-ink">{number}</span>
          <span aria-hidden className="h-px w-8 bg-edge" />
          <span className="uppercase tracking-[0.3em] text-muted">{label}</span>
        </h2>
        {children}
      </div>
    </section>
  );
}
