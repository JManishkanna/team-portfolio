import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
            ? `${member.name} | ${member.role} | Team Vinsmokes`
            : "Developer not found | Team Vinsmokes",
        description: member
            ? `${member.shortBio} Skills: ${member.skills.slice(0, 5).join(", ")}.`
            : "No developer matches this portfolio URL.",
        path: member ? `/team/${member.slug}` : "/team",
    });
    if (!member)
        return _jsx(NotFoundPage, {});
    const mine = projectsForMember(member.id);
    return (_jsxs(_Fragment, { children: [_jsx(DeveloperHero, { member: member }), _jsx(DeveloperTabs, { member: member }), _jsx(DeveloperAbout, { member: member }), _jsx(DeveloperSkills, { member: member }), _jsx(DeveloperProjects, { member: member }), _jsx(DeveloperAchievements, { member: member, scope: "member" }), _jsx("section", { className: "relative overflow-hidden bg-mist", children: _jsxs("div", { className: "shell flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between", children: [_jsx(Reveal, { children: _jsxs("div", { children: [_jsxs("h2", { className: "font-display text-title font-bold", children: ["Want ", member.name.split(" ")[0], " on your build?"] }), _jsxs("p", { className: "mt-2 max-w-xl text-ink/70", children: [mine.length, " of the crew's ", crewStats.projects, " projects list ", member.name, " as a contributor. Reach out through the individual contact page or bring the whole team in."] })] }) }), _jsx(Reveal, { delay: 0.1, children: _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs(ActionButton, { to: `/team/${member.slug}/contact`, variant: "primary", children: ["Contact ", member.name.split(" ")[0]] }), _jsx(ActionButton, { to: "/contact", variant: "ghost", children: "Contact the crew" })] }) })] }) })] }));
}
