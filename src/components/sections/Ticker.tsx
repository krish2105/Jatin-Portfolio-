import { ticker } from "@/data/portfolio";

/**
 * Static in Phase 2 — Phase 4 sets the track in motion. The list is duplicated
 * so the animated loop has a seamless second half; the duplicate is hidden
 * from assistive tech.
 */
export function Ticker() {
  return (
    <section
      id="ticker"
      aria-label="Tools and disciplines"
      className="relative border-t border-edge py-6 md:py-8"
    >
      <div className="mask-edges overflow-hidden">
        <ul
          data-ticker-track
          className="flex w-max items-center gap-10 whitespace-nowrap md:gap-14"
        >
          {ticker.map((item) => (
            <TickerItem key={item} label={item} />
          ))}
          {ticker.map((item) => (
            <TickerItem key={`dup-${item}`} label={item} duplicate />
          ))}
        </ul>
      </div>
    </section>
  );
}

function TickerItem({
  label,
  duplicate = false,
}: {
  label: string;
  duplicate?: boolean;
}) {
  return (
    <li
      aria-hidden={duplicate || undefined}
      className="u-mono flex items-center gap-10 text-xs uppercase tracking-[0.22em] text-muted md:gap-14"
    >
      {label}
      <span aria-hidden className="h-1 w-1 rounded-full bg-accent/50" />
    </li>
  );
}
