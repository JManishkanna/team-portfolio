import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import NotFoundPage from "./NotFoundPage";
import { PageHero } from "../components/sections/PageHero";
import { DeveloperTabs } from "../components/team/DeveloperTabs";
import { ProjectCard } from "../components/projects/ProjectCard";
import { useMemberFromParams } from "../components/team/useMemberFromParams";
import { useSeo } from "../hooks/useSeo";
import { StaggerGroup } from "../components/animations/Reveal";
import { projectsForMember, crewStats } from "../utils/data";
import { DemoNotice, EmptyState } from "../components/common/EmptyState";
/** /team/:slug/projects — the developer's own project list, filtered by contributor id. */
export default function DeveloperProjectsPage() {
    const { member } = useMemberFromParams();
    useSeo({
        title: member ? `${member.name} — Projects | Team Vinsmokes` : "Projects | Team Vinsmokes",
        description: member
            ? `Projects built by ${member.name} (${member.role}) with Team Vinsmokes, including their specific contribution to each one.`
            : "Developer project list.",
        path: member ? `/team/${member.slug}/projects` : "/team",
    });
    if (!member)
        return _jsx(NotFoundPage, {});
    const mine = projectsForMember(member.id);
    const basePath = `/team/${member.slug}`;
    return (_jsxs(_Fragment, { children: [_jsx(PageHero, { accent: member.accent, eyebrow: `${member.name} · ${member.role}`, titleWords: ["MY", "BUILD", "LOG."], accentWords: ["BUILD"], lede: mine.length > 0
                    ? `Every project below lists ${member.name} as a contributor. The case study page breaks out what each person did.`
                    : "Nothing is attributed to this developer yet.", crumbs: [{ label: "Team", to: "/team" }, { label: member.name, to: basePath }, { label: "Projects" }], aside: _jsxs("div", { className: "flex flex-col gap-2 rounded-2xl border border-paper/15 bg-ink/50 p-5 backdrop-blur", children: [_jsx("span", { className: "font-mono text-[0.68rem] uppercase tracking-[0.18em] text-paper/45", children: "Attributed work" }), _jsx("span", { className: "font-display text-5xl font-bold", style: { color: member.accent }, children: String(mine.length).padStart(2, "0") }), _jsxs("span", { className: "text-sm text-paper/60", children: ["of ", crewStats.projects, " crew projects"] })] }) }), _jsx(DeveloperTabs, { member: member }), _jsx("section", { className: "relative overflow-hidden bg-paper", "aria-label": `${member.name}'s projects`, children: _jsxs("div", { className: "shell stack-pad", children: [mine.length === 0 ? (_jsx(EmptyState, { title: "No projects attributed yet", body: `Set contributorIds on a project in src/data/projects.ts to include "${member.id}", and it shows up here.`, actionTo: "/projects", actionLabel: "See all crew projects" })) : (_jsx(StaggerGroup, { className: "grid gap-6 md:grid-cols-2", stagger: 0.09, children: mine.map((project, index) => (_jsx(ProjectCard, { project: project, size: index === 0 && project.featured ? "featured" : "default", accent: member.accent, hideContributors: true }, project.slug))) })), _jsx("div", { className: "mt-12 flex flex-wrap items-center gap-4", children: _jsx(DemoNotice, { children: "Project records are demonstration content \u2014 swap the copy and add your live and repository URLs in src/data/projects.ts." }) })] }) })] }));
}
