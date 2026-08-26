import { cn } from "@/lib/utils";

/**
 * One cell of the jaali lattice — an octagon holding an eight-point star.
 * The same geometry the hero point cloud is built from, reduced to a mark.
 * Shape only: no ornament, and never brass.
 */
export function JaaliGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinejoin="round"
    >
      <path d="M11 4 H21 L28 11 V21 L21 28 H11 L4 21 V11 Z" />
      <path d="M9 9 H23 V23 H9 Z" opacity={0.5} />
      <path d="M16 5 L27 16 L16 27 L5 16 Z" opacity={0.5} />
    </svg>
  );
}
