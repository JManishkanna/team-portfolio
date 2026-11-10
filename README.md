# Team Vinsmokes

> **WE DESIGN. WE BUILD. WE SHIP.**

Team Vinsmokes is a React portfolio for three developers:

- **Manish Kanna J** — Full-Stack Developer and Team Lead
- **Sivakumar A** — Backend and Database Developer
- **Monesh kumar M** — Frontend Developer and UI/UX

## Technology stack

- React 19 with JavaScript and JSX
- Bootstrap 5 for responsive UI primitives
- Vite 8 for development and production builds
- Java and Spring Boot 3.5 for the backend API
- MySQL, JPA, Spring Security, JWT, and Maven on the server
- Framer Motion and GSAP for motion effects

The frontend has been migrated from TypeScript to JavaScript. The Spring Boot backend remains Java.

## Run the frontend

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:5173`.

Create a production build with:

```bash
npm run build
npm run preview
```

## Run the backend

From the `backend/` directory:

```bash
mvn spring-boot:run
```

The backend configuration is in `backend/src/main/resources/application.yml`. Set the database and JWT values through environment variables before connecting it to the frontend.

## Routes

### Public pages

- `/` — home page
- `/team` — team directory
- `/team/:slug` — individual developer portfolio
- `/team/:slug/projects` — developer projects
- `/team/:slug/contact` — developer contact page
- `/projects` — project gallery
- `/project/:slug` — project case study
- `/skills` — technology stack
- `/achievements` — achievements
- `/contact` — contact page
- `/login` — member login page

### Admin pages

- `/ADMIN/login` — admin login
- `/ADMIN` — admin content editor
- `/admin/projects` — visual project editor

The current static admin session uses browser storage. Connect `AdminLoginPage.jsx` to the Spring Boot authentication API before using it in production.

## Content management

The public content is stored in `src/data/`:

- `site.js` — brand, navigation, and homepage content
- `teamMembers.js` — developer profiles and skills
- `projects.js` — project cards and case studies
- `technology.js` — technology categories and ownership
- `achievements.js` — milestones and achievements

The admin editor stores browser changes in `localStorage`, so edits are local to the current browser until an API-backed content service is connected.

## Project structure

```text
src/
├── components/       reusable layout, navigation, team, project, and animation components
├── data/             site content and data objects
├── hooks/            React hooks
├── pages/            route-level pages, including login and admin pages
├── styles/           global theme and component styles
├── App.jsx           route configuration
└── main.jsx          React entry point

backend/
└── src/main/java/    Spring Boot application and API code
```

## Deploy to Vercel

The repository includes `vercel.json` with the Vite SPA rewrite. It uses:

- Build command: `npm run build`
- Output directory: `dist`
- SPA fallback: every client route rewrites to `/`

After pushing the repository, deploy it as a Vite project on Vercel. The public site is intended to run at:

`https://teamvinsmoke.vercel.app/`

The admin login is available at:

`https://teamvinsmoke.vercel.app/ADMIN/login`

## Important notes

- The contact form needs a real API endpoint before it can deliver messages.
- Replace demonstration profile data, placeholder emails, and project content before publishing publicly.
- Do not rely on the browser-only admin session for real authorization.
