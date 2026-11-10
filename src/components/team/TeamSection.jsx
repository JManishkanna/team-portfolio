import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StaggerGroup } from "../animations/Reveal";
import { SectionHeader } from "../common/SectionHeader";
import { ActionButton } from "../common/ActionButton";
import { TeamMemberCard } from "./TeamMemberCard";
export function TeamSection({ members, title = "MEET OUR DEVELOPERS.", eyebrow = "The crew", lede, accent = "#06D6A0", tone = "light", variant = "full", }) {
    const isDark = tone === "dark";
    return (_jsx("section", { id: "team", "aria-labelledby": "team-heading", className: `relative overflow-hidden ${isDark ? "on-ink" : "bg-paper"}`, children: _jsxs("div", { className: "shell stack-pad relative", children: [_jsx(SectionHeader, { eyebrow: eyebrow, accent: accent, tone: tone, title: _jsx("span", { id: "team-heading", children: title }), lede: lede ??
                        `${members.length} developers, one stack. Click any card to open that person's individual portfolio.`, action: variant === "home" ? (_jsx(ActionButton, { to: "/team", variant: isDark ? "lime" : "ink", withArrow: false, children: "See the whole team" })) : undefined }), _jsx(StaggerGroup, { className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", stagger: 0.09, children: members.map((member, index) => (_jsx(TeamMemberCard, { member: member, index: index }, member.id))) })] }) }));
}
