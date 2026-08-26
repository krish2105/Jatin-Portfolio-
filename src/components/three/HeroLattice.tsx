"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { useWebGL } from "@/hooks/useWebGL";
import { useLowPower } from "@/hooks/useLowPower";
import { StaticLattice } from "./StaticLattice";
import { cn } from "@/lib/utils";

/* The entire R3F scene is lazy-loaded and never server-rendered, so it is not
   in the initial bundle and first paint never waits on it.

   `loading` is null on purpose: the SVG below is a permanent layer rather than
   a Suspense fallback. Swapping an SSR'd SVG for a Canvas inside the boundary
   made React try to remove nodes R3F had already taken ownership of, which
   threw NotFoundError on every load. Keeping the SVG mounted and simply
   fading it out means nothing is ever removed from under React, and it also
   removes the flash between the two. */
const JaaliField = dynamic(() => import("./JaaliField"), {
  ssr: false,
  loading: () => null,
});

/**
 * Decides what the hero shows.
 *
 *   no WebGL               -> static SVG
 *   prefers-reduced-motion -> static SVG, and no CSS float either
 *   runtime frame drop     -> static SVG, permanently for this page load
 *   low-power device       -> 3D at 3,000 points, no cursor displacement
 *   otherwise              -> the full field
 *
 * The scene is unmounted whenever the hero leaves the viewport, so no WebGL
 * context is left running behind the rest of the page.
 */
export function HeroLattice({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const webgl = useWebGL();
  const lowPower = useLowPower();

  const [degraded, setDegraded] = useState(false);
  const [inView, setInView] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const degradedOnce = useRef(false);

  useEffect(() => {
    const element = container.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "15% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleDegrade = useCallback(() => {
    if (degradedOnce.current) return;
    degradedOnce.current = true;
    setDegraded(true);
  }, []);

  const handleReady = useCallback(() => setSceneReady(true), []);

  const use3D = webgl && !reduce && !degraded;
  const showScene = use3D && inView;

  return (
    <div ref={container} aria-hidden className={className}>
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          showScene && sceneReady ? "opacity-0" : "opacity-100",
        )}
      >
        <StaticLattice animate={!reduce} />
      </div>

      {showScene && (
        <div className="absolute inset-0">
          <JaaliField
            lowPower={lowPower}
            onDegrade={handleDegrade}
            onReady={handleReady}
          />
        </div>
      )}
    </div>
  );
}
