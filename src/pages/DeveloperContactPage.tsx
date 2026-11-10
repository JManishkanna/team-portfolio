import NotFoundPage from "./NotFoundPage";
import { PageHero } from "../components/sections/PageHero";
import { DeveloperTabs } from "../components/team/DeveloperTabs";
import { DeveloperContact } from "../components/team/DeveloperContact";
import { useMemberFromParams } from "../components/team/useMemberFromParams";
import { useSeo } from "../hooks/useSeo";
import { projectsForMember } from "../utils/data";

/** /team/:slug/contact — message one specific developer. */
export default function DeveloperContactPage() {
  const { member } = useMemberFromParams();

  useSeo({
    title: member ? `Contact ${member.name} | ${member.role} | Team Vinsmokes` : "Contact | Team Vinsmokes",
    description: member
      ? `Send a message to ${member.name}, ${member.role} on the Team Vinsmokes team.`
      : "Contact a Team Vinsmokes developer.",
    path: member ? `/team/${member.slug}/contact` : "/team",
  });

  if (!member) return <NotFoundPage />;

  const mine = projectsForMember(member.id);

  return (
    <>
      <PageHero
        accent={member.accent}
        eyebrow={`Contact · ${member.role}`}
        titleWords={["LET'S", "BUILD", "TOGETHER."]}
        accentWords={["TOGETHER."]}
        lede={
          <>
            {member.name.split(" ")[0]} works on {mine.length} of the crew's projects
            {mine.length > 0 ? (
              <> — {mine.map((project) => project.title).join(", ")}</>
            ) : null}
            . Tell us the constraint and we will answer with a plan.
          </>
        }
        crumbs={[{ label: "Team", to: "/team" }, { label: member.name, to: `/team/${member.slug}` }, { label: "Contact" }]}
        aside={
          <img
            src={member.photo}
            alt=""
            width={800}
            height={1000}
            className="h-40 w-32 rounded-2xl object-cover shadow-[var(--shadow-lift)] lg:hidden"
          />
        }
      />
      <DeveloperTabs member={member} />
      <DeveloperContact member={member} />
    </>
  );
}
