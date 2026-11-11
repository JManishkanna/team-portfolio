import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { featuredProjectsFor, projectsForMember } from "../../utils/data";
import { SectionHeader, accentStyle } from "../common/SectionHeader";
import { EmptyState } from "../common/EmptyState";
import { StaggerGroup } from "../animations/Reveal";
import { ProjectCard } from "../projects/ProjectCard";
/** Projects associated with this developer only, via project.contributorIds. */
export function DeveloperProjects({ member, basePath = `/team/${member.slug}` }) {
    const mine = projectsForMember(member.id);
    const featuredNames = new Set(member.featuredProjectSlugs);
    const highlighted = featuredProjectsFor(member);
    return (_jsx("section", { className: "relative overflow-hidden bg-mist", "aria-labelledby": "dev-projects-heading", style: accentStyle(member.accent), children: _jsxs("div", { className: "shell stack-pad", children: [_jsx(SectionHeader, { eyebrow: "Projects", accent: member.accent, title: _jsx("span", { id: "dev-projects-heading", children: "WHAT I SHIPPED WITH THE CREW." }), lede: mine.length > 0
                        ? `${mine.length} project${mine.length === 1 ? "" : "s"} list${mine.length === 1 ? "s" : ""} me as a contributor. Each card links to the full case study, including my specific contribution.`
                        : "No projects are attributed to this developer yet.", action: _jsxs(Link, { to: "/projects", className: "inline-flex items-center gap-1.5 font-semibold text-ink/60 transition-colors hover:text-[var(--accent)]", children: ["All crew projects", _jsx(ArrowUpRight, { className: "h-4 w-4", "aria-hidden": "true" })] }) }), mine.length === 0 ? (_jsx("div", { className: "mt-10", children: _jsx(EmptyState, { title: "Nothing attributed yet", body: `Add this developer's id ("${member.id}") to contributorIds on a project in src/data/projects.js and it appears here automatically.`, actionTo: "/projects", actionLabel: "Browse crew projects" }) })) : (_jsxs(_Fragment, { children: [highlighted.length > 0 ? (_jsx("ul", { className: "mt-10 flex flex-col gap-3", children: highlighted.map((project) => (_jsx(MineRow, { project: project, member: member, featured: featuredNames.has(project.slug) }, project.slug))) })) : null, _jsx(StaggerGroup, { className: "mt-8 grid gap-6 md:grid-cols-2", stagger: 0.09, children: mine.map((project) => (_jsx(ProjectCard, { project: project, accent: member.accent, hideContributors: true }, project.slug))) }), _jsxs("p", { className: "mt-6 text-sm text-ink/50", children: ["Want the detail pages for all of them?", " ", _jsxs(Link, { to: `${basePath}/projects`, className: "font-semibold text-[var(--accent)] underline underline-offset-4", children: ["Full project list for ", member.name.split(" ")[0]] })] })] }))] }) }));
}
function MineRow({ project, member, featured }) {
    const note = project.detail.contributions.find((entry) => entry.memberId === member.id)?.note;
    return (_jsxs("li", { className: "surface flex flex-wrap items-center gap-x-4 gap-y-1 p-4", children: [_jsx(Link, { to: `/project/${project.slug}`, className: "font-display text-lg font-bold transition-colors hover:text-[var(--accent)]", children: project.title }), featured ? (_jsx("span", { className: "rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink", style: { background: member.accent }, children: "Featured" })) : null, note ? _jsx("span", { className: "text-[0.9rem] text-ink/65", children: note }) : null] }));
}
