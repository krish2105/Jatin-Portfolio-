"use client";

import { useSyncExternalStore } from "react";

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

let cached: boolean | null = null;

function detect(): boolean {
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as NavigatorWithMemory).deviceMemory ?? 8;
  return cores <= 4 || memory <= 4;
}

const getSnapshot = () => (cached ??= detect());
const subscribe = () => () => {};

/**
 * Low-power devices get a reduced point count and no cursor displacement.
 * Errs toward "capable" when the browser reports nothing, because the runtime
 * frame-time watchdog in the scene will catch a device that lied.
 */
export const useLowPower = () =>
  useSyncExternalStore(subscribe, getSnapshot, () => false);
