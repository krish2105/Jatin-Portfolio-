"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in the reading band of the viewport, for
 * the nav's active state. Uses one observer over all sections; setState fires
 * from the observer callback, not synchronously during the effect.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A narrow band near the top: the section under the nav is "current".
      { rootMargin: "-18% 0px -74% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
