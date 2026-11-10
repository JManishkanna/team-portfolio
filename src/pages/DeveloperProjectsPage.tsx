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
    title: member ? `${member.name} — Projects | FullStack Crew` : "Projects | FullStack Crew",
    description: member
      ? `Projects built by ${member.name} (${member.role}) with FullStack Crew, including their specific contribution to each one.`
      : "Developer project list.",
    path: member ? `/team/${member.slug}/projects` : "/team",
  });

  if (!member) return <NotFoundPage />;

  const mine = projectsForMember(member.id);
  const basePath = `/team/${member.slug}`;

  return (
    <>
      <PageHero
        accent={member.accent}
        eyebrow={`${member.name} · ${member.role}`}
        titleWords={["MY", "BUILD", "LOG."]}
        accentWords={["BUILD"]}
        lede={
          mine.length > 0
            ? `Every project below lists ${member.name} as a contributor. The case study page breaks out what each person did.`
            : "Nothing is attributed to this developer yet."
        }
        crumbs={[{ label: "Team", to: "/team" }, { label: member.name, to: basePath }, { label: "Projects" }]}
        aside={
          <div className="flex flex-col gap-2 rounded-2xl border border-paper/15 bg-ink/50 p-5 backdrop-blur">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-paper/45">Attributed work</span>
            <span className="font-display text-5xl font-bold" style={{ color: member.accent }}>
              {String(mine.length).padStart(2, "0")}
            </span>
            <span className="text-sm text-paper/60">of {crewStats.projects} crew projects</span>
          </div>
        }
      />
      <DeveloperTabs member={member} />

      <section className="relative overflow-hidden bg-paper" aria-label={`${member.name}'s projects`}>
        <div className="shell stack-pad">
          {mine.length === 0 ? (
            <EmptyState
              title="No projects attributed yet"
              body={`Set contributorIds on a project in src/data/projects.ts to include "${member.id}", and it shows up here.`}
              actionTo="/projects"
              actionLabel="See all crew projects"
            />
          ) : (
            <StaggerGroup className="grid gap-6 md:grid-cols-2" stagger={0.09}>
              {mine.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  size={index === 0 && project.featured ? "featured" : "default"}
                  accent={member.accent}
                  hideContributors
                />
              ))}
            </StaggerGroup>
          )}

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <DemoNotice>
              Project records are demonstration content — swap the copy and add your live and repository URLs in
              src/data/projects.ts.
            </DemoNotice>
          </div>
        </div>
      </section>
    </>
  );
}
