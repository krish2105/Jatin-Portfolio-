"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { buildLatticeCloud } from "./latticeGeometry";
import { buildHandCloud } from "./handGeometry";
import { fieldFragmentShader, fieldVertexShader } from "./shaders";
import { isPinching } from "@/lib/heroSignals";

const EXTENT = 6;
const FULL_POINTS = 10_000;
const LOW_POINTS = 3_000;
/** No pointer movement for this long and the ambient wave takes over. */
const IDLE_MS = 4_000;

function readColor(name: string, fallback: string) {
  if (typeof window === "undefined") return new THREE.Color(fallback);
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return new THREE.Color(raw || fallback);
}

function Field({
  lowPower,
  onDegrade,
}: {
  lowPower: boolean;
  onDegrade: () => void;
}) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const geometry = useMemo(() => {
    const lattice = buildLatticeCloud(
      lowPower ? LOW_POINTS : FULL_POINTS,
      EXTENT,
    );
    const hand = buildHandCloud(lattice.count, EXTENT);

    const seeds = new Float32Array(lattice.count);
    // Deterministic pseudo-random: the same field every load, and no
    // Math.random() to make the scene non-reproducible.
    for (let i = 0; i < lattice.count; i += 1) {
      seeds[i] = ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(lattice.positions, 3));
    geo.setAttribute("aHand", new THREE.BufferAttribute(hand.positions, 3));
    geo.setAttribute("aEdge", new THREE.BufferAttribute(lattice.edgeFlags, 1));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.computeBoundingSphere();
    return geo;
  }, [lowPower]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(999, 999) },
      uPointerActive: { value: 0 },
      uAmbient: { value: 1 },
      uMorph: { value: 0 },
      uScroll: { value: 0 },
      uSize: { value: 26 },
      uDpr: { value: 1 },
      uRadius: { value: 2.4 },
      uRotation: { value: 0 },
      uAccent: { value: readColor("--accent", "#2dd4bf") },
      uSignature: { value: readColor("--signature", "#c9a227") },
      uOpacity: { value: 1 },
      uEdgeAlpha: { value: 0.72 },
      uFieldAlpha: { value: 0.3 },
    }),
    [],
  );

  /* Colours live in CSS, so the scene follows the theme toggle. Written
     through the live material rather than the memoised uniforms object. */
  useEffect(() => {
    const sync = () => {
      const u = material.current?.uniforms;
      if (!u) return;
      u.uAccent.value = readColor("--accent", "#2dd4bf");
      u.uSignature.value = readColor("--signature", "#c9a227");
      // Brass needs more presence against a light ground, exactly as in the
      // SVG fallback.
      const light =
        document.documentElement.getAttribute("data-theme") === "light";
      u.uEdgeAlpha.value = light ? 0.9 : 0.72;
      u.uFieldAlpha.value = light ? 0.45 : 0.3;
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  /* Pointer tracking, in normalised device space. Touch drives it too. */
  const pointer = useRef({ x: 999, y: 999, lastMove: -Infinity, active: 0 });

  useEffect(() => {
    if (lowPower) return; // State 2 is disabled on low-power devices

    const track = (clientX: number, clientY: number) => {
      pointer.current.x = (clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(clientY / window.innerHeight) * 2 + 1;
      pointer.current.lastMove = performance.now();
    };

    const onMouse = (event: MouseEvent) => track(event.clientX, event.clientY);
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) track(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [lowPower]);

  /* Runtime watchdog: a device that claims to be capable but cannot hold
     frame time gets dropped to the static SVG and stays there. */
  const slowSince = useRef<number | null>(null);
  const morph = useRef(0);
  const rotation = useRef(0);

  useFrame((state, delta) => {
    if (document.hidden) return;

    const dt = Math.min(delta, 0.05);
    const now = performance.now();

    // --- watchdog -----------------------------------------------------
    // Sustained frame time over 20ms for two seconds means this device cannot
    // carry the scene, so drop to the static SVG and stay there.
    //
    // Frames longer than 100ms are ignored rather than counted: a backgrounded
    // or occluded tab has its rAF throttled to a few frames a second, and
    // counting those would degrade the hero permanently for anyone who simply
    // switched tabs and came back.
    if (delta > 0.02 && delta < 0.1) {
      slowSince.current ??= now;
      if (now - slowSince.current > 2000) onDegrade();
    } else {
      slowSince.current = null;
    }

    const material_ = material.current;
    const points_ = points.current;
    if (!material_ || !points_) return;

    const u = material_.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uDpr.value = Math.min(state.gl.getPixelRatio(), 2);

    // --- STATE 1: slow rotation on Y ----------------------------------
    // Applied in the shader, not on the object, so the cursor response below
    // can be computed in world space and stay exact at every angle.
    rotation.current += dt * 0.05;
    u.uRotation.value = rotation.current;

    // --- STATE 2: pointer as depth sensor -----------------------------
    const idle = now - pointer.current.lastMove > IDLE_MS;
    const targetActive = lowPower || idle ? 0 : 1;
    pointer.current.active +=
      (targetActive - pointer.current.active) * Math.min(1, dt * 4);
    u.uPointerActive.value = pointer.current.active;
    u.uAmbient.value = 1 - pointer.current.active * 0.8;

    // The pointer stays in world space; the shader rotates the field before
    // measuring against it.
    u.uPointer.value.set(
      pointer.current.x * viewport.width * 0.5,
      pointer.current.y * viewport.height * 0.5,
    );

    // --- STATE 3: CTA hover morphs the lattice into the pinch ---------
    const target = isPinching() ? 1 : 0;
    // ~900ms to complete, critically damped enough not to overshoot.
    morph.current += (target - morph.current) * Math.min(1, dt * 4.6);
    u.uMorph.value = morph.current;

    // --- STATE 4: scroll dolly + dispersal ----------------------------
    const progress = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    u.uScroll.value = progress;
    u.uOpacity.value = 1 - progress * 0.72;
    state.camera.position.z = 11 + progress * 5;
  });

  useEffect(() => {
    // Point size has to track viewport height or the field looks coarse on
    // a phone and sparse on a large display.
    if (material.current) {
      material.current.uniforms.uSize.value = Math.max(
        16,
        Math.min(34, size.height * 0.03),
      );
    }
  }, [size.height]);

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={fieldVertexShader}
        fragmentShader={fieldFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
        toneMapped={false}
      />
    </points>
  );
}

export default function JaaliField({
  lowPower,
  onDegrade,
  onReady,
}: {
  lowPower: boolean;
  onDegrade: () => void;
  onReady: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 11], fov: 42 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      onCreated={onReady}
    >
      <Field lowPower={lowPower} onDegrade={onDegrade} />
    </Canvas>
  );
}
