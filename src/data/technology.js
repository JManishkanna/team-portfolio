import { hydrateArray } from "../utils/contentStorage";
/**
 * The crew's shared stack. `memberIds` drives the "who works with this" list on
 * /skills and the links from each technology to an individual portfolio.
 * Keep this in step with skillGroups in teamMembers.ts.
 */
export const technologyCategories = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Testing",
    "Design",
    "Collaboration",
];
export const technologies = [
    // Frontend
    { name: "React", category: "Frontend", description: "Component model and hooks for every interface we ship.", memberIds: ["m1", "m3"] },
    { name: "Bootstrap", category: "Frontend", description: "Responsive layout and accessible interface primitives.", memberIds: ["m1", "m3"] },
    { name: "Tailwind CSS", category: "Frontend", description: "Legacy utility styling retained for existing page components.", memberIds: ["m1", "m3"] },
    { name: "Vite", category: "Frontend", description: "Dev server and build pipeline, including this site.", memberIds: ["m3"] },
    { name: "Framer Motion", category: "Frontend", description: "Entrances, page transitions and layout animation.", memberIds: ["m3"] },
    { name: "GSAP ScrollTrigger", category: "Frontend", description: "Pinned sequences and scroll-linked timelines.", memberIds: ["m3"] },
    { name: "HTML", category: "Frontend", description: "Semantic landmarks first; class names after.", memberIds: ["m1", "m2", "m3"] },
    { name: "CSS", category: "Frontend", description: "Grid, flexbox, custom properties and container queries.", memberIds: ["m1", "m2", "m3"] },
    { name: "JavaScript", category: "Frontend", description: "The browser language underneath every interactive experience we ship.", memberIds: ["m1", "m2", "m3"] },
    // Backend
    { name: "Java", category: "Backend", description: "Primary service language for the crew's APIs.", memberIds: ["m1", "m2"] },
    { name: "Spring Boot", category: "Backend", description: "Service scaffolding, configuration and actuator endpoints.", memberIds: ["m1", "m2"] },
    { name: "Spring Security", category: "Backend", description: "Authentication, authorization and tenant-scoped rules.", memberIds: ["m1", "m2"] },
    { name: "REST APIs", category: "Backend", description: "Versioned contracts published before implementation.", memberIds: ["m1", "m2"] },
    { name: "Node.js", category: "Backend", description: "Lightweight services and realtime relays.", memberIds: ["m2", "m3"] },
    { name: "Express", category: "Backend", description: "Small HTTP layers where a full framework is overkill.", memberIds: ["m3"] },
    { name: "WebSockets", category: "Backend", description: "Live event streams for dashboards and pairing tools.", memberIds: ["m2", "m3"] },
    // Database
    { name: "MySQL", category: "Database", description: "System of record for most of our builds; we index early.", memberIds: ["m1", "m2"] },
    { name: "MongoDB", category: "Database", description: "Document stores for events, transcripts and catalog data.", memberIds: ["m1", "m2", "m3"] },
    { name: "Redis", category: "Database", description: "Hot-path caching, rate-limit counters and pub/sub.", memberIds: ["m2"] },
    // DevOps
    { name: "Git", category: "DevOps", description: "Short-lived branches, reviewed before merge, always.", memberIds: ["m1", "m2", "m3"] },
    { name: "GitHub", category: "DevOps", description: "Repositories, pull requests and issue tracking.", memberIds: ["m1", "m3"] },
    { name: "GitHub Actions", category: "DevOps", description: "CI for type checks, tests, builds and audits on every push.", memberIds: ["m1"] },
    { name: "Docker", category: "DevOps", description: "Parity between a laptop and the deployment target.", memberIds: ["m1", "m2"] },
    { name: "Linux", category: "DevOps", description: "The environment everything actually runs in.", memberIds: ["m2"] },
    { name: "Maven", category: "DevOps", description: "Java builds and dependency management.", memberIds: ["m2"] },
    // Testing
    { name: "JUnit", category: "Testing", description: "Unit and integration coverage for the service layer.", memberIds: ["m1", "m2"] },
    { name: "Postman", category: "Testing", description: "Shared collections so QA matches the contract.", memberIds: ["m1", "m2"] },
    { name: "Chrome DevTools", category: "Testing", description: "Performance traces, a11y trees and layout debugging.", memberIds: ["m3"] },
    { name: "axe-core", category: "Testing", description: "Rule engine behind our accessibility checks.", memberIds: ["m1"] },
    // Design
    { name: "Figma", category: "Design", description: "Flows, component specs and the handoff states.", memberIds: ["m3"] },
    { name: "Design tokens", category: "Design", description: "Colour, spacing and type scales as CSS variables.", memberIds: ["m3"] },
    { name: "WCAG", category: "Design", description: "Conformance target we test against, not just cite.", memberIds: ["m1", "m3"] },
    // Collaboration
    { name: "Code review", category: "Collaboration", description: "Every diff read by someone who did not write it.", memberIds: ["m1", "m2", "m3"] },
    { name: "Pairing", category: "Collaboration", description: "First drafts happen with two people on one problem.", memberIds: ["m1", "m2", "m3"] },
    { name: "Tech-debt log", category: "Collaboration", description: "A named, prioritised list instead of quiet resentment.", memberIds: ["m1", "m3"] },
];
hydrateArray("technologies", technologies);
