# Running the project

Local setup and command reference for **FullStack Crew**. Read this first if you
just cloned the repo and want it on screen.

For what the site *is* — architecture, data flow, routing model — see
[`README.md`](./README.md).

---

## 1. Prerequisites

| Requirement | Version | Notes |
| --- | --- | --- |
| **Node.js** | 20.19+ or 22.12+ (Vite 8 requirement) | Verified here on **v24.18.0** |
| **npm** | 10+ (ships with Node) | `package-lock.json` is committed — install with npm, not another manager |
| Git | any recent | only for cloning |

Check yours:

```bash
node --version   # expect v20.19.0, v22.12.0, v24.x or newer
npm --version
```

No database, no JDK, no backend process is required. The site is a pure
frontend; all content comes from typed data files in `src/data/`.

---

## 2. Install

```bash
cd mark1
npm install
```

This resolves the exact pinned versions in `package.json` (React 19.3.1, Vite
8.3.5, TypeScript 5.9.3, Tailwind 4.3.4, framer-motion 14.9.1, GSAP 3.15.1,
React Router 7.18.5, React Hook Form 7.91.0, Zod 4.6.7, lucide-react 1.68.0).

---

## 3. Configure environment (optional)

```bash
cp .env.example .env
```

Both variables are **optional** and the app runs fully without them:

| Variable | If unset | If set |
| --- | --- | --- |
| `VITE_SITE_URL` | no `<link rel="canonical">`, `og:url` falls back to the current origin | canonical + `og:url` emitted on every page; also unlocks the sitemap generator |
| `VITE_CONTACT_ENDPOINT` | contact form validates, then shows a plain "nowhere to send it yet" notice with a prefilled `mailto` draft | contact form `POST`s the payload there and only reports success when the response is `2xx` |

Never put a private email service password in these files — see
[§8 Security notes](#8-security-notes).

---

## 4. Run it

```bash
npm run dev
```

| URL | What |
| --- | --- |
| `http://localhost:5173/` | dev server, hot reload |
| `http://<your-lan-ip>:5173/` | same app on your phone (host is open by default) |

The dev server is configured in [`vite.config.ts`](./vite.config.ts).

### Verify the individual portfolios work

The whole point of the site is that each developer has their own page. Open
these directly — they must render three *different* pages, not one template:

```
http://localhost:5173/team/manish
http://localhost:5173/team/aarav
http://localhost:5173/team/sanjay
```

Then the nested routes, and refresh each one to confirm deep-linking survives a
hard reload:

```
http://localhost:5173/team/manish/projects
http://localhost:5173/team/aarav/contact
http://localhost:5173/project/pulseboard
http://localhost:5173/team/not-a-real-person   ← must show the custom 404, never a blank page
```

---

## 5. Production build

```bash
npm run build     # tsc -p tsconfig.json && vite build   → dist/
npm run preview   # serves dist/ on http://localhost:4173/
```

`npm run build` type-checks **first**, so a type error stops the build. To only
type-check:

```bash
npm run typecheck
```

`preview` is the closest thing to production and is what you should use to test
routing before deploying — it also exercises SPA fallback.

---

## 6. Sitemap and robots.txt

These are **generated**, not committed (both are in `.gitignore`), because they
embed your real domain:

```bash
VITE_SITE_URL=https://your-domain.com npm run sitemap
```

Writes `public/sitemap.xml` and `public/robots.txt` with all 21 URLs — the 6
top-level pages, 3 developer profiles × 3 routes each, and 6 project case
studies. Slugs are scraped from `src/data/teamMembers.ts` and
`src/data/projects.ts`, so the sitemap cannot drift from the actual routes.

Run it **before** `npm run build` so the files land in `dist/`. Without
`VITE_SITE_URL` the script exits with an error rather than inventing a domain.

---

## 7. Command summary

| Command | Does |
| --- | --- |
| `npm install` | install pinned dependencies |
| `npm run dev` | dev server with HMR on `:5173` |
| `npm run build` | type-check then production bundle into `dist/` |
| `npm run preview` | serve the built `dist/` on `:4173` |
| `npm run typecheck` | `tsc -p tsconfig.json` only, no emit |
| `npm run sitemap` | generate `public/sitemap.xml` + `robots.txt` (needs `VITE_SITE_URL`) |

There is deliberately **no** `test` script — no unit or E2E suite has been
written. See [§9](#9-known-gaps).

---

## 8. Security notes

- `.env` is git-ignored; only `.env.example` is committed.
- `VITE_*` variables are inlined into the **public bundle** at build time. Any
  secret you put there is readable by anyone who loads the site. Never set
  `VITE_CONTACT_ENDPOINT` to a URL with embedded credentials such as
  `https://user:pass@host/...`. Put secrets server-side, in the function or
  Spring Boot service that receives the POST.
- SMTP/API keys belong to the endpoint you point at, not to this repo.
- The contact form is protected by a hidden honeypot field and length caps, but
  there is no rate limiting — that is the receiving service's job.

---

## 9. Known gaps

Stated plainly so nothing here reads as more than it is:

- **No automated tests.** No `test` script, no unit or E2E suite.
- **Contact delivery is unwired by default.** Until `VITE_CONTACT_ENDPOINT` is
  set, no message leaves the browser — the form says so instead of faking it.
- **All content is demonstration data.** Three developers, six projects and
  seven milestones are illustrative and labelled as such in the UI. Emails use
  the reserved `.example` TLD, and `githubUrl` / `linkedinUrl` / `liveDemoUrl`
  are intentionally left unset so no fabricated profile or demo link is ever
  rendered.
- **Placeholder artwork only.** `public/images/` holds generated SVG initials
  and abstract covers, not photographs.
- **No backend shipped.** The optional Spring Boot + MySQL `POST /api/contact`
  described in the brief is not implemented; the frontend is complete on its own.
- **No Lighthouse run recorded.** Performance and a11y are designed for (lazy
  routes, sized and lazy-loaded images, reduced-motion support, focus
  management), but no audit score has been measured on this build.
