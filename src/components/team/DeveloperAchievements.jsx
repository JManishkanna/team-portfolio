import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Award, GitPullRequest, Lightbulb, ShieldCheck, Trophy } from "lucide-react";
import { achievementsForMember } from "../../utils/data";
import { achievements, achievementKindLabels, achievementsAreDemonstration } from "../../data/achievements";
import { Reveal, staggerItem } from "../animations/Reveal";
import { SectionHeader, accentStyle } from "../common/SectionHeader";
import { DemoNotice, EmptyState } from "../common/EmptyState";
import { formatMonthLabel } from "../../utils/data";
import { motion } from "framer-motion";
export const kindIcon = {
    hackathon: Trophy,
    certification: ShieldCheck,
    milestone: Lightbulb,
    "open-source": GitPullRequest,
    award: Award,
};
export function DeveloperAchievements({ member, scope = "member", title, eyebrow = "Track record", }) {
    const items = scope === "all" ? achievements : member ? achievementsForMember(member.id) : achievements;
    const accent = member?.accent ?? "#FFD166";
    return (_jsx("section", { className: "relative overflow-hidden bg-paper", "aria-labelledby": "achievements-heading", style: accentStyle(accent), children: _jsxs("div", { className: "shell stack-pad", children: [_jsx(SectionHeader, { eyebrow: eyebrow, accent: accent, title: _jsx("span", { id: "achievements-heading", children: title ?? "MILESTONES I CAN POINT AT." }), lede: scope === "all"
                        ? "The crew's record, newest last. Anything we cannot evidence does not belong on this page."
                        : member
                            ? `Only the entries attributed to ${member.name.split(" ")[0]} appear here.`
                            : undefined, action: achievementsAreDemonstration ? _jsx(DemoNotice, {}) : undefined }), items.length === 0 ? (_jsx("div", { className: "mt-10", children: _jsx(EmptyState, { title: "No achievements recorded", body: member
                            ? `Nothing is attributed to ${member.name} yet. Add entries to the achievements array in src/data/teamMembers.ts, or link team-wide records by setting memberId to "${member.id}" in src/data/achievements.ts.`
                            : "The achievements list in src/data/achievements.ts is empty.", actionTo: "/team", actionLabel: "Back to the team" }) })) : (_jsx(motion.ol, { className: "relative mt-12 flex flex-col gap-8 border-l-2 border-mist pl-6 md:pl-8", initial: "hidden", whileInView: "shown", viewport: { once: true, amount: 0.15 }, transition: { staggerChildren: 0.1 }, variants: { hidden: {}, shown: {} }, children: items.map((item) => {
                        const Icon = kindIcon[item.kind];
                        return (_jsxs(motion.li, { variants: staggerItem, className: "relative", children: [_jsx("span", { "aria-hidden": "true", className: "absolute -left-[2.35rem] top-0.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-paper text-ink md:-left-[3.1rem]", style: { background: item.accent }, children: _jsx(Icon, { className: "h-4 w-4" }) }), _jsxs(Reveal, { children: [_jsxs("div", { className: "flex flex-wrap items-baseline gap-x-3 gap-y-1", children: [_jsx("h3", { className: "font-display text-xl font-bold", children: item.title }), _jsx("span", { className: "chip", style: accentStyle(item.accent), children: achievementKindLabels[item.kind] }), _jsx("span", { className: "font-mono text-xs text-ink/45", children: formatMonthLabel(item.date) })] }), _jsx("p", { className: "mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-ink/70", children: item.summary })] })] }, item.id));
                    }) }))] }) }));
}
