import type { Vec2 } from "./latticeGeometry";

/**
 * Target positions for State 3: a wireframe hand in a pinch gesture.
 *
 * This is a direct callback to the Virtual Mouse project — hand landmark
 * tracking mapped to cursor control. Someone who knows that work should
 * recognise the shape.
 *
 * The outline is generated rather than hand-plotted so fingers stay
 * consistent, and it is resampled to an exact point count so the GPU can lerp
 * between this buffer and the lattice buffer without rebuilding geometry.
 */

const RAD = Math.PI / 180;

interface FingerSpec {
  /** Knuckle position, hand space (roughly -1..1, y up) */
  base: Vec2;
  /** Degrees, 90 = straight up */
  angle: number;
  length: number;
  width: number;
  /** Total bend along the finger, degrees. Negative curls clockwise. */
  curl: number;
}

/**
 * A finger as a closed outline: one side up the centreline, a rounded tip,
 * the other side back down.
 */
function fingerOutline(spec: FingerSpec): Vec2[] {
  const STEPS = 14;
  const centre: Vec2[] = [];
  const normals: Vec2[] = [];

  let x = spec.base.x;
  let y = spec.base.y;
  const step = spec.length / STEPS;

  for (let i = 0; i <= STEPS; i += 1) {
    const t = i / STEPS;
    // Curl accelerates toward the tip, the way a real finger folds.
    const angle = (spec.angle + spec.curl * t * t) * RAD;
    centre.push({ x, y });
    normals.push({ x: Math.sin(angle), y: -Math.cos(angle) });
    x += Math.cos(angle) * step;
    y += Math.sin(angle) * step;
  }

  const half = spec.width / 2;
  const left: Vec2[] = centre.map((p, i) => ({
    x: p.x - normals[i].x * half,
    y: p.y - normals[i].y * half,
  }));
  const right: Vec2[] = centre.map((p, i) => ({
    x: p.x + normals[i].x * half,
    y: p.y + normals[i].y * half,
  }));

  // Semicircular tip cap swept from the left side round to the right.
  const tip = centre[centre.length - 1];
  const tipAngle = (spec.angle + spec.curl) * RAD;
  const cap: Vec2[] = [];
  for (let i = 1; i < 8; i += 1) {
    const a = tipAngle - Math.PI / 2 + (Math.PI * i) / 8;
    cap.push({
      x: tip.x + Math.cos(a) * half,
      y: tip.y + Math.sin(a) * half,
    });
  }

  return [...left, ...cap, ...right.reverse()];
}

/** Palm and wrist — a closed slab the fingers sit on. */
const PALM: Vec2[] = [
  { x: -0.28, y: -0.95 },
  { x: 0.24, y: -0.95 },
  { x: 0.40, y: -0.52 },
  { x: 0.46, y: -0.30 },
  { x: 0.44, y: -0.06 },
  { x: 0.40, y: 0.04 },
  { x: 0.12, y: 0.09 },
  { x: -0.14, y: 0.09 },
  { x: -0.38, y: 0.02 },
  { x: -0.48, y: -0.22 },
  { x: -0.44, y: -0.60 },
];

/* Index and thumb are aimed so their tips meet — that meeting point IS the
   gesture. The other three stay extended so the hand still reads as a hand. */
const FINGERS: FingerSpec[] = [
  // pinky
  { base: { x: -0.40, y: -0.04 }, angle: 104, length: 0.40, width: 0.15, curl: -6 },
  // ring
  { base: { x: -0.17, y: 0.04 }, angle: 96, length: 0.52, width: 0.16, curl: -4 },
  // middle
  { base: { x: 0.07, y: 0.05 }, angle: 89, length: 0.56, width: 0.16, curl: -3 },
  /* Index and thumb are the gesture. Their curls were solved numerically so
     both tips land on the same point — (0.62, 0.10) in hand space — because
     eyeballed values left a visible gap, and a pinch with a gap is just an
     open hand. */
  { base: { x: 0.30, y: 0.00 }, angle: 65, length: 0.49, width: 0.16, curl: -176 },
  { base: { x: 0.42, y: -0.32 }, angle: 36, length: 0.52, width: 0.18, curl: 98 },
];

function polylineLength(points: Vec2[], closed: boolean): number {
  let total = 0;
  const n = closed ? points.length : points.length - 1;
  for (let i = 0; i < n; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    total += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return total;
}

/** Walks a closed path, dropping `count` points at even arc-length spacing. */
function resample(points: Vec2[], count: number): Vec2[] {
  if (count <= 0) return [];
  const total = polylineLength(points, true);
  const spacing = total / count;
  const out: Vec2[] = [];

  let segment = 0;
  let carried = 0;

  while (out.length < count && segment < points.length) {
    const a = points[segment];
    const b = points[(segment + 1) % points.length];
    const segLength = Math.hypot(b.x - a.x, b.y - a.y);

    let position = carried;
    while (position <= segLength && out.length < count) {
      const t = segLength === 0 ? 0 : position / segLength;
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
      position += spacing;
    }
    carried = position - segLength;
    segment += 1;
  }

  // Arc-length rounding can leave the last slot or two empty.
  while (out.length < count) out.push(points[points.length - 1]);
  return out;
}

export interface HandCloud {
  positions: Float32Array;
  count: number;
}

/**
 * Exactly `count` points on the pinch silhouette, centred on the origin and
 * scaled to roughly match the lattice extent so the morph reads as the same
 * material rearranging rather than one shape replacing another.
 */
export function buildHandCloud(count: number, extent = 6): HandCloud {
  const outlines: Vec2[][] = [PALM, ...FINGERS.map(fingerOutline)];
  const lengths = outlines.map((o) => polylineLength(o, true));
  const totalLength = lengths.reduce((sum, l) => sum + l, 0);

  const positions = new Float32Array(count * 3);
  const scale = extent * 0.4;

  let written = 0;
  outlines.forEach((outline, index) => {
    const isLast = index === outlines.length - 1;
    const share = isLast
      ? count - written
      : Math.round((lengths[index] / totalLength) * count);
    const sampled = resample(outline, share);

    for (const point of sampled) {
      const i = written * 3;
      positions[i] = point.x * scale;
      // Lift the whole hand so it sits centred in frame.
      positions[i + 1] = (point.y + 0.12) * scale;
      // Slight forward bow, so the silhouette has a little volume.
      positions[i + 2] =
        Math.cos(point.x * 1.6) * Math.cos(point.y * 1.1) * extent * 0.045;
      written += 1;
    }
  });

  return { positions, count };
}
