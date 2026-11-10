/**
 * DEMONSTRATION PROJECTS
 * `liveDemoUrl` and `githubUrl` are left unset on purpose — the UI never renders a
 * link it cannot vouch for. Add your real deployed URLs and repository links and the
 * buttons appear on the cards and detail pages automatically.
 */
const seedProjects = [
    {
        slug: "pulseboard",
        title: "PulseBoard",
        description: "A real-time operations dashboard that streams service health into a single view, with alert rules your team can actually read six months later.",
        thumbnail: "/images/projects/pulseboard.svg",
        technologies: ["React", "JavaScript", "Spring Boot", "MySQL", "Redis", "WebSockets", "Bootstrap"],
        contributorIds: ["m1", "m2", "m3"],
        categories: ["Real-Time Applications", "Full-Stack Applications"],
        featured: true,
        year: "2026",
        detail: {
            overview: "PulseBoard aggregates service metrics, deploy events and error bursts into one live board. Operators choose what counts as a problem; the system holds that definition in versioned rules instead of tribal knowledge.",
            problem: "The teams we built this for were watching four tabs and a chat channel at the same time. When something broke, the incident narrative was reconstructed from scrollback, and the same failure reappeared a month later because nobody had written down the fix.",
            solution: "One WebSocket stream fans out normalised events; the client keeps a bounded ring buffer so memory stays flat over an eight-hour shift. Alert rules are declarative JSON stored against the project, validated on write, and rendered as plain English in the UI so a non-author can read them.",
            keyFeatures: [
                "Live event stream with a bounded client buffer and automatic resync on reconnect",
                "Declarative alert rules, version-controlled and rendered as human-readable sentences",
                "Incident timeline stitched from deploys, errors and rule triggers",
                "Keyboard-first navigation for every panel, including screen-reader announcements of new alerts",
            ],
            contributions: [
                { memberId: "m1", note: "Owned the event schema and the WebSocket contract between service and client." },
                { memberId: "m2", note: "Designed the MySQL event store, retention job and Redis hot-path cache." },
                { memberId: "m3", note: "Built the streaming UI, panel system and live-region announcement layer." },
            ],
        },
    },
    {
        slug: "shard-api",
        title: "ShardAPI",
        description: "A multi-tenant REST gateway in Spring Boot: one deployment, strict per-tenant isolation, and rate limits you can reason about.",
        thumbnail: "/images/projects/shard-api.svg",
        technologies: ["Java", "Spring Boot", "Spring Security", "MySQL", "Redis", "Docker", "JUnit"],
        contributorIds: ["m2", "m1"],
        categories: ["Backend Systems", "Developer Tools"],
        featured: true,
        year: "2026",
        detail: {
            overview: "ShardAPI fronts several customer databases behind one API surface. Requests carry a tenant identity, and the gateway routes, isolates, throttles and audits them without any consumer needing to know where the data physically lives.",
            problem: "Per-customer deployments were multiplying. Every bug fix had to be applied N times, and there was no honest answer to 'show me everything tenant B touched last week'.",
            solution: "Tenant resolution happens in a single filter that binds the identity to the request context, so downstream code cannot accidentally read another tenant. Connection pools are per-tenant and capped, and every access is written to an append-only audit stream.",
            keyFeatures: [
                "Filter-level tenant binding so isolation cannot be bypassed by application code",
                "Per-tenant connection pools with hard ceilings and backpressure",
                "Token-bucket rate limiting backed by Redis",
                "Append-only audit log queryable by tenant, actor and time range",
            ],
            contributions: [
                { memberId: "m2", note: "Built tenant resolution, pool isolation, rate limiting and the audit pipeline." },
                { memberId: "m1", note: "Wrote the Spring Security model, integration tests and the rollout plan." },
            ],
        },
    },
    {
        slug: "verdant-cart",
        title: "VerdantCart",
        description: "A plant-nursery storefront with an offline-tolerant cart, optimistic checkout and an admin panel small enough to learn in a day.",
        thumbnail: "/images/projects/verdant-cart.svg",
        technologies: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "Bootstrap"],
        contributorIds: ["m3", "m1"],
        categories: ["E-Commerce", "Full-Stack Applications"],
        featured: true,
        year: "2025",
        detail: {
            overview: "VerdantCart sells live plants to a regional nursery. Stock changes hourly, availability is the whole product, and the owners needed to update it from a phone in a greenhouse rather than a desktop back office.",
            problem: "The old site sold plants that did not exist. Two staff edited one spreadsheet, customers discovered the truth at delivery, and refunds ate the margin on the popular items.",
            solution: "Availability is the customer-facing field, not a flag on a product record. The cart resolves stock on every navigation and degrades to a cached snapshot offline, then reconciles on reconnect. The admin is a single editable stock sheet sized for thumbs.",
            keyFeatures: [
                "Stock-first data model with reservation on checkout start",
                "Offline-tolerant cart with reconciliation when the connection returns",
                "Optimistic UI with honest failure states — nothing claims success it did not get",
                "One-screen admin inventory sheet usable on a 360px phone",
            ],
            contributions: [
                { memberId: "m3", note: "Designed the storefront flows, cart state machine and mobile admin sheet." },
                { memberId: "m1", note: "Built the Express API, stock reservation logic and Mongo indexes." },
            ],
        },
    },
    {
        slug: "code-canvas",
        title: "CodeCanvas",
        description: "Collaborative code scratchpad for pairing: shared cursors, per-file presence, and a session transcript you can keep after the call.",
        thumbnail: "/images/projects/code-canvas.svg",
        technologies: ["React", "JavaScript", "Node.js", "WebSockets", "MongoDB", "Framer Motion"],
        contributorIds: ["m3", "m2"],
        categories: ["Productivity Tools", "Frontend Projects", "Real-Time Applications"],
        featured: false,
        year: "2025",
        detail: {
            overview: "CodeCanvas exists for the fifteen minutes at the start of a debugging session where two people need one scratchpad, not a repository. Open a link, paste the code, see each other's cursors.",
            problem: "Screen-sharing is a bad medium for reasoning about code. The driver types and the observer watches, and the useful second pair of hands stays silent because there is no way in.",
            solution: "Presence is the product. Each participant gets a named cursor and a file-local selection, edits merge per-line so two people can work in the same file without fighting, and the transcript records who proposed what.",
            keyFeatures: [
                "Per-file presence with named cursors and selections",
                "Line-level merge so concurrent edits do not clobber each other",
                "Session transcript export with attribution",
                "Reduced-motion mode that still communicates presence through labels",
            ],
            contributions: [
                { memberId: "m3", note: "Built the editor surface, presence rendering and merge-conflict UX." },
                { memberId: "m2", note: "Wrote the WebSocket relay, session persistence and transcript store." },
            ],
        },
    },
    {
        slug: "a11y-radar",
        title: "A11yRadar",
        description: "An in-browser accessibility auditor that reports keyboard-reachable problems in the order you will actually encounter them.",
        thumbnail: "/images/projects/a11y-radar.svg",
        technologies: ["JavaScript", "React", "Chrome Extension APIs", "axe-core", "Vite"],
        contributorIds: ["m1"],
        categories: ["Developer Tools", "Frontend Projects"],
        featured: false,
        year: "2025",
        detail: {
            overview: "A11yRadar walks the page the way a keyboard user does and reports what it could not reach, what it could not name, and what moved without warning. Findings are ordered by tab order rather than severity score.",
            problem: "Existing audit tools return a 200-item list sorted by rule name. Teams triage by count, fix the easy ones for the score, and the page stays unusable for the person who was never in the room.",
            solution: "The extension simulates a tab traversal and reports each stop: focus visible, label computed, role announced. Failures appear in traversal order with the exact key sequence that reached them, so the fix is a concrete reproduction rather than an abstract rule.",
            keyFeatures: [
                "Tab-order traversal with per-stop focus and label assertions",
                "Findings ordered by traversal position, not rule severity",
                "Reproduction hint for every failure — the exact keys pressed to reach it",
                "Diff view between two scans so regressions in a PR are visible",
            ],
            contributions: [
                { memberId: "m1", note: "Designed the traversal model and built the extension, rules engine and diff view." },
            ],
        },
    },
    {
        slug: "migrate-mono",
        title: "MigrateMono",
        description: "A schema-migration CLI for MySQL projects that refuses to run anything it cannot undo.",
        thumbnail: "/images/projects/migrate-mono.svg",
        technologies: ["Java", "MySQL", "Maven", "JUnit", "Linux"],
        contributorIds: ["m2"],
        categories: ["Developer Tools", "Backend Systems"],
        featured: false,
        year: "2024",
        detail: {
            overview: "MigrateMono applies versioned SQL migrations with a hard rule: every up script must ship with a down script or a declared, reviewed exception. The tool prints a plan before it touches the database.",
            problem: "Our own projects lost staging databases to hand-run SQL. Migrations lived in a notes file, applied order depended on who ran them first, and rollback was an apology.",
            solution: "Migrations are numbered files with paired reversals, checksummed so drift is detected before deploy. A dry-run prints the exact statement sequence and estimated locks; applying requires an explicit target environment name.",
            keyFeatures: [
                "Paired up/down scripts enforced at the file-layout level",
                "Drift detection by checksum against the applied history table",
                "Dry-run plan output with lock estimates before anything executes",
                "Environment name must be typed, so staging never gets 'the prod migration'",
            ],
            contributions: [
                { memberId: "m2", note: "Built the CLI, checksum drift detection and the reversal enforcement rules." },
            ],
        },
    },
];
/**
 * The API can replace this storage layer later. Keeping the browser fallback
 * here means the admin editor works in the static deployment too, while every
 * existing public page continues to use the same `projects` export.
 */
const PROJECTS_STORAGE_KEY = "fullstack-crew.projects";
function readStoredProjects() {
    if (typeof window === "undefined")
        return null;
    try {
        if (new URLSearchParams(window.location.search).get("adminPreview") === "1") {
            const preview = JSON.parse(window.sessionStorage.getItem("fullstack-crew.admin-preview") ?? "{}");
            if (Array.isArray(preview.projects)) return preview.projects;
        }
        const value = JSON.parse(window.localStorage.getItem(PROJECTS_STORAGE_KEY) ?? "null");
        return Array.isArray(value) ? value : null;
    }
    catch {
        return null;
    }
}
export const projects = readStoredProjects() ?? seedProjects;
export function saveProjects(nextProjects) {
    if (typeof window === "undefined")
        return;
    window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(nextProjects));
}
export function resetProjects() {
    if (typeof window === "undefined")
        return;
    window.localStorage.removeItem(PROJECTS_STORAGE_KEY);
}
export const projectCategories = Array.from(new Set(projects.flatMap((p) => p.categories))).sort();
