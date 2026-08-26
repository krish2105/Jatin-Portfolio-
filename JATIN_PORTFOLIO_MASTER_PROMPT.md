# MASTER PROMPT — Jatin Acharya 3D Portfolio

**How to use:** open an empty folder in Claude Code, then paste everything from `=== BEGIN ===` to `=== END ===` as your first message.

**Before you paste, fill in the ONE unknown** — search for `⚠️ FILL IN` below. There is exactly one.

---

## Optional: install the 21st.dev Magic MCP first

Not required — the prompt works without it and falls back to hand-built components. If you want it:

1. Get an API key at `21st.dev/magic/console`
2. Follow their Claude Code install instructions at `21st.dev/magic` (they publish the exact current command — don't guess it, it changes)
3. Verify with `/mcp` inside Claude Code

The prompt below tells Claude Code to use it for *scaffolding only* — bento cards, marquees, nav — and to hand-build the 3D and all motion. That's deliberate: MCP-generated components are generic, and the whole point here is that this site doesn't look generated.

---

```
=== BEGIN ===

You are the design lead and lead engineer on a personal portfolio for Jatin Acharya.
Read the `frontend-design` skill for aesthetic direction and the `premium-frontend`
skill for implementation patterns before you write any code. Read both fully.

This folder is empty. Scaffold everything from scratch.

Do not ask me to confirm the design direction — it is fully specified below. Build it.


## 0 — WHO THIS IS FOR AND WHAT THE PAGE'S JOB IS

Jatin Acharya, 22, Manipal University Jaipur B.Tech (Hons.) CSE with an AI & ML
specialisation, 9.37 CGPA. He now works full-time as an Oracle NetSuite Functional
Consultant in Pune.

The single job of this page: get him interviews for roles that sit at the seam
between enterprise systems and machine learning — ERP-adjacent AI, data/automation
consulting, ML engineering at companies that run real operations.

His actual differentiator is a duality that almost nobody his age has:

  - He ships enterprise software to paying clients. Real NetSuite implementations,
    real requirement-gathering, real user training. Most 2025 CS grads have never
    talked to a client.
  - He also builds ML — computer vision, gesture tracking, medical imaging
    classification — with a near-perfect academic record behind it.

That duality IS the thesis of this site. Do not build a generic "AI enthusiast"
portfolio. Build a site that argues: *this person understands the systems businesses
actually run on, AND can build the models that make them smarter.*


## 1 — DESIGN DIRECTION (locked — build exactly this)

The direction is called **VISION MESH**. Three influences, deliberately mixed:

  - Colour and motion language from computer vision — depth maps, point clouds,
    the teal/cyan palette of thermal and disparity imaging.
  - Geometry from Rajasthani jaali lattice work (Jatin is from Ajmer, studied in
    Jaipur). This donates SHAPE only — a precise perforated stone screen — never
    ornament, never "cultural theme". No mandalas, no paisley, no rangoli motifs.
  - Typographic discipline from financial ledgers and ERP interfaces — monospace
    for anything that is data, hairline rules, exact alignment.

### Tokens (derive every colour from these — no ad-hoc hexes anywhere)

| Token       | Dark (default) | Light     | Used for                          |
|-------------|----------------|-----------|-----------------------------------|
| `ground`    | `#070A0F`      | `#F6F8FA` | Page background                   |
| `surface`   | `#0E141C`      | `#FFFFFF` | Cards, bento tiles, modals        |
| `edge`      | `#1B2530`      | `#E1E7ED` | Hairlines, borders, dividers      |
| `text`      | `#E6EDF3`      | `#070A0F` | Body copy                         |
| `muted`     | `#7D8B9A`      | `#5A6875` | Captions, labels, metadata        |
| `accent`    | `#2DD4BF`      | `#0D9488` | Links, active states, 3D emission |
| `signature` | `#C9A227`      | `#8C6D12` | ONE place only — see below        |

Dark is the default theme and must be designed first. Light is a real design, not
an inversion — re-check every contrast pair in light mode.

**The brass `signature` colour appears in exactly one place on the entire site:**
the illuminated edges of the hero lattice. Nowhere else. Not on buttons, not on
headings, not on hover states. Its scarcity is what makes it read as expensive.
If you find yourself using brass twice, you have broken the design.

### Type

| Role    | Family                          | Notes                                       |
|---------|---------------------------------|---------------------------------------------|
| Display | **Bricolage Grotesque Variable**| Variable width + weight. Hero + section heads |
| Body    | **Geist Sans**                  | All prose                                   |
| Utility | **Geist Mono**                  | Dates, metrics, CGPA, section numbers, ERP section |

Load all three as variable fonts via `next/font/google` (Bricolage) and
`next/font/local` or `geist` package (Geist). Subset to latin. `display: swap`.

Type scale is fluid — `clamp()` throughout, never breakpoint jumps. Hero display
runs `clamp(3rem, 11vw, 9rem)`.

### What NOT to do

Explicitly avoid, because they are the current AI-generated design defaults:
  - cream/off-white background with a high-contrast serif and terracotta accent
  - near-black with a single acid-green or vermilion accent
  - broadsheet/newspaper layout with hairline rules and zero border-radius
  - glassmorphism applied to everything
  - a big number with a small label and a gradient behind it as the hero
  - purple-to-pink gradients anywhere

Also avoid: emoji in UI copy, "Let's build something amazing together", "Passionate
about...", "I'm a X who loves Y", exclamation marks in headings, and the word
"journey" anywhere on the site.


## 2 — THE SIGNATURE ELEMENT (this is the whole site's memorable moment)

ONE React Three Fiber particle system. 8,000–12,000 points. It does four things,
which is why Full R3F is justified here rather than decorative:

**State 1 — At rest.** Points settle into a jaali lattice: a precise perforated
stone screen, an 8×8 repeating geometric grid of interlocking octagons and stars,
rendered as a point cloud. It rotates on Y at ~0.05 rad/s. The lattice's structural
edges emit `signature` brass at low intensity; the field points are `accent` teal
at 30% opacity.

**State 2 — Cursor as depth sensor.** Points within a radius of the pointer displace
along +Z, magnitude falling off smoothly with distance, exactly like a depth map
responding to a hand entering frame. Springy return via `useSpring`. On touch
devices, this is driven by touch position; if no pointer has moved for 4s, a slow
ambient sine wave takes over so the scene never looks dead.

**State 3 — CTA hover.** When the primary CTA is hovered or focused, the lattice
morphs over 900ms into a wireframe hand silhouette in a pinch gesture, holds, then
returns. This is a direct callback to his Virtual Mouse project — a person who knows
his work will recognise it. Drive the morph with a GPU-side lerp between two
position buffers, not by rebuilding geometry.

**State 4 — Scroll.** `useScroll` drives the camera dolly and a slow morph of the
point field as the hero leaves the viewport, resolving into a sparse ambient field
that sits behind the rest of the page at very low opacity.

### Non-negotiable performance and fallback rules

  - Lazy-load the entire R3F scene via `next/dynamic` with `ssr: false`. It must NOT
    be in the initial JS bundle. First paint must not wait on it.
  - Detect WebGL support before mounting. No WebGL → render a static SVG of the
    jaali lattice, brass-edged, with a subtle CSS-only float. The page must look
    intentional, not broken.
  - `prefers-reduced-motion` → the static SVG, no exceptions.
  - Detect low-power devices (`navigator.hardwareConcurrency <= 4` OR
    `navigator.deviceMemory <= 4`) → drop to 3,000 points, disable the cursor
    displacement, keep the rotation.
  - Cap `dpr` at `[1, 2]`. Never render at 3x on a phone.
  - Unmount the scene entirely when the hero scrolls out of the viewport
    (IntersectionObserver). Do not leave a WebGL context running off-screen.
  - Pause the render loop when `document.hidden`.
  - Target: 60fps on a mid-range Android. If you can't hit it, reduce the point
    count — do not ship a janky hero.


## 3 — STACK

  - Next.js 15, App Router, TypeScript, `src/` directory
  - Tailwind CSS v4 (CSS-first config via `@theme` in `globals.css` — not a JS config file)
  - Motion — install `motion`, import from `motion/react`. NOT `framer-motion`.
  - `@react-three/fiber` + `@react-three/drei` + `three`
  - Lenis for smooth scroll (disabled under reduced-motion)
  - `lucide-react` for icons
  - Deploy target: Vercel

Do not add: GSAP (Motion covers everything here), a component library, a state
management library, or an animation library beyond the above. Every dependency
must earn its weight.


## 4 — SECTION ARCHITECTURE

Do not use a generic About/Skills/Projects/Contact split. Use this, which encodes
the duality that is his actual argument:

```
00  Preloader ....... "JATIN ACHARYA" draws in stroke-by-stroke, mono % counter
                      in the corner. Max 1.4s. Skipped under reduced-motion.
01  Hero ............ 3D lattice + kinetic name + role line + two CTAs
02  Ticker .......... infinite marquee — Oracle NetSuite · Python · OpenCV ·
                      SuiteScript · scikit-learn · SQL · ERP Implementation ...
03  Two Stacks ...... THE SIGNATURE SECTION. Split-screen. Left "SYSTEMS"
                      (NetSuite, ERP, client delivery), right "MODELS" (CV, ML,
                      Python). A hairline divider between them that the cursor
                      bends, like a lens. This is his thesis, made visual.
04  Ledger .......... Experience. Mono-set, pinned scroll timeline, hairline
                      rules, exact dates right-aligned. Reads like a statement
                      of account. Deliberately restrained — zero decoration.
05  Builds .......... Three project cards, 3D tilt on hover, opening into
                      accessible case-study modals
06  Record .......... Bento grid: 9.37 CGPA / Dean's List ×5 / MUJHACKX 1st /
                      10k+ image dataset / ACM / Placement Coordinator
07  Now ............. Current role, current location, what he's learning,
                      what he's open to. Short. Human. Present tense.
08  Contact ......... Magnetic CTA button, email, resume download
09  Footer .......... Theme toggle, socials, built-with line
```

Section numbers (00–09) are set in Geist Mono and appear as eyebrows. They are
justified here because the page IS a sequence — an argument built in order — not
decoration.

**Theme toggle:** circular wipe expanding from the toggle button using the View
Transitions API (`document.startViewTransition`), with a plain instant swap as the
fallback where unsupported. Persist to `localStorage`, respect
`prefers-color-scheme` on first visit, and set the class before first paint via an
inline script in the layout so there is no flash.


## 5 — CONTENT (all of it — use verbatim, invent nothing)

Put ALL of this in `src/data/portfolio.ts` as typed exports. No copy hard-coded in
components. Define proper types in `src/types/portfolio.ts`.

### Profile
```
name:      Jatin Acharya
role:      Oracle NetSuite Functional Consultant
tagline:   Enterprise systems by day. Computer vision by conviction.
location:  Pune, Maharashtra, India
email:     jatinacharya786@gmail.com
phone:     +91 7976859039
linkedin:  https://www.linkedin.com/in/jatin-acharya-148032230
```

### Hero
```
Eyebrow (mono):  ORACLE NETSUITE FUNCTIONAL CONSULTANT · PUNE
Display:         JATIN ACHARYA
Rotating line:   [ ERP implementations ] / [ computer vision ] / [ client delivery ]
                 — cycles every 2.6s with a mask-reveal transition, not a fade
Sub:             I implement the systems companies run on, and build the models
                 that make them smarter. B.Tech (Hons.) CSE — AI & ML, 9.37 CGPA.
CTA primary:     See the work
CTA secondary:   Download resume
```

### About / Two Stacks

Do NOT use his current LinkedIn About text — it still describes him as a
fourth-year student, which is 8 months out of date and undersells him badly. Use
this instead:

```
SYSTEMS
Since January 2025 I've worked on Oracle NetSuite implementations end to end —
gathering requirements from clients, configuring modules, running functional
testing, and training the people who use it every day. The work taught me
something a degree can't: most enterprise problems aren't modelling problems.
They're process problems wearing a technical costume.

MODELS
My degree is in AI and ML, and that's still where I build for myself. Computer
vision mostly — gesture tracking, medical image classification, the kind of
problem where the data is messy and the ground truth is contested. I graduated
top of my cohort across five consecutive semesters, which mattered less than the
one hackathon we won at 4am with a model that finally converged.

THE SEAM
The interesting work is between the two. Enterprise systems generate enormous,
structured, underused data. I want to be the person who can read the process and
build the model.
```

### Ledger (experience — reverse chronological)

```
⚠️ FILL IN — CURRENT ROLE (Pune)
Company:  [ASK JATIN — his LinkedIn still shows Prateek Technosoft ending May 2026]
Title:    [ASK JATIN]
Dates:    [ASK JATIN] — Present
Location: Pune, Maharashtra · [On-site / Hybrid / Remote]
Bullets:  [ASK JATIN — 2 bullets, what he owns and one measurable outcome]

Prateek Technosoft India Pvt Ltd — Jaipur, Rajasthan · On-site · 1 yr 5 mos
  Oracle NetSuite Functional Consultant · Full-time · May 2025 – May 2026
    - Delivered end-to-end Oracle NetSuite ERP implementations: module
      configuration, functional testing, and go-live support across client
      engagements.
    - Ran client requirement-gathering sessions and user training, owning system
      adoption from kickoff through handover.
  Trainee Oracle NetSuite Functional Consultant · Internship · Jan 2025 – Apr 2025
    - Learned NetSuite configuration and ERP process analysis on live client
      implementations.
  Skills: ERP Basics · Functional Testing · NetSuite Configuration

IBM — Project Trainee · Apprenticeship · Jun 2024 – Jul 2024
  - Built and deployed machine learning models for predictive analytics problems
    over a six-week structured programme.
  - Capstone: "Weight Loss Prediction using Linear Regression" — a regression
    model estimating outcomes from multi-feature health inputs. Certificate issued.

VVDN Technologies — Internship Trainee · Gurugram · May 2023 – Jun 2023
  - First hands-on exposure to production data science and OpenCV, contributing
    to computer vision testing workflows.

Manipal University Jaipur — B.Tech (Hons.) Computer Science & Engineering
  Specialisation: Artificial Intelligence & Machine Learning
  Jan 2021 – Dec 2025 · CGPA 9.37 / 10
```

### Builds (projects — three case studies)

```
1. Skin Disease Detection from Dermoscopic Images
   Tag: Computer Vision · Medical Imaging     Context: MUJHACKX — 1st place
   Dates: Oct 2023 – Dec 2023
   Problem:  Dermatological diagnosis is inaccessible in large parts of India.
             A phone photo and a model is a plausible first-line triage.
   Approach: Collected and curated a dermoscopic image dataset of 10,000+
             samples, then trained a CNN classifier for multi-class skin
             condition identification.
   Built:    Data collection and curation pipeline, class-balancing, augmentation
             strategy, training loop, evaluation harness.
   Result:   Won first place at MUJHACKX. Team project.
   Stack:    Python · TensorFlow · OpenCV · NumPy

2. Virtual Mouse — Hands-Free Cursor Control
   Tag: Computer Vision · Real-Time     Context: Research team project
   Dates: May 2023 – Jun 2023
   Problem:  Hardware input is a barrier for users with limited motor control,
             and for any context where touching a surface isn't possible.
   Approach: Real-time hand landmark tracking through a webcam, mapping gesture
             states to cursor position, click, and drag.
   Built:    The tracking pipeline, gesture state machine, and screen-coordinate
             mapping with smoothing to remove jitter.
   Result:   Sustained real-time tracking at 30 fps with reliable gesture
             recognition in normal lighting.
   Stack:    Python · OpenCV · MediaPipe

3. SyncSkills — Resume Analysis & ATS Optimisation
   Tag: NLP · Product     Context: Minor project
   Dates: May 2023 – Jun 2023
   Problem:  Applicants are rejected by ATS parsers before a human ever reads
             the resume, and get no feedback about why.
   Approach: Parse an uploaded resume, score it against a target job description
             for keyword coverage and structural compliance, return specific
             fixes rather than a score.
   Built:    Parsing layer, keyword-relevance scoring, formatting checks, and the
             feedback generation that turns a score into an instruction.
   Result:   Substantially reduced manual resume review time for test users.
   Stack:    Python · NLP · Flask
```

**IMPORTANT — how to present metrics.** His resume carries percentage claims
("40% reduction", "30% accuracy improvement", "50% increase in access"). These are
student-resume numbers without a stated baseline, and a sharp interviewer will ask
what they're measured against. I have deliberately removed them above. Present what
is verifiable — the hackathon win, the 10,000+ dataset, 30fps real-time — and leave
the unverifiable percentages off. A portfolio that overclaims is worse than one
that underclaims. If Jatin can produce the baselines, add them back with the
baseline stated.

### Record (bento grid)
```
9.37        CGPA · B.Tech (Hons.) CSE — AI & ML, MUJ        [large tile]
×5          Dean's List of Excellence — highest GPA,
            semesters 3, 4, 5, 6 and 7                       [large tile]
1st         MUJHACKX Hackathon — dermatological diagnostic aid
10,000+     dermoscopic images collected and curated
Placement   Student Placement Coordinator, AIML Department, MUJ
Coordinator
ACM         Certificate of Appreciation — service and leadership,
            ACM Student Chapter
89% / 90%   CBSE XII (Central Academy, Ajmer) / X (All Saints, Ajmer)  [small tile]
```

### Skills
```
Systems:   Oracle NetSuite · ERP Implementation · Functional Testing ·
           Business Process Analysis · Requirement Gathering · User Training · DBMS
Models:    Python · Machine Learning · OpenCV · Computer Vision · Data Analysis
Languages: Python · C · C++ · SQL · HTML · CSS
Learning:  Data Fundamentals (IBM) · Design and Analysis of Algorithms (NPTEL) ·
           Database Management Systems (Oracle) · NetSuite ERP Implementation
```

### Now
```
Currently implementing Oracle NetSuite for clients out of Pune. Reading about
retrieval-augmented systems over enterprise data, and looking for the projects
where ERP telemetry and machine learning actually meet.

Open to conversations about: ERP-adjacent AI, data and automation consulting,
and applied ML roles at companies that run real operations.
```

### Contact
```
Heading: Let's talk about the seam
Sub:     Best reached by email. I read everything.
Email:   jatinacharya786@gmail.com
Resume:  /resume/Jatin_Acharya_Resume.pdf
```


## 6 — FILE STRUCTURE

```
jatin-portfolio/
├── public/
│   ├── portrait.webp            # hero portrait — placed by Jatin
│   ├── portrait-about.webp
│   ├── graduation.webp          # used ONLY in the education tile
│   ├── og-image.png             # 1200×630
│   ├── favicon.svg
│   ├── robots.txt · sitemap.xml
│   └── resume/Jatin_Acharya_Resume.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx           # fonts, metadata, JSON-LD, no-flash theme script
│   │   ├── page.tsx             # composes sections in order
│   │   ├── globals.css          # Tailwind v4 @theme tokens
│   │   └── opengraph-image.tsx
│   ├── components/
│   │   ├── three/
│   │   │   ├── JaaliField.tsx       # the R3F scene
│   │   │   ├── latticeGeometry.ts   # generates the jaali point positions
│   │   │   ├── handGeometry.ts      # pinch-gesture target positions
│   │   │   ├── field.vert · field.frag
│   │   │   └── StaticLattice.tsx    # SVG fallback
│   │   ├── sections/
│   │   │   ├── Hero.tsx · Ticker.tsx · TwoStacks.tsx · Ledger.tsx
│   │   │   ├── Builds.tsx · Record.tsx · Now.tsx · Contact.tsx
│   │   ├── ui/
│   │   │   ├── Preloader.tsx · Nav.tsx · MobileMenu.tsx · Footer.tsx
│   │   │   ├── ThemeToggle.tsx · MagneticButton.tsx · Reveal.tsx
│   │   │   ├── SplitText.tsx · CaseStudyModal.tsx · Cursor.tsx
│   │   ├── data/portfolio.ts    # ← ALL content
│   │   ├── hooks/
│   │   │   ├── useWebGL.ts · useLowPower.ts · useActiveSection.ts
│   │   │   ├── useLenis.ts · usePointer.ts · useTheme.ts
│   │   └── types/portfolio.ts
├── next.config.ts · tailwind is CSS-first, no tailwind.config
├── package.json · tsconfig.json · README.md
```


## 7 — MOBILE (treat this as a first-class target, not a fallback)

Recruiters open portfolios on phones. If it's bad on mobile the desktop work is wasted.

  - Everything works down to 360px. Nothing clips, nothing horizontal-scrolls.
  - The 3D hero runs on mobile but at reduced point count and `dpr: [1, 2]`.
    If frame time exceeds 20ms for 2 consecutive seconds, auto-degrade to the
    static SVG at runtime and stay there.
  - The Builds gallery is a horizontal pinned scroll track on desktop. On mobile it
    becomes a native CSS `scroll-snap` swipe gallery — no gesture library, no
    vertical stack. The kinetic feel has to carry over to touch.
  - The Two Stacks split becomes vertically stacked on mobile, with the lens-bend
    divider replaced by a static hairline (cursor-driven effects have no meaning
    on touch — don't fake them).
  - All tap targets ≥ 44×44px.
  - Disable the custom cursor entirely on touch devices.
  - Test at 360px, 390px, 414px, 768px, 1024px, 1440px, 1920px.


## 8 — ACCESSIBILITY AND QUALITY FLOOR

Every one of these must pass before you call it done:

  - Semantic HTML. One `<h1>`. Correct heading hierarchy. Real landmarks.
  - Skip link. Visible `:focus-visible` rings globally. Logical tab order.
  - The case-study modal and mobile menu are proper dialogs: focus trap, ESC to
    close, body scroll lock, focus returned to the trigger on close.
  - Body text contrast ≥ 4.5:1 in BOTH themes. Check the muted token especially —
    thin type at small sizes is where this fails.
  - `prefers-reduced-motion`: no Lenis, no preloader animation, no parallax, no
    3D, no marquee. Content fully readable and usable.
  - Only `transform` and `opacity` animate on scroll. Never width/height/top/left.
  - `backdrop-filter` used on the nav only. Nowhere else.
  - No layout shift from animation. Reserve space.
  - `alt` text on every image, describing content not filename.
  - Images: WebP, sized, `next/image` with explicit width/height, hero portrait
    `priority`.
  - JSON-LD `Person` + `WebSite` in the layout. Full OG and Twitter meta.


## 9 — HOW TO WORK

1. Read `frontend-design` and `premium-frontend` fully. Load
   `premium-frontend/references/setup.md`, `motion.md`, `effects.md`, and
   `three-d.md`.
2. Scaffold Next.js 15 + TS + Tailwind v4. Install deps. Confirm it builds.
3. Write `src/data/portfolio.ts` and `src/types/portfolio.ts` FIRST, with all
   content from §5. Nothing after this hard-codes copy.
4. Build every section STATIC and correct — layout, type, spacing, both themes —
   before adding a single animation. Get it right, then get it moving.
5. Build the 3D scene in isolation. Verify the fallback path works by forcing it
   before you verify the WebGL path.
6. Layer motion in, one orchestrated sequence at a time. Hero entrance first.
7. Run the §8 checklist explicitly. Report each item pass/fail.
8. `npm run build` must pass clean with zero TypeScript errors and zero ESLint
   warnings.
9. Write a README covering setup, where to edit content, how to swap images, and
   how to deploy to Vercel.

If the 21st.dev Magic MCP is available, use it ONLY to scaffold the bento grid,
marquee, and nav shell — then restyle everything it produces to the §1 tokens.
Hand-build the 3D scene, all motion, the Two Stacks section, and the theme toggle.
Do not let generated components set the visual direction.

Deliver complete, working files. No `// TODO`, no placeholder text, no lorem ipsum,
no commented-out code. The only intentional gap is the `⚠️ FILL IN` current role
in §5 — leave that clearly marked in `portfolio.ts` with a comment so it's
impossible to miss.

Show me the running site when it's done, then critique your own work against §1
and tell me the one thing you'd change.

=== END ===
```

---

## Notes on what I took from your repo and what I changed

**Lifted (patterns, not code):** data-driven content in a single file, lazy-loaded R3F with a 2D fallback and WebGL detection, Lenis + active-section nav, focus-trapped case-study modals, custom cursor, preloader, masked text reveals, the pinned-track-becomes-swipe-gallery mobile pattern, JSON-LD + OG, WebP everywhere, resume download.

**Changed so it isn't a clone:**

| | Yours | Jatin's |
|---|---|---|
| Stack | Vite + React 19 | Next.js 15 App Router |
| Accent | Single neon | Teal + scarce brass |
| 3D signature | Neural constellation | Jaali lattice → depth-map → pinch |
| Sections | Journey / Capabilities / Recognition | Two Stacks / Ledger / Builds / Record |
| Type | — | Bricolage Grotesque + Geist + Geist Mono |
| Thesis | AI generalist | Systems ⟷ Models duality |

---

## What Jatin needs to do before running it

1. **Confirm his current employer, title and start date in Pune.** The one gap.
2. Run the image prompts from earlier, export `portrait.webp` (hero), `portrait-about.webp`, `graduation.webp` into `public/`.
3. **Update his LinkedIn About** — it still says fourth-year student.
4. Update his resume PDF — it says "Expected 2025 / Senior Undergraduate" and doesn't list the Pune role. Drop it at `public/resume/Jatin_Acharya_Resume.pdf`.
5. Optional: install the 21st.dev MCP.
