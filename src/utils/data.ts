import { teamMembers } from "../data/teamMembers";
import { projects } from "../data/projects";
import { technologies } from "../data/technology";
import { achievements } from "../data/achievements";
import type { Project, TeamMember, Technology } from "../types";

const memberById = new Map(teamMembers.map((m) => [m.id, m]));
const projectBySlug = new Map(projects.map((p) => [p.slug, p]));

export function getMemberBySlug(slug: string | undefined): TeamMember | undefined {
  if (!slug) return undefined;
  return teamMembers.find((m) => m.slug === slug);
}

export function getMemberById(id: string): TeamMember | undefined {
  return memberById.get(id);
}

/** contributorIds on the project record is the single source of truth. */
export function projectsForMember(memberId: string): Project[] {
  return projects.filter((p) => p.contributorIds.includes(memberId));
}

export function featuredProjectsFor(member: TeamMember): Project[] {
  return member.featuredProjectSlugs
    .map((slug) => projectBySlug.get(slug))
    .filter((p): p is Project => Boolean(p));
}

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  if (!slug) return undefined;
  return projectBySlug.get(slug);
}

export function projectContributors(project: Project): TeamMember[] {
  return project.contributorIds.map((id) => memberById.get(id)).filter((m): m is TeamMember => Boolean(m));
}

export function relatedProjects(project: Project, limit = 3): Project[] {
  const sharesTech = (p: Project) => p.technologies.some((t) => project.technologies.includes(t));
  const sharesPerson = (p: Project) => p.contributorIds.some((id) => project.contributorIds.includes(id));
  return projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ p, score: (sharesTech(p) ? 2 : 0) + (sharesPerson(p) ? 1 : 0) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.p);
}

export function technologiesForMember(memberId: string): Technology[] {
  return technologies.filter((t) => t.memberIds.includes(memberId));
}

export function technologiesByCategory(): Array<{ category: string; items: Technology[] }> {
  const groups = new Map<string, Technology[]>();
  for (const t of technologies) {
    const list = groups.get(t.category);
    if (list) list.push(t);
    else groups.set(t.category, [t]);
  }
  return [...groups.entries()].map(([category, items]) => ({ category, items }));
}

export function achievementsForMember(memberId: string) {
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
} as const;

export function formatMonthLabel(iso: string): string {
  const [year, month] = iso.split("-");
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const index = Number(month) - 1;
  return Number.isInteger(index) && index >= 0 && index < 12 ? `${names[index]} ${year}` : iso;
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}

export const teamRoutes = teamMembers.map((m) => `/team/${m.slug}`);
