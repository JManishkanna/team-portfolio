import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import type { TeamMember } from "../../types";
import { ContactForm } from "../sections/ContactForm";
import { SocialLinks } from "../common/SocialLinks";
import { SectionHeader, accentStyle } from "../common/SectionHeader";
import { Reveal } from "../animations/Reveal";

/** Contact an individual developer. Falls back to the crew address if unset. */
export function DeveloperContact({ member }: { member: TeamMember }) {
  const hasDirectEmail = Boolean(member.email);

  return (
    <section
      className="on-ink relative overflow-hidden"
      aria-labelledby="dev-contact-heading"
      style={accentStyle(member.accent)}
    >
      <div className="dot-field pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="shell stack-pad relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <SectionHeader
            eyebrow="Contact"
            tone="dark"
            accent={member.accent}
            title={<span id="dev-contact-heading">TALK TO {member.name.split(" ")[0].toUpperCase()}.</span>}
            lede={
              hasDirectEmail
                ? `Messages sent here are addressed to ${member.name}. Include the constraint you are actually working under — deadline, traffic, or the thing that currently breaks.`
                : `${member.name} has no direct email configured. Add one in src/data/teamMembers.ts, or send it to the crew.`
            }
          />

          <Reveal>
            <div className="surface flex flex-col gap-4 border-ink/10 bg-ink/50 p-6 text-paper">
              <h3 className="font-display text-lg font-bold">Direct lines</h3>

              <ul className="flex flex-col gap-3 text-[0.92rem]">
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0" style={{ color: member.accent }} aria-hidden="true" />
                  {hasDirectEmail ? (
                    <a
                      href={`mailto:${member.email}`}
                      className="font-semibold underline-offset-4 transition-colors hover:underline"
                      style={{ color: member.accent }}
                    >
                      {member.email}
                    </a>
                  ) : (
                    <span className="text-paper/55">No personal address configured</span>
                  )}
                </li>
                {member.location ? (
                  <li className="flex items-center gap-2.5 text-paper/65">
                    <MapPin className="h-4 w-4 shrink-0" style={{ color: member.accent }} aria-hidden="true" />
                    {member.location}
                  </li>
                ) : null}
              </ul>

              <div className="flex flex-col gap-3 border-t border-paper/10 pt-4">
                <SocialLinks member={member} accent={member.accent} showEmptyHint />
              </div>

              <Link
                to="/team"
                className="inline-flex items-center gap-2 text-sm font-semibold text-paper/60 transition-colors hover:text-[var(--accent)]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to the whole team
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm member={member} />
        </Reveal>
      </div>
    </section>
  );
}
