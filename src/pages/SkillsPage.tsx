import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Boxes, Palette, Users } from "lucide-react";
import { PageHero } from "../components/sections/PageHero";
import { Reveal, StaggerGroup, staggerItem } from "../components/animations/Reveal";
import { SectionHeader, accentStyle } from "../components/common/SectionHeader";
import { ActionButton } from "../components/common/ActionButton";
import { useSeo } from "../hooks/useSeo";
import { brand } from "../data/site";
import { technologies, technologyCategories } from "../data/technology";
import { crewStats, getMemberById } from "../utils/data";

const categoryAccent: Record<string, string> = {
  Frontend: "#4361EE",
  Backend: "#06D6A0",
  Database: "#FF6B35",
  DevOps: "#845EC2",
  Testing: "#FFD166",
  Design: "#FF5A7A",
  Collaboration: "#C8F169",
};

/** Two-letter monogram instead of official brand logos: no unverified assets. */
function monogram(name: string) {
  const letters = name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean);
  if (letters.length >= 2) return (letters[0]![0]! + letters[1]![0]!).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function SkillsPage() {
  useSeo({
    title: `${brand.name} — Technology Stack`,
    description: `The full technology stack Team Vinsmokes works with: frontend, backend, database, DevOps, testing, design and collaboration tools — with the developer behind each one.`,
    path: "/skills",
  });

  return (
    <>
      <PageHero
        accent="#845EC2"
        eyebrow="Technology stack"
        titleWords={["OUR", "STACK.", "OUR", "SUPERPOWER."]}
        accentWords={["SUPERPOWER."]}
        lede="Everything the crew actually ships with, grouped by layer. Each entry names who works in it — and their name links to their portfolio."
        crumbs={[{ label: "Skills" }]}
        aside={
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-paper/15 bg-ink/50 p-5 backdrop-blur sm:grid-cols-4 lg:grid-cols-2">
            {[
              { label: "Technologies", value: crewStats.technologies, Icon: Boxes, color: "#845EC2" },
              { label: "Categories", value: technologyCategories.length, Icon: Palette, color: "#06D6A0" },
            ].map(({ label, value, Icon, color }) => (
              <div key={label} className="flex flex-col gap-1">
                <Icon className="h-5 w-5" style={{ color }} aria-hidden="true" />
                <span className="font-display text-3xl font-bold text-paper">{value}</span>
                <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-paper/45">{label}</span>
              </div>
            ))}
          </div>
        }
      />

      <section className="relative bg-paper" aria-label="Technology categories">
        <div className="shell stack-pad flex flex-col gap-16">
          {technologyCategories.map((category, categoryIndex) => {
            const items = technologies.filter((tech) => tech.category === category);
            const accent = categoryAccent[category] ?? "#4361EE";
            if (items.length === 0) return null;

            return (
              <div key={category} style={accentStyle(accent)}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h2 className="font-display text-title font-bold">
                    {String(categoryIndex + 1).padStart(2, "0")} · {category}
                  </h2>
                  <p className="text-sm text-ink/50">{items.length} entries</p>
                </div>

                <StaggerGroup
                  className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  stagger={0.05}
                >
                  {items.map((tech) => (
                    <motion.article
                      key={tech.name}
                      variants={staggerItem}
                      className="card-accent group flex flex-col gap-3 border border-mist bg-paper p-5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink font-display text-sm font-bold text-lime transition-transform duration-300 group-hover:-rotate-6">
                          {monogram(tech.name)}
                        </span>
                        <h3 className="font-display text-lg font-bold">{tech.name}</h3>
                      </div>

                      <p className="text-[0.88rem] leading-relaxed text-ink/68">{tech.description}</p>

                      <div className="mt-auto flex flex-col gap-1.5 border-t border-mist pt-3">
                        <span className="flex items-center gap-1.5 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-ink/40">
                          <Users className="h-3 w-3" aria-hidden="true" />
                          Works with
                        </span>
                        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[0.85rem]">
                          {tech.memberIds.map((id) => {
                            const person = getMemberById(id);
                            if (!person) return null;
                            return (
                              <li key={id}>
                                <Link
                                  to={`/team/${person.slug}`}
                                  className="font-semibold text-ink/70 underline-offset-4 transition-colors hover:text-[var(--accent)] hover:underline"
                                  aria-label={`Open ${person.name}'s portfolio`}
                                >
                                  {person.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </motion.article>
                  ))}
                </StaggerGroup>
              </div>
            );
          })}

          <div className="grid gap-10 border-t border-mist pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <SectionHeader
              eyebrow="How we use it"
              accent="#4361EE"
              title={<span>THE STACK IS A DECISION, NOT A SHOPPING LIST.</span>}
            lede="Java and Spring Boot on the server, React and JavaScript in the browser, Bootstrap for responsive UI, and MySQL when relationships matter. We pick the boring option and spend the saved time on the parts users feel."
            />
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <ActionButton to="/team" variant="ink">
                  See who owns what
                </ActionButton>
                <ActionButton to="/projects" variant="ghost">
                  Stack in production
                </ActionButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
