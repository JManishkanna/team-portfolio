# FullStack Crew

> **WE DESIGN. WE BUILD. WE SHIP.**

A multi-page, animation-rich team portfolio for a three-person full-stack crew —
where **every developer has a real, individually routed portfolio page**, not a
filter on one shared template.

Open `/team/manish`, `/team/aarav` and `/team/sanjay` and you get three
structurally different pages: different accent colour, different bio, different
skill groups, different project lists, different achievements, different contact
address. Add a fourth person to one data file and a fourth page exists.

**→ Want it running on your machine? See [`RUNNING.md`](./RUNNING.md).**

---

## Table of contents

| | |
| --- | --- |
| [Why this project exists](#why-this-project-exists) | [Data flow map](#data-flow-map) |
| [Tech stack](#tech-stack) | [Rendering workflow](#rendering-workflow) |
| [Route map](#route-map) | [Adding a developer](#adding-a-new-developer) |
| [Project structure](#project-structure) | [Deployment](#deployment) |
| [Design system](#design-system) | [What has been verified](#what-has-been-verified) |
| [Animation architecture](#animation-architecture) | [Honest limitations](#honest-limitations) |

---

## Why this project exists

Most "team portfolio" sites fail one specific test: click two different member
cards and you land on the same page with a different name swapped into a
heading. The requirement this build is organised around is the opposite:

> Clicking a member's photo, name or profile card must navigate to **that**
> developer's own portfolio page, at a unique URL, with personalised content.

That constraint shapes the architecture:

- **One reusable page component, zero per-person components.**
  `DeveloperPortfolioPage` is rendered for every developer. Person-specific
  detail lives in data, never in JSX.
- **Slug is the only join key.** The URL segment `/team/:slug` is resolved
  against the roster; nothing else identifies a developer.
- **Project ownership is derived, not duplicated.** A developer's project list
  comes from `Project.contributorIds`, so a project can never appear on the
  wrong person's page and a person can never claim a build they were not on.
- **An unknown slug is a dead end, loudly.** `/team/ghost` renders a custom 404
  with a route back to the team — it never silently falls through to the first
  developer in the array.

---

## Tech stack

Pinned to versions verified as mutually compatible, not to whatever is newest.

| Layer | Choice | Version | Why |
| --- | --- | --- | --- |
| Framework | React | `19.3.1` | concurrent rendering, `use`-era hooks |
| Build | Vite | `8.3.5` | instant dev server, route-level code splitting |
| Language | TypeScript | `5.9.3` | **deliberately not 7.x** — 5.9 is the line every other tool here is tested against |
| Styling | Tailwind CSS | `4.3.4` | CSS-first `@theme` config via `@tailwindcss/vite`, no `tailwind.config.js` |
| Routing | React Router | `7.18.5` | nested `<Routes>`, `NavLink` render props for the animated underline |
| Animation | framer-motion | `14.9.1` | entrances, stagger, shared-layout nav underline, page transitions |
| Animation | GSAP + ScrollTrigger | `3.15.1` | scrubbed scroll sequences only — the one job Motion is weaker at |
| Icons | lucide-react | `1.68.0` | see the brand-icon note below |
| Forms | React Hook Form | `7.91.0` | uncontrolled inputs, minimal re-renders |
| Validation | Zod | `4.6.7` | one schema, inferred form types |
| Resolver | @hookform/resolvers | `7.0.2` | Zod ↔ RHF bridge |

**Two animation libraries, split by responsibility — not overlapping.** Motion
owns anything triggered by mount, hover or route change. GSAP is used in exactly
one place: the scroll-scrubbed project sequence on the home page. Both are
disabled together under `prefers-reduced-motion`.

**Brand icons.** `lucide-react` 1.68 removed the `Github` and `Linkedin` brand
icons. Rather than pin an older major version for two glyphs, the marks are
hand-drawn once in [`src/components/common/BrandIcons.tsx`](./src/components/common/BrandIcons.tsx).

---

## Route map

Every route is real, deep-linkable, and survives a hard refresh.

| Path | Page | Personalised? |
| --- | --- | --- |
| `/` | Home — hero, team collage, project preview, stack, workflow | no |
| `/team` | Team gallery, all cards link out to individual portfolios | no |
| **`/team/:slug`** | **Individual developer portfolio** (profile tab) | **yes** |
| **`/team/:slug/projects`** | **Only that developer's projects** | **yes** |
| **`/team/:slug/contact`** | **Message addressed to that one person** | **yes** |
| `/projects` | All projects, filterable by category and by developer | no |
| `/project/:slug` | Case study with per-contributor breakdown | no |
| `/skills` | Stack grouped by category, cross-linked to people | no |
| `/achievements` | Crew milestones, each attributed to a member | no |
| `/contact` | Crew-wide enquiry form | no |
| `/404`, `*` | Custom not-found | no |

Generated `sitemap.xml` covers **21 URLs**: 6 top-level pages, 9 developer
routes (3 people × 3 tabs), 6 project case studies.

---

## Project structure

```
mark1/
├── index.html                  SEO/OG meta, fonts, noscript roster fallback
├── vite.config.ts              react + tailwind plugins, dev 5173 / preview 4173
├── tsconfig.json               single strict config, noEmit
├── .env.example                VITE_SITE_URL, VITE_CONTACT_ENDPOINT
├── vercel.json                 SPA rewrite → /index.html
├── netlify.toml                SPA redirect + immutable asset caching
├── scripts/
│   └── generate-sitemap.mjs    reads slugs out of the data files
│
├── public/
│   ├── favicon.svg             the bracket mark
│   ├── _redirects              SPA fallback for hosts that read this file
│   ├── images/avatars/         3 placeholder portraits (800×1000 SVG)
│   └── images/projects/        6 project covers (1200×800 SVG)
│
└── src/
    ├── main.tsx                StrictMode → MotionConfig(reducedMotion) → Router → ErrorBoundary
    ├── App.tsx                 route table; home eager, everything else lazy()
    ├── types/index.ts          TeamMember, Project, Achievement, Technology, ContactPayload
    │
    ├── data/                   ← the only place content lives
    │   ├── site.ts             brand, navItems + per-item accent, cta, hero copy, values, workflow
    │   ├── teamMembers.ts      the roster (source of truth for /team/:slug)
    │   ├── projects.ts         6 builds with full case-study detail
    │   ├── achievements.ts     7 dated milestones
    │   └── technology.ts       35 technologies across 7 categories, each mapped to memberIds
    │
    ├── utils/data.ts           every selector: getMemberBySlug, projectsForMember,
    │                           projectContributors, technologiesForMember, crewStats …
    ├── hooks/                  useSeo, usePrefersReducedMotion, useScrolledPast, useGsapSequence
    ├── styles/globals.css      design tokens + component classes + reduced-motion overrides
    │
    ├── components/
    │   ├── layout/RootLayout.tsx        navbar + animated <main> + footer
    │   ├── navigation/                  Logo, Navbar, ScrollProgress, Footer
    │   ├── animations/                  Reveal, StaggerGroup, StaggerText, BackdropDecor
    │   ├── common/                      ActionButton, Breadcrumbs, SectionHeader, SocialLinks,
    │   │                                  EmptyState, PageSkeleton, ErrorBoundary, BrandIcons
    │   ├── team/                        TeamSection, TeamMemberCard, TeamCollage,
    │   │                                  DeveloperHero/About/Skills/Projects/Achievements/Contact,
    │   │                                  DeveloperTabs, useMemberFromParams
    │   ├── projects/ProjectCard.tsx
    │   └── sections/                    PageHero, ContactForm
    │
    └── pages/                  HomePage, TeamPage, DeveloperPortfolioPage,
                                DeveloperProjectsPage, DeveloperContactPage,
                                ProjectsPage, ProjectDetailsPage, SkillsPage,
                                AchievementsPage, ContactPage, NotFoundPage
```

---

## Data flow map

Content flows one direction. There is no state management library, no server
state, and nothing mutable at runtime except filters and form input.

```
                          ┌─────────────────────────────────┐
                          │  src/data/*.ts   (typed, static) │
                          │                                  │
                          │  teamMembers.ts   slug ─┐        │
                          │  projects.ts   contributorIds    │
                          │  achievements.ts  memberId       │
                          │  technology.ts    memberIds      │
                          │  site.ts  brand / nav / cta      │
                          └───────────────┬─────────────────┘
                                          │  imported once, never mutated
                                          ▼
                          ┌─────────────────────────────────┐
                          │  src/utils/data.ts  (selectors)  │
                          │                                  │
                          │  getMemberBySlug(slug)           │  ← the URL join
                          │  projectsForMember(id)           │  ← filters Project.contributorIds
                          │  featuredProjectsFor(member)     │  ← orders by featuredProjectSlugs
                          │  projectContributors(project)    │  ← reverse lookup
                          │  technologiesForMember(id)       │
                          │  achievementsForMember(id)       │
                          │  crewStats                       │  ← derived counts, not typed literals
                          └───────────────┬─────────────────┘
                                          │
              ┌───────────────────────────┼───────────────────────────┐
              ▼                           ▼                           ▼
   ┌────────────────────┐    ┌─────────────────────┐    ┌──────────────────────┐
   │  TeamMemberCard    │    │  Developer*Page      │    │  ProjectsPage /       │
   │  links to          │───▶│  useParams() →       │    │  SkillsPage /         │
   │  /team/${slug}     │    │  useMemberFromParams │    │  AchievementsPage     │
   └────────────────────┘    │  → member ?? null    │    └──────────────────────┘
                             └──────────┬──────────┘
                                        │
                        ┌───────────────┴───────────────┐
                        ▼                               ▼
                 member found                    member === null
                        │                               │
                        ▼                               ▼
        accent becomes CSS var                <NotFoundPage />
        --accent on every card          never a blank page, never
        + heading + tab pill             someone else's profile
```

**The three joins that make individual portfolios real:**

| Relationship | Stored as | Resolved by |
| --- | --- | --- |
| URL → person | `TeamMember.slug` | `getMemberBySlug()` |
| Person → projects | `Project.contributorIds` | `projectsForMember()` |
| Person → tech | `Technology.memberIds` | `technologiesForMember()` |
| Person → milestones | `Achievement.memberId` | `achievementsForMember()` |
| Project → people | `Project.contributorIds` | `projectContributors()` |

`featuredProjectSlugs` on a member only *orders* highlights. It is not a second
source of truth about who built what — `contributorIds` is.

---

## Rendering workflow

What happens when someone clicks Aarav's card, then hits refresh:

1. **Click** — `TeamMemberCard`'s identity block is a single
   `<Link to="/team/aarav" aria-label="Open Aarav's individual portfolio">`.
   Social buttons and "Contact Aarav" are *siblings* outside that link, so
   there are no nested interactive elements.
2. **Route match** — React Router resolves `team/:slug` →
   `DeveloperPortfolioPage`, which is a separate lazy chunk. `PageSkeleton`
   shows while it streams in.
3. **Resolve** — `useMemberFromParams()` reads `useParams().slug` and calls
   `getMemberBySlug()`. Result is `member | null`.
4. **Branch** — `null` renders `NotFoundPage`. A truthy member renders the
   whole page. There is no fallback-to-first-member path.
5. **Derive** — `projectsForMember(member.id)`, `technologiesForMember(...)`,
   `achievementsForMember(...)` filter the static arrays.
6. **Theme** — `member.accent` is written into the CSS custom property
   `--accent` via a typed `Vars` helper, so one data field recolours the hero
   bar, tab pills, card rings and link hovers without any conditional styling.
7. **SEO** — `useSeo()` sets
   `Aarav | Backend & Database Developer | FullStack Crew`, the description,
   and `og:*` tags for this specific person.
8. **Refresh** — the browser requests `/team/aarav` from the host. There is no
   such file, so the SPA rewrite (`vercel.json` / `netlify.toml` /
   `_redirects`) serves `index.html`, and steps 2–7 replay identically. This is
   the single configuration most SPA portfolios get wrong.

---

## Design system

Ten brand colours, declared once as Tailwind v4 `@theme` tokens in
[`src/styles/globals.css`](./src/styles/globals.css) and consumed everywhere as
`text-electric`, `bg-lime`, `border-coral` …

| Token | Hex | Role |
| --- | --- | --- |
| `electric` | `#4361EE` | primary action, Manish's accent |
| `lime` | `#C8F169` | CTA fill, on-dark highlight |
| `orange` | `#FF6B35` | Sanjay's accent |
| `yellow` | `#FFD166` | warnings, accents |
| `coral` | `#FF5A7A` | required-field markers, errors |
| `mint` | `#06D6A0` | success, Aarav's accent |
| `violet` | `#845EC2` | section accents |
| `ink` | `#111827` | deep navy, dark-section ground |
| `paper` | `#F8FAFC` | soft white, light-section ground |
| `mist` | `#E9EDF3` | light gray, separators |

Sections alternate light → dark → light. `.on-ink` / `.on-ink-deep` /
`.surface` flip the foreground and background pair together, so text contrast
cannot drift when a section changes ground. Gradients are reserved for the hero
and the scroll progress bar — no glow layering, no random pairings.

Type: **Space Grotesk** (display), **Manrope** (body), **JetBrains Mono**
(labels and code-flavoured text), each with a system fallback stack. Sizes are
fluid (`clamp()`) from 320px up, so headings scale rather than re-break.

---

## Animation architecture

| System | Owns | Guarded by |
| --- | --- | --- |
| **Motion** | word-by-word headline stagger, `Reveal` scroll-in, `StaggerGroup` lists, `layoutId` nav underline that slides between links, `AnimatePresence` page transitions, parallax via `useScroll` + `useSpring` | `MotionConfig reducedMotion="user"` at the root |
| **GSAP ScrollTrigger** | the one scrubbed multi-step project sequence on the home page | `usePrefersReducedMotion()` returns early; `gsap.context().revert()` on unmount |
| **CSS** | float/drift/blink/marquee/orbit keyframes, hover lifts, `@keyframes` in `@theme` | a `@media (prefers-reduced-motion: reduce)` block zeroes durations and iterations |

Every animated headline keeps its final state readable immediately — no long
intro, no mask that hides the H1. Decorative shapes are `pointer-events-none`
and `aria-hidden="true"`.

---

## Accessibility

- Semantic landmarks: `header`, `nav aria-label="Primary"`, `main#main-content`
  (focused target for skip logic), `footer`, `ol` for ordered lists.
- One `h1` per page, no skipped heading levels.
- Mobile drawer: `role="dialog"`, `aria-modal`, focus moves **into** the panel
  on open, Tab wraps at both edges and is pulled back if it escapes, Escape
  closes and returns focus to the toggle, body scroll locks and restores.
- Every image has `alt`; the avatar fallback renders initials if a file 404s.
- Visible `:focus-visible` outline (3px electric, lime on dark grounds).
- No information that exists only on hover — the card's extra bio is always
  visible on touch layouts (`max-md:grid-rows-[1fr]`), revealed on hover at
  desktop widths.
- Reduced motion honoured at the library, hook and CSS layers.

---

## Adding a new developer

This is the payoff of the data-driven design. **Four steps, no new component,
no route edit.**

### 1. Add the portrait

Drop `public/images/avatars/priya.svg` (or `.jpg`/`.webp`). Square-ish or 4:5
works best with the card crop.

### 2. Append to `src/data/teamMembers.ts`

```ts
{
  id: "m4",
  slug: "priya",            // → /team/priya, /team/priya/projects, /team/priya/contact
  name: "Priya Raman",
  role: "DevOps & Platform Developer",
  specialty: "CI pipelines, observability, zero-downtime releases",
  accent: "#845EC2",        // any palette colour; drives the whole page theme
  shortBio: "One sentence for the card.",
  biography: "Longer paragraph for the gallery.",
  expandedBio: "Full bio for the individual portfolio.",
  approach: "How she works.",
  collaboration: "How she fits the crew.",
  photo: "/images/avatars/priya.svg",
  location: "Chennai, India",
  email: "priya@fullstackcrew.example",
  githubUrl: undefined,     // leave unset until the real profile exists
  linkedinUrl: undefined,
  portfolioUrl: undefined,
  skills: ["Docker", "Kubernetes", "GitHub Actions", "Spring Boot"],
  skillGroups: {
    frontend: ["TypeScript"],
    backend: ["Spring Boot", "Java"],
    database: ["PostgreSQL"],
    tools: ["Docker", "Kubernetes", "GitHub Actions"],
  },
  featuredProjectSlugs: ["shard-api"],   // ordering only — see step 3
  achievements: ["Cut CI time from 14 min to 4 min"],
  interests: ["Runtime observability"],
  strengths: ["Incident response", "Build systems"],
}
```

TypeScript will refuse the build if you miss a required field — `TeamMember` is
not optional and there is no `any` escape hatch.

### 3. Add her to the projects she actually worked on

In `src/data/projects.ts`, append `"m4"` to that project's `contributorIds`:

```ts
{
  slug: "shard-api",
  contributorIds: ["m2", "m4"],   // ← this line is what puts the project on her page
  detail: {
    contributions: [
      // ...
      { memberId: "m4", note: "Rebuilt the release pipeline behind zero-downtime deploys." },
    ],
  },
}
```

`/team/priya/projects` and the case-study contributor list both read this. Do
not add her to `featuredProjectSlugs` without also adding her to
`contributorIds` — the highlight strip is filtered against real ownership.

### 4. Optionally attribute technology and milestones

- `src/data/technology.ts` → add `"m4"` to `memberIds` of anything she uses.
- `src/data/achievements.ts` → entries with `memberId: "m4"`.

**Done.** `/team/priya` resolves, the navbar's Team link is active, the footer
crew column picks her up, `/team` shows a fourth card, and `npm run sitemap`
emits nine more URLs. Nothing is hard-coded to three people — `crewStats`
counts the arrays, so every displayed figure updates itself and stays
verifiable.

---

## Deployment

The build is a static bundle in `dist/`. The **only** requirement is an SPA
fallback: unknown paths must return `index.html` with status 200, otherwise
`/team/manish/projects` 404s on refresh.

### Vercel

Committed as [`vercel.json`](./vercel.json) — build `npm run build`, output
`dist`, catch-all rewrite. Push and it works.

### Netlify

Committed as [`netlify.toml`](./netlify.toml) — build command, publish dir,
`/* → /index.html 200`, immutable asset caching.

### Any static host (S3, GitHub Pages, nginx, Cloudflare Pages)

`public/_redirects` is already in the bundle for hosts that read it. For
**nginx**, the equivalent is:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

For **S3 + CloudFront**, set the 404 response to use `/index.html` with status
`200`.

### Pre-deploy checklist

```bash
cp .env.example .env          # set VITE_SITE_URL to the real origin
npm run sitemap               # generate sitemap.xml + robots.txt into public/
npm run build                 # type-check + bundle into dist/
npm run preview               # sanity-check at http://localhost:4173
```

Then hard-refresh a nested URL — `http://localhost:4173/team/aarav/projects` —
before trusting the host's rewrite.

---

## What has been verified

Run against the production bundle on `vite preview`, in Chrome, via scripted
browser checks.

| Check | Result |
| --- | --- |
| `npm run typecheck` | clean, 0 errors |
| `npm run build` | succeeds — 2633 modules, `index` chunk 405 kB / **138 kB gzip**, CSS 57 kB / 10.5 kB gzip, 23 JS chunks (route-level splits) |
| Click each of 3 member cards | lands on `/team/<correct-slug>`, right `h1`, right title, right project set |
| Developer project isolation | Manish 4 projects, Aarav 4, Sanjay 3 — distinct, all derived from `contributorIds` |
| Deep links at every depth (`/team/x`, `/team/x/projects`, `/team/x/contact`) | HTTP 200 through preview's SPA fallback |
| `/team/does-not-exist`, `/team/nobody/projects`, `/totally-unknown` | custom 404 with "Browse the team" + the three real profiles; never blank, never another developer's page |
| Per-page SEO | e.g. `Contact Manish \| Full-Stack Developer · Team Lead \| FullStack Crew` |
| Heading structure | single `h1`, no skipped levels |
| Horizontal overflow at **320px**, 11 routes | **0px on every route** |
| Mobile drawer | opens, focus enters panel, Tab wraps, Escape closes + restores focus, closes after navigating to the current route, body scroll restores |
| Contact validation | empty submit → 4 inline messages + `aria-invalid`; bad email → specific message; valid → clears |
| Contact honesty with no endpoint | shows "Validated — but there is nowhere to send it yet" + mailto fallback. **No success message is ever shown without a real 2xx.** |
| Images | 0 missing `alt`, 0 `href="#"`, 0 unlabeled buttons |

Two bugs were found by this pass and fixed: a 16px horizontal overflow on
developer pages from a negative-margin sticky tab bar, and the mobile drawer
staying open when a link pointed at the route you were already on.

---

## Honest limitations

Listed so nothing above reads as a claim it has not earned. Full list in
[`RUNNING.md` §9](./RUNNING.md#9-known-gaps).

- **No automated tests.** No unit suite, no E2E suite, no `npm test`.
- **All content is demonstration data** — 3 developers, 6 projects, 7
  milestones — and labelled as such in the UI.
- **No fabricated links.** `githubUrl`, `linkedinUrl`, `portfolioUrl` and
  `liveDemoUrl` are intentionally unset; social rows render a hint instead of a
  invented URL. Emails use the reserved `.example` TLD.
- **Contact delivery is unwired by default.** Set `VITE_CONTACT_ENDPOINT` or
  build the receiving service.
- **No backend shipped.** The optional Spring Boot + MySQL `POST /api/contact`
  is not implemented; the frontend stands alone.
- **Placeholder artwork only** — generated SVG initials and abstract covers,
  not photographs.
- **No Lighthouse audit recorded.** The optimisations are in place; the scores
  have not been measured on this build.
- **GSAP is used on one section only**, deliberately, to avoid two overlapping
  scroll systems.

---

## License

Source is yours to use. The demonstration names, project titles and milestones
are illustrative — replace them with real information before publishing.
#   t e a m - p o r t f o l i o  
 