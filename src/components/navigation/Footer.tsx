import { Link } from "react-router-dom";
import { ArrowUp, Mail } from "lucide-react";
import { Reveal, StaggerGroup, staggerItem } from "../animations/Reveal";
import { motion } from "framer-motion";
import { brand, cta, navItems } from "../../data/site";
import { teamMembers } from "../../data/teamMembers";
import { crewStats } from "../../utils/data";
import { Logo } from "./Logo";

function ColumnHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-paper/45">
      {children}
    </h2>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink-deep relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />

      <div className="shell relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo tone="paper" />
            <p className="font-display text-title leading-none text-lime">{brand.tagline}</p>
            <p className="max-w-sm text-paper/65">{brand.description}</p>
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex w-fit items-center gap-2 font-semibold text-paper transition-colors hover:text-lime"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {brand.email}
            </a>
          </div>

          <nav aria-labelledby="footer-explore">
            <ColumnHeading id="footer-explore">Explore</ColumnHeading>
            <StaggerGroup className="mt-4 flex flex-col gap-2.5">
              {navItems.map((item) => (
                <motion.div key={item.to} variants={staggerItem}>
                  <Link
                    to={item.to}
                    className="group inline-flex items-center gap-2 text-paper/70 transition-colors hover:text-paper"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full transition-transform duration-200 group-hover:scale-150"
                      style={{ background: item.accent }}
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </StaggerGroup>
          </nav>

          <nav aria-labelledby="footer-crew">
            <ColumnHeading id="footer-crew">The crew</ColumnHeading>
            <StaggerGroup className="mt-4 flex flex-col gap-2.5">
              {teamMembers.map((member) => (
                <motion.div key={member.id} variants={staggerItem}>
                  <Link
                    to={`/team/${member.slug}`}
                    className="group inline-flex flex-col text-paper/70 transition-colors hover:text-paper"
                  >
                    <span className="font-semibold">{member.name}</span>
                    <span className="text-[0.78rem] text-paper/45 group-hover:text-lime">{member.role}</span>
                  </Link>
                </motion.div>
              ))}
            </StaggerGroup>
          </nav>

          <div>
            <ColumnHeading id="footer-stats">In this portfolio</ColumnHeading>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              {[
                { label: "Developers", value: crewStats.developers, accent: "#4361EE" },
                { label: "Projects", value: crewStats.projects, accent: "#06D6A0" },
                { label: "Technologies", value: crewStats.technologies, accent: "#FF6B35" },
                { label: "Milestones", value: crewStats.milestones, accent: "#FFD166" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[0.78rem] text-paper/50">{stat.label}</dt>
                  <dd className="font-display text-3xl font-bold" style={{ color: stat.accent }}>
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <Reveal delay={0.1}>
              <Link to={cta.to} className="btn btn--lime mt-6">
                Start a conversation
              </Link>
            </Reveal>
          </div>
        </div>

        <hr className="rule my-12" />

        <div className="flex flex-col items-start justify-between gap-5 text-sm text-paper/50 sm:flex-row sm:items-center">
          <p>
            © {year} {brand.name}. {brand.altTagline}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-[0.75rem]">React · JavaScript · Bootstrap · Java · Spring Boot</span>
            <button
              type="button"
              onClick={() => globalThis.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-3 py-1.5 font-semibold text-paper/70 transition-colors hover:border-lime hover:text-lime"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
