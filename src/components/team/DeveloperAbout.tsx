import type { TeamMember } from "../../types";
import { Reveal, StaggerGroup, staggerItem } from "../animations/Reveal";
import { SectionHeader, accentStyle } from "../common/SectionHeader";
import { motion } from "framer-motion";
import { Compass, HeartHandshake, Lightbulb, ShieldCheck } from "lucide-react";

/** Biography, interests, strengths and working approach for one developer. */
export function DeveloperAbout({ member }: { member: TeamMember }) {
  const blocks = [
    { title: "How I work", body: member.approach, Icon: Compass, accent: member.accent },
    { title: "Problem solving", body: member.expandedBio, Icon: Lightbulb, accent: "#845EC2" },
    { title: "Collaboration", body: member.collaboration, Icon: HeartHandshake, accent: "#06D6A0" },
  ];

  return (
    <section className="relative overflow-hidden bg-paper" aria-labelledby="about-heading" style={accentStyle(member.accent)}>
      <div className="shell stack-pad">
        <SectionHeader
          eyebrow="About"
          accent={member.accent}
          title={<span id="about-heading">THE WAY I THINK ABOUT BUILDING.</span>}
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-6">
            {member.expandedBio.split("\n\n").map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <p className="text-lede text-ink/78">{paragraph}</p>
              </Reveal>
            ))}

            <StaggerGroup className="mt-4 grid gap-4 sm:grid-cols-2" stagger={0.07}>
              {blocks.map(({ title, body, Icon, accent }) => (
                <motion.div key={title} variants={staggerItem}>
                  <div className="surface flex h-full flex-col gap-2.5 p-5" style={{ borderLeft: `4px solid ${accent}` }}>
                    <h3 className="flex items-center gap-2 font-display text-base font-bold">
                      <Icon className="h-4 w-4" style={{ color: accent }} aria-hidden="true" />
                      {title}
                    </h3>
                    <p className="text-[0.92rem] leading-relaxed text-ink/70">{body}</p>
                  </div>
                </motion.div>
              ))}
            </StaggerGroup>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="surface p-6">
                <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                  <ShieldCheck className="h-4.5 w-4.5 text-electric" aria-hidden="true" />
                  Technical strengths
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {member.strengths.map((strength) => (
                    <li key={strength} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: member.accent }} />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="surface p-6">
                <h3 className="font-display text-lg font-bold">Interests</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {member.interests.map((interest) => (
                    <li key={interest}>
                      <span className="chip" style={accentStyle(member.accent)}>
                        {interest}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="surface p-6">
                <h3 className="font-display text-lg font-bold">Preferred stack</h3>
                <p className="mt-2 text-[0.9rem] text-ink/60">{member.specialty}</p>
                <ul className="mt-4 flex flex-col gap-2 font-mono text-[0.85rem]">
                  {Object.entries(member.skillGroups)
                    .filter(([, list]) => list.length > 0)
                    .map(([group, list]) => (
                      <li key={group} className="flex flex-wrap gap-x-2">
                        <span className="w-20 shrink-0 uppercase tracking-[0.1em] text-ink/40">{group}</span>
                        <span className="text-ink/75">{list.slice(0, 4).join(", ")}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
