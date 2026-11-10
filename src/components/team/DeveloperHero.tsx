import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import type { TeamMember } from "../../types";
import { ActionButton } from "../common/ActionButton";
import { SocialLinks } from "../common/SocialLinks";
import { TechChips, accentStyle } from "../common/SectionHeader";
import { Breadcrumbs } from "../common/Breadcrumbs";
import { BackdropDecor } from "../animations/BackdropDecor";
import { StaggerText } from "../animations/StaggerText";

/** Individual portfolio hero for one developer, driven entirely by their record. */
export function DeveloperHero({ member }: { member: TeamMember }) {
  return (
    <section
      className="on-ink relative overflow-hidden"
      style={accentStyle(member.accent)}
      aria-label={`${member.name} — ${member.role}`}
    >
      <BackdropDecor tone="dark" variant="hero" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-48"
        style={{ background: `radial-gradient(75% 100% at 30% 100%, ${member.accent}40, transparent)` }}
      />

      <div className="shell relative grid gap-10 pb-16 pt-32 md:pt-36 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.8, ease: [0.22, 0.68, 0.32, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-full w-full rounded-[var(--radius-card)] border-2"
            style={{ borderColor: member.accent }}
          />
          <img
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            width={800}
            height={1000}
            decoding="async"
            className="relative aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-lift)]"
          />
          <span
            className="absolute bottom-4 left-4 rounded-full px-3.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ink"
            style={{ background: member.accent }}
          >
            {member.role.split("·")[0]?.trim() ?? member.role}
          </span>
        </motion.div>

        <div className="flex flex-col gap-6">
          <Breadcrumbs
            tone="dark"
            items={[{ label: "Team", to: "/team" }, { label: member.name }]}
          />

          <AccentBar member={member} />

          <StaggerText
            words={member.name.split(" ")}
            as="h1"
            className="font-display text-display font-bold text-paper"
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.95rem] text-paper/60"
          >
            <span className="font-semibold" style={{ color: member.accent }}>
              {member.specialty}
            </span>
            {member.location ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {member.location}
              </span>
            ) : null}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="max-w-xl border-l-2 pl-5 text-lede text-paper/75"
            style={{ borderColor: member.accent }}
          >
            <p>“{member.shortBio}”</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap items-center gap-3"
          >
            <ActionButton to={`/team/${member.slug}/projects`} variant="lime">
              View my projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ActionButton>
            <ActionButton to={`/team/${member.slug}/contact`} variant="ghost">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact me
            </ActionButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap items-center gap-5 pt-1"
          >
            <SocialLinks member={member} accent={member.accent} />
            <TechChips items={member.skills} accent={member.accent} limit={5} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Small accent strip under the name; kept separate so the hero stays readable. */
function AccentBar({ member }: { member: TeamMember }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex h-1 w-32 origin-left rounded-full"
      style={{ background: member.accent }}
      aria-hidden="true"
    />
  );
}
