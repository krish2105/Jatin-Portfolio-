/**
 * Jaali lattice geometry.
 *
 * A jaali is a perforated stone screen. This reproduces its structure — an
 * 8×8 repeating grid of interlocking octagons and eight-point stars — as pure
 * coordinate maths, shared by the SVG fallback and the R3F point cloud so the
 * two are the same object drawn two ways.
 *
 * Shape only. No ornament, no motif.
 */

export interface Vec2 {
  x: number;
  y: number;
}

export const LATTICE_COLS = 8;
export const LATTICE_ROWS = 8;

/** Regular octagon, flat-topped, inscribed in a circle of radius `r`. */
export function octagonPoints(cx: number, cy: number, r: number): Vec2[] {
  const points: Vec2[] = [];
  for (let i = 0; i < 8; i += 1) {
    // Offset by half a step so the octagon sits flat-topped, like cut stone.
    const angle = (Math.PI / 4) * i + Math.PI / 8;
    points.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }
  return points;
}

/**
 * Eight-point star: two squares, one rotated 45°. Returned as two closed
 * outlines rather than a single star polygon, which is how the stone is
 * actually cut — two overlapping frames, not one shape.
 */
export function starSquares(cx: number, cy: number, r: number): [Vec2[], Vec2[]] {
  const square: Vec2[] = [];
  const diamond: Vec2[] = [];
  for (let i = 0; i < 4; i += 1) {
    const a = (Math.PI / 2) * i + Math.PI / 4;
    square.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
    const b = (Math.PI / 2) * i;
    diamond.push({ x: cx + Math.cos(b) * r, y: cy + Math.sin(b) * r });
  }
  return [square, diamond];
}

export function toPath(points: Vec2[], close = true): string {
  if (points.length === 0) return "";
  const [first, ...rest] = points;
  const head = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
  const body = rest
    .map((p) => `L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  return `${head} ${body}${close ? " Z" : ""}`;
}

export interface LatticeCell {
  cx: number;
  cy: number;
  /** Octagon outline — a structural edge. Brass. */
  octagon: string;
  /** The two star frames — field detail. Teal. */
  star: [string, string];
}

export interface LatticeSpec {
  size: number;
  cell: number;
  cells: LatticeCell[];
  /** Connective bars running between octagon shoulders — structural. Brass. */
  ties: string[];
}

/**
 * Builds the full screen. `size` is the square viewBox edge.
 */
export function buildLattice(size = 800, cols = LATTICE_COLS, rows = LATTICE_ROWS): LatticeSpec {
  const cell = size / cols;
  const octR = cell * 0.42;
  const starR = cell * 0.24;

  const cells: LatticeCell[] = [];
  const ties: string[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cx = col * cell + cell / 2;
      const cy = row * cell + cell / 2;
      const [square, diamond] = starSquares(cx, cy, starR);

      cells.push({
        cx,
        cy,
        octagon: toPath(octagonPoints(cx, cy, octR)),
        star: [toPath(square), toPath(diamond)],
      });

      // Tie each octagon to its right and lower neighbour. These short bars
      // are what make the screen read as one carved plane, not loose shapes.
      if (col < cols - 1) {
        ties.push(
          toPath(
            [
              { x: cx + octR * 0.92, y: cy },
              { x: cx + cell - octR * 0.92, y: cy },
            ],
            false,
          ),
        );
      }
      if (row < rows - 1) {
        ties.push(
          toPath(
            [
              { x: cx, y: cy + octR * 0.92 },
              { x: cx, y: cy + cell - octR * 0.92 },
            ],
            false,
          ),
        );
      }
    }
  }

  return { size, cell, cells, ties };
}

/* --------------------------------------------------------------------------
   3D: the same lattice sampled as a point cloud.
   -------------------------------------------------------------------------- */

export interface LatticeCloud {
  positions: Float32Array;
  /** 1 = structural edge (brass), 0 = field point (teal) */
  edgeFlags: Float32Array;
  count: number;
}

function samplePolyline(
  points: Vec2[],
  perSegment: number,
  closed: boolean,
): Vec2[] {
  const out: Vec2[] = [];
  const n = closed ? points.length : points.length - 1;
  for (let i = 0; i < n; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    for (let s = 0; s < perSegment; s += 1) {
      const t = s / perSegment;
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  }
  return out;
}

/**
 * Samples the lattice into `target` points, centred on the origin and scaled
 * to `extent` world units. Structural edges (octagons and ties) are flagged so
 * the shader can light them in brass; everything else is teal field.
 */
export function buildLatticeCloud(target: number, extent = 6): LatticeCloud {
  const cols = LATTICE_COLS;
  const rows = LATTICE_ROWS;
  const size = 800;
  const cell = size / cols;
  const octR = cell * 0.42;
  const starR = cell * 0.24;

  // Budget: octagons and ties are the skeleton, stars are the detail.
  const perCell = Math.max(8, Math.floor(target / (cols * rows)));
  const octSeg = Math.max(2, Math.round(perCell * 0.34) / 8);
  const starSeg = Math.max(1, Math.round(perCell * 0.5) / 8);

  const pts: Vec2[] = [];
  const flags: number[] = [];

  const push = (list: Vec2[], edge: number) => {
    for (const p of list) {
      pts.push(p);
      flags.push(edge);
    }
  };

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cx = col * cell + cell / 2;
      const cy = row * cell + cell / 2;

      push(samplePolyline(octagonPoints(cx, cy, octR), Math.ceil(octSeg), true), 1);

      const [square, diamond] = starSquares(cx, cy, starR);
      push(samplePolyline(square, Math.ceil(starSeg), true), 0);
      push(samplePolyline(diamond, Math.ceil(starSeg), true), 0);

      if (col < cols - 1) {
        push(
          samplePolyline(
            [
              { x: cx + octR * 0.92, y: cy },
              { x: cx + cell - octR * 0.92, y: cy },
            ],
            Math.ceil(octSeg),
            false,
          ),
          1,
        );
      }
      if (row < rows - 1) {
        push(
          samplePolyline(
            [
              { x: cx, y: cy + octR * 0.92 },
              { x: cx, y: cy + cell - octR * 0.92 },
            ],
            Math.ceil(octSeg),
            false,
          ),
          1,
        );
      }
    }
  }

  const count = pts.length;
  const positions = new Float32Array(count * 3);
  const edgeFlags = new Float32Array(count);
  const scale = extent / size;
  const half = size / 2;

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (pts[i].x - half) * scale;
    // SVG y grows downward, world y grows up.
    positions[i * 3 + 1] = -(pts[i].y - half) * scale;
    // A shallow, deterministic depth ripple so the screen reads as carved
    // stone with relief rather than a flat decal.
    positions[i * 3 + 2] =
      Math.sin(pts[i].x * 0.018) * Math.cos(pts[i].y * 0.018) * extent * 0.05;
    edgeFlags[i] = flags[i];
  }

  return { positions, edgeFlags, count };
}
