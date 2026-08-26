# Jatin Acharya — Portfolio

A personal portfolio for **Jatin Acharya**, Oracle NetSuite Functional Consultant
and AI/ML engineer. The site argues one thesis: he implements the enterprise
systems companies actually run on, *and* builds the computer-vision models that
make them smarter.

Design direction: **VISION MESH** — the colour and motion language of computer
vision (depth maps, point clouds, thermal teal), geometry borrowed from
Rajasthani jaali lattice work, and the typographic discipline of financial
ledgers and ERP interfaces.

> **Status: in progress.** Phase 1 (foundation) is complete. Sections, the 3D
> hero and motion are still being built — see [Roadmap](#roadmap).

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
visit. The toggle expands a circular wipe from the button using the View
Transitions API, falling back to an instant swap where unsupported or under
reduced motion.

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

## Roadmap

- [x] **Phase 1** — scaffold, design tokens, fonts, theme system, all content in `portfolio.ts`
- [ ] **Phase 2** — every section, static and correct, in both themes
- [ ] **Phase 3** — the R3F jaali particle scene, fallback path first
- [ ] **Phase 4** — orchestrated motion
- [ ] **Phase 5** — accessibility and quality pass

## Accessibility floor

Non-negotiable, and checked before the site is called done:

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
