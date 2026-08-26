import { buildLattice } from "./latticeGeometry";
import { cn } from "@/lib/utils";

const lattice = buildLattice(800);

/**
 * The no-WebGL / reduced-motion hero. A jaali screen drawn as vector line
 * work: octagons and ties carry the brass `signature` edge, the star frames
 * sit back in teal. Deliberately static and precise — it should read as an
 * intentional drawing, not a failed 3D scene.
 *
 * The only brass on the site lives here and in the R3F scene.
 */
export function StaticLattice({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 800 800"
      aria-hidden
      className={cn("h-full w-full", animate && "lattice-float", className)}
    >
      <defs>
        {/* Fades the screen out at its edges so it sits in the page rather
            than being pasted on top of it. */}
        <radialGradient id="jaali-falloff" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="34%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="62%" stopColor="#fff" stopOpacity="0.42" />
          <stop offset="86%" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="jaali-mask">
          <rect width="800" height="800" fill="url(#jaali-falloff)" />
        </mask>
      </defs>

      <g mask="url(#jaali-mask)">
        {/* Field detail — accent teal at 30% */}
        <g
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="var(--lattice-field)"
          strokeWidth={1.1}
          strokeLinejoin="round"
        >
          {lattice.cells.map((cell, i) => (
            <g key={`star-${i}`}>
              <path d={cell.star[0]} />
              <path d={cell.star[1]} />
            </g>
          ))}
        </g>

        {/* Structural edges — the one brass moment on the site */}
        <g
          fill="none"
          stroke="var(--signature)"
          strokeOpacity="var(--lattice-edge)"
          strokeWidth={1.25}
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {lattice.cells.map((cell, i) => (
            <path key={`oct-${i}`} d={cell.octagon} />
          ))}
          {lattice.ties.map((d, i) => (
            <path key={`tie-${i}`} d={d} strokeOpacity="var(--lattice-tie)" />
          ))}
        </g>

        {/* Node points where the ties meet the octagons */}
        <g fill="var(--accent)" fillOpacity="var(--lattice-node)">
          {lattice.cells.map((cell, i) => (
            <circle key={`node-${i}`} cx={cell.cx} cy={cell.cy} r={1.6} />
          ))}
        </g>
      </g>
    </svg>
  );
}
