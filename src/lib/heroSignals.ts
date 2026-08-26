/**
 * The channel between the hero CTA and the 3D scene.
 *
 * This is a DOM attribute rather than a module-scoped variable on purpose.
 * The CTA lives in the main page chunk and the scene lives in a lazily
 * imported one; when the bundler inlines a small shared module into both
 * chunks, each ends up with its own copy of the variable and the signal
 * silently never arrives. That failed only in the production build, which is
 * the worst place to find it. An attribute on <html> has exactly one instance
 * no matter how the code is split — and it is inspectable in devtools.
 *
 * The scene reads this inside its render loop, so this must not trigger a
 * React re-render either.
 */

const ATTRIBUTE = "data-pinch";

export const setPinching = (value: boolean) => {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute(ATTRIBUTE, value ? "1" : "0");
};

export const isPinching = () =>
  typeof document !== "undefined" &&
  document.documentElement.getAttribute(ATTRIBUTE) === "1";
