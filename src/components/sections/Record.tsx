import { recordTiles } from "@/data/portfolio";
import type { RecordTile } from "@/types/portfolio";
import { Section } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Bento grid. The two largest tiles carry the two facts worth leading with. */
const SPAN: Record<RecordTile["size"], string> = {
  large: "sm:col-span-2 sm:row-span-2",
  wide: "sm:col-span-2",
  small: "sm:col-span-2 lg:col-span-4",
};

export function Record() {
  return (
    <Section id="record" number="07" label="Record">
      <RevealGroup as="ul" stagger={0.06} className="mt-12 grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-4 md:mt-16">
        {recordTiles.map((tile) => (
          <RevealItem
            as="li"
            key={tile.id}
            className={cn(
              "flex flex-col justify-between gap-6 bg-surface p-6 md:p-7",
              SPAN[tile.size],
            )}
          >
            <p
              className={cn(
                "font-display leading-[0.9] text-text",
                tile.size === "large"
                  ? "text-4xl md:text-5xl"
                  : "text-2xl md:text-3xl",
              )}
              style={
                tile.size === "large"
                  ? { fontVariationSettings: '"wght" 600, "wdth" 88' }
                  : undefined
              }
            >
              {tile.value}
            </p>
            <p
              className={cn(
                "text-muted",
                tile.size === "large" ? "max-w-[26ch] text-base" : "text-sm",
              )}
            >
              {tile.label}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
