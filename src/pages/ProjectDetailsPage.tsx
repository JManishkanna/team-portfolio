import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ExternalLink, Lightbulb, Target, TriangleAlert } from "lucide-react";
import NotFoundPage from "./NotFoundPage";
import { PageHero } from "../components/sections/PageHero";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Reveal, StaggerGroup, staggerItem } from "../components/animations/Reveal";
import { SectionHeader, TechChips, accentStyle } from "../components/common/SectionHeader";
import { ActionButton } from "../components/common/ActionButton";
import { DemoNotice, EmptyState } from "../components/common/EmptyState";
import { useSeo } from "../hooks/useSeo";
import { getProjectBySlug, projectContributors, relatedProjects } from "../utils/data";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

/** /project/:slug — reusable detail layout driven by the project record. */
export default function ProjectDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  useSeo({
    title: project ? `${project.title} | ${project.categories[0]} | FullStack Crew` : "Project not found",
    description: project
      ? `${project.description} Built with ${project.technologies.slice(0, 4).join(", ")}.`
      : "This project does not exist in the FullStack Crew portfolio.",
    path: project ? `/project/${project.slug}` : "/projects",
  });

  if (!project) return <NotFoundPage />;

  const accent = project.featured ? "#FF6B35" : "#845EC2";
  const people = projectContributors(project);
  const screenshots = project.detail.screenshots ?? [];
  const related = relatedProjects(project);

  return (
    <>
      <PageHero
        accent={accent}
        eyebrow={project.categories.join(" · ")}
        titleWords={project.title.toUpperCase().split("")}
        lede={project.description}
        crumbs={[{ label: "Projects", to: "/projects" }, { label: project.title }]}
        aside={
          <div className="flex flex-col gap-3 rounded-2xl border border-paper/15 bg-ink/50 p-5 backdrop-blur">
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-paper/45">Shipped</span>
            <span className="font-display text-3xl font-bold" style={{ color: accent }}>
              {project.year}
            </span>
            <span className="text-sm text-paper/60">
              {people.length} contributor{people.length === 1 ? "" : "s"} · {project.technologies.length} technologies
            </span>
          </div>
        }
      />

      <section className="relative bg-paper" aria-label="Project media">
        <div className="shell stack-pad grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="flex flex-col gap-8">
            <Reveal>
              <figure className="card-accent overflow-hidden border border-mist" style={accentStyle(accent)}>
                <img
                  src={project.thumbnail}
                  alt={`${project.title} cover artwork`}
                  width={1200}
                  height={800}
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover"
                />
                <figcaption className="border-t border-mist px-4 py-3 text-[0.78rem] text-ink/50">
                  Cover artwork. Drop real captures into{" "}
                  <code className="font-mono">public/images/projects/</code> and list them under{" "}
                  <code className="font-mono">detail.screenshots</code> to show them below.
                </figcaption>
              </figure>
            </Reveal>

            {screenshots.length > 0 ? (
              <StaggerGroup className="grid gap-4 sm:grid-cols-2" stagger={0.08}>
                {screenshots.map((shot, index) => (
                  <motion.figure key={shot} variants={staggerItem} className="overflow-hidden rounded-xl border border-mist">
                    <img
                      src={shot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </motion.figure>
                ))}
              </StaggerGroup>
            ) : null}

            <div className="flex flex-col gap-8">
              {[
                { label: "Overview", body: project.detail.overview, Icon: Lightbulb, tint: "#4361EE" },
                { label: "The problem", body: project.detail.problem, Icon: TriangleAlert, tint: "#FF5A7A" },
                { label: "Our solution", body: project.detail.solution, Icon: Target, tint: "#06D6A0" },
              ].map(({ label, body, Icon, tint }) => (
                <Reveal key={label}>
                  <article className="flex flex-col gap-3">
                    <h2 className="flex items-center gap-2.5 font-display text-2xl font-bold">
                      <Icon className="h-5 w-5" style={{ color: tint }} aria-hidden="true" />
                      {label}
                    </h2>
                    <p className="text-lede text-ink/75">{body}</p>
                  </article>
                </Reveal>
              ))}

              <div>
                <h2 className="font-display text-2xl font-bold">Key features</h2>
                <StaggerGroup className="mt-4 grid gap-3 sm:grid-cols-2" stagger={0.06}>
                  {project.detail.keyFeatures.map((feature) => (
                    <motion.li key={feature} variants={staggerItem} className="flex gap-3 rounded-xl border border-mist p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accent }} aria-hidden="true" />
                      <span className="text-[0.94rem] leading-relaxed text-ink/78">{feature}</span>
                    </motion.li>
                  ))}
                </StaggerGroup>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="surface flex flex-col gap-4 p-6">
              <h2 className="font-display text-lg font-bold">Stack</h2>
              <TechChips items={project.technologies} accent={accent} />
            </div>

            <div className="surface flex flex-col gap-4 p-6">
              <h2 className="font-display text-lg font-bold">Built by</h2>
              <ul className="flex flex-col gap-4">
                {people.map((person) => {
                  const note = project.detail.contributions.find((entry) => entry.memberId === person.id)?.note;
                  return (
                    <li key={person.id} className="flex gap-3" style={accentStyle(person.accent)}>
                      <Link to={`/team/${person.slug}`} className="shrink-0">
                        <img
                          src={person.photo}
                          alt=""
                          width={800}
                          height={1000}
                          loading="lazy"
                          className="h-12 w-12 rounded-xl object-cover ring-2 ring-transparent transition-all duration-200 hover:ring-[var(--accent)]"
                        />
                      </Link>
                      <div className="flex flex-col">
                        <Link
                          to={`/team/${person.slug}`}
                          className="font-display font-bold transition-colors hover:text-[var(--accent)]"
                        >
                          {person.name}
                        </Link>
                        <span className="text-[0.75rem] text-ink/50">{person.role}</span>
                        {note ? <span className="mt-1 text-[0.86rem] leading-relaxed text-ink/70">{note}</span> : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="surface flex flex-col gap-3 p-6">
              <h2 className="font-display text-lg font-bold">Links</h2>
              {project.liveDemoUrl || project.githubUrl ? (
                <>
                  {project.liveDemoUrl ? (
                    <a href={project.liveDemoUrl} target="_blank" rel="noreferrer noopener" className="btn w-full justify-center">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Open live demo
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn btn--ghost w-full justify-center"
                    >
                      View source
                    </a>
                  ) : null}
                </>
              ) : (
                <p className="text-[0.9rem] text-ink/60">
                  No live or repository URL is configured for this build. Add{" "}
                  <code className="font-mono text-xs">liveDemoUrl</code> or <code className="font-mono text-xs">githubUrl</code>{" "}
                  in <code className="font-mono text-xs">src/data/projects.ts</code> and the buttons appear.
                </p>
              )}
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 pt-1 text-sm font-semibold text-ink/60 transition-colors hover:text-electric"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All projects
              </Link>
            </div>

            <DemoNotice>Case-study text for this build is demonstration content.</DemoNotice>
          </aside>
        </div>
      </section>

      <section className="on-ink" aria-labelledby="related-heading">
        <div className="shell stack-pad">
          <SectionHeader
            eyebrow="Related"
            tone="dark"
            accent={accent}
            title={<span id="related-heading">BUILT WITH THE SAME PARTS.</span>}
            lede="Projects sharing a stack or a person with this one."
          />

          {related.length > 0 ? (
            <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.08}>
              {related.map((item) => (
                <ProjectCard
                  key={item.slug}
                  project={item}
                  accent={item.contributorIds.includes("m3") ? "#06D6A0" : "#4361EE"}
                  hideContributors
                />
              ))}
            </StaggerGroup>
          ) : (
            <div className="mt-10">
              <EmptyState
                title="Nothing related yet"
                body="No other project shares a technology or a contributor with this one."
                actionTo="/projects"
                actionLabel="Back to all projects"
              />
            </div>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <ActionButton to="/team" variant="lime">
              Meet the people who built it
            </ActionButton>
            <ActionButton to="/contact" variant="ghost">
              Brief us on something similar
            </ActionButton>
          </div>
        </div>
      </section>
    </>
  );
}
