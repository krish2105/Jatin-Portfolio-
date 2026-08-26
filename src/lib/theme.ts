export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "vision-mesh-theme";

/**
 * Runs as a blocking inline script in <head>, before first paint, so the
 * correct theme is on <html> and there is no flash. Kept dependency-free and
 * stringified — it cannot reference anything outside its own body.
 */
export const noFlashScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;
