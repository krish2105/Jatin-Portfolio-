import type { ViewMode } from "@/types/portfolio";

export const VIEW_STORAGE_KEY = "vision-mesh-view";
export const VIEW_ATTRIBUTE = "data-view";

/**
 * Recruiter mode leads with delivery and outcome. Technical mode leads with
 * approach and stack. Same content either way — only the order and emphasis
 * change, so nothing is ever hidden from either reader.
 *
 * Set before first paint alongside the theme, for the same reason: the mode
 * changes layout, and resolving it after hydration would visibly reflow.
 */
export const viewModeScript = `(function(){try{var k="${VIEW_STORAGE_KEY}";var s=localStorage.getItem(k);var v=(s==="technical"||s==="recruiter")?s:"recruiter";document.documentElement.setAttribute("${VIEW_ATTRIBUTE}",v);}catch(e){document.documentElement.setAttribute("${VIEW_ATTRIBUTE}","recruiter");}})();`;

export const readViewMode = (): ViewMode =>
  (document.documentElement.getAttribute(VIEW_ATTRIBUTE) as ViewMode | null) ??
  "recruiter";

export const applyViewMode = (mode: ViewMode) => {
  document.documentElement.setAttribute(VIEW_ATTRIBUTE, mode);
  try {
    localStorage.setItem(VIEW_STORAGE_KEY, mode);
  } catch {
    /* private mode — applies for this session */
  }
};
