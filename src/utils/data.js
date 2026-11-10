import { teamMembers } from "../data/teamMembers";
import { projects } from "../data/projects";
import { technologies } from "../data/technology";
import { achievements } from "../data/achievements";
const memberById = new Map(teamMembers.map((m) => [m.id, m]));
const projectBySlug = new Map(projects.map((p) => [p.slug, p]));
export function getMemberBySlug(slug) {
    if (!slug)
        return undefined;
    return teamMembers.find((m) => m.slug === slug || m.aliases?.includes(slug));
}
export function getMemberById(id) {
    return memberById.get(id);
}
/** contributorIds on the project record is the single source of truth. */
export function projectsForMember(memberId) {
    return projects.filter((p) => p.contributorIds.includes(memberId));
}
export function featuredProjectsFor(member) {
    return member.featuredProjectSlugs
        .map((slug) => projectBySlug.get(slug))
        .filter((p) => Boolean(p));
}
export function getProjectBySlug(slug) {
    if (!slug)
        return undefined;
    return projectBySlug.get(slug);
}
export function projectContributors(project) {
    return project.contributorIds.map((id) => memberById.get(id)).filter((m) => Boolean(m));
}
export function relatedProjects(project, limit = 3) {
    const sharesTech = (p) => p.technologies.some((t) => project.technologies.includes(t));
    const sharesPerson = (p) => p.contributorIds.some((id) => project.contributorIds.includes(id));
    return projects
        .filter((p) => p.slug !== project.slug)
        .map((p) => ({ p, score: (sharesTech(p) ? 2 : 0) + (sharesPerson(p) ? 1 : 0) }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((entry) => entry.p);
}
export function technologiesForMember(memberId) {
    return technologies.filter((t) => t.memberIds.includes(memberId));
}
export function technologiesByCategory() {
    const groups = new Map();
    for (const t of technologies) {
        const list = groups.get(t.category);
        if (list)
            list.push(t);
        else
            groups.set(t.category, [t]);
    }
    return [...groups.entries()].map(([category, items]) => ({ category, items }));
}
export function achievementsForMember(memberId) {
    return achievements.filter((a) => a.memberId === memberId);
}
/**
 * Counts derived from the shipped data files, so every figure on the site is a
 * verifiable statement about this repository rather than an invented statistic.
 */
export const crewStats = {
    developers: teamMembers.length,
    projects: projects.length,
    technologies: technologies.length,
    milestones: achievements.length,
};
export function formatMonthLabel(iso) {
    const [year, month] = iso.split("-");
    const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const index = Number(month) - 1;
    return Number.isInteger(index) && index >= 0 && index < 12 ? `${names[index]} ${year}` : iso;
}
export function initialsOf(name) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
        .slice(0, 2);
}
export const teamRoutes = teamMembers.map((m) => `/team/${m.slug}`);
