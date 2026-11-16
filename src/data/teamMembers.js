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
        aliases: ["shiva"],
        name: "Sivakumar A",
        role: "Software Developer",
        shortBio: "I am a Software Developer with 2+ years of professional experience in Laravel backend development. I have hands-on experience in developing RESTful APIs, implementing application modules, integrating backend APIs with frontend applications, working with MySQL databases, and resolving QA-reported issues. I have also worked with Node.js for bug fixing and React.js for frontend API integration. Additionally, I completed Java Full Stack Development training with practical project experience in Java, Spring Boot, React.js, and MySQL. I am passionate about learning new technologies and building efficient web applications",
        biography: "I am a Software Developer with professional experience at Colan Infotech, where I worked on E-commerce and Resume Builder applications using Laravel and MySQL. My responsibilities included backend development, REST API creation, database operations, implementing new features, and resolving application issues. I also gained practical exposure to Node.js and React.js during my work at Blind Matrix. Currently, I am strengthening my Java Full Stack development skills through hands-on projects using Spring Boot, React.js, and MySQL.",
        location: "Chennai, India",
        photo: "/images/avatars/siva.png",
        skills: ["Java", "Spring Boot","PHP", "Laravel", "MySQL", "MongoDB", "React.js", "REST APIs", "HTML", "CSS", "jQuery", "Git", "GitHub", "Postman", "Maven"],
        email: "shivamsccs2024@gmail.com",
        featuredProjectSlugs: ["E-commerce", "Resume-Builder", "ANI-concert"],
        achievements: [
            "Developed and maintained backend services for E-commerce and Resume Builder applications using Laravel and MySQL.",
        ],
        accent: "#38bdf8",
        specialty: "Laravel Backend Development, REST APIs and Full Stack Web Development",
        expandedBio: "My professional journey includes developing Laravel-based web applications, building REST APIs, integrating frontend applications, managing MySQL databases, and fixing application issues. I have contributed to E-commerce and Resume Builder projects and gained additional exposure to Node.js and React.js. I am also developing my skills in Java and Spring Boot through full-stack project development.",
        interests: ["Full Stack Development",
        "Backend Development",
        "Learning New Technologies",
        "Building Web Applications"],
        strengths: [
            "Laravel backend development and REST API creation",
            "MySQL database operations and application development",
            "Frontend and backend API integration",
            "Debugging and resolving QA-reported issues"
        ],
        approach: "I focus on understanding application requirements, developing reliable backend functionality, integrating APIs with frontend applications, and testing features before delivery.",
        collaboration: "I have experience working on backend modules, API integration, QA issue resolution, and coordinating development tasks across application features.",
        skillGroups: {
            frontend: ["HTML",
            "CSS",
            "JavaScript",
            "React.js",
            "jQuery"],
            backend: [ "Java",
                "Laravel",
                "PHP",
                "Spring Boot",
                "Node.js",
                "REST APIs"],
            database: ["MySQL", "MongoDB"],
            tools: [ "Git",
                "GitHub",
                "Postman",
                "VS Code",
                "IntelliJ IDEA",
                "Maven"],
        },
    },
    {
        id: "m3",
        slug: "moneshkumar-m",
        aliases: ["monesh"],
        name: "Moneshkumar M",
        role: "Full-Stack Developer · Frontend Specialist",
        shortBio: "I build the interfaces: motion, layout and interaction detail that make our products feel deliberate instead of assembled.",
        biography: "Moneshkumar M owns the browser side of the crew. He builds the design tokens, the component library and the animation layer, then argues for the keyboard shortcut nobody asked for. His reviews are mostly about spacing, focus states and whether something responds in under 200 milliseconds.",
        location: "Chennai, India",
        photo: "/images/avatars/monesh.jpeg",
        skills: ["React", "JavaScript", "Bootstrap","Figma", "Vite"],
        email: "monesh@fullstackcrew.example",
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
