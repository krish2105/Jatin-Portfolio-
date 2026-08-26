"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Lenis gives the page its weighted glide. Reduced-motion users get native
 * scroll — hijacking it for them is exactly the thing the preference asks us
 * not to do.
 *
 * This deliberately renders `children` unchanged in every case and attaches
 * Lenis in an effect, rather than wrapping in <ReactLenis> only when motion is
 * allowed. Swapping the wrapper in and out changed the shape of the tree
 * between the server render and the client render for reduced-motion users,
 * and React responded by discarding the server HTML and rebuilding the
 * document — which threw away the `data-theme` attribute the pre-paint script
 * had set, leaving them with the wrong theme and an empty theme toggle.
 * Same tree, always; only the side effect differs.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.11,
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduce]);

  return <>{children}</>;
}
