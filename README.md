# Jatin Acharya — Portfolio

A personal portfolio for **Jatin Acharya**, Oracle NetSuite Functional Consultant
and AI/ML engineer. The site argues one thesis: he implements the enterprise
systems companies actually run on, *and* builds the computer-vision models that
make them smarter.

Design direction: **VISION MESH** — the colour and motion language of computer
vision (depth maps, point clouds, thermal teal), geometry borrowed from
Rajasthani jaali lattice work, and the typographic discipline of financial
ledgers and ERP interfaces.

Live: <https://jatin-acharya.vercel.app>

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, `src/`) |
| Styling | Tailwind CSS v4 — CSS-first via `@theme`, no `tailwind.config` |
| Motion | [`motion`](https://motion.dev) v13 — import from `motion/react`, **not** `framer-motion` |
| 3D | `@react-three/fiber` + `@react-three/drei` + `three` |
| Smooth scroll | `lenis` (disabled under `prefers-reduced-motion`) |
| Icons | `lucide-react` |
| Fonts | Bricolage Grotesque (display) · Geist Sans (body) · Geist Mono (data) |
| Deploy | Vercel |

Every dependency earns its weight. No GSAP, no component library, no state
management library.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build     # production build — must pass with zero errors and warnings
npm run lint      # ESLint, including the React Compiler rules
npx tsc --noEmit  # type check
```

---

## Where to edit content

**All copy lives in one file: [`src/data/portfolio.ts`](src/data/portfolio.ts).**
Nothing in `src/components` hard-codes text. To change what the site says, edit
that file — the types in [`src/types/portfolio.ts`](src/types/portfolio.ts) will
tell you if something is missing.

| Export | Drives |
|---|---|
| `profile` | Name, role, location, email, phone, LinkedIn, GitHub |
| `hero` | Eyebrow, display name, rotating words, sub-line, CTA labels |
| `ticker` | The infinite marquee of skills |
| `stacks` | The Two Stacks section — SYSTEMS / MODELS / THE SEAM |
| `experience` | The Ledger. Reverse chronological; each entry may hold several roles |
| `education` | Degree, specialisation, CGPA |
| `builds` | The three project case studies |
| `deliveryStages` | The seven NetSuite implementation stages and what Jatin owns in each |
| `netsuiteModules` | The functional areas he has configured |
| `recordTiles` | The bento grid of achievements |
| `skillGroups` | Systems / Models / Languages / Learning |
| `now`, `contact` | The Now and Contact sections |
| `navItems` | Nav labels and their section anchors |
| `siteMeta` | Canonical URL, SEO title/description, portrait alt text |

### A note on metrics

Jatin's resume carries percentage claims ("40% reduction", "30% accuracy
improvement") with no stated baseline. They are **deliberately omitted** from
this site — a sharp interviewer will ask what they're measured against, and a
portfolio that overclaims is worse than one that underclaims. What appears is
verifiable: the hackathon win, the 10,000+ image dataset, 30fps real-time
tracking. If baselines surface, add the numbers back *with the baseline stated*.

---

## Design tokens

Seven tokens in [`src/app/globals.css`](src/app/globals.css). Every colour on
the site derives from them — there are no ad-hoc hexes in components.

| Token | Dark (default) | Light | Used for |
|---|---|---|---|
| `ground` | `#070A0F` | `#F6F8FA` | Page background |
| `surface` | `#0E141C` | `#FFFFFF` | Cards, bento tiles, modals |
| `edge` | `#1B2530` | `#E1E7ED` | Hairlines, borders, dividers |
| `text` | `#E6EDF3` | `#070A0F` | Body copy |
| `muted` | `#7D8B9A` | `#5A6875` | Captions, labels, metadata |
| `accent` | `#2DD4BF` | `#0D9488` | Links, active states, 3D emission |
| `signature` | `#C9A227` | `#8C6D12` | The hero lattice edges — **one place only** |

Dark is the default and was designed first. Light is a separate design, not an
inversion.

**The brass `signature` colour appears in exactly one place on the entire
site:** the illuminated edges of the hero lattice and its SVG fallback. Not on
buttons, not on headings, not on hover states. Its scarcity is what makes it
read as expensive. If you find yourself using brass twice, the design is broken.

### The one derived token

`accent-ink` exists because in light mode the raw accent (`#0D9488`) measures
**3.52:1** against `ground` — enough for large text and UI chrome, short of the
4.5:1 body-text floor. `accent-ink` (`#0A6E66`) measures **5.74:1** and is used
wherever accent carries running text. In dark mode accent already measures
10.65:1, so the two are identical there.

Measured contrast, both themes:

| Pair | Dark | Light |
|---|---|---|
| text / ground | 16.78 | 18.62 |
| text / surface | 15.65 | 19.82 |
| muted / ground | 5.69 | 5.37 |
| muted / surface | 5.31 | 5.72 |
| accent-ink / ground | 10.65 | 5.74 |

### Theming

The theme is an attribute on `<html data-theme="dark|light">`, written **before
first paint** by a blocking inline script in the layout, so there is no flash.
It persists to `localStorage` and respects `prefers-color-scheme` on first
visit.

The toggle sweeps a clip-path circle of the incoming background colour out from
the button, swaps the theme underneath once it covers the viewport, then drops
the overlay. It **deliberately does not use the View Transitions API**: that
snapshots the entire viewport twice to animate what is only ever a colour
change, and this page has a multi-megapixel WebGL canvas in it. Measured on a
laptop the old version's worst frame was 25ms; the overlay is 9ms, and on a
large display the gap is far wider. Instant swap under reduced motion, and if
the animation never fires the theme still applies — the animation is never
load-bearing.

### Depth in dark mode

Elevation comes from surface lightness, not shadow — a shadow on near-black is
invisible. The ladder is `ground` → `surface` → `raised`, each step a slightly
lighter blue-tinted grey, plus a 1px inner top highlight (`--edge-light`) that
implies a light source. Large panels carry a faint directional wash so they are
not one dead flat value corner to corner, soft accent glows sit behind content
at no more than 0.16 alpha, and a film-grain overlay breaks up the banding that
dark gradients produce on 8-bit panels.

Measured worst-case body contrast after all of it: **4.87:1 dark, 5.37:1
light**.

---

## Swapping images

Source images live in `_assets/`. Converted, sized WebP goes in `public/`.

```bash
cwebp -q 82 -m 6 -mt _assets/portrait-source.png -o public/portrait.webp
```

| File | Purpose |
|---|---|
| `public/portrait.webp` | Hero portrait. 928×1152, 48 KB. Rendered with `next/image` and `priority`. |
| `public/favicon.svg` | Jaali cell — octagon and eight-point star |
| `public/resume/Jatin_Acharya_Resume.pdf` | Served by the "Download resume" CTA |

Update the alt text in `siteMeta.portraitAlt` whenever the portrait changes —
it describes the image content, not the filename.

> ### ⚠️ The resume PDF is out of date
>
> `public/resume/Jatin_Acharya_Resume.pdf` still describes Jatin as a *"Senior
> Undergraduate"* with an *"Expected 2025"* graduation, does not list the Pune
> role at EPIQ Softech, and carries the unsourced percentage claims this site
> deliberately drops. **Replace this file before sharing the site.** It is a
> single-file swap — the path and the CTA do not change.

---

## Deploying to Vercel

The repo is wired to Vercel; pushes to `main` deploy automatically.

To deploy manually:

```bash
npx vercel        # preview deployment
npx vercel --prod # production
```

After the first production deploy, set the real domain in `siteMeta.url`
(`src/data/portfolio.ts`) so canonical URLs, Open Graph tags, JSON-LD and
`sitemap.xml` all point at the right host.

---

## For hiring teams

Three features exist specifically for the people doing the hiring. All three
are **deterministic** — plain string matching over `portfolio.ts`, no language
model anywhere. They can under-report, but they cannot fabricate.

| Feature | What it does |
|---|---|
| Copy hiring summary | Puts an ATS-ready plain-text summary on the clipboard, assembled from the same data the page renders |
| JD matcher | Paste a job description; it reports which capabilities are covered, in the browser, with nothing uploaded |
| Recruiter / Technical view | Reorders project cards and case studies to lead with outcome or with approach. Nothing is ever hidden from either reader |
| ⌘K palette | Jump to any section, copy the email or summary, download the resume, switch theme or view |

The JD matcher reports a **count of matched capabilities**, not a fit
percentage. An earlier version led with a percentage and a NetSuite-only role
scored 28% while matching every requirement in the posting — the number read
as a rejection when it was actually describing how much of a two-sided
(ERP + ML) capability surface a single-sided role happens to touch. The
percentage is still shown, clearly labelled as overlap rather than fit.

## The NetSuite delivery section

The spine of the ERP half of the site. Seven stages — Discovery, Fit/gap,
Configuration, Functional testing, Training, Go-live, Hypercare — each with
what Jatin personally owns at that point.

The stage descriptions are standard ERP practice. Every line under
"What Jatin owns here" is drawn strictly from his stated experience. **If you
edit `deliveryStages`, keep that separation** — the section is credible
precisely because it never claims scope he has not worked in.

## The contact form

Composes the message into the sender's own mail client rather than posting to
a server. That is deliberate: a hosted form needs an API key in the
deployment, a spam story, and a place for messages to be silently lost when
the key rotates. This way the message lands in the sender's Sent folder, Jatin
replies from his real inbox, and there is no credential to leak. The UI says
exactly what will happen before it happens.

## The hero scene

One React Three Fiber particle system, ~9,500 points (~2,800 on low-power
devices), doing four things:

1. **At rest** — the points settle into a jaali lattice and oscillate on Y at
   a peak 0.05 rad/s. Structural edges emit brass; field points are teal.
   The rotation oscillates rather than spinning through a full revolution: the
   lattice is a flat plane, so a continuous spin turned it edge-on twice per
   revolution and the hero collapsed to a thin vertical band for seconds at a
   time.
2. **Cursor as depth sensor** — points near the pointer displace along +Z with
   a smooth falloff, like a depth map responding to a hand entering frame.
   After 4s without pointer movement a slow ambient wave takes over.
3. **CTA hover** — the lattice morphs into a wireframe hand in a pinch
   gesture, a callback to the Virtual Mouse project. Focus triggers it too, so
   keyboard users get the same moment.
4. **Scroll** — the camera dollies back and the field disperses into a sparse
   ambient backdrop.

All four are GPU-side: the morph is a lerp between two position buffers and
the geometry is never rebuilt. The lattice and the SVG fallback are generated
by the same code (`latticeGeometry.ts`), so they are one object drawn two
ways.

### When the 3D does not run

| Condition | Result |
|---|---|
| No WebGL | Static SVG lattice |
| `prefers-reduced-motion` | Static SVG, no float animation |
| Frame time > 20ms for 2s | Drops to the SVG, permanently for that page load |
| `hardwareConcurrency <= 4` or `deviceMemory <= 4` | 3D at 3,000 points, no cursor displacement |
| Hero scrolled out of view | Render loop stopped (`frameloop="never"` — no rAF, no draw calls, no GPU work). The context idles; it is not torn down |
| `document.hidden` | Render loop paused |

`dpr` is capped at `[1, 2]`. The scene is `next/dynamic` with `ssr: false`, so
it is not in the initial bundle and first paint never waits on it.

The watchdog ignores frames longer than 100ms: a backgrounded tab has its rAF
throttled to a few frames a second, and counting those would permanently
degrade the hero for anyone who switched tabs and came back.

## Roadmap

- [x] **Phase 1** — scaffold, design tokens, fonts, theme system, all content in `portfolio.ts`
- [x] **Phase 2** — every section, static and correct, in both themes
- [x] **Phase 3** — the R3F jaali particle scene, fallback path verified first
- [x] **Phase 4** — orchestrated motion
- [x] **Phase 5** — accessibility and quality pass

## Accessibility floor

Verified against the running production build, not assumed:

- Semantic HTML, one `<h1>`, correct heading hierarchy, real landmarks
- Skip link, visible `:focus-visible` rings globally, logical tab order
- Modals and the mobile menu are proper dialogs: focus trap, ESC to close, body
  scroll lock, focus returned to the trigger
- Body text contrast ≥ 4.5:1 in **both** themes
- `prefers-reduced-motion`: no Lenis, no preloader, no parallax, no 3D, no
  marquee — content fully readable and usable
- Only `transform` and `opacity` animate on scroll
- `backdrop-filter` on the nav only
- Works down to 360px with no horizontal scroll; all tap targets ≥ 44×44px


## Notes for whoever picks this up

**`useReducedMotion` is ours, not Motion's** (`src/hooks/useReducedMotion.ts`).
Motion's version reads the media query during the first client render, which
the server cannot match — every component that branched on it produced a
different tree than the HTML the server sent, React threw a hydration error
and rebuilt the document, and the `data-theme` attribute set by the pre-paint
script went with it. Reduced-motion users got the wrong theme and an empty
theme toggle. Ours is built on `useSyncExternalStore`, which is the supported
way to read browser-only state during SSR. Please do not swap it back.

**`ThemeGuard`** re-asserts `data-theme` after hydration. It costs one
attribute write and makes the failure above impossible even if some future
component reintroduces a mismatch.

**The pinch signal is a DOM attribute**, not a module variable
(`src/lib/heroSignals.ts`). The CTA lives in the main chunk and the scene in a
lazily imported one; when the bundler inlined the shared module into both,
each got its own copy and the signal silently never arrived — in the
production build only.

**The Builds track measures against its clipping viewport**, not itself. It is
`w-max` on desktop, so its own `scrollWidth` and `clientWidth` are always
equal and the travel distance came out as zero.

**`overflow-x: clip` has to sit on `<html>`**, not only `<body>`. The Builds
swipe gallery is a nested horizontal scroller whose content still reached the
viewport scroll box, and the page scrolled sideways at 360px.

**Never unmount the R3F Canvas.** The scene used to be torn down when the
hero scrolled out of view. That raced React's own removal of the surrounding
nodes — each tried to remove a node the other had already taken, and the
resulting `NotFoundError` did not merely log: it propagated and unmounted the
entire page, leaving a blank document. It reproduced reliably on
scroll-past-and-back, in production. The loop is paused instead. Holding one
idle WebGL context costs nothing measurable; crashing the page costs
everything.

**The hero entrance is CSS, not Motion, and must stay that way.** The first
version animated from `opacity: 0` with Motion, which meant the name, the copy
and both CTAs were invisible until a script finished — a stalled, throttled or
failed animation left the hero as bare lattice with no content in it. The
keyframes now use `animation-fill-mode: backwards`, so the element's real
state is visible and the animation only borrows it backwards through the
delay. No JS, no problem: the content is simply there.

**The rotating line is sized by a hidden copy of the longest string**, not by
`ch` units. `ch` is the advance of "0", which is not the advance of a letter
even in a monospaced face — the box came out exactly as wide as the text and
"ERP implementations" clipped.
