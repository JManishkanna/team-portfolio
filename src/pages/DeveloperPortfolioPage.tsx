import NotFoundPage from "./NotFoundPage";
import { DeveloperHero } from "../components/team/DeveloperHero";
import { DeveloperAbout } from "../components/team/DeveloperAbout";
import { DeveloperSkills } from "../components/team/DeveloperSkills";
import { DeveloperProjects } from "../components/team/DeveloperProjects";
import { DeveloperAchievements } from "../components/team/DeveloperAchievements";
import { DeveloperTabs } from "../components/team/DeveloperTabs";
import { useMemberFromParams } from "../components/team/useMemberFromParams";
import { useSeo } from "../hooks/useSeo";
import { Reveal } from "../components/animations/Reveal";
import { ActionButton } from "../components/common/ActionButton";
import { crewStats, projectsForMember } from "../utils/data";

/**
 * The single reusable portfolio page for every developer.
 * Content comes from the roster record matched by /team/:slug — there is no
 * per-person component, so adding a member only means adding data.
 */
export default function DeveloperPortfolioPage() {
  const { member } = useMemberFromParams();

  useSeo({
    title: member
      ? `${member.name} | ${member.role} | FullStack Crew`
      : "Developer not found | FullStack Crew",
    description: member
      ? `${member.shortBio} Skills: ${member.skills.slice(0, 5).join(", ")}.`
      : "No developer matches this portfolio URL.",
    path: member ? `/team/${member.slug}` : "/team",
  });

  if (!member) return <NotFoundPage />;

  const mine = projectsForMember(member.id);

  return (
    <>
      <DeveloperHero member={member} />
      <DeveloperTabs member={member} />
      <DeveloperAbout member={member} />
      <DeveloperSkills member={member} />
      <DeveloperProjects member={member} />
      <DeveloperAchievements member={member} scope="member" />

      <section className="relative overflow-hidden bg-mist">
        <div className="shell flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <div>
              <h2 className="font-display text-title font-bold">
                Want {member.name.split(" ")[0]} on your build?
              </h2>
              <p className="mt-2 max-w-xl text-ink/70">
                {mine.length} of the crew's {crewStats.projects} projects list {member.name} as a contributor.
                Reach out through the individual contact page or bring the whole team in.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              <ActionButton to={`/team/${member.slug}/contact`} variant="primary">
                Contact {member.name.split(" ")[0]}
              </ActionButton>
              <ActionButton to="/contact" variant="ghost">
                Contact the crew
              </ActionButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
