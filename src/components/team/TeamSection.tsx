import { StaggerGroup } from "../animations/Reveal";
import { SectionHeader } from "../common/SectionHeader";
import { ActionButton } from "../common/ActionButton";
import type { TeamMember } from "../../types";
import { TeamMemberCard } from "./TeamMemberCard";

interface TeamSectionProps {
  members: TeamMember[];
  title?: string;
  eyebrow?: string;
  lede?: string;
  accent?: string;
  tone?: "light" | "dark";
  /** home = 3-up preview with a link to /team; full = the whole gallery. */
  variant?: "home" | "full";
}

export function TeamSection({
  members,
  title = "MEET OUR DEVELOPERS.",
  eyebrow = "The crew",
  lede,
  accent = "#06D6A0",
  tone = "light",
  variant = "full",
}: TeamSectionProps) {
  const isDark = tone === "dark";

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className={`relative overflow-hidden ${isDark ? "on-ink" : "bg-paper"}`}
    >
      <div className="shell stack-pad relative">
        <SectionHeader
          eyebrow={eyebrow}
          accent={accent}
          tone={tone}
          title={<span id="team-heading">{title}</span>}
          lede={
            lede ??
            `${members.length} developers, one stack. Click any card to open that person's individual portfolio.`
          }
          action={
            variant === "home" ? (
              <ActionButton to="/team" variant={isDark ? "lime" : "ink"} withArrow={false}>
                See the whole team
              </ActionButton>
            ) : undefined
          }
        />

        <StaggerGroup
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.09}
        >
          {members.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
