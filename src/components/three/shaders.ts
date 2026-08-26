/**
 * Shaders for the jaali point field.
 *
 * Everything that moves happens here, on the GPU: the lattice→hand morph is a
 * lerp between two position buffers, the cursor depth response is a distance
 * falloff, and the scroll dispersal is a scale. Geometry is never rebuilt.
 *
 * (Kept as strings rather than .vert/.frag files so no bundler loader has to
 * be configured — Turbopack and Webpack both handle this identically.)
 */

export const fieldVertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uPointer;        // pointer in world space, on the field plane
  uniform float uPointerActive;  // 0 = no pointer influence, 1 = full
  uniform float uAmbient;        // idle sine takeover, 0..1
  uniform float uMorph;          // 0 = lattice, 1 = pinch hand
  uniform float uScroll;         // 0 = hero in frame, 1 = hero gone
  uniform float uRotation;       // State 1 spin, radians
  uniform float uSize;
  uniform float uDpr;
  uniform float uRadius;

  attribute vec3  aHand;
  attribute float aEdge;
  attribute float aSeed;

  varying float vEdge;
  varying float vDepth;

  void main() {
    // STATE 3 — GPU-side lerp between the two position buffers.
    vec3 pos = mix(position, aHand, uMorph);

    // STATE 4 — as the hero leaves, the field spreads and thins into an
    // ambient backdrop rather than simply fading out.
    pos.xy *= 1.0 + uScroll * 0.85;
    pos.z += uScroll * (aSeed - 0.5) * 5.0;

    // STATE 1 — the slow Y spin happens here, not on the object, so that
    // everything below can work in world space. Displacing the field after
    // the rotation is what keeps the cursor response landing exactly under
    // the cursor at every angle.
    float c = cos(uRotation);
    float s = sin(uRotation);
    vec3 p = vec3(pos.x * c + pos.z * s, pos.y, -pos.x * s + pos.z * c);

    // STATE 2b — when no pointer has moved for a while, a slow wave takes
    // over so the scene never looks dead.
    float wave = sin(p.x * 0.85 + uTime * 0.5) * cos(p.y * 0.75 - uTime * 0.38);
    p.z += wave * 0.3 * uAmbient;

    // STATE 2 — cursor as depth sensor. Points near the pointer rise along
    // +Z, magnitude falling off smoothly with distance, like a depth map
    // responding to a hand entering frame.
    float d = distance(p.xy, uPointer);
    float falloff = 1.0 - smoothstep(0.0, uRadius, d);
    p.z += falloff * falloff * 1.9 * uPointerActive;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mvPosition.z;
    vEdge = aEdge;

    gl_Position = projectionMatrix * mvPosition;
    // Structural points sit slightly larger so the skeleton reads first.
    gl_PointSize = (uSize * (1.0 + aEdge * 0.45) * uDpr) / max(vDepth, 0.001);
  }
`;

export const fieldFragmentShader = /* glsl */ `
  uniform vec3  uAccent;
  uniform vec3  uSignature;
  uniform float uOpacity;
  uniform float uEdgeAlpha;
  uniform float uFieldAlpha;

  varying float vEdge;
  varying float vDepth;

  void main() {
    // Round the square point sprite off, with a soft rim.
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;
    float mask = 1.0 - smoothstep(0.24, 0.5, dist);

    // The ONLY brass on the site: structural edges of the lattice.
    vec3 color = mix(uAccent, uSignature, vEdge);
    float alpha = mix(uFieldAlpha, uEdgeAlpha, vEdge) * mask * uOpacity;

    // Depth falloff so the far side of the screen recedes into the ground.
    alpha *= clamp(1.55 - vDepth * 0.05, 0.12, 1.0);

    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
  }
`;
