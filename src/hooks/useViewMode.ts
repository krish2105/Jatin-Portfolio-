"use client";

import { useCallback, useSyncExternalStore } from "react";
import { VIEW_ATTRIBUTE, applyViewMode, readViewMode } from "@/lib/viewMode";
import type { ViewMode } from "@/types/portfolio";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [VIEW_ATTRIBUTE],
  });
  return () => observer.disconnect();
}

/** Like the theme: external state on <html>, read through the store API. */
export function useViewMode() {
  const mode = useSyncExternalStore(
    subscribe,
    readViewMode,
    () => "recruiter" as const,
  );

  const setMode = useCallback((next: ViewMode) => applyViewMode(next), []);
  const toggle = useCallback(
    () => applyViewMode(readViewMode() === "recruiter" ? "technical" : "recruiter"),
    [],
  );

  return { mode, setMode, toggle };
}
