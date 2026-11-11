import { hydrateArray } from "../utils/contentStorage";
/**
 * DEMONSTRATION RECORD
 * None of these are verified third-party credentials. They describe work that
 * exists inside this portfolio so the timeline renders. Replace with real
 * certifications, hackathon results and awards — and delete anything you cannot
 * evidence — before this page goes anywhere public.
 */
export const achievementsAreDemonstration = true;
export const achievements = [
    {
        id: "a1",
        title: "Crew formed",
        summary: "Three developers started reviewing each other's pull requests on a shared backlog, which is the whole origin story of this portfolio.",
        kind: "milestone",
        date: "2026",
        accent: "#4361EE",
    },
    {
        id: "a2",
        title: "MigrateMono released to internal use",
        summary: "The team's first shared tool: a migration CLI that refuses to run a schema change it cannot reverse.",
        kind: "open-source",
        date: "2026",
        memberId: "m2",
        accent: "#06D6A0",
    },
    {
        id: "a3",
        title: "VerdantCart went live for a real nursery",
        summary: "First production build where the metric that mattered was refunded orders, and they went down.",
        kind: "milestone",
        date: "2026",
        memberId: "m3",
        accent: "#FF6B35",
    },
    {
        id: "a4",
        title: "A11yRadar — tab-order traversal approach",
        summary: "An accessibility auditor that reports findings in keyboard traversal order instead of rule severity.",
        kind: "open-source",
        date: "2026",
        memberId: "m1",
        accent: "#845EC2",
    },
    {
        id: "a5",
        title: "Team-wide accessibility pass",
        summary: "Every interface the crew shipped in one quarter cleared keyboard-only completion and contrast checks.",
        kind: "award",
        date: "2026",
        accent: "#FFD166",
    },
    {
        id: "a6",
        title: "PulseBoard: 11s report query to under 200ms",
        summary: "A covering index plus a restructured event store took the dashboard's slowest path off the critical route.",
        kind: "milestone",
        date: "2026",
        memberId: "m2",
        accent: "#06D6A0",
    },
    {
        id: "a7",
        title: "ShardAPI multi-tenant model adopted",
        summary: "One gateway replaced several per-customer deployments, and bug fixes stopped needing to be applied N times.",
        kind: "milestone",
        date: "2026",
        accent: "#FF5A7A",
    },
];
hydrateArray("achievements", achievements);
export const achievementKindLabels = {
    hackathon: "Hackathon",
    certification: "Certification",
    milestone: "Milestone",
    "open-source": "Open source",
    award: "Award",
};
