"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Whether the user has asked for reduced motion.
 *
 * This replaces Motion's own useReducedMotion, which reads the media query
 * during the first client render. The server has no media queries, so every
 * component that branched on it produced a different tree on the client than
 * the server had sent — React threw hydration error #418 and rebuilt the
 * document, taking the pre-paint `data-theme` attribute with it.
 *
 * useSyncExternalStore is the supported way to read browser-only state during
 * SSR: React hydrates against getServerSnapshot (false), then re-renders with
 * the real value. No mismatch, and the branch still works.
 */
export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)", false);
