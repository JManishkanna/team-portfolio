import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project, TeamMember } from "../../types";
import { featuredProjectsFor, projectsForMember } from "../../utils/data";
import { SectionHeader, accentStyle } from "../common/SectionHeader";
import { EmptyState } from "../common/EmptyState";
import { StaggerGroup } from "../animations/Reveal";
import { ProjectCard } from "../projects/ProjectCard";

interface DeveloperProjectsProps {
  member: TeamMember;
  /** Contact page is a separate route; the section links to it instead. */
  basePath?: string;
}

/** Projects associated with this developer only, via project.contributorIds. */
export function DeveloperProjects({ member, basePath = `/team/${member.slug}` }: DeveloperProjectsProps) {
  const mine = projectsForMember(member.id);
  const featuredNames = new Set(member.featuredProjectSlugs);
  const highlighted = featuredProjectsFor(member);

  return (
    <section
      className="relative overflow-hidden bg-mist"
      aria-labelledby="dev-projects-heading"
      style={accentStyle(member.accent)}
    >
      <div className="shell stack-pad">
        <SectionHeader
          eyebrow="Projects"
          accent={member.accent}
          title={<span id="dev-projects-heading">WHAT I SHIPPED WITH THE CREW.</span>}
          lede={
            mine.length > 0
              ? `${mine.length} project${mine.length === 1 ? "" : "s"} list${mine.length === 1 ? "s" : ""} me as a contributor. Each card links to the full case study, including my specific contribution.`
              : "No projects are attributed to this developer yet."
          }
          action={
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 font-semibold text-ink/60 transition-colors hover:text-[var(--accent)]"
            >
              All crew projects
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />

        {mine.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              title="Nothing attributed yet"
              body={`Add this developer's id ("${member.id}") to contributorIds on a project in src/data/projects.ts and it appears here automatically.`}
              actionTo="/projects"
              actionLabel="Browse crew projects"
            />
          </div>
        ) : (
          <>
            {highlighted.length > 0 ? (
              <ul className="mt-10 flex flex-col gap-3">
                {highlighted.map((project) => (
                  <MineRow key={project.slug} project={project} member={member} featured={featuredNames.has(project.slug)} />
                ))}
              </ul>
            ) : null}

            <StaggerGroup className="mt-8 grid gap-6 md:grid-cols-2" stagger={0.09}>
              {mine.map((project) => (
                <ProjectCard key={project.slug} project={project} accent={member.accent} hideContributors />
              ))}
            </StaggerGroup>

            <p className="mt-6 text-sm text-ink/50">
              Want the detail pages for all of them?{" "}
              <Link
                to={`${basePath}/projects`}
                className="font-semibold text-[var(--accent)] underline underline-offset-4"
              >
                Full project list for {member.name.split(" ")[0]}
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

function MineRow({ project, member, featured }: { project: Project; member: TeamMember; featured: boolean }) {
  const note = project.detail.contributions.find((entry) => entry.memberId === member.id)?.note;

  return (
    <li className="surface flex flex-wrap items-center gap-x-4 gap-y-1 p-4">
      <Link
        to={`/project/${project.slug}`}
        className="font-display text-lg font-bold transition-colors hover:text-[var(--accent)]"
      >
        {project.title}
      </Link>
      {featured ? (
        <span className="rounded-full px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-ink" style={{ background: member.accent }}>
          Featured
        </span>
      ) : null}
      {note ? <span className="text-[0.9rem] text-ink/65">{note}</span> : null}
    </li>
  );
}
