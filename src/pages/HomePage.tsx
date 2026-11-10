import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BackdropDecor } from "../components/animations/BackdropDecor";
import { GithubMark } from "../components/common/BrandIcons";
import { StaggerText } from "../components/animations/StaggerText";
import { Reveal, StaggerGroup, staggerItem } from "../components/animations/Reveal";
import { ActionButton } from "../components/common/ActionButton";
import { SectionHeader, TechChips, accentStyle } from "../components/common/SectionHeader";
import { TeamSection } from "../components/team/TeamSection";
import { ProjectCard } from "../components/projects/ProjectCard";
import { TeamCollage } from "../components/team/TeamCollage";
import { useSeo } from "../hooks/useSeo";
import { useGsapSequence } from "../hooks/useGsapSequence";
import { brand, coreValues, heroHeadline, workflow } from "../data/site";
import { teamMembers } from "../data/teamMembers";
import { projects } from "../data/projects";
import { technologies } from "../data/technology";
import { crewStats, projectsForMember } from "../utils/data";

const heroTech = ["React", "JavaScript", "Java", "Spring Boot", "Bootstrap", "MySQL"];

function HeroCodeCard() {
  const lines = [
    { indent: 0, parts: [{ t: "const", c: "#845EC2" }, { t: " crew ", c: "#F8FAFC" }, { t: "=", c: "#FFD166" }, { t: " {", c: "#94A3B8" }] },
    { indent: 1, parts: [{ t: "stack:", c: "#06D6A0" }, { t: ' ["react", "spring", "mysql"]', c: "#C8F169" }, { t: ",", c: "#94A3B8" }] },
    { indent: 1, parts: [{ t: "members:", c: "#06D6A0" }, { t: " teamMembers.length", c: "#FFD166" }, { t: ",", c: "#94A3B8" }] },
    { indent: 1, parts: [{ t: "shapes:", c: "#06D6A0" }, { t: " async () => {", c: "#FF6B35" }] },
    { indent: 2, parts: [{ t: "const", c: "#845EC2" }, { t: " build ", c: "#F8FAFC" }, { t: "=", c: "#FFD166" }, { t: " await ship(spec)", c: "#4361EE" }, { t: ";", c: "#94A3B8" }] },
    { indent: 2, parts: [{ t: "return", c: "#845EC2" }, { t: " build.reviewedBy(", c: "#F8FAFC" }, { t: "peer", c: "#FF5A7A" }, { t: ");", c: "#94A3B8" }] },
    { indent: 1, parts: [{ t: " },", c: "#FF6B35" }] },
    { indent: 0, parts: [{ t: "};", c: "#94A3B8" }] },
  ];

  return (
    <div className="surface overflow-hidden border-ink/10 bg-ink/95 shadow-[0_30px_60px_-30px_rgba(0,0,0,.7)] backdrop-blur">
      <div className="flex items-center gap-2 border-b border-paper/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-coral" />
        <span className="h-3 w-3 rounded-full bg-yellow" />
        <span className="h-3 w-3 rounded-full bg-mint" />
        <span className="ml-2 font-mono text-[0.7rem] text-paper/45">crew.config.ts</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[0.72rem] leading-relaxed sm:text-[0.8rem]">
        {lines.map((line, index) => (
          <div key={index} className="flex gap-3">
            <span className="w-4 shrink-0 select-none text-right text-paper/25">{index + 1}</span>
            <span style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
              {line.parts.map((part, partIndex) => (
                <span key={partIndex} style={{ color: part.c }}>
                  {part.t}
                </span>
              ))}
            </span>
          </div>
        ))}
        <span className="ml-7 inline-block h-4 w-2 animate-blink bg-lime align-middle" aria-hidden="true" />
      </pre>
    </div>
  );
}

export default function HomePage() {
  useSeo({
    title: `${brand.name} | ${brand.tagline}`,
    description: brand.description,
    path: "/",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const shapesY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const pinnedRef = useGsapSequence((root, ScrollTrigger) => {
    const track = root.querySelector<HTMLElement>("[data-workflow-track]");
    if (!track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-workflow-card]"));
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(28px)";
    });

    ScrollTrigger.create({
      trigger: track,
      start: "top 78%",
      end: "bottom 30%",
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress;
        cards.forEach((card, index) => {
          const local = progress * cards.length - index;
          const visible = Math.min(1, Math.max(0, local * 1.6));
          card.style.opacity = String(visible);
          card.style.transform = `translateY(${(1 - visible) * 28}px)`;
        });
      },
    });
  });

  const featured = projects.filter((p) => p.featured);
  const previewProject = featured[0] ?? projects[0]!;
  const secondaryProjects = featured.slice(1).concat(projects.filter((p) => !p.featured)).slice(0, 2);

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section ref={heroRef} className="on-ink-deep relative overflow-hidden">
        <BackdropDecor tone="dark" variant="hero" />
        <motion.div style={{ y: shapesY }} aria-hidden="true" className="absolute inset-0">
          <div className="absolute right-[12%] top-[22%] h-40 w-40 rounded-3xl border-2 border-violet/60 rotate-[14deg]" />
          <div className="absolute left-[44%] bottom-[12%] h-24 w-24 rounded-full border-2 border-yellow/50" />
        </motion.div>

        <div className="shell relative grid min-h-dvh items-center gap-14 pb-20 pt-36 lg:grid-cols-[1.15fr_1fr] lg:pb-28">
          <motion.div style={{ y: copyY }} className="flex flex-col gap-7">
            <Reveal>
              <span className="eyebrow" style={accentStyle("#C8F169")}>
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {crewStats.developers} full-stack developers · {brand.location}
              </span>
            </Reveal>

            <StaggerText
              words={heroHeadline}
              accentWords={["DIGITAL", "FUTURE."]}
              accentClassName="text-lime"
              className="font-display text-hero font-bold text-paper"
            />

            <Reveal delay={0.5}>
              <p className="max-w-xl text-lede text-paper/72">{brand.description}</p>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="flex flex-wrap items-center gap-3">
                <ActionButton to="/team" variant="lime">
                  Meet the Team
                </ActionButton>
                <ActionButton to="/projects" variant="ghost">
                  Explore Our Projects
                </ActionButton>
              </div>
            </Reveal>

            <Reveal delay={0.7}>
              <ul className="flex flex-wrap items-center gap-2">
                {heroTech.map((tech) => (
                  <li key={tech}>
                    <span className="chip" style={accentStyle("#4361EE")}>
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </motion.div>

          <motion.div style={{ y: cardY }} className="relative flex flex-col gap-6">
            <HeroCodeCard />

            <Reveal delay={0.35}>
              <Link
                to={`/project/${previewProject.slug}`}
                className="card-accent group flex items-center gap-4 border border-paper/12 bg-ink/70 p-4 backdrop-blur"
                style={accentStyle("#06D6A0")}
              >
                <img
                  src={previewProject.thumbnail}
                  alt=""
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-20 w-28 shrink-0 rounded-xl object-cover"
                />
                <span className="flex flex-col gap-1">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-lime">
                    Latest case study
                  </span>
                  <span className="font-display text-lg font-bold text-paper group-hover:text-[var(--accent)]">
                    {previewProject.title}
                  </span>
                </span>
              </Link>
            </Reveal>
          </motion.div>
        </div>

        <a
          href="#team"
          className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/55 transition-colors hover:text-lime md:flex"
          aria-label="Scroll to the team section"
        >
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.24em]">Scroll</span>
          <span className="relative flex h-11 w-6 justify-center rounded-full border border-paper/30">
            <span className="mt-1.5 h-2 w-2 animate-scroll-cue rounded-full bg-lime" />
          </span>
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </section>

      {/* ------------------------------------------------------------- marquee */}
      <div className="on-ink overflow-hidden border-y border-paper/10 py-5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap will-change-transform">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center gap-10" aria-hidden={copy === 1}>
              {technologies.slice(0, 22).map((tech) => (
                <li key={tech.name} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  <span className="font-display text-lg font-semibold text-paper/80">{tech.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------- team narrative */}
      <section className="relative overflow-hidden bg-paper" aria-labelledby="people-heading">
        <BackdropDecor tone="light" variant="section" />
        <div className="shell stack-pad relative grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow="Who we are"
              accent="#845EC2"
              title={
                <span id="people-heading">
                  THE PEOPLE
                  <br />
                  BEHIND <span className="text-violet">THE CODE.</span>
                </span>
              }
              lede="Three developers who share one backlog and review each other's work. We take a request from a blank page to a deployed product: framing it, designing the flows, building front and back end, testing on real devices, then watching it run."
            />

            <Reveal delay={0.1}>
              <p className="max-w-xl text-ink/70">
                We are deliberately small. Everyone on the crew writes code, reviews code and talks to the
                person using what we ship — so decisions about structure, naming and scope get made by the
                people who have to maintain them.
              </p>
            </Reveal>

            <StaggerGroup className="mt-2 grid gap-4 sm:grid-cols-2" stagger={0.08}>
              {coreValues.map((value) => (
                <motion.div key={value.title} variants={staggerItem}>
                  <div
                    className="surface group h-full border-t-4 p-5 transition-transform duration-300 hover:-translate-y-1"
                    style={{ borderTopColor: value.accent }}
                  >
                    <h3 className="font-display text-lg font-bold">{value.title}</h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-ink/68">{value.body}</p>
                  </div>
                </motion.div>
              ))}
            </StaggerGroup>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-3 pt-2">
                <ActionButton to="/team" variant="ink">
                  Meet the developers
                </ActionButton>
                <ActionButton to="/skills" variant="ghost">
                  Our stack
                </ActionButton>
              </div>
            </Reveal>
          </div>

          <TeamCollage />
        </div>
      </section>

      {/* ------------------------------------------------------------ the team */}
      <TeamSection members={teamMembers} variant="home" tone="dark" accent="#C8F169" />

      {/* ----------------------------------------------------- workflow (pinned) */}
      <section className="relative overflow-hidden bg-mist" aria-labelledby="workflow-heading">
        <div className="shell stack-pad">
          <SectionHeader
            eyebrow="Development philosophy"
            accent="#FF6B35"
            title={<span id="workflow-heading">FROM BRIEF TO PRODUCTION, IN FIVE MOVES.</span>}
            lede="The same path every project takes, whether it is a dashboard or a CLI. Scroll to walk it."
          />

          <div ref={pinnedRef}>
            <ol data-workflow-track className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {workflow.map((stage) => (
                <li
                  key={stage.step}
                  data-workflow-card
                  className="surface flex min-h-56 flex-col gap-3 p-5"
                  style={{ borderBottom: `4px solid ${stage.accent}` }}
                >
                  <span className="font-mono text-sm tracking-[0.2em]" style={{ color: stage.accent }}>
                    {stage.step}
                  </span>
                  <h3 className="font-display text-xl font-bold">{stage.title}</h3>
                  <p className="text-[0.9rem] leading-relaxed text-ink/68">{stage.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- projects */}
      <section className="relative overflow-hidden bg-paper" aria-labelledby="work-heading">
        <div className="shell stack-pad">
          <SectionHeader
            eyebrow="Selected work"
            accent="#FF6B35"
            title={<span id="work-heading">PROJECTS THAT SPEAK FOR US.</span>}
            lede="Six builds covering realtime dashboards, multi-tenant backends, storefronts and developer tooling."
            action={
              <ActionButton to="/projects" variant="ink" withArrow={false}>
                All {crewStats.projects} projects
              </ActionButton>
            }
          />

          <StaggerGroup className="mt-12 grid gap-6" stagger={0.1}>
            {previewProject ? <ProjectCard project={previewProject} size="featured" /> : null}
            <div className="grid gap-6 md:grid-cols-2">
              {secondaryProjects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  accent={index % 2 === 0 ? "#845EC2" : "#06D6A0"}
                />
              ))}
            </div>
          </StaggerGroup>
        </div>
      </section>

      {/* ------------------------------------------------------- per-member tech */}
      <section className="on-ink relative overflow-hidden" aria-labelledby="crew-stack-heading">
        <BackdropDecor tone="dark" variant="section" />
        <div className="shell stack-pad relative">
          <SectionHeader
            eyebrow="Who builds what"
            tone="dark"
            accent="#06D6A0"
            title={<span id="crew-stack-heading">ONE STACK, THREE PERSPECTIVES.</span>}
            lede="Each developer's core tools. Names link through to their individual portfolio."
            action={
              <ActionButton to="/skills" variant="lime" withArrow={false}>
                Full technology stack
              </ActionButton>
            }
          />

          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.1}>
            {teamMembers.map((member) => (
              <motion.article
                key={member.id}
                variants={staggerItem}
                className="card-accent flex flex-col gap-4 border border-paper/12 bg-ink/60 p-6"
                style={accentStyle(member.accent)}
              >
                <Link
                  to={`/team/${member.slug}`}
                  className="font-display text-xl font-bold text-paper transition-colors hover:text-[var(--accent)]"
                >
                  {member.name}
                </Link>
                <p className="text-[0.85rem] text-paper/55">{member.specialty}</p>
                <TechChips items={projectsForMember(member.id).flatMap((p) => p.technologies).slice(0, 8)} accent={member.accent} limit={8} />
              </motion.article>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* --------------------------------------------------------------- CTA */}
      <section className="relative overflow-hidden bg-lime">
        <div className="shell flex flex-col items-start gap-6 py-16 md:py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <Reveal>
              <span className="eyebrow" style={accentStyle("#111827")}>
                <GithubMark className="h-3.5 w-3.5" />
                Open to collaboration
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-display leading-none text-ink">
                HAVE A BUILD IN MIND?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-ink/75">
                Tell us what the product has to do. We will come back with a plan, a scope and a date we can hold.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-3">
              <ActionButton to="/contact" variant="ink">
                Contact the crew
              </ActionButton>
              <ActionButton to="/team" variant="ghost">
                Individual portfolios
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
