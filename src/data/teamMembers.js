import { hydrateArray } from "../utils/contentStorage";
/**
 * ---------------------------------------------------------------------------
 * DEMONSTRATION ROSTER
 * Names, biographies, skills and projects below are example content so every
 * route renders with real, distinct data. Swap them for your actual team in
 * this file only — routing, cards and detail pages read from here.
 * `githubUrl` / `linkedinUrl` / `portfolioUrl` are intentionally left unset:
 * the UI only renders social links that resolve to a real profile.
 * ---------------------------------------------------------------------------
 */
export const DEMONSTRATION_NOTICE = "";
export const teamMembers = [
    {
        id: "m1",
        slug: "manishkanna-j",
        name: "Manish Kanna J",
        role: "Full-Stack Developer · Team Lead",
        shortBio: "I build responsive web applications and the scalable backend systems behind them, then make sure both ship on the same day.",
        biography: "Manish Kanna J coordinates the crew: he turns a rough idea into a build plan, splits it into work that can land in a week, and reviews the parts he is not writing himself. He moved from Java services to React frontends and never gave up either, which is why most of the team's architecture notes start with a database diagram.",
        photo: "/images/avatars/my-profile.png",
        location: "Chennai, India",
        skills: [
            "React",
            "JavaScript",
            "CSS",
            "Java",
            "Spring Boot",
            "REST APIs",
            "MySQL",
            "Git",
            "GitHub Actions",
            "Postman",
            "Figma",
            "Firebase",
        ],
        email: "Manishpvt19@gmail.com",
        featuredProjectSlugs: ["pulseboard", "a11y-radar", "verdant-cart"],
        achievements: [
            "Led the crew through three end-to-end product builds, from brief to deployed URLs.",
            "Built the team's shared CI workflow that runs type checks, tests and a Lighthouse pass on every pull request.",
            "Introduced the accessibility checklist the team now clears before any UI review.",
        ],
        accent: "#4361EE",
        specialty: "React + Spring Boot systems that stay readable at 2am",
        expandedBio: "I start most problems at the data layer. Once the entities and their transitions are honest, the API falls out of them and the interface stops being a negotiation. As team lead I care about two things: that a junior can open any repo here and find their way, and that what we demo on Friday was running in production on Thursday.",
        interests: ["API design", "Performance budgets", "Distributed transactions", "Mentoring"],
        strengths: [
            "Turning a vague request into a scoped, testable build plan",
            "Debugging across the boundary between client and server",
            "Keeping pull requests small enough to actually read",
        ],
        approach: "Write the failing case first, make it pass with the boring solution, then measure before optimising anything.",
        collaboration: "Pair on the first draft of anything new, review everything else asynchronously with links instead of opinions.",
        skillGroups: {
            frontend: ["React", "JavaScript", "CSS", "HTML"],
            backend: ["Java", "Spring Boot", "Spring Security", "REST APIs"],
            database: ["MySQL", "MongoDB"],
            tools: ["Git", "GitHub", "GitHub Actions", "Postman", "Docker"],
        },
    },
    {
        id: "m2",
        slug: "sivakumar-a",
        aliases: ["siva"],
        name: "Sivakumar A",
        role: "Full-Stack Developer · Backend Specialist",
        shortBio: "I design the Java services and MySQL schemas the rest of the team builds against, and I care what happens on row one million.",
        biography: "Sivakumar A owns the server side of the crew's work: Spring Boot services, security configuration, migrations and the query plans nobody else wants to read. He is the one who adds the index before the demo, and the one who can explain why the endpoint is slow.",
        location: "Chennai, India",
        photo: "/images/avatars/siva.png",
        skills: ["Java", "Spring Boot", "Spring Security", "MySQL", "Redis", "JUnit", "Docker", "Maven", "Linux"],
        email: "siva@fullstackcrew.example",
        featuredProjectSlugs: ["shard-api", "migrate-mono", "pulseboard"],
        achievements: [
            "Cut a report query from 11 seconds to under 200 milliseconds by restructuring the schema and adding a covering index.",
            "Designed the multi-tenant isolation model used by the team's API gateway.",
            "Wrote the migration tooling the crew now uses for every schema change.",
        ],
        accent: "#f7b32b",
        specialty: "Spring Boot services, MySQL schemas and query plans",
        expandedBio: "Backend work is mostly restraint. The tempting abstraction is usually the wrong one; the boring join table is usually the right one. I spend my time on the parts users never see: connection pools, transaction boundaries, migrations that can be rolled back, and logs that are specific enough to debug from.",
        interests: ["Query optimisation", "Distributed systems", "Security modelling", "Observability"],
        strengths: [
            "Modelling data so constraints live in the schema, not in comments",
            "Reading execution plans and fixing the actual bottleneck",
            "Writing migrations that survive a rollback",
        ],
        approach: "Model the data first, protect it with validation at the boundary, and only add caching once something is measurably slow.",
        collaboration: "I publish the contract — schema, endpoints, error shapes — before implementation so the frontend is never blocked waiting on me.",
        skillGroups: {
            frontend: ["HTML", "CSS", "JavaScript"],
            backend: ["Java", "Spring Boot", "Spring Security", "REST APIs", "Node.js"],
            database: ["MySQL", "MongoDB", "Redis"],
            tools: ["Git", "Maven", "Docker", "Linux", "Postman"],
        },
    },
    {
        id: "m3",
        slug: "moneshkumar-m",
        aliases: ["sanjay"],
        name: "Moneshkumar M",
        role: "Full-Stack Developer · Frontend Specialist",
        shortBio: "I build the interfaces: motion, layout and interaction detail that make our products feel deliberate instead of assembled.",
        biography: "Moneshkumar M owns the browser side of the crew. He builds the design tokens, the component library and the animation layer, then argues for the keyboard shortcut nobody asked for. His reviews are mostly about spacing, focus states and whether something responds in under 200 milliseconds.",
        location: "Hyderabad, India",
        photo: "/images/avatars/sanjay.svg",
        skills: ["React", "JavaScript", "Bootstrap","Figma", "Vite"],
        email: "sanjay@fullstackcrew.example",
        featuredProjectSlugs: ["code-canvas", "verdant-cart", "pulseboard"],
        achievements: [
            "Built the crew's shared component library and the token set every project now starts from.",
            "Took two dashboards to a clean Lighthouse accessibility pass, including full keyboard-only flows.",
            "Set up the team's reduced-motion policy for scroll animation.",
        ],
        accent: "#00b899",
        specialty: "Interaction design, animation systems and accessible React",
        expandedBio: "A frontend is finished when it behaves well on a three-year-old phone with one thumb, not when it matches the mockup. I treat motion as feedback: it should explain what just happened and then get out of the way. Everything I build has a keyboard path and a reduced-motion fallback before it has a hover effect.",
        interests: ["Motion design", "Design systems", "Accessibility", "Rendering performance"],
        strengths: [
            "Composing layouts that hold up from 320px to 1920px",
            "Animation that communicates state instead of decorating it",
            "Turning a Figma file into reusable tokens and components",
        ],
        approach: "Build the real component with the ugliest data first, then style it, then animate it — never the other way round.",
        collaboration: "I hand over components with the states already drawn — loading, empty, error — so nobody invents them downstream.",
        skillGroups: {
            frontend: ["React", "JavaScript", "Bootstrap", "HTML", "CSS"],
            backend: ["Node.js", "Express"],
            database: ["MongoDB"],
            tools: ["Figma", "Git", "GitHub", "Vite", "Chrome DevTools"],
        },
    },
];
hydrateArray("teamMembers", teamMembers);
export const teamMemberCount = teamMembers.length;
