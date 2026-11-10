import { Link } from "react-router-dom";
import { CalendarClock, Quote, Rocket } from "lucide-react";
import { PageHero } from "../components/sections/PageHero";
import { DeveloperAchievements } from "../components/team/DeveloperAchievements";
import { Reveal, StaggerGroup, staggerItem } from "../components/animations/Reveal";
import { SectionHeader, accentStyle } from "../components/common/SectionHeader";
import { ActionButton } from "../components/common/ActionButton";
import { motion } from "framer-motion";
import { useSeo } from "../hooks/useSeo";
import { brand } from "../data/site";
import { teamMembers } from "../data/teamMembers";
import { achievements, achievementsAreDemonstration } from "../data/achievements";
import { projects } from "../data/projects";
import { crewStats } from "../utils/data";

export default function AchievementsPage() {
  useSeo({
    title: `${brand.name} — Achievements`,
    description:
      "Milestones from Team Vinsmokes: shipped products, tooling the team maintains, and engineering results worth pointing at.",
    path: "/achievements",
  });

  const shipped = projects.filter((project) => project.detail.contributions.length > 0).length;

  return (
    <>
      <PageHero
        accent="#FFD166"
        eyebrow="Track record"
        titleWords={["EVIDENCE", "OVER", "ADJECTIVES."]}
        accentWords={["EVIDENCE"]}
        lede="Anything we cannot point at does not appear on this page. No invented rankings, no unverifiable badges — just builds, tools and results."
        crumbs={[{ label: "Achievements" }]}
        aside={
          <div className="flex flex-col gap-4 rounded-2xl border border-paper/15 bg-ink/50 p-6 backdrop-blur">
            <span className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-paper/45">
              <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
              Recorded entries
            </span>
            <span className="font-display text-5xl font-bold text-yellow">
              {String(achievements.length).padStart(2, "0")}
            </span>
            <p className="text-sm text-paper/60">
              spanning {crewStats.developers} developers and {shipped} shipped builds.
            </p>
          </div>
        }
      />

      <DeveloperAchievements scope="all" title="THE CREW'S TIMELINE." eyebrow="All entries" />

      <section className="on-ink relative overflow-hidden" aria-labelledby="people-recognised">
        <div className="shell stack-pad">
          <SectionHeader
            eyebrow="Where it came from"
            tone="dark"
            accent="#06D6A0"
            title={<span id="people-recognised">EACH ENTRY HAS A NAME ATTACHED.</span>}
            lede="Attribution is the point. Open a profile to see the projects and skills behind that person's entries."
          />

          <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {teamMembers.map((member) => {
              const mine = achievements.filter((entry) => entry.memberId === member.id).length;
              return (
                <motion.div key={member.id} variants={staggerItem}>
                  <Link
                    to={`/team/${member.slug}`}
                    className="card-accent flex h-full items-center gap-4 border border-paper/12 bg-ink/55 p-5"
                    style={accentStyle(member.accent)}
                    aria-label={`Open ${member.name}'s portfolio and achievements`}
                  >
                    <img
                      src={member.photo}
                      alt=""
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="h-16 w-16 shrink-0 rounded-xl object-cover"
                    />
                    <span className="flex flex-1 flex-col gap-1">
                      <span className="font-display text-lg font-bold text-paper group-hover:text-[var(--accent)]">
                        {member.name}
                      </span>
                      <span className="text-[0.8rem] text-paper/50">{member.role}</span>
                      <span className="font-mono text-[0.72rem] text-[var(--accent)]">
                        {mine} attributed {mine === 1 ? "entry" : "entries"}
                      </span>
                    </span>
                    <Rocket className="h-5 w-5 shrink-0 text-paper/30" aria-hidden="true" />
                  </Link>
                </motion.div>
              );
            })}
          </StaggerGroup>

          <Reveal delay={0.1}>
            <figure className="mt-16 flex flex-col gap-4 border-l-4 border-lime pl-6">
              <Quote className="h-6 w-6 text-lime" aria-hidden="true" />
              <blockquote className="max-w-3xl font-display text-title leading-tight text-paper">
                “The only metric we trusted was the one a customer could feel: did the thing work, on their phone,
                on their network, the morning after we shipped it.”
              </blockquote>
              <figcaption className="text-sm text-paper/50">
                — how the crew decides what counts as an achievement
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-14 flex flex-wrap gap-3">
            <ActionButton to="/projects" variant="lime">
              See the work
            </ActionButton>
            <ActionButton to="/team" variant="ghost">
              Individual portfolios
            </ActionButton>
          </div>

          {achievementsAreDemonstration ? (
            <Reveal delay={0.15}>
              <p className="mt-10 max-w-3xl text-sm text-paper/55">
                These entries describe work represented inside this portfolio so the timeline renders with real
                structure. Third-party credentials, competition placements and employer claims have deliberately not
                been invented — add verified ones in <code className="font-mono">src/data/achievements.ts</code> and
                clear <code className="font-mono">achievementsAreDemonstration</code> when they are real.
              </p>
            </Reveal>
          ) : null}
        </div>
      </section>
    </>
  );
}
