"use client";

import { useSyncExternalStore } from "react";

/* Detection runs once per page load and is cached at module scope: the answer
   cannot change without a reload, and useSyncExternalStore requires a snapshot
   that is stable between reads. */

let cached: boolean | null = null;

function detect(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    if (!gl) return false;
    // Release the probe context immediately; browsers cap how many may exist.
    const lose = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

const getSnapshot = () => (cached ??= detect());
const subscribe = () => () => {};

/** Whether this browser can create a WebGL context at all. */
export const useWebGL = () => useSyncExternalStore(subscribe, getSnapshot, () => false);
