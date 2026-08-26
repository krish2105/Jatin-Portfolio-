"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Media query state, read through the store API so it never sets state in an effect. */
export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => serverValue);
}

/** True on devices whose primary input is touch — no hover, no custom cursor. */
export const useIsTouch = () => useMediaQuery("(pointer: coarse)");
