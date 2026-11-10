import { useMemo, useState } from "react";
import { FolderSearch } from "lucide-react";
import { PageHero } from "../components/sections/PageHero";
import { ProjectCard } from "../components/projects/ProjectCard";
import { StaggerGroup, Reveal } from "../components/animations/Reveal";
import { useSeo } from "../hooks/useSeo";
import { brand } from "../data/site";
import { projects, projectCategories } from "../data/projects";
import { teamMembers } from "../data/teamMembers";
import { DemoNotice } from "../components/common/EmptyState";
import { crewStats } from "../utils/data";
import { accentStyle } from "../components/common/SectionHeader";

const accentCycle = ["#FF6B35", "#845EC2", "#06D6A0", "#4361EE", "#FF5A7A", "#FFD166"];

export default function ProjectsPage() {
  useSeo({
    title: `${brand.name} — Projects`,
    description: `Team projects from Team Vinsmokes: realtime dashboards, multi-tenant APIs, storefronts and developer tooling. ${crewStats.projects} builds with full case studies.`,
    path: "/projects",
  });

  const [category, setCategory] = useState<string>("All");
  const [memberFilter, setMemberFilter] = useState<string>("all");

  const visible = useMemo(
    () =>
      projects.filter((project) => {
        const inCategory = category === "All" || project.categories.includes(category);
        const inCrew = memberFilter === "all" || project.contributorIds.includes(memberFilter);
        return inCategory && inCrew;
      }),
    [category, memberFilter],
  );

  const featuredList = visible.filter((project) => project.featured);
  const rest = visible.filter((project) => !project.featured);

  return (
    <>
      <PageHero
        accent="#FF6B35"
        eyebrow="Selected work"
        titleWords={["PROJECTS", "THAT", "SPEAK", "FOR US."]}
        accentWords={["SPEAK"]}
        lede="Six builds, three developers, one backlog. Every card opens a case study with the problem, the solution and who did what."
        crumbs={[{ label: "Projects" }]}
      />

      <section className="relative bg-paper" aria-label="Project gallery">
        <div className="shell stack-pad">
          {/* Filters: real UI state, no dead controls. */}
          <Reveal>
            <div className="flex flex-col gap-5 rounded-2xl border border-mist bg-mist/45 p-5">
              <div>
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/50">Filter by category</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["All", ...projectCategories].map((name) => {
                    const active = category === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setCategory(name)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                          active
                            ? "bg-ink text-lime"
                            : "bg-paper text-ink/65 hover:-translate-y-0.5 hover:text-electric"
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/50">Filter by developer</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    aria-pressed={memberFilter === "all"}
                    onClick={() => setMemberFilter("all")}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      memberFilter === "all" ? "bg-ink text-lime" : "bg-paper text-ink/65 hover:-translate-y-0.5"
                    }`}
                  >
                    Whole crew
                  </button>
                  {teamMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      aria-pressed={memberFilter === member.id}
                      onClick={() => setMemberFilter(member.id)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                        memberFilter === member.id ? "text-ink" : "bg-paper text-ink/65 hover:-translate-y-0.5"
                      }`}
                      style={
                        memberFilter === member.id
                          ? { background: member.accent }
                          : accentStyle(member.accent)
                      }
                    >
                      {member.name}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-sm text-ink/55" role="status" aria-live="polite">
                Showing {visible.length} of {projects.length} projects.
              </p>
            </div>
          </Reveal>

          {visible.length === 0 ? (
            <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-mist p-8">
              <FolderSearch className="h-8 w-8 text-ink/30" aria-hidden="true" />
              <h3 className="font-display text-2xl font-bold">No project matches that pair.</h3>
              <p className="text-ink/65">Try a different category, or reset the developer filter.</p>
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setMemberFilter("all");
                }}
                className="btn btn--ink mt-2"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-12 flex flex-col gap-14">
              {featuredList.length > 0 ? (
                <div>
                  <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/45">Featured</h3>
                  <StaggerGroup className="mt-5 flex flex-col gap-6" stagger={0.1}>
                    {featuredList.map((project, index) => (
                      <ProjectCard
                        key={project.slug}
                        project={project}
                        size="featured"
                        accent={accentCycle[index % accentCycle.length]!}
                      />
                    ))}
                  </StaggerGroup>
                </div>
              ) : null}

              {rest.length > 0 ? (
                <div>
                  <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-ink/45">More builds</h3>
                  <StaggerGroup className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3" stagger={0.08}>
                    {rest.map((project, index) => (
                      <ProjectCard
                        key={project.slug}
                        project={project}
                        accent={accentCycle[(index + 1) % accentCycle.length]!}
                      />
                    ))}
                  </StaggerGroup>
                </div>
              ) : null}
            </div>
          )}

          <div className="mt-14">
            <DemoNotice>
              Case-study copy is demonstration content. Live demo and repository buttons appear automatically as soon
              as those URLs are filled in src/data/projects.ts.
            </DemoNotice>
          </div>
        </div>
      </section>
    </>
  );
}
